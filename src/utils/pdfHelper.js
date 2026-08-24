/**
 * Ensures the PDF opens reliably in a new tab via native browser navigation,
 * while simultaneously triggering the physical file download.
 * @param {string} url - URL/path to the PDF (e.g. '/Parth_Agrawal_CV.pdf')
 * @param {string} filename - Filename for downloaded file (e.g. 'Parth_Agrawal_CV.pdf')
 */
export const openAndDownloadPdf = (url, filename) => {
  const safeFilename = filename || 'Parth_Agrawal_CV.pdf';

  // Trigger physical download in parallel without blocking native new-tab navigation
  setTimeout(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Download failed');
        return res.blob();
      })
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = safeFilename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 3000);
      })
      .catch(() => {
        const link = document.createElement('a');
        link.href = url;
        link.download = safeFilename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }, 150);
};
