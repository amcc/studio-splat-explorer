import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark'
import * as THREE from 'three'

export default function SplatViewer({ url, onStatus }) {
  const { gl, scene, camera, controls } = useThree()
  const groupRef = useRef()

  useEffect(() => {
    const spark = new SparkRenderer({ renderer: gl })
    scene.add(spark)
    return () => {
      scene.remove(spark)
      spark.dispose?.()
    }
  }, [gl, scene])

  useEffect(() => {
    let cancelled = false
    const group = groupRef.current
    const splat = new SplatMesh({ url })
    onStatus?.('loading')
    group.add(splat)

    splat.initialized
      .then(() => {
        if (cancelled) return
        onStatus?.('ready')
        let box
        try {
          box = new THREE.Box3().copy(splat.getBoundingBox())
        } catch {
          return
        }
        if (box.isEmpty()) return
        const center = box.getCenter(new THREE.Vector3())
        const radius = box.getSize(new THREE.Vector3()).length() / 2
        group.updateMatrixWorld(true)
        center.applyMatrix4(group.matrixWorld)
        camera.position.copy(center)
        camera.near = 0.01
        camera.far = Math.max(radius, 1) * 20
        camera.updateProjectionMatrix()
        if (controls) {
          // Target sits just in front of the camera so orbiting acts as looking around
          controls.target.copy(center).add(new THREE.Vector3(0, 0, -0.05))
          controls.update()
        }
      })
      .catch((err) => {
        console.error('Failed to load splat:', err)
        if (!cancelled) onStatus?.('error')
      })

    return () => {
      cancelled = true
      group.remove(splat)
      splat.dispose()
    }
  }, [url, camera, controls, onStatus])

  return <group ref={groupRef} />
}
