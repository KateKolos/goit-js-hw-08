import throttle from 'lodash.throttle';

refs = {
  inputForm: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('.feedback-form input'),
  messageInput: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

refs.form.addEventListener('input', onInputChange);
refs.form.addEventListener('submit', onFormSubmit);

function onInputChange(evt) {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  e.preventDefault();
}
