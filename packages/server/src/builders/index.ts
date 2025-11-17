/**
 * @fileoverview Build system exports
 */

export {
  BuildTarget,
  BuildMode,
  OptimizationLevel,
  DEFAULT_BUILD_CONFIG,
} from './BuildConfig';

export type {
  BuildConfig,
  BuildResult,
  BuildArtifact,
  BuildStats,
  ChunkInfo,
} from './BuildConfig';

export { WebBuilder } from './WebBuilder';

export { DesktopBuilder, DesktopPlatform } from './DesktopBuilder';

export type { DesktopBuildConfig } from './DesktopBuilder';

export { MobileBuilder, MobilePlatform } from './MobileBuilder';

export type { MobileBuildConfig } from './MobileBuilder';

export { ServerBuilder, ServerPlatform } from './ServerBuilder';

export type { ServerBuildConfig } from './ServerBuilder';

export { BuildManager, BuildStatus } from './BuildManager';

export type { BuildRequest, BuildJob } from './BuildManager';
