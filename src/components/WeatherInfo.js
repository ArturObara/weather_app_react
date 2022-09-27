import React from 'react';
import './WeatherInfo.css';

const WeatherInfo = ({ weather }) => {
	let currentTime = new Date().toLocaleString();

	return (
		<div className='weather-info'>
			<div className='currentData'>
				<div className='city-country'>
					Miasto: {weather.city.name} {weather.city.country}
				</div>
				<div className='temp'>
					Temperatura: {Math.floor(weather.list[0].main.temp)}°C
				</div>
				<div className='humidity'>
					Wilgotność: {weather.list[0].main.humidity}%
				</div>
				<div className='date'>{currentTime}</div>
			</div>
			<div className='temp-list'>
				{weather.list.map((el, id) => (
					<li key={id}>
						{el.dt_txt} Temperatura: {Math.floor(el.main.temp)}°C
					</li>
				))}
			</div>
		</div>
	);
};

export default WeatherInfo;
