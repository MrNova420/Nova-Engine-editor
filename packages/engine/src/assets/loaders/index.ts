/**
 * Asset Loaders
 *
 * Collection of specialized loaders for different asset types.
 */

export { TextureAssetLoader } from './TextureAssetLoader';
export { AudioLoader, type AudioData } from './AudioLoader';
export { OBJLoader, type OBJData } from './OBJLoader';
export {
  GLTFLoader,
  type GLTFData,
  type GLTFScene,
  type GLTFNode,
} from './GLTFLoader';
