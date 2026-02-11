const VALID_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MIN_DIMENSION = 200; // px

export interface ImageProcessingResult {
  data: string | null;
  error: string | null;
}

/**
 * Validate and compress an image file using canvas resize.
 * Returns { data: base64String, error: null } on success.
 * Returns { data: null, error: message } on failure.
 * Max width 1600px to keep under Vercel's 4.5MB body limit.
 */
export async function compressImage(file: File, maxWidth: number = 1600): Promise<ImageProcessingResult> {
  // Validate file type
  if (!VALID_TYPES.includes(file.type)) {
    return {
      data: null,
      error: `Formato no soportado: ${file.type || 'desconocido'}. Use JPEG, PNG, WebP o HEIC.`,
    };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      data: null,
      error: `Archivo demasiado grande (${Math.round(file.size / 1024 / 1024)}MB). Máximo 10MB.`,
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Validate minimum dimensions
        if (img.width < MIN_DIMENSION || img.height < MIN_DIMENSION) {
          resolve({
            data: null,
            error: `Imagen demasiado pequeña (${img.width}x${img.height}). Mínimo ${MIN_DIMENSION}x${MIN_DIMENSION}px.`,
          });
          return;
        }

        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ data: null, error: 'No se pudo procesar la imagen (canvas no disponible).' });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        // Strip the data URL prefix to get raw base64
        const base64 = dataUrl.split(',')[1];
        resolve({ data: base64, error: null });
      };
      img.onerror = () => {
        resolve({ data: null, error: 'No se pudo leer la imagen. Verifique que el archivo sea válido.' });
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      resolve({ data: null, error: 'Error al leer el archivo.' });
    };
    reader.readAsDataURL(file);
  });
}

export function getImagePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}
