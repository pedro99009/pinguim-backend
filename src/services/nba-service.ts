import axios from 'axios';

const BASE_URL = 'https://www.balldontlie.io/api/v1';

export const getPlayers = async () => {
  const response = await axios.get(`${BASE_URL}/players`);
  return response.data;
};

export const getTeams = async () => {
  const response = await axios.get(`${BASE_URL}/teams`);
  return response.data;
};
