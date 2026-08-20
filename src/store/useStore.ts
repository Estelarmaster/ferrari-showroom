import { create } from "zustand";
import type { LightingMode } from "../data/configOptions";

export type CameraView = "front" | "side" | "rear" | "top" | "interior";

export interface CarConfig {
  color: string;
  wheel: string;
  caliper: string;
  interior: string;
}

export interface SavedConfig extends CarConfig {
  id: string;
  savedAt: string;
  total: number;
}

export interface ToastItem {
  id: string;
  message: string;
}

interface AppState {
  loaded: boolean;
  loadProgress: number;
  setLoaded: (v: boolean) => void;
  setLoadProgress: (v: number) => void;

  config: CarConfig;
  setColor: (id: string) => void;
  setWheel: (id: string) => void;
  setCaliper: (id: string) => void;
  setInterior: (id: string) => void;

  cameraView: CameraView;
  setCameraView: (v: CameraView) => void;
  autoRotate: boolean;
  toggleAutoRotate: () => void;
  cameraResetToken: number;
  resetCamera: () => void;

  lightingMode: LightingMode;
  setLightingMode: (m: LightingMode) => void;

  cursorLabel: string | null;
  setCursorLabel: (label: string | null) => void;
  isTouchDevice: boolean;
  setIsTouchDevice: (v: boolean) => void;

  isConfiguratorOpen: boolean;
  openConfigurator: () => void;
  closeConfigurator: () => void;

  isTestDriveOpen: boolean;
  openTestDrive: () => void;
  closeTestDrive: () => void;

  activeVehicleId: string | null;
  openVehicleDetail: (id: string) => void;
  closeVehicleDetail: () => void;

  activeHotspot: string | null;
  setActiveHotspot: (id: string | null) => void;

  toasts: ToastItem[];
  addToast: (message: string) => void;
  removeToast: (id: string) => void;

  savedConfigs: SavedConfig[];
  saveConfiguration: (total: number) => void;
  isMyConfigsOpen: boolean;
  openMyConfigs: () => void;
  closeMyConfigs: () => void;

  engineState: "idle" | "running" | "revving";
  setEngineState: (s: "idle" | "running" | "revving") => void;
}

export const useStore = create<AppState>((set, get) => ({
  loaded: false,
  loadProgress: 0,
  setLoaded: (v) => set({ loaded: v }),
  setLoadProgress: (v) => set({ loadProgress: v }),

  config: { color: "rosso", wheel: "sport", caliper: "red", interior: "black" },
  setColor: (id) => set((s) => ({ config: { ...s.config, color: id } })),
  setWheel: (id) => set((s) => ({ config: { ...s.config, wheel: id } })),
  setCaliper: (id) => set((s) => ({ config: { ...s.config, caliper: id } })),
  setInterior: (id) => set((s) => ({ config: { ...s.config, interior: id } })),

  cameraView: "front",
  setCameraView: (v) => set({ cameraView: v }),
  autoRotate: false,
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
  cameraResetToken: 0,
  resetCamera: () => set((s) => ({ cameraView: "front", autoRotate: false, cameraResetToken: s.cameraResetToken + 1 })),

  lightingMode: "showroom",
  setLightingMode: (m) => set({ lightingMode: m }),

  cursorLabel: null,
  setCursorLabel: (label) => set({ cursorLabel: label }),
  isTouchDevice: false,
  setIsTouchDevice: (v) => set({ isTouchDevice: v }),

  isConfiguratorOpen: false,
  openConfigurator: () => set({ isConfiguratorOpen: true }),
  closeConfigurator: () => set({ isConfiguratorOpen: false }),

  isTestDriveOpen: false,
  openTestDrive: () => set({ isTestDriveOpen: true }),
  closeTestDrive: () => set({ isTestDriveOpen: false }),

  activeVehicleId: null,
  openVehicleDetail: (id) => set({ activeVehicleId: id }),
  closeVehicleDetail: () => set({ activeVehicleId: null }),

  activeHotspot: null,
  setActiveHotspot: (id) => set({ activeHotspot: id }),

  toasts: [],
  addToast: (message) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message }] }));
    setTimeout(() => get().removeToast(id), 3200);
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  savedConfigs: [],
  saveConfiguration: (total) => {
    const { config } = get();
    const entry: SavedConfig = {
      ...config,
      id: Math.random().toString(36).slice(2),
      savedAt: new Date().toISOString(),
      total,
    };
    set((s) => ({ savedConfigs: [entry, ...s.savedConfigs] }));
    get().addToast("Configuration saved.");
  },
  isMyConfigsOpen: false,
  openMyConfigs: () => set({ isMyConfigsOpen: true }),
  closeMyConfigs: () => set({ isMyConfigsOpen: false }),

  engineState: "idle",
  setEngineState: (s) => set({ engineState: s }),
}));
