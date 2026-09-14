import * as THREE from 'three';

export function initWorld() {
  const canvas = document.getElementById('webgl');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xf4f1ea, 0.05);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.6, 9);
  const camState = { x: 0, y: 0.6, z: 9, rx: 0, ry: 0 };

  scene.add(new THREE.AmbientLight(0xfff6e0, 1.1));
  const warm = new THREE.PointLight(0xcc8800, 28, 32); warm.position.set(-4, 2.5, 4); scene.add(warm);
  const teal = new THREE.PointLight(0x008080, 22, 30); teal.position.set(4, -2, 2.5); scene.add(teal);
  const blue = new THREE.PointLight(0x3b82f6, 18, 30); blue.position.set(0, 3, -3); scene.add(blue);

  const group = new THREE.Group(); scene.add(group);

  const N = reduced ? 0 : 900;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const ink = new THREE.Color(0x1c1917), amber = new THREE.Color(0xcc8800), tealC = new THREE.Color(0x008080), blueC = new THREE.Color(0x3b82f6);
  for (let i = 0; i < N; i++) {
    const r = 4 + Math.random() * 7;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    const pick = Math.random();
    const c = pick < 0.72 ? ink : pick < 0.84 ? amber : pick < 0.93 ? tealC : blueC;
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const points = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.9 }));
  group.add(points);

  const linkGeo = new THREE.BufferGeometry();
  const linkPos = new Float32Array(220 * 6);
  for (let i = 0; i < 220; i++) {
    const a = Math.floor(Math.random() * N), b = Math.floor(Math.random() * N);
    for (let k = 0; k < 3; k++) { linkPos[i * 6 + k] = pos[a * 3 + k]; linkPos[i * 6 + 3 + k] = pos[b * 3 + k]; }
  }
  linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPos, 3));
  group.add(new THREE.LineSegments(linkGeo, new THREE.LineBasicMaterial({ color: 0xc55221, transparent: true, opacity: 0.22 })));

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.5, 1),
    new THREE.MeshStandardMaterial({ color: 0xede6d6, emissive: 0x7a2d12, wireframe: true, transparent: true, opacity: 0.95 })
  );
  group.add(core);
  const stampRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.3, 0.035, 8, 64),
    new THREE.MeshBasicMaterial({ color: 0x008080, transparent: true, opacity: 0.7 })
  );
  stampRing.rotation.x = Math.PI / 2.4; group.add(stampRing);

  const mouse = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  window.__dive = (t) => Object.assign(camState, t);

  const clock = new THREE.Clock();
  (function tick() {
    const t = clock.getElapsedTime();
    if (!reduced) {
      group.rotation.y = t * 0.05 + mouse.x * 0.25 + camState.ry;
      group.rotation.x = mouse.y * 0.14 + camState.rx;
      core.rotation.x = t * 0.18; core.rotation.y = t * 0.28;
      stampRing.rotation.z = t * 0.12;
      points.rotation.y = t * 0.02;
    }
    camera.position.set(camState.x + mouse.x * 0.4, camState.y - mouse.y * 0.3, camState.z);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  })();
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  return { camState };
}
