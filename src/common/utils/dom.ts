export const getWindowDimensions = (window: Window) => {
  const { innerWidth, innerHeight } = window
  return { width: innerWidth, height: innerHeight }
}