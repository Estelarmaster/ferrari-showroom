import { useEffect, useState } from "react";
import { isWebGLAvailable } from "../utils/webgl";

export function useWebGL() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  return supported;
}
