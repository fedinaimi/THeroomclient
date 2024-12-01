import React from 'react';
import '../styles/Contact.css';
import background from '../assets/background_nokey.png';


// Importation des composants et des icônes FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';

const Contact: React.FC = () => {
    return (
        <div className="contact-container"style={{ backgroundImage: `url(${background})` }}>
            <div className="contact-description">
                <h1>Contactez-nous</h1>
                <p>
                    Nous sommes heureux de vous aider ! Suivez-nous sur les réseaux sociaux pour rester informé 
                    de nos dernières nouvelles et événements. N'hésitez pas à nous contacter pour toute question 
                    ou demande d'information.
                </p>
            </div>

            <div className="social-links">
                <a href="https://www.facebook.com/theroomescapegame/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} className="social-icon" /> Facebook
                </a>
                <a href="https://www.instagram.com/the_room_escape_game/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className="social-icon" /> Instagram
                </a>
                <a href="info@escapium.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} className="social-icon" /> info@escapium.com
                </a>
                <a href="tel:+21625499810" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faPhone} className="social-icon" /> 25 499 810
                </a>
            </div>
        </div>
    );
};

export default Contact;
