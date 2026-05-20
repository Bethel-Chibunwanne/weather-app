
const body = document.querySelector('body');
const searchbar = document.querySelector('.search_area input');
const search_btn = document.querySelector('#search_btn');
const City_name = document.querySelector('#City_name');
const Country_name = document.querySelector('#Country_name');
const dates = document.querySelector('#dates');
const Temperature = document.querySelector('#Temperature');
const weather_status = document.querySelector('#weather_status');
const Feeling = document.querySelector('#Feeling');
const Humidity = document.querySelector('#Humidity');
const Wind = document.querySelector('#Wind');
const Visibility = document.querySelector('#Visibility');
const Pressure = document.querySelector('#Pressure');
const Sunrise = document.querySelector('#Sunrise');
const Sunset = document.querySelector('#Sunset');
const Cloud = document.querySelector('#Cloud');
const weather_icon = document.querySelector('.middle');


setInterval(() => {
    weatherData();


}, 60000);


let allCity = localStorage.getItem('allCity');
console.log(allCity);
searchbar.value = allCity;
body.classList.remove('clear', 'cloudy', 'storm', 'dark', 'rain')

// searchbar.value = '';
function loadedData() {
    let loadData = [Feeling, Humidity, Wind, Visibility, Pressure, Sunrise, Sunset, Cloud];
    loadData.forEach(load => {
        load.textContent = '-'
    });
    City_name.textContent = 'City';
    Country_name.textContent = 'Country';
    dates.textContent = 'Local country time';
    Temperature.textContent = '-°C';
    weather_status.textContent = 'L/W status';
    update.innerHTML = `<i class="fa-solid fa-rotate"></i> Last updated : -------------------`;
    err_info.style.display = 'none';
    
};
    err_info.style.display = 'none';
    searchbar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            console.log('Enter button clicked');
            weatherData();
            loadedData();
        }
    })

search_btn.addEventListener('click', ()=> {
   // let city = searchbar.value;
   console.log('search btn clicked');
   
   weatherData();
   loadedData();

});
    
   
    const api_key = 'ac4ac8e5ff3589a4db406f926cbda5f1';
   // console.log(city);
   
async function weatherData() {
    const city = searchbar.value;
    if (!city) {
        return
    }
       if (!navigator.onLine) {
   console.log('No internet connection');
     err_info.style.display = 'block';
    err_info.textContent = `Low or poor internet connection`;
        // body.style.background = 'blue';
                      
    } else {
        console.log('Internet restored');
     err_info.style.display = 'block';
    err_info.textContent = `Online `;
    }
        
    console.log(city);
    loading.style.display = 'block';

    // loadedData()
    let allCity = localStorage.getItem('city');
    localStorage.setItem('allCity', city);
    // console.log('All city : ', allCity);

    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    console.log(url);
    
    
try {
    const request = await fetch(url);
    if (!request.ok) {
        if (request.status === 404) {
           console.log('City not found !!!'); 
           err_info.style.display = 'block';
           err_info.textContent = `! City not found, Invalid city name !`;
           console.log(err_info.textContent);
           console.log(navigator.onLine);
           
           
        }
        

        if (request.status === 401) {
            console.log('Invalid api key');
            err_info.style.display = 'block';
           err_info.textContent = `! City not found, Invalid api key !`;
            
        }
        
        throw new Error("something went wrong")
    }
    
    const data = await request.json();
    loading.style.display = 'none';
    let cityName = data.name;
    let country = new Intl.DisplayNames(['en'], {type : 'region'});
    
    let countryName = country.of(data.sys.country);
    let now = new Date();
    let date_check = {
        day : now.toLocaleDateString('en-US', { weekday: 'long' }),
        month : now.toLocaleDateString('en-US', {month : 'long'}),
        dates : now.getDate(),
        year : now.getFullYear(),
        time : now.toLocaleTimeString('en-Us', {
            hour : '2-digit',
            minute : '2-digit',
        })
    
    };

    console.log(body.classList);
    
    let date = `${date_check.month} ${date_check.dates}, ${date_check.year} - ${date_check.time} `;
    let api_time = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    let localTime = new Date(
        api_time + (1000 * data.timezone)
    );

    let local_date = {
        day : localTime.toLocaleDateString('en-US', { weekday: 'long' }),
        month : localTime.toLocaleDateString('en-US', {month : 'long'}),
        dates : localTime.getDate(),
        year : localTime.getFullYear(),
        time : localTime.toLocaleTimeString('en-Us', {
            hour : '2-digit',
            minute : '2-digit',
        })
    
    };

    console.log(body.classList);
    
    let regionTime = `${local_date.day}, ${local_date.month} ${local_date.dates}, ${local_date.year} - ${local_date.time} `;


    let feeling = Math.round(data.main.feels_like) + '°C  ';
    let humidity = data.main.humidity + '%';
    let wind = data.wind.speed + ' m/s';
    let pressure = data.main.pressure + " hPa";
    let sunrise = new Date(data.sys.sunrise *1000).toLocaleTimeString('en-US', {
        hour : '2-digit',
        minute : '2-digit'
    });
    let sunset = new Date(data.sys.sunset *1000).toLocaleTimeString('en-US', {
        hour : '2-digit',
        minute : '2-digit'
    });
    let cloudiness = data.clouds.all + '%';
    let weather = data.weather[0].main;
    let realWeather = data.weather[0].description;
    if (weather === 'Clear' || realWeather.includes('clear sky') || realWeather.includes('few clouds')) {
        console.log('The weather is sunny');
        // body.classList.add('clear');
        // body.style.color = 'green';
        
        body.style.backgroundImage = "url('sea_bright.png')"
        
        weather_icon.innerHTML = `

    <svg width="180" height="180" viewBox="0 0 180 180"
    xmlns="http://www.w3.org/2000/svg">

        <defs>

            <!-- Glow -->
            <filter id="glow">

                <feGaussianBlur
                    stdDeviation="6"
                    result="blur"
                />

                <feMerge>

                    <feMergeNode in="blur"/>

                    <feMergeNode in="SourceGraphic"/>

                </feMerge>

            </filter>

            <!-- Sun Gradient -->
            <radialGradient id="sunGradient">

                <stop
                    offset="0%"
                    stop-color="#FFF8B0"
                />

                <stop
                    offset="60%"
                    stop-color="#FFD54F"
                />

                <stop
                    offset="100%"
                    stop-color="#FFB300"
                />

            </radialGradient>

        </defs>

        <!-- Rays -->
        <g
            stroke="#FFD54F"
            stroke-width="6"
            stroke-linecap="round"
            filter="url(#glow)"
        >

            <line x1="90" y1="15" x2="90" y2="40"/>

            <line x1="90" y1="140" x2="90" y2="165"/>

            <line x1="15" y1="90" x2="40" y2="90"/>

            <line x1="140" y1="90" x2="165" y2="90"/>

            <line x1="35" y1="35" x2="52" y2="52"/>

            <line x1="128" y1="128" x2="145" y2="145"/>

            <line x1="128" y1="52" x2="145" y2="35"/>

            <line x1="35" y1="145" x2="52" y2="128"/>

        </g>

        <!-- Main Sun -->
        <circle
            cx="90"
            cy="90"
            r="38"
            fill="url(#sunGradient)"
            filter="url(#glow)"
        />

        <!-- Reflection -->
        <circle
            cx="76"
            cy="74"
            r="10"
            fill="white"
            opacity="0.35"
        />

    </svg>

    `;
    }
    else if (weather === 'Clouds' || realWeather.includes('broken clouds') || realWeather.includes('overcast clouds')){
        console.log('The weather is Cloudy');
        body.classList.add('cloudy');
        // body.style.color = 'blue';
        body.style.backgroundImage = "url('sea_cloudy.png')";
            weather_icon.innerHTML = `

    <svg width="120" height="120" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">

        <circle cx="42" cy="58" r="18" fill="#E8EDF5"/>

        <circle cx="62" cy="50" r="24" fill="#F5F7FA"/>

        <circle cx="84" cy="60" r="16" fill="#DCE3EC"/>

        <rect
            x="40"
            y="58"
            width="46"
            height="20"
            rx="10"
            fill="#E8EDF5"
        />

    </svg>

    `;

        

    }
    else if(weather === 'Rain' || weather === 'Drizzle'){
        console.log('Its a raining weather');
        body.classList.add('rain');
        // body.style.color = 'purple';
        body.style.backgroundImage = "url('sea_rain.png')";
         weather_icon.innerHTML = `

    <svg width="120" height="120" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">

        <circle cx="42" cy="50" r="18" fill="#DCE3EC"/>

        <circle cx="62" cy="42" r="24" fill="#E8EDF5"/>

        <circle cx="84" cy="52" r="16" fill="#DCE3EC"/>

        <rect
            x="40"
            y="50"
            width="46"
            height="20"
            rx="10"
            fill="#E8EDF5"
        />

        <line
            x1="48"
            y1="82"
            x2="42"
            y2="98"
            stroke="#4FACFE"
            stroke-width="5"
            stroke-linecap="round"
        />

        <line
            x1="66"
            y1="82"
            x2="60"
            y2="98"
            stroke="#4FACFE"
            stroke-width="5"
            stroke-linecap="round"
        />

        <line
            x1="84"
            y1="82"
            x2="78"
            y2="98"
            stroke="#4FACFE"
            stroke-width="5"
            stroke-linecap="round"
        />

    </svg>

    `;
    }
    else if(weather === 'Thunderstorm') {
        console.log('Its a stormy weather');
        body.classList.add('storm');
        // body.style.color = 'red';
        body.style.backgroundImage = "url('sea_storm.png')";
         weather_icon.innerHTML = `

    <svg width="120" height="120" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">

        <circle cx="42" cy="50" r="18" fill="#8A94A6"/>

        <circle cx="62" cy="42" r="24" fill="#9AA4B2"/>

        <circle cx="84" cy="52" r="16" fill="#7E8797"/>

        <rect
            x="40"
            y="50"
            width="46"
            height="20"
            rx="10"
            fill="#9AA4B2"
        />

        <polygon
            points="60,72 50,92 63,92 55,108 80,82 67,82 75,72"
            fill="#FFD54F"
        />

    </svg>

    `;
    }
    else{
        // body.classList.add('dark')
        body.style.backgroundImage = "url('sea_dark.png')";
            weather_icon.innerHTML = `

    <svg width="120" height="120" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">

        <circle
            cx="65"
            cy="55"
            r="28"
            fill="#F5E6A8"
        />

        <circle
            cx="76"
            cy="46"
            r="28"
            fill="#0F172A"
        />

        <circle cx="30" cy="30" r="2" fill="white"/>
        <circle cx="85" cy="28" r="2" fill="white"/>
        <circle cx="96" cy="58" r="2" fill="white"/>
        <circle cx="26" cy="76" r="2" fill="white"/>

    </svg>

    `;

    }
    // else if(sunset){
    //     console.log('It is sunset');
        // body.classList.add('night')  
    // }
    
    let temperature = Math.round(data.main.temp) + '°C  ';
    
    let visibility = Math.round(data.visibility);
    if (visibility >= 1000) {
        visibility = (visibility / 1000).toFixed(1) + " km"
    }else{
        visibility = visibility + " m"
    }
    console.log(data);
    console.log('CityName : ', cityName);
    console.log('CountryName : ', countryName);
    console.log('Date : ', date);
    console.log('Feeling : ', feeling);
    console.log('Humidity : ', humidity);
    console.log('Wind : ', wind);
    console.log('Visibility : ', visibility);
    console.log('Sunrise : ', sunrise);
    console.log('Sunset : ', sunset);
    console.log('Pressure : ', pressure);
    console.log('Cloudiness : ', cloudiness);
    console.log('Weather : ', weather);
    console.log('Temperature : ', temperature);
    console.log('RealWeather : ', realWeather);
    console.log('CountryTime : ', regionTime);


    City_name.textContent = cityName;
    Country_name.textContent = countryName;
    dates.textContent = regionTime;
    Temperature.textContent = temperature;
    weather_status.textContent = realWeather;
    Feeling.textContent = feeling;
    Humidity.textContent = humidity;
    Wind.textContent = wind;
    Visibility.textContent = visibility;
    Pressure.textContent = pressure;
    Sunrise.textContent = sunrise;
    Sunset.textContent = sunset;
    Cloud.textContent = cloudiness;
    update.innerHTML = `<i class="fa-solid fa-rotate"></i> Last updated : ${date}`;


}

catch (err){
    console.log('Full Error', err)
    console.log('Error : ', err.message)
}
    
};

weatherData();


