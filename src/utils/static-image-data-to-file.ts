import type { StaticImageData } from "next/image";

export async function staticImageDataToFile(
  imageData: StaticImageData,
  fileName: string
): Promise<File> {
  const response = await fetch(imageData.src);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}
