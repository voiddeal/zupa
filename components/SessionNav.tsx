"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { appActions } from "@/redux/slices/appSlice"
import { sessionStatsActions } from "@/redux/slices/sessionStatsSlice"
import Image from "next/image"
import Portal from "./Portal"
import Records from "./Records"
import Settings from "./settings/Settings"
import unFlipTiles from "@/utils/unFlipTiles"

interface SessionNavProps {
  board: React.RefObject<HTMLDivElement | null>
}

export default function SessionNav({ board }: SessionNavProps) {
  const dispatch = useAppDispatch()
  const { recordsDisplay, settingsDisplay } = useAppSelector(
    (state) => state.app
  )
  const NAV_BUTTON_CLASSNAMES =
    "size-10 rounded-full bg-yellow-200 overflow-hidden cursor-pointer hover:scale-110 active:scale-100 transition-transform"

  const restart = () => {
    dispatch(sessionStatsActions.reset())
    dispatch(sessionStatsActions.clearActiveTileID())
    unFlipTiles({ board: board, all: true, shouldWait: false })
  }

  const showRecords = () => {
    dispatch(appActions.setRecordsDisplay(true))
  }

  const showSettings = () => {
    dispatch(appActions.setIsTimerPaused(true))
    dispatch(appActions.setSettingsDisplay(true))
  }

  return (
    <nav className="absolute bottom-6 max-md:bottom-2">
      <ul className="flex gap-x-5 bg-orange-200 rounded-xl px-4 py-2">
        <li className={NAV_BUTTON_CLASSNAMES} onClick={showSettings}>
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
        <li className={NAV_BUTTON_CLASSNAMES} onClick={restart} title="Restart">
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

      {settingsDisplay && (
        <Portal>
          <Settings board={board} />
        </Portal>
      )}
    </nav>
  )
}
