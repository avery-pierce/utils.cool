import React, { HTMLProps, useState } from "react"

const useStringState = (defaultValue: string) => useState(defaultValue)
type StateSetter = ReturnType<typeof useStringState>[1]

type Props = HTMLProps<HTMLInputElement> & {
  setter: StateSetter
}

export default function TextInput({ setter, ...props}: Props) {
  return <input type="text" onChange={(e) => setter(e.target.value)} {...props} />
}