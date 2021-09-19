// API KEy

const API_KEY = 'f582c9ba788ef167475bfc2a60bdabb4'

// Obtener datos del clima


const getWeather = async (position) => {

    try {

        const {latitude, longitude} = position.coords

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)

        const data = await res.json()

        console.log(data)

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
                descripcion: data.weather[0].main,
                icono: data.weather[0].icon
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
    time.innerText = `${clima.hora >= '8 : 00' || clima.hora <= '18 : 00' ? 'Day' : 'Night'} - ${clima.simple.descripcion}`

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

    if (clima.viento.direccion === 0 || clima.viento.direccion <= 45) {
        windDirection.style.transform = 'rotate(45deg)'
    } else if (clima.viento.direccion >= 46 || clima.viento.direccion <= 90) {
        windDirection.style.transform = 'rotate(90deg)'
    } else if (clima.viento.direccion >= 91 || clima.viento.direccion <= 135) {
        windDirection.style.transform = 'rotate(135deg)'
    } else if (clima.viento.direccion >= 136 || clima.viento.direccion <= 180) {
        windDirection.style.transform = 'rotate(180deg)'
    } else if (clima.viento.direccion >= 181 || clima.viento.direccion <= 225) {
        windDirection.style.transform = 'rotate(225deg)'
    }else if (clima.viento.direccion >= 226 || clima.viento.direccion <= 270) {
        windDirection.style.transform = 'rotate(270deg)'
    }else if (clima.viento.direccion >= 271 || clima.viento.direccion <= 315) {
        windDirection.style.transform = 'rotate(315deg)'
    } else if (clima.viento.direccion >= 316 || clima.viento.direccion <= 360) {
        windDirection.style.transform = 'rotate(360deg)'
    }

    const moon = document.querySelector('.moon')
    const sun = document.querySelector('.sun')

    if (clima.hora >= '8 : 00' || clima.hora <= '18 : 00') {
        sun.style.display = 'block'
    } else {
        moon.style.display = 'block'
    }


}

