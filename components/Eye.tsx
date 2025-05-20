"use client"

import { useEffect, useRef } from "react"

// throttle function to limit event firing
const throttle = (callback: Function, limit: number) => {
  let lastCall = 0
  return (event: MouseEvent) => {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastCall = now
      callback(event)
    }
  }
}

const Eye: React.FC = () => {
  const pupilRef = useRef<HTMLDivElement>(null)
  const irisRef = useRef<HTMLDivElement>(null)
  const eyeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!pupilRef.current || !irisRef.current || !eyeRef.current) return

      const { left, top, width, height } =
        eyeRef.current.getBoundingClientRect()
      const eyeCenterX = left + width / 2
      const eyeCenterY = top + height / 2

      const insideX = event.clientX >= left && event.clientX <= left + width
      const insideY = event.clientY >= top && event.clientY <= top + height
      const isInside = insideX && insideY

      // when cursor is inside
      if (isInside) {
        pupilRef.current.style.transform = `translate(0, 0)`
        irisRef.current.style.transform = `translate(0, 0)`
        return
      }

      // cursor position relative to eye
      const deltaX = event.clientX - eyeCenterX
      const deltaY = event.clientY - eyeCenterY
      const angle = Math.atan2(deltaY, deltaX)

      // movement limits
      const eyeMaxDistance = 24 // max movement inside eye
      const irisMaxDistance = 6 // max movement inside iris
      const pupilMaxDistance = 8 // max movement inside pupil area

      const eyeDistance = Math.min(
        eyeMaxDistance,
        Math.sqrt(deltaX ** 2 + deltaY ** 2)
      )
      const irisDistance = Math.min(irisMaxDistance, eyeDistance)
      const pupilDistance = Math.min(pupilMaxDistance, irisDistance)

      // move iris inside eye
      irisRef.current.style.transform = `translate(${
        Math.cos(angle) * irisDistance
      }px, ${Math.sin(angle) * irisDistance}px)`

      // move pupil inside iris
      pupilRef.current.style.transform = `translate(${
        Math.cos(angle) * pupilDistance
      }px, ${Math.sin(angle) * pupilDistance}px)`
    }

    const throttledMouseMove = throttle(handleMouseMove, 100)
    window.addEventListener("mousemove", throttledMouseMove)
    return () => window.removeEventListener("mousemove", throttledMouseMove)
  }, [])

  return (
    <div
      ref={eyeRef}
      className="relative w-14 h-14 bg-red-200 rounded-full flex items-center justify-center z-10 group"
    >
      {/* iris */}
      <div
        ref={irisRef}
        className="w-11 h-11 bg-[radial-gradient(white_50%,black)] rounded-full flex items-center justify-center absolute transition-transform"
      >
        {/* pupil*/}
        <div
          ref={pupilRef}
          className="w-6 h-6 bg-black/80 rounded-full absolute group-hover:w-2 group-hover:h-4 group-hover:bg-yellow-500 transition-all"
        ></div>
      </div>
    </div>
  )
}

export default Eye
