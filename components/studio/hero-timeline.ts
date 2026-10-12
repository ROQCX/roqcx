// Shared by the hero copy and the lazily loaded 3D scene, so both switch
// sides at the same scroll positions without importing three.js here.

export const STAGE_COUNT = 4

/** Which side the scene sits on per stage: 0 right, 1 left. Copy takes the other. */
const SIDES = [0, 1, 0, 1]

/** Half-width of the scroll window, around each stage boundary, for crossing over. */
const CROSS = 0.07

/** 0 when the scene is on the right, 1 on the left, eased in between. */
export function sideAt(progress: number) {
  for (let stage = 1; stage < STAGE_COUNT; stage++) {
    const boundary = stage / STAGE_COUNT
    if (progress < boundary + CROSS) {
      const from = SIDES[stage - 1]
      const to = SIDES[stage]
      const t = Math.min(1, Math.max(0, (progress - (boundary - CROSS)) / (CROSS * 2)))
      const eased = t * t * (3 - 2 * t)
      return from + (to - from) * eased
    }
  }
  return SIDES[STAGE_COUNT - 1]
}

/** True when the copy for `stage` sits on the right. */
export function copyOnRight(stage: number) {
  return SIDES[stage] === 1
}
