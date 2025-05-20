import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import Modal from "./modal/Modal"
import Image from "next/image"
import { appActions } from "@/redux/slices/appSlice"
import { recordsActions } from "@/redux/slices/recordsSlice"

export default function Records() {
  const dispatch = useAppDispatch()
  const records = useAppSelector((state) => state.records)
  const rows = records.map((record, index) => {
    const { score, date } = record
    const rank = !(index > 2) ? (
      <Image
        src={`/${index + 1}.png`}
        width={20}
        height={20}
        alt="medal"
        className="block w-5 mx-auto"
      />
    ) : (
      index + 1
    )

    return (
      <tr className="" key={index}>
        <td className="text-lg py-2">{rank}</td>
        <td className="text-lg py-2">{score}</td>
        <td className="py-2">{date}</td>
      </tr>
    )
  })

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).id === "modal-backdrop") {
      dispatch(appActions.setRecordsDisplay(false))
    }
  }

  return (
    <Modal backdropClickHandler={handleBackdropClick}>
      <div className="w-[25rem] h-[35rem] relative text-white">
        <Image
          src={"/tile-front.jpg"}
          alt="background image"
          fill
          className="-z-10"
        />
        <div>
          <header>
            <h4 className="text-4xl text-center py-4 underline">High Scores</h4>
          </header>
          <Image
            src={"/x-button.png"}
            width={50}
            height={50}
            alt="close button"
            className="absolute top-4 right-4 hover:scale-105 active:scale-100 transition-[scale] size-10"
            onClick={() => dispatch(appActions.setRecordsDisplay(false))}
          />
          {records.length ? (
            <Image
              src={"/clean-button.png"}
              width={50}
              height={50}
              alt="clear button"
              className="absolute top-4 left-4 hover:scale-105 active:scale-100 transition-[scale] size-10"
              onClick={() => dispatch(recordsActions.clean())}
            />
          ) : null}
        </div>
        {records.length ? (
          <table className="w-full text-center mt-4">
            <thead className="text-2xl">
              <tr>
                <th>Rank</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        ) : (
          <div className="size-full flex justify-center items-center text-2xl">
            No Records!
          </div>
        )}
      </div>
    </Modal>
  )
}
