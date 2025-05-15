import { configureStore } from "@reduxjs/toolkit"
import viewReducer from "@/redux/slices/viewSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      viewReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
