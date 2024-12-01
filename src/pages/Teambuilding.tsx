import React, { useEffect } from 'react';
import '../styles/Teambuilding.css';
import background from '../assets/background_nokey.png';

const TeamBuilding: React.FC = () => {
    useEffect(() => {
        const loadInstagramScript = () => {
            // Dynamically load Instagram's embed script
            const script = document.createElement('script');
            script.async = true;
            script.src = '//www.instagram.com/embed.js';
            document.body.appendChild(script);

            // Clean up script after usage
            return () => {
                document.body.removeChild(script);
            };
        };

        // Load the script initially
        const cleanup = loadInstagramScript();

        // Re-load script when window is resized
        const handleResize = () => {
            cleanup();
            loadInstagramScript();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            cleanup();
        };
    }, []);

    return (
        <div className="team-container" style={{ backgroundImage: `url(${background})` }}>
            {/* Description Section */}
            <div className="team-description">
                <h1>Team Building chez The Room</h1>
                <p>Renforcez la cohésion de votre équipe avec une expérience immersive. Nos escape rooms favorisent la communication, la collaboration et la résolution de problèmes dans un cadre ludique et stimulant. Un moment inoubliable pour développer l’esprit d’équipe !
                </p>
            </div>

            {/* Instagram Embed Section */}
            <div className="team-embed">
                <blockquote
                    className="instagram-media"
                    data-instgrm-permalink="https://www.instagram.com/p/BvBv1RFnXsI/?utm_source=ig_embed&amp;utm_campaign=loading"
                    data-instgrm-version="14"
                >
                </blockquote>
            </div>
        </div>
    );
};

export default TeamBuilding;
