'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

const Provider = ({children, session}) => {
  return (
    // <div>Provider</div>
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider