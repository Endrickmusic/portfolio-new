# Migration Guide: From Manual Controls to Config System

This guide shows you how to migrate from your current manual Leva controls to the new configuration-driven system.

## Step 1: Extract Current Values

### Add the extractor to your current ScrollContent.jsx

```javascript
// Add this import at the top
import { useLevaExtractor } from "../utils/configExtractor"

// Add this line after your controls are defined
export default function ScrollContent() {
  // ... existing code ...

  // Your existing controls
  const controls = useControls("Content", {
    /* ... */
  })
  const headerControls = useControls("Header", {
    /* ... */
  })
  const footerControls = useControls("Footer", {
    /* ... */
  })

  // Add this line to enable value extraction
  useLevaExtractor(controls) // This adds helper functions to browser console

  // ... rest of your component
}
```

### Extract Values via Browser Console

1. **Open your app** in the browser
2. **Adjust the Leva controls** to your desired values
3. **Open browser console** (F12)
4. **Run extraction commands**:

```javascript
// Log all work section values
levaExtractor.logAllWork()

// Export complete configuration
levaExtractor.exportCurrentConfig()

// Generate specific section config
levaExtractor.generateConfigJS(
  "work1",
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
    // ... other ranges
  }
)
```

## Step 2: Update Configuration File

### Copy extracted values to `src/config/controlsConfig.js`

The console commands will output JavaScript objects you can copy directly:

```javascript
// Example output from levaExtractor.exportCurrentConfig()
work1: {
  section: "Work 1",
  properties: ["w1X", "w1Y", "w1TitleX", "w1TitleY", "w1TitleWidth", "w1DescX", "w1DescY", "w1DescWidth"],
  defaults: {
    desktop: {
      w1X: -0.13,
      w1Y: -1.19,
      w1TitleX: 1.55,
      w1TitleY: -0.9,
      w1TitleWidth: 0.2,
      w1DescX: 0.77,
      w1DescY: -0.53,
      w1DescWidth: 1.5
    },
    tablet: {
      // ... tablet values
    },
    mobile: {
      // ... mobile values
    }
  },
  ranges: {
    w1X: { min: -3, max: 3, step: 0.01 },
    // ... other ranges
  }
}
```

## Step 3: Create New Component with Config System

### Option A: Replace Existing Component

1. **Backup your current** `ScrollContent.jsx`
2. **Replace with config-driven version**:

```javascript
import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import { useControls, folder } from "leva"
import { useBreakpoint, useResponsiveValue } from "../hooks/useBreakpoint"

// Import config system
import { controlsConfig } from "../config/controlsConfig"
import {
  generateControlsFromConfig,
  generateResponsiveHooks,
} from "../utils/controlsUtils"

export default function ScrollContent() {
  const scroll = useScroll()
  const group = useRef()
  const { viewport } = useThree()

  // Generate controls from config
  const headerControls = useControls(
    "Header",
    generateControlsFromConfig(controlsConfig.header, folder),
    { collapsed: true }
  )

  const controls = useControls(
    "Content",
    generateControlsFromConfig(controlsConfig.content, folder),
    { collapsed: true }
  )

  const footerControls = useControls(
    "Footer",
    generateControlsFromConfig({ footer: controlsConfig.footer }, folder),
    { collapsed: true }
  )

  // Generate responsive hooks
  const headerHooks = generateResponsiveHooks(
    headerControls,
    controlsConfig.header,
    useResponsiveValue
  )
  const contentHooks = generateResponsiveHooks(
    controls,
    controlsConfig.content,
    useResponsiveValue
  )
  const footerHooks = generateResponsiveHooks(
    footerControls,
    { footer: controlsConfig.footer },
    useResponsiveValue
  )

  // Use clean property names
  return (
    <group ref={group}>
      {/* Introduction */}
      <Headline
        position={[
          contentHooks.introX,
          viewport.height * contentHooks.introY,
          0,
        ]}
        maxWidth={viewport.width * contentHooks.introWidth}
      />

      {/* Work 1 */}
      <Image
        position={[contentHooks.w1X, viewport.height * contentHooks.w1Y, 0]}
      />
      <Headline
        position={[
          contentHooks.w1TitleX,
          viewport.height * contentHooks.w1TitleY,
          0,
        ]}
        maxWidth={viewport.width * contentHooks.w1TitleWidth}
      />
      <Description
        position={[
          contentHooks.w1DescX,
          viewport.height * contentHooks.w1DescY,
          0,
        ]}
        maxWidth={viewport.width * contentHooks.w1DescWidth}
      />

      {/* ... rest of your components */}
    </group>
  )
}
```

### Option B: Gradual Migration

1. **Keep existing component**
2. **Create new component** alongside (e.g., `ScrollContentV2.jsx`)
3. **Test new component** thoroughly
4. **Switch when ready**

## Step 4: Benefits You'll Get

### Before (Manual):

```javascript
// 800+ lines of manual control definitions
const controls = useControls("Content", {
  "Work 1": folder({
    Desktop: folder({
      deskW1X: { value: -0.13, min: -3, max: 3, step: 0.01 },
      deskW1Y: { value: -1.19, min: -3, max: 0, step: 0.01 },
      // ... 50+ more lines per section
    }),
    // ... tablet and mobile folders
  }),
  // ... work2, work3, etc.
})

// 50+ manual useResponsiveValue hooks
const w1X = useResponsiveValue({
  mobile: controls.mobW1X,
  tablet: controls.tabW1X,
  desktop: controls.deskW1X,
  // ...
})
// ... 49+ more hooks
```

### After (Config-driven):

```javascript
// 10 lines to generate all controls
const controls = useControls(
  "Content",
  generateControlsFromConfig(controlsConfig.content, folder),
  { collapsed: true }
)

// 3 lines to generate all hooks
const contentHooks = generateResponsiveHooks(controls, controlsConfig.content, useResponsiveValue)

// Clean property access
position={[contentHooks.w1X, viewport.height * contentHooks.w1Y, 0]}
```

## Step 5: Advanced Usage

### Override Specific Values

```javascript
import { mergeConfig } from "../utils/controlsUtils"

const customConfig = mergeConfig(controlsConfig.content, {
  work1: {
    defaults: {
      mobile: { w1X: -0.5 }, // Override just this value
    },
  },
})
```

### Add New Sections

```javascript
// Just add to controlsConfig.js
work4: {
  section: "Work 4",
  properties: ["w4X", "w4Y"],
  defaults: {
    desktop: { w4X: 0, w4Y: -2 },
    tablet: { w4X: 0, w4Y: -2 },
    mobile: { w4X: 0, w4Y: -2 }
  },
  ranges: {
    w4X: { min: -3, max: 3, step: 0.01 },
    w4Y: { min: -3, max: 0, step: 0.01 }
  }
}
```

## Troubleshooting

### Common Issues:

1. **Missing control values**: Check that property names match between config and extraction
2. **Hooks not working**: Ensure control names follow the `desk/tab/mob + CapitalizedProp` pattern
3. **Controls not appearing**: Verify the config structure matches the expected format

### Debug Commands:

```javascript
// Validate config structure
import { validateConfig } from "../utils/controlsUtils"
console.log(validateConfig(controlsConfig.content))

// Check generated controls
console.log(generateControlsFromConfig(controlsConfig.content, folder))
```

## Summary

1. **Add extractor** to current component
2. **Adjust Leva values** to desired settings
3. **Extract via console** commands
4. **Update config file** with extracted values
5. **Migrate to new system** (gradually or all at once)
6. **Enjoy cleaner code** and easier maintenance!

The new system reduces your code by ~90% and makes adding new sections or adjusting values much easier.
