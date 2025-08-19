import { createContext, useContext, useMemo } from "react"
import { useTransition } from "../hooks/useTransition"

const TransitionContext = createContext(null)

export function TransitionProvider({ children }) {
  const transition = useTransition()

  const value = useMemo(
    () => ({
      ...transition,
      // Add navigation wrapper that triggers transitions
      navigateWithTransition: (navigate, path, duration = 1000) => {
        transition.triggerPageTransition(() => {
          navigate(path)
        }, duration)
      },
    }),
    [transition]
  )

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransitionContext() {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error(
      "useTransitionContext must be used within a TransitionProvider"
    )
  }
  return context
}
