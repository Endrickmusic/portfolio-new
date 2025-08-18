/**
 * Utility to extract current Leva control values and generate updated configuration
 * This helps migrate from manual controls to config-driven controls
 */

/**
 * Extracts current control values and generates updated config
 * @param {Object} controls - Current Leva controls object
 * @param {Object} baseConfig - Base configuration to update
 * @returns {Object} Updated configuration with current values
 */
export const extractValuesToConfig = (controls, baseConfig) => {
  const updatedConfig = JSON.parse(JSON.stringify(baseConfig)) // Deep clone

  Object.entries(baseConfig).forEach(([sectionKey, sectionConfig]) => {
    if (sectionConfig.properties) {
      sectionConfig.properties.forEach((prop) => {
        const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1)

        // Extract values for each range
        const ranges = ["desktop", "tablet", "mobile"]
        ranges.forEach((range) => {
          const controlName = `${range.slice(0, 3)}${capitalizedProp}`
          const currentValue = controls[controlName]

          if (currentValue !== undefined) {
            updatedConfig[sectionKey].defaults[range][prop] = currentValue
          }
        })
      })
    }
  })

  return updatedConfig
}

/**
 * Logs current control values in a format that can be copied to config
 * @param {Object} controls - Current Leva controls object
 * @param {string} sectionName - Name of the section (e.g., 'work1', 'work2')
 * @param {Array} properties - Array of property names
 */
export const logCurrentValues = (controls, sectionName, properties) => {
  const ranges = ["desktop", "tablet", "mobile"]

  console.group(`🎛️ Current values for ${sectionName}:`)

  ranges.forEach((range) => {
    const values = {}
    properties.forEach((prop) => {
      const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1)
      const controlName = `${range.slice(0, 3)}${capitalizedProp}`
      values[prop] = controls[controlName]
    })

    console.log(`${range}:`, values)
  })

  console.groupEnd()
}

/**
 * Generates a complete config section from current control values
 * @param {Object} controls - Current Leva controls object
 * @param {string} sectionName - Name of the section
 * @param {string} displayName - Display name for the section
 * @param {Array} properties - Array of property names
 * @param {Object} ranges - Range definitions for each property
 * @returns {Object} Complete config section
 */
export const generateConfigSection = (
  controls,
  sectionName,
  displayName,
  properties,
  ranges
) => {
  const section = {
    section: displayName,
    properties: properties,
    defaults: {
      desktop: {},
      tablet: {},
      mobile: {},
    },
    ranges: ranges,
  }

  const rangeNames = ["desktop", "tablet", "mobile"]

  rangeNames.forEach((range) => {
    properties.forEach((prop) => {
      const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1)
      const controlName = `${range.slice(0, 3)}${capitalizedProp}`
      const currentValue = controls[controlName]

      if (currentValue !== undefined) {
        section.defaults[range][prop] = currentValue
      }
    })
  })

  return section
}

/**
 * Creates a browser console helper function to extract values
 * Call this in your component to get access to extraction functions
 * @param {Object} controls - Current controls object
 * @returns {Object} Helper functions attached to window
 */
export const createConsoleExtractor = (controls) => {
  // Attach helper functions to window for easy console access
  window.levaExtractor = {
    logCurrentValues: (sectionName, properties) =>
      logCurrentValues(controls, sectionName, properties),

    logAllWork: () => {
      logCurrentValues(controls, "work1", [
        "w1X",
        "w1Y",
        "w1TitleX",
        "w1TitleY",
        "w1TitleWidth",
        "w1DescX",
        "w1DescY",
        "w1DescWidth",
      ])
      logCurrentValues(controls, "work2", [
        "w2X",
        "w2Y",
        "w2TitleX",
        "w2TitleY",
        "w2TitleWidth",
        "w2DescX",
        "w2DescY",
        "w2DescWidth",
      ])
      logCurrentValues(controls, "work3", [
        "w3X",
        "w3Y",
        "w3TitleX",
        "w3TitleY",
        "w3TitleWidth",
        "w3DescX",
        "w3DescY",
        "w3DescWidth",
      ])
    },

    generateConfigJS: (sectionName, properties, ranges) => {
      const config = generateConfigSection(
        controls,
        sectionName,
        sectionName,
        properties,
        ranges
      )
      console.log(`📋 Copy this to your controlsConfig.js:`)
      console.log(JSON.stringify(config, null, 2))
      return config
    },

    exportCurrentConfig: () => {
      const config = {
        work1: generateConfigSection(
          controls,
          "work1",
          "Work 1",
          [
            "w1X",
            "w1Y",
            "w1TitleX",
            "w1TitleY",
            "w1TitleWidth",
            "w1DescX",
            "w1DescY",
            "w1DescWidth",
          ],
          {
            w1X: { min: -3, max: 3, step: 0.01 },
            w1Y: { min: -3, max: 0, step: 0.01 },
            w1TitleX: { min: -3, max: 3, step: 0.01 },
            w1TitleY: { min: -4, max: -1, step: 0.01 },
            w1TitleWidth: { min: 0.1, max: 2, step: 0.01 },
            w1DescX: { min: -3, max: 3, step: 0.01 },
            w1DescY: { min: -3, max: 0, step: 0.01 },
            w1DescWidth: { min: 0.5, max: 3.0, step: 0.1 },
          }
        ),
        work2: generateConfigSection(
          controls,
          "work2",
          "Work 2",
          [
            "w2X",
            "w2Y",
            "w2TitleX",
            "w2TitleY",
            "w2TitleWidth",
            "w2DescX",
            "w2DescY",
            "w2DescWidth",
          ],
          {
            w2X: { min: -3, max: 3, step: 0.01 },
            w2Y: { min: -3, max: 0, step: 0.01 },
            w2TitleX: { min: -3, max: 3, step: 0.01 },
            w2TitleY: { min: -3, max: 0, step: 0.01 },
            w2TitleWidth: { min: 0.1, max: 2, step: 0.01 },
            w2DescX: { min: -3, max: 3, step: 0.01 },
            w2DescY: { min: -3, max: 0, step: 0.01 },
            w2DescWidth: { min: 0.5, max: 3.0, step: 0.1 },
          }
        ),
        work3: generateConfigSection(
          controls,
          "work3",
          "Work 3",
          [
            "w3X",
            "w3Y",
            "w3TitleX",
            "w3TitleY",
            "w3TitleWidth",
            "w3DescX",
            "w3DescY",
            "w3DescWidth",
          ],
          {
            w3X: { min: -3, max: 3, step: 0.01 },
            w3Y: { min: -3, max: 0, step: 0.01 },
            w3TitleX: { min: -3, max: 3, step: 0.01 },
            w3TitleY: { min: -3, max: 0, step: 0.01 },
            w3TitleWidth: { min: 0.1, max: 2, step: 0.01 },
            w3DescX: { min: -3, max: 3, step: 0.01 },
            w3DescY: { min: -3, max: 0, step: 0.01 },
            w3DescWidth: { min: 0.5, max: 3.0, step: 0.1 },
          }
        ),
      }

      console.log("📋 Complete config object:")
      console.log(JSON.stringify(config, null, 2))
      return config
    },
  }

  console.log(`
🎛️ Leva Value Extractor loaded!

Available commands:
• levaExtractor.logAllWork() - Log all work section values
• levaExtractor.logCurrentValues('work1', ['w1X', 'w1Y', ...]) - Log specific section
• levaExtractor.generateConfigJS('work1', ['w1X', ...], {...ranges}) - Generate config
• levaExtractor.exportCurrentConfig() - Export complete config

Example:
levaExtractor.logAllWork()
  `)

  return window.levaExtractor
}

/**
 * React hook to easily extract values in development
 * @param {Object} controls - Leva controls object
 * @param {boolean} enabled - Whether to enable the extractor (default: development mode)
 */
export const useLevaExtractor = (
  controls,
  enabled = process.env.NODE_ENV === "development"
) => {
  if (enabled && typeof window !== "undefined") {
    createConsoleExtractor(controls)
  }
}

/**
 * Utility to format extracted values as JavaScript code
 * @param {Object} values - Extracted values object
 * @param {string} sectionName - Name of the section
 * @returns {string} Formatted JavaScript code
 */
export const formatAsJavaScript = (values, sectionName) => {
  return `
${sectionName}: {
  section: "${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}",
  properties: [${Object.keys(values.desktop || {})
    .map((k) => `"${k}"`)
    .join(", ")}],
  defaults: {
    desktop: ${JSON.stringify(values.desktop, null, 6)},
    tablet: ${JSON.stringify(values.tablet, null, 6)},
    mobile: ${JSON.stringify(values.mobile, null, 6)}
  },
  ranges: {
    // Add your ranges here
  }
}
  `.trim()
}
