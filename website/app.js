// Personal API Key for OpenWeatherMap API
const baseURL = 'https://openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'eb8bf39a3a432dd3a2d2743f87965ee7&units=imperial';


/* Global Variables */
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const userFeelings = document.getElementById('user_feelings');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', ()=> {
    const userZip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    if (userZip && feeling !== 'default') {
        //api call
        getWeatherInfo(baseURL, userZip, apiKey)
        .then(data => {
            //call postWeather to send data to the server
            postWeatherData('http://localhost:5000/addWeatherInfo', data)
            .then(() => {
                //call update UI
                updateWebpage();
            })
        })
    } else {
        alert('Please enter a valid zip code and select a feeling.');
    }
});


/* Function to GET Web API Data*/
const getWeatherInfo = async (baseURL, userZip, Key) => {
  const res = await fetch(`${baseURL + userZip}${Key}`);
  try {
    const receivedData = await res.json();
    const temp = receivedData.main.temp;
    const name = receivedData.name;
     console.log(temp + " " + name); 
    return { temp: temp, name: receivedData.name }; 
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postWeatherData = async (url = 'http://localhost:5000/addWeatherInfo', data = {} ) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log(error);
    }
}

// Update UI
const updateWebpage = async () => {
    const request = await fetch('http://localhost:5000/all');
    try {
        const allData = await request.json();
        console.log(allData);
        dateElement.innerHTML = allData.date;
        tempElement.innerHTML = allData.temp;
        userFeelings.innerHTML = allData.user_feelings;
    } catch (error) {
        console.log(error);
    }
}
