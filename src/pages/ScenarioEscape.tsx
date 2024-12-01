import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import background from '../assets/background_nokey.png';
import '../styles/Cannibal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';

import { getChapterById } from '../services/chapterService'; // Import the service

interface Chapter {
    _id: string;
    name: string;
    image: string;
    playerNumber: number;
    time: number;
    difficulty: string; // Assume this is one of "easy", "medium", or "hard"
    description: string;
    place: string;
}

const ScenarioEscape: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Extract the 'id' from the URL
    const [chapterData, setChapterData] = useState<Chapter | null>(null);
    const navigate = useNavigate(); // Initialize the navigate function

    // Fetch chapter data based on the ID
    useEffect(() => {
        const fetchChapterData = async () => {
            if (!id) return; // Exit if no ID is provided
            try {
                const data = await getChapterById(id); // Use the service to fetch data
                setChapterData(data);
            } catch (error) {
                console.error('Error fetching chapter data:', error);
            }
        };

        fetchChapterData();
    }, [id]);

    if (!chapterData) return <p>Loading...</p>; // Show loading message while fetching

    // Map difficulty to the number of stars
    const difficultyStars = {
        easy: 2,
        medium: 3,
        hard: 5,
    };

    // Get the number of stars based on the chapter's difficulty
    const starCount = difficultyStars[chapterData.difficulty as keyof typeof difficultyStars] || 0;

    // Function to handle the reservation button click
    const handleReservationClick = () => {
        navigate(`/reservation/${chapterData._id}`, { state: { selectedScenario: chapterData.name } });
    };

    return (
        <div className="cannibal-container_big" style={{ backgroundImage: `url(${background})` }}>
            <h1 className="cannibal-title">{chapterData.name}</h1>
            <div className="escape-room">
                <img src={chapterData.image} alt={chapterData.name} className="img" />
                <div className="details">
                    <h2>{chapterData.name}</h2>
                    <ul>
                        <li>
                            <img src="src/assets/logoPersonne.png" alt="Players" className="logo" />
                            {chapterData.playerNumber} Joueurs
                        </li>
                        <li>
                            <img src="src/assets/logoMinuteur.png" alt="Time" className="logo" />
                            {chapterData.time} Minutes
                        </li>
                        <li>
                            <img src="src/assets/logoLieux.png" alt="Location" className="logo" />
                            {chapterData.place}
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
                    <img src="src/assets/logoPersonne.png" alt="Players" className="logo" />{' '}
                    {chapterData.playerNumber} Joueurs
                </li>
                <li>
                    {Array.from({ length: starCount }, (_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} className="starOrange" />
                    ))}
                    {Array.from({ length: 5 - starCount }, (_, index) => (
                        <FontAwesomeIcon key={index + starCount} icon={faStar} className="starBlack" />
                    ))}
                    Difficulté
                </li>
                <li>
                    <img src="src/assets/logoMinuteur.png" alt="Time" className="logo" /> {chapterData.time} Minutes
                </li>
            </ul>
            <div className="textBottomcannibal">
                <p className="cannibal-description">{chapterData.description}</p>
            </div>
        </div>
    );
};

export default ScenarioEscape;
