import { Router } from 'express';
import AxiosClient from '@configs/axios/axios.config';
import { Player } from '@interfaces/interfaces';

const axios = AxiosClient.getInstance();

const nbaRoutes = Router();

nbaRoutes.get('/players', async (req, res) => {
  const { team_ids, player_ids } = req.query;
  try {
    const players = await axios.get(`/players`, {params: {"team_ids[]": team_ids, "player_ids[]": player_ids }});
    res.json({
      data: players.data.data.filter((player: Player) => 
        player.position && player.position.trim() !== ''
      ),
      meta: players.data.meta
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

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
  const { teamId } = req.query;
  try {
    const { data } = await axios.get(`https://stats.nba.com/stats/playerindex?Active=&AllStar=&College=&Country=&DraftPick=&DraftRound=&DraftYear=&Height=&Historical=&LeagueID=00&Season=2022-23&TeamID=${teamId}&Weight=`);
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

export default nbaRoutes;
