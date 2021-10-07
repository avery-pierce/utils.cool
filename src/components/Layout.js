import React from 'react'
import { Link } from 'gatsby'

const Layout = ({children}) => {
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