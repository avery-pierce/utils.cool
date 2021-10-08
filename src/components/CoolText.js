import React from "react"

export function CoolTitle({ children, style }) {
  return (
    <h1 style={{
      fontFamily: "Monoton",
      textTransform: "uppercase",
      fontWeight: "normal",
      fontSize: "30pt",
      color: "#FFF",
      ...style
    }}>{children}</h1>
  )
}

export default function CoolText({ children, style, bold }) {
  return (
    <span style={{
      fontFamily: "Roboto",
      fontWeight: bold ? "500" : "normal",
      color: "#FFF",
      ...style,
    }}>
      {children}
    </span>
  )
}