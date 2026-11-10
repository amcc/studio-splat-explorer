import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const KEYS = {
  KeyW: 'forward', ArrowUp: 'forward',
  KeyS: 'back', ArrowDown: 'back',
  KeyA: 'left', ArrowLeft: 'left',
  KeyD: 'right', ArrowRight: 'right',
  KeyE: 'up', KeyQ: 'down',
}

const forward = new THREE.Vector3()
const right = new THREE.Vector3()
const move = new THREE.Vector3()

export default function FlyControls({ speed = 1 }) {
  const { camera, controls, gl } = useThree()
  const keys = useRef({})
  const shift = useRef(false)
  const wheel = useRef(0)

  useEffect(() => {
    const onKey = (down) => (e) => {
      shift.current = e.shiftKey
      const action = KEYS[e.code]
      if (action) {
        keys.current[action] = down
        e.preventDefault()
      }
    }
    const onDown = onKey(true)
    const onUp = onKey(false)
    const onWheel = (e) => {
      e.preventDefault()
      wheel.current -= e.deltaY
    }
    const onBlur = () => { keys.current = {} }
    const el = gl.domElement

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('blur', onBlur)
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
      el.removeEventListener('wheel', onWheel)
    }
  }, [gl])

  useFrame((_, delta) => {
    const k = keys.current
    camera.getWorldDirection(forward)
    right.crossVectors(forward, camera.up).normalize()
    move.set(0, 0, 0)

    const step = speed * (shift.current ? 3 : 1) * delta
    if (k.forward) move.addScaledVector(forward, step)
    if (k.back) move.addScaledVector(forward, -step)
    if (k.right) move.addScaledVector(right, step)
    if (k.left) move.addScaledVector(right, -step)
    if (k.up) move.addScaledVector(camera.up, step)
    if (k.down) move.addScaledVector(camera.up, -step)

    if (wheel.current) {
      const amount = wheel.current * 0.002 * speed
      move.addScaledVector(forward, amount)
      wheel.current = 0
    }

    if (move.lengthSq() > 0) {
      camera.position.add(move)
      controls?.target.add(move)
    }
  })

  return null
}
