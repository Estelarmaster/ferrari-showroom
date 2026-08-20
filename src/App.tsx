import { Navbar } from "./components/ui/Navbar";
import { CustomCursor } from "./components/ui/CustomCursor";
import { ToastContainer } from "./components/ui/Toast";
import { Loader } from "./components/ui/Loader";
import { TestDriveModal } from "./components/ui/TestDriveModal";
import { VehicleDetailModal } from "./components/ui/VehicleDetailModal";
import { FullscreenConfigurator } from "./components/ui/FullscreenConfigurator";
import { MyConfigsModal } from "./components/ui/MyConfigsModal";
import { WebGLFallback } from "./components/ui/WebGLFallback";
import { useWebGL } from "./hooks/useWebGL";
import { Home } from "./pages/Home";

export default function App() {
  const webglSupported = useWebGL();

  if (!webglSupported) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-20">
          <WebGLFallback />
        </div>
      </div>
    );
  }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:bg-white focus:px-4 focus:py-2 focus:text-black">
        Skip to content
      </a>
      <Loader />
      <CustomCursor />
      <Navbar />
      <Home />
      <ToastContainer />
      <TestDriveModal />
      <VehicleDetailModal />
      <FullscreenConfigurator />
      <MyConfigsModal />
    </>
  );
}
