import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/EscapeRoom.css'; // Desktop styles
import '../styles/test.css'; // Mobile styles
import background from '../assets/background.png';
import background_nokey from '../assets/background_nokey.png';
import keyIcon from '../assets/key-icon.png';
import clockIcon from '../assets/clock-icon.png';
import heartIcon from '../assets/heart-icon.png';
import { fetchChapters } from '../services/chapterService'; // Use Axios service
import About from './about';
import TeamBuilding from './Teambuilding';
import Reservation from './Reservation';
import Contact from './Contact';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

interface Chapter {
  _id: string;
  name: string;
  description: string;
  video: string;
  image: string;
}

const HomePage: React.FC = () => {
  const isMobile = useIsMobile();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChapters = async () => {
      try {
        const data = await fetchChapters();
        setChapters(data);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChapters();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app-container">
      {isMobile ? (
        // Mobile Version
        <MobileView chapters={chapters} />
        
      ) : (
        // Desktop Version
        <DesktopView chapters={chapters} />
      )}
     
   
    </div>
  );
};

const MobileView: React.FC<{ chapters: Chapter[] }> = ({ chapters }) => (
  <>
    <div className="main-container_t" style={{ backgroundImage: `url(${background_nokey})` }}>
      <h1 className="main-title_t">
        <img src="src/assets/logoEscapeF.png" alt="Logo" className="logoEscape_t" loading="lazy" />
      </h1>
      <div className="scenario-container_t">
        <h2>Consultez nos scénarios !</h2>
        <FontAwesomeIcon icon={faChevronDown} className="menu-arrow" />
      </div>
    </div>

    {chapters.map((chapter) => (
      <div key={chapter._id} className="fullscreen-section">
        <video className="content-video" autoPlay loop muted>
          <source src={chapter.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <h2 className="video-title">{chapter.name}</h2>
          <p className="video-description">{chapter.description}</p>
          <button className="cta-btn">
            <Link id="link" to={`/${chapter._id}`}>
              En savoir plus →
            </Link>
          </button>
        </div>
      </div>
    ))}

    <div className="main-container_t" style={{ backgroundImage: `url(${background_nokey})` }}>
      <h2>C’est quoi une escape room?</h2>
      <div className="escape-info_t">
        <InfoBlock
          icon={keyIcon}
          title="Vous êtes enfermé pendant 60 min"
          description="Vous n'apporterez rien à l'intérieur, mais la pièce sera remplie d'indices et d’objets qui ne sont pas forcément tous utiles ! À vous d’en dévoiler les secrets."
        />
        <InfoBlock
          icon={clockIcon}
          title="L'horloge tourne"
          description="Arriverez-vous à vous frayer un chemin jusqu'à la conclusion intrigante et échapper de la pièce en 60 minutes?"
        />
        <InfoBlock
          icon={heartIcon}
          title="Sentir l'atmosphère"
          description="Dans des décors authentiques, inspirés de vos films préférés, vous devrez résoudre des énigmes, manipuler des objets et découvrir des passages secrets pour réussir votre mission."
        />
      </div>
      
    </div>
    <About />
      <TeamBuilding />
      <Reservation />
      <Contact />
  
  </>
);

const DesktopView: React.FC<{ chapters: Chapter[] }> = ({ chapters }) => (
  <div className="main-container" style={{ backgroundImage: `url(${background})` }}>
    <h1 className="main-title">
      <img src="src/assets/logoEscapeF.png" alt="Logo" className="logoEscape" loading="lazy" />
    </h1>
    <div className="scenario-container">
      <h2>
        <Link id="link" to="/scenario">
          Consultez nos scenarios !
        </Link>
      </h2>
      <div className="scenario-cards">
        {chapters.map((chapter) => (
          <div key={chapter._id} className="card">
            <Link id="link" to={`/${chapter._id}`}>
              <img src={chapter.image} alt={chapter.name} loading="lazy" />
            </Link>
            <h3>
              <Link id="link" to={`/${chapter._id}`}>
                {chapter.name}
              </Link>
            </h3>
            <p>
              <Link id="link" to={`/${chapter._id}`}>
                En savoir plus →
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
    <About />
      <TeamBuilding />
      <Reservation />
      <Contact />
  </div>
  
);

const InfoBlock: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="info-block_t">
    <img src={icon} alt={`${title} Icon`} className="icon" loading="lazy" />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default HomePage;
