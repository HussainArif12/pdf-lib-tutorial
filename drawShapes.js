const getBuffer = require("./fetchUtils");
const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");

async function changePDF() {
  const pdfBuffer = await getBuffer(
    "http://www.africau.edu/images/default/sample.pdf"
  );
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const newPage = pdfDoc.addPage();
  newPage.drawSquare({
    x: 30,
    y: 80,
    size: 100,
    color: rgb(0.75, 0.2, 0.2),
  });
  newPage.drawCircle({
    x: 200,
    y: 100,
    size: 100,
    color: rgb(0.75, 0.2, 0.2),
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
