import { Router } from 'express';
import { BalldontlieAPI } from '@balldontlie/sdk';
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
  const { division } = req.query;
  try {
    const { data } = await axios.get(`https://stats.nba.com/stats/leaguedashptstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&Height=&LastNGames=0&LeagueID=&Location=&Month=0&OpponentTeamID=0&Outcome=&PORound=&PerMode=Totals&PlayerExperience=&PlayerOrTeam=Team&PlayerPosition=&PtMeasureType=SpeedDistance&Season=2024-25&SeasonSegment=&SeasonType=Regular+Season&StarterBench=&TeamID=&VsConference=&VsDivision=&Weight=`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

nbaRoutes.get('/teams', async (req, res) => {
  const { division } = req.query;
  try {
    const { data } = await axios.get(`https://stats.nba.com/stats/leaguedashptstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=${division}&DraftPick=&DraftYear=&GameScope=&Height=&LastNGames=0&LeagueID=&Location=&Month=0&OpponentTeamID=0&Outcome=&PORound=&PerMode=Totals&PlayerExperience=&PlayerOrTeam=Team&PlayerPosition=&PtMeasureType=SpeedDistance&Season=2024-25&SeasonSegment=&SeasonType=Regular+Season&StarterBench=&TeamID=&VsConference=&VsDivision=&Weight=`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

nbaRoutes.get('/allPlayers', async (req, res) => {
  try {
    const teams = await axios.get(`/players`);
    res.json(teams.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

export default nbaRoutes;
