import React, { useState } from 'react'
import axios from 'axios'
import { Input, Card, Skeleton } from 'antd'
import styled from 'styled-components'

const { Search } = Input;
const MIN_LENGTH_TO_START_SEARCH = 3

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: fit-content(100px) fit-content(100px) 1fr;
  grid-row-gap: 20px;
  max-width: 600px;
  padding: 50px;
`

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSearch = value => {
    if (value.length >= MIN_LENGTH_TO_START_SEARCH) {
      setLoading(true)
      axios.get(`/api/v1/weather/search/${value}`)
        .then(res => {
          setLoading(false)
          setWeatherInfo(res.data)
        })
    }
  }

  return (
    <Wrapper>
      <h2>GNT Weather App</h2>
      <Search
        placeholder="Input the name of a city (eg: San Francisco)"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      {
        loading && (
          <Card
            hoverable
          >
            <Skeleton loading={true} active />
          </Card>
        )
      }
      {
        !loading && weatherInfo && (
          <Card
            hoverable
            cover={<img alt="weather"
              src={`https://www.metaweather.com/static/img/weather/${weatherInfo.weather.weather_state_abbr}.svg`}
              style={{ padding: 30 }} />}
          >
            <h1>{weatherInfo.name}</h1>
            <h2>{weatherInfo.weather.the_temp} C</h2>
            <h4>Min: {weatherInfo.weather.min_temp} C</h4>
            <h4>Max: {weatherInfo.weather.max_temp} C</h4>
            <h4>Humidity: {weatherInfo.weather.humidity}%</h4>
          </Card>
        )
      }
    </Wrapper>
  );
}

export default App;
