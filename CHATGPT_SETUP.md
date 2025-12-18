# ChatGPT Custom GPT Setup Guide

This guide shows you how to expose your PUMEX RAG system as a Custom GPT that ChatGPT can use.

---

## Step 1: Deploy Your API Server

You need to host your API somewhere ChatGPT can reach it. Here are the easiest options:

### Option A: Railway (Recommended - Easiest)

1. **Sign up**: Go to https://railway.app and sign up with GitHub
2. **New Project**: Click "New Project" → "Deploy from GitHub repo"
3. **Connect Repo**: Select your `pumex-knowledge` repository
4. **Configure**:
   - Railway will auto-detect Node.js
   - Add environment variables:
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `OPENAI_API_KEY`
   - Set start command: `npm start`
5. **Deploy**: Railway will deploy automatically
6. **Get URL**: Copy your app URL (e.g., `https://pumex-rag-production.up.railway.app`)

### Option B: Vercel

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Login**: `vercel login`
3. **Deploy**: `cd /Users/kayaholl/Documents/Pumex/pumex-knowledge && vercel`
4. **Add env vars**: In Vercel dashboard → Settings → Environment Variables
5. **Get URL**: Copy your deployment URL

### Option C: Render

1. **Sign up**: https://render.com
2. **New Web Service**: Connect GitHub repo
3. **Settings**:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables
4. **Deploy**: Get your URL

---

## Step 2: Update OpenAPI Schema

1. Open `openapi.yaml`
2. Replace `YOUR-DEPLOYMENT-URL.com` with your actual deployment URL
3. Save the file

**Example:**
```yaml
servers:
  - url: https://pumex-rag-production.up.railway.app
```

---

## Step 3: Test Your API Locally (Optional)

Before deploying, test locally:

```bash
# Start server
npm start

# In another terminal, test it:
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"question": "What is vePUMX?"}'
```

You should see JSON results.

---

## Step 4: Create Custom GPT in ChatGPT

1. **Open ChatGPT**: Go to https://chat.openai.com
2. **Create GPT**: Click your profile → "My GPTs" → "Create a GPT"
3. **Configure**:
   - **Name**: "Pumex Knowledge Assistant"
   - **Description**: "Answers questions about Pumex protocol using the official knowledge base"
   - **Instructions**: Paste this:

```
You are a helpful assistant that answers questions about Pumex protocol.

When users ask questions:
1. Use the "queryKnowledgeBase" action to search the knowledge base
2. Synthesize the results into clear, accurate answers
3. Cite sources when relevant (mention document titles)
4. If results are unclear, ask for clarification

Prefer canonical sources over drafts. Only include drafts if explicitly requested or if canonical sources don't cover the topic.
```

4. **Add Action**:
   - Click "Add Action" → "Import from URL"
   - Paste your OpenAPI schema URL (you'll need to host `openapi.yaml` somewhere accessible)
   
   **OR** manually configure:
   - **Authentication**: None (or API key if you add auth later)
   - **Schema**: Copy/paste the contents of `openapi.yaml`
   - **Server URL**: Your deployment URL

5. **Save**: Click "Save" → Choose visibility (Only me / Anyone with link / Public)

---

## Step 5: Host OpenAPI Schema

ChatGPT needs to access your `openapi.yaml` file. Options:

### Option A: GitHub Raw URL (Easiest)

1. Push `openapi.yaml` to your GitHub repo
2. Get raw URL: `https://raw.githubusercontent.com/YOUR-USERNAME/pumex-knowledge/main/openapi.yaml`
3. Use this URL in ChatGPT's "Import from URL"

### Option B: Serve from Your API

Add this to `server.js`:

```javascript
app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'openapi.yaml'));
});
```

Then use: `https://YOUR-DEPLOYMENT-URL.com/openapi.yaml`

---

## Step 6: Test Your Custom GPT

1. Go back to ChatGPT
2. Select your new Custom GPT
3. Ask: "What is vePUMX?"
4. It should call your API and return results

---

## Troubleshooting

**"Action failed" or timeout:**
- Check your API is deployed and accessible
- Test the endpoint directly with `curl`
- Check Railway/Vercel logs for errors

**"Schema invalid":**
- Validate your `openapi.yaml` at https://editor.swagger.io
- Make sure the server URL is correct

**No results:**
- Verify your Supabase connection works
- Check that documents were ingested (`npm run ingest`)
- Test the query endpoint directly

---

## Security Notes

⚠️ **Important**: Your API is currently open (no authentication). For production:

1. **Add API Key Auth** (recommended):
   - Generate a secret key
   - Add to your API: `req.headers['x-api-key']`
   - Configure in ChatGPT Actions → Authentication → API Key

2. **Rate Limiting**: Consider adding rate limits to prevent abuse

3. **CORS**: Currently allows all origins. Restrict to ChatGPT's domain if needed.

---

## Quick Reference

| File | Purpose |
|------|---------|
| `server.js` | Express API server |
| `openapi.yaml` | ChatGPT Actions schema |
| `.env` | Environment variables (don't commit!) |

**Commands:**
- `npm start` - Run API locally
- `npm run ingest` - Update knowledge base
- `npm run query "question"` - Test query locally

