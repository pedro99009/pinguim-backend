import { Router } from 'express';
import AxiosClient from '@configs/axios/axios.config';
import { Player } from '@interfaces/interfaces';

const axios = AxiosClient.getInstance();

const nbaRoutes = Router();

nbaRoutes.get('/classification', async (req, res) => {
  const { conference, season } = req.query; // lê os params query

  // Padroniza valor para NBA API (East ou West)
  const confParam = conference === 'West' ? 'West' : 'East';

  try {
    const { data } = await axios.get(
      `https://stats.nba.com/stats/leaguedashptstats?College=&Conference=${confParam}` +
      `&Country=&DateFrom=&DateTo=&Division=` +
      `&DraftPick=&DraftYear=&GameScope=&Height=&LastNGames=0&LeagueID=&Location=` +
      `&Month=0&OpponentTeamID=0&Outcome=&PORound=&PerMode=Totals&PlayerExperience=` +
      `&PlayerOrTeam=Team&PlayerPosition=&PtMeasureType=SpeedDistance&Season=${season}` +
      `&SeasonSegment=&SeasonType=Regular+Season&StarterBench=&TeamID=&VsConference=` +
      `&VsDivision=&Weight=`
    );
    res.json(data);
  } catch (error) {
    console.error('Error fetching classification:', error);
    res.status(500).json({ error: 'Failed to fetch classification' });
  }
});


nbaRoutes.get('/teams', async (req, res) => {
  const { division, teamId } = req.query;
  try {
    const { data } = await axios.get(`https://stats.nba.com/stats/leaguedashptstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=${division || ''}&DraftPick=&DraftYear=&GameScope=&Height=&LastNGames=0&LeagueID=&Location=&Month=0&OpponentTeamID=0&Outcome=&PORound=&PerMode=Totals&PlayerExperience=&PlayerOrTeam=Team&PlayerPosition=&PtMeasureType=SpeedDistance&Season=2024-25&SeasonSegment=&SeasonType=Regular+Season&StarterBench=&TeamID=${teamId || 0}&VsConference=&VsDivision=&Weight=`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

nbaRoutes.get('/playerByTeam', async (req, res) => {
  const { teamId, season } = req.query;
  try {
    const { data } = await axios.get(`https://stats.nba.com/stats/commonteamroster?LeagueID=&Season=${season ||"2024-25"}&TeamID=${teamId}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});


nbaRoutes.get('/playerById', async (req, res) => {
  const { playerId } = req.query;
  try {
    const { data } = await axios.get(`https://stats.nba.com/stats/commonplayerinfo?LeagueID=&PlayerID=${playerId}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

nbaRoutes.get('/teamsById', async (req, res) => {
  const { teamId } = req.query; 
  try {
    const { data } = await axios.get(`https://stats.nba.com/stats/teaminfocommon?LeagueID=00&Season=&SeasonType=&TeamID=${teamId}`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});


nbaRoutes.get('/playerCareerStats', async (req, res) => {
  const { playerId } = req.query; 
  try {
    const { data } = await axios.get(`https://stats.nba.com/stats/playercareerstats?LeagueID=&PerMode=Totals&PlayerID=${playerId}`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

nbaRoutes.get('/allPlayers', async (req, res) => {
   const { season } = req.query; 
  try {
    const { data } = await axios.get(
      `https://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=${season||"2024-25"}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch player list' });
  }
});

export default nbaRoutes;
