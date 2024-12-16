import Resizer from "react-image-file-resizer";

interface ResizeImageConfig {
  maxWidth?: number;
  maxHeight?: number;
  compressFormat?: "jpeg" | "png" | "webp";
  quality?: number;
  rotation?: number;
  outputType?: "base64" | "blob" | "file";
}

export const resizeImage = (
  file: File,
  config: ResizeImageConfig = {}
): Promise<string | Blob | File> => {
  const {
    maxWidth = 590,
    maxHeight = 590,
    compressFormat = "jpeg",
    quality = 100,
    rotation = 0,
    outputType = "base64",
  } = config;

  return new Promise<string | Blob | File>((resolve, reject) => {
    try {
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        compressFormat,
        quality,
        rotation,
        (uri) => {
          if (
            typeof uri === "string" ||
            uri instanceof Blob ||
            uri instanceof File
          ) {
            resolve(uri);
          } else {
            reject(new Error("Unexpected type returned from imageFileResizer"));
          }
        },
        outputType
      );
    } catch (error) {
      reject(error);
    }
  });
};
