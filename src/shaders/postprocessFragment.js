// Fragment shader for postprocessing plane
const postprocessFragment = `
  uniform sampler2D uTexture;
  uniform float uRoughness;
  uniform float uMetallic;
  uniform float uBrightness;
  uniform vec3 uCameraPosition;
  uniform samplerCube uEnvMap;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Schlick Fresnel approximation
  vec3 fresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
  }

  // GGX Normal Distribution Function
  float DistributionGGX(vec3 N, vec3 H, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    return a2 / (3.14159265 * denom * denom);
  }

  // Smith's Schlick-GGX Geometry Function
  float GeometrySchlickGGX(float NdotV, float roughness) {
    float r = (roughness + 1.0);
    float k = (r * r) / 8.0;
    return NdotV / (NdotV * (1.0 - k) + k);
  }
  float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness) {
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx2 = GeometrySchlickGGX(NdotV, roughness);
    float ggx1 = GeometrySchlickGGX(NdotL, roughness);
    return ggx1 * ggx2;
  }

  void main() {
    // Recalculate normal from displaced position
    vec3 dx = dFdx(vPosition);
    vec3 dy = dFdy(vPosition);
    vec3 N = normalize(cross(dx, dy));

    // Sample the FBO texture as base color
    vec3 albedo = texture2D(uTexture, vUv).rgb;

    // Lighting
    vec3 V = normalize(uCameraPosition - vPosition);
    vec3 L = normalize(vec3(0.5, 1.0, 0.8));
    vec3 H = normalize(V + L);
    float NdotL = max(dot(N, L), 0.0);
    float NdotV = max(dot(N, V), 0.0);
    float NdotH = max(dot(N, H), 0.0);
    float VdotH = max(dot(V, H), 0.0);

    // Fresnel
    vec3 F0 = mix(vec3(0.04), albedo, uMetallic);
    vec3 F = fresnelSchlick(VdotH, F0);

    // Distribution and Geometry
    float D = DistributionGGX(N, H, uRoughness);
    float G = GeometrySmith(N, V, L, uRoughness);

    // Cook-Torrance BRDF
    float denom = 4.0 * NdotV * NdotL + 0.001;
    vec3 specular = (D * G * F) / denom;

    // Diffuse (Lambertian, energy conserving)
    vec3 kD = (1.0 - F) * (1.0 - uMetallic);
    vec3 diffuse = kD * albedo / 3.14159265;

    // Environment reflection (if available)
    vec3 R = reflect(-V, N);
    vec3 envColor = textureCube(uEnvMap, R).rgb;
    // Mix env reflection based on Fresnel and metallic
    vec3 reflection = envColor * F * uMetallic;

    // IBL diffuse (sample env in normal direction)
    vec3 iblDiffuse = textureCube(uEnvMap, N).rgb;
    // Blend IBL diffuse with albedo
    vec3 ibl = iblDiffuse * albedo * 0.7; // 0.7 is a strength factor

    // Final color
    vec3 color = (diffuse + specular) * NdotL + reflection + ibl;
    // Increase ambient for visibility
    color += 0.15 * albedo;

    // Apply brightness
    color *= uBrightness;

    // Gamma correction
    color = pow(color, vec3(1.0/2.2));
    gl_FragColor = vec4(color, 1.0);
  }
`

export default postprocessFragment
