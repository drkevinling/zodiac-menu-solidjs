import { onMount, onCleanup, Component } from 'solid-js';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

interface VantaCloudsProps {
  targetId: string;
}

const VantaClouds: Component<VantaCloudsProps> = (props) => {
  type VantaEffect = {
    resize?: () => void;
    destroy: () => void;
  };
  let vantaEffect: VantaEffect | undefined;
  let resizeObserver: ResizeObserver | undefined;
  let rafId: number | undefined;
  let settleTimers: number[] = [];

  const safeResize = () => {
    if (!vantaEffect?.resize) return;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      try {
        vantaEffect?.resize?.();
      } catch {
        // If effect is being destroyed, ignore.
      }
    });
  };

  onMount(() => {
    const target = document.getElementById(props.targetId);
    if (!target) return;

    if (!vantaEffect) {
      vantaEffect = CLOUDS({
        el: target,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        skyColor: 0xe2e2e3,
        cloudColor: 0xadc1de,
        cloudShadowColor: 0x183550,
        sunColor: 0xff9919,
        sunGlareColor: 0xff6633,
        sunlightColor: 0xff9933
      });
    }

    // Observe the actual Vanta host element for reliable dimensions.
    resizeObserver = new ResizeObserver(() => {
      // Debounce via rAF to avoid calling resize too frequently.
      safeResize();
    });
    resizeObserver.observe(target);

    // Handle late layout shifts (logo image decode, font swap, incognito cold-cache).
    safeResize();
    settleTimers = [0, 120, 300, 700, 1400, 2200].map((delay) => (
      window.setTimeout(safeResize, delay)
    ));

    window.addEventListener('load', safeResize);
    window.addEventListener('resize', safeResize);
    window.addEventListener('orientationchange', safeResize);
  });

  onCleanup(() => {
    if (resizeObserver) resizeObserver.disconnect();
    if (rafId) cancelAnimationFrame(rafId);
    settleTimers.forEach((id) => window.clearTimeout(id));
    settleTimers = [];
    window.removeEventListener('load', safeResize);
    window.removeEventListener('resize', safeResize);
    window.removeEventListener('orientationchange', safeResize);
    if (vantaEffect) {
      vantaEffect.destroy();
    }
  });

  return null;
};

export default VantaClouds;
