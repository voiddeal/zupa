import { RefObject } from "react"

interface UnFlipProps {
  wait?: boolean
  all?: boolean
  board: RefObject<HTMLDivElement | null>
}

export default function unFlipTiles({
  board,
  wait = true,
  all = false,
}: UnFlipProps) {
  const removeScores = () => {
    board.current?.querySelectorAll(".face").forEach((tile) => {
      tile.classList.remove("score")
    })
  }

  const unFlip = () => {
    board.current
      ?.querySelectorAll(`.face${all ? "" : ":not(.score)"}`)
      .forEach((tile) => {
        tile.classList.remove("is-flipped")
        if (all) {
          console.log(all)

          tile.classList.remove("score")
        }
      })
  }

  wait
    ? setTimeout(() => {
        unFlip()
      }, 1000)
    : unFlip()
}
