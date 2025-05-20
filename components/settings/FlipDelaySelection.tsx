import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { settingsActions } from "@/redux/slices/settingsSlice"
import type { Settings } from "@/types/models"

interface DATA {
  name: string
  value: Settings["tileUnFlipDelay"]
}

export default function FlipDelaySelection() {
  const dispatch = useAppDispatch()
  const { tileUnFlipDelay } = useAppSelector((state) => state.settings)
  const DATA: DATA[] = [
    {
      name: "1 sec",
      value: 1000,
    },
    {
      name: "1.5 sec",
      value: 1500,
    },
    {
      name: "2 sec",
      value: 2000,
    },
  ]

  const radios = DATA.map((data, index) => {
    const { name, value } = data
    return (
      <div key={index} className="flex items-center gap-x-5">
        <input
          id={`tile-delay-${value}`}
          type="radio"
          name="tile-delay"
          value={value}
          checked={tileUnFlipDelay === value}
          onChange={() => flipDelayHandler(value)}
        />
        <label htmlFor={`tile-delay-${value}`}>{name}</label>
      </div>
    )
  })

  const flipDelayHandler = (value: Settings["tileUnFlipDelay"]) => {
    dispatch(settingsActions.setTileFlipDelay(value))
  }

  return (
    <div className="w-fit flex flex-col items-center">
      <strong className="text-3xl underline pb-2">Tile Flip Delay</strong>
      <div className="flex flex-col gap-y-2 text-2xl">{radios}</div>
    </div>
  )
}
