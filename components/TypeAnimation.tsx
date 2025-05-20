import { TypeAnimation as Type } from "react-type-animation"

interface TypeAnimationProps {
  wait: number
  value: string
}

export default function TypeAnimation({ wait, value }: TypeAnimationProps) {
  return (
    <Type
      sequence={[wait, value]}
      wrapper="span"
      cursor={false}
      repeat={0}
      style={{ display: "inline-block" }}
    />
  )
}
