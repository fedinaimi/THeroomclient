import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/PiratesEscapeRoom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { getChapterById } from '../services/chapterService'; // Import the service
import background from '../assets/background_nokey.png';
import personIcon from '../assets/logoPersonne.png';
import timerIcon from '../assets/logoMinuteur.png';
import locationIcon from '../assets/logoLieux.png';

interface Chapter {
  _id: string;
  name: string;
  image: string;
  playerNumber: number;
  time: number;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  place: string;
}

const PirateEscapeRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [chapterData, setChapterData] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        if (id) {
          const data = await getChapterById(id); // Use the service
          setChapterData(data);
        }
      } catch (error) {
        console.error('Error fetching chapter data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!chapterData) return <p>Chapter not found</p>;

  const difficultyStars = {
    easy: 2,
    medium: 3,
    hard: 5,
  };
  const starCount = difficultyStars[chapterData.difficulty] || 0;

  const handleReservationClick = () => {
    navigate(`/reservations/${chapterData._id}`, { state: { selectedScenario: chapterData.name } });
  };

  return (
    <div className="pirate-container" style={{ backgroundImage: `url(${background})` }}>
      <h1 className="pirate-title">{chapterData.name}</h1>
      <div className="escape-room">
        <img src={chapterData.image} alt={chapterData.name} className="img" />
        <div className="details">
          <h2>{chapterData.name}</h2>
          <ul>
            <li>
              <img src={personIcon} alt="Players" className="logo" /> {chapterData.playerNumber} Joueurs
            </li>
            <li>
              <img src={timerIcon} alt="Time" className="logo" /> {chapterData.time} Minutes
            </li>
            <li>
              <img src={locationIcon} alt="Location" className="logo" /> {chapterData.place}
            </li>
          </ul>
          <div className="parent-container-arrow">
            <FontAwesomeIcon icon={faChevronDown} className="chapter-arrow" />
          </div>
          <div className="button-container">
            <button className="reserve-button" onClick={handleReservationClick}>
              Réserver Maintenant
            </button>
          </div>
        </div>
      </div>
      <ul className="info-list">
        <li>
          <img src={personIcon} alt="Players" className="logo" /> {chapterData.playerNumber} Joueurs
        </li>
        <li>
          {Array.from({ length: starCount }, (_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="starOrange" />
          ))}
          {Array.from({ length: 5 - starCount }, (_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="starBlack" />
          ))}
          Difficulté: {chapterData.difficulty}
        </li>
        <li>
          <img src={timerIcon} alt="Time" className="logo" /> {chapterData.time} Minutes
        </li>
      </ul>
      <div className="textBottomPirate">
        <p className="pirate-description">{chapterData.description}</p>
      </div>
    </div>
  );
};

export default PirateEscapeRoom;
