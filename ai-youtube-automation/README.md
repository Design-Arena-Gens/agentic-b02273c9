# AI YouTube Automation Studio

AI YouTube Automation Studio is an agentic Next.js application that turns a single idea into a full production-ready blueprint. Provide your topic, audience, and goals, and the app delivers:

- Viral concept and channel positioning
- Retention-first long-form script outline
- Thumbnail art direction with AI prompts
- Scene-by-scene visual and motion guidance
- Voiceover and sound design plan with SFX cues
- Competitor and SEO research with cited data
- Automation prompts and execution timeline

## Prerequisites

The generation pipeline relies on the OpenAI Responses API.

```bash
# Required
OPENAI_API_KEY=sk-...

# Optional model override (defaults to gpt-4o-mini)
OPENAI_MODEL=gpt-4o
```

Create an `.env.local` file in the project root and add the variables above before running the app or deploying to Vercel.

## Local Development

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000). Trigger a full automation by completing the form and hitting **Generate in One Click**.

## Quality Gates

- `npm run lint` for static analysis
- `npm run build` to ensure the production bundle compiles

## Deployment

After a successful build, deploy straight to Vercel:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-b02273c9
```

Wait a few seconds for DNS to propagate, then validate the deployment:

```bash
curl https://agentic-b02273c9.vercel.app
```

If the verification fails, retry up to three times with a short delay between attempts.

## Folder Structure

```
src/
├─ app/
│  ├─ api/generate/route.ts  # Serverless Responses API orchestrator
│  ├─ layout.tsx             # App shell
│  └─ page.tsx               # Client-side automation UI
└─ lib/
   ├─ pipeline.ts            # OpenAI orchestration layer
   └─ schema.ts              # Zod schemas & shared types
```

## Notes

- The app expects a valid `OPENAI_API_KEY` at runtime. Without it, generation will fail gracefully.
- Feel free to fork the prompt chain in `src/lib/pipeline.ts` to plug in other providers or expand the output schema.
