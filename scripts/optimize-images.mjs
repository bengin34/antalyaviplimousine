import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "assets");
const optimizedDir = path.join(sourceDir, "optimized");
const optimizedImagesDir = path.join(optimizedDir, "images");
const optimizedClinicDir = path.join(optimizedDir, "clinic");
const publicOptimizedDir = path.join(root, "public", "assets", "optimized");

const imageExtensions = new Set([".jpg", ".jpeg", ".png"]);

async function ensureOutputDirs() {
  await mkdir(optimizedImagesDir, { recursive: true });
  await mkdir(optimizedClinicDir, { recursive: true });
  await mkdir(publicOptimizedDir, { recursive: true });
}

async function writeResponsiveImage(input, outputBase, options = {}) {
  const {
    width = 1600,
    height,
    fit = "inside",
    jpegQuality = 76,
    webpQuality = 74,
    png = false,
  } = options;

  const pipeline = sharp(input).rotate().resize({
    width,
    height,
    fit,
    withoutEnlargement: true,
  });

  if (png) {
    await pipeline
      .clone()
      .png({ compressionLevel: 9, palette: true })
      .toFile(`${outputBase}.png`);
  } else {
    await pipeline
      .clone()
      .jpeg({ quality: jpegQuality, mozjpeg: true, progressive: true })
      .toFile(`${outputBase}.jpg`);
  }

  await pipeline
    .clone()
    .webp({ quality: webpQuality, effort: 5 })
    .toFile(`${outputBase}.webp`);
}

async function optimizeCoreAssets() {
  await sharp(path.join(sourceDir, "antalya-coastline-hero.jpg"))
    .rotate()
    .resize({ width: 1200, height: 630, fit: "cover", position: "center" })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(path.join(optimizedDir, "og-antalya-transfer.jpg"));

  await writeResponsiveImage(
    path.join(sourceDir, "antalya-coastline-hero.jpg"),
    path.join(optimizedDir, "antalya-coastline-hero"),
    { width: 1672, jpegQuality: 76, webpQuality: 74 },
  );

  await writeResponsiveImage(
    path.join(sourceDir, "chauffeur-arrival.jpg"),
    path.join(optimizedDir, "chauffeur-arrival"),
    { width: 1600, jpegQuality: 76, webpQuality: 74 },
  );

  await writeResponsiveImage(
    path.join(sourceDir, "executive-interior.jpg"),
    path.join(optimizedDir, "executive-interior"),
    { width: 1400, jpegQuality: 76, webpQuality: 74 },
  );

  await writeResponsiveImage(
    path.join(sourceDir, "logo.png"),
    path.join(optimizedDir, "logo"),
    { width: 360, png: true, webpQuality: 82 },
  );

  const healthHero = path.join(sourceDir, "health", "health-coordination-hero.png");
  await writeResponsiveImage(
    healthHero,
    path.join(optimizedDir, "health-coordination-hero"),
    { width: 1672, jpegQuality: 80, webpQuality: 78 },
  );

  await sharp(healthHero)
    .rotate()
    .resize({ width: 1200, height: 630, fit: "cover", position: "center" })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(optimizedDir, "og-health-tourism.jpg"));
}

async function optimizeFleetImages() {
  const fleetDir = path.join(sourceDir, "images");
  const files = (await readdir(fleetDir))
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  await Promise.all(
    files.map((file, index) => {
      const number = String(index + 1).padStart(2, "0");
      return writeResponsiveImage(
        path.join(fleetDir, file),
        path.join(optimizedImagesDir, `vehicle-${number}`),
        {
          width: 1280,
          height: 1280,
          jpegQuality: 74,
          webpQuality: 72,
        },
      );
    }),
  );
}

async function optimizeClinicAssets() {
  const clinicDir = path.join(sourceDir, "clinic");
  const assets = [
    ["oriva-hero", { width: 1800, jpegQuality: 80, webpQuality: 79 }],
    ["doctor-ada-varel", { width: 1000, height: 1250, fit: "cover", jpegQuality: 80, webpQuality: 79 }],
    ["doctor-kerem-loran", { width: 1000, height: 1250, fit: "cover", jpegQuality: 80, webpQuality: 79 }],
    ["doctor-nil-arven", { width: 1000, height: 1250, fit: "cover", jpegQuality: 80, webpQuality: 79 }],
    ["case-hairline", { width: 1500, jpegQuality: 78, webpQuality: 77 }],
    ["case-facial-profile", { width: 1500, jpegQuality: 78, webpQuality: 77 }],
    ["case-smile-planning", { width: 1500, jpegQuality: 78, webpQuality: 77 }],
  ];

  await Promise.all(
    assets.map(([name, options]) => writeResponsiveImage(
      path.join(clinicDir, `${name}.png`),
      path.join(optimizedClinicDir, name),
      options,
    )),
  );

  await sharp(path.join(clinicDir, "oriva-hero.png"))
    .rotate()
    .resize({ width: 1200, height: 630, fit: "cover", position: "center" })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(optimizedDir, "og-clinic-demo.jpg"));
}

async function publishStableSeoAssets() {
  await copyFile(
    path.join(optimizedDir, "og-antalya-transfer.jpg"),
    path.join(publicOptimizedDir, "og-antalya-transfer.jpg"),
  );
  await copyFile(
    path.join(optimizedDir, "logo.png"),
    path.join(publicOptimizedDir, "logo.png"),
  );
  await copyFile(
    path.join(optimizedDir, "og-health-tourism.jpg"),
    path.join(publicOptimizedDir, "og-health-tourism.jpg"),
  );
  await copyFile(
    path.join(optimizedDir, "og-clinic-demo.jpg"),
    path.join(publicOptimizedDir, "og-clinic-demo.jpg"),
  );
}

await ensureOutputDirs();
await optimizeCoreAssets();
await optimizeFleetImages();
await optimizeClinicAssets();
await publishStableSeoAssets();

console.log("Optimized images written to assets/optimized");
