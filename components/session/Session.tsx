import FlipCard from "../flip-card/FlipCard"
import Image from "next/image"
import CountdownTimer from "../CountdownTimer"
import SessionStats from "../SessionStats"
import SessionNav from "../SessionNav"
import { useMemo, useRef } from "react"
import "./session.css"

export default function Session() {
  // const [OpenTileID, setOpenTileID] = useState<number | null>(null)
  // const [isAnyTileOpen, setIsAnyTileOpen] = useState<boolean>(false)
  const OpenTileID = useRef<string | null>(null)
  const board = useRef<HTMLDivElement>(null)
  const boardOverlay = useRef<HTMLDivElement>(null)

  const Flip = (tile: HTMLDivElement) => {
    const face = tile.getElementsByClassName("face")[0]
    const isScored = face?.classList.contains("score")
    if (OpenTileID.current && !isScored) {
      boardOverlay.current!.style.display = "block"
      boardOverlay.current!.style.cursor = "wait"
      setTimeout(() => {
        boardOverlay.current!.style.display = "none"
        boardOverlay.current!.style.cursor = "default"
      }, 1000)
    }
    face?.classList.add("is-flipped")
  }

  const unFlip = (tile?: HTMLDivElement) => {
    const face = tile?.getElementsByClassName("face")[0]
    if (!face?.classList.contains("score")) {
      setTimeout(() => {
        board.current?.querySelectorAll(".face:not(.score)").forEach((tile) => {
          tile.classList.remove("is-flipped")
        })
      }, 1000)
    }
  }

  const oneTwo = (tile: HTMLDivElement, value: string | null, id: string) => {
    const face = tile.querySelector(".face")
    if (!face?.classList.contains("score")) OpenTileID.current = value
    else OpenTileID.current = null
  }

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
            onClick={(event) => {
              const tile = event.currentTarget
              // if there is a flipped and unscored tile
              if (OpenTileID.current) {
                // if it's a score
                if (OpenTileID.current === id) {
                  score(id)
                  Flip(tile)
                  unFlip()
                  oneTwo(tile, null, id)

                  // if the guess is wrong
                } else {
                  Flip(tile)
                  unFlip(tile)
                  oneTwo(tile, null, id)
                }

                // if there is no flipped tile yet (other than the possible scores)
              } else {
                Flip(tile)
                oneTwo(tile, id, id)
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
