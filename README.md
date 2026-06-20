# Mastermind Learning App — Deployment Guide

This app is fully built. What's left is **three steps you do yourself** because
they require your own accounts: create a Supabase project, push the code to
GitHub, and deploy on Vercel. This takes about 10–15 minutes total.

---

## What's already built

- Email/password auth (sign up, log in, log out) via Supabase Auth
- Protected routes (`/dashboard`, `/modules/*`) that redirect to `/login` if not signed in
- A contact form at `/contact` that POSTs to `/api/contact`, which validates and
  stores the message in a `contact_messages` table
- A `user_progress` table that tracks each user's completion per module —
  this is the persistent data model required by the brief
- 5 structured modules — a Foundation module on mindset shift, three pillar
  modules (Encoding, Retrieval, Enablers), and a PERRIO capstone module that
  ties them together — each structured **practice-first**: the exercise comes
  before the explanation, every time
- Navy blue / white branding with animated transitions, matching your logo

---

## Step 1 — Create your Supabase project (5 min)

1. Go to **supabase.com** → New Project. Name it `mastermind-learning`. Save the database password somewhere safe.
2. Once the project is ready, go to **SQL Editor** → **New query**.
3. Open `supabase/schema.sql` from this project, copy the whole file, paste it into the SQL editor, and click **Run**.
   This creates `profiles`, `user_progress`, and `contact_messages`, with Row Level Security policies already configured.
4. Go to **Project Settings → API**. Copy two values:
   - **Project URL**
   - **anon / public key**
5. Go to **Authentication → Providers → Email**. For fastest testing during grading,
   toggle **off** "Confirm email" — this lets new sign-ups log in immediately
   without clicking an email link. (You can turn it back on later for production.)

---

## Step 2 — Add your logo (1 min, optional)

Drop your logo file into the `public/` folder and name it exactly **`logo.png`**.
The app already checks for this file automatically — no code changes needed.
If it's not there, the app shows a clean "ML" text mark instead, so nothing breaks either way.

---

## Step 3 — Push to GitHub (3 min)

```bash
cd mastermind-learning
git init
git add .
git commit -m "Mastermind Learning App - capstone submission"
```

Create a new empty repository on GitHub (no README/license), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/mastermind-learning.git
git branch -M main
git push -u origin main
```

---

## Step 4 — Deploy on Vercel (5 min)

1. Go to **vercel.com** → **Add New Project** → import your GitHub repo.
2. Vercel auto-detects Next.js — leave build settings as default.
3. Before clicking Deploy, open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | (from Step 1.4) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (from Step 1.4) |

4. Click **Deploy**. In about a minute, you'll get a public URL like
   `https://mastermind-learning.vercel.app` — this is your public URL for submission.

---

## Step 5 — Test the checklist before submitting

- [ ] Visit your public URL — landing page loads
- [ ] Sign up with a new email — you land on `/dashboard`
- [ ] Log out — you're returned to the landing page
- [ ] Try visiting `/dashboard` while logged out — you're redirected to `/login`
- [ ] Log back in — you return to `/dashboard`
- [ ] Open a module, fill the practice exercise, click "Mark module complete"
- [ ] Refresh the page — your answer and completed state are still there (data persists)
- [ ] Go to `/contact`, submit the form — you see "Message sent"
- [ ] In Supabase → Table Editor → `contact_messages`, confirm your message is there

If every box checks, all four grading requirements are satisfied:
auth + protected routes, working contact form with backend storage, a persistent
data model, and a public URL.

---

## Local development (optional)

```bash
npm install
cp .env.local.example .env.local   # then fill in your Supabase values
npm run dev
```

Visit `http://localhost:3000`.

---

## If something doesn't work

- **"Invalid API key" errors** → double-check the env var names match exactly
  (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) and that you
  redeployed after adding them in Vercel.
- **Sign-up doesn't log you in immediately** → "Confirm email" is still on in
  Supabase Auth settings (see Step 1.5).
- **Contact form fails silently** → check that `supabase/schema.sql` ran
  successfully — the `contact_messages` table and its insert policy must exist.
