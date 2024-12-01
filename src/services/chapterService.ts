import axiosInstance from './axiosInstance';

// Fetch all chapters
export const fetchChapters = async () => {
  try {
    const response = await axiosInstance.get('/chapters');
    return response.data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};

// Fetch a chapter by its ID
export const getChapterById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/chapters/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chapter:', error);
    throw error;
  }
};

// Fetch a scenario by chapter ID
export const fetchScenarioByChapterId = async (chapterId: string) => {
  try {
    const response = await axiosInstance.get(`/chapters/chapter/${chapterId}/scenario`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scenario by chapter ID:', error);
    throw error;
  }
};

// Fetch chapter details
export const fetchChapterDetails = async (chapterId: string) => {
  try {
    const response = await axiosInstance.get(`/chapters/${chapterId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chapter details:', error);
    throw error;
  }
};

// Fetch time slots for a scenario on a specific date
export const fetchTimeSlots = async (scenarioId: string, date: string) => {
  try {
    const response = await axiosInstance.get(`/timeSlots/scenario/${scenarioId}/date`, {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching time slots:', error);
    throw error;
  }
};

// Create a reservation
export const createReservation = async (reservationData: any) => {
  try {
    const response = await axiosInstance.post('/reservations', reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};

// Fetch time slots by date for a specific chapter
export const getTimeSlotsByDate = async (chapterId: string, date: string) => {
  try {
    const response = await axiosInstance.get('/timeslots', {
      params: { chapterId, date }, // Pass query parameters
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching time slots by date:', error);
    throw error;
  }
};

// Fetch all reservations (optional for future use)
export const fetchAllReservations = async () => {
  try {
    const response = await axiosInstance.get('/reservations');
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

// Fetch a single reservation by its ID
export const getReservationById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation by ID:', error);
    throw error;
  }
};

// Update an existing reservation (optional for future use)
export const updateReservation = async (id: string, updatedData: any) => {
  try {
    const response = await axiosInstance.put(`/reservations/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw error;
  }
};

// Delete a reservation (optional for future use)
export const deleteReservation = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
};
