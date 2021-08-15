import { Position } from "../types/animation"

export const findDistanceBetween = (a: Position, b: Position) => (
  Math.sqrt( (b.x - a.x)**2 + (b.y - b.x)**2)
)
