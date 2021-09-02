const getBuffer = require("./fetchUtils");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
async function changePDF() {
  const africaPDFBuffer = await getBuffer(
    "http://www.africau.edu/images/default/sample.pdf"
  );
  const W3PDFBuffer = await getBuffer(
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  );
  const africaPDFDoc = await PDFDocument.load(africaPDFBuffer);
  const W3PDFDoc = await PDFDocument.load(W3PDFBuffer);
  const mainDocument = await PDFDocument.create(); //main document
  const firstPages = await mainDocument.copyPages(
    africaPDFDoc,
    africaPDFDoc.getPageIndices()
  );
  firstPages.forEach((page) => mainDocument.addPage(page));
  const secondPages = await mainDocument.copyPages(
    W3PDFDoc,
    W3PDFDoc.getPageIndices()
  );
  secondPages.forEach((page) => mainDocument.addPage(page));
  const pdfFile = await mainDocument.save();
  fs.writeFile("example.pdf", pdfFile, "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) console.log(data);
  });
}
(async function () {
  await changePDF();
})();
