// Configuration object for all Leva controls
// This centralizes all default values, ranges, and control definitions

export const controlsConfig = {
  // Header controls
  header: {
    chLetters: {
      section: "C and H Letters",
      properties: ["chGroupY", "cScale", "cX", "cY", "hScale", "hX", "hY"],
      defaults: {
        desktop: {
          chGroupY: 0.1,
          cScale: 0.008,
          cX: -3.02,
          cY: 0.96,
          hScale: 0.008,
          hX: 0.08,
          hY: 0.96,
        },
        tablet: {
          chGroupY: 0.1,
          cScale: 0.008,
          cX: -3.02,
          cY: 0.96,
          hScale: 0.008,
          hX: 0.08,
          hY: 0.96,
        },
        mobile: {
          chGroupY: 0.06,
          cScale: 0.006,
          cX: -0.8,
          cY: 0.8,
          hScale: 0.006,
          hX: -0.7,
          hY: -0.5,
        },
      },
      ranges: {
        chGroupY: { min: -0.5, max: 1.0, step: 0.01 },
        cScale: { min: 0.001, max: 0.02, step: 0.0001 },
        cX: { min: -5, max: 0, step: 0.01 },
        cY: { min: 0, max: 2, step: 0.01 },
        hScale: { min: 0.001, max: 0.02, step: 0.0001 },
        hX: { min: -2, max: 2, step: 0.01 },
        hY: { min: -4, max: 2, step: 0.01 },
      },
    },
  },

  // Content controls
  content: {
    global: {
      section: "Global",
      properties: ["globalBorder"],
      defaults: {
        desktop: { globalBorder: 0.01 },
        tablet: { globalBorder: 0.01 },
        mobile: { globalBorder: 0.01 },
      },
      ranges: {
        globalBorder: { min: 0.0, max: 0.1, step: 0.0025 },
      },
    },

    introduction: {
      section: "Introduction",
      properties: ["introX", "introY", "introWidth"],
      defaults: {
        desktop: { introX: -3.02, introY: -0.65, introWidth: 0.52 },
        tablet: { introX: -3.02, introY: -0.65, introWidth: 0.52 },
        mobile: { introX: -3.02, introY: -0.65, introWidth: 0.52 },
      },
      ranges: {
        introX: { min: -5, max: 0, step: 0.01 },
        introY: { min: -2, max: 0, step: 0.01 },
        introWidth: { min: 0.1, max: 1.0, step: 0.01 },
      },
    },

    work1: {
      section: "Work 1",
      properties: [
        "w1X",
        "w1Y",
        "w1TitleX",
        "w1TitleY",
        "w1TitleWidth",
        "w1DescX",
        "w1DescY",
        "w1DescWidth",
      ],
      defaults: {
        desktop: {
          w1X: -0.13,
          w1Y: -1.19,
          w1TitleX: 1.55,
          w1TitleY: -0.9,
          w1TitleWidth: 0.2,
          w1DescX: 0.77,
          w1DescY: -0.53,
          w1DescWidth: 1.5,
        },
        tablet: {
          w1X: -0.13,
          w1Y: -1.19,
          w1TitleX: 1.55,
          w1TitleY: -0.9,
          w1TitleWidth: 0.2,
          w1DescX: 0.77,
          w1DescY: -0.53,
          w1DescWidth: 1.3,
        },
        mobile: {
          w1X: -0.13,
          w1Y: -1.02,
          w1TitleX: -0.63,
          w1TitleY: -1.7,
          w1TitleWidth: 0.24,
          w1DescX: 1.0,
          w1DescY: -0.81,
          w1DescWidth: 1.0,
        },
      },
      ranges: {
        w1X: { min: -3, max: 3, step: 0.01 },
        w1Y: { min: -3, max: 0, step: 0.01 },
        w1TitleX: { min: -3, max: 3, step: 0.01 },
        w1TitleY: { min: -4, max: -1, step: 0.01 },
        w1TitleWidth: { min: 0.1, max: 2, step: 0.01 },
        w1DescX: { min: -3, max: 3, step: 0.01 },
        w1DescY: { min: -3, max: 0, step: 0.01 },
        w1DescWidth: { min: 0.5, max: 3.0, step: 0.1 },
      },
    },

    work2: {
      section: "Work 2",
      properties: [
        "w2X",
        "w2Y",
        "w2TitleX",
        "w2TitleY",
        "w2TitleWidth",
        "w2DescX",
        "w2DescY",
        "w2DescWidth",
      ],
      defaults: {
        desktop: {
          w2X: 1,
          w2Y: -1.45,
          w2TitleX: -2.2,
          w2TitleY: -1.32,
          w2TitleWidth: 1.0,
          w2DescX: -1.2,
          w2DescY: -0.75,
          w2DescWidth: 1.5,
        },
        tablet: {
          w2X: 1,
          w2Y: -1.45,
          w2TitleX: -2.2,
          w2TitleY: -1.32,
          w2TitleWidth: 1.0,
          w2DescX: -1.2,
          w2DescY: -0.75,
          w2DescWidth: 1.3,
        },
        mobile: {
          w2X: -0.08,
          w2Y: -1.82,
          w2TitleX: -0.57,
          w2TitleY: -2.14,
          w2TitleWidth: 0.65,
          w2DescX: -0.4,
          w2DescY: -1.1,
          w2DescWidth: 0.8,
        },
      },
      ranges: {
        w2X: { min: -3, max: 3, step: 0.01 },
        w2Y: { min: -3, max: 0, step: 0.01 },
        w2TitleX: { min: -3, max: 3, step: 0.01 },
        w2TitleY: { min: -3, max: 0, step: 0.01 },
        w2TitleWidth: { min: 0.1, max: 2, step: 0.01 },
        w2DescX: { min: -3, max: 3, step: 0.01 },
        w2DescY: { min: -3, max: 0, step: 0.01 },
        w2DescWidth: { min: 0.5, max: 3.0, step: 0.1 },
      },
    },

    work3: {
      section: "Work 3",
      properties: [
        "w3X",
        "w3Y",
        "w3TitleX",
        "w3TitleY",
        "w3TitleWidth",
        "w3DescX",
        "w3DescY",
        "w3DescWidth",
      ],
      defaults: {
        desktop: {
          w3X: -1.2,
          w3Y: -1.85,
          w3TitleX: 0.2,
          w3TitleY: -1.75,
          w3TitleWidth: 1.0,
          w3DescX: 0.1,
          w3DescY: -0.97,
          w3DescWidth: 1.5,
        },
        tablet: {
          w3X: -1.2,
          w3Y: -1.85,
          w3TitleX: 0.2,
          w3TitleY: -1.75,
          w3TitleWidth: 1.0,
          w3DescX: 0.1,
          w3DescY: -0.97,
          w3DescWidth: 1.3,
        },
        mobile: {
          w3X: -0.18,
          w3Y: -2.67,
          w3TitleX: -0.78,
          w3TitleY: -2.95,
          w3TitleWidth: 1.0,
          w3DescX: -0.44,
          w3DescY: -1.56,
          w3DescWidth: 1.0,
        },
      },
      ranges: {
        w3X: { min: -3, max: 3, step: 0.01 },
        w3Y: { min: -3, max: 0, step: 0.01 },
        w3TitleX: { min: -3, max: 3, step: 0.01 },
        w3TitleY: { min: -3, max: 0, step: 0.01 },
        w3TitleWidth: { min: 0.1, max: 2, step: 0.01 },
        w3DescX: { min: -3, max: 3, step: 0.01 },
        w3DescY: { min: -3, max: 0, step: 0.01 },
        w3DescWidth: { min: 0.5, max: 3.0, step: 0.1 },
      },
    },

    playground: {
      section: "Playground",
      properties: ["playX", "playY"],
      defaults: {
        desktop: { playX: 0.1, playY: -3.5 },
        tablet: { playX: 0.1, playY: -2.5 },
        mobile: { playX: 0.1, playY: -2.5 },
      },
      ranges: {
        playX: { min: -3, max: 3, step: 0.01 },
        playY: { min: -5, max: 0, step: 0.01 },
      },
      styling: {
        panelWidth: { value: 1.2, min: 0.6, max: 5.4, step: 0.1 },
        panelHeight: { value: 0.8, min: 0.4, max: 4.0, step: 0.1 },
        roundness: { value: 0.12, min: 0.0, max: 0.5, step: 0.005 },
        borderColor: { value: "#38358f" },
        paddingX: { value: 0.2, min: 0.0, max: 0.5, step: 0.005 },
        paddingY: { value: 0.2, min: 0.0, max: 0.5, step: 0.005 },
        mbRoundness: { value: 0.1, min: 0.0, max: 0.5, step: 0.005 },
        mbBorderColor: { value: "#38358f" },
        mbPadding: { value: 0.2, min: 0.0, max: 1.0, step: 0.005 },
        mbPaddingXMult: { value: 1.0, min: 0.0, max: 2.0, step: 0.025 },
        mbPaddingYMult: { value: 1.0, min: 0.0, max: 2.0, step: 0.025 },
      },
    },

    contact: {
      section: "Get in Contact",
      properties: [
        "conX",
        "conY",
        "conButtonX",
        "conButtonY",
        "conDescX",
        "conDescY",
        "conWidth",
      ],
      defaults: {
        desktop: {
          conX: 0,
          conY: -3.2,
          conButtonX: 0,
          conButtonY: 0.2,
          conDescX: 0,
          conDescY: -0.3,
          conWidth: 2.5,
        },
        tablet: {
          conX: 0,
          conY: -3.2,
          conButtonX: 0,
          conButtonY: 0.2,
          conDescX: 0,
          conDescY: -0.3,
          conWidth: 2.5,
        },
        mobile: {
          conX: 0,
          conY: -3.2,
          conButtonX: 0,
          conButtonY: 0.2,
          conDescX: 0,
          conDescY: -0.3,
          conWidth: 2.5,
        },
      },
      ranges: {
        conX: { min: -3, max: 3, step: 0.01 },
        conY: { min: -5, max: 0, step: 0.01 },
        conButtonX: { min: -3, max: 3, step: 0.01 },
        conButtonY: { min: -1, max: 1, step: 0.01 },
        conDescX: { min: -3, max: 3, step: 0.01 },
        conDescY: { min: -1, max: 1, step: 0.01 },
        conWidth: { min: 1, max: 5, step: 0.1 },
      },
    },
  },

  // Footer controls
  footer: {
    properties: [
      "footerY",
      "footerNavY",
      "footerLogoX",
      "footerLogoY",
      "footerContactY",
      "footerContactEmailX",
      "footerSocialX",
      "footerLegalX",
    ],
    defaults: {
      desktop: {
        footerY: -4.2,
        footerNavY: 0.4,
        footerLogoX: -0.2,
        footerLogoY: 0.95,
        footerContactY: -0.35,
        footerContactEmailX: 0.2,
        footerSocialX: 0.6,
        footerLegalX: 0.85,
      },
      tablet: {
        footerY: -4.2,
        footerNavY: 0.4,
        footerLogoX: -0.2,
        footerLogoY: 0.95,
        footerContactY: -0.35,
        footerContactEmailX: 0.2,
        footerSocialX: 0.6,
        footerLegalX: 0.85,
      },
      mobile: {
        footerY: -4.2,
        footerNavY: 0.4,
        footerLogoX: -0.2,
        footerLogoY: 0.95,
        footerContactY: -0.35,
        footerContactEmailX: 0.15,
        footerSocialX: 0.45,
        footerLegalX: 0.7,
      },
    },
    ranges: {
      footerY: { min: -6, max: 0, step: 0.1 },
      footerNavY: { min: 0.0, max: 1.0, step: 0.01 },
      footerLogoX: { min: -1.0, max: 1.0, step: 0.01 },
      footerLogoY: { min: 0.0, max: 2.0, step: 0.01 },
      footerContactY: { min: -1.0, max: 0.0, step: 0.01 },
      footerContactEmailX: { min: 0.0, max: 1.0, step: 0.01 },
      footerSocialX: { min: 0.0, max: 1.0, step: 0.01 },
      footerLegalX: { min: 0.0, max: 1.0, step: 0.01 },
    },
  },
}

// Helper functions to generate controls from config
export const generateControlsFromConfig = (config, folder) => {
  const controls = {}

  Object.entries(config).forEach(([sectionKey, sectionConfig]) => {
    if (sectionConfig.properties) {
      // Generate responsive controls
      const ranges = ["desktop", "tablet", "mobile"]
      const folders = {}

      ranges.forEach((range) => {
        const rangeControls = {}
        sectionConfig.properties.forEach((prop) => {
          const controlName = `${range.slice(0, 3)}${
            prop.charAt(0).toUpperCase() + prop.slice(1)
          }`
          const defaultValue = sectionConfig.defaults[range][prop]
          const rangeConfig = sectionConfig.ranges[prop]

          rangeControls[controlName] = {
            value: defaultValue,
            ...rangeConfig,
          }
        })

        folders[range.charAt(0).toUpperCase() + range.slice(1)] = folder(
          rangeControls,
          { collapsed: true }
        )
      })

      // Add styling if it exists
      if (sectionConfig.styling) {
        folders.Styling = folder(sectionConfig.styling, { collapsed: true })
      }

      controls[sectionConfig.section] = folder(folders, { collapsed: true })
    }
  })

  return controls
}

// Helper to generate responsive hooks from config
export const generateResponsiveHooks = (
  controls,
  config,
  useResponsiveValue
) => {
  const hooks = {}

  Object.entries(config).forEach(([sectionKey, sectionConfig]) => {
    if (sectionConfig.properties) {
      sectionConfig.properties.forEach((prop) => {
        const hookName = prop
        const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1)

        hooks[hookName] = useResponsiveValue({
          mobile: controls[`mob${capitalizedProp}`],
          tablet: controls[`tab${capitalizedProp}`],
          desktop: controls[`desk${capitalizedProp}`],
          large: controls[`desk${capitalizedProp}`],
          ultrawide: controls[`desk${capitalizedProp}`],
        })
      })
    }
  })

  return hooks
}
