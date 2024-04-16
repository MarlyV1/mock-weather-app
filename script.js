
const submit = document.getElementById("button")
const city = document.getElementById("city")
const key = `fe330accdd6c57ffe4bd2ac73c28c373`
const temperature  = document.getElementById("temp-div")
const weather = document.getElementById("weather-info")
const locationDisplayed = document.getElementById("location")
const weatherIcon = document.getElementById("weather-icon")
const dailyForecast =document.getElementById("daily-forecast")
// const playlist = document.getElementById("playlist")
// const secPlaylist = document.getElementById("second-playlist")
const playlist = document.querySelector(".playlist-one")
const secPlaylist = document.querySelector(".playlist-two")

const searchTitle = document.getElementById("music");
let search = '';



 // const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        // weatherIcon.setAttribute('src', weatherIconUrl);

const getWeather = () => {
   
    const cityName = city.value.trim();
    //  dt=new Date(1234567890 * 1000).toLocaleString()

    if(!cityName) alert("Please Enter a City");

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`

    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {

        locationDisplayed.innerHTML = `<h2>${data.name}, ${data.sys.country}</h2>`
        temperature.innerHTML = `
        <h4>Current Temp: ${data.main.temp}°F</h4>
        <h4>L: ${data.main.temp_min}°F | H: ${data.main.temp_max}°F</h4>
        `
        weather.innerHTML = `<p>${data.weather[0].description}</p>`
       
        // console.log(data)

        const code = data.weather[0].id;
        console.log(code)

        weatherCode(code);      
        
    }).catch (() => {
        console.error();
    })
}



function fiveDayForecast() {

        //  dt=new Date(1234567890 * 1000).toLocaleString()

    const cityName = city.value
    const forecastKey = 'c56024321501e8e5ba43555acb3aab75'

    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=orlando&appid=fe330accdd6c57ffe4bd2ac73c28c373&units=imperial`

    fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
        // const date = new Date((data.list[9].dt) * 1000)
        // console.log(data)
        // console.log(data.list[9].dt_txt)
        // console.log(data.list[9].dt)
        // console.log(date)

        const datesArray = [
            data.list[0],
            data.list[7],
            data.list[15],
            data.list[23],
            data.list[31],
            data.list[39]
        ]
        getDates(datesArray)
        console.log(data)
        console.log(datesArray)

    }).catch (() => {
        console.error
    })

}




function getDates(data) {

    const fiveDays = data;
    const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const month = ["Jan","Feb","March","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

        // const d = new Date();
        // let name = month[d.getMonth()];

    
    fiveDays.forEach(item => {
        const dateTime = new Date(item.dt_txt);
        // console.log(dateTime)

        // gets day of the month
        const days = dateTime.getDate();
        // console.log(days)

        
        const dayOfWeek = weekDays[dateTime.getDay()];
        // console.log(dayOfWeek)

        const monthDate = month[dateTime.getMonth()];
        // console.log(monthDate)

        console.log(`${dayOfWeek}, ${monthDate} ${days}`)
    });
}





submit.addEventListener("click", fiveDayForecast)


function weatherCode(code) {

    if(code >= 200 && code < 600) {
        console.log("it's raining")
        search = "rainy";
        // console.log(search)
        gettoken(search)
        searchTitle.style.display = 'block';

    } else if(code >= 600 && code < 700) {
        console.log("it's sonowing")
         search = "snowy";
        //  console.log(search)
        gettoken(search)
        searchTitle.style.display = 'block';


     }else if(code === 800){
        console.log("clear skies")
         search = "happy";
        // console.log(search)
        gettoken(search)
        searchTitle.style.display = 'block';


    }else if(code >= 801 && code < 805) {
        console.log("it's cloudy")

         search = "moody";
        //  console.log(search)
        gettoken(search)
        searchTitle.style.display = 'block';



    }
    // console.log(search)
    return search;

}



// submit.addEventListener("click",getWeather);



// const apiController = (function() {
    
    
// Function to get the authorization token for Spotify 
function gettoken(search) {

    const clientId = 'adda26d9e1f84220ae4acd844e4516f3';
    const clientSecret = '61627fc566894be5bf4cf0176b120df7';

    const url = `https://accounts.spotify.com/api/token`
        
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    }

    fetch(url, options) 
    .then (response => response.json())
    .then(data => {
        console.log (data.access_token);

        searchPlaylist(data.access_token, search);    
   }).catch (() => {
    console.error
   })
}
   
// gettoken();


function searchPlaylist(data, search) {
    
    //  searchTitle.style.display = 'block';
    // let limit = Math.floor(Math.random() * 10);
   
    //  replace happy with other weather condition based on weather code
    const playlistUrl = `https://api.spotify.com/v1/search?q=happy&type=playlist&limit=10&offset=0`;

    console.log(playlistUrl)

    const headerOption = {
        method: 'GET',
        headers: {
            Authorization : `Bearer ${data}`
        }
    }

    fetch(playlistUrl, headerOption)
    .then (response => response.json())
    .then (data => {
        // console.log(data)

        let randomNum = Math.floor(Math.random()*10)

        let randomNum2 = Math.floor(Math.random()*10)

        if (randomNum2 === randomNum) {
            randomNum2 = Math.floor(Math.random()*10)
        }

        const playlist1 = data.playlists.items[randomNum].id

        const playlist2 = data.playlists.items[randomNum2].id

        // console.log(data)
        // console.log(randomNum)
        // console.log(randomNum2)


        playlist.setAttribute("src", `https://open.spotify.com/embed/playlist/${playlist1}`)

        secPlaylist.setAttribute("src", `https://open.spotify.com/embed/playlist/${playlist2}`)


    }).catch (() => {
        console.error
    })
   
}

// submit.addEventListener("click", (event) => {
//     event.preventDefault;
// getWeather();
// });










// function displayPlaylist(data) {
//     console.log(data)
    
    // secPlaylist.setAttribute("src", `https://open.spotify.com/embed/playlist/${data}`)
    










        // const result = await fetch(`https://accounts.spotify.com/api/token`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/x-www-form-urlencoded',
        //         'Authorization' : 'Basic' + btoa(`${clientId} : ${clientSecret}`)
        //     },
        //     body: 'grant_type=client_credentials'
        // });

        // const data = await result.json();
        // return data.access_token;


// window.onSpotifyIframeApiReady = (IFrameAPI) => {
//     const element = document.getElementById('embed-iframe');
//     const options = {
//         uri: 'spotify:playlist:37i9dQZF1EIgG2NEOhqsD7'
//       };
//     const callback = (EmbedController) => {};
//     IFrameAPI.createController(element, options, callback);
//   };
  

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


// const url = 'https://spotify23.p.rapidapi.com/playlist/?id=37i9dQZF1DX4Wsb4d7NKfP';

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '8b10d21afamshd299eede6464078p166d75jsn4cc2d907aa96',
// 		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
// 	}
// }





