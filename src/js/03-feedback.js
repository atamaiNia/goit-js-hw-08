import throttle from 'lodash.throttle';
import storage from './storage';

const STORAGE_KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
loadPage();

formRef.addEventListener('input', throttle(onAddDataInput, 500));

function onAddDataInput(e) {
  const { name, value } = e.target;
  let savedData = storage.load(STORAGE_KEY);
  savedData = savedData ? savedData : {};
  savedData[name] = value;
  storage.save(STORAGE_KEY, savedData);
}

function loadPage() {
  const savedData = storage.load(STORAGE_KEY);

  if (savedData) {
    Object.entries(savedData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
}

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  console.log(e.currentTarget);
  const {
    elements: { email, message },
  } = e.currentTarget;

  if (email.value === '' || message.value === '') {
    return console.log('Please fill in all the fields!');
  }
  const formData = {
    email: email.value,
    message: message.value,
  };

  console.log(formData);
  storage.remove(STORAGE_KEY);
  e.currentTarget.reset();
}
