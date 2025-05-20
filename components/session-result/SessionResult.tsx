"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { appActions } from "@/redux/slices/appSlice"
import { CSSProperties, useEffect, useRef } from "react"
import Image from "next/image"
import CountUp from "react-countup"
import TypeAnimation from "../TypeAnimation"
import DelayedRender from "../DelayedRender"
import Button from "../Button"
import Modal from "../modal/Modal"
import Confetti from "react-confetti"
import { sessionStatsActions } from "@/redux/slices/sessionStatsSlice"
import { recordsActions } from "@/redux/slices/recordsSlice"
import dateFormatter from "@/utils/dateFormatter"
import "./session-result.css"

export default function SessionResult() {
  const dispatch = useAppDispatch()
  const { attempts, correct, mistake, strike, spentTime } = useAppSelector(
    (state) => state.sessionStats
  )
  const { shouldCalculateMistakes, shouldCalculateAttempts, sounds } =
    useAppSelector((state) => state.settings)
  const { sessionTime } = useAppSelector((state) => state.settings)
  const yay = useRef(new Audio("/yay.mp3"))
  const aww = useRef(new Audio("/aww.mp3"))
  const hasPlayed = useRef<boolean>(false)

  const playSound = () => {
    if (!hasPlayed.current) {
      if (spentTime === sessionTime) {
        aww.current.play()
      } else {
        yay.current.play()
      }
      hasPlayed.current = true
    }
  }

  if (sounds) playSound()

  const CORRECT_MULTIPLIER = 100
  const MISTAKE_MULTIPLIER = 25
  const STRIKE_MULTIPLIER = 50
  const ATTEMPTS_MULTIPLIER = 10
  const SPENT_TIME_MULTIPLIER = 5

  const CORRECT_CALC = correct * CORRECT_MULTIPLIER
  const STRIKE_CALC = strike * STRIKE_MULTIPLIER
  const MISTAKE_CALC =
    mistake * (shouldCalculateMistakes ? MISTAKE_MULTIPLIER : 0)
  const ATTEMPTS_CALC =
    attempts * (shouldCalculateAttempts ? ATTEMPTS_MULTIPLIER : 0)
  const SPENT_TIME_CALC = spentTime * SPENT_TIME_MULTIPLIER

  const STAT_TABLE_DATA = [
    {
      name: "Attempts",
      count: attempts,
      multiplier: ATTEMPTS_MULTIPLIER,
      score: shouldCalculateAttempts ? ATTEMPTS_CALC : "won't count",
      scoreColor: "text-red-400",
      prefix: "-",
      wait: [1000, 1200, 1400, 1600],
    },
    {
      name: "Correct",
      count: correct,
      multiplier: CORRECT_MULTIPLIER,
      score: CORRECT_CALC,
      scoreColor: "text-green-400",
      prefix: "+",
      wait: [1600, 1800, 2000, 2200],
    },
    {
      name: "Strikes",
      count: strike,
      multiplier: STRIKE_MULTIPLIER,
      score: STRIKE_CALC,
      scoreColor: "text-green-400",
      prefix: "+",
      wait: [2400, 2600, 2800, 3000],
    },
    {
      name: "Mistakes",
      count: mistake,
      multiplier: MISTAKE_MULTIPLIER,
      score: shouldCalculateMistakes ? MISTAKE_CALC : "won't count",
      scoreColor: "text-red-400",
      prefix: "-",
      wait: [3200, 3400, 3600, 3800],
    },
    {
      name: "Spent Time",
      count: spentTime,
      multiplier: SPENT_TIME_MULTIPLIER,
      score: SPENT_TIME_CALC,
      scoreColor: "text-red-400",
      prefix: "-",
      wait: [4000, 4200, 4400, 4600],
    },
  ]

  const tableRows = STAT_TABLE_DATA.map(
    ({ name, count, multiplier, score, scoreColor, prefix, wait }, index) => (
      <tr key={index}>
        <td className="p-2">
          <TypeAnimation value={name} wait={wait[0]} />
        </td>
        <td className="p-2 text-center">
          <DelayedRender delay={wait[1]}>
            <CountUp end={count} className="block text-center" />
          </DelayedRender>
        </td>
        <td className="p-2 text-center">
          <TypeAnimation wait={wait[2]} value={`X ${multiplier}`} />
        </td>
        <td className={`p-2 ${scoreColor}`}>
          <DelayedRender delay={wait[3]}>
            {typeof score === "number" ? (
              <CountUp
                prefix={prefix}
                end={score}
                className="block text-center"
              />
            ) : (
              <span className="block text-amber-200 text-center">{score}</span>
            )}
          </DelayedRender>
        </td>
      </tr>
    )
  )

  const calculateScore = () => {
    const score =
      CORRECT_CALC +
      STRIKE_CALC -
      MISTAKE_CALC -
      ATTEMPTS_CALC -
      SPENT_TIME_CALC
    return score
  }

  const blocks = () => {
    return Array.from({ length: 10 }).map((_, index) => {
      return (
        <div
          key={index}
          className="assembly-block"
          style={{ "--delay": `${(index + 1) / 10}s` } as CSSProperties}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <Image
              key={i}
              src="/tile-back.jpg"
              alt="block frame"
              width={100}
              height={100}
              className="h-full w-[20%]"
            />
          ))}
        </div>
      )
    })
  }

  const sessionResultConfirmation = () => {
    dispatch(appActions.setSessionResultDisplay(false))
    dispatch(appActions.setIsTimerPaused(false))
    dispatch(appActions.setView("main"))
    dispatch(sessionStatsActions.reset())
  }

  useEffect(() => {
    dispatch(
      recordsActions.addRecord({
        score: calculateScore(),
        date: dateFormatter(new Date()),
      })
    )
  })

  return (
    <>
      {/* dont show confetti if time is 0*/}
      {spentTime !== sessionTime && <Confetti className="relative z-[1200]" />}
      <DelayedRender delay={3000}>
        <Modal>
          <div className="session-result">
            <div className="session-result-blocks">{blocks()}</div>
            <div className="session-result-result">
              <table className="w-full sm:text-2xl">
                <thead className="max-sm:hidden">
                  <DelayedRender delay={600}>
                    <tr>
                      <th className="sm:p-2 text-left">Stat</th>
                      <th className="sm:p-2 text-center">Count</th>
                      <th className="sm:p-2 text-center">Multiplier</th>
                      <th className="sm:p-2 text-center">Score</th>
                    </tr>
                  </DelayedRender>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>

              <div className="session-result-score-border" />

              <div className="py-8 max-sm:text-2xl text-5xl">
                <TypeAnimation wait={5000} value="Final Score:" />
                <DelayedRender delay={6000}>
                  <CountUp
                    end={calculateScore()}
                    className="pl-5 text-yellow-300"
                  />
                </DelayedRender>
              </div>
              <DelayedRender delay={7000}>
                <div className="w-fit mx-auto mt-4">
                  <Button value="OK" onClick={sessionResultConfirmation} />
                </div>
              </DelayedRender>
            </div>
          </div>
        </Modal>
      </DelayedRender>
    </>
  )
}
