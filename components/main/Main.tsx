"use client"

import Image from "next/image"
import { useDispatch } from "react-redux"
import Button from "../Button"
import CoverLayer from "../cover-layer-animation/CoverLayerAnimation"
import DelayedRender from "../DelayedRender"
import { CSSProperties } from "react"
import { appActions } from "@/redux/slices/appSlice"
import Portal from "../Portal"
import Settings from "../settings/Settings"
import { useAppSelector } from "@/redux/hooks"
import Records from "../Records"
import "./main.css"

export default function Main() {
  const dispatch = useDispatch()
  const { recordsDisplay, settingsDisplay } = useAppSelector(
    (state) => state.app
  )
  const HEADER_TILE_CLASSNAMES =
    "header-block w-20 h-32 rounded-lg text-center leading-32 text-8xl"

  const start = () => {
    dispatch(appActions.setView("session"))
  }

  const openSettings = () => {
    dispatch(appActions.setSettingsDisplay(true))
  }

  const openRecord = () => {
    dispatch(appActions.setRecordsDisplay(true))
  }

  return (
    <main className="relative h-dvh w-dvw">
      <Image
        src={"/main-bg.jpg"}
        alt="image"
        fill
        className="-z-10 object-cover"
      />
      <header className="absolute inset-x-0 top-20 mx-auto">
        <h1 className="flex justify-center items-center gap-x-2 text-white">
          <div
            className={`${HEADER_TILE_CLASSNAMES} shadow-[0px_10px_0px_rgba(84,79,209,1),0_5px_20px_rgba(0,0,0,0.5)] bg-[#736FD3] rotate-6`}
            style={{ "--delay": "500ms" } as CSSProperties}
          >
            Z
          </div>
          <div
            className={`${HEADER_TILE_CLASSNAMES} shadow-[0px_10px_0px_rgb(200,46,125,1),-5px_5px_10px_rgba(0,0,0,0.5)] bg-[#CC5794] -rotate-6 -translate-y-4`}
            style={{ "--delay": "700ms" } as CSSProperties}
          >
            U
          </div>
          <div
            className={`${HEADER_TILE_CLASSNAMES} shadow-[0px_10px_0px_rgba(1,166,101,1),-5px_5px_10px_rgba(0,0,0,0.5)] bg-[#43C592] rotate-6`}
            style={{ "--delay": "900ms" } as CSSProperties}
          >
            P
          </div>
          <div
            className={`${HEADER_TILE_CLASSNAMES} shadow-[0px_10px_0px_rgba(217,156,2,1),0px_5px_20px_rgba(0,0,0,0.5)] bg-[#FDC53A] -rotate-6 -translate-y-4`}
            style={{ "--delay": "1100ms" } as CSSProperties}
          >
            A
          </div>
        </h1>
        <DelayedRender delay={1000}>
          <div className="relative w-fit mx-auto">
            <CoverLayer />
            <span className="block mt-5 text-center text-white text-3xl">
              An Epic Tile Adventure
            </span>
          </div>
        </DelayedRender>
      </header>
      <div className="main-buttons absolute w-full bottom-10 flex flex-col justify-center items-center gap-y-5">
        <Button value="PLAY" onClick={start} />
        <Button value="SETTINGS" onClick={openSettings} />
        <Button value="RECORD" onClick={openRecord} />
      </div>

      {settingsDisplay && (
        <Portal>
          <Settings />
        </Portal>
      )}

      {recordsDisplay && (
        <Portal>
          <Records />
        </Portal>
      )}
    </main>
  )
}
