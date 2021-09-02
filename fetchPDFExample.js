const getBuffer = require("./fetchUtils");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
async function changePDF() {
  const pdfBuffer = await getBuffer(
    "http://www.africau.edu/images/default/sample.pdf"
  );
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const newPage = pdfDoc.addPage();
  newPage.drawText("Hello, World", {
    x: 20,
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
  await changePDF();
})();
