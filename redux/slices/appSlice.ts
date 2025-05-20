import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface App {
  view: "main" | "session"
  recordsDisplay: boolean
  settingsDisplay: boolean
  sessionResultDisplay: boolean
  isTimerPaused: boolean
}

const initialState: App = {
  view: "main",
  recordsDisplay: false,
  settingsDisplay: false,
  sessionResultDisplay: false,
  isTimerPaused: false,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<App["view"]>) => {
      state.view = action.payload
    },

    setRecordsDisplay: (
      state,
      action: PayloadAction<App["recordsDisplay"]>
    ) => {
      state.recordsDisplay = action.payload
    },

    setSettingsDisplay: (
      state,
      action: PayloadAction<App["settingsDisplay"]>
    ) => {
      state.settingsDisplay = action.payload
    },

    setSessionResultDisplay: (
      state,
      action: PayloadAction<App["sessionResultDisplay"]>
    ) => {
      state.sessionResultDisplay = action.payload
    },

    setIsTimerPaused: (state, action: PayloadAction<App["isTimerPaused"]>) => {
      state.isTimerPaused = action.payload
    },
  },
})

export default appSlice.reducer
export const appActions = appSlice.actions
export const selectApp = (state: RootState) => state.app
