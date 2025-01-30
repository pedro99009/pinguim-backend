import { Router } from 'express';
import { getPlayers, getTeams } from '@services/nba-service';
import { BalldontlieAPI } from '@balldontlie/sdk';

const nbaRoutes = Router();
const api = new BalldontlieAPI({ apiKey: "f725831e-8411-452d-8213-b65bf2ec4080" });

nbaRoutes.get('/players', async (req, res) => {
  try {
    const players = await api.nba.getPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

nbaRoutes.get('/teams', async (req, res) => {
  try {
    const teams = await api.nba.getTeams();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

export default nbaRoutes;
