import { configureStore } from "@reduxjs/toolkit"
import sessionStats from "@/redux/slices/sessionStatsSlice"
import app from "@/redux/slices/appSlice"
import records from "@/redux/slices/recordsSlice"
import settings from "@/redux/slices/settingsSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      sessionStats,
      app,
      records,
      settings,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
