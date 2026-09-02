export type SaveHow = "shared" | "downloaded" | "opened";

export async function downloadSvgAsPng(
  svg: SVGSVGElement,
  filename: string,
): Promise<SaveHow> {
  const file = filename.endsWith(".png") ? filename : `${filename}.png`;
  const blob = await svgToPngBlob(svg);
  const imageFile = new File([blob], file, { type: "image/png" });

  if (canShareFile(imageFile)) {
    try {
      await navigator.share({
        files: [imageFile],
        title: file,
        text: "Tape this to the table, or take it to the print shop.",
      });
      return "shared";
    } catch (error) {
      if (isAbort(error)) return "shared";
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = file;

  if (isIos()) {
    window.open(url, "_blank", "noopener");
    return "opened";
  }

  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  return "downloaded";
}

async function svgToPngBlob(svg: SVGSVGElement): Promise<Blob> {
  await document.fonts.ready.catch(() => undefined);

  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.querySelectorAll("text").forEach((node) => node.setAttribute("opacity", "0"));

  const xml = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const image = new Image();
  image.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Could not draw the logo"));
    image.src = url;
  });

  const view = svg.viewBox.baseVal;
  const width = 2048;
  const height = Math.round(2048 * (view.height / view.width || 1));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("No canvas");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);
  paintSvgText(svg, context, width, height);
  URL.revokeObjectURL(url);

  const png = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (next) => (next ? resolve(next) : reject(new Error("Could not make a PNG"))),
      "image/png",
    );
  });
  return png;
}

function paintSvgText(
  svg: SVGSVGElement,
  context: CanvasRenderingContext2D,
  destWidth: number,
  destHeight: number,
) {
  const view = svg.viewBox.baseVal;
  const sx = destWidth / (view.width || destWidth);
  const sy = destHeight / (view.height || destHeight);

  svg.querySelectorAll("text").forEach((node) => {
    const el = node as SVGTextElement;
    const box = el.getBBox();
    const size = Number(el.getAttribute("font-size") || 24);
    const weight = el.getAttribute("font-weight") || "800";
    const fill = el.getAttribute("fill") || "#2A2416";
    const family = el.getAttribute("font-family") || "Fredoka, Nunito, sans-serif";
    const align = (el.getAttribute("text-anchor") || "start") as "start" | "middle" | "end";
    context.save();
    context.fillStyle = fill;
    context.font = `${weight} ${size * sx}px ${family}`;
    context.textAlign = align === "middle" ? "center" : align === "end" ? "right" : "left";
    context.textBaseline = "middle";
    context.fillText(el.textContent || "", (box.x + box.width / 2) * sx, (box.y + box.height / 2) * sy);
    context.restore();
  });
}

function canShareFile(file: File) {
  return typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });
}

function isIos() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function isAbort(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

export function fileName(standName: string, kind: "logo" | "sign") {
  const slug = (standName.trim() || "my-stand")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug}-${kind}.png`;
}
