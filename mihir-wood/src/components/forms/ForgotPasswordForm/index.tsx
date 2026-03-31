'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
}

export const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic mb-2">Forgot Password</h1>
            <p className="text-sm text-gray-500">
              Enter your email to receive reset instructions.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Message error={error} />

            <FormItem>
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                Email address
              </Label>
              <Input
                id="email"
                className="rounded-xl border-gray-200 focus:border-[#D4BC9B] focus:ring-[#D4BC9B] bg-gray-50/50"
                {...register('email', { required: 'Please provide your email.' })}
                type="email"
              />
              {errors.email && <FormError message={errors.email.message} />}
            </FormItem>

            <Button
              className="w-full bg-black hover:bg-black/90 text-white rounded-xl py-6 font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-black/20"
              type="submit"
            >
              Send Reset Link
            </Button>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-xs font-bold text-[#D4BC9B] hover:underline uppercase tracking-widest">
                Back to login
              </Link>
            </div>
          </form>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <div className="text-center py-8">
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic mb-4">Request submitted</h1>
            <p className="text-gray-500 mb-8">Check your email for a link to securely reset your password.</p>
            <Button asChild variant="outline" className="border-gray-200 rounded-xl py-6 font-bold uppercase tracking-widest text-xs hover:bg-gray-50">
              <Link href="/login">Return to Login</Link>
            </Button>
          </div>
        </React.Fragment>
      )}
    </Fragment>
  )
}
