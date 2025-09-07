export async function htmlToPDF(content: string) {
  if (typeof window === "undefined") return;

  const html2pdf = (await import("html2pdf.js")).default;
  const config = {
    margin: 0.5,
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(config).from(content).save();
}
