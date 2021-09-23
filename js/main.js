// API KEy

const API_KEY = 'f582c9ba788ef167475bfc2a60bdabb4'

// Obtener datos del clima


const getWeather = async (position) => {

    try {

        const {latitude, longitude} = position.coords

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)

        const data = await res.json()

        const clima = {
            ciudad: data.name,
            fecha: getFecha(),
            hora: getHora(),
            temperatura: parseFloat(data.main.temp - 273.15).toFixed(1),
            temperaturaMAX: parseFloat(data.main.temp_max - 273.15).toFixed(1),
            temperaturaMIN: parseFloat(data.main.temp_min - 273.15).toFixed(1),
            humedad: data.main.humidity,
            viento:{
              velocidad: parseFloat(data.wind.speed * 1.60934).toFixed(1),
              direccion: data.wind.deg  
            },
            simple: {
                id: data.weather[0].id,
                descripcion: data.weather[0].main
            }
        }

        console.log(clima)

        showDatos(clima)

    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
      
}


// Obtener localizacion

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(getWeather)
}

// Obtener fecha

const getFecha = () => {
    let fecha = new Date();
    return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
}

// Obtener hora 

const getHora = () => {
    let hoy = new Date() 
    return `${hoy.getHours()} : ${hoy.getMinutes()}`
}

// Mostrar los datos

const showDatos = (clima) =>{

    const fecha = document.querySelector('.date_now')
    fecha.innerText = clima.fecha

    const title = document.querySelector('.city-title')
    title.innerText = clima.ciudad

    const time = document.querySelector('.time')
    time.innerText = `${clima.hora >= '8 : 00' || clima.hora <= '19 : 00' ? 'Day' : 'Night'} - ${clima.simple.descripcion}`

    const temperature = document.querySelector('.temperature')
    temperature.innerText =  `${clima.temperatura}°`

    const temperatureMAX = document.querySelector('.temp-minmax__max')
    temperatureMAX.innerText = `MAX: ${clima.temperaturaMAX}°`
    const temperatureMIN = document.querySelector('.temp-minmax__min')
    temperatureMIN.innerText = `MIN: ${clima.temperaturaMIN}°`

    const humidity = document.querySelector('.humidity_percentage')
    humidity.innerText = `${clima.humedad}%`

    const windSpeed = document.querySelector('.wind_velocity')
    windSpeed.innerText = `${clima.viento.velocidad} km/h`

    const windDirection = document.querySelector('.triangle')
    windDirection.style.transform = `rotate(${clima.viento.direccion}deg)`
    
    
    
    const sun = document.querySelector('.sun')
    const suncloud = document.querySelector('.suncloud')
    const clouds = document.querySelector('.clouds')
    const rain = document.querySelector('.rain')
    const thunderstorm = document.querySelector('.thunderstorm')
    const snow = document.querySelector('.snow')
    const fog = document.querySelector('.fog')
    const moon = document.querySelector('.moon')
    const mooncloud = document.querySelector('.mooncloud')

    if (clima.hora >= '8 : 00' && clima.hora <= '19 : 00' && clima.simple.id === 800) {
        sun.style.display = 'block'
    } else if (clima.hora >= '8 : 00' && clima.hora <= '19 : 00' && clima.simple.id === 801){
        suncloud.style.display = 'block'
    } else if (clima.simple.id >= 802 && clima.simple.id <= 804) {
        clouds.style.display = 'block'
    } else if (clima.simple.id >= 500 && clima.simple.id <= 531) {
        rain.style.display = 'block'
    } else if (clima.simple.id >= 200 && clima.simple.id <= 232) {
        thunderstorm.style.display = 'block'
    } else if (clima.simple.id >= 600 && clima.simple.id <= 622) {
        snow.style.display = 'block'
    } else if (clima.simple.id >= 701 && clima.simple.id <= 781) {
        fog.style.display = 'block'
    } else if (clima.hora >= '20 : 00' || clima.hora <= '7 : 00' && clima.simple.id === 800) {
        moon.style.display = 'block'
    } else if (clima.hora >= '20 : 00' || clima.hora <= '7 : 00' && clima.simple.id === 801) {
        mooncloud.style.display = 'block'
    }

    const mainContainer = document.querySelector('.main-container')

    if (clima.hora >= '20 : 00' && clima.hora <= '7 : 00') {
        mainContainer.style.backgroundColor = '#171717'
    }

    cleanUp()
}

const cleanUp = () =>{
    const container = document.getElementById('container')
    const loader = document.getElementById('loader')

    loader.style.display = 'none'
    container.style.display = 'block'
   
}

