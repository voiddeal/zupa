import { useAppSelector } from "@/redux/hooks"
import Eye from "./Eye"
import Image from "next/image"

export default function SessionStats() {
  const { attempts, correct, mistake, strike } = useAppSelector(
    (state) => state.sessionStats
  )

  return (
    <div className="h-full flex flex-col items-center justify-between max-sm:pb-4">
      {/* cat */}
      <div className="w-full flex justify-center gap-x-12 relative mt-12 max-lg:hidden max-xl:scale-75">
        <Image
          src={"/cat-face.png"}
          width={1000}
          height={1000}
          alt="cat face"
          className="absolute inset-0 m-auto size-80 object-contain z-10 select-none"
          draggable={false}
        />
        <Eye />
        <Eye />
      </div>
      <div className="relative md:mr-8 lg:mr-4 xl:mr-0">
        {/* BOARD IMAGE */}
        <Image
          src={"/stats-board.png"}
          alt="stats board"
          width={1000}
          height={1000}
          className="object-fill -z-10 size-72 max-md:h-10 max-md:object-cover"
        />
        <div className="absolute inset-x-0 mx-auto top-4 max-md:top-0 left-2 text-stone-50 text-2xl flex md:flex-col md:gap-y-[1.12rem] lg:pl-7 md:py-2 max-md:justify-between max-md:h-full max-md:items-center max-md:px-4">
          <div className="flex max-lg:justify-evenly items-center gap-x-3">
            <Image
              src={"/attempt.png"}
              alt="image icon"
              width={50}
              height={50}
              className="size-[1.85rem] max-md:scale-85"
            />
            <span className="max-lg:hidden">Attempts:</span>
            <span className="md:pl-1">{attempts}</span>
          </div>
          <div className="flex max-lg:justify-evenly items-center gap-x-3">
            <Image
              src={"/correct.png"}
              alt="image icon"
              width={50}
              height={50}
              className="size-7 max-md:scale-85"
            />
            <span className="max-lg:hidden">Correct:</span>
            <span className="text-green-400 md:pl-1">{correct}</span>
          </div>
          <div className="flex max-lg:justify-evenly items-center gap-x-3">
            <Image
              src={"/strike.png"}
              alt="image icon"
              width={50}
              height={50}
              className="size-7 max-md:scale-85"
            />
            <span className="max-lg:hidden">Strikes:</span>
            <span className="text-yellow-300 md:pl-1">{strike}</span>
          </div>
          <div className="flex max-lg:justify-evenly items-center gap-x-3">
            <Image
              src={"/mistake.png"}
              alt="image icon"
              width={50}
              height={50}
              className="size-8 max-md:scale-85"
            />
            <span className="max-lg:hidden">Mistakes:</span>
            <span className="text-red-600 md:pl-1">{mistake}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
