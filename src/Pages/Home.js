import React, {useState} from "react"
import {GET_WEATHER_QUERY} from '../Graphql/Query'
import {useLazyQuery} from "@apollo/client"

function Home(){

  const [citySearched, setCitySearched] = useState('')

  const [getWeather, {data, error} ] = useLazyQuery(
    GET_WEATHER_QUERY,
    { variables: { name: citySearched } }
  );

  if (error) return <h2>Error</h2>
  
  if (data) {
    console.log(data);
  }

  return(
    <div>
      <div className="Home">
        <h1>Search For Weather</h1>
        <input type="text" placeholder="Enter Here..." onChange={(event) => setCitySearched(event.target.value)}/>
        <button onClick={() => getWeather()}>Search</button>
      </div>
      <div className="weather">
          {data && (
            <>
              <h1> {data.getCityByName.name} </h1>
              <h1>
                Temperature: {data.getCityByName.weather.temperature.actual}
              </h1>
              <h1>
                Description: {data.getCityByName.weather.summary.description}
              </h1>
              <h1>Wind Speed: {data.getCityByName.weather.wind.speed}</h1>
            </>
          )}
      </div>
    </div>
  )
}
export default Home;