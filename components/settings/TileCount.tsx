import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { settingsActions } from "@/redux/slices/settingsSlice"
import type { Settings } from "@/types/models"

interface DATA {
  name: string
  value: Settings["boardTileCount"]
}

export default function TileCount() {
  const dispatch = useAppDispatch()
  const { boardTileCount } = useAppSelector((state) => state.settings)
  const DATA: DATA[] = [
    {
      name: "16 Tiles",
      value: 16,
    },
    {
      name: "36 Tiles",
      value: 36,
    },
  ]

  const radios = DATA.map((data, index) => {
    const { name, value } = data
    return (
      <div key={index} className="flex items-center gap-x-5">
        <input
          id={`tile-count-${value}`}
          type="radio"
          name="tile-count"
          value={value}
          checked={boardTileCount === value}
          onChange={() => tileCountHandler(value)}
        />
        <label htmlFor={`tile-count-${value}`}>{name}</label>
      </div>
    )
  })

  const tileCountHandler = (value: Settings["boardTileCount"]) => {
    dispatch(settingsActions.setBoardTileCount(value))
  }

  return (
    <div className="w-fit flex flex-col items-center">
      <strong className="text-3xl underline pb-2">Number of Tiles</strong>
      <div className="flex flex-col gap-y-2 text-2xl">{radios}</div>
    </div>
  )
}
