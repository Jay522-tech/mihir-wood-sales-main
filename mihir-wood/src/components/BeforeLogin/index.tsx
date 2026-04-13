'use client'
import React from 'react'
import '../../components/Admin/admin-custom.css'

export const BeforeLogin: React.FC = () => {
  return (
    <div className="custom-login-header">
      <h2 style={{ color: '#D4BC9B', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold' }}>
        Admin Login
      </h2>
    </div>
  )
}
