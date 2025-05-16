"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { appActions } from "@/redux/slices/appSlice"
import { sessionStatsActions } from "@/redux/slices/sessionStatsSlice"
import Image from "next/image"
import Portal from "./Portal"
import Records from "./Records"
import unFlip from "@/utils/unFlipTiles"

interface SessionNavProps {
  board: React.RefObject<HTMLDivElement | null>
  isAnyTileOpen: React.RefObject<boolean>
  OpenTileID: React.RefObject<string | null>
}

export default function SessionNav({
  board,
  OpenTileID,
  isAnyTileOpen,
}: SessionNavProps) {
  const { recordsDisplay } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const NAV_BUTTON_CLASSNAMES =
    "size-10 rounded-full bg-yellow-200 overflow-hidden cursor-pointer hover:scale-110 active:scale-100 transition-transform"

  const restart = () => {
    resetSessionStats()
    unFlip({ board, all: true, wait: false })
    OpenTileID.current = null
    isAnyTileOpen.current = false
  }

  const resetSessionStats = () => {
    dispatch(sessionStatsActions.reset())
  }

  const showRecords = () => {
    dispatch(appActions.setRecordsDisplay(true))
  }

  return (
    <nav className="absolute bottom-6">
      <ul className="flex gap-x-5 bg-orange-200 rounded-xl px-4 py-2">
        <li className={NAV_BUTTON_CLASSNAMES}>
          <Image
            src={"/menu-button.png"}
            alt="menu button"
            width={100}
            height={100}
          />
        </li>
        <li className={NAV_BUTTON_CLASSNAMES} onClick={showRecords}>
          <Image
            src={"/records-button.png"}
            alt="records button"
            width={100}
            height={100}
            className="scale-110"
          />
        </li>
        <li
          className={NAV_BUTTON_CLASSNAMES}
          onClick={restart}
          title="Resetart"
        >
          <Image
            src={"/restart-button.png"}
            alt="restart button"
            width={100}
            height={100}
            className="size-full"
          />
        </li>
      </ul>
      {recordsDisplay && (
        <Portal>
          <Records />
        </Portal>
      )}
    </nav>
  )
}
