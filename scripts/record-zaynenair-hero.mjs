/**
 * Record the zaynenair.com hero scroll and encode a short silent MP4.
 *
 * The hero is pinned for 400svh and scrubbed by scroll, so this drives
 * window.scrollTo through that distance and captures one frame per step.
 *
 *   npm install --prefix /tmp/zaynenair-rec playwright-core
 *   PLAYWRIGHT_CORE=/tmp/zaynenair-rec/node_modules/playwright-core/index.mjs \
 *     node scripts/record-zaynenair-hero.mjs
 *
 * Uses the system Chrome. ffmpeg must be on PATH.
 * Set FRAMES=6 for a short check. Default is 8 seconds at 30fps.
 */
import { spawnSync } from "node:child_process"
import { mkdirSync, rmSync } from "node:fs"
import path from "node:path"
import { tmpdir } from "node:os"

const ROOT = path.resolve(import.meta.dirname, "..")
const FPS = 30
const SECONDS = 8
const FRAMES = Number(process.env.FRAMES || FPS * SECONDS)
const VIEWPORT = { width: 390, height: 832 }
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const FRAMES_DIR = path.join(tmpdir(), "zaynenair-hero-frames")
const VIDEO = path.join(ROOT, "public/case-studies/zaynenair-hero.mp4")
const POSTER = path.join(ROOT, "public/case-studies/zaynenair-poster.webp")

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit" })
  if (result.status !== 0) {
    throw new Error(`${cmd} exited ${result.status}`)
  }
}

const { chromium } = await import(process.env.PLAYWRIGHT_CORE || "playwright-core")

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
})

const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  reducedMotion: "no-preference",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
})

const page = await context.newPage()
await page.goto("https://www.zaynenair.com/", { waitUntil: "networkidle", timeout: 60000 })
await page.evaluate(() => document.fonts.ready)

const metrics = await page.evaluate(() => {
  const section = [...document.querySelectorAll("section")].find(
    (node) => node.offsetHeight > window.innerHeight * 2,
  )
  if (!section) throw new Error("Hero section not found")
  const canvas = section.querySelector("canvas")
  const top = section.getBoundingClientRect().top + window.scrollY
  return {
    top,
    travel: section.offsetHeight - window.innerHeight,
    canvasWidth: canvas?.width ?? 0,
    sectionHeight: section.offsetHeight,
    innerHeight: window.innerHeight,
  }
})

if (metrics.canvasWidth < 1 || metrics.travel < 100) {
  throw new Error(`Hero was not ready: ${JSON.stringify(metrics)}`)
}

console.log("hero", metrics, "frames", FRAMES)

rmSync(FRAMES_DIR, { recursive: true, force: true })
mkdirSync(FRAMES_DIR, { recursive: true })

for (let index = 0; index < FRAMES; index++) {
  const t = FRAMES === 1 ? 0 : index / (FRAMES - 1)
  const y = metrics.top + metrics.travel * easeInOut(t)
  await page.evaluate((nextY) => {
    document.documentElement.style.scrollBehavior = "auto"
    window.scrollTo(0, nextY)
  }, y)
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  )
  const file = path.join(FRAMES_DIR, `${String(index + 1).padStart(4, "0")}.jpg`)
  await page.screenshot({ path: file, type: "jpeg", quality: 82 })
  if (index % 30 === 0) console.log(`frame ${index + 1}/${FRAMES}`)
}

await browser.close()

run("ffmpeg", [
  "-y",
  "-framerate",
  String(FPS),
  "-i",
  path.join(FRAMES_DIR, "%04d.jpg"),
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-crf",
  "28",
  "-preset",
  "slow",
  "-movflags",
  "+faststart",
  "-an",
  "-vf",
  "scale=540:-2",
  VIDEO,
])

run("python3", [
  "-c",
  "import sys; from PIL import Image; Image.open(sys.argv[1]).save(sys.argv[2], 'WEBP', quality=82, method=6)",
  path.join(FRAMES_DIR, "0001.jpg"),
  POSTER,
])

console.log("wrote", VIDEO)
console.log("wrote", POSTER)
