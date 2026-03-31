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
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<null | string>(null)

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current)
        else router.push('/account')
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Message error={error} />
      <div className="space-y-4">
        <FormItem>
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</Label>
          <Input
            id="email"
            type="email"
            className="rounded-xl border-gray-200 focus:border-[#D4BC9B] focus:ring-[#D4BC9B] bg-gray-50/50"
            {...register('email', { required: 'Email is required.' })}
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>

        <FormItem>
          <div className="flex items-center justify-between uppercase tracking-widest">
            <Label htmlFor="password" className="text-xs font-bold text-gray-500">Password</Label>
            <Link
              href={`/recover-password${allParams}`}
              className="text-[10px] font-bold text-[#D4BC9B] hover:text-[#c4a983] transition-colors"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            className="rounded-xl border-gray-200 focus:border-[#D4BC9B] focus:ring-[#D4BC9B] bg-gray-50/50"
            {...register('password', { required: 'Please provide a password.' })}
          />
          {errors.password && <FormError message={errors.password.message} />}
        </FormItem>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <Button
          className="w-full bg-black hover:bg-black/90 text-white rounded-xl py-6 font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-black/20"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? 'Processing...' : 'Continue'}
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-100"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="bg-white px-2 text-gray-400">New here?</span>
          </div>
        </div>

        <Button asChild variant="outline" className="w-full border-gray-200 rounded-xl py-6 font-bold uppercase tracking-widest text-xs hover:bg-gray-50">
          <Link href={`/create-account${allParams}`}>
            Create an account
          </Link>
        </Button>
      </div>
    </form>
  )
}
