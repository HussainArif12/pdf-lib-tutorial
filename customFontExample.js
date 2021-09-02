const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit");
const fs = require("fs");

async function createPDF() {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const courier = await pdfDoc.embedFont(StandardFonts.Courier);
  const oceanFont = await pdfDoc.embedFont(
    fs.readFileSync("./ocean-summer/Ocean Summer.ttf")
  );
  const newPage = pdfDoc.addPage();
  newPage.drawText("Hello, World", {
    x: 20,
    y: newPage.getSize().height - 70,
    size: 80,
    font: oceanFont, //or courier
    color: rgb(0.25, 0.3, 1),
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
