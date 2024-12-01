import React from 'react';
import '../styles/About.css'; // Import your custom styles
import background from '../assets/background_nokey.png';


const About: React.FC = () => {
    return (
        <div className="about-container" style={{ backgroundImage: `url(${background})` }}>

            {/* Description Section */}
            <div className="about-description">
                
            <h1>A propos de THE ROOM</h1>
                <p>
                Bienvenue à The Room! Nous sommes situés au cœur de Menzah 7, où nous proposons des expériences uniques sous forme d'escape rooms. Notre équipe est dédiée à offrir un environnement excitant et immersif où vous pouvez résoudre des énigmes et vous amuser avec vos amis ou votre famille.                </p>
                <p>
                Notre établissement a été conçu pour offrir un mélange d'aventure, de défi et de divertissement. Nous sommes fiers de nos salles thématiques, parfaites pour des activités de team building, des fêtes d'anniversaire ou simplement une sortie amusante.                </p>
            </div>

            {/* Google Maps Embed Section */}
            <div className="google-maps">
                <h2>où vous pouvez nous trouver :</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.5314177232412!2d10.166353775560026!3d36.853696872232014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33563fb1afad%3A0xd1e0353f2a6e4df9!2sThe%20Room%20Escape%20Game!5e0!3m2!1sfr!2stn!4v1730732710972!5m2!1sfr!2stn"
                    width="600"
                    height="450"
                    style={{ border: 0 }} // Corrected style
                    allowFullScreen // React uses camelCase for boolean attributes
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default About;
