import React, { useState } from "react"

export default function DragMove(props) {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onDragMove,
    children,
    style,
    className,
  } = props

  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (e) => {
    setIsDragging(true)
    onPointerDown(e)
  };

  const handlePointerUp = (e) => {
    setIsDragging(false)
    onPointerUp(e)
  };

  const handlePointerMove = (e) => {
    if (isDragging) onDragMove(e)
    onPointerMove(e)
  };

  const handleMouseLeave = (e) => {
    setIsDragging(false)
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
    >
      {children}
    </div>
  )
}

DragMove.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};