import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface App {
  recordsDisplay: boolean
  settingsDisplay: boolean
}

const initialState: App = {
  recordsDisplay: false,
  settingsDisplay: false,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
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
      state.recordsDisplay = action.payload
    },
  },
})

export default appSlice.reducer
export const appActions = appSlice.actions
export const selectApp = (state: RootState) => state.app
