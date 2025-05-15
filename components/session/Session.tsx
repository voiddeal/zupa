import FlipCard from "../flip-card/FlipCard"
import Image from "next/image"
import CountdownTimer from "../CountdownTimer"
import SessionStats from "../SessionStats"
import SessionNav from "../SessionNav"
import { useMemo, useRef } from "react"
import "./session.css"

export default function Session() {
  const OpenTileID = useRef<string | null>(null)
  const isAnyTileOpen = useRef<boolean>(false)
  const board = useRef<HTMLDivElement>(null)
  const boardOverlay = useRef<HTMLDivElement>(null)

  // Flip the given tile
  const Flip = (tile: HTMLDivElement) => {
    const isScored = tile?.classList.contains("score")
    // the wait mechanic
    if (isAnyTileOpen.current && !isScored) {
      boardOverlay.current!.style.display = "block"
      boardOverlay.current!.style.cursor = "wait"
      setTimeout(() => {
        boardOverlay.current!.style.display = "none"
        boardOverlay.current!.style.cursor = "default"
      }, 1000)
    }

    tile?.classList.add("is-flipped")
  }

  // Unflip all tiles except the scored tiles
  const unFlip = () => {
    setTimeout(() => {
      board.current?.querySelectorAll(".face:not(.score)").forEach((tile) => {
        tile.classList.remove("is-flipped")
      })
    }, 1000)
  }

  // Keep tracking of tile conditions
  const mark = (value: string | null) => {
    OpenTileID.current = value
    OpenTileID.current
      ? (isAnyTileOpen.current = true)
      : (isAnyTileOpen.current = false)
  }

  // Adding "score" Class to the tile
  const score = (id: string) => {
    board.current?.querySelectorAll(`[id='${id}']`).forEach((tile) => {
      tile.querySelector(".face")?.classList.add("score")
      ;(tile as HTMLElement).style.cursor = "not-allowed"
    })
  }

  const tiles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => {
        const order = Math.floor(Math.random() * 16)
        const id = (Math.floor(index / 2) + 1).toString()

        return (
          <FlipCard
            key={index}
            // front={<Image src={"/yoho.png"} alt="front face" fill />}
            front={id}
            back={
              <Image
                src={`/animals/${Math.floor(index / 2) + 1}.png`}
                alt="back face"
                fill
              />
            }
            allowBackFlip={false}
            id={id}
            size="100%"
            className="tile size-full select-none cursor-pointer rounded-lg overflow-hidden"
            style={{ "--delay": `${(index + 1) / 10}s`, order }}
            frontFaceOnClick={(event) => {
              const tile = event.currentTarget.parentElement! as HTMLDivElement
              // if there is a flipped and unscored tile open
              if (isAnyTileOpen.current) {
                // if it's a score
                if (OpenTileID.current === id) {
                  score(id)
                  Flip(tile)
                  unFlip()
                  mark(null)

                  // if the guess is wrong
                } else {
                  Flip(tile)
                  unFlip()
                  mark(null)
                }

                // if there is no flipped tile yet (other than the possible scores)
              } else {
                Flip(tile)
                mark(id)
              }
            }}
          />
        )
      }),
    []
  )

  return (
    <main className="w-dvw h-dvh flex flex-col justify-center items-center overflow-hidden relative">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-x-10">
        <CountdownTimer />
        <div
          ref={board}
          className="board relative w-96 h-96 bg-gray-200 mx-auto grid grid-cols-4 gap-2 p-2"
        >
          <div
            ref={boardOverlay}
            className="absolute inset-0 m-auto size-full z-10 hidden"
          ></div>
          {tiles}
        </div>
        <SessionStats />
      </div>
      <SessionNav />
    </main>
  )
}
