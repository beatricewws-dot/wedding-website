const form = document.querySelector('#rsvp-form');
const status = document.querySelector('#form-status');
const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbytFuXJ6PAJqQAE-BLdPC4mpOKGRWKx_Sd_Inam7ttAXZvK8WUOOGgDks3I-XSMjuO3/exec';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const guestName = formData.get('name').trim();
  const response = {
    name: guestName,
    email: formData.get('email'),
    attendance: formData.get('attendance'),
    guests: formData.get('guests'),
    dietary: formData.get('dietary').trim(),
    guestNames: formData.get('guestNames').trim(),
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
  } catch (error) {
    status.textContent = 'Something went wrong. Please try again or contact us directly.';
  }
});