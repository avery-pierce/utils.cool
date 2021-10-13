import React from "react"

export default function CoolMobileFullscreenLayout({ children, style }) {
  return (
    <div style={{ 
      display: "flex", 
      position: "fixed", 
      top: 0, 
      left: 0, 
      bottom: 0, 
      right: 0, 
      flex: 1, 
      flexDirection: "column",
      ...style,
    }}>
      {children}
    </div>
  )
}