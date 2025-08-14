const borderVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const borderFragment = `
precision highp float;
uniform float width;
uniform float height;
uniform float border;
uniform float roundness;
uniform vec3 borderColor;
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

  // Anti-aliased border ring
  float edge = abs(d);
  float alpha = 1.0 - smoothstep(border, border + 0.005, edge);

  gl_FragColor = vec4(borderColor, alpha);
}
`

export { borderVertex, borderFragment }
export default { borderVertex, borderFragment }
