"use client"

import { viewActions } from "@/redux/slices/viewSlice"
import Image from "next/image"
import { useDispatch } from "react-redux"

export default function Main() {
  const dispatch = useDispatch()
  const HEADER_TILE_CLASSNAMES =
    "w-20 h-32 rounded-lg text-center leading-32 text-7xl"

  const start = () => {
    dispatch(viewActions.setView("session"))
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
          >
            Z
          </div>
          <div
            className={`${HEADER_TILE_CLASSNAMES} shadow-[0px_10px_0px_rgb(200,46,125,1),-5px_5px_10px_rgba(0,0,0,0.5)] bg-[#CC5794] -rotate-6`}
          >
            U
          </div>
          <div
            className={`${HEADER_TILE_CLASSNAMES} shadow-[0px_10px_0px_rgba(1,166,101,1),-5px_5px_10px_rgba(0,0,0,0.5)] bg-[#43C592] rotate-6`}
          >
            P
          </div>
          <div
            className={`${HEADER_TILE_CLASSNAMES} shadow-[0px_10px_0px_rgba(217,156,2,1),0px_5px_20px_rgba(0,0,0,0.5)] bg-[#FDC53A] -rotate-6`}
          >
            A
          </div>
        </h1>
        <span className="block mt-5 text-center text-white">
          An Epic Tile Adventure
        </span>
      </header>
      <button
        type="button"
        className="absolute inset-x-0 bottom-10 mx-auto w-60 pb-2 py-1 text-2xl bg-teal-600 text-white rounded-xl shadow-[0px_4px_0px_rgba(0,0,0,0.5)] shadow-teal-800 cursor-pointer hover:bg-teal-500 active:translate-y-1 active:shadow-none active:bg-teal-400 transition-all"
        onClick={start}
      >
        PLAY
      </button>
    </main>
  )
}
