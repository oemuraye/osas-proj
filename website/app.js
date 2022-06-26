/* Global Variables */
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const userFeelings = document.getElementById('user_feelings');

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://openweathermap.org/data/2.5/weather?zip=';
// const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=';
const apiKey = 'eb8bf39a3a432dd3a2d2743f87965ee7';

// document.getElementById("generate").addEventListener("click", () => {alert('shdsid')});

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', ()=> {
    const userZip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
   //api call
   getWeatherInfo(baseURL, userZip, apiKey)
   .then((data)=>{
       //call postWeather to send data to the server
       postWeatherData('/addWeatherInfo', {temp: data, date: newDate, feeling: feeling})
   })
   //call update UI
   .then(()=>updateUI());
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
const updateUI = async () => {
    const request = await fetch('http://localhost:5000/all');
    try {
        const allData = await request.json();
        console.log(allData);
        dateElement.textContent = allData.date;
        tempElement.textContent = allData.temp;
        userFeelings.textContent = allData.user_feelings;
    } catch (error) {
        console.log(error);
    }
}
