const signupForm = document.forms['sevenDayTrial'];
const inputFields = [...document.querySelectorAll('#sevenDayTrial input')];

function getErrorMessage(input) {
  const validity = input.validity;
  const emptyString = input.value.trim() === '';

  // Custom messages
  if (validity.valueMissing || emptyString) {
    return `${input.labels[0].innerText} cannot be empty`;
  }
  if (validity.typeMismatch && input.id === 'email') {
    return `Looks like this is not an email`;
  }
}

function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();
  const message = getErrorMessage(input);
  const errorID = `${input.id}-error`;
  const messageDiv = document.getElementById(errorID);
  const validInput = input.checkValidity();

  if (!validInput || value === '') {
    // Set aria attribute on input field
    input.setAttribute('aria-invalid', true);
    input.setAttribute('aria-live', 'polite');

    // Add custom error message or use default message
    messageDiv.innerText = message || input.validationMessage;
  }
}

function validate(form) {
  const allValid = form.checkValidity();

  form.addEventListener('submit', (e) => {
    const allValid = form.checkValidity();

    if (!allValid) {
      e.preventDefault();

      // If form submitted before all inputs complete, show empty input errors
      const noValues = inputFields.filter(input => input.value.trim() === '');

      noValues.forEach(input => {
        // Set aria attribute on input field
        input.setAttribute('aria-invalid', true);
        input.setAttribute('aria-live', 'polite');

        // Show error message
        const error = document.getElementById(`${input.id}-error`);
        error.innerText = getErrorMessage(input);
      });
      
      // Direct focus to first input error
      const errorArray = [...document.querySelectorAll('[aria-invalid="true"]')];
      errorArray[0].focus();
    }
  });

  // Check for errors on exiting input field
  inputFields.forEach(input => {
    input.addEventListener('blur', (e) => {
      validateInput(e);
    });
  });

  // Check for error corrections
  inputFields.forEach(input => {
    input.addEventListener('input', (e) => {
      const valid = input.checkValidity();

      if (valid) {
        // Remove aria attribute on input field
        input.setAttribute('aria-invalid', false);
        input.removeAttribute('aria-live', 'polite');

        // Remove error message
        document.getElementById(`${input.id}-error`).innerText = '';
      }
    });
  });
}

validate(signupForm);
