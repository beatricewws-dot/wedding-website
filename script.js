const form = document.querySelector('#rsvp-form');
const status = document.querySelector('#form-status');
const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxDMeWNQC_hT1p3hCN6zgAYcY8qRZhya9TdGy8sGYaV6bepvZtGJ0h31ZghZu7JEIzq/exec';

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