import type { Metadata } from 'next'

import { RenderParams } from '@/components/RenderParams'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import Link from 'next/link'
import React from 'react'
import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { CreateAccountForm } from '@/components/forms/CreateAccountForm'
import { redirect } from 'next/navigation'

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?warning=${encodeURIComponent('You are already logged in.')}`)
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <RenderParams />

        <div className="text-center">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic mb-2">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Join the world of Mihir Wood masterpieces.
          </p>
        </div>

        <CreateAccountForm />

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#D4BC9B] hover:underline font-bold">
              Log in
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
  title: 'Account',
}
