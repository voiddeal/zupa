import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { settingsActions } from "@/redux/slices/settingsSlice"
import type { Settings } from "@/types/models"

interface DATA {
  name: string
  value: Settings["sessionTime"]
}

export default function TimeSelection() {
  const dispatch = useAppDispatch()
  const { sessionTime } = useAppSelector((state) => state.settings)
  const DATA: DATA[] = [
    {
      name: "1 Min",
      value: 60,
    },
    {
      name: "1.5 Min",
      value: 90,
    },
    {
      name: "2 Min",
      value: 120,
    },
  ]

  const radios = DATA.map((data, index) => {
    const { name, value } = data
    return (
      <div key={index} className="flex items-center gap-x-5">
        <input
          id={`time-${value}`}
          type="radio"
          name="session-time"
          value={value}
          checked={sessionTime === value}
          onChange={() => timeHandler(value)}
        />
        <label htmlFor={`time-${value}`}>{name}</label>
      </div>
    )
  })

  const timeHandler = (value: Settings["sessionTime"]) => {
    dispatch(settingsActions.setSessionTime(value))
  }

  return (
    <div className="w-fit flex flex-col items-center">
      <strong className="text-3xl underline pb-2">Game Time</strong>
      <div className="flex flex-col gap-y-2 text-2xl">{radios}</div>
    </div>
  )
}
