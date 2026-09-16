function doPost(event) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = JSON.parse(event.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Name', 'Email', 'Attendance', 'Guests', 'Dietary notes', 'Submitted at']);
  }

  sheet.appendRow([
    data.name || '',
    data.email || '',
    data.attendance || '',
    data.guests || '',
    data.dietary || '',
    data.submittedAt || new Date().toISOString()
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}