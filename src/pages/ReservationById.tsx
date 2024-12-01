import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar, { CalendarProps } from 'react-calendar';
import background from '../assets/background_nokey.png';
import '../styles/Reservation.css';
import 'react-calendar/dist/Calendar.css';

import {
    fetchScenarioByChapterId,
    getChapterById,
    fetchTimeSlots,
    createReservation,
} from '../services/chapterService'; // Import services

const ReservationById: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [date, setDate] = useState<Date | [Date, Date]>(new Date());
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState<number>(2);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [scenario, setScenario] = useState<any>(null);
    const [chapter, setChapter] = useState<any>(null);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [error, setError] = useState<string | null>(null);

    interface TimeSlot {
        _id: string;
        startTime: string;
        endTime: string;
        isAvailable: boolean;
    }

    // Format a date to "YYYY-MM-DD" for API compatibility
    const formatDateForAPI = (date: Date | [Date, Date]): string => {
        if (date instanceof Date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return ''; // Handle range if necessary
    };

const formatFullDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
};

    // Format an ISO string to "HH:mm"
   const formatTime = (isoString: string): string => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };
    useEffect(() => {
        if (date instanceof Date) {
            setFormattedDate(formatFullDate(date));
        }
    }, [date]);
    // Fetch chapter and scenario data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const chapterData = await getChapterById(id!);
                setChapter(chapterData);

                const scenarioData = await fetchScenarioByChapterId(id!);
                setScenario(scenarioData);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Fetch time slots when scenario or date changes
    useEffect(() => {
        const fetchTimeSlotsData = async () => {
            if (!scenario) return;
            try {
                const slots = await fetchTimeSlots(scenario.scenarioId, formatDateForAPI(date));
                setTimeSlots(slots);
            } catch (err) {
                console.error('Failed to fetch time slots:', err);
            }
        };
        fetchTimeSlotsData();
    }, [scenario, date]);

    const handleDateChange: CalendarProps['onChange'] = (value) => {
        setDate(value as Date | [Date, Date]);
        if (value instanceof Date) {
            setFormattedDate(formatFullDate(value));
        }
    };

    const handleNextDay = () => {
        if (date instanceof Date) {
            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);
            setDate(nextDate);
        }
    };

    const handlePrevDay = () => {
        if (date instanceof Date) {
            const prevDate = new Date(date);
            prevDate.setDate(prevDate.getDate() - 1);
            setDate(prevDate);
        }
    };

    const handleTimeSlotClick = (timeSlot: TimeSlot) => {
        setSelectedTimeSlot(timeSlot);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTimeSlot(null);
        setNumberOfPeople(2);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name || !email || !phone || !selectedTimeSlot || !scenario) {
            alert('Please ensure all fields are valid.');
            return;
        }

        const reservationData = {
            scenario: scenario.scenarioId,
            chapter: id,
            timeSlot: selectedTimeSlot._id,
            name,
            email,
            phone,
            language: 'English',
            status: 'pending',
        };

        try {
            await createReservation(reservationData);
            alert('Reservation successful!');
            closeModal();
        } catch (err) {
            console.error('Failed to create reservation:', err);
            alert('Failed to make the reservation.');
        }
    };

    return (
        <div className="reservation-container" style={{ backgroundImage: `url(${background})` }}>
            <h1>Réservation</h1>
            <div className="calendar-navigation">
                <button onClick={handlePrevDay}>&lt;</button>
                <div>{formattedDate || 'Select a date'}</div>
                <button onClick={handleNextDay}>&gt;</button>
            </div>
            {loading ? <p>Loading chapter details...</p> : (
                chapter ? (
                    <>
                        <h2>{chapter.name}</h2>
                        <div className="card_r">
                            <img src={chapter.image} alt={chapter.name} />
                            <div className="availability-section">
                                <h3>Disponibilité</h3>
                                {timeSlots.length > 0 ? (
                                    timeSlots.map((slot) => (
                                        <span
                                            className={`time-slot ${!slot.isAvailable ? 'unavailable' : ''}`}
                                            key={slot._id}
                                            onClick={slot.isAvailable ? () => handleTimeSlotClick(slot) : undefined}
                                            style={!slot.isAvailable ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                                        >
                        {`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`}<br/>
                                        </span>
                                    ))
                                ) : (
                                    <p>Aucun créneau horaire disponible.</p>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Chapitre non trouvé.</p>
                )
            )}

            {/* Modal for the form */}
            {isModalOpen && selectedTimeSlot && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Réservation pour {`${formatTime(selectedTimeSlot.startTime)} - ${formatTime(selectedTimeSlot.endTime)}`}</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Nom:</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label htmlFor="phone">Téléphone:</label>
                            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            <label htmlFor="numberOfPeople">Nombre de personnes:</label>
                            <input type="number" id="numberOfPeople" value={numberOfPeople} onChange={(e) => setNumberOfPeople(Number(e.target.value))} min="1" required />
                            <button type="submit">Réserver</button>
                        </form>
                        <button onClick={closeModal}>Annuler</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationById;
