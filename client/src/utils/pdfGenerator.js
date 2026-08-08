import jsPDF from "jspdf";

export const generateInterviewPDF = ({
    userName,
    overallScore,
    strengths,
    weaknesses,
    improvements,
    summary
}) => {

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(22);
    doc.text("InterviewAI Report", 20, y);

    y += 15;

    doc.setFontSize(14);
    doc.text(`Candidate: ${userName}`, 20, y);

    y += 10;

    doc.text(`Overall Score: ${overallScore}/10`, 20, y);

    y += 15;

    doc.setFontSize(16);
    doc.text("Strengths", 20, y);

    y += 10;

    strengths.forEach((item) => {
        doc.setFontSize(12);
        doc.text(`• ${item}`, 25, y);
        y += 8;
    });

    y += 8;

    doc.setFontSize(16);
    doc.text("Weaknesses", 20, y);

    y += 10;

    weaknesses.forEach((item) => {
        doc.setFontSize(12);
        doc.text(`• ${item}`, 25, y);
        y += 8;
    });

    y += 8;

    doc.setFontSize(16);
    doc.text("Improvements", 20, y);

    y += 10;

    improvements.forEach((item) => {
        doc.setFontSize(12);
        doc.text(`• ${item}`, 25, y);
        y += 8;
    });

    y += 10;

    doc.setFontSize(16);
    doc.text("Summary", 20, y);

    y += 10;

    doc.setFontSize(12);

    const lines = doc.splitTextToSize(summary, 170);

    doc.text(lines, 20, y);

    doc.save("Interview_Report.pdf");

};