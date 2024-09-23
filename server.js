import express from 'express'
import { config } from 'dotenv'
import pg from 'pg'

config()  // Cargar las variables de entorno

const app = express()

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    return res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database query failed' })
  }
})

app.listen(3000, () => {
  console.log('server on port', 3000)
})
