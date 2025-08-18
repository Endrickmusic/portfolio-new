import { folder } from "leva"

/**
 * Generates Leva controls from a configuration object
 * @param {Object} config - Configuration object with sections and properties
 * @param {Function} folderFn - Leva folder function
 * @returns {Object} Generated controls object
 */
export const generateControlsFromConfig = (config, folderFn = folder) => {
  // Safety check for null/undefined config
  if (!config || typeof config !== "object") {
    console.error(
      "generateControlsFromConfig: config is null, undefined, or not an object:",
      config
    )
    return {}
  }

  const controls = {}

  Object.entries(config).forEach(([sectionKey, sectionConfig]) => {
    if (sectionConfig && sectionConfig.properties) {
      // Generate responsive controls for desktop, tablet, mobile
      const ranges = ["desktop", "tablet", "mobile"]
      const folders = {}

      ranges.forEach((range) => {
        const rangeControls = {}

        sectionConfig.properties.forEach((prop) => {
          // Map range names to the expected prefixes
          const rangePrefix =
            {
              desktop: "desk",
              tablet: "tab",
              mobile: "mob",
            }[range] || range.slice(0, 3)

          const controlName = `${rangePrefix}${
            prop.charAt(0).toUpperCase() + prop.slice(1)
          }`
          const defaultValue = sectionConfig.defaults?.[range]?.[prop]
          const rangeConfig = sectionConfig.ranges?.[prop]

          if (defaultValue !== undefined && rangeConfig) {
            rangeControls[controlName] = {
              value: defaultValue,
              ...rangeConfig,
            }
          }
        })

        if (Object.keys(rangeControls).length > 0) {
          folders[range.charAt(0).toUpperCase() + range.slice(1)] = folderFn(
            rangeControls,
            { collapsed: true }
          )
        }
      })

      // Add styling controls if they exist (non-responsive)
      if (sectionConfig.styling) {
        folders.Styling = folderFn(sectionConfig.styling, { collapsed: true })
      }

      if (Object.keys(folders).length > 0) {
        controls[sectionConfig.section] = folderFn(folders, { collapsed: true })
      }
    }
  })

  return controls
}

/**
 * Generates responsive hooks from controls and configuration
 * @param {Object} controls - Leva controls object
 * @param {Object} config - Configuration object
 * @param {Function} useResponsiveValue - useResponsiveValue hook
 * @returns {Object} Object containing all responsive hooks
 */
export const generateResponsiveHooks = (
  controls,
  config,
  useResponsiveValue
) => {
  // Safety check for null/undefined config
  if (!config || typeof config !== "object") {
    console.error(
      "generateResponsiveHooks: config is null, undefined, or not an object:",
      config
    )
    return {}
  }

  const hooks = {}

  // Handle both nested and flat config structures
  const processConfig = (configSection) => {
    if (configSection && configSection.properties) {
      configSection.properties.forEach((prop) => {
        const hookName = prop
        const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1)

        // Check if the controls exist before creating hooks
        const mobileControl = controls[`mob${capitalizedProp}`]
        const tabletControl = controls[`tab${capitalizedProp}`]
        const desktopControl = controls[`desk${capitalizedProp}`]

        if (
          mobileControl !== undefined &&
          tabletControl !== undefined &&
          desktopControl !== undefined
        ) {
          hooks[hookName] = useResponsiveValue({
            mobile: mobileControl,
            tablet: tabletControl,
            desktop: desktopControl,
            large: desktopControl,
            ultrawide: desktopControl,
          })
        }
      })
    }
  }

  Object.entries(config).forEach(([sectionKey, sectionConfig]) => {
    // Handle nested structure (like header.chLetters)
    if (sectionConfig && sectionConfig.properties) {
      processConfig(sectionConfig)
    } else if (sectionConfig && typeof sectionConfig === "object") {
      // Handle deeper nesting
      Object.values(sectionConfig).forEach(processConfig)
    }
  })

  return hooks
}

/**
 * Generates simple controls (non-responsive) from configuration
 * @param {Object} config - Configuration object
 * @param {Function} folderFn - Leva folder function
 * @returns {Object} Generated controls object
 */
export const generateSimpleControlsFromConfig = (config, folderFn = folder) => {
  // Safety check for null/undefined config
  if (!config || typeof config !== "object") {
    console.error(
      "generateSimpleControlsFromConfig: config is null, undefined, or not an object:",
      config
    )
    return {}
  }

  const controls = {}

  Object.entries(config).forEach(([sectionKey, sectionConfig]) => {
    if (sectionConfig && sectionConfig.properties) {
      const folders = {}

      sectionConfig.properties.forEach((prop) => {
        const defaultValue = sectionConfig.defaults?.desktop?.[prop] // Use desktop as default
        const rangeConfig = sectionConfig.ranges?.[prop]

        if (defaultValue !== undefined && rangeConfig) {
          folders[prop] = {
            value: defaultValue,
            ...rangeConfig,
          }
        }
      })

      if (Object.keys(folders).length > 0) {
        controls[sectionConfig.section] = folderFn(folders, { collapsed: true })
      }
    }
  })

  return controls
}

/**
 * Validates configuration object structure
 * @param {Object} config - Configuration object to validate
 * @returns {Array} Array of validation errors (empty if valid)
 */
export const validateConfig = (config) => {
  // Safety check for null/undefined config
  if (!config || typeof config !== "object") {
    console.error(
      "validateConfig: config is null, undefined, or not an object:",
      config
    )
    return ["Configuration is null, undefined, or not an object"]
  }

  const errors = []

  Object.entries(config).forEach(([sectionKey, sectionConfig]) => {
    if (!sectionConfig || typeof sectionConfig !== "object") {
      errors.push(`Section ${sectionKey} is null, undefined, or not an object`)
      return
    }

    if (!sectionConfig.section) {
      errors.push(`Section ${sectionKey} missing 'section' property`)
    }

    if (!sectionConfig.properties || !Array.isArray(sectionConfig.properties)) {
      errors.push(`Section ${sectionKey} missing or invalid 'properties' array`)
    }

    if (!sectionConfig.defaults || typeof sectionConfig.defaults !== "object") {
      errors.push(`Section ${sectionKey} missing 'defaults' object`)
    } else {
      const requiredRanges = ["desktop", "tablet", "mobile"]
      requiredRanges.forEach((range) => {
        if (!sectionConfig.defaults[range]) {
          errors.push(`Section ${sectionKey} missing defaults for '${range}'`)
        }
      })
    }

    if (!sectionConfig.ranges || typeof sectionConfig.ranges !== "object") {
      errors.push(`Section ${sectionKey} missing 'ranges' object`)
    }
  })

  return errors
}

/**
 * Merges user overrides with default configuration
 * @param {Object} defaultConfig - Default configuration
 * @param {Object} overrides - User overrides
 * @returns {Object} Merged configuration
 */
export const mergeConfig = (defaultConfig, overrides) => {
  // Safety check for null/undefined configs
  if (!defaultConfig || typeof defaultConfig !== "object") {
    console.error(
      "mergeConfig: defaultConfig is null, undefined, or not an object:",
      defaultConfig
    )
    return overrides || {}
  }

  if (!overrides || typeof overrides !== "object") {
    console.error(
      "mergeConfig: overrides is null, undefined, or not an object:",
      overrides
    )
    return defaultConfig
  }

  const merged = JSON.parse(JSON.stringify(defaultConfig)) // Deep clone

  Object.entries(overrides).forEach(([sectionKey, overrideSection]) => {
    if (
      merged[sectionKey] &&
      overrideSection &&
      typeof overrideSection === "object"
    ) {
      // Merge defaults
      if (overrideSection.defaults) {
        Object.entries(overrideSection.defaults).forEach(([range, values]) => {
          if (
            merged[sectionKey].defaults?.[range] &&
            values &&
            typeof values === "object"
          ) {
            merged[sectionKey].defaults[range] = {
              ...merged[sectionKey].defaults[range],
              ...values,
            }
          }
        })
      }

      // Merge ranges
      if (overrideSection.ranges) {
        merged[sectionKey].ranges = {
          ...merged[sectionKey].ranges,
          ...overrideSection.ranges,
        }
      }

      // Merge styling
      if (overrideSection.styling) {
        merged[sectionKey].styling = {
          ...merged[sectionKey].styling,
          ...overrideSection.styling,
        }
      }
    }
  })

  return merged
}
