import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { settingsActions } from "@/redux/slices/settingsSlice"
import type { Settings } from "@/types/models"

interface DATA {
  name: string
  value: Settings["tileMode"]
}

export default function TileMode() {
  const dispatch = useAppDispatch()
  const { tileMode } = useAppSelector((state) => state.settings)

  const DATA: DATA[] = [
    {
      name: "Animals",
      value: "animals",
    },
    {
      name: "Flowers",
      value: "flowers",
    },
    {
      name: "Humans",
      value: "humans",
    },
  ]

  const radios = DATA.map((data, index) => {
    const { name, value } = data
    const isHuman = value === "humans"
    return (
      <div
        key={index}
        className="flex items-center gap-x-5"
        title={isHuman ? "not available yet..." : ""}
      >
        <input
          id={`tile-mode-${value}`}
          type="radio"
          name="tile-mode"
          value={value}
          checked={tileMode === value}
          disabled={isHuman}
          onChange={() => tileModeOnChange(value)}
        />
        <label htmlFor={`tile-mode-${value}`}>{name}</label>
      </div>
    )
  })

  const tileModeOnChange = (value: Settings["tileMode"]) => {
    dispatch(settingsActions.setTileMode(value))
  }

  return (
    <div className="w-fit flex flex-col items-center">
      <strong className="text-3xl underline pb-2">Tlie Mode</strong>
      <div className="flex flex-col gap-y-2 text-2xl">{radios}</div>
    </div>
  )
}
