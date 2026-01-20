# Dashboard Setup Guide

## Environment Variables Configuration

### 1. Create `.env.local` file

Create a `.env.local` file in the root directory of your project (same level as `package.json`).

### 2. Add Database URL

#### For MongoDB (Recommended):
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/panditji_ecommerce
```

#### For PostgreSQL:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/panditji_ecommerce
```

### 3. Add Cloudinary Credentials

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard → Settings
3. Copy your credentials and add to `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Setting up Cloudinary Upload Preset:
1. Go to Cloudinary Dashboard → Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Set:
   - Preset name: `puja_uploads` (or your preferred name)
   - Signing mode: `Unsigned` (for client-side uploads)
   - Folder: `panditji` (all images and videos will be saved in this folder)
5. Save and use the preset name in your `.env.local`

**Note:** All images and videos are saved in the `panditji` folder to keep them organized with other applications using the same Cloudinary account.

### 4. Complete `.env.local` Example

```env
# Database
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/panditji_ecommerce

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=puja_uploads
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Database Schema Examples

### MongoDB Schema (Pujas Collection)
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  duration: String,
  image: String, // Cloudinary URL
  video: String, // Cloudinary URL
  features: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### MongoDB Schema (Bookings Collection)
```javascript
{
  _id: ObjectId,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  customerAddress: String,
  pujaName: String,
  pujaId: ObjectId, // Reference to pujas collection
  bookingDate: Date,
  bookingTime: String,
  status: String, // 'pending', 'confirmed', 'completed', 'cancelled'
  totalAmount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## API Routes Implementation

### Update API Routes with Database

Replace the placeholder code in these files with actual database operations:

1. **`app/api/pujas/route.ts`** - GET and POST operations
2. **`app/api/pujas/[id]/route.ts`** - DELETE operation
3. **`app/api/bookings/route.ts`** - GET operation
4. **`app/api/bookings/[id]/route.ts`** - PATCH operation

### Example MongoDB Implementation

Install MongoDB driver:
```bash
npm install mongodb
# or
npm install mongoose
```

Example with MongoDB:
```typescript
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DATABASE_URL!)
const db = client.db('panditji_ecommerce')

export async function GET() {
  await client.connect()
  const pujas = await db.collection('pujas').find({}).toArray()
  return NextResponse.json(pujas)
}
```

## Features

### Dashboard Page (`/dashboard`)
- **Add New Puja**: Form to add pujas with image/video upload
- **Manage Pujas**: List, search, filter, and delete pujas
- **Customer Bookings**: View and manage customer bookings with status updates

### Components
- `components/dashboard/add-puja-form.tsx` - Form to add new pujas
- `components/dashboard/puja-list.tsx` - List and manage existing pujas
- `components/dashboard/customer-bookings.tsx` - View and manage bookings

## Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use server-side validation** - Validate all inputs in API routes
3. **Secure Cloudinary** - Use signed uploads for production
4. **Database security** - Use connection pooling and proper authentication
5. **API authentication** - Add authentication middleware to protect routes

## Next Steps

1. Set up your database (MongoDB/PostgreSQL)
2. Configure Cloudinary account
3. Update API routes with actual database operations
4. Add authentication/authorization
5. Test the dashboard functionality
