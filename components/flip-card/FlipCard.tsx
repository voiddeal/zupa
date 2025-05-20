"use client"

import "./styles/flip-card.css"

interface Props {
  id: string
  front: React.ReactNode | React.JSX.Element
  back: React.ReactNode | React.JSX.Element
  size?: string
  frontSize?: string
  backSize?: string
  frontWidth?: string
  backWidth?: string
  frontHeight?: string
  backHeight?: string
  direction?: "top" | "right" | "bottom" | "left"
  duration?: number
  style?: { [key: string]: string | number }
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  frontFaceOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  allowFlip?: boolean
  allowBackFlip?: boolean
  isInitiallyFlipped?: boolean
}

export default function FlipCard({
  id,
  front,
  back,
  size,
  frontSize,
  backSize,
  frontWidth,
  backWidth,
  frontHeight,
  backHeight,
  direction,
  duration,
  style,
  className,
  frontFaceOnClick,
}: Props) {
  return (
    <div
      className={`container ${className}`}
      style={style as React.CSSProperties}
      id={id}
    >
      <div
        className="face"
        data-direction={direction || "left"}
        style={
          {
            "--front-width": frontWidth || frontSize || size || "auto",
            "--front-height": frontHeight || frontSize || size || "auto",
            "--back-width": backWidth || backSize || size || "auto",
            "--back-height": backHeight || backSize || size || "auto",
            "--duration": duration ? `${duration}ms` : `${1000}ms`,
          } as React.CSSProperties
        }
      >
        <div className="front" onClick={frontFaceOnClick}>
          {front}
        </div>
        <div className="back">{back}</div>
      </div>
    </div>
  )
}
