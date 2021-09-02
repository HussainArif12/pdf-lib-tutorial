const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

async function createPDF() {
  const pdfDoc = await PDFDocument.create();
  const newPage = pdfDoc.addPage();
  newPage.drawText("Hello, World", {
    x: 50,
    y: newPage.getSize().height - 70,
    size: 80,
  });
  const pdfFile = await pdfDoc.save();
  fs.writeFile("example.pdf", pdfFile, "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) console.log(data);
  });
}
(async function () {
  await createPDF();
})();
