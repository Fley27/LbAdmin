// Using axios
const axios = require('axios');
axios.post('https://textbelt.com/text', {
  phone: '919168062866',
  message: 'Hello world',
  key: 'textbelt',
}).then(response => {
  console.log(response.data);
})