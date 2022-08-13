// import throttle from 'lodash.throttle';
// HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>
// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

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
