import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface SessionStats {
  activeTileID: string | null
  score: number
  attempts: number
  correct: number
  strike: number
  strikeWatcher: 0 | 1 | 2
  mistake: number
  spentTime: number
  resetCount: number
}

const initialState: SessionStats = {
  activeTileID: null,
  score: 0,
  attempts: 0,
  correct: 0,
  strikeWatcher: 0,
  strike: 0,
  mistake: 0,
  spentTime: 0,
  resetCount: 0,
}

const sessionStatsSlice = createSlice({
  name: "sessionStats",
  initialState,
  reducers: {
    setActiveTileID: (
      state,
      action: PayloadAction<SessionStats["activeTileID"]>
    ) => {
      state.activeTileID = action.payload
    },

    clearActiveTileID: (state) => {
      state.activeTileID = null
    },

    setScore: (state, action: PayloadAction<SessionStats["score"]>) => {
      state.score = action.payload
    },

    addAttempt: (state) => {
      state.attempts += 1
    },

    setLastAttempt: (state, action: PayloadAction<boolean>) => {
      action.payload ? (state.strikeWatcher += 1) : (state.strikeWatcher = 0)
    },

    addCorrect: (state) => {
      state.correct += 1
    },

    updateStrike: (state) => {
      if (state.strikeWatcher === 2) {
        state.strike += 1
        state.strikeWatcher = 1
      }
    },

    addMistake: (state) => {
      state.mistake += 1
    },

    addSpentTime: (state) => {
      state.spentTime += 1
    },

    reset: (state) => ({
      ...initialState,
      resetCount: state.resetCount + 1,
    }),
  },
})

export default sessionStatsSlice.reducer
export const sessionStatsActions = sessionStatsSlice.actions
export const selectSessionStats = (state: RootState) => state.sessionStats
