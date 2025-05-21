import Image from "next/image"
import FlipCard from "./flip-card/FlipCard"
import { RefObject } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { sessionStatsActions } from "@/redux/slices/sessionStatsSlice"
import { appActions } from "@/redux/slices/appSlice"
import unFlipTiles from "@/utils/unFlipTiles"
import type { Settings } from "@/types/models"

interface TileProps {
  index: number
  id: string
  order: number
  board: RefObject<HTMLDivElement | null>
  boardOverlay: RefObject<HTMLDivElement | null>
  unFlipDelay: number
  tileMode: Settings["tileMode"]
}

export default function Tile({
  index,
  id,
  order,
  board,
  boardOverlay,
  unFlipDelay,
  tileMode,
}: TileProps) {
  const dispatch = useAppDispatch()
  const { activeTileID } = useAppSelector((state) => state.sessionStats)

  const FrontFaceClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    const tile = event.currentTarget.parentElement! as HTMLDivElement
    // if there is a flipped and unscored tile open
    if (activeTileID) {
      // if it's a score
      if (activeTileID === id) {
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
        unFlipTiles({ board: board, delay: unFlipDelay })
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
    if (activeTileID && !isScored) {
      boardOverlay.current!.style.display = "block"
      boardOverlay.current!.style.cursor = "wait"
      setTimeout(() => {
        boardOverlay.current!.style.display = "none"
        boardOverlay.current!.style.cursor = "default"
      }, unFlipDelay)
    }

    tile?.classList.add("is-flipped")
  }

  // Keep tracking of tile conditions
  const mark = (value: string | null) => {
    dispatch(sessionStatsActions.setActiveTileID(value))
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
    const tiles = board.current?.getElementsByClassName("face")
    if (!tiles) return
    const areAllTilesFlipped = Array.from(tiles).every((tile) => {
      return tile.classList.contains("is-flipped")
    })
    if (areAllTilesFlipped) {
      dispatch(appActions.setIsTimerPaused(true))
      dispatch(appActions.setSessionResultDisplay(true))
    }
  }

  return (
    <FlipCard
      isInitiallyFlipped={true}
      key={index}
      front={
        <Image src={"/hidden-tile.png"} alt="front face" fill sizes="100px" />
      }
      back={
        <div className="relative size-full">
          <Image src={"/tile-back.jpg"} alt="front face" fill sizes="100px" />
          <Image
            src={`/${tileMode}/${Math.floor(index / 2) + 1}.png`}
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
