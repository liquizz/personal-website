import * as THREE from "three";

export function seededNoise(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export interface PortalTextureResult {
  tex: THREE.CanvasTexture;
  draw: (t: number) => void;
}

export function makePortalTexture(size = 512): PortalTextureResult | null {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;

  const draw = (t: number) => {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w * 0.5;
    const cy = h * 0.5;

    ctx.clearRect(0, 0, w, h);

    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.48);
    bg.addColorStop(0, "rgba(10,18,45,0.98)");
    bg.addColorStop(0.45, "rgba(20,45,120,0.9)");
    bg.addColorStop(0.75, "rgba(8,12,26,0.55)");
    bg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 11; i++) {
      const rr = w * (0.08 + i * 0.03 + Math.sin(t * 0.9 + i * 0.7) * 0.004);
      ctx.beginPath();
      ctx.arc(cx, cy, rr, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${120 + i * 8}, ${180 + i * 4}, 255, ${0.05 + i * 0.025})`;
      ctx.lineWidth = 2 + (i % 3);
      ctx.stroke();
    }

    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2 + t * (0.1 + (i % 5) * 0.02);
      const r1 = w * 0.11;
      const r2 = w * (0.29 + (i % 4) * 0.015);
      const x1 = cx + Math.cos(a) * r1;
      const y1 = cy + Math.sin(a) * r1;
      const x2 = cx + Math.cos(a) * r2;
      const y2 = cy + Math.sin(a) * r2;
      const g = ctx.createLinearGradient(x1, y1, x2, y2);
      g.addColorStop(0, "rgba(180,235,255,0.00)");
      g.addColorStop(0.45, "rgba(120,170,255,0.16)");
      g.addColorStop(1, "rgba(180,235,255,0.00)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    const coreR = w * (0.12 + Math.sin(t * 1.3) * 0.006);
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 1.9);
    core.addColorStop(0, "rgba(210,245,255,0.98)");
    core.addColorStop(0.18, "rgba(150,220,255,0.96)");
    core.addColorStop(0.5, "rgba(70,120,255,0.55)");
    core.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 1.9, 0, Math.PI * 2);
    ctx.fill();

    tex.needsUpdate = true;
  };

  draw(0);
  return { tex, draw };
}

export function makeGridTexture(size = 256): THREE.CanvasTexture | null {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#040814";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(90,140,255,0.28)";
  ctx.lineWidth = 1;

  for (let i = 0; i <= size; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(14, 14);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function makeDustGeometry(n: number): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array(n * 3);
  const cols = new Float32Array(n * 3);

  for (let i = 0; i < n; i++) {
    const r = 2 + seededNoise(i * 0.71 + 0.9) * 20;
    const a = seededNoise(i * 1.19 + 1.1) * Math.PI * 2;
    pos[i * 3 + 0] = Math.cos(a) * r;
    pos[i * 3 + 1] = -2 + seededNoise(i * 1.37 + 1.3) * 6;
    pos[i * 3 + 2] = Math.sin(a) * r;

    cols[i * 3 + 0] = 0.25 + seededNoise(i * 1.57 + 1.5) * 0.35;
    cols[i * 3 + 1] = 0.45 + seededNoise(i * 1.91 + 1.7) * 0.35;
    cols[i * 3 + 2] = 0.75 + seededNoise(i * 2.23 + 1.9) * 0.25;
  }

  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.BufferAttribute(cols, 3));
  return g;
}
