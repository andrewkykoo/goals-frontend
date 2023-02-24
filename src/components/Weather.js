import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Image, HStack, Text } from '@chakra-ui/react';

const Weather = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log('result: ', result);
        });
    };
    fetchData();
  }, [lat, long]);

  const imgUrl = data.main
    ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : '';

  return (
    <div>
      {data.main ? (
        <>
          <p>
            {data.name}, {data.sys.country}
          </p>
          <p>
            {moment().format('dddd')}, {moment().format('LL')}
          </p>
          <HStack>
            <HStack>
              <Text>Temperature: {Math.round(data.main.temp)} C</Text>
            </HStack>
            <HStack>
              <p>Feels like: {Math.round(data.main.feels_like)} C</p>
            </HStack>
          </HStack>
          <HStack>
            <p>Condition: {data.weather[0].main}</p>
            <Image src={imgUrl} boxSize='25px' />
          </HStack>
        </>
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
};

export default Weather;
