import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/background_nokey.png'; // Adjust path to your assets
import '../styles/Scenario.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { fetchChapters } from '../services/chapterService'; // Import the service

interface Chapter {
    _id: string;
    name: string;
    image: string;
    playerNumber: number;
    time: number;
    difficulty: string; // Assume this is one of "easy", "medium", or "hard"
    place: string;
}

const Scenario: React.FC = () => {
    const [chapters, setChapters] = useState<Chapter[]>([]); // State to hold chapter data

    useEffect(() => {
        const fetchChapterData = async () => {
            try {
                const data = await fetchChapters(); // Use the service to fetch data
                setChapters(data);
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };

        fetchChapterData();
    }, []);

    const renderDifficultyStars = (difficulty: string) => {
        const filledStars = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 5;
        const emptyStars = 5 - filledStars;

        return (
            <>
                {[...Array(filledStars)].map((_, index) => (
                    <FontAwesomeIcon key={`filled-${index}`} icon={faStar} className="starOrange" />
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                    <FontAwesomeIcon key={`empty-${index}`} icon={faStar} className="starBlack" />
                ))}
            </>
        );
    };

    return (
        <div className="scenario-container_big" style={{ backgroundImage: `url(${background})` }}>
            <div className="scenario-container_s">
                {chapters.map((chapter) => (
                    <div className="card_s" key={chapter._id}>
                        <Link id="link" className="scenario-link" to={`/${chapter.name.replace(/\s+/g, '')}`}>
                            <img src={chapter.image} alt={chapter.name} />
                        </Link>
                        <div className="card-info">
                            <h3>{chapter.name}</h3>
                            <ul className="info-list_s">
                                <li>
                                    <img
                                        src="src/assets/logoPersonne.png"
                                        alt="Players Icon"
                                        className="logo_s"
                                        loading="lazy"
                                    />{' '}
                                    {chapter.playerNumber} Joueurs
                                </li>
                                <li>
                                    <img
                                        src="src/assets/logoMinuteur.png"
                                        alt="Time Icon"
                                        className="logo_s"
                                        loading="lazy"
                                    />{' '}
                                    {chapter.time} Minutes
                                </li>
                                <li>
                                    <img
                                        src="src/assets/logoLieux.png"
                                        alt="Location Icon"
                                        className="logo_s"
                                        loading="lazy"
                                    />{' '}
                                    {chapter.place}
                                </li>
                            </ul>
                            <h2>{renderDifficultyStars(chapter.difficulty)}</h2>
                            <p>
                                <Link id="link" to={`/${chapter._id}`}>
                                    Learn more →
                                </Link>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Scenario;
