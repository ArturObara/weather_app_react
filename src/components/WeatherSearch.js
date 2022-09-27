import React from 'react';
import './WeatherSearch.css';
import { useState } from 'react';
import WeatherInfo from './WeatherInfo';

const APIKEY = '02d7e4383a85a397592476421f1bc233';

const WeatherSearch = () => {
	const [city, setCity] = useState('');
	const [countryCode, setCountryCode] = useState('');
	const [weather, setWeather] = useState({});
	const [errText, setErrText] = useState('');

	const Search = (e) => {
		e.preventDefault();

		if ((e.key === 'Enter' || e.target.onclick !== null) && city !== ''){
			fetch(
				`http://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${APIKEY}`
			)
				.then((res) => {
					if (!res.ok) {
						throw Error('Nie znaleziono miasta');
					}
					return res.json();
				})
				.then((result) => {
					setWeather(result);
					setCity('');
					setCountryCode('');
					setErrText();
				})
				.catch((err) => {
					
					setErrText(err.message);
					setWeather({});
					setCity('');
					setCountryCode('');
				});

		}else if(e.key === 'Enter' || e.target.onclick !== null){
			setErrText('Wpisz miasto')
		}else{
			setErrText('')
		}
	};


	return (
		<>
			<form onKeyUp={Search}>
				<h1>Prognoza pogody na 5dni</h1>
				<div className='search-box'>
					<input
						type='text'
						className='input country'
						placeholder='Wpisz kod kraju'
						onChange={(e) => setCountryCode(e.target.value)}
						value={countryCode}
					/>
					<input
						type='text'
						className='input city'
						placeholder='Wpisz nazwę miasta'
						onChange={(e) => setCity(e.target.value)}
						value={city}
					/>
					<div className='error'>{errText}</div>
					<button className='search-button' onClick={Search}>
						Szukaj
					</button>
				</div>
			</form>

			{typeof weather.city != 'undefined' ? (
				<WeatherInfo weather={weather} />
			) : (
				''
			)}
		</>
	);
};

export default WeatherSearch;
