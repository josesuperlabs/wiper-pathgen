import { createMemo } from 'solid-js';
import type { PrinterKey } from '@/WiperTool/domain/printers';
import { createLocalStorageStore } from '@/WiperTool/lib/createLocalStorageStore';
import type { Point, Point3D } from '@/WiperTool/lib/geometry';

const CALIBRATION_VERSION = 'v2';

type CalibrationState = {
  x: number | undefined;
  y: number | undefined;
  z: number | undefined;
};

type CalibrationStateByPrinter = Partial<Record<PrinterKey, CalibrationState>>;

const createEmptyCalibrationState = (): CalibrationState => ({
  x: undefined,
  y: undefined,
  z: undefined,
});

const getCalibrationStateForPrinter = (
  stateByPrinter: CalibrationStateByPrinter,
  printerKey: PrinterKey,
): CalibrationState => stateByPrinter[printerKey] ?? createEmptyCalibrationState();

export function createCalibrationStore(getPrinterKey: () => PrinterKey) {
  const [stateByPrinter, setStateByPrinter] = createLocalStorageStore<CalibrationStateByPrinter>(
    `app-calibration-${CALIBRATION_VERSION}`,
    {},
  );

  const state: CalibrationState = {
    get x() {
      return getCalibrationStateForPrinter(stateByPrinter, getPrinterKey()).x;
    },
    get y() {
      return getCalibrationStateForPrinter(stateByPrinter, getPrinterKey()).y;
    },
    get z() {
      return getCalibrationStateForPrinter(stateByPrinter, getPrinterKey()).z;
    },
  };

  const actions = {
    setCalibration<K extends keyof CalibrationState>(key: K, value: CalibrationState[K]) {
      const printerKey = getPrinterKey();

      setStateByPrinter(printerKey, (currentCalibration) => ({
          ...createEmptyCalibrationState(),
          ...currentCalibration,
          [key]: value,
        }));
    },
  };

  const derived = {
    isComplete: createMemo(() => state.x !== undefined && state.y !== undefined && state.z !== undefined),
    calibrationPoint: createMemo((): Point | undefined =>
      state.x !== undefined && state.y !== undefined ? { x: state.x, y: state.y } : undefined,
    ),
    calibrationPoint3D: createMemo((): Point3D | undefined =>
      state.x !== undefined && state.y !== undefined && state.z !== undefined
        ? { x: state.x, y: state.y, z: state.z }
        : undefined,
    ),
  };

  return { state, actions, derived } as const;
}
