import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const getTeams = () => axios.get(`${BASE_URL}/teams`);
export const getTeam = (name) => axios.get(`${BASE_URL}/teams/${name}`);
export const getTopPlayers = () => axios.get(`${BASE_URL}/players`);
export const getRecentMatches = () => axios.get(`${BASE_URL}/matches/recent`);
export const getActiveTeams = () => axios.get(`${BASE_URL}/matches/active-teams`);
export const getHeadToHead = (team1, team2) =>
  axios.get(`${BASE_URL}/head-to-head?team1=${team1}&team2=${team2}`);