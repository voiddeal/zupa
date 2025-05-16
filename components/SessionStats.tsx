import { useAppSelector } from "@/redux/hooks"
import Eye from "./Eye"
import Image from "next/image"

export default function SessionStats() {
  const { score, attempts, correct, mistake, strike } = useAppSelector(
    (state) => state.sessionStats
  )

  return (
    <div className="h-full flex flex-col items-center justify-between">
      <div className="w-full flex justify-evenly relative">
        <Image
          src={"/cat-face.png"}
          width={1000}
          height={1000}
          alt="cat face"
          className="absolute inset-0 m-auto size-80 object-contain z-10"
        />
        <Eye />
        <Eye />
      </div>
      <div className="relative">
        <Image
          src={"/stats-board.jpg"}
          alt="stats board"
          width={1000}
          height={1000}
          className="object-fill -z-10 size-72"
        />
        <div className="absolute inset-x-0 mx-auto top-4 left-2 text-stone-50 text-2xl flex flex-col gap-y-3 pl-8">
          <div>
            Score: <span className="text-amber-300">{score}</span>
          </div>
          <div className="flex items-center gap-x-2">
            {/* <Image
              src={"/attempts.png"}
              alt="image icon"
              width={50}
              height={50}
              className="size-7 z-10"
            /> */}
            <span>Attempts: {attempts}</span>
          </div>
          <div className="flex items-center gap-x-2">
            {/* <Image
              src={"/check.png"}
              alt="image icon"
              width={50}
              height={50}
              className="size-7"
            /> */}
            <span>
              Correct: <span className="text-green-400">{correct}</span>
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            {/* <Image
              src={""}
              alt="image icon"
              width={50}
              height={50}
              className="size-7"
            /> */}
            <span>
              Strike: <span className="text-blue-600">{strike}</span>
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            {/* <Image
              src={"/x.png"}
              alt="image icon"
              width={50}
              height={50}
              className="size-7"
            /> */}
            <span>
              Mistake: <span className="text-red-500">{mistake}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
