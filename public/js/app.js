// this is client side javascript
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


const searchLocation = (location) => {
  messageOne.textContent = '...Loading Contents';

  fetch(`http://localhost:3000/weather?address=${location}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.error) {
      messageTwo.textContent = data.error;
    } else {
      messageTwo.textContent = `${data.location}, ${data.forecast}`;
    }

    messageOne.textContent = '';
  });

};

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  searchLocation(searchElement.value);
});