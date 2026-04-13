import React from 'react'
import Link from 'next/link'
import './index.css'

export const LogoutButton: React.FC = () => {
    return (
        <div className="custom-logout-container">
            <Link href="/admin/logout" className="custom-logout-link" prefetch={false}>
                <span className="custom-logout-icon">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </span>
                <span className="custom-logout-label">Log Out</span>
            </Link>
        </div>
    )
}
