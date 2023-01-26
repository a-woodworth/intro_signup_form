const signupForm = document.forms['sevenDayTrial'];
const inputFields = [...document.querySelectorAll('#sevenDayTrial input')];

function validate(form) {
  const allValid = form.checkValidity();

  form.addEventListener('submit', (e) => {
    const allValid = form.checkValidity();

    if (!allValid) {
      e.preventDefault();
    }
  });
}

function getErrorMessage(input) {
  const validity = input.validity;
  const emptyString = input.value.trim() === '';

  // Custom messages
  if (validity.valueMissing || emptyString) return `${input.labels[0].innerText} cannot be empty`;
  if (validity.typeMismatch && input.id === 'email') return `Looks like this is not an email`;
}

inputFields.forEach(field => {
  field.addEventListener('blur', (e) => {
    const input = e.target;
    const value = input.value.trim();
    const errorID = `${input.id}-error`;
    const message = getErrorMessage(e.target);
    const messageDiv = document.getElementById(errorID);
    const validInput = e.target.checkValidity();

    if (!validInput || value === '') {
      // Set aria attribute on input field
      input.setAttribute('aria-invalid', true);

      // Add custom error message or use default message
      messageDiv.innerText = message || input.validationMessage;
    }
  });

  field.addEventListener('input', (e) => {
    const input = e.target;
    const validInput = e.target.checkValidity();

    if (validInput) {
      // Remove aria attribute on input field
      input.removeAttribute('aria-invalid', true);
    }
  });
});

validate(signupForm);
