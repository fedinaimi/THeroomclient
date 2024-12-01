import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar, { CalendarProps } from 'react-calendar';
import background from '../assets/background_nokey.png';
import '../styles/Reservation.css';
import 'react-calendar/dist/Calendar.css';
import sawImage from '../assets/saw.png';
import piratesImage from '../assets/pirate.png';
import cannibaleImage from '../assets/cannibal.png';
import axios from 'axios'; // Import axios



const Reservation: React.FC = () => {
    const location = useLocation();
    const [date, setDate] = useState<Date | [Date, Date]>(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<{ name: string; image: string; minPlayers: number; maxPlayers: number } | null>(null);
    const [numberOfPeople, setNumberOfPeople] = useState<number>(2);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [loading, setLoading] = useState(true);

interface Chapter {
    _id: string;
    name: string;
    description: string;
    video: string;
    image: string; // Assuming this field exists in the API
  }
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<{ [key: string]: boolean }>({
        onlineOnePerson: false,
        onlineTotal: false,
        cash: false,
    });
 


  
    const generateTimeSlots = (): string[] => {
        const slots: string[] = [];
        const startHour = 13;
        const endHour = 25;
        let hour = startHour;

        while (hour < endHour) {
            const hourPart = Math.floor(hour);
            const minutePart = hour % 1 === 0.5 ? '30' : '00';
            const formattedTime = `${hourPart}:${minutePart}`;
            slots.push(formattedTime);
            hour += 1.5;
        }

        return slots;
    };

    const escapeRooms = [
        {
            name: 'Saw',
            image: sawImage,
            availableTimes: generateTimeSlots(),
            unavailableTimes: ['14:30', '16:00'],
            minPlayers: 3,
            maxPlayers: 9,
        },
        {
            name: 'Pirates of the Caribbean',
            image: piratesImage,
            availableTimes: generateTimeSlots(),
            unavailableTimes: ['20:30', '22:00'],
            minPlayers: 2,
            maxPlayers: 8,
        },
        {
            name: 'Cannibale',
            image: cannibaleImage,
            availableTimes: generateTimeSlots(),
            unavailableTimes: ['17:30', '19:00'],
            minPlayers: 2,
            maxPlayers: 8,
        },
    ];

    const formatFullDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        return new Intl.DateTimeFormat('fr-FR', options).format(date);
    };

    const handleDateChange: CalendarProps['onChange'] = (value) => {
        setDate(value as Date | [Date, Date]);
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

    const handleTimeSlotClick = (room: { name: string; image: string; minPlayers: number; maxPlayers: number }, time: string) => {
        setSelectedTimeSlot(time);
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTimeSlot(null);
        setSelectedRoom(null);
        setPaymentMethods({
            onlineOnePerson: false,
            onlineTotal: false,
            cash: false,
        }); // Reset payment methods
    };

    const handleNumberOfPeopleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNumberOfPeople(parseInt(event.target.value));
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setPaymentMethods((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const isNameValid = /^[a-zA-Z\s]+$/.test(name);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPhoneValid = /^\d{8}$/.test(phone);

    return (
        <div className="reservation-container" style={{ backgroundImage: `url(${background})` }}>
            <h1>Réservation</h1>
            <div className="calendar-navigation">
                <button onClick={handlePrevDay} className="react-calendar__navigation__arrow react-calendar__navigation__prev-button">
                    &lt;
                </button>
                <div className="active-date">
                    {date instanceof Date ? formatFullDate(date) : 'Select a date'}
                </div>
                <button onClick={handleNextDay} className="react-calendar__navigation__arrow react-calendar__navigation__next-button">
                    &gt;
                </button>
            </div>

            <div className="availability-section">
                {escapeRooms.map((room) => (
                    <div className="card_r" key={room.name}>
                        <img src={room.image} alt={`${room.name} Image`} className="room-image" />
                        <h2>{room.name}</h2>
                        <p>Players: {room.minPlayers} - {room.maxPlayers}</p>
                        <div className="times">
                            {room.availableTimes.map((time) => {
                                const isUnavailable = room.unavailableTimes.includes(time);
                                return isUnavailable ? (
                                    <span className="time-slot unavailable" key={time}>
                                        {time}
                                    </span>
                                ) : (
                                    <span
                                        className="time-slot"
                                        key={time}
                                        onClick={() => handleTimeSlotClick(room, time)}
                                    >
                                        {time}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for the form */}
            {isModalOpen && selectedRoom && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Réservation de {selectedTimeSlot} pour</h2>
                        <div className="selected-room-info">
                            <img
                                src={selectedRoom.image}
                                alt={`${selectedRoom.name} Image`}
                                className="selected-room-image"
                            />
                            <h3>{selectedRoom.name}</h3>
                        </div>
                        <form>
                            <label htmlFor="name">Nom complet :</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                className={isNameValid ? '' : 'invalid'}
                                required
                            />
                            {!isNameValid && <span className="error-message">Veuillez entrer un nom valide.</span>}

                            <label htmlFor="email">Email :</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={isEmailValid ? '' : 'invalid'}
                                required
                            />
                            {!isEmailValid && <span className="error-message">Veuillez entrer un email valide.</span>}

                            <label htmlFor="phone">Numéro :</label>
                            <div className="phone-input">
                                <span className="phone-prefix">+216</span>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className={isPhoneValid ? '' : 'invalid'}
                                    required
                                />
                            </div>
                            {!isPhoneValid && <span className="error-message">Veuillez entrer un numéro valide.</span>}

                            <label htmlFor="people">Nombre de personnes :</label>
                            <select 
                                id="people" 
                                value={numberOfPeople} 
                                onChange={handleNumberOfPeopleChange} 
                                className="people-select"
                            >
                                {Array.from({ length: selectedRoom.maxPlayers - selectedRoom.minPlayers + 1 }, (_, i) => i + selectedRoom.minPlayers).map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>

                            <div className="payment-methods">
                                <h4>Méthode de paiement :</h4>
                                <div className="payment-methods-options">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="onlineOnePerson"
                                        checked={paymentMethods.onlineOnePerson}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    En ligne - 1 personne
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="onlineTotal"
                                        checked={paymentMethods.onlineTotal}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    En ligne - Total
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="cash"
                                        checked={paymentMethods.cash}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    Espèces
                                </label>
                            </div>
                            </div>

                            <div className="modal-buttons">
                                <button type="button" onClick={closeModal}>
                                    Fermer
                                </button>
                                <button type="submit" disabled={!isNameValid || !isEmailValid || !isPhoneValid}>
                                    Confirmer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reservation;
