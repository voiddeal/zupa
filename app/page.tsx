"use client"

import { useAppSelector } from "@/redux/hooks"
import Main from "@/components/main/Main"
import Session from "@/components/session/Session"

export default function Home() {
  const { view } = useAppSelector((state) => state.app)

  switch (view) {
    case "main":
      return <Main />
    case "session":
      return <Session />
  }
}
