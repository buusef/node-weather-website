console.log('Client side js is loaded..!');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const par1 = document.querySelector('#par1');
const par2 = document.querySelector('#par2');


weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    par1.textContent = 'Loading...';
    par2.textContent = '';
    const location = search.value;
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error) {
            par1.textContent = data.error;
        } else {
            par1.textContent = `The weather is ${data.weatherCondition} and the temperature is ${data.temperature} but feels like ${data.feelsLike} and humidity is ${data.humidity}`;
            par2.textContent = data.location;
        }
    });
});
});

