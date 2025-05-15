"use client"

import { useAppSelector } from "@/redux/hooks"
import Main from "@/components/Main"
import Session from "@/components/session/Session"

export default function Home() {
  const view = useAppSelector((state) => state.viewReducer)

  switch (view) {
    case "main":
      return <Main />
    case "session":
      return <Session />
  }
}
