"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef, type MutableRefObject } from "react"
import * as THREE from "three"
import { sideAt } from "./hero-timeline"

/** Values written by the hero from native scroll and pointer events. */
export interface SceneState {
  /** Story progress, 0 (scattered) to 1 (settled). */
  progress: number
  /** False while the hero is offscreen; idle motion stops. */
  visible: boolean
  pointer: { x: number; y: number }
  /** The right-hand hero column, in canvas pixels. */
  anchor: { x: number; y: number; width: number; height: number }
  font: string
  wake: () => void
}

export interface WorkflowSceneProps {
  state: MutableRefObject<SceneState>
  onReady: () => void
  onLost: () => void
}

const C = {
  void: "#0c0f0d",
  chalk: "#fffdf8",
  ink: "#121513",
  soft: "#3e4741",
  forest: "#17362c",
  signal: "#d6ff4a",
}

const CAMERA_Z = 9
const BG_Z = -3
const LAYOUT_W = 5.7
const LAYOUT_H = 2.4
const PX = 360 // texture pixels per world unit
const FOV = 26
// Visible height at z = 0 from the settled camera.
const VIEW_H = 2 * CAMERA_Z * Math.tan(((FOV / 2) * Math.PI) / 180)

const icons = {
  mail: "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M2 7l10 7 10-7",
  browser: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M2 9h20 M5.5 6.5h.01 M8.5 6.5h.01",
  doc: "M5 2h10l5 5v15H5z M15 2v5h5 M8 12h8 M8 16h8",
  grid: "M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M2 9h20 M2 15h20 M9 3v18 M16 3v18",
  person: "M16 8a4 4 0 1 1-8 0a4 4 0 1 1 8 0z M4 22c0-4.5 3.6-8 8-8s8 3.5 8 8",
  chat: "M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  check: "M4 12.5l5 5L20 6.5",
}

type Vec3 = [number, number, number]

type TilePose = {
  position: Vec3
  rotation: Vec3
}

type TileId = "website" | "enquiry" | "records" | "info" | "response" | "approval"

type WorkflowTile = {
  id: TileId
  title: string
  /** Title printed on the back, shown once the tile flips. */
  done?: string
  icon: keyof typeof icons
  surface: "graphite" | "chalk"
  foreground?: boolean
  scattered: TilePose
  connected: TilePose
}

// Three columns: context on top, the customer-response route along the
// bottom, ending with the reply. Foreground tiles sit nearer the camera.
const tiles: WorkflowTile[] = [
  {
    id: "website",
    title: "Website",
    icon: "browser",
    surface: "graphite",
    scattered: { position: [-8.2, 2.3, -3.5], rotation: [0.55, -0.95, 0.3] },
    connected: { position: [-2, 0.68, 0], rotation: [0, 0, 0] },
  },
  {
    id: "enquiry",
    title: "Customer enquiry",
    icon: "mail",
    surface: "graphite",
    foreground: true,
    scattered: { position: [-4.6, -2.5, 1.6], rotation: [-0.45, 0.85, -0.22] },
    connected: { position: [-2, -0.68, 0.22], rotation: [0, 0, 0] },
  },
  {
    id: "records",
    title: "Customer records",
    icon: "grid",
    surface: "graphite",
    scattered: { position: [0.9, 3.1, -4.8], rotation: [0.75, 0.5, -0.4] },
    connected: { position: [0, 0.68, 0], rotation: [0, 0, 0] },
  },
  {
    id: "info",
    title: "Business information",
    icon: "doc",
    surface: "graphite",
    scattered: { position: [-2.1, 0.5, -2.2], rotation: [-0.3, -1.1, 0.5] },
    connected: { position: [0, -0.68, 0], rotation: [0, 0, 0] },
  },
  {
    id: "response",
    title: "Response",
    done: "Sent",
    icon: "chat",
    surface: "graphite",
    scattered: { position: [4.4, 2.1, -1.6], rotation: [-0.6, 1.0, 0.35] },
    connected: { position: [2, 0.68, 0], rotation: [0, 0, 0] },
  },
  {
    id: "approval",
    title: "Team approval",
    done: "Approved",
    icon: "person",
    surface: "chalk",
    foreground: true,
    scattered: { position: [2.4, -1.6, 1.8], rotation: [0.4, -0.9, -0.3] },
    connected: { position: [2, -0.68, 0.22], rotation: [0, 0, 0] },
  },
]

const tileIndex = Object.fromEntries(tiles.map((tile, index) => [tile.id, index])) as Record<TileId, number>

type Link = {
  from: TileId
  to: TileId
  /** How much of the link is drawn before scrolling starts. */
  stub: number
  start: number
  end: number
}

// Two small clusters are already connected; the route links grow in.
const links: Link[] = [
  { from: "website", to: "enquiry", stub: 1, start: 0, end: 0 },
  { from: "records", to: "info", stub: 1, start: 0, end: 0 },
  { from: "enquiry", to: "info", stub: 0.22, start: 0.38, end: 0.46 },
  { from: "info", to: "approval", stub: 0.12, start: 0.42, end: 0.5 },
  { from: "approval", to: "response", stub: 0, start: 0.46, end: 0.52 },
]

const route: Array<[TileId, TileId]> = [
  ["enquiry", "info"],
  ["info", "approval"],
  ["approval", "response"],
]

// Signal timeline within its scroll band: line, inside a tile, line, the
// pause at team approval, then on to the response.
const legs: Array<[number, number]> = [
  [0, 0.26],
  [0.34, 0.56],
  [0.78, 1],
]

const SIZE = { w: 1.5, h: 0.92 }
const FG_SIZE = { w: 1.6, h: 0.98 }
const DEPTH = 0.06
const BEVEL = 0.025
const FACE_Z = DEPTH / 2 + BEVEL + 0.0015

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

function remap(value: number, from: number, to: number) {
  return clamp((value - from) / (to - from))
}

function smooth(value: number) {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function sizeOf(tile: WorkflowTile) {
  return tile.foreground ? FG_SIZE : SIZE
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function slabGeometry(w: number, h: number) {
  const r = 0.09
  const shape = new THREE.Shape()
  shape.moveTo(-w / 2 + r, -h / 2)
  shape.lineTo(w / 2 - r, -h / 2)
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
  shape.lineTo(w / 2, h / 2 - r)
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
  shape.lineTo(-w / 2 + r, h / 2)
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
  shape.lineTo(-w / 2, -h / 2 + r)
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: BEVEL,
    bevelSegments: 4,
    curveSegments: 10,
  })
  geometry.translate(0, 0, -DEPTH / 2)
  return geometry
}

function faceTexture(tile: WorkflowTile, font: string, done: boolean, anisotropy: number) {
  const { w, h } = sizeOf(tile)
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(w * PX)
  canvas.height = Math.round(h * PX)
  const ctx = canvas.getContext("2d")!
  const u = (n: number) => n * PX
  const light = tile.surface === "chalk"

  const fill = ctx.createLinearGradient(0, 0, 0, canvas.height)
  fill.addColorStop(0, light ? "#fffdf8" : "#232925")
  fill.addColorStop(1, light ? "#f0ebe0" : "#181c1a")
  roundedRect(ctx, 0, 0, canvas.width, canvas.height, u(0.09))
  ctx.fillStyle = fill
  ctx.fill()
  roundedRect(ctx, 1.5, 1.5, canvas.width - 3, canvas.height - 3, u(0.085))
  ctx.lineWidth = 3
  ctx.strokeStyle = light ? "rgba(18,21,19,0.12)" : "rgba(255,253,248,0.14)"
  ctx.stroke()

  const pad = u(0.12)
  const iconSize = u(0.17)
  ctx.save()
  ctx.translate(pad, pad)
  ctx.scale(iconSize / 24, iconSize / 24)
  ctx.lineWidth = 1.75
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.strokeStyle = light ? C.forest : "rgba(255,253,248,0.88)"
  ctx.stroke(new Path2D(icons[tile.icon]))
  ctx.restore()

  if (done) {
    const badge = u(0.075)
    const bx = canvas.width - pad - badge
    const by = pad + badge
    ctx.beginPath()
    ctx.arc(bx, by, badge, 0, Math.PI * 2)
    ctx.fillStyle = light ? C.forest : C.signal
    ctx.fill()
    ctx.save()
    ctx.translate(bx - badge * 0.62, by - badge * 0.62)
    ctx.scale((badge * 1.24) / 24, (badge * 1.24) / 24)
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = light ? C.chalk : C.void
    ctx.stroke(new Path2D(icons.check))
    ctx.restore()
  }

  const maxWidth = canvas.width - pad * 2
  const fit = (text: string, weight: number, size: number) => {
    let px = u(size)
    ctx.font = `${weight} ${px}px ${font}`
    while (ctx.measureText(text).width > maxWidth && px > 8) {
      px *= 0.95
      ctx.font = `${weight} ${px}px ${font}`
    }
  }

  ctx.textBaseline = "alphabetic"
  const title = done && tile.done ? tile.done : tile.title
  fit(title, 600, 0.16)
  ctx.fillStyle = done ? (light ? C.forest : C.signal) : light ? C.ink : C.chalk
  ctx.fillText(title, pad, canvas.height - pad)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = anisotropy
  return texture
}

function gridTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext("2d")!
  const step = 48
  ctx.strokeStyle = "rgba(255,253,248,0.075)"
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let x = 0.5; x < canvas.width; x += step) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
  }
  for (let y = 0.5; y < canvas.height; y += step) {
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
  }
  ctx.stroke()

  // Sparse reference marks.
  ctx.strokeStyle = "rgba(255,253,248,0.28)"
  ctx.lineWidth = 1.5
  ctx.beginPath()
  for (let x = step * 2; x < canvas.width; x += step * 5) {
    for (let y = step * 2; y < canvas.height; y += step * 4) {
      ctx.moveTo(x - 5, y)
      ctx.lineTo(x + 5, y)
      ctx.moveTo(x, y - 5)
      ctx.lineTo(x, y + 5)
    }
  }
  ctx.stroke()

  ctx.globalCompositeOperation = "destination-in"
  const fade = ctx.createRadialGradient(1024, 512, 0, 1024, 512, 1000)
  fade.addColorStop(0, "rgba(0,0,0,1)")
  fade.addColorStop(0.55, "rgba(0,0,0,0.5)")
  fade.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = fade
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function haloTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext("2d")!
  const glow = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  glow.addColorStop(0, "rgba(214,255,74,0.7)")
  glow.addColorStop(0.35, "rgba(214,255,74,0.18)")
  glow.addColorStop(1, "rgba(214,255,74,0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, 128, 128)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** Where the line from `from` toward `to` leaves the tile at `from`. */
function edgePoint(out: THREE.Vector3, from: THREE.Vector3, to: THREE.Vector3, hw: number, hh: number) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const t = Math.min(1, (hw * 1.04) / Math.max(Math.abs(dx), 1e-4), (hh * 1.06) / Math.max(Math.abs(dy), 1e-4))
  return out.set(from.x + dx * t, from.y + dy * t, from.z + (to.z - from.z) * t)
}

const UP = new THREE.Vector3(0, 1, 0)
const scratch = {
  a: new THREE.Vector3(),
  b: new THREE.Vector3(),
  c: new THREE.Vector3(),
  d: new THREE.Vector3(),
  dir: new THREE.Vector3(),
}

/** Stretch a unit cylinder from `a` toward `b`, `amount` of the way. */
function span(mesh: THREE.Mesh, a: THREE.Vector3, b: THREE.Vector3, amount: number) {
  scratch.dir.subVectors(b, a)
  const length = scratch.dir.length() * amount
  mesh.visible = length > 0.002
  if (!mesh.visible) return
  scratch.dir.normalize()
  mesh.quaternion.setFromUnitVectors(UP, scratch.dir)
  mesh.position.copy(a).addScaledVector(scratch.dir, length / 2)
  mesh.scale.set(1, length, 1)
}

/* ───────────── Scattered experiments ───────────── */

// Small slabs standing in for the tools and trials a team already has.
// They drift through the hero, then are drawn into the six tiles.
const FRAGMENTS = 56

function random(seed: number) {
  let t = seed + 0x6d2b79f5
  return () => {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const fragments = (() => {
  const rand = random(7)
  const palette = ["#1c221f", "#1c221f", "#262d29", "#262d29", "#2f3732", C.signal, "#c4512f", "#e9e4d8"]
  return Array.from({ length: FRAGMENTS }, (_, index) => {
    const home = tiles[index % tiles.length].connected.position
    return {
      scattered: new THREE.Vector3(-11 + rand() * 17, -3.6 + rand() * 7.2, -7 + rand() * 9.5),
      target: new THREE.Vector3(home[0] + (rand() - 0.5) * 0.6, home[1] + (rand() - 0.5) * 0.4, home[2] - 0.05),
      axis: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(),
      angle: rand() * Math.PI * 2,
      spin: 0.3 + rand() * 0.8,
      scale: 0.2 + rand() * 0.28,
      bob: rand() * Math.PI * 2,
      delay: rand() * 0.06,
      color: new THREE.Color(palette[Math.floor(rand() * palette.length)]),
    }
  })
})()

/* ───────────── Timeline ───────────── */

// Scroll progress is split into four stages of 0.25: experimenting,
// finding the fit, putting it to work, a practical place to start.
const T = {
  converge: [0.22, 0.4],
  align: [0.25, 0.47],
  signal: [0.52, 0.74],
  sent: [0.74, 0.8],
  wall: [0.74, 0.95],
} as const

type CameraKey = { at: number; pos: Vec3; look: Vec3 }

/**
 * Camera stops, relative to the workflow's centre `p` in world space. `dir`
 * is 1 with the workflow on the right and -1 on the left, so framing offsets
 * keep it clear of the copy on the other side.
 */
function cameraKeys(p: THREE.Vector3, dir: number, follow: number): CameraKey[] {
  return [
    { at: 0, pos: [p.x * 0.2, 0.9, 13.5], look: [p.x * 0.2, -0.1, 0] },
    { at: 0.2, pos: [p.x * 0.3 - 0.6, 0.5, 11.5], look: [p.x * 0.3, -0.1, 0] },
    { at: 0.48, pos: [p.x + lerp(3.4, 2.6, (1 - dir) / 2), p.y + 2.3, lerp(7.4, 9.4, (1 - dir) / 2)], look: [p.x - lerp(1.5, 2.7, (1 - dir) / 2) * dir, p.y - 0.15, 0] },
    { at: 0.72, pos: [p.x - 1.4 * dir + follow * 1.2, p.y - 1.8, 7.9], look: [p.x - 1.75 * dir + follow * 0.4, p.y - 0.25, 0] },
    { at: 0.88, pos: [0, 0, CAMERA_Z], look: [0, 0, 0] },
    { at: 1, pos: [0, 0, CAMERA_Z], look: [0, 0, 0] },
  ]
}

function sampleCamera(keys: CameraKey[], t: number, pos: THREE.Vector3, look: THREE.Vector3) {
  let i = 0
  while (i < keys.length - 2 && t > keys[i + 1].at) i++
  const a = keys[i]
  const b = keys[i + 1]
  const f = smooth(remap(t, a.at, b.at))
  pos.set(lerp(a.pos[0], b.pos[0], f), lerp(a.pos[1], b.pos[1], f), lerp(a.pos[2], b.pos[2], f))
  look.set(lerp(a.look[0], b.look[0], f), lerp(a.look[1], b.look[1], f), lerp(a.look[2], b.look[2], f))
}

const frame = {
  pivot: new THREE.Vector3(),
  camPos: new THREE.Vector3(),
  look: new THREE.Vector3(),
  dummy: new THREE.Object3D(),
  swirl: new THREE.Vector3(),
}

function Workflow({ state }: { state: MutableRefObject<SceneState> }) {
  const { invalidate, size, camera, gl } = useThree()
  const font = state.current.font

  const assets = useMemo(() => {
    const anisotropy = gl.capabilities.getMaxAnisotropy()
    return {
      faces: tiles.map((tile) => faceTexture(tile, font, false, anisotropy)),
      doneFaces: tiles.map((tile) => (tile.done ? faceTexture(tile, font, true, anisotropy) : null)),
      slab: slabGeometry(SIZE.w, SIZE.h),
      fgSlab: slabGeometry(FG_SIZE.w, FG_SIZE.h),
      fragment: slabGeometry(1, 0.62),
      grid: gridTexture(),
      halo: haloTexture(),
    }
  }, [font, gl])

  useEffect(
    () => () => {
      assets.faces.forEach((texture) => texture.dispose())
      assets.doneFaces.forEach((texture) => texture?.dispose())
      assets.slab.dispose()
      assets.fgSlab.dispose()
      assets.fragment.dispose()
      assets.grid.dispose()
      assets.halo.dispose()
    },
    [assets],
  )

  useEffect(() => {
    const shared = state.current
    shared.wake = () => invalidate()
    invalidate()
    return () => {
      shared.wake = () => {}
    }
  }, [invalidate, state])

  const grid = useRef<THREE.Mesh>(null)
  const rig = useRef<THREE.Group>(null)
  const main = useRef<THREE.Group>(null)
  const swarm = useRef<THREE.InstancedMesh>(null)
  const tileRefs = useRef<Array<THREE.Group | null>>([])
  const dotRefs = useRef<Array<THREE.Mesh | null>>([])
  const linkRefs = useRef<Array<THREE.Mesh | null>>([])
  const litRefs = useRef<Array<THREE.Mesh | null>>([])
  const signal = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Sprite>(null)
  const damped = useRef({ progress: state.current.progress, px: 0, py: 0, intro: 0 })

  useEffect(() => {
    const mesh = swarm.current
    if (!mesh) return
    fragments.forEach((fragment, index) => mesh.setColorAt(index, fragment.color))
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [])

  useFrame(({ clock }, delta) => {
    const s = state.current
    const d = damped.current
    if (!grid.current || !rig.current || !main.current || !swarm.current || !signal.current || !halo.current) return
    if (s.anchor.width === 0 || size.height === 0) return

    const dt = Math.min(delta, 0.05)
    const ease = 1 - Math.exp(-dt * 4)
    d.progress += (s.progress - d.progress) * ease
    d.px += (s.pointer.x - d.px) * (1 - Math.exp(-dt * 3))
    d.py += (s.pointer.y - d.py) * (1 - Math.exp(-dt * 3))
    d.intro += (1 - d.intro) * (1 - Math.exp(-dt * 1.6))

    const t = d.progress
    const time = clock.elapsedTime
    const align = smooth(remap(t, T.align[0], T.align[1]))
    const sigT = remap(t, T.signal[0], T.signal[1])
    const idle = 1 - align

    // Anchor the settled workflow to the right-hand hero column.
    const wpp = VIEW_H / size.height
    const a = s.anchor
    const cx = (a.x + a.width / 2 - size.width / 2) * wpp
    const cy = -(a.y + a.height / 2 - size.height / 2) * wpp

    // The workflow crosses the hero at each stage, mirroring its column.
    const side = sideAt(t)
    const dir = 1 - side * 2
    const swoop = Math.sin(Math.PI * side)
    // On the left the copy sits right beside the column, so the workflow
    // gets a little smaller and moves out to leave a clear gutter.
    const scale = Math.min((a.width * lerp(1.06, 0.86, side) * wpp) / LAYOUT_W, (a.height * 0.95 * wpp) / LAYOUT_H)
    const local = wpp / scale
    const gutter = side * 20 * wpp
    rig.current.position.set(cx * dir - gutter, cy + t * 20 * wpp - swoop * 0.25, swoop * -1.2)
    rig.current.scale.setScalar(scale)
    main.current.rotation.set(-d.py * 0.04 + swoop * 0.12, d.px * 0.06 + swoop * 0.55, swoop * -0.06)
    frame.pivot.copy(rig.current.position)

    // Camera: wide and drifting, a sweep round to three-quarters, low and
    // close on the signal, then straight on for the settled system.
    sampleCamera(cameraKeys(frame.pivot, dir, sigT), t, frame.camPos, frame.look)
    camera.position.set(frame.camPos.x + d.px * 0.35, frame.camPos.y + d.py * 0.22, frame.camPos.z)
    camera.lookAt(frame.look)

    // Grid: a floor under the scattered pieces that swings up into a wall.
    const wall = smooth(remap(t, T.wall[0], T.wall[1]))
    grid.current.rotation.x = lerp(-1.22, 0, wall)
    grid.current.position.set(lerp(cx * 0.4, frame.pivot.x * 1.2 - 0.6 * dir, wall), lerp(-2.6, cy * 1.2 - t * 12 * wpp, wall), lerp(-2, BG_Z, wall))

    const rush = (1 - d.intro) * 9
    tiles.forEach((tile, index) => {
      const group = tileRefs.current[index]
      if (!group) return
      const from = tile.scattered
      const to = tile.connected
      const bob = Math.sin(time * 0.6 + index * 1.7) * 0.18 * idle
      const lift = tile.foreground ? Math.sin(Math.PI * align) * 50 * local : 0
      group.position.set(
        lerp(from.position[0], to.position[0], align),
        lerp(from.position[1], to.position[1], align) + bob + lift,
        lerp(from.position[2], to.position[2], align) - rush * (1 + index * 0.15),
      )
      const flip =
        tile.id === "approval"
          ? smooth(remap(sigT, 0.58, 0.76))
          : tile.id === "response"
            ? smooth(remap(t, T.sent[0], T.sent[1]))
            : 0
      group.rotation.set(
        lerp(from.rotation[0], to.rotation[0], align) + Math.sin(time * 0.4 + index) * 0.08 * idle,
        lerp(from.rotation[1], to.rotation[1], align) + Math.PI * flip,
        lerp(from.rotation[2], to.rotation[2], align),
      )
    })

    // Fragments swirl round the workflow, then fall into their tiles.
    const swirlAngle = t * 1.8 + time * 0.035
    let swarmVisible = false
    fragments.forEach((fragment, index) => {
      const pull = smooth(remap(t, T.converge[0] + fragment.delay, T.converge[1] + fragment.delay))
      const angle = swirlAngle * (0.6 + fragment.spin * 0.5)
      const sx = fragment.scattered.x
      const sz = fragment.scattered.z + 2
      frame.swirl.set(
        sx * Math.cos(angle * 0.25) - sz * Math.sin(angle * 0.25),
        fragment.scattered.y + Math.sin(time * 0.5 + fragment.bob) * 0.25,
        sx * Math.sin(angle * 0.25) + sz * Math.cos(angle * 0.25) - 2 - rush * 1.4,
      )
      frame.dummy.position.lerpVectors(frame.swirl, fragment.target, pull)
      frame.dummy.quaternion.setFromAxisAngle(fragment.axis, fragment.angle + fragment.spin * (time * 0.3 + t * 9) * (1 - pull))
      const scaleNow = fragment.scale * (1 - pull)
      frame.dummy.scale.setScalar(Math.max(scaleNow, 0.0001))
      frame.dummy.updateMatrix()
      swarm.current!.setMatrixAt(index, frame.dummy.matrix)
      if (scaleNow > 0.001) swarmVisible = true
    })
    swarm.current.instanceMatrix.needsUpdate = true
    swarm.current.visible = swarmVisible

    const at = (id: TileId) => tileRefs.current[tileIndex[id]]!.position
    const half = (id: TileId) => {
      const { w, h } = sizeOf(tiles[tileIndex[id]])
      return [w / 2, h / 2] as const
    }
    const exit = (out: THREE.Vector3, from: TileId, to: TileId) => edgePoint(out, at(from), at(to), ...half(from))

    links.forEach((link, index) => {
      const mesh = linkRefs.current[index]
      if (!mesh) return
      const draw = link.stub >= 1 ? 1 : link.stub + (1 - link.stub) * smooth(remap(t, link.start, link.end))
      exit(scratch.a, link.from, link.to)
      exit(scratch.b, link.to, link.from)
      span(mesh, scratch.a, scratch.b, draw)
    })

    // The signal: along a route line, then hidden inside the next tile
    // while it is handled, pausing longest at team approval.
    route.forEach(([from, to], index) => {
      const mesh = litRefs.current[index]
      if (!mesh) return
      exit(scratch.a, from, to)
      exit(scratch.b, to, from)
      span(mesh, scratch.a, scratch.b, remap(sigT, legs[index][0], legs[index][1]))
    })

    let leg = 0
    while (leg < legs.length - 1 && sigT >= legs[leg][1]) leg++
    if (sigT < legs[leg][0]) {
      const [prevFrom, through] = route[leg - 1]
      const [, next] = route[leg]
      exit(scratch.c, through, prevFrom)
      exit(scratch.d, through, next)
      signal.current.position.lerpVectors(scratch.c, scratch.d, remap(sigT, legs[leg - 1][1], legs[leg][0]))
    } else {
      const [from, to] = route[leg]
      exit(scratch.c, from, to)
      exit(scratch.d, to, from)
      signal.current.position.lerpVectors(scratch.c, scratch.d, smooth(remap(sigT, legs[leg][0], legs[leg][1])))
    }
    const shown = smooth(remap(t, T.signal[0] - 0.02, T.signal[0] + 0.01)) * (1 - remap(sigT, 0.97, 1))
    signal.current.visible = shown > 0.01
    signal.current.scale.setScalar(Math.max(shown, 0.001))
    ;(halo.current.material as THREE.SpriteMaterial).opacity = shown

    const lit: Partial<Record<TileId, number>> = {
      enquiry: smooth(remap(t, T.signal[0] - 0.02, T.signal[0] + 0.01)),
      info: smooth(remap(sigT, 0.24, 0.3)),
    }
    tiles.forEach((tile, index) => {
      const dot = dotRefs.current[index]
      if (!dot) return
      const amount = lit[tile.id] ?? 0
      dot.visible = amount > 0.01
      dot.scale.setScalar(Math.max(amount, 0.001))
    })

    const moving =
      Math.abs(s.progress - d.progress) > 1e-4 ||
      Math.abs(s.pointer.x - d.px) > 1e-3 ||
      Math.abs(s.pointer.y - d.py) > 1e-3 ||
      1 - d.intro > 1e-3 ||
      idle > 0.001
    if (moving && s.visible) invalidate()
  })

  const gridSize = useMemo(() => {
    const height = VIEW_H * ((CAMERA_Z - BG_Z) / CAMERA_Z) * 1.8
    return [height * 2, height] as const
  }, [])

  return (
    <>
      <fog attach="fog" args={[C.void, 9, 24]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[-2.5, 3.5, 5]} intensity={1.6} />
      <directionalLight position={[3, -1.5, 2]} intensity={0.35} />

      <mesh ref={grid}>
        <planeGeometry args={[gridSize[0], gridSize[1]]} />
        <meshBasicMaterial map={assets.grid} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      <group ref={rig}>
        <group ref={main}>
          <instancedMesh ref={swarm} args={[assets.fragment, undefined, FRAGMENTS]}>
            <meshStandardMaterial roughness={0.55} metalness={0.05} />
          </instancedMesh>

          {links.map((link, index) => (
            <mesh
              key={`${link.from}-${link.to}`}
              ref={(node) => {
                linkRefs.current[index] = node
              }}
            >
              <cylinderGeometry args={[0.011, 0.011, 1, 6, 1]} />
              <meshBasicMaterial color={C.chalk} transparent opacity={0.3} depthWrite={false} />
            </mesh>
          ))}
          {route.map(([from, to], index) => (
            <mesh
              key={`lit-${from}-${to}`}
              visible={false}
              ref={(node) => {
                litRefs.current[index] = node
              }}
            >
              <cylinderGeometry args={[0.02, 0.02, 1, 8, 1]} />
              <meshBasicMaterial color={C.signal} />
            </mesh>
          ))}

          {tiles.map((tile, index) => {
            const { w, h } = sizeOf(tile)
            const back = assets.doneFaces[index]
            return (
              <group
                key={tile.id}
                ref={(node) => {
                  tileRefs.current[index] = node
                }}
                position={tile.scattered.position}
                rotation={tile.scattered.rotation}
              >
                <mesh geometry={tile.foreground ? assets.fgSlab : assets.slab}>
                  <meshStandardMaterial
                    color={tile.surface === "chalk" ? "#ece6da" : "#1c221f"}
                    roughness={tile.surface === "chalk" ? 0.8 : 0.5}
                    metalness={0.05}
                  />
                </mesh>
                <mesh position={[0, 0, FACE_Z]}>
                  <planeGeometry args={[w, h]} />
                  <meshBasicMaterial map={assets.faces[index]} transparent />
                </mesh>
                {/* The finished state is printed on the back; the tile flips to show it. */}
                {back ? (
                  <mesh position={[0, 0, -FACE_Z]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[w, h]} />
                    <meshBasicMaterial map={back} transparent />
                  </mesh>
                ) : (
                  <mesh
                    position={[w / 2 - 0.195, h / 2 - 0.195, FACE_Z + 0.002]}
                    visible={false}
                    ref={(node) => {
                      dotRefs.current[index] = node
                    }}
                  >
                    <circleGeometry args={[0.04, 20]} />
                    <meshBasicMaterial color={C.signal} />
                  </mesh>
                )}
              </group>
            )
          })}

          <group ref={signal} visible={false}>
            <mesh>
              <sphereGeometry args={[0.05, 20, 20]} />
              <meshBasicMaterial color={C.signal} fog={false} />
            </mesh>
            <sprite ref={halo} scale={[0.7, 0.7, 1]}>
              <spriteMaterial map={assets.halo} transparent opacity={0} depthWrite={false} fog={false} />
            </sprite>
          </group>
        </group>
      </group>
    </>
  )
}

export function WorkflowScene({ state, onReady, onLost }: WorkflowSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="demand"
      flat
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, CAMERA_Z], fov: FOV, near: 0.1, far: 60 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault()
          onLost()
        })
        requestAnimationFrame(() => requestAnimationFrame(onReady))
      }}
    >
      <Workflow state={state} />
    </Canvas>
  )
}
