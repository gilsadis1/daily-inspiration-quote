# Daily Inspiration Quote

`Daily Inspiration Quote` is a small Hebrew landing page and daily email product. Parents leave an email, confirm it, and receive one daily inspirational quote with a short kid-friendly story and a Wikipedia link.

The project is designed as a simple free product: one parent email per subscriber, double opt-in verification, and unsubscribe support.

## Who this is for
This repo is best for people who are comfortable with:
- editing a `.env.local` file
- creating API keys and app passwords
- creating a Supabase project
- optionally using GitHub Actions for daily automation

If that sounds like you, setup is straightforward.

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` from `.env.example`.
3. Fill in:
   - `OPENAI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PUBLIC_BASE_URL`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `EMAIL_TO`
4. Run `supabase/schema.sql` in the Supabase SQL editor.
5. Check your config:
   ```bash
   npm run check-config
   ```
6. Start the Hebrew signup page:
   ```bash
   npm run dev
   ```
7. Build the daily sender:
   ```bash
   npm run build:worker
   ```

## Local Use
You do not need GitHub Actions to use this project.

Run the landing page locally:
```bash
npm run dev
```

Run the daily sender manually:
```bash
npm run build:worker
npm run start:worker
```

Or schedule it locally with `cron`, `launchd`, or any scheduler you already use.

For local development, use:
```env
PUBLIC_BASE_URL=http://localhost:3000
```

## GitHub Actions Use
If you want GitHub to run it every day:
1. Push the repo to your own GitHub account.
2. Add the required repository secrets.
3. Run the workflow manually once to confirm delivery.
4. Leave the schedule enabled.
The workflow lives in `.github/workflows/daily.yml`.

The current workflow sends the daily email to active Supabase subscribers when `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `PUBLIC_BASE_URL` are configured. Without Supabase, it falls back to `EMAIL_TO`.

## Supabase Setup
Create a Supabase project and run the SQL in `supabase/schema.sql`.

Local and production env need:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PUBLIC_BASE_URL`

`PUBLIC_BASE_URL` is the public URL of the site, for example:
- local: `http://localhost:3000`
- Vercel: `https://your-project.vercel.app`
- custom domain: `https://your-domain.com`

## SMTP Setup
This project uses SMTP because it is simple and reliable for personal automation.

Example Gmail setup:
1. Turn on 2-Step Verification in your Google account.
2. Generate an app password.
3. Use:
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `SMTP_SECURE=false`
   - `SMTP_USER=your_email@gmail.com`
   - `SMTP_PASS=your_gmail_app_password`
   - `EMAIL_FROM=your_email@gmail.com`
   - `EMAIL_TO=your_email@gmail.com`

## Environment Variables
See `.env.example`.

Required for normal sending:
- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PUBLIC_BASE_URL`
- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_TO`
- `EMAIL_FROM` if you want it to be different from `SMTP_USER`

Common optional values:
- `OPENAI_MODEL`
- `EMAIL_FROM_NAME`
- `EMAIL_SUBJECT`
- `MIN_DAYS_BETWEEN_REPEATS`
- `INCLUDE_REFLECTION_QUESTION`
- `DRY_RUN`
- `CONTENT_LANGUAGE`
- `WIKIPEDIA_LANG`
- `READ_MORE_TEXT`
- `QUESTION_PREFIX`
- `FORCE_QUOTE_ID`
- `FORCE_AUTHOR`

## GitHub Secrets
If you use GitHub Actions, the minimal required repository secrets are:
- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PUBLIC_BASE_URL`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_TO`

Optional secrets:
- `EMAIL_FROM`
- `EMAIL_SUBJECT`

The workflow already provides sensible defaults for:
- `OPENAI_MODEL=gpt-4o-mini`
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `EMAIL_FROM_NAME=Daily Quote Bot`
- `MIN_DAYS_BETWEEN_REPEATS=90`
- `INCLUDE_REFLECTION_QUESTION=true`
- `DRY_RUN=false`
- `CONTENT_LANGUAGE=he`
- `WIKIPEDIA_LANG=he`

If you want to customize those later, you can edit `.github/workflows/daily.yml` or extend the workflow to use repository variables.

## Helpful Commands
Install dependencies:
```bash
npm install
```

Validate setup:
```bash
npm run check-config
```

Run tests:
```bash
npm test
```

Build:
```bash
npm run build
```

Build the daily sender:
```bash
npm run build:worker
```

Dry run:
```bash
DRY_RUN=true npm run start:worker
```

Real send:
```bash
DRY_RUN=false npm run start:worker
```

## Project Structure
```text
/src
  /quotes
    quotes.ts
  /services
    email.ts
    openai.ts
    wikipedia.ts
  /core
    selector.ts
    messageBuilder.ts
    storage.ts
  main.ts
/app
  page.tsx
  /api
    /subscribe
      route.ts
/supabase
  schema.sql
/data
  sent.json
/tests
  selector.test.ts
  messageBuilder.test.ts
```

## Notes
- `.env` is git-ignored. Real credentials should never be committed.
- `data/sent.json` is git-ignored so your send history stays private.
- Dates in `data/sent.json` use UTC `YYYY-MM-DD` format.
