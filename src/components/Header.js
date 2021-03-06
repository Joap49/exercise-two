import React from 'react';
import WeatherImage from "./WeatherImage";

function Header(){
    return (
        <header className="Header">
            <div>
                <h1>Weather App</h1>
            </div>
            <nav>
                <a href="/?city=Copenhagen">Copenhagen</a>
                <a href="/?city=Milan">Milan</a>
                <a href="/?city=Shanghai">Shanghai</a>
                <a href="/?city=Miami">Miami</a>
            </nav>
      </header>
    );
}

export default Header;
    