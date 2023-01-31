import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form  textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

const savedValues = localStorage.getItem(STORAGE_KEY);
const savedDataObject = JSON.parse(savedValues);

let formData = {};

refs.form.addEventListener('input', throttle(storageFormData, 500));
refs.form.addEventListener('submit', onFormSubmit);

reloadPage();

function storageFormData(evt) {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedData);

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function reloadPage() {
  if (savedValues) {
    refs.input.value = savedDataObject.email || '';
    refs.textarea.value = savedDataObject.message || '';
  }
}
