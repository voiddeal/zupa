import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { settingsActions } from "@/redux/slices/settingsSlice"

export default function CalcOptions() {
  const dispatch = useAppDispatch()
  const { shouldCalculateMistakes, shouldCalculateAttempts, sounds } =
    useAppSelector((state) => state.settings)

  const setMissCalculation = () => {
    dispatch(
      settingsActions.setShouldCalculateMistakes(!shouldCalculateMistakes)
    )
  }

  const setAttemptCalculation = () => {
    dispatch(
      settingsActions.setShouldCalculateAttempts(!shouldCalculateAttempts)
    )
  }

  const setSounds = () => {
    dispatch(settingsActions.setSounds(!sounds))
  }

  return (
    <div
      className="flex flex-col justify-between"
      title="should the attempts count in final score?"
    >
      <div className="flex items-center justify-between gap-x-5 h-fit">
        <label htmlFor="mistake-calc" className="text-3xl underline">
          Mistake Calculation (?)
        </label>
        <input
          id="mistake-calc"
          type="checkbox"
          checked={shouldCalculateMistakes}
          onChange={setMissCalculation}
        />
      </div>
      <div
        className="flex items-center justify-between gap-x-5 h-fit"
        title="should the mistakes count in final score?"
      >
        <label htmlFor="attempt-calc" className="text-3xl underline">
          Attempts Calculation (?)
        </label>
        <input
          id="attempt-calc"
          type="checkbox"
          checked={shouldCalculateAttempts}
          onChange={setAttemptCalculation}
        />
      </div>
      <div
        className="flex items-center justify-between gap-x-5 h-fit"
        title="sound effect reactions at the end of the game"
      >
        <label htmlFor="sounds" className="text-3xl underline">
          Enabled Sounds (?)
        </label>
        <input
          id="sounds"
          type="checkbox"
          checked={sounds}
          onChange={setSounds}
        />
      </div>
    </div>
  )
}
