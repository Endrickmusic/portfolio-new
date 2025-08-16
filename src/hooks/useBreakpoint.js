import { useState, useEffect } from "react"
import { useThree } from "@react-three/fiber"

// Define your breakpoints
const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
  ultrawide: 1920,
}

export function useBreakpoint() {
  const { size } = useThree()
  const [breakpoint, setBreakpoint] = useState("desktop")

  useEffect(() => {
    const width = size.width

    if (width < breakpoints.mobile) {
      setBreakpoint("mobile")
    } else if (width < breakpoints.tablet) {
      setBreakpoint("tablet")
    } else if (width < breakpoints.desktop) {
      setBreakpoint("desktop")
    } else if (width < breakpoints.ultrawide) {
      setBreakpoint("large")
    } else {
      setBreakpoint("ultrawide")
    }
  }, [size.width])

  return {
    breakpoint,
    isMobile: breakpoint === "mobile",
    isTablet: breakpoint === "tablet",
    isDesktop: breakpoint === "desktop",
    isLarge: breakpoint === "large",
    isUltrawide: breakpoint === "ultrawide",
    width: size.width,
    height: size.height,
  }
}

// Helper function to get responsive values
export function useResponsiveValue(values) {
  const { breakpoint } = useBreakpoint()
  return values[breakpoint] || values.desktop || values.default
}
