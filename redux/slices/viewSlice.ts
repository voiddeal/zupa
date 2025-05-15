import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

type View = "main" | "session"

const initialState: View = "main" as View

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (_state, action: PayloadAction<View>) => {
      return action.payload
    },
  },
})

export default viewSlice.reducer
export const viewActions = viewSlice.actions
export const selectView = (state: RootState) => state.viewReducer
