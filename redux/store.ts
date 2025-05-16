import { configureStore } from "@reduxjs/toolkit"
import view from "@/redux/slices/viewSlice"
import sessionStats from "@/redux/slices/sessionStatsSlice"
import app from "@/redux/slices/appSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      view,
      sessionStats,
      app,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
