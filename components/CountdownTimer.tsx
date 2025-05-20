"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { appActions } from "@/redux/slices/appSlice"
import { sessionStatsActions } from "@/redux/slices/sessionStatsSlice"
import Image from "next/image"
import { useState, useEffect } from "react"
import Portal from "./Portal"

export default function CountdownTimer() {
  const dispatch = useAppDispatch()
  const { isTimerPaused, sessionResultDisplay } = useAppSelector(
    (state) => state.app
  )
  const { sessionTime } = useAppSelector((state) => state.settings)
  const { resetCount } = useAppSelector((state) => state.sessionStats)
  const [timeLeft, setTimeLeft] = useState<number>(sessionTime - 1)
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false)

  useEffect(() => {
    if (isTimerPaused) return

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval)
          setIsTimeUp(true)
          return 0
        }
        return prevTime - 1
      })
      dispatch(sessionStatsActions.addSpentTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerPaused, timeLeft])

  // when the time is up
  useEffect(() => {
    if (!isTimeUp) return
    dispatch(appActions.setIsTimerPaused(true))
    dispatch(appActions.setSessionResultDisplay(true))
  }, [isTimeUp])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (resetCount === 0) return
    setTimeLeft(sessionTime - 1)
  }, [resetCount])

  return (
    <div className="h-full max-md:w-full flex md:flex-col items-center gap-y-3 max-md:justify-between">
      <iframe
        src="https://lottie.host/embed/23cc8cb8-a609-4e7b-b96e-604427705545/bqQ5fffQ4Y.lottie"
        width="100"
        height="100"
        style={{ border: "none" }}
      />
      <strong className="text-5xl block text-center text-white">
        :: {formatTime(timeLeft)} ::
      </strong>

      <Image
        src={"/pause-button.png"}
        alt={"Pause button"}
        width={100}
        height={100}
        className="block w-fit mx-auto size-16 cursor-pointer hover:scale-105 transition-transform active:scale-100"
        onClick={() => dispatch(appActions.setIsTimerPaused(!isTimerPaused))}
      />

      {!sessionResultDisplay && isTimerPaused && false && (
        <Portal>
          <div className="fixed inset-0 m-auto w-dvw h-dvh flex justify-center items-center bg-black/20 backdrop-blur-md">
            <Image
              src={"/play-button.png"}
              alt="Play button"
              width={200}
              height={200}
              onClick={() => dispatch(appActions.setIsTimerPaused(false))}
              className="cursor-pointer hover:scale-105 active:scale-100 transition-[scale]"
            />
          </div>
        </Portal>
      )}
    </div>
  )
}
