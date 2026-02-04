import React from 'react';
import './styles/Loader.css';

const Loader = ({ theme = 'dark' }) => {
    const barColor = theme === 'dark' ? 'bg-gray-400' : 'bg-white';

    return (
        <div className="loader">
            {[...Array(12)].map((_, index) => (
                <div key={index} className={`bar${index + 1} ${barColor}`}></div>
            ))}
        </div>
    );
};

export default Loader;
