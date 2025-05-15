import Eye from "./Eye"

export default function SessionStats() {
  return (
    <div className="h-full self-start flex flex-col items-center justify-between">
      <Eye />
      <div>
        <div>Score: {}</div>
        <div>Attempts: {}</div>
        <div>Correct: {}</div>
        <div>Mistake: {}</div>
      </div>
    </div>
  )
}
