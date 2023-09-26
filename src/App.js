import React, {useState} from 'react'
import axios from 'axios'
import RequestHistory from './RequestHistory';


function App() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [error, setError] = useState('');
    const [requestHistory, setRequestHistory] = useState([]);


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios
                .get(url)
                .then((response) => {
                    setData(response.data);
                    setRequestHistory((prevHistory) => [...prevHistory, location]);
                    setError('');
                    console.log(response.data);
                })
                .catch((error) => {
                    setError(<p className="history">Wrong city name</p>);
                    console.error(error);
                })
                .finally(() => {
                    setLocation('');
                });
        }
    }


    return (

        <div className="bigContener">
            <div className="app">
                <div className="search">
                    <input
                        value={location}

                        onChange={(e) => setLocation(e.target.value)}


                        onKeyPress={searchLocation}
                        placeholder='Enter Location'
                        type="text"/>
                    {error && <div className="error-message">{error}</div>}

                </div>
                <div className="container ">
                    <div className="top ">
                        <div className="location ">
                            <p>{data.name}</p>
                        </div>
                        <div className="temp">
                            {data.main ? <h1>{Math.round((+data.main.feels_like.toFixed() - 32) * 5 / 9)}°C</h1> : null}
                        </div>
                        <div className="description">
                            {data.weather ? <p>{data.weather[0].main}</p> : null}
                        </div>
                    </div>

                    {data.name !== undefined &&
                        <div className="bottom ">
                            <div className="feels">
                                {data.main ?
                                    <p className='bold'>{Math.round((+data.main.feels_like.toFixed() - 32) * 5 / 9)}°C</p> : null}
                                <p>Feels Like</p>
                            </div>
                            <div className="humidity">
                                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                                <p>Humidity</p>
                            </div>
                            <div className="wind">
                                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    }
                </div>


                <div className="container">
                    <p className="history">History:</p>
                    {requestHistory.length > 0 && (
                        <RequestHistory
                            history={requestHistory}
                            onHistoryItemClick={(selectedLocation) => {
                                setLocation(selectedLocation);
                                searchLocation({key: 'Enter'});
                            }}
                        />
                    )}
                    {error && <p>{error}</p>}

                </div>
            </div>
        </div>

    );
}


export default App;
