// src/pages/Loading.tsx
import React, { useEffect, useState } from 'react';
import '../styles/Loading.css'; // Import your styles
import videoSrc from '../assets/waiting_2.mp4'; // Import your video

const Loading: React.FC<{ onComplete: () => void; }> = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false); // Local state to control video fade out

    useEffect(() => {
        // Set a timer to trigger fade-out after a specified duration
        const timer = setTimeout(() => {
            setFadeOut(true); // Start fade-out effect
            setTimeout(onComplete, 1000); // Wait for fade-out duration before calling onComplete
        }, 3000); // Adjust loading duration here

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [onComplete]);

    return (
        <div className="loading-container">
            <video className={`loading-video ${fadeOut ? 'fade-out' : ''}`} autoPlay loop muted>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Loading;
