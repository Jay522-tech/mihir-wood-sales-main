'use client'

import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

export const LogoutPage: React.FC = (props) => {
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Logged out successfully.')
      } catch (_) {
        setError('You are already logged out.')
      }
    }

    void performLogout()
  }, [logout])

  return (
    <div className="text-center py-8">
      {(error || success) && (
        <Fragment>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic mb-4">
            {error || success}
          </h1>
          <p className="text-gray-500 mb-8">
            What would you like to do next?
          </p>
          <div className="flex flex-col gap-4">
            <Link
              href="/shop"
              className="bg-black hover:bg-black/90 text-white rounded-xl py-4 font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-black/20 text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/login"
              className="border border-gray-200 rounded-xl py-4 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 text-center text-gray-700 transition-colors"
            >
              Log Back In
            </Link>
          </div>
        </Fragment>
      )}
    </div>
  )
}
