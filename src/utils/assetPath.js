// Utility function to get correct asset paths for both development and production
export function getAssetPath(path) {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path

  // In production (GitHub Pages), prepend the repository name
  if (import.meta.env.PROD) {
    return `/portfolio-new/${cleanPath}`
  }

  // In development, use the path as-is
  return `/${cleanPath}`
}

// Convenience functions for different asset types
export const getImagePath = (path) => getAssetPath(`images/${path}`)
export const getFontPath = (path) => getAssetPath(`fonts/${path}`)
export const getSvgPath = (path) => getAssetPath(`svgs/${path}`)
export const getTexturePath = (path) => getAssetPath(`textures/${path}`)
