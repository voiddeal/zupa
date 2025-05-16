"use client"

import { useEffect, useRef } from "react"

// Throttle function to limit event firing
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

      if (isInside) {
        // ✅ Center the pupil inside the iris when cursor is inside the eye
        pupilRef.current.style.transform = `translate(0, 0)`
        irisRef.current.style.transform = `translate(0, 0)`
        return
      }

      // Cursor position relative to eye
      const deltaX = event.clientX - eyeCenterX
      const deltaY = event.clientY - eyeCenterY
      const angle = Math.atan2(deltaY, deltaX)

      // Define movement limits
      const eyeMaxDistance = 24 // Max movement inside eye
      const irisMaxDistance = 4 // Max movement inside iris
      const pupilMaxDistance = 8 // Max movement inside pupil area

      const eyeDistance = Math.min(
        eyeMaxDistance,
        Math.sqrt(deltaX ** 2 + deltaY ** 2)
      )
      const irisDistance = Math.min(irisMaxDistance, eyeDistance)
      const pupilDistance = Math.min(pupilMaxDistance, irisDistance)

      // Move iris inside eye
      irisRef.current.style.transform = `translate(${
        Math.cos(angle) * irisDistance
      }px, ${Math.sin(angle) * irisDistance}px)`

      // Move pupil inside iris
      pupilRef.current.style.transform = `translate(${
        Math.cos(angle) * pupilDistance
      }px, ${Math.sin(angle) * pupilDistance}px)`
    }

    const throttledMouseMove = throttle(handleMouseMove, 100)
    window.addEventListener("mousemove", throttledMouseMove)
    return () => window.removeEventListener("mousemove", throttledMouseMove)
  }, [])

  return (
    <div className="flex items-center justify-center z-20">
      {/* Eye container */}
      <div
        ref={eyeRef}
        className="relative w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center"
      >
        {/* Blue ring (iris) */}
        <div
          ref={irisRef}
          className="w-12 h-12 bg-[radial-gradient(white_30%,skyblue)] rounded-full flex items-center justify-center absolute transition-transform"
        >
          {/* Pupil (moves inside iris) */}
          <div
            ref={pupilRef}
            className="w-6 h-6 bg-sky-950 rounded-full absolute transition-transform"
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Eye
