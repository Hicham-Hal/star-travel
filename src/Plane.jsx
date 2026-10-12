import { useEffect } from 'react'
import * as THREE from 'three'

const sm = (v) => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v) }

// 3D plane that starts in the hero stage, takes off and flies down the page on scroll.
export default function Plane({ stageRef, onReady }) {
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }) } catch { return }

    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2))
    renderer.domElement.id = 'fly'
    renderer.domElement.setAttribute('aria-hidden', 'true')
    document.body.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const cam = new THREE.OrthographicCamera(0, 1, 1, 0, -1000, 1000)
    cam.position.z = 500
    scene.add(new THREE.AmbientLight(0xffffff, 1.5))
    const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(0.4, 0.9, 1); scene.add(key)
    const fill = new THREE.DirectionalLight(0x9db8ff, 0.9); fill.position.set(-1, -0.5, 0.6); scene.add(fill)

    const M = (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.45, metalness: 0.1 })
    const white = M(0xffffff), navy = M(0x12213f), gold = M(0xf2b705), glass = M(0x1d5fd1)
    const H2 = Math.PI / 2
    const body = new THREE.Group()
    // [geometry, material, x, y, z, rx, ry, rz]  (nose = +x, wings = ±z)
    ;[
      [new THREE.CylinderGeometry(.07, .07, .8, 24), white, -.05, 0, 0, 0, 0, H2],
      [new THREE.ConeGeometry(.07, .22, 24), white, .46, 0, 0, 0, 0, -H2],
      [new THREE.ConeGeometry(.07, .3, 24), white, -.6, 0, 0, 0, 0, H2],
      [new THREE.SphereGeometry(.05, 16, 12), glass, .4, .04, 0, 0, 0, 0],
      [new THREE.BoxGeometry(.24, .014, .55), white, .02, -.01, .27, 0, -.5, 0],
      [new THREE.BoxGeometry(.24, .014, .55), white, .02, -.01, -.27, 0, .5, 0],
      [new THREE.BoxGeometry(.1, .01, .1), gold, -.24, -.01, .52, 0, -.5, 0],
      [new THREE.BoxGeometry(.1, .01, .1), gold, -.24, -.01, -.52, 0, .5, 0],
      [new THREE.BoxGeometry(.14, .012, .26), white, -.52, 0, .1, 0, -.45, 0],
      [new THREE.BoxGeometry(.14, .012, .26), white, -.52, 0, -.1, 0, .45, 0],
      [new THREE.BoxGeometry(.2, .22, .014), gold, -.54, .14, 0, 0, 0, .4],
      [new THREE.CylinderGeometry(.035, .035, .16, 16), navy, .04, -.06, .2, 0, 0, H2],
      [new THREE.CylinderGeometry(.035, .035, .16, 16), navy, .04, -.06, -.2, 0, 0, H2],
    ].forEach(([g, m, x, y, z, rx, ry, rz]) => {
      const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.rotation.set(rx, ry, rz); body.add(o)
    })
    const inner = new THREE.Group(); inner.add(body)
    const outer = new THREE.Group(); outer.add(inner); scene.add(outer)

    let W, H, hx, hy, hs, fs, docH, raf
    const measure = () => {
      W = innerWidth; H = innerHeight
      renderer.setSize(W, H); cam.right = W; cam.top = H; cam.updateProjectionMatrix()
      const r = stage.getBoundingClientRect()
      hx = r.left + r.width / 2; hy = r.top + scrollY + r.height / 2
      hs = Math.min(r.width * 0.85, 340); fs = W < 820 ? 105 : 150
      docH = Math.max(1, document.documentElement.scrollHeight - H)
    }
    const pos = (t) => {
      const s = sm(t / 0.07), a = W < 820 ? 0.3 : 0.36
      return {
        x: hx * (1 - s) + (W * 0.5 + Math.sin(t * 14) * W * a) * s,
        y: hy * (1 - s) + (H * 0.5 + Math.sin(t * 9 + 1) * H * 0.2) * s,
        z: hs * (1 - s) + fs * s, s,
      }
    }

    let cur = null, ang = 0.3, bank = 0
    const frame = (ms) => {
      const t = reduce ? 0 : Math.max(0, Math.min(1, scrollY / docH))
      const p = pos(t), q = pos(Math.min(1, t + 0.004))
      const dx = q.x - p.x, dy = q.y - p.y
      const tgt = (dx || dy ? Math.atan2(-dy, dx) : 0) + 0.3 * (1 - p.s)
      if (!cur) cur = { x: p.x, y: p.y, z: p.z }
      const k = reduce ? 1 : 0.09
      cur.x += (p.x - cur.x) * k; cur.y += (p.y - cur.y) * k; cur.z += (p.z - cur.z) * k
      const diff = Math.atan2(Math.sin(tgt - ang), Math.cos(tgt - ang)); ang += diff * 0.07
      const time = ms / 1000
      const bob = reduce ? 0 : Math.sin(time * 1.6) * (5 + 6 * (1 - p.s))
      const wantBank = Math.max(-0.7, Math.min(0.7, diff * 1.4)) + Math.sin(time * 1.1) * 0.05
      bank += (wantBank - bank) * 0.06
      outer.position.set(cur.x, H - (cur.y + bob), 0)
      outer.rotation.z = ang
      inner.rotation.x = 1.0 + bank
      outer.scale.setScalar(cur.z)
      renderer.render(scene, cam)
      if (!reduce) raf = requestAnimationFrame(frame)
    }

    const onResize = () => { measure(); if (reduce) requestAnimationFrame(frame) }
    measure()
    onReady?.(true)
    addEventListener('resize', onResize)
    addEventListener('load', measure)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', onResize)
      removeEventListener('load', measure)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return null
}
