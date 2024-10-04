import React, { useState } from 'react';
import '../Components/Style1.css'
const App = () => {
  let api = {
    apikey: "c11d69e541d28ce9f2230ee2c02ffbb2",
    url: "https://api.openweathermap.org/data/2.5/weather",
  };
  let [weather, setWeather] = useState({});
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(false); 
  let [error, setError] = useState(false);     
  function searchWeather() {
    setLoading(true);   
    fetch(`${api.url}?q=${search}&appid=${api.apikey}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") { 
          setError(true);
          setWeather({});
        } else {
          setWeather(data);
          setError(false);
        }
        setLoading(false);  
      })
      .catch((err) => {
        console.error(err);
        setError(true); 
        setLoading(false);  
      });
  }
  let usingKey = (e) => {
    if (e.key === 'Enter') {
      searchWeather();
    }
  };
  return (
    <div>
      <section>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={usingKey}
        />
        <button onClick={searchWeather}>Search</button>
      </section>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p>No Data Found</p>
          ) : (
            weather.main && (
              <>
                <h3>{weather.name}</h3>
                <p>{weather.main.temp}°C</p>
              </>
            )
          )}
        </>
      )}
    </div>
  );
};
export default App;









