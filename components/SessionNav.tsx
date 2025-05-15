export default function SessionNav() {
  const NAV_BUTTON_CLASSNAMES =
    "size-10 rounded-full bg-yellow-200 overflow-hidden cursor-pointer hover:scale-110 active:scale-100 transition-transform"
  return (
    <nav className="absolute bottom-10">
      <ul className="flex gap-x-5 bg-orange-200 rounded-xl px-4 py-2">
        <li className={NAV_BUTTON_CLASSNAMES}></li>
        <li className={NAV_BUTTON_CLASSNAMES}></li>
        <li className={NAV_BUTTON_CLASSNAMES}></li>
      </ul>
    </nav>
  )
}
