const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const getBuffer = require("./fetchUtils");

async function changePDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const form = pdfDoc.getForm();
  const firstNameField = form.createTextField("first.name");
  const lastNameField = form.createTextField("second.name");
  firstNameField.setText("Josh");
  lastNameField.setText("Doe");
  firstNameField.addToPage(page, {
    x: 10,
    y: page.getSize().height - 50,
    height: 30,
  });
  lastNameField.addToPage(page, {
    x: 250,
    y: page.getSize().height - 50,
    height: 30,
  });
  page.drawText("Are you a programmer?", {
    x: 0,
    y: page.getSize().height - 67,
    size: 10,
  });
  const isProgrammer = form.createRadioGroup("is.programmer");
  isProgrammer.addOptionToPage("Yes", page, {
    x: 100,
    y: page.getSize().height - 120,
  });
  isProgrammer.addOptionToPage("No", page, {
    x: 20,
    y: page.getSize().height - 120,
  });

  isProgrammer.select("Yes");
  const pdfFile = await pdfDoc.save();
  fs.writeFile("example.pdf", pdfFile, "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) console.log(data);
  });
}
(async function () {
  await changePDF();
})();
