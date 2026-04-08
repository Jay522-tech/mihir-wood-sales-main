'use client'
import React from 'react'
import '../Admin/admin-custom.css'

export const Logo = () => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Mihir Wood"
      src="/images/logo.png"
      width={120}
      height={30}
      className="admin-logo"
      style={{
        width: 'auto',
        display: 'block'
      }}
    />
  )
}
