import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import type { Settings } from "@/types/models"

const settings =
  typeof window !== "undefined" ? localStorage.getItem("settings") : null

const initialState: Settings = settings
  ? JSON.parse(settings)
  : {
      boardTileCount: 16,
      sessionTime: 90,
      tileUnFlipDelay: 1500,
      tileMode: "animals",
      shouldCalculateMistakes: false,
      shouldCalculateAttempts: true,
      sounds: true,
    }

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTileFlipDelay: (
      state,
      actions: PayloadAction<Settings["tileUnFlipDelay"]>
    ) => {
      state.tileUnFlipDelay = actions.payload
    },

    setSessionTime: (
      state,
      actions: PayloadAction<Settings["sessionTime"]>
    ) => {
      state.sessionTime = actions.payload
    },

    setBoardTileCount: (
      state,
      actions: PayloadAction<Settings["boardTileCount"]>
    ) => {
      state.boardTileCount = actions.payload
    },

    setTileMode: (state, actions: PayloadAction<Settings["tileMode"]>) => {
      state.tileMode = actions.payload
    },

    setShouldCalculateMistakes: (
      state,
      action: PayloadAction<Settings["shouldCalculateMistakes"]>
    ) => {
      state.shouldCalculateMistakes = action.payload
    },

    setShouldCalculateAttempts: (
      state,
      action: PayloadAction<Settings["shouldCalculateAttempts"]>
    ) => {
      state.shouldCalculateAttempts = action.payload
    },

    setSounds: (state, action: PayloadAction<Settings["sounds"]>) => {
      state.sounds = action.payload
    },
  },
})

export default settingsSlice.reducer
export const settingsActions = settingsSlice.actions
export const selectRecord = (state: RootState) => state.settings
