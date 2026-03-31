'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) router.push(redirect)
        else router.push(`/account?success=${encodeURIComponent('Account created successfully')}`)
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Message error={error} />

      <div className="space-y-4">
        <FormItem>
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
            Email Address
          </Label>
          <Input
            id="email"
            className="rounded-xl border-gray-200 focus:border-[#D4BC9B] focus:ring-[#D4BC9B] bg-gray-50/50"
            {...register('email', { required: 'Email is required.' })}
            type="email"
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
            New password
          </Label>
          <Input
            id="password"
            className="rounded-xl border-gray-200 focus:border-[#D4BC9B] focus:ring-[#D4BC9B] bg-gray-50/50"
            {...register('password', { required: 'Password is required.' })}
            type="password"
          />
          {errors.password && <FormError message={errors.password.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="passwordConfirm" className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
            Confirm Password
          </Label>
          <Input
            id="passwordConfirm"
            className="rounded-xl border-gray-200 focus:border-[#D4BC9B] focus:ring-[#D4BC9B] bg-gray-50/50"
            {...register('passwordConfirm', {
              required: 'Please confirm your password.',
              validate: (value) => value === password.current || 'The passwords do not match',
            })}
            type="password"
          />
          {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} />}
        </FormItem>
      </div>

      <div className="pt-4">
        <Button
          className="w-full bg-black hover:bg-black/90 text-white rounded-xl py-6 font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-black/20"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Processing...' : 'Create Account'}
        </Button>
      </div>
    </form>
  )
}
