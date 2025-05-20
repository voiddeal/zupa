"use client"

import ReactDOM from "react-dom"

interface PortalProps {
  children: React.ReactNode
  containerId?: string // optional ID for the container element
}

const Portal: React.FC<PortalProps> = ({ children, containerId }) => {
  const containerElement = containerId
    ? document.getElementById(containerId)
    : document.body

  return containerElement && ReactDOM.createPortal(children, containerElement)
}

export default Portal
