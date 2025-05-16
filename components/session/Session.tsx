"use client"

import Image from "next/image"
import CountdownTimer from "../CountdownTimer"
import SessionStats from "../SessionStats"
import SessionNav from "../SessionNav"
import { useMemo, useRef } from "react"
import Tile from "../Tile"
import "./session.css"

export default function Session() {
  const board = useRef<HTMLDivElement>(null)
  const boardOverlay = useRef<HTMLDivElement>(null)
  const OpenTileID = useRef<string | null>(null)
  const isAnyTileOpen = useRef<boolean>(false)

  const resetActiveTile = () => {}

  const tiles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => {
        const order = Math.floor(Math.random() * 16)
        const id = (Math.floor(index / 2) + 1).toString()

        return (
          <Tile
            key={index}
            index={index}
            id={id}
            order={order}
            board={board}
            boardOverlay={boardOverlay}
            OpenTileID={OpenTileID}
            isAnyTileOpen={isAnyTileOpen}
          />
        )
      }),
    []
  )

  return (
    <main className="w-dvw h-dvh flex flex-col justify-center items-center overflow-hidden relative">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center justify-items-end gap-x-10">
        <CountdownTimer />
        <div className="w-[27rem] h-[27rem] relative">
          <Image
            src={"/board-frame-thin.png"}
            alt="board frame image"
            fill
            className="object-contain"
          />
          <div
            ref={board}
            className="board size-[87%] absolute inset-0 m-auto grid grid-cols-4 gap-2 p-2"
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
      <SessionNav
        board={board}
        OpenTileID={OpenTileID}
        isAnyTileOpen={isAnyTileOpen}
      />
    </main>
  )
}
