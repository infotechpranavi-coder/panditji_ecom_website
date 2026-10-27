// Reusable client-side upload helper that bypasses Vercel 4.5MB payload limit
// by uploading directly from browser to Cloudinary using a secure server-signed token.

export const MAX_VIDEO_SIZE_MB = 50
export const MAX_IMAGE_SIZE_MB = 10

export interface UploadOptions {
  folder?: string
  maxSizeMB?: number
  onProgress?: (percent: number) => void
}

export interface UploadResult {
  secure_url: string
  public_id: string
  format?: string
  resource_type?: string
  bytes?: number
  duration?: number
  [key: string]: any
}

export async function uploadMedia(
  file: File,
  type: 'image' | 'video',
  options: UploadOptions = {}
): Promise<UploadResult> {
  const maxSize = options.maxSizeMB ?? (type === 'video' ? MAX_VIDEO_SIZE_MB : MAX_IMAGE_SIZE_MB)
  const maxSizeBytes = maxSize * 1024 * 1024

  // 1. Client-side size validation
  if (file.size > maxSizeBytes) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1)
    throw new Error(
      `File size (${fileSizeMB} MB) exceeds maximum limit of ${maxSize} MB for ${type}s. Please choose a smaller file.`
    )
  }

  // 2. Fetch signed token from our lightweight server endpoint (<1 KB payload)
  const folder = options.folder || 'panditji'
  const signRes = await fetch(`/api/upload/sign?folder=${encodeURIComponent(folder)}`)
  if (!signRes.ok) {
    const errorData = await signRes.json().catch(() => ({}))
    throw new Error(errorData.error || `Failed to authenticate upload (status ${signRes.status})`)
  }

  const { signature, timestamp, apiKey, cloudName } = await signRes.json()

  if (!signature || !apiKey || !cloudName) {
    throw new Error('Cloudinary credentials missing or incomplete on server.')
  }

  // 3. Prepare FormData for direct Cloudinary upload
  const uploadFormData = new FormData()
  uploadFormData.append('file', file)
  uploadFormData.append('api_key', apiKey)
  uploadFormData.append('timestamp', timestamp.toString())
  uploadFormData.append('signature', signature)
  uploadFormData.append('folder', folder)

  // 4. Upload directly to Cloudinary using XMLHttpRequest for progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`

    xhr.open('POST', url)

    if (options.onProgress && xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100)
          options.onProgress!(percent)
        }
      }
    }

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText)
        if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
          resolve(data)
        } else {
          const message = data.error?.message || `Upload failed with status ${xhr.status}`
          reject(new Error(message))
        }
      } catch (err: any) {
        reject(new Error(`Failed to parse upload response: ${err.message}`))
      }
    }

    xhr.onerror = () => {
      reject(new Error('Network error while connecting to Cloudinary. Please check your internet connection.'))
    }

    xhr.send(uploadFormData)
  })
}
