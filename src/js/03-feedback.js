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

addEventListeners();
onBtnActive();
reloadPage();

function addEventListeners() {
  refs.form.addEventListener('input', throttle(storageFormData, 500));
  refs.form.addEventListener('submit', onFormSubmit);
}

function storageFormData(evt) {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

  onBtnActive();
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedData);

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  formData = {};

  onBtnActive();
}

function reloadPage() {
  if (savedValues) {
    refs.input.value = savedDataObject.email || '';
    refs.textarea.value = savedDataObject.message || '';

    fillFormDataAfterReload(savedDataObject);
  }
}

function fillFormDataAfterReload(localStorageObject) {
  formData['email'] = localStorageObject.email;
  formData['message'] = localStorageObject.message;
}

function onBtnActive() {
  const submitBtn = document.querySelector('button[type=submit]');
  if (refs.input.value !== '' && refs.textarea.value !== '') {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}
