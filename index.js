import express from 'express';
import cors from 'cors';
import { supabase } from './utils/supabase.js';

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get('/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Paramètre ?q= requis' });
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Erreur de recherche :', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la recherche' });
  }
});

app.listen(port, () => {
  console.log(`🔎 Search service running at http://localhost:${port}`);
});
