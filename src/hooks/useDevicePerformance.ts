import { useMemo } from 'react';
import { detectDevicePerformance, type DeviceCapabilities } from '../utils/deviceDetection';

export function useDevicePerformance(): DeviceCapabilities {
  return useMemo(() => detectDevicePerformance(), []);
}
