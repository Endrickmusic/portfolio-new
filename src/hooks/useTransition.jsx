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
    (outDuration = 800, inDuration = 1200) => {
      return (callback) => {
        startTransition("out")

        // Animate transition out
        const startTime = performance.now()
        const animate = (currentTime) => {
          const elapsed = currentTime - startTime
          const rawProgress = Math.min(elapsed / outDuration, 1)

          // Apply easing for smoother animation
          const progress = 1 - Math.pow(1 - rawProgress, 3) // Ease out cubic

          updateTransition(progress)

          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            // Transition out complete, execute callback
            if (callback) callback()

            // Small delay before starting transition in for more convincing effect
            setTimeout(() => {
              startTransition("in")
              const inStartTime = performance.now()
              const animateIn = (currentTime) => {
                const elapsed = currentTime - inStartTime
                const rawProgress = Math.min(elapsed / inDuration, 1)

                // Apply easing for smoother animation
                const progress = Math.pow(rawProgress, 2) // Ease in quadratic

                updateTransition(1 - progress) // Reverse progress for transition in

                if (progress < 1) {
                  requestAnimationFrame(animateIn)
                } else {
                  completeTransition()
                }
              }
              requestAnimationFrame(animateIn)
            }, 100) // 100ms delay before transition in starts
          }
        }

        requestAnimationFrame(animate)
      }
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
