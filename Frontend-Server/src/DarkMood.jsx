import React, { useState } from "react";
import DayNightToggle from 'react-day-and-night-toggle';

const DarkMood = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const setDarkMode = () => {
        document.querySelector('body').style.backgroundColor = 'darkcyan ';
        setIsDarkMode(true);
    };

    const setLightMode = () => {
        document.querySelector('body').style.backgroundColor = 'white';
        setIsDarkMode(false);
    };

    const toggleTheme = () => {
        if (isDarkMode) {
            setLightMode();
        } else {
            setDarkMode();
        }
    };

    return (
        <>
            <div className={isDarkMode ? 'dark' : 'light'}>
                <DayNightToggle className=" position-absolute  end-0  me-5 px-5 mt-2  "
                    checked={isDarkMode}
                    onChange={toggleTheme}
                />
            </div>
        </>
    );
};

export default DarkMood;
