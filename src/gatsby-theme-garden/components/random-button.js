import React, { useState } from "react";
import { navigate } from "gatsby";

import "./random-button.css";

const RandomButton = () => {
    
    return (
        <React.Fragment>
            <button
                title="Move Random Wiki"
                aria-label="Move Random Wiki"
                className="random-button"
                onClick={() => window.location.href = '/wiki-index/#random' }
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 30 30"
                >
                    <g>
                    <path d="M16,11H6c-2.8,0-5,2.2-5,5v10c0,2.8,2.2,5,5,5h10c2.8,0,5-2.2,5-5V16C21,13.2,18.8,11,16,11z M7,15c1.1,0,2,0.9,2,2  s-0.9,2-2,2s-2-0.9-2-2S5.9,15,7,15z M7,27c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S8.1,27,7,27z M11,23c-1.1,0-2-0.9-2-2s0.9-2,2-2  s2,0.9,2,2S12.1,23,11,23z M15,27c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S16.1,27,15,27z M15,19c-1.1,0-2-0.9-2-2s0.9-2,2-2  s2,0.9,2,2S16.1,19,15,19z"/>
                    <path d="M26,1H16c-2.8,0-5,2.2-5,5v3h5c3.9,0,7,3.1,7,7v5h3c2.8,0,5-2.2,5-5V6C31,3.2,28.8,1,26,1z M25,9c-1.1,0-2-0.9-2-2  s0.9-2,2-2s2,0.9,2,2S26.1,9,25,9z"/>
                    </g>
                </svg>
            </button>
        </React.Fragment>
    );
};

export default RandomButton;