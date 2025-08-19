import { useState, useCallback, useRef } from "react"

export function useTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionProgress, setTransitionProgress] = useState(0)
  const [transitionDirection, setTransitionDirection] = useState("out") // 'out' or 'in'
  const transitionRef = useRef(null)

  const startTransition = useCallback((direction = "out") => {
    setIsTransitioning(true)
    setTransitionDirection(direction)
    setTransitionProgress(0)

    // Reset any existing transition
    if (transitionRef.current) {
      clearTimeout(transitionRef.current)
    }
  }, [])

  const updateTransition = useCallback((progress) => {
    setTransitionProgress(Math.max(0, Math.min(1, progress)))
  }, [])

  const completeTransition = useCallback(() => {
    setIsTransitioning(false)
    setTransitionProgress(0)
  }, [])

  const triggerPageTransition = useCallback(
    (callback, duration = 1000) => {
      startTransition("out")

      // Animate transition out
      const startTime = performance.now()
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        updateTransition(progress)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          // Transition out complete, execute callback
          if (callback) callback()

          // Start transition in
          startTransition("in")
          const inStartTime = performance.now()
          const animateIn = (currentTime) => {
            const elapsed = currentTime - inStartTime
            const progress = Math.min(elapsed / duration, 1)

            updateTransition(1 - progress) // Reverse progress for transition in

            if (progress < 1) {
              requestAnimationFrame(animateIn)
            } else {
              completeTransition()
            }
          }
          requestAnimationFrame(animateIn)
        }
      }

      requestAnimationFrame(animate)
    },
    [startTransition, updateTransition, completeTransition]
  )

  return {
    isTransitioning,
    transitionProgress,
    transitionDirection,
    startTransition,
    updateTransition,
    completeTransition,
    triggerPageTransition,
  }
}
