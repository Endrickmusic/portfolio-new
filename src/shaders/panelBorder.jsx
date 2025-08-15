const panelBorderVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const panelBorderFragment = `
precision highp float;

uniform vec2 uPanelSize;   // world size (width, height)
uniform float uBorder;     // border thickness in world units
uniform float uRadius;     // corner radius in world units
uniform vec3 uColor;       // border color
uniform vec2 uPad;         // inset padding (x,y) in world units

varying vec2 vUv;

float sdRoundedBox(vec2 p, vec2 b, float r) {
  vec2 d = abs(p) - b + vec2(r);
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
}

void main() {
  // plane-local world coords centered at 0
  vec2 pos = (vUv - 0.5) * uPanelSize;

  vec2 halfSize = 0.5 * uPanelSize;
  // apply padding inset
  vec2 halfOuter = max(vec2(0.0), halfSize - uPad);

  // clamp radius to fit panel, accounting for border
  float maxR = max(0.0, min(halfOuter.x, halfOuter.y));
  float radius = min(uRadius, maxR);

  // SDFs for outer and inner rounded boxes
  float dOuter = sdRoundedBox(pos, halfOuter, radius * 1.2);
  float dInner = sdRoundedBox(pos, max(vec2(0.0), halfOuter - vec2(uBorder)), max(0.0, radius * 1.2 - uBorder));

  // anti-aliased ring mask: inside outer minus inside inner
  float aaO = fwidth(dOuter);
  float aaI = fwidth(dInner);
  float outerMask = 1.0 - smoothstep(0.0, aaO, dOuter);
  float innerMask = 1.0 - smoothstep(0.0, aaI, dInner);
  float alpha = clamp(outerMask - innerMask, 0.0, 1.0);

  gl_FragColor = vec4(uColor, alpha);
}
`

export { panelBorderVertex, panelBorderFragment }
export default { panelBorderVertex, panelBorderFragment }
