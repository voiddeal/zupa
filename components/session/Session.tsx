"use client"

import Image from "next/image"
import CountdownTimer from "../CountdownTimer"
import SessionStats from "../SessionStats"
import SessionNav from "../SessionNav"
import { useMemo, useRef } from "react"
import Tile from "../Tile"
import { useAppSelector } from "@/redux/hooks"
import Portal from "../Portal"
import SessionResult from "../session-result/SessionResult"
import "./session.css"

export default function Session() {
  const { sessionResultDisplay } = useAppSelector((state) => state.app)
  const { boardTileCount } = useAppSelector((state) => state.settings)
  const { tileUnFlipDelay, tileMode } = useAppSelector(
    (state) => state.settings
  )
  const { resetCount } = useAppSelector((state) => state.sessionStats)
  const board = useRef<HTMLDivElement>(null)
  const boardOverlay = useRef<HTMLDivElement>(null)

  const tiles = useMemo(
    () =>
      Array.from({ length: boardTileCount }, (_, index) => {
        const order = Math.floor(Math.random() * boardTileCount)
        const id = (Math.floor(index / 2) + 1).toString()

        return (
          <Tile
            key={index}
            index={index}
            id={id}
            order={order}
            board={board}
            boardOverlay={boardOverlay}
            unFlipDelay={tileUnFlipDelay}
            tileMode={tileMode}
          />
        )
      }),
    [resetCount]
  )

  return (
    <main className="w-dvw h-dvh flex justify-center items-center overflow-hidden relative pt-0 md:pb-8 max-md:items-start max-md:pt-4">
      <Image
        src={"/session-bg.png"}
        alt="background image"
        fill
        sizes="100vw"
        className="-z-10"
      />
      <div className="md:grid grid-cols-[1fr_auto_1fr] items-center justify-items-end gap-x-5 lg:gap-x-10 max-md:flex max-md:flex-col max-md:gap-y-4">
        <CountdownTimer />
        {/* BOARD & FRAME */}
        <div className="size-dvw sm:size-[23rem] md:size-[30rem] aspect-square relative transition-all max-md:order-3">
          {/* FRAME */}
          <Image
            src="/board-frame-thin.png"
            alt="board frame image"
            fill
            sizes="(max-width: 1280px) 100vw, 30rem"
            className="object-contain"
          />

          {/* BOARD */}
          <div
            ref={board}
            id="board"
            style={{
              gridTemplateColumns: `repeat(${Math.sqrt(
                boardTileCount
              )}, minmax(0, 1fr))`,
            }}
            className={`board size-[88%] absolute inset-0 m-auto grid gap-2 p-2`}
          >
            {/* overlay for preventing user interaction when needed */}
            <div
              ref={boardOverlay}
              className="absolute inset-0 m-auto size-full z-10 hidden"
            />
            {tiles}
          </div>
        </div>
        <SessionStats />
      </div>
      <SessionNav board={board} />
      {sessionResultDisplay && (
        <Portal>
          <SessionResult />
        </Portal>
      )}
    </main>
  )
}
