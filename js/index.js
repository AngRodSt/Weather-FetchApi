const form = document.querySelector('#weather_form')
const result = document.querySelector('#result')
const container = document.querySelector('#container')


form.addEventListener('submit', Validation);

function Validation(e) {
    e.preventDefault()
    const city = document.querySelector('#city-input').value;
    const country = document.querySelector('#country-select').value;
    if (city === '' || country === '') {
        ErrorNotification('All the field are mandatory');
        return;
    }
    Spinner();
    getWeather(city, country);

}

function getWeather(city, country) {

    const apiKey = 'e5287739e7c0b2d4b021f0160d0b5058';

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
   
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            clearHTML()
            if (data.cod === '404') {
                ErrorNotification("The city doesn't exist")
                return;
            }
            showTemperature(data)
        })
        


}

function showTemperature(data){
    const {name, main:{temp, temp_min, temp_max}} = data;
    

    const celsius = celsiusConverter(temp);
    const max = celsiusConverter(temp_max);
    const min = celsiusConverter(temp_min);

    const cityName = document.createElement('p');
    cityName.textContent = `Weather in ${name}`;
    cityName.classList.add('font-bold', 'text-2xl');

    const celsiusHTML = document.createElement('p');
    celsiusHTML.innerHTML = `${celsius} &#8451;`
    celsiusHTML.classList.add('font-bold', 'text-6xl')

    const maxHTML = document.createElement('p');
    maxHTML.innerHTML = `Max: ${max} &#8451;`
    maxHTML.classList.add('text-xl')

    const minHTML = document.createElement('p');
    minHTML.innerHTML = `Min: ${min} &#8451;`
    minHTML.classList.add('text-xl')

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('text-center', 'text-white');

    resultDiv.appendChild(cityName)
    resultDiv.appendChild(celsiusHTML)
    resultDiv.appendChild(maxHTML)
    resultDiv.appendChild(minHTML)

    result.appendChild(resultDiv)
    
}

const celsiusConverter = temperature => parseInt(temperature - 273.15);

function clearHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild)
    }
}

function ErrorNotification(messege) {
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')

        alerta.innerHTML = `
            <strong class = "font-bold">Error!</strong>
            <span class = "block">${messege}</span>
        `;

        container.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}

function Spinner(){
    clearHTML()

    const spinner = document.createElement('Div');
    spinner.classList.add('sk-chase', 'mx-auto')
    spinner.innerHTML = `
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    `
    result.appendChild(spinner)
}