import * as THREE from 'three';

/**
 * Creates a singleton 4x1 DataTexture for 4-band hard-edged Moebius Cel-Shading.
 * Values:
 *  - Step 1 (0-25% light): deep ink shadow (40)
 *  - Step 2 (25-50% light): mid core shadow (105)
 *  - Step 3 (50-75% light): illuminated surface (185)
 *  - Step 4 (75-100% light): peak specular highlight (255)
 */
let cachedGradientMap: THREE.DataTexture | null = null;

export function getFourStepGradientMap(): THREE.DataTexture {
  if (cachedGradientMap) return cachedGradientMap;

  // 4 discrete luminance steps
  const steps = new Uint8Array([40, 105, 185, 255]);

  // THREE.RedFormat is the modern standard for 1-channel textures in WebGL2
  const texture = new THREE.DataTexture(steps, 4, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  cachedGradientMap = texture;
  return texture;
}
