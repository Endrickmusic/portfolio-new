// Fragment shader for postprocessing plane
const postprocessFragment = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Recalculate normal from displaced position
    vec3 dx = dFdx(vPosition);
    vec3 dy = dFdy(vPosition);
    vec3 normal = normalize(cross(dx, dy));

    // Sample the FBO texture
    vec3 texColor = texture2D(uTexture, vUv).rgb;

    // Lighting
    float ambient = 0.5;
    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
    float diffuse = max(dot(normal, lightDir), 0.0);
    vec3 color = texColor * (ambient + diffuse);
    gl_FragColor = vec4(color, 1.0);
  }
`

export default postprocessFragment
