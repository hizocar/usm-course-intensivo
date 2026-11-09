// Export one part of a lesson video to MP4, frame by frame.
//
// The scenes are pure functions of time, so each frame is drawn with
// window.__lv.seek(part, t) and screenshotted: no dropped frames, no real-time
// recording. Frames are piped to ffmpeg and muxed with the part's voice track.
//
//   npm i playwright          (anywhere; set CHROME to a Chromium binary if needed)
//   node tools/video/render_mp4.js <url-of-page-with-the-widget> <part 1|2> <out.mp4>
//
// The page must be served over HTTP (python -m http.server inside site/ or docs/).
// Env: AUDIO (path to docs/media/<lesson>/partN.mp3), FPS (default 30),
//      WIDTH (default 1920), LIMIT (seconds, for a quick test), CC=0 to leave the subtitles out.
const { chromium } = require("playwright");
const { spawn } = require("child_process");

(async () => {
  const [url, partArg, out] = process.argv.slice(2);
  if (!url || !partArg || !out) {
    console.error("usage: node render_mp4.js <page-url> <part> <out.mp4>");
    process.exit(1);
  }
  const fps = +(process.env.FPS || 30);
  const width = +(process.env.WIDTH || 1920);
  const height = Math.round((width * 9) / 16);
  const pi = +partArg - 1;

  const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const flags = "lv-render" + (process.env.CC === "0" ? "&lv-nocc" : "");
  await page.goto(url + (url.includes("?") ? "&" : "?") + flags, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__lv);
  await page.evaluate(() => document.fonts.ready);
  const info = await page.evaluate((i) => window.__lv.parts[i], pi);
  const duration = Math.min(info.duration, process.env.LIMIT ? +process.env.LIMIT : Infinity);
  const frames = Math.ceil(duration * fps);

  const args = ["-v", "error", "-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-"];
  if (process.env.AUDIO) args.push("-i", process.env.AUDIO);
  // Layout can round the screen to an odd height (1081); x264 needs even sizes.
  args.push("-vf", `scale=${width}:${height}`, "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart");
  if (process.env.AUDIO) args.push("-c:a", "aac", "-b:a", "128k", "-shortest");
  args.push(out);
  const ff = spawn("ffmpeg", args, { stdio: ["pipe", "inherit", "inherit"] });
  let ffDone = false;
  const ffClosed = new Promise((r) => ff.on("close", (code) => { ffDone = true; r(code); }));

  const screen = page.locator(".lv-screen");
  const t0 = Date.now();
  for (let f = 0; f < frames; f++) {
    await page.evaluate(([i, t]) => window.__lv.seek(i, t), [pi, f / fps]);
    const buf = await screen.screenshot({ type: "jpeg", quality: 92 });
    if (ffDone) throw new Error("ffmpeg stopped early, see its error above");
    if (!ff.stdin.write(buf)) await Promise.race([new Promise((r) => ff.stdin.once("drain", r)), ffClosed]);
    if (f % (fps * 10) === 0) {
      const el = (Date.now() - t0) / 1000;
      process.stdout.write(`\rframe ${f}/${frames}  ${Math.round((100 * f) / frames)}%  ${el.toFixed(0)}s   `);
    }
  }
  ff.stdin.end();
  const code = await ffClosed;
  if (code) throw new Error("ffmpeg exited with code " + code);
  await browser.close();
  console.log(`\nwrote ${out} (${duration.toFixed(1)} s, audio: ${process.env.AUDIO || "none"})`);
})();
