import './App.css';
import React, { useState, useEffect } from "react";

import axios from "axios"
import Starredrepos from './components/StarredRepos/StarredRepos';
function App() {

  const [starredRepos, setStarredRepos] = useState([])
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([])


  useEffect(() => {
    fetchStarredRepos()
    fetchFavorites()
  }, [])

  function fetchFavorites() {
    let localStorageFavorites = localStorage.getItem("favorites");
    if (!localStorageFavorites) {
      localStorage.setItem("favorites", JSON.stringify({}))
    }
    setFavorites(JSON.parse(localStorageFavorites))
  }
  async function fetchStarredRepos() {
    const _2digits = (number) => {
      if (number < 10) {
        return `0${number}`
      }
      return `${number}`
    }
    let days = 7
    let todayInMilliseconds = new Date().getTime();
    let daysAgoInMilliseconds = days * 24 * 60 * 60 * 1000;
    let dateDaysBefore = new Date(todayInMilliseconds - daysAgoInMilliseconds);
    let date = `${dateDaysBefore.getFullYear()}-${_2digits(dateDaysBefore.getMonth() + 1)}-${_2digits(dateDaysBefore.getDate())}`;
    setLoading(true)
    const url = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc`;
    try {
      const { data } = await axios.get(url)
      console.log(data)
      setStarredRepos(data.items)
    } catch (error) {
      console.log(error)
      alert("Could not fetch repositories");
    } finally {
      setLoading(false)
    }

    // console.log(date)
  }

  function toggleFavorite(starredRepo) {
    // get localStorage saved repo
    let localStorageFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    if (localStorageFavorites.hasOwnProperty(starredRepo.id)) {
      // then we unfavorite the entry
      delete localStorageFavorites[starredRepo.id]
    } else {
      localStorageFavorites[starredRepo.id] = starredRepo
    }

    localStorage.setItem('favorites', JSON.stringify(localStorageFavorites));
    setFavorites(localStorageFavorites)

  }
  return (
    <div className="App">
      {
        loading && <p>loading ...</p>
      }
      <Starredrepos starredRepos={starredRepos} toggleFavorite={toggleFavorite} favorites={favorites} />
    </div>
  );
}

export default App;
