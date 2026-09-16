# Google Sheets RSVP setup

1. Create or open the Google Sheet where RSVPs should be stored.
2. Open **Extensions > Apps Script**.
3. Replace the default code with the contents of `google-apps-script.gs`.
4. Click **Deploy > New deployment**.
5. Choose **Web app**, set **Execute as** to yourself, and set **Who has access** to **Anyone**.
6. Deploy, approve the Google permissions, and copy the web app URL.
7. Open `script.js` and paste the URL between the quotes on `GOOGLE_SHEETS_ENDPOINT`.

Every RSVP will be added as a new row in the first sheet tab. The columns include name, email, attendance, guest count, dietary notes, and submission time.