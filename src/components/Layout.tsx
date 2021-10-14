import React, { ReactNode } from 'react'
import { Link } from 'gatsby'

const Layout = ({children}: {
  children?: ReactNode,
}) => {
  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/timer'>Timer</Link>
      </nav>
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout