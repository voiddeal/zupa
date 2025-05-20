import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { PayloadAction } from "@reduxjs/toolkit"

interface Records {
  score: number
  date: string
}

const records =
  typeof window !== "undefined" ? localStorage.getItem("records") : null
const initialState: Records[] = records ? JSON.parse(records) : []

const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<Records>) => {
      const isSameScoreExist = state.some(
        (record) => record.score === action.payload.score
      )
      if (isSameScoreExist) return
      state.push(action.payload)
      state.sort((a, b) => b.score - a.score)
      state.splice(8)
      localStorage.setItem("records", JSON.stringify(state))
      // state.length = Math.min(state.length, 10);
    },

    clean: () => {
      localStorage.removeItem("records")
      return []
    },
  },
})

export default recordsSlice.reducer
export const recordsActions = recordsSlice.actions
export const selectRecord = (state: RootState) => state.records
