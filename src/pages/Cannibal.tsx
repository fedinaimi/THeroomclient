import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background_nokey.png';
import '../styles/Cannibal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';




const cannibalEscapeRoom: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function

    // Function to handle the reservation button click
    const handleReservationClick = () => {
        navigate('/reservation', { state: { selectedScenario: 'Cannibale' } });
    };  
  return (
        <div className="cannibal-container_big"style={{ backgroundImage: `url(${background})` }}>
        
        
          <h1 className="cannibal-title">Le Cannibale</h1>
      <div className="escape-room">
        <img src="src/assets/cannibal.png" alt="cannibal" className='img'/>
        <div className="details">
          <h2>Le Cannibale</h2>
          <ul>
            <li><img src="src/assets/logoPersonne.png" alt="Logo 1" className="logo"/>2-8 Joueurs</li>
            <li><img src="src/assets/logoMinuteur.png" alt="Logo 1" className="logo"/>60 Minutes</li>
            <li><img src="src/assets/logoLieux.png" alt="Logo 1" className="logo"/>Menzah7</li>
          </ul>
          <div className="parent-container-arrow">
          <FontAwesomeIcon icon={faChevronDown} className="chapter-arrow" />
          </div>
          <div className="button-container">
          <button className="reserve-button"onClick={handleReservationClick}>Réserver Maintenant</button>
          </div>
        </div>
      </div>
    <ul className="info-list">
      <li><img src="src/assets/logoPersonne.png" alt="Logo 1" className="logo"/> 2-8 Joueurs</li>
      <li> <FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starBlack'/> Difficulté</li>
      <li><img src="src/assets/logoMinuteur.png" alt="Logo 3" className="logo"/> 60 Minutes</li>
    </ul>
    <div className='textBottomcannibal'>
      <p className="cannibal-description">
      Vous vous réveillez dans le noir et la seule chose que vous pouvez sentir est une voix « je veux jouer à un jeux » Vous réalisez que vous êtes enfermé dans la pièce de Jigcannibal, face à une épreuve qui peut vous couter  vie. Vous avez soixante minutes pour vous échapper. « Vivre ou mourir à vous de choisir »      </p>
      </div>
    </div>
    );
};

export default cannibalEscapeRoom;
