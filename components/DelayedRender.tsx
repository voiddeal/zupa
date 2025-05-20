import { useState, useEffect } from "react"

interface DelayedRenderProps {
  delay: number
  children: React.ReactNode
}

export default function DelayedRender({ delay, children }: DelayedRenderProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = new Promise((resolve) =>
      setTimeout(() => resolve(setIsVisible(true)), delay)
    )

    return () => clearTimeout(timeout as unknown as number)
  }, [delay])

  return isVisible ? <>{children}</> : null
}
