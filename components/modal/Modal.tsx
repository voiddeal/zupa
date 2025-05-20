import "./modal.css"

interface ModalProps {
  children: React.ReactNode
  backdropClickHandler?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
}

export default function Modal({ children, backdropClickHandler }: ModalProps) {
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (typeof backdropClickHandler !== "undefined") backdropClickHandler(e)
  }

  return (
    <div role="dialog" onClick={handleBackdropClick} id="modal-backdrop">
      {children}
    </div>
  )
}
