/**
 * Opens a PDF file in a new tab AND triggers an automatic download to the user's computer.
 * @param {string} url - The URL or path to the PDF (e.g. '/Parth_Agrawal_CV.pdf')
 * @param {string} filename - The filename for the downloaded file (e.g. 'Parth_Agrawal_CV.pdf')
 */
export const openAndDownloadPdf = (e, url, filename) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  // 1. Open the PDF in a new tab for immediate viewing
  window.open(url, '_blank', 'noopener,noreferrer');

  // 2. Programmatically fetch blob and trigger physical download
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    })
    .catch((err) => {
      console.warn('Direct blob download fallback:', err);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
};
