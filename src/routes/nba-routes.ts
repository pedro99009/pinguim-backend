import { Router } from 'express';
import { getPlayers, getTeams } from '@services/nba-service';
import { BalldontlieAPI } from '@balldontlie/sdk';
import AxiosClient from '@configs/axios/axios.config';

const axios = AxiosClient.getInstance();

const nbaRoutes = Router();
const api = new BalldontlieAPI({ apiKey: "f725831e-8411-452d-8213-b65bf2ec4080" });

nbaRoutes.get('/players', async (req, res) => {
  const { team_ids } = req.query;
  console.log("ESSA PORRA É O ID:" , team_ids);

  try {
    const players = await axios.get(`/players`, {params: {"team_ids[]": team_ids }});
    res.json(players.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

nbaRoutes.get('/teams', async (req, res) => {
  try {
    const teams = await axios.get(`/teams`);
    res.json(teams.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

export default nbaRoutes;
