const form = document.querySelector('#rsvp-form');
const status = document.querySelector('#form-status');
const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxlxj261P0s17EjJorIog5elR73ByoCrNvSWjPweqmFjkHzafoD9NoxOuXdMKUjykJI/exec';
const attendanceTypeFieldset = document.querySelector('#attendance-type-fieldset');
const attendanceTypeInputs = attendanceTypeFieldset.querySelectorAll('input');
const attendanceInputs = form.querySelectorAll('input[name="attendance"]');
attendanceTypeFieldset.disabled = false;

const calendarDownload = document.querySelector('.calendar-download');

calendarDownload.addEventListener('click', () => {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Freddie and Beatrice//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:freddie-beatrice-wedding-20271018@freddieandbeatrice',
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    'DTSTART:20271018T050000Z',
    'DTEND:20271018T100000Z',
    'SUMMARY:Freddie & Beatrice Wedding',
    'DESCRIPTION:Ceremony at 4:00 PM, cocktail hour at 5:00 PM, and dinner at 6:30 PM. Times are currently TBC.',
    'LOCATION:Ancora, 118 Wharf St, Tweed Heads, NSW 2485',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const file = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(file);
  downloadLink.download = 'freddie-and-beatrice-wedding.ics';
  downloadLink.click();
  URL.revokeObjectURL(downloadLink.href);
});

attendanceInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const attending = input.value === 'yes' && input.checked;
    attendanceTypeInputs.forEach((attendanceTypeInput) => {
      attendanceTypeInput.required = attending;
      if (!attending) attendanceTypeInput.checked = false;
    });
  });
});

const submitButton = form.querySelector('button[type="submit"]');
const otherNotesLabel = document.createElement('label');
otherNotesLabel.htmlFor = 'other-notes';
otherNotesLabel.textContent = 'Other notes';
const otherNotesInput = document.createElement('input');
otherNotesInput.id = 'other-notes';
otherNotesInput.name = 'otherNotes';
otherNotesInput.type = 'text';
otherNotesInput.placeholder = 'Optional special request';
submitButton.before(otherNotesLabel, otherNotesInput);

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const guestName = formData.get('name').trim();
  const response = {
    name: guestName,
    email: formData.get('email'),
    attendance: formData.get('attendance'),
    attendanceType: formData.get('attendanceType') || '',
    guests: formData.get('guests'),
    dietary: formData.get('dietary').trim(),
    guestNames: formData.get('guestNames').trim(),
    otherNotes: formData.get('otherNotes').trim(),
    submittedAt: new Date().toISOString()
  };

  status.textContent = 'Sending your RSVP...';

  try {
    if (GOOGLE_SHEETS_ENDPOINT) {
      await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(response)
      });
    }

    status.textContent = `Thank you, ${guestName}. Your RSVP is on its way to us.`;
    form.reset();
    const guestSelect = document.querySelector('#guests');
    if (guestSelect) {
      guestSelect.value = '0';
    }
  } catch (error) {
    status.textContent = 'Something went wrong. Please try again or contact us directly.';
  }
});