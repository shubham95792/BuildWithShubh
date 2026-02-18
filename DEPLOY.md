# Deployment Guide (Vercel + Supabase)

## 1) Prerequisites
- Code pushed to GitHub/GitLab/Bitbucket
- Supabase project already working in local development
- Vercel account

## 2) Import Project on Vercel
1. Open `https://vercel.com/new`
2. Import your repository
3. Framework should auto-detect as `Next.js`
4. Click `Deploy`

## 3) Configure Environment Variables
In Vercel project settings:
`Settings -> Environment Variables`

Add these variables for `Production` (and optionally `Preview`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER` (optional)

Notes:
- `NEXT_PUBLIC_*` variables are exposed to the browser.
- Do not put private keys (service role) in `NEXT_PUBLIC_*` variables.

## 4) Redeploy After Env Changes
After adding/changing env vars:
- Trigger a new deployment from Vercel dashboard
- Or push a new commit

## 5) Custom Domain (Optional)
1. `Vercel -> Project -> Settings -> Domains`
2. Add your domain
3. Update DNS records as shown by Vercel
4. Wait for SSL issuance

## 6) Supabase Production Checks
Run in Supabase SQL editor if not already done:
- `contact_submissions` table exists
- RLS enabled
- `anon` has `insert` policy on `contact_submissions`
- `authenticated` has required read/update/delete policies for admin pages

## 7) Post-Deploy Smoke Test
Open your production URL and verify:
1. Home page loads without console errors
2. Contact form submit works
3. Entry appears in Supabase table
4. Admin login works (`/admin/login`)
5. Leads page loads and status update works
6. Footer social links open correctly

## 8) Rollback
If a bad deploy happens:
- Vercel -> Deployments -> select previous successful deployment -> `Promote to Production`

## 9) Recommended Ongoing Setup
- Enable branch preview deploys for safe testing
- Keep `.env.local` only for local development
- Add team email alerts for failed builds
