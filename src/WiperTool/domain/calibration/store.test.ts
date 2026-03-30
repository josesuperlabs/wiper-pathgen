import { createRoot, createSignal } from 'solid-js';
import { describe, expect, it } from 'vitest';
import type { PrinterKey } from '@/WiperTool/domain/printers';
import { PrinterKeys } from '@/WiperTool/domain/printers';
import { createCalibrationStore } from './store';

describe('createCalibrationStore', () => {
  it('keeps separate calibration values for each printer', () => {
    createRoot((dispose) => {
      const [printer, setPrinter] = createSignal<PrinterKey>(PrinterKeys.PrusaCoreOne);
      const calibration = createCalibrationStore(printer);

      calibration.actions.setCalibration('x', 111000);
      calibration.actions.setCalibration('y', 222000);
      calibration.actions.setCalibration('z', 333000);

      expect(calibration.state.x).toBe(111000);
      expect(calibration.state.y).toBe(222000);
      expect(calibration.state.z).toBe(333000);

      setPrinter(PrinterKeys.PrusaXl);

      expect(calibration.state.x).toBeUndefined();
      expect(calibration.state.y).toBeUndefined();
      expect(calibration.state.z).toBeUndefined();

      calibration.actions.setCalibration('x', 444000);
      calibration.actions.setCalibration('y', 555000);

      setPrinter(PrinterKeys.PrusaCoreOne);

      expect(calibration.state.x).toBe(111000);
      expect(calibration.state.y).toBe(222000);
      expect(calibration.state.z).toBe(333000);

      dispose();
    });
  });
});
