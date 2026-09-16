# Google Sheets RSVP setup

1. Create or open the Google Sheet where RSVPs should be stored.
2. Open **Extensions > Apps Script**.
3. Replace the default code with the contents of `google-apps-script.gs`.
4. Click **Deploy > New deployment**.
5. Choose **Web app**, set **Execute as** to yourself, and set **Who has access** to **Anyone**.
6. Deploy, approve the Google permissions, and copy the web app URL.
7. Open `script.js` and paste the URL between the quotes on `GOOGLE_SHEETS_ENDPOINT`.

Every new RSVP is added as a row in the first sheet tab. If the same email address is submitted again, that existing row is updated instead of creating a duplicate. The columns include name, email, attendance, guest count, dietary notes, other guest names, and submission time.

Guests should enter accompanying guest names in the **Names of other guests** field, separated by commas. When you update the Apps Script code, redeploy the web app as a new version so the duplicate protection and guest-name column are active.
