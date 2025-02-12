import { Router } from 'express';
import { BalldontlieAPI } from '@balldontlie/sdk';
import AxiosClient from '@configs/axios/axios.config';
import { Player } from '@interfaces/interfaces';

const axios = AxiosClient.getInstance();

const nbaRoutes = Router();
const api = new BalldontlieAPI({ apiKey: "f725831e-8411-452d-8213-b65bf2ec4080" });

nbaRoutes.get('/players', async (req, res) => {
  const { team_ids } = req.query;
  try {
    const players = await axios.get(`/players`, {params: {"team_ids[]": team_ids }});
    res.json({
      data: players.data.data//.filter((player: Player) => 
       // player.position && player.position.trim() !== ''
      //),
     // meta: players.data.meta
    });
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

nbaRoutes.get('/allPlayers', async (req, res) => {
  try {
    const teams = await axios.get(`/players`);
    res.json(teams.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

export default nbaRoutes;
