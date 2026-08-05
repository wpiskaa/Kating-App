import { jsPDF } from 'jspdf';

/**
 * FR-5.3 (CV Engine):
 * Client-Side ATS-Friendly PDF Resume rendering engine.
 * Automatically extracts metadata from Achievement Vault repository and formats it cleanly.
 */
export const generateATSCV = (user, achievements) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = '#1e293b'; // Slate 800 (Classic ATS / Navy Blue)
  const secondaryColor = '#475569'; // Slate 600
  const marginX = 20;
  let cursorY = 20;

  // Header: Name & Contact
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(primaryColor);
  doc.text(user?.displayName || 'Hafiz Kurniawan', marginX, cursorY);

  cursorY += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor);
  const emailText = user?.email || 'hafiz.kurniawan@student.umy.ac.id';
  const subtext = `${emailText} | Program Studi ${user?.prodi || 'Teknologi Informasi'} | Semester ${user?.semester || 6}`;
  doc.text(subtext, marginX, cursorY);

  cursorY += 6;
  doc.setLineWidth(0.5);
  doc.setDrawColor(203, 213, 225);
  doc.line(marginX, cursorY, 190, cursorY);

  // Section 1: Ringkasan Profesional (Professional Summary)
  cursorY += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(primaryColor);
  doc.text('RINGKASAN PROFESIONAL', marginX, cursorY);

  cursorY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  const summaryText = `Mahasiswa ${user?.prodi || 'Teknologi Informasi'} yang berdedikasi tinggi dengan rekam jejak kepemimpinan, kepanitiaan, dan penelitian teknologi. Berpengalaman dalam pengembangan perangkat lunak frontend, arsitektur basis data, dan riset inovasi berbasis perangkat pintar.`;
  const splitSummary = doc.splitTextToSize(summaryText, 170);
  doc.text(splitSummary, marginX, cursorY);
  cursorY += splitSummary.length * 5 + 4;

  // Section 2: Rekam Jejak Prestasi & Kepanitiaan (Extracted Metadata)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(primaryColor);
  doc.text('REKAM JEJAK PRESTASI & ORGANISASI', marginX, cursorY);

  cursorY += 4;
  doc.setLineWidth(0.3);
  doc.line(marginX, cursorY, 190, cursorY);
  cursorY += 6;

  if (!achievements || achievements.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9.5);
    doc.text('Belum ada dokumen prestasi yang diunggah ke Brankas Prestasi.', marginX, cursorY);
  } else {
    achievements.forEach((item, index) => {
      // Check for page overflow
      if (cursorY > 260) {
        doc.addPage();
        cursorY = 20;
      }

      // Title & Role
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42); // Black Slate
      const titleLine = `${index + 1}. ${item.title}`;
      doc.text(titleLine, marginX, cursorY);

      // Date / Period (Right Aligned)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(secondaryColor);
      doc.text(item.date || '2026', 190, cursorY, { align: 'right' });

      cursorY += 5;
      // Role & Organizing Institution (Metadata FR-5.2)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      const roleInst = `Peran: ${item.role} | Institusi: ${item.institution}`;
      doc.text(roleInst, marginX + 4, cursorY);

      cursorY += 5;
      // Description / Details
      if (item.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        const splitDesc = doc.splitTextToSize(`• ${item.description}`, 165);
        doc.text(splitDesc, marginX + 4, cursorY);
        cursorY += splitDesc.length * 4.5;
      }

      cursorY += 3;
    });
  }

  // Section 3: Keahlian Teknis & Kerangka Kerja
  cursorY += 6;
  if (cursorY > 260) {
    doc.addPage();
    cursorY = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(primaryColor);
  doc.text('KEAHLIAN TEKNIS (TECHNICAL SKILLS)', marginX, cursorY);

  cursorY += 4;
  doc.setLineWidth(0.3);
  doc.line(marginX, cursorY, 190, cursorY);
  cursorY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  doc.text('• Bahasa Pemrograman & Frontend: JavaScript (ES6+), React.js, HTML5, CSS3, TailwindCSS', marginX, cursorY);
  cursorY += 5;
  doc.text('• Backend & Infrastruktur: Firebase Auth, Firestore NoSQL, Cloud Functions, Git / GitHub', marginX, cursorY);
  cursorY += 5;
  doc.text('• Metodologi & Tools: Client-Side PDF Rendering, Agile Workspace, ATS Resume Standards', marginX, cursorY);

  // Trigger browser download
  const filename = `CV_ATS_${(user?.displayName || 'Hafiz_Kurniawan').replace(/\s+/g, '_')}_KatingApp.pdf`;
  doc.save(filename);
  return filename;
};
