function doPost(event) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(event.postData.contents);
    var headers = [
      "Name",
      "Email",
      "Attendance",
      "Guests",
      "Dietary notes",
      "Other guest names",
      "Submitted at",
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    } else if (sheet.getRange(1, 6).getValue() === "Submitted at") {
      sheet.insertColumnBefore(6);
      sheet.getRange(1, 6).setValue("Other guest names");
    } else if (sheet.getRange(1, 6).getValue() !== "Other guest names") {
      sheet.getRange(1, 6).setValue("Other guest names");
      sheet.getRange(1, 7).setValue("Submitted at");
    }

    var row = [
      data.name || "",
      data.email || "",
      data.attendance || "",
      data.guests || "",
      data.dietary || "",
      data.guestNames || "",
      data.submittedAt || new Date().toISOString(),
    ];
    var email = String(data.email || "")
      .trim()
      .toLowerCase();
    var existingRow = findRowByEmail(sheet, email);

    if (existingRow) {
      sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }
  } finally {
    lock.releaseLock();
  }

  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function findRowByEmail(sheet, email) {
  if (!email || sheet.getLastRow() < 2) return 0;

  var emails = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
  for (var index = 0; index < emails.length; index++) {
    if (String(emails[index][0]).trim().toLowerCase() === email)
      return index + 2;
  }
  return 0;
}
