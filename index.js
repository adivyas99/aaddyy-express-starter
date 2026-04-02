const express = require('express')
const { AADDYY } = require('aaddyy')

const app = express()
const ai = new AADDYY() // reads AADDYY_API_KEY from env

app.use(express.json())

// Generate an article
app.post('/api/article', async (req, res) => {
  try {
    const { topic, tone, length } = req.body
    if (!topic) return res.status(400).json({ error: 'Topic is required' })

    const result = await ai.articles.generate({
      topic,
      tone: tone || 'professional',
      length: length || 'medium',
    })
    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Generate an image
app.post('/api/image', async (req, res) => {
  try {
    const { prompt, style } = req.body
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' })

    const result = await ai.images.generate({
      prompt,
      style: style || 'photorealistic',
    })
    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Generate a logo
app.post('/api/logo', async (req, res) => {
  try {
    const { keyword, type, color } = req.body
    if (!keyword) return res.status(400).json({ error: 'Keyword is required' })

    const result = await ai.logos.create({
      keyword,
      type: type || 'modern',
      color,
    })
    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Analyze SEO
app.post('/api/seo', async (req, res) => {
  try {
    const { url } = req.body
    if (!url) return res.status(400).json({ error: 'URL is required' })

    const result = await ai.seo.analyze({ url })
    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Solve a math problem
app.post('/api/math', async (req, res) => {
  try {
    const { problem } = req.body
    if (!problem) return res.status(400).json({ error: 'Problem is required' })

    const result = await ai.math.solve({
      problemText: problem,
      explanationLevel: 'step-by-step',
    })
    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Generate titles
app.post('/api/titles', async (req, res) => {
  try {
    const { topic, count } = req.body
    if (!topic) return res.status(400).json({ error: 'Topic is required' })

    const result = await ai.titles.generate({
      topic,
      count: count || 5,
    })
    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'aaddyy-express-starter' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log('')
  console.log('Available routes:')
  console.log('  POST /api/article   — Generate an article')
  console.log('  POST /api/image     — Generate an image')
  console.log('  POST /api/logo      — Generate a logo')
  console.log('  POST /api/seo       — Analyze SEO')
  console.log('  POST /api/math      — Solve a math problem')
  console.log('  POST /api/titles    — Generate titles')
  console.log('  GET  /health        — Health check')
})
