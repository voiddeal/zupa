import Image from "next/image"
import Modal from "../modal/Modal"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { appActions } from "@/redux/slices/appSlice"
import Button from "../Button"
import TimeSelection from "./TimeSelection"
import FlipDelaySelection from "./FlipDelaySelection"
import TileCount from "./TileCount"
import TileMode from "./TileMode"
import { useEffect } from "react"
import { sessionStatsActions } from "@/redux/slices/sessionStatsSlice"
import CalcOptions from "./CalcOptions"
import unFlipTiles from "@/utils/unFlipTiles"
import "./settings.css"

interface SettingsProps {
  board?: React.RefObject<HTMLDivElement | null>
}

export default function Settings({ board }: SettingsProps) {
  const dispatch = useAppDispatch()
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).id === "modal-backdrop") {
      dispatch(appActions.setSettingsDisplay(false))
    }
  }
  const settings = useAppSelector((state) => state.settings)
  const { view } = useAppSelector((state) => state.app)

  const closeSettings = () => {
    dispatch(appActions.setSettingsDisplay(false))
    dispatch(appActions.setIsTimerPaused(false))
    dispatch(sessionStatsActions.clearActiveTileID())
    dispatch(sessionStatsActions.reset())
    if (view === "session" && board)
      unFlipTiles({ board: board, all: true, shouldWait: false })
  }

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings))
  }, [settings])

  return (
    <Modal backdropClickHandler={handleBackdropClick}>
      <div className="relative w-[50rem] h-[32rem] text-white">
        <Image
          src={"/tile-front.jpg"}
          fill
          alt="back ground image"
          sizes="50vw"
          className="-z-10"
        />
        <div className="flex justify-evenly mt-10">
          <TileCount />
          <TimeSelection />
          <TileMode />
        </div>
        <div className="flex justify-evenly mt-10">
          <FlipDelaySelection />
          <CalcOptions />
          <div></div>
        </div>
        <div className="w-fit absolute bottom-5 inset-x-0 mx-auto">
          <Button value={"OK"} onClick={closeSettings} />
        </div>
      </div>
    </Modal>
  )
}
