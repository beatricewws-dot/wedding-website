const form = document.querySelector('#rsvp-form');
const status = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const guestName = new FormData(form).get('name').trim();
  status.textContent = `Thank you, ${guestName}. Your RSVP is on its way to us.`;
  form.reset();
});