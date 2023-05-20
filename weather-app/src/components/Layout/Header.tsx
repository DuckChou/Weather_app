import React, { useEffect, useRef, useState } from 'react';
import logoSrc from '../../assets/images/logo.png';
import axios from 'axios';
import { url } from '../../store/api';
import { changeCity,loading } from '../../store/WeatherSlice';
import { useAppDispatch } from '../../store/store';

interface SearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state: string;
}

function Header() {
  const [search, setSearch] = useState<string>('');
  const [searchView, setSearchView] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    searchTimeout.current && clearTimeout(searchTimeout.current);

    if (search === '') {
      setIsSearching(false);
      setSearchResult([]);
    } else {
      setIsSearching(true);
      searchTimeout.current = setTimeout(() => {
        searchCity(search);
        setIsSearching(false);
      }, 500);
    }
  }, [search, searchTimeout]);

  const toggleNewCityHandler = (lat: number, lon: number, city: string) => {
    dispatch(changeCity({ lat: lat, lon: lon, city: city }));
    setSearch('');
    setSearchView(false);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleSearchViewHandler = () => {
    setSearchView(!searchView);
  };

  const searchCity = async (city: string) => {
    const result = await axios.get(url.geo(city));
    setSearchResult(result.data);
  };

  const currentLocationHandler = () => {
    dispatch(loading());
    window.navigator.geolocation.getCurrentPosition(res =>{
      const {latitude, longitude} = res.coords;
      console.log(latitude, longitude);
      updateCurrentLocation(latitude.toString(),longitude.toString());
    
    },err=>{})


  }

  const updateCurrentLocation = async(lat:string,lon:string) => {
    const response = await axios.get(url.currentWeather('lat='+lat,'lon='+lon));
    const {name} = response.data;
    dispatch(changeCity({lat:parseFloat(lat),lon:parseFloat(lon),city:name}));
  }

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logoSrc} width="364" height="58" alt="logo" />
        </div>

        <div className={searchView ? 'search-view active' : 'search-view'}>
          <div className="search-wrapper">
            <input
              type="search"
              name="search"
              placeholder="Search city..."
              autoComplete="off"
              className={
                isSearching ? 'search-field searching' : 'search-field'
              }
              data-search-field
              value={search}
              onChange={searchHandler}
            />
            <span className="m-icon leading-icon">search</span>
            <button
              className="icon-btn leading-icon has-state"
              aria-label="close search"
              onClick={toggleSearchViewHandler}
            >
              <span className="m-icon">arrow_back</span>
            </button>
          </div>
          <div
            className={
              search === '' ? 'display' : 'search-result active dropdown'
            }
          >
            <ul className="view-list">
              {searchResult.map((item, index) => (
                <li
                  className="view-item"
                  key={index}
                  onClick={() =>
                    toggleNewCityHandler(item.lat, item.lon, item.name)
                  }
                >
                  <span className="m-icon">location_on</span>
                  <div>
                    <p className="item-title">{item.name}</p>
                    <p className="Label-2 item-subtitle">
                      {item.state || ''} {item.country}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="icon-btn has-state"
            aria-label="open search"
            data-search-toggler
            onClick={toggleSearchViewHandler}
          >
            <span className="m-icon icon">search</span>
          </button>

          <button
            className="btn-primary has-state"
            onClick={currentLocationHandler}
          >
            <span className="m-icon">my_location</span>

            <span className="span">Current Location</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
