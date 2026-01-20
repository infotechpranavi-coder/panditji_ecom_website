'use client'

import { useState } from 'react'
import { X, Lock, User, Eye, EyeOff, Mail, UserCircle } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  // Generate unique ID
  const generateUniqueId = () => {
    return `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Simple user storage in localStorage (for demo purposes)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      // Login: Check credentials
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const user = storedUsers.find((u: any) => u.username === username && u.password === password)
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ 
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username 
        }))
        alert('Login successful!')
        onClose()
        // Reload page to update UI
        window.location.reload()
      } else {
        setError('Invalid username or password')
      }
    } else {
      // Signup: Store new user with all details
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if username already exists
      if (storedUsers.some((u: any) => u.username === username)) {
        setError('Username already exists')
        return
      }

      // Check if email already exists
      if (storedUsers.some((u: any) => u.email === email)) {
        setError('Email already registered')
        return
      }
      
      // Create new user with unique ID
      const newUser = {
        id: generateUniqueId(),
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
        password: password,
        createdAt: new Date().toISOString()
      }
      
      // Add new user
      storedUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(storedUsers))
      localStorage.setItem('currentUser', JSON.stringify({ 
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username 
      }))
      alert('Account created successfully!')
      onClose()
      // Reload page to update UI
      window.location.reload()
    }
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setUsername('')
    setPassword('')
    setError('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-md relative my-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-primary/10 rounded-lg transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />

        <div className="relative p-6">
          {/* Header */}
          <div className="text-center mb-5">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLogin ? 'Sign in to continue' : 'Join us to book your puja services'}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-5 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => {
                setIsLogin(true)
                resetForm()
              }}
              className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                resetForm()
              }}
              className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-2">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Name Field (Signup only) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Email Field (Signup only) */}
            {!isLogin && (
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={!isLogin}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setIsLogin(false)
                    resetForm()
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setIsLogin(true)
                    resetForm()
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
