export async function downloadSvgAsPng(svg: SVGSVGElement, filename: string) {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("width", "2048");
  clone.setAttribute("height", "2048");
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

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("No canvas");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 2048, 2048);
  context.drawImage(image, 0, 0, 2048, 2048);
  URL.revokeObjectURL(url);

  const png = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = png;
  link.download = filename.endsWith(".png") ? filename : `${filename}.png`;
  link.click();
}

export function fileName(standName: string, kind: "logo" | "sign") {
  const slug = (standName.trim() || "my-stand")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug}-${kind}.png`;
}
