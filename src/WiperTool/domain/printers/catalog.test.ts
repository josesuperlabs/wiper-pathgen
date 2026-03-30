import { describe, expect, it } from 'vitest';
import { printerProperties } from './catalog';
import { PrinterKeys } from './model';

describe('printer catalog', () => {
  it('keeps the Prusa XL bed area aligned with its 360x360 build volume', () => {
    const printer = printerProperties[PrinterKeys.PrusaXl];

    expect(printer.status).toBe('supported');
    expect(printer.buildVolume).toEqual({
      x: 360000,
      y: 360000,
      z: 360000,
    });
    expect(printer.bounds.left).toBe(-8000);
    expect(printer.bounds.bottom).toBe(-9000);
    expect(printer.bounds.right).toBe(361000);
    expect(printer.bounds.top).toBe(361000);
  });
});
