import React from 'react';

import Header from "../components/Header.js";

const weatherKey = 'bcfd0efd34f39086ca2622a1b67396a0';

function Home() {
  return (
    <>
      <Header />
      <main>
        <h2>Weather Data</h2>
        <p>Weather data displayed here</p>
      </main>
    </>
  );

}

export default Home;
