import React from 'react';
import CoolText, { CoolTitle } from '../components/CoolText';
import { Link } from 'gatsby'

const Home = () => {
  return (
    <div style={{
      padding: "1em",
      maxWidth: 400,
      margin: "auto",
    }}>
      <CoolTitle style={{ textAlign: "center", }}>UTILS.COOL</CoolTitle>
      <CoolLink to='/timer'>TIMER</CoolLink>
    </div>
  )
}

function CoolLink({ to, children }) {
  return (
    <Link style={{ textDecoration: "none" }} to={to}>
      <div style={{
        background: "rgba(233, 233, 233, 0.65)",
        padding: "0.8em",
        borderRadius: 12,
        textAlign: "center",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" ,
      }}>
        <CoolText bold style={{ 
          fontSize: "1.4em", 
          color: "black",
          textShadow: "0px 0.5px 0px #FFFFFF",
        }}>{children}</CoolText>
      </div>
    </Link>
  )
}

export default Home;