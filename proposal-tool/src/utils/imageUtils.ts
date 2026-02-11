const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
const VALID_PDF_TYPE = 'application/pdf';
const ALL_VALID_TYPES = [...VALID_IMAGE_TYPES, VALID_PDF_TYPE];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MIN_DIMENSION = 200; // px

export interface ImageProcessingResult {
  data: string | null;
  mediaType: string | null;
  error: string | null;
}

/**
 * Check if a file is a PDF.
 */
export function isPdfFile(file: File): boolean {
  return file.type === VALID_PDF_TYPE || file.name.toLowerCase().endsWith('.pdf');
}

/**
 * Read a PDF file as raw base64 (no canvas compression needed).
 */
function readFileAsBase64(file: File): Promise<ImageProcessingResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      resolve({ data: base64, mediaType: 'application/pdf', error: null });
    };
    reader.onerror = () => {
      resolve({ data: null, mediaType: null, error: 'Error al leer el archivo PDF.' });
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Validate and process a bill file (image or PDF).
 * Images are compressed via canvas. PDFs are read as raw base64.
 * Returns { data: base64String, mediaType, error: null } on success.
 */
export async function compressImage(file: File, maxWidth: number = 1600): Promise<ImageProcessingResult> {
  // Validate file type
  const fileType = file.type || (file.name.toLowerCase().endsWith('.pdf') ? VALID_PDF_TYPE : '');
  if (!ALL_VALID_TYPES.includes(fileType)) {
    return {
      data: null,
      mediaType: null,
      error: `Formato no soportado: ${fileType || 'desconocido'}. Use JPEG, PNG, WebP, HEIC o PDF.`,
    };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      data: null,
      mediaType: null,
      error: `Archivo demasiado grande (${Math.round(file.size / 1024 / 1024)}MB). Máximo 10MB.`,
    };
  }

  // PDF — read as base64 directly (no canvas processing)
  if (isPdfFile(file)) {
    return readFileAsBase64(file);
  }

  // Image — compress via canvas
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Validate minimum dimensions
        if (img.width < MIN_DIMENSION || img.height < MIN_DIMENSION) {
          resolve({
            data: null,
            mediaType: null,
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
          resolve({ data: null, mediaType: null, error: 'No se pudo procesar la imagen (canvas no disponible).' });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const base64 = dataUrl.split(',')[1];
        resolve({ data: base64, mediaType: 'image/jpeg', error: null });
      };
      img.onerror = () => {
        resolve({ data: null, mediaType: null, error: 'No se pudo leer la imagen. Verifique que el archivo sea válido.' });
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      resolve({ data: null, mediaType: null, error: 'Error al leer el archivo.' });
    };
    reader.readAsDataURL(file);
  });
}

export function getImagePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}
