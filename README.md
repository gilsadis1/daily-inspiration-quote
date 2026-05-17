# Daily Inspiration Quote

`Daily Inspiration Quote` is a small Hebrew landing page and daily email product. Parents leave an email, confirm it, immediately receive a welcome quote, and then receive one daily inspirational quote with a short kid-friendly story and a Wikipedia link.

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

The current workflow sends the daily email to active Supabase subscribers when `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `PUBLIC_BASE_URL` are configured. It also stores sent quote history in Supabase so quote rotation stays reliable across GitHub Actions runs. New subscribers receive one static welcome quote after verification, and the daily workflow skips anyone who already received a quote that day. Without Supabase, it falls back to `EMAIL_TO` and local `data/sent.json`.

## Supabase Setup
Create a Supabase project and run the SQL in `supabase/schema.sql`.

The schema creates:
- `subscribers` for email signup status
- `verification_tokens` for double opt-in links
- `sent_quotes` for repeat prevention
- `subscriber_deliveries` for per-subscriber same-day delivery tracking

RLS is enabled on all tables. The app uses `SUPABASE_SERVICE_ROLE_KEY` only on the server side, so no public table policies are required for this MVP.

Local and production env need:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PUBLIC_BASE_URL`

`PUBLIC_BASE_URL` is the public URL of the site, for example:
- local: `http://localhost:3000`
- Vercel: `https://your-project.vercel.app`
- custom domain: `https://your-domain.com`

## Email Setup
This project supports two email providers:
- `smtp` for simple personal automation
- `brevo` for a more scalable sender

Personal Gmail is intentionally treated as a starter sender, not a bulk email provider. By default, the daily worker stops before sending if more than `100` recipients are pending for the day. Configure this with `MAX_DAILY_EMAIL_RECIPIENTS`. If you hit the cap, move to a production email provider before continuing.

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

Example Brevo setup:
1. Authenticate your sending domain in Brevo.
2. Create an API key.
3. Use:
   - `EMAIL_PROVIDER=brevo`
   - `BREVO_API_KEY=your_brevo_api_key`
   - `EMAIL_FROM=hello@your-domain.com`
   - `EMAIL_FROM_NAME=SparkQuest`
   - `EMAIL_REPLY_TO=you@example.com`

## Environment Variables
See `.env.example`.

Required for normal sending:
- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PUBLIC_BASE_URL`
- `EMAIL_PROVIDER`
- `EMAIL_FROM`

Required for `EMAIL_PROVIDER=smtp`:
- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`

Required for `EMAIL_PROVIDER=brevo`:
- `BREVO_API_KEY`

Required only if you are not using Supabase subscribers:
- `EMAIL_TO`

Common optional values:
- `OPENAI_MODEL`
- `EMAIL_FROM_NAME`
- `EMAIL_REPLY_TO`
- `EMAIL_SUBJECT`
- `MAX_DAILY_EMAIL_RECIPIENTS`
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
- `EMAIL_PROVIDER`
- `EMAIL_FROM`

If using Brevo:
- `BREVO_API_KEY`

If using SMTP:
- `SMTP_USER`
- `SMTP_PASS`

Optional secrets:
- `EMAIL_TO` if you want single-recipient fallback without Supabase subscribers
- `EMAIL_REPLY_TO`
- `EMAIL_SUBJECT`

The workflow already provides sensible defaults for:
- `OPENAI_MODEL=gpt-4o-mini`
- `EMAIL_PROVIDER=smtp`
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `EMAIL_FROM_NAME=Daily Quote Bot`
- `MAX_DAILY_EMAIL_RECIPIENTS=100`
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
    sentQuotes.ts
    subscribers.ts
    supabase.ts
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
- Sent quote history is stored in Supabase when Supabase env vars are configured.
- `data/sent.json` is still git-ignored and used as a local fallback.
- Dates use UTC `YYYY-MM-DD` format.
