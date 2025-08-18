import { useEffect, useRef } from "react"
import { controlsConfig as baseConfig } from "../config/controlsConfig"

/**
 * Simple hook to log current Leva values to console
 * @param {Object} liveValues - Object containing current live values from Leva
 */
export const useLevaExtractor = (liveValues) => {
  const hasRun = useRef(false)
  const valuesRef = useRef(liveValues)

  // Keep a fresh snapshot of values in a ref (updated every render/change)
  useEffect(() => {
    valuesRef.current = liveValues
  }, [liveValues])

  // Install console helpers once; they read from valuesRef so they are always fresh
  useEffect(() => {
    if (hasRun.current) return

    const getAll = () => valuesRef.current || {}
    const round = (v) => (typeof v === "number" ? parseFloat(v.toFixed(4)) : v)
    const formatAll = (obj) => {
      const out = {}
      Object.keys(obj).forEach((k) => {
        out[k] = round(obj[k])
      })
      return out
    }

    const rangePrefixFor = (range) =>
      ({ desktop: "desk", tablet: "tab", mobile: "mob" }[range] ||
      range.slice(0, 3))

    const buildDefaultsFromLive = (properties, live, baseDefaults) => {
      const defaults = { desktop: {}, tablet: {}, mobile: {} }
      ;["desktop", "tablet", "mobile"].forEach((range) => {
        const prefix = rangePrefixFor(range)
        properties.forEach((prop) => {
          const key = `${prefix}${prop.charAt(0).toUpperCase()}${prop.slice(1)}`
          const liveVal = live[key]
          const baseVal = baseDefaults?.[range]?.[prop]
          const finalVal =
            liveVal === undefined ? round(baseVal) : round(liveVal)
          // Only set when defined; avoid undefined in output
          if (finalVal !== undefined) {
            defaults[range][prop] = finalVal
          }
        })
      })
      return defaults
    }

    const formatJSObject = (obj, indent = 0) => {
      const spaces = "  ".repeat(indent)
      const next = "  ".repeat(indent + 1)
      if (obj === null || typeof obj !== "object") return JSON.stringify(obj)
      if (Array.isArray(obj)) {
        if (!obj.length) return "[]"
        return (
          "[\n" +
          obj.map((it) => next + formatJSObject(it, indent + 1)).join(",\n") +
          "\n" +
          spaces +
          "]"
        )
      }
      const entries = Object.entries(obj)
      if (!entries.length) return "{}"
      return (
        "{\n" +
        entries
          .map(([k, v]) => `${next}${k}: ${formatJSObject(v, indent + 1)}`)
          .join(",\n") +
        "\n" +
        spaces +
        "}"
      )
    }

    window.levaExtractor = {
      logValues: () => {
        const current = formatAll(getAll())
        console.log("🎛️ Current Leva Values:")
        console.log(current)
      },

      logDesktopValues: () => {
        const current = getAll()
        console.log("🖥️ Desktop Values:")
        const desktopValues = {}
        Object.keys(current).forEach((key) => {
          if (key.startsWith("desk")) {
            const cleanKey = key.replace("desk", "").toLowerCase()
            desktopValues[cleanKey] = round(current[key])
          }
        })
        console.log(desktopValues)
      },

      logTabletValues: () => {
        const current = getAll()
        console.log("📱 Tablet Values:")
        const tabletValues = {}
        Object.keys(current).forEach((key) => {
          if (key.startsWith("tab")) {
            const cleanKey = key.replace("tab", "").toLowerCase()
            tabletValues[cleanKey] = round(current[key])
          }
        })
        console.log(tabletValues)
      },

      logMobileValues: () => {
        const current = getAll()
        console.log("📱 Mobile Values:")
        const mobileValues = {}
        Object.keys(current).forEach((key) => {
          if (key.startsWith("mob")) {
            const cleanKey = key.replace("mob", "").toLowerCase()
            mobileValues[cleanKey] = round(current[key])
          }
        })
        console.log(mobileValues)
      },

      // Build a full controlsConfig with current values as defaults and existing ranges
      exportForPaste: () => {
        const live = getAll()

        // Header (iterate subsections)
        const header = {}
        Object.entries(baseConfig.header).forEach(([subKey, sub]) => {
          header[subKey] = {
            section: sub.section,
            properties: sub.properties.slice(),
            defaults: buildDefaultsFromLive(sub.properties, live, sub.defaults),
            ranges: sub.ranges,
          }
        })

        // Content (iterate subsections)
        const content = {}
        Object.entries(baseConfig.content).forEach(([subKey, sub]) => {
          content[subKey] = {
            section: sub.section,
            properties: sub.properties.slice(),
            defaults: buildDefaultsFromLive(sub.properties, live, sub.defaults),
            ranges: sub.ranges,
          }
        })

        // Footer (single section)
        const footerBase = baseConfig.footer
        const footer = {
          section: footerBase.section,
          properties: footerBase.properties.slice(),
          defaults: buildDefaultsFromLive(
            footerBase.properties,
            live,
            footerBase.defaults
          ),
          ranges: footerBase.ranges,
        }

        const full = { header, content, footer }
        const code = "export const controlsConfig = " + formatJSObject(full)

        // Try to copy to clipboard for clean pasting (no console escaping)
        try {
          // DevTools helper available in most browsers
          if (typeof copy === "function") {
            copy(code)
            console.log(
              "✅ Config copied to clipboard. Paste into src/config/controlsConfig.js"
            )
          } else if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(code)
            console.log(
              "✅ Config copied to clipboard. Paste into src/config/controlsConfig.js"
            )
          }
        } catch (e) {
          console.warn("Clipboard copy failed, showing code below.")
        }

        // Also print a clean preview
        console.log("\n// Copy-paste into src/config/controlsConfig.js\n")
        console.log(code)
        return full
      },
    }

    console.log(`
🎛️ Simple Leva Extractor loaded!

Available commands:
• levaExtractor.logValues() - Log all current values
• levaExtractor.logDesktopValues() - Log desktop values only
• levaExtractor.logTabletValues() - Log tablet values only  
• levaExtractor.logMobileValues() - Log mobile values only

Try: levaExtractor.logValues()
    `)

    hasRun.current = true
  }, [])
}
