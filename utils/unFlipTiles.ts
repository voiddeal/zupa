interface UnFlipProps {
  board: React.RefObject<HTMLDivElement | null>
  shouldWait?: boolean
  all?: boolean
  delay?: number
}

export default function unFlipTiles({
  board,
  shouldWait = true,
  all = false,
  delay = 1000,
}: UnFlipProps) {
  console.log(delay)

  const unFlip = () => {
    board?.current
      ?.querySelectorAll(`.face${all ? "" : ":not(.score)"}`)
      .forEach((tile) => {
        tile.classList.remove("is-flipped")
        if (all) {
          console.log(all)

          tile.classList.remove("score")
        }
      })
  }

  shouldWait
    ? setTimeout(() => {
        unFlip()
      }, delay)
    : unFlip()
}
