import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Export a DOM element as a multi-page PDF.
 * Adds .pdf-mode class during capture for white background styling.
 */
export async function exportProposalToPdf(
  elementId: string,
  customerName: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element #${elementId} not found`);
    return;
  }

  // Enter PDF mode (white backgrounds via CSS)
  document.body.classList.add('pdf-mode');

  // Wait for CSS rerender
  await new Promise((r) => setTimeout(r, 200));

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 1024, // consistent width for mobile
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.92),
      'JPEG',
      0,
      position,
      imgWidth,
      imgHeight
    );
    heightLeft -= pageHeight;

    // Additional pages
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.92),
        'JPEG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;
    }

    // Generate filename
    const date = new Date().toISOString().split('T')[0];
    const safeName = (customerName || 'cliente').replace(/[^a-zA-Z0-9\u00C0-\u017F\s-]/g, '').trim().replace(/\s+/g, '-');
    const filename = `propuesta-solar-${safeName}-${date}.pdf`;

    pdf.save(filename);
  } catch (error) {
    console.error('PDF export failed:', error);
    alert('Error al generar el PDF. Por favor, intente de nuevo.');
  } finally {
    // Exit PDF mode
    document.body.classList.remove('pdf-mode');
  }
}
