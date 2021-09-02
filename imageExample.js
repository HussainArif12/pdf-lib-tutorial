const getBuffer = require("./fetchUtils");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
async function changePDF() {
  const pdfBuffer = await getBuffer(
    "http://www.africau.edu/images/default/sample.pdf"
  );
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const imageBuffer = await getBuffer(
    "https://images.unsplash.com/photo-1598124146163-36819847286d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  );
  const unsplashImage = await pdfDoc.embedJpg(imageBuffer);
  const firstPage = pdfDoc.getPages()[0];
  firstPage.drawImage(unsplashImage, {
    x: 100,
    y: 100,
    width: 500,
    height: 400,
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
