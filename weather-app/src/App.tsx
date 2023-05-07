import React from 'react';
import './assets/scss/style.scss';
import Header from './components/Layout/Header';
import WeatherScreen from './screens/WeatherScreen';


function App() {
  return (
    <div>
      <Header />
      <WeatherScreen />
    </div>
  );
}

export default App;
