import express from 'express';

const router = express.Router();

// Asset registry
const assetRegistry = new Map();

router.get('/', (req, res) => {
  const assets = Array.from(assetRegistry.values());
  res.json({ assets, count: assets.length });
});

router.post('/register', (req, res) => {
  try {
    const { code, issuer, name } = req.body;
    if (!code || !issuer) {
      return res.status(400).json({ error: 'code and issuer are required' });
    }
    const assetId = `${code}:${issuer}`;
    assetRegistry.set(assetId, { code, issuer, name, registeredAt: new Date() });
    res.status(201).json({ assetId, message: 'Asset registered' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/trustlines/:address', (req, res) => {
  try {
    const { address } = req.params;
    res.json({ address, trustlines: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/portfolio/:address', (req, res) => {
  try {
    const { address } = req.params;
    res.json({ address, portfolio: { assets: [], totalValue: 0 } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
