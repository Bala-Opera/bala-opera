export type Position = {
  x: number,
  y: number,
}

export type Dimension = {
  width: number,
  height: number,
}

export type Snapshot = {
  left: number,
  top: number,
  width: number,
  height: number,
}

export type AnimationConfig = {
  from: Snapshot,
  to: Snapshot,
  config: {
    duration: number,
    reset?: boolean,
  }
}

export type Mechanics = {
  duration: number,
  interval: number,
}
