import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background_nokey.png';
import '../styles/PiratesEscapeRoom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';




const pirateEscapeRoom: React.FC = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    // Function to handle the reservation button click
    const handleReservationClick = () => {
        navigate('/reservation', { state: { selectedScenario: 'Pirates of the Caribbean' } });
    };
    return (
        <div className="pirate-container_big"style={{ backgroundImage: `url(${background})` }}>
        
        
          <h1 className="pirate-title">Pirates of the Carribean</h1>
      <div className="escape-room">
        <img src="src/assets/pirate.png" alt="pirate" className='img'/>
        <div className="details">
          <h2>Pirates of the Carribean</h2>
          <ul>
            <li><img src="src/assets/logoPersonne.png" alt="Logo 1" className="logo"/>2-7 Joueurs</li>
            <li><img src="src/assets/logoMinuteur.png" alt="Logo 1" className="logo"/>60 Minutes</li>
            <li><img src="src/assets/logoLieux.png" alt="Logo 1" className="logo"/>Menzah7</li>
          </ul>
          <div className="parent-container-arrow">
          <FontAwesomeIcon icon={faChevronDown} className="chapter-arrow" />
          </div>
          
          
          <div className="button-container">
          <button className="reserve-button" onClick={handleReservationClick}>Réserver Maintenant</button>
          </div>
        </div>
      </div>
    <ul className="info-list">
      <li><img src="src/assets/logoPersonne.png" alt="Logo 1" className="logo"/> 2-8 Joueurs</li>
      <li> <FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starBlack'/><FontAwesomeIcon icon={faStar} className='starBlack'/> Difficulté</li>
      <li><img src="src/assets/logoMinuteur.png" alt="Logo 3" className="logo"/> 60 Minutes</li>
    </ul>
    <div className='textBottompirate'>
      <p className="pirate-description">
      Vous êtes un groupe d’aventuriers, vous vous retrouvez à bord du fameux bateau du pirate « Barbe Noire » que le monde pensait englouti dans les mers des caraïbes. Vous vous en précipitez pour l’explorer de fond en comble et chercher le fameux trésor des lingots d’or quand soudain le piège se ferme sur vous. Sauriez-vous vous emparer du trésor et vous sauvez dans les temps ?      </p>
      </div>
    </div>
    );
};

export default pirateEscapeRoom;
