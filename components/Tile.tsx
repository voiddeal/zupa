import Image from "next/image"
import FlipCard from "./flip-card/FlipCard"
import { RefObject, useRef } from "react"
import { useAppDispatch } from "@/redux/hooks"
import { sessionStatsActions } from "@/redux/slices/sessionStatsSlice"
import unFlip from "@/utils/unFlipTiles"

interface TileProps {
  index: number
  id: string
  order: number
  board: RefObject<HTMLDivElement | null>
  boardOverlay: RefObject<HTMLDivElement | null>
  OpenTileID: RefObject<string | null>
  isAnyTileOpen: RefObject<boolean>
}

export default function Tile({
  index,
  id,
  order,
  board,
  boardOverlay,
  OpenTileID,
  isAnyTileOpen,
}: TileProps) {
  const dispatch = useAppDispatch()
  const inSessionFinished = useRef<boolean>(false)

  const FrontFaceClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    const tile = event.currentTarget.parentElement! as HTMLDivElement
    // if there is a flipped and unscored tile open
    if (isAnyTileOpen.current) {
      // if it's a score
      if (OpenTileID.current === id) {
        score(id)
        Flip(tile)
        mark(null)
        increaseAttempts()
        increaseCorrect()
        updateLastAttempt(true)
        updateStrike()
        checkForFinish()

        // if the guess is wrong
      } else {
        Flip(tile)
        unFlip({ board })
        mark(null)
        increaseAttempts()
        increaseMistake()
        updateLastAttempt(false)
        checkForFinish()
      }

      // if there is no flipped tile yet (other than the possible scores)
    } else {
      Flip(tile)
      mark(id)
    }
  }

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
    })
  }

  const increaseAttempts = () => {
    dispatch(sessionStatsActions.addAttempt())
  }

  const increaseCorrect = () => {
    dispatch(sessionStatsActions.addCorrect())
  }

  const increaseMistake = () => {
    dispatch(sessionStatsActions.addMistake())
  }

  const updateLastAttempt = (value: boolean) => {
    dispatch(sessionStatsActions.setLastAttempt(value))
  }

  const updateStrike = () => {
    dispatch(sessionStatsActions.updateStrike())
  }
  const checkForFinish = () => {
    const tiles = board.current?.getElementsByClassName("face")!
    const areAllTilesFlipped = Array.from(tiles).every((tile) => {
      return tile.classList.contains("is-flipped")
    })
  }

  return (
    <FlipCard
      key={index}
      // front={<Image src={"/hidden-tile.png"} alt="front face" fill sizes="100px" />}
      // front={
      //   <Image
      //     src={"/tile-front.jpg"}
      //     alt="front face"
      //     fill
      //     sizes="100px"
      //   />
      // }
      front={
        <div className="size-full flex justify-center items-center">{id}</div>
      }
      back={
        <div className="relative size-full">
          <Image src={"/tile-back.jpg"} alt="front face" fill sizes="100px" />
          <Image
            src={`/animals/${Math.floor(index / 2) + 1}.png`}
            alt="back face"
            fill
            sizes="100px"
            className="p-1"
          />
        </div>
      }
      allowBackFlip={false}
      id={id}
      size="100%"
      className="tile size-full select-none cursor-pointer rounded-lg overflow-hidden"
      style={{ "--delay": `${(index + 1) / 10}s`, order }}
      frontFaceOnClick={(e) => FrontFaceClickHandler(e, id)}
    />
  )
}
