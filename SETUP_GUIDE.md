# Setup Guide — Firebase, Resend & Vercel

This project ships with the code already wired up. You just need to create
accounts/keys in Firebase and Resend, then paste them into Vercel as
environment variables. Nothing below requires touching code.

---

## 1. Firebase — create a project & get Admin credentials

The app writes to Firestore using the **Admin SDK** (server-side, via API
routes) rather than the client SDK. This is the secure pattern: it means
your Firestore security rules can stay locked down (deny all client writes)
because only your server, authenticated with a service account, can write.

**Steps:**

1. Go to https://console.firebase.google.com → **Add project** → name it
   (e.g. `ak-portfolio`) → follow the prompts (Google Analytics is optional,
   skip it) → **Create project**.
2. In the left sidebar: **Build → Firestore Database → Create database**.
   - Choose a location close to your users.
   - Start in **Production mode** (we don't need open rules — the server
     writes via the Admin SDK, which bypasses security rules entirely).
3. Create the service account key:
   - Click the ⚙️ gear icon (top left) → **Project settings**.
   - Go to the **Service accounts** tab.
   - Click **Generate new private key** → confirm. A JSON file downloads.
4. Open that JSON file. You need three values from it:
   - `project_id` → this is `FIREBASE_PROJECT_ID`
   - `client_email` → this is `FIREBASE_CLIENT_EMAIL`
   - `private_key` → this is `FIREBASE_PRIVATE_KEY` (a long string that
     starts with `-----BEGIN PRIVATE KEY-----`)

**Keep what:** the whole JSON file — store it somewhere safe (e.g. a
password manager). **Change nothing** in the file; just copy the three
fields above into Vercel exactly as they are (see step 3 below for how to
paste the private key correctly).

**Do NOT** commit this JSON file to git or put it in the repo. It is a
secret.

(Firestore collections `newsletter_subscribers` and `call_requests` are
created automatically the first time someone submits a form — you don't
need to create them manually.)

---

## 2. Resend — get an API key & verify a sending domain

1. Go to https://resend.com → sign up → verify your own email.
2. **Get the API key:**
   - Dashboard → **API Keys** → **Create API Key**.
   - Name it (e.g. `ak-portfolio-prod`), permission = **Full access** (or
     "Sending access" is enough).
   - Copy the key immediately — Resend only shows it once. This is your
     `RESEND_API_KEY`.
3. **Verify a domain (required to send from your own address):**
   - Dashboard → **Domains** → **Add Domain** → enter a domain you own
     (e.g. `yourdomain.com`, or a subdomain like `mail.yourdomain.com`).
   - Resend gives you 3–4 DNS records (usually SPF, DKIM, and sometimes a
     tracking CNAME).
   - Go to your domain registrar / DNS host (e.g. GoDaddy, Namecheap,
     Cloudflare, Google Domains) and add each record exactly as shown.
   - Back in Resend, click **Verify** — this can take a few minutes to a
     few hours depending on DNS propagation.
4. Once verified, decide the "from" address you want to send as, e.g.
   `AK <hello@yourdomain.com>`. This is your `RESEND_FROM_EMAIL`.

**If you don't have a domain yet:** Resend gives you a shared testing
domain (`onboarding@resend.dev`) that works immediately but can only send
to your own verified account email — fine for testing, not for real
subscribers. Buy a cheap domain (Namecheap/Cloudflare, ~$10/yr) for
production use.

**Keep what:** the API key (secret) and the domain DNS records (public,
they live in your DNS, not in code). **Change nothing** in the app code —
`RESEND_FROM_EMAIL` is already read from an environment variable in
`lib/resend.ts`.

---

## 3. Vercel — add the environment variables

1. Push this project to a GitHub repo, then import it at
   https://vercel.com/new.
2. Before (or after) the first deploy: **Project → Settings → Environment
   Variables**. Add each of the following (Production, and Preview if you
   want form testing on preview URLs too):

| Key | Value | Notes |
|---|---|---|
| `FIREBASE_PROJECT_ID` | from the service account JSON | plain text |
| `FIREBASE_CLIENT_EMAIL` | from the service account JSON | plain text |
| `FIREBASE_PRIVATE_KEY` | from the service account JSON | **paste the whole multi-line key, including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`.** Vercel's env var UI handles real newlines fine — just paste it as-is into the value box. |
| `RESEND_API_KEY` | from Resend → API Keys | plain text |
| `RESEND_FROM_EMAIL` | e.g. `AK <hello@yourdomain.com>` | must use a domain verified in Resend |

3. Click **Save**, then **redeploy** (Deployments tab → ⋯ → Redeploy) so
   the new variables take effect.

That's it — the Newsletter and Schedule a Call forms will now write to
Firestore and send emails through Resend in production.

---

## Local development

```bash
cp .env.local.example .env.local
# fill in the same 5 values as above
npm install
npm run dev
```

## What to keep vs. change in code

- **Keep as-is:** `lib/firebase-admin.ts`, `lib/resend.ts`, both files in
  `app/api/*/route.ts`. They only read from `process.env`, so no code
  changes are needed when you rotate keys — just update the Vercel env
  vars and redeploy.
- **Only thing to edit later:** the notification recipient
  (`ampolukarthikay@gmail.com`) in `lib/resend.ts` (`NOTIFY_EMAIL`) if that
  ever changes, and the phone/email/social links in
  `app/contact/page.tsx`.
