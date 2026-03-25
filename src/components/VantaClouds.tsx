import { onMount, onCleanup, Component } from 'solid-js';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

const VantaClouds: Component = () => {
  let vantaRef: HTMLDivElement | undefined;
  let vantaEffect: any;

  onMount(() => {
    if (!vantaEffect && vantaRef) {
      vantaEffect = CLOUDS({
        el: vantaRef,
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
  });

  onCleanup(() => {
    if (vantaEffect) {
      vantaEffect.destroy();
    }
  });

  return (
    <div
      ref={vantaRef}
      class="absolute inset-0 -z-10 w-full h-full"
      style={{ "pointer-events": "none" }}
    />
  );
};

export default VantaClouds;
