import React, { useCallback, useRef } from "react"
import CoolMobileFullscreenLayout from "../components/CoolMobileFullscreenLayout"
import useLocalStorageState from "../hooks/useLocalStorageState"
import QRCode from "qrcode.react"

const QrCode = () => {
  const [text, setText] = useLocalStorageState("qr.input", "")

  const onTextChange = (e) => {
    setText(e.target.value)
  }

  const canvasWrapperRef = useRef()

  const downloadCanvasAsImage = useCallback(() => {
    // Navigate into the canvas element
    const canvas = canvasWrapperRef.current.children[0]

    // Create a fake anchor to trigger the download
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [])

  return (
    <CoolMobileFullscreenLayout style={{
      padding: "1em",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        maxWidth: 600,
        margin: "auto"
      }}>
        <input type="text" onChange={onTextChange} value={text} placeholder="https://utils.cool" style={{
          fontSize: "1.4em",
          borderRadius: 12,
          border: "none",
          padding: "0.4em",
          marginBottom: "1em"
        }} />
        <div ref={canvasWrapperRef} style={{
          padding: "1em",
          borderRadius: 12,
          backgroundColor: "white",
        }}>
          <QRCode value={text} size={200} style={{
            display: "block",
            margin: "auto",
          }}/>
        </div>
        <button onClick={downloadCanvasAsImage}>Download</button>
      </div>
    </CoolMobileFullscreenLayout>
  )
}

export default QrCode