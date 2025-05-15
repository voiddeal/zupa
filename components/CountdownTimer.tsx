"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Eye from "./Eye"

interface CountdownTimerProps {
  time?: number
}

export default function CountdownTimer({ time = 120 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(time)
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          // When times reached 0
          clearInterval(interval)
          setIsTimeUp(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [time])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="h-full self-start flex flex-col items-center justify-between">
      <div className="flex justify-center items-center w-fit mx-auto">
        <iframe
          src="https://lottie.host/embed/23cc8cb8-a609-4e7b-b96e-604427705545/bqQ5fffQ4Y.lottie"
          width="100"
          height="100"
          style={{ border: "none" }}
        />
        <strong className="text-3xl pt-8">{formatTime(timeLeft)}</strong>
      </div>
      <Image
        src={"/pause.jpg"}
        alt="pause button"
        width={100}
        height={100}
        className="block w-fit mx-auto size-16 cursor-pointer hover:scale-105 transition-transform active:scale-100"
      />
      <div className="mt-auto">
        <Eye />
      </div>
    </div>
  )
}
