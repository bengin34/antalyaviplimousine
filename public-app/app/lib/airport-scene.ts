import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { airportMap, arrivalRoutes, type Level, type MapObject, type Point, type TerminalId, type ViewId } from "./airport-map";

/**
 * The three.js side of the airport map. Imported dynamically by
 * AirportMapPage so three.js is only downloaded on that page.
 *
 * Every mesh is built from airport-map-data.json. Shapes are stylised (a
 * baggage belt is a rounded slab, a shop is a box) but each one stands where
 * the official plan puts it.
 */
export type SceneLabels = Record<string, string>;
export type AirportScene = {
  show(view: ViewId, level?: string): void;
  /** Moves the walker to `progress` (0–1) of route step `stepIndex` and follows it; `snap` jumps the camera there. */
  walkTo(terminal: TerminalId, stepIndex: number, progress: number, snap?: boolean): void;
  hideWalker(): void;
  dispose(): void;
};

const INK = 0x14120e;
const FLOOR = 0xf1ebdd;
const LANDSIDE = 0xe4cf9c;
const GOLD = 0xc8a96a;
// Muted, one hue per kind of place; the gold is kept for the route and the meeting point.
const KIND_COLORS: Record<string, number> = {
  wc: 0x8fb3cf, exchange: 0x5f93a0, atm: 0x5f93a0, customs: 0x6f7fb5, security: 0x6f7fb5, dutyFree: 0xd98a8a,
  lostBaggage: 0xd9b84f, carRental: 0xc98c52, prayer: 0x6fa58a, info: 0x7d86c9, lounge: 0x7a5aa6, ftaExclusive: 0xb9ab9a,
  fastTrack: 0xd9c56a, food: 0xe0a45c, ticket: 0x8a86b8, elevator: 0x77787c, police: 0x2f4a7a,
};
/** Kinds whose label is always visible; the rest appear once the visitor zooms in. */
const MAJOR = new Set(["belt", "gate", "passport", "security", "customs", "shelter", "police", "checkpoint", "sign"]);

const flat = (points: number[][]) => new THREE.Shape(points.map(([x, z]) => new THREE.Vector2(x, -z)));

function slab(shape: THREE.Shape, height: number, color: number, y = 0) {
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false });
  geometry.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: 0.85 }));
  mesh.position.y = y;
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

function box(w: number, h: number, d: number, color: number, x: number, z: number, y = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: 0.7 }));
  mesh.position.set(x, y + h / 2, z);
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

function label(text: string, className: string, x: number, y: number, z: number) {
  const element = document.createElement("span");
  element.className = `airport-label ${className}`;
  element.textContent = text;
  const object = new CSS2DObject(element);
  object.position.set(x, y, z);
  return object;
}

function stadium(w: number, d: number) {
  const r = w / 2;
  const shape = new THREE.Shape();
  shape.absarc(0, d / 2 - r, r, 0, Math.PI);
  shape.absarc(0, -d / 2 + r, r, Math.PI, Math.PI * 2);
  return shape;
}

function objectMesh(o: MapObject, labels: SceneLabels): THREE.Object3D {
  const group = new THREE.Group();
  const name = o.kind === "sign" ? labels[o.key!] : labels[o.kind];
  const tag = (text: string, y: number, extra = "") => group.add(label(text, `${MAJOR.has(o.kind) ? "major" : "minor"} kind-${o.kind} ${extra}`, o.x, y, o.z));
  switch (o.kind) {
    case "belt": {
      const outer = slab(stadium(o.w!, o.d!), 0.7, 0x4a4944);
      const inner = slab(stadium(o.w! * 0.45, o.d! * 0.8), 0.9, 0xd8d3c6);
      outer.position.set(o.x, 0, o.z);
      inner.position.set(o.x, 0, o.z);
      group.add(outer, inner);
      tag(o.label!, 2.2, "pill");
      break;
    }
    case "gate":
      group.add(box(0.25, 2.4, 0.25, 0x3a3833, o.x, o.z), box(2.2, 1.1, 0.3, 0x5b4fa0, o.x, o.z, 2.2));
      tag(o.label!, 4.2, "pill");
      break;
    case "passport":
    case "security":
      group.add(box(1.7, 1.5, 1.7, 0x4d4b78, o.x, o.z), box(2, 0.25, 2, 0xd8d3c6, o.x, o.z, 1.9), box(1.5, 0.4, 1.5, 0x9fc4d6, o.x, o.z, 1.5));
      tag(name, 3.4);
      break;
    case "escalator": {
      const ramp = box(1.6, 0.5, 5, 0x5a5b60, o.x, o.z, 1);
      ramp.rotation.x = 0.42;
      group.add(ramp);
      tag(labels.escalator, 3);
      break;
    }
    case "arrow": {
      const shape = new THREE.Shape([[-1.1, -0.35], [0.2, -0.35], [0.2, -0.9], [1.3, 0], [0.2, 0.9], [0.2, 0.35], [-1.1, 0.35]].map(([x, y]) => new THREE.Vector2(x, y)));
      const mesh = slab(shape, 0.12, 0xb5533c, 0.02);
      mesh.position.set(o.x, 0.02, o.z);
      mesh.rotation.y = Math.atan2(-o.dir![1], o.dir![0]);
      mesh.castShadow = false;
      group.add(mesh);
      break;
    }
    case "sign":
      group.add(box(0.2, 2, 0.2, 0x3a3833, o.x, o.z), box(0.9, 0.9, 0.9, GOLD, o.x, o.z, 2));
      tag(name, 3.8);
      break;
    case "shelter":
      // A counter under a flat canopy on four posts.
      for (const [dx, dz] of [[-1.6, -1.2], [1.6, -1.2], [-1.6, 1.2], [1.6, 1.2]]) group.add(box(0.18, 2.6, 0.18, 0x3a3833, o.x + dx, o.z + dz));
      group.add(box(3.8, 0.22, 3, GOLD, o.x, o.z, 2.6), box(2.4, 1, 0.8, 0xf1ebdd, o.x, o.z));
      tag(o.label!, 4.2, "shelter");
      break;
    case "police":
    case "checkpoint":
      group.add(box(3, 2.4, 2.6, o.kind === "police" ? KIND_COLORS.police : 0xb5533c, o.x, o.z), box(3.3, 0.2, 2.9, 0xe9edf5, o.x, o.z, 2.4));
      tag(o.label ?? name, 4);
      break;
    case "desks": {
      // A row of small numbered desks; every tenth number is labelled.
      const pitch = o.w! / o.count!;
      for (let i = 0; i < o.count!; i++) {
        const x = o.x - o.w! / 2 + (i + 0.5) * pitch;
        group.add(box(pitch * 0.72, 0.9, 0.8, 0xf1ebdd, x, o.z));
        if (i === 0 || (i + 1) % 10 === 0) group.add(label(String(i + 1), "minor pill", x, 1.8, o.z));
      }
      break;
    }
    default:
      group.add(box(2.3, o.kind === "elevator" ? 2.2 : 1, 2.3, KIND_COLORS[o.kind] ?? 0xaaa59a, o.x, o.z));
      if (name) tag(name, 2.2);
  }
  return group;
}

function levelGroup(level: Level, labels: SceneLabels, forecourt: boolean) {
  const group = new THREE.Group();
  for (const plate of level.plates) {
    const shape = flat(plate.points);
    for (const hole of plate.holes ?? []) shape.holes.push(new THREE.Path(hole.map(([x, z]) => new THREE.Vector2(x, -z))));
    group.add(slab(shape, 0.8, plate.kind === "landside" ? LANDSIDE : FLOOR, -0.8));
  }
  for (const object of level.objects) group.add(objectMesh(object, labels));
  if (level.exit) {
    const { x, z } = level.exit;
    group.add(box(0.3, 3.2, 0.3, GOLD, x - 3, z), box(0.3, 3.2, 0.3, GOLD, x + 3, z), box(6.3, 0.4, 0.3, GOLD, x, z, 3.2));
    group.add(label(labels.exit, "major exit", x, 5, z));
  }
  if (forecourt && level.exit) {
    // Pavement in front of the exit, wide enough for the Meet & Greet row.
    const outside = level.objects.filter((o) => ["police", "checkpoint", "shelter", "desks"].includes(o.kind));
    const maxX = Math.max(...outside.map((o) => o.x + (o.w ?? 0) / 2)) + 5;
    // Deep enough past the desks for the zone label to sit on the pavement.
    const maxZ = Math.max(...outside.map((o) => o.z)) + 11;
    const pavement = box(maxX - level.exit.x + 10, 0.3, maxZ - level.exit.z, 0x55534d, (maxX + level.exit.x - 10) / 2, (maxZ + level.exit.z) / 2, -0.8);
    pavement.castShadow = false;
    group.add(pavement);
    // Beside the rows on a wide canvas, past their far end on a tall one (see .tall in airport-map.css).
    group.add(label(labels.meetGreet, "major zone wide", (outside[0].x + maxX - 5) / 2, 0, maxZ - 5));
    group.add(label(labels.meetGreet, "major zone narrow", maxX + 4, 0, (level.exit.z + maxZ) / 2));
  }
  return group;
}

/** A flat strip along a line; three.js lines cannot be wider than one pixel. */
function ribbon(lines: number[][][], width: number, color: number, y: number) {
  const positions: number[] = [];
  for (const line of lines) {
    for (let i = 0; i < line.length - 1; i++) {
      const [ax, az] = line[i];
      const [bx, bz] = line[i + 1];
      const length = Math.hypot(bx - ax, bz - az) || 1;
      const [nx, nz] = [(-(bz - az) / length) * (width / 2), ((bx - ax) / length) * (width / 2)];
      positions.push(ax + nx, y, az + nz, bx + nx, y, bz + nz, bx - nx, y, bz - nz, ax + nx, y, az + nz, bx - nx, y, bz - nz, ax - nx, y, az - nz);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
}

const OVERVIEW_SCALE = 0.06;

function overviewGroup(labels: SceneLabels, pickable: THREE.Object3D[]) {
  const { overview } = airportMap;
  const group = new THREE.Group();
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(2400, 3200), new THREE.MeshStandardMaterial({ color: 0x23211c, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.5;
  ground.receiveShadow = true;
  group.add(ground);
  for (const apron of overview.aprons) group.add(slab(flat(apron), 0.3, 0x34322c, -0.3));
  for (const lot of overview.parking) group.add(slab(flat(lot), 0.4, 0x3d4250, -0.3));
  group.add(ribbon(overview.taxiways, 14, 0x3b3933, 0.15), ribbon(overview.runways, 45, 0x0d0c0a, 0.2), ribbon(overview.serviceRoads, 4, 0x57544c, 0.25), ribbon(overview.roads, 8, 0x8a8577, 0.3));
  for (const building of overview.buildings) group.add(slab(flat(building), 9, 0x6b675e));
  const names: Record<string, string> = { t1: labels.t1, t2: labels.t2, domestic: labels.domestic };
  for (const terminal of overview.terminals) {
    const mesh = slab(flat(terminal.points), 22, FLOOR);
    mesh.userData.view = terminal.id;
    if (terminal.id !== "domestic") pickable.push(mesh);
    group.add(mesh);
    const xs = terminal.points.map((p) => p[0]);
    const zs = terminal.points.map((p) => p[1]);
    group.add(label(names[terminal.id], `major terminal${terminal.id === "domestic" ? "" : " pick"}`, (Math.min(...xs) + Math.max(...xs)) / 2, 60, (Math.min(...zs) + Math.max(...zs)) / 2));
  }
  for (const stop of overview.stops) {
    group.add(box(10, 14, 10, GOLD, stop.x, stop.z));
    group.add(label(labels[stop.key], "minor", stop.x, 30, stop.z));
  }
  group.scale.setScalar(OVERVIEW_SCALE);
  return group;
}

export function createAirportScene(host: HTMLElement, labels: SceneLabels, onPick: (view: TerminalId) => void): AirportScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = "am-labels";
  host.append(renderer.domElement, labelRenderer.domElement);

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff4dd, 0x2a2620, 1.15));
  const sun = new THREE.DirectionalLight(0xfff1d6, 2.1);
  sun.position.set(-60, 110, 50);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -130, right: 130, top: 130, bottom: -130, far: 400 });
  sun.shadow.bias = -0.0004;
  scene.add(sun);

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -500, 1500);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI * 0.44;
  controls.minZoom = 0.6;
  controls.maxZoom = 9;
  controls.zoomToCursor = true;
  // Touch works like a street map: one finger moves, two fingers zoom and (below) twist to turn.
  controls.screenSpacePanning = false;
  controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };

  const groups = new Map<string, THREE.Group>();
  const pickable: THREE.Object3D[] = [];
  let current: THREE.Group | undefined;
  let currentKey = "";
  /** Half extents of the current view on screen, in world units. */
  const fit = { x: 50, y: 50 };
  let tall = false;

  const walker = new THREE.Group();
  const gold = new THREE.MeshStandardMaterial({ color: GOLD, emissive: 0x5a4416, roughness: 0.4 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.3, 4, 12), gold);
  body.position.y = 1.2;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.48, 16, 12), gold);
  head.position.y = 2.75;
  walker.add(body, head);
  walker.traverse((part) => { part.castShadow = true; });
  walker.visible = false;
  scene.add(walker);
  let routeLine: THREE.Mesh | undefined;

  function resize() {
    const { clientWidth: width, clientHeight: height } = host;
    if (!width || !height) return;
    // Turning the phone or opening full screen changes which way the plan fits best.
    if (current && width < height !== tall) return reframe();
    renderer.setSize(width, height);
    labelRenderer.setSize(width, height);
    const aspect = width / height;
    // Fit the current view, as seen from the starting camera angle, whatever the canvas shape.
    const half = Math.max(fit.y, fit.x / aspect) * 1.06;
    Object.assign(camera, { left: -half * aspect, right: half * aspect, top: half, bottom: -half });
    camera.updateProjectionMatrix();
  }

  function build(view: ViewId, level: string) {
    if (view === "overview") return overviewGroup(labels, pickable);
    const levels = airportMap[view].levels as Record<string, Level>;
    return levelGroup(levels[level], labels, view === "t2" && level === "ground");
  }

  function drawRoute(view: ViewId, level: string) {
    if (routeLine) {
      scene.remove(routeLine);
      routeLine.geometry.dispose();
      routeLine = undefined;
    }
    if (view === "overview") return;
    const points = arrivalRoutes[view].filter((step) => step.level === level).flatMap((step) => step.points);
    if (points.length < 2) return;
    const path = new THREE.CurvePath<THREE.Vector3>();
    for (let i = 0; i < points.length - 1; i++) path.add(new THREE.LineCurve3(new THREE.Vector3(points[i][0], 0.25, points[i][1]), new THREE.Vector3(points[i + 1][0], 0.25, points[i + 1][1])));
    routeLine = new THREE.Mesh(new THREE.TubeGeometry(path, points.length * 12, 0.22, 6), gold);
    scene.add(routeLine);
  }

  function show(view: ViewId, level = "ground") {
    const key = `${view}/${level}`;
    if (key === currentKey) return;
    currentKey = key;
    // Hidden rather than removed: CSS2DRenderer only hides the labels of objects still in the scene.
    if (current) current.visible = false;
    current = groups.get(key);
    if (!current) {
      current = build(view, level);
      groups.set(key, current);
      scene.add(current);
    }
    current.visible = true;
    drawRoute(view, level);
    walker.visible = false;
    reframe();
  }

  /** Points the camera at the whole of the current view. */
  function reframe() {
    if (!current) return;
    const bounds = currentKey.startsWith("overview")
      ? new THREE.Box3(new THREE.Vector3(-50, 0, -62), new THREE.Vector3(50, 2, 86))
      : new THREE.Box3().setFromObject(current).expandByScalar(6); // room for the labels at the edges
    const centre = bounds.getCenter(new THREE.Vector3());
    controls.target.set(centre.x, 0, centre.z);
    camera.zoom = 1;
    // On a tall screen, also try looking along the terminal, and keep whichever view shows the plan larger.
    const aspect = host.clientWidth / host.clientHeight || 1;
    tall = aspect < 1;
    host.classList.toggle("tall", tall);
    const look = (angle: THREE.Vector3) => {
      camera.position.copy(controls.target).add(angle.clone().multiplyScalar(300));
      camera.lookAt(controls.target);
      camera.updateMatrixWorld();
      fit.x = fit.y = 0;
      for (const x of [bounds.min.x, bounds.max.x]) for (const z of [bounds.min.z, bounds.max.z]) {
        const corner = camera.worldToLocal(new THREE.Vector3(x, 0, z));
        fit.x = Math.max(fit.x, Math.abs(corner.x));
        fit.y = Math.max(fit.y, Math.abs(corner.y));
      }
      return Math.max(fit.y, fit.x / aspect);
    };
    const across = new THREE.Vector3(-0.7, 0.85, 1);
    const along = new THREE.Vector3(-1, 0.85, 0.12);
    if (!tall || look(along) > look(across)) look(across);
    else look(along);
    resize();
    controls.update();
  }

  function walkTo(terminal: TerminalId, stepIndex: number, progress: number, snap = false) {
    const step = arrivalRoutes[terminal][stepIndex];
    show(terminal, step.level);
    const lengths = step.points.slice(1).map((p, i) => Math.hypot(p[0] - step.points[i][0], p[1] - step.points[i][1]));
    let remaining = Math.min(Math.max(progress, 0), 1) * lengths.reduce((a, b) => a + b, 0);
    let segment = 0;
    while (segment < lengths.length - 1 && remaining > lengths[segment]) remaining -= lengths[segment++];
    const [from, to]: Point[] = [step.points[segment], step.points[segment + 1]];
    const t = lengths[segment] ? remaining / lengths[segment] : 0;
    walker.position.set(from[0] + (to[0] - from[0]) * t, 0, from[1] + (to[1] - from[1]) * t);
    walker.visible = true;
    // Follow the walker: keep the camera's offset from its target, move both.
    const offset = camera.position.clone().sub(controls.target);
    controls.target.lerp(walker.position, snap ? 1 : 0.08);
    camera.position.copy(controls.target).add(offset);
    camera.zoom += (Math.max(camera.zoom, 1.9) - camera.zoom) * (snap ? 1 : 0.06);
    camera.updateProjectionMatrix();
  }

  const raycaster = new THREE.Raycaster();
  let downAt = [0, 0];
  const onDown = (event: PointerEvent) => { downAt = [event.clientX, event.clientY]; };
  const onUp = (event: PointerEvent) => {
    // A drag rotates the map; only a tap picks a terminal.
    if (!currentKey.startsWith("overview") || Math.hypot(event.clientX - downAt[0], event.clientY - downAt[1]) > 6) return;
    const rect = renderer.domElement.getBoundingClientRect();
    raycaster.setFromCamera(new THREE.Vector2(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1), camera);
    const hit = raycaster.intersectObjects(pickable)[0];
    if (hit) onPick(hit.object.userData.view as TerminalId);
  };
  renderer.domElement.addEventListener("pointerdown", onDown);
  renderer.domElement.addEventListener("pointerup", onUp);

  // Two-finger twist turns the map around its centre; OrbitControls has no such gesture.
  const fingers = new Map<number, [number, number]>();
  let twist: number | undefined;
  const fingerAngle = () => {
    const [a, b] = [...fingers.values()];
    return Math.atan2(b[1] - a[1], b[0] - a[0]);
  };
  const onFinger = (event: PointerEvent) => {
    if (event.pointerType !== "touch") return;
    if (event.type === "pointerup" || event.type === "pointercancel") fingers.delete(event.pointerId);
    else if (event.type === "pointerdown" || fingers.has(event.pointerId)) fingers.set(event.pointerId, [event.clientX, event.clientY]);
    if (fingers.size !== 2) { twist = undefined; return; }
    const angle = fingerAngle();
    if (twist !== undefined && event.type === "pointermove") {
      const turn = Math.atan2(Math.sin(angle - twist), Math.cos(angle - twist));
      camera.position.sub(controls.target).applyAxisAngle(camera.up, turn).add(controls.target);
    }
    twist = angle;
  };
  const fingerEvents = ["pointerdown", "pointermove", "pointerup", "pointercancel"] as const;
  for (const type of fingerEvents) renderer.domElement.addEventListener(type, onFinger);

  const observer = new ResizeObserver(resize);
  observer.observe(host);
  let frame = 0;
  const tick = () => {
    frame = requestAnimationFrame(tick);
    controls.update();
    // Small labels only once the visitor has zoomed in, so the first view stays readable.
    host.classList.toggle("zoomed", camera.zoom > 1.7);
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  };
  tick();

  return {
    show,
    walkTo,
    hideWalker: () => { walker.visible = false; },
    dispose() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      for (const type of fingerEvents) renderer.domElement.removeEventListener(type, onFinger);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      host.replaceChildren();
    },
  };
}
