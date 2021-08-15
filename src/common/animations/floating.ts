import {
  Position,
  Dimension,
  Snapshot,
  AnimationConfig,
  Mechanics,
} from "../types/animation"
import { getRandomInt } from "../utils/random"

export const generateAnimationConfig = (
  mechanics: Mechanics,
  object: Dimension,
  window: Dimension,
  previousConfig?: AnimationConfig,
) => {
  if (!object) return null

  const lowerBound = _calculateLowerBound(object)
  const upperBound = _calculateUpperBound(object, window)

  const { start, end } = (previousConfig) 
    ? _randomizePath(lowerBound, upperBound, previousConfig.to)
    : _randomizePath(lowerBound, upperBound)
  const animationConfig = _applyAnimation(start, end, object)
  return { ...animationConfig, config: { duration: mechanics.duration } }
}

const _calculateLowerBound = (object: Dimension) => {
  return { x: 0 - object.width, y: 0 - object.height }
}

const _calculateUpperBound = (object: Dimension, window: Dimension) => {
  return { x: window.width + object.width, y: window.height + object.height }
}

const _randomizePath = (lowerBound: Position, upperBound: Position, leftOff?: Snapshot) => {
  let start = { x: 0, y: 0 }
  let end = { x: 0, y: 0 }
  let startingEdge = ''
  const edges = Object.keys(EDGES)

  if (leftOff) {
    start = { x: leftOff.left, y: leftOff.top }
    startingEdge = findEdge(start, lowerBound, upperBound)
  } else {
    startingEdge = edges[getRandomInt(0, edges.length)]
    const { randomize } = EDGES[startingEdge]
    start = randomize(lowerBound, upperBound)
  }

  const indexToRemove = edges.indexOf(startingEdge)
  edges.splice(indexToRemove, 1)
  const { updateRemainingEdges } = EDGES[startingEdge]
  updateRemainingEdges(edges, start, lowerBound, upperBound)
  const endingEdge = edges[getRandomInt(0, edges.length)]
  const { randomize } = EDGES[endingEdge]
  end = randomize(lowerBound, upperBound, 2/3)

  return { start, end }
}

const _applyAnimation = (
  start: Position, end: Position, dimension: Dimension) => {
  return {
    from: {
      left: start.x,
      top: start.y,
      width: dimension.width,
      height: dimension.height,
    },
    to: {
      left: end.x,
      top: end.y,
      width: dimension.width,
      height: dimension.height,
    },
  }
}

const EDGES = {
  TOP: {
    randomize: (lowerBound: Position, upperBound: Position, factor: number = 1) => {
      const { y } = lowerBound
      const x = getRandomInt(lowerBound.x * factor, upperBound.x * factor)
      return { x, y }
    },
    isEdge: (position: Position, lowerBound: Position, upperBound: Position) => (position.y === lowerBound.y),
    updateRemainingEdges: (edges: Array<string>, position: Position, lowerBound: Position, upperBound: Position) => {
      const midpoint = (upperBound.x - lowerBound.x) / 2
      const indexToRemove = (position.x < midpoint) ? edges.indexOf('LEFT') : edges.indexOf('RIGHT')
      edges.splice(indexToRemove, 1)
    },
  },
  RIGHT: {
    randomize: (lowerBound: Position, upperBound: Position, factor: number = 1) => {
      const { x } = upperBound
      const y = getRandomInt(lowerBound.y * factor, upperBound.y * factor)
      return { x, y }
    },
    isEdge: (position: Position, lowerBound: Position, upperBound: Position) => (position.x === upperBound.x),
    updateRemainingEdges: (edges: Array<string>, position: Position, lowerBound: Position, upperBound: Position) => {
      const midpoint = (upperBound.y - lowerBound.y) / 2
      const indexToRemove = (position.y < midpoint) ? edges.indexOf('TOP') : edges.indexOf('BOTTOM')
      edges.splice(indexToRemove, 1)
    },
  },
  BOTTOM: {
    randomize: (lowerBound: Position, upperBound: Position, factor: number = 1) => {
      const { y } = upperBound
      const x = getRandomInt(lowerBound.x * factor, upperBound.x * factor)
      return { x, y }
    },
    isEdge: (position: Position, lowerBound: Position, upperBound: Position) => (position.y === upperBound.y),
    updateRemainingEdges: (edges: Array<string>, position: Position, lowerBound: Position, upperBound: Position) => {
      const midpoint = (upperBound.x - lowerBound.x) / 2
      const indexToRemove = (position.x < midpoint) ? edges.indexOf('LEFT') : edges.indexOf('RIGHT')
      edges.splice(indexToRemove, 1)
    },
  },
  LEFT: {
    randomize: (lowerBound: Position, upperBound: Position, factor: number = 1) => {
      const { x } = lowerBound
      const y = getRandomInt(lowerBound.y * factor, upperBound.y * factor)
      return { x, y }
    },
    isEdge: (position: Position, lowerBound: Position, upperBound: Position) => (position.x === lowerBound.x),
    updateRemainingEdges: (edges: Array<string>, position: Position, lowerBound: Position, upperBound: Position) => {
      const midpoint = (upperBound.y - lowerBound.y) / 2
      const indexToRemove = (position.y < midpoint) ? edges.indexOf('TOP') : edges.indexOf('BOTTOM')
      edges.splice(indexToRemove, 1)
    },
  }
}

const findEdge = (position: Position, lowerBound: Position, upperBound: Position) => (
  Object.keys(EDGES).find((key) => EDGES[key].isEdge(position, lowerBound, upperBound))
)