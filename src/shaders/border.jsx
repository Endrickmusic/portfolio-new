const borderVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const borderFragment = `
precision highp float;
uniform float width;    // world width of the plane
uniform float height;   // world height of the plane
uniform float border;   // border thickness in world units
uniform float roundness;// corner radius in world units
uniform vec3 borderColor;
uniform vec3 fillColor;
uniform float fillOpacity;
varying vec2 vUv;

float sdRoundedBox(vec2 p, vec2 b, float r) {
  vec2 d = abs(p) - b + vec2(r);
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
}

void main() {
  vec2 uv = (vUv - 0.5) * 2.0;
  float maxR = max(0.0, min(width, height) * 0.5 - 1e-5);
  float r = min(roundness, maxR);

  float d = sdRoundedBox(uv, vec2(width * 0.5, height * 0.5), r);

  // Anti-aliased border ring and filled background
  float aa = 0.005;
  float edge = abs(d);
  float ringMask = 1.0 - smoothstep(border, border + aa, edge);
  float fillMask = 1.0 - smoothstep(0.0, aa, d);

  // Compose fill first, then overlay border ring
  vec4 outColor = vec4(0.0);
  outColor = mix(outColor, vec4(fillColor, fillOpacity), fillMask);
  outColor = mix(outColor, vec4(borderColor, 1.0), ringMask);
  outColor.a = max(outColor.a, ringMask);

  gl_FragColor = outColor;
}
`

export { borderVertex, borderFragment }
export default { borderVertex, borderFragment }
