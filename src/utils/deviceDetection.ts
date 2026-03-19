export type PerformanceTier = 'low' | 'medium' | 'high';

export interface DeviceCapabilities {
  tier: PerformanceTier;
  enablePostProcessing: boolean;
  particleCountMultiplier: number;
  geometryQuality: number;
  animationFrequency: number;
}

interface GPUCapabilities {
  renderer: string;
  vendor: string;
  maxTextureSize: number;
  maxRenderbufferSize: number;
  maxTextureImageUnits: number;
  maxVertexTextureImageUnits: number;
  maxVertexAttributes: number;
  maxFragmentUniformVectors: number;
  maxVertexUniformVectors: number;
}

function detectGPUCapabilities(): GPUCapabilities | null {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

    if (!gl) {
      return null;
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);
    const vendor = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      : gl.getParameter(gl.VENDOR);

    return {
      renderer,
      vendor,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxRenderbufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
      maxTextureImageUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
      maxVertexTextureImageUnits: gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      maxVertexAttributes: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
      maxFragmentUniformVectors: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
      maxVertexUniformVectors: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
    };
  } catch {
    return null;
  }
}

function scoreGPUCapabilities(gpu: GPUCapabilities): number {
  let gpuScore = 100;

  const lowEndGPUs = [
    'intel hd graphics',
    'intel uhd graphics',
    'intel iris xe',
    'intel iris plus graphics',
    'intel iris graphics',
    'mali',
    'adreno',
    'powervr',
    'qualcomm',
    'arm mali',
    'videostrong',
    'vivante',
    'imgtec',
    'lima',
    'panfrost',
  ];

  const midEndGPUs = [
    'intel iris xe graphics',
    'intel iris xe graphics',
    'intel arc',
    'nvidia geforce gtx',
    'radeon rx',
    'radeon pro',
    'radeon rx vega',
    'apple m1',
    'apple m2',
  ];

  const highEndGPUs = [
    'nvidia rtx',
    'nvidia geforce rtx',
    'radeon rx 6000',
    'radeon rx 7000',
    'apple m3',
    'apple m4',
  ];

  const rendererLower = gpu.renderer.toLowerCase();

  const isLowEnd = lowEndGPUs.some((gpuName) => rendererLower.includes(gpuName));
  const isMidEnd = midEndGPUs.some((gpuName) => rendererLower.includes(gpuName));
  const isHighEnd = highEndGPUs.some((gpuName) => rendererLower.includes(gpuName));

  if (isLowEnd) {
    gpuScore -= 50;
  } else if (isMidEnd) {
    gpuScore += 10;
  } else if (isHighEnd) {
    gpuScore += 20;
  }

  if (gpu.maxTextureSize < 4096) {
    gpuScore -= 30;
  } else if (gpu.maxTextureSize >= 16384) {
    gpuScore += 10;
  }

  if (gpu.maxTextureImageUnits < 16) {
    gpuScore -= 20;
  } else if (gpu.maxTextureImageUnits >= 32) {
    gpuScore += 10;
  }

  if (gpu.maxVertexTextureImageUnits === 0) {
    gpuScore -= 15;
  }

  if (gpu.maxVertexAttributes < 16) {
    gpuScore -= 20;
  }

  return gpuScore;
}

/**
 * Detect device performance capabilities based on hardware and screen metrics.
 * Returns a performance tier: 'low', 'medium', or 'high'.
 */
export function detectDevicePerformance(): DeviceCapabilities {
  let score = 100;

  const gpuCapabilities = detectGPUCapabilities();
  if (gpuCapabilities) {
    console.log('GPU detected:', gpuCapabilities.renderer);
    const gpuScore = scoreGPUCapabilities(gpuCapabilities);
    score = (score + gpuScore) / 2;
  } else {
    console.warn('Could not detect GPU capabilities');
    score -= 20;
  }

  const cpuCores = navigator.hardwareConcurrency || 2;
  if (cpuCores <= 2) {
    score -= 20;
  } else if (cpuCores <= 4) {
    score -= 10;
  } else if (cpuCores >= 8) {
    score += 5;
  }

  if ('deviceMemory' in navigator) {
    const memory = (navigator as any).deviceMemory as number;
    if (memory <= 4) {
      score -= 15;
    } else if (memory <= 8) {
      score -= 5;
    } else if (memory >= 16) {
      score += 5;
    }
  }

  const pixelCount = window.screen.width * window.screen.height;
  if (pixelCount <= 1920 * 1080) {
    score += 5;
  } else if (pixelCount >= 2560 * 1440) {
    score -= 10;
  } else if (pixelCount >= 3840 * 2160) {
    score -= 20;
  }

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    score -= 15;
  }

  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection) {
      if (connection.saveData) {
        score -= 20;
      } else if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        score -= 30;
      } else if (connection.effectiveType === '3g') {
        score -= 15;
      }
    }
  }

  let tier: PerformanceTier;
  if (score >= 60) {
    tier = 'high';
    console.log('Device detected as HIGH performance');
  } else if (score >= 30) {
    tier = 'medium';
    console.log('Device detected as MEDIUM performance');
  } else {
    tier = 'low';
    console.log('Device detected as LOW performance');
  }

  const capabilities: DeviceCapabilities = {
    tier,
    enablePostProcessing: tier !== 'low',
    particleCountMultiplier: tier === 'low' ? 0.4 : tier === 'medium' ? 0.7 : 1.0,
    geometryQuality: tier === 'low' ? 0.5 : tier === 'medium' ? 0.75 : 1.0,
    animationFrequency: tier === 'low' ? 0.5 : tier === 'medium' ? 0.75 : 1.0,
  };

  return capabilities;
}
