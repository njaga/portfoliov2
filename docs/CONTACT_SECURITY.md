# Contact form security

The portfolio contact form uses Cloudflare Turnstile and validates every token
**server-side** before sending an email. The old client-only math challenge is
intentionally removed because it could be bypassed.

## Configure before merging/deploying

Create a Turnstile widget in Cloudflare and allow the production domain
(`ndiagandiaye.com`) and any preview domains used for testing.

Set these environment variables in Vercel (or your hosting provider):

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: public widget site key.
- `TURNSTILE_SECRET_KEY`: private server-side validation key.
- Existing `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` for delivery.

Do not commit Turnstile/SMTP secrets. Redeploy after configuring the public
site key (it is read at build time). Without the keys, the public submit button
will be disabled and the API will fail closed.

The API validates incoming data with Zod, caps its payload, validates Turnstile,
escapes user-controlled HTML before email rendering, and includes a honeypot.
Turnstile prevents simple token replay. For high-volume abuse, add a **distributed**
rate limit (such as Vercel WAF or a managed KV/Redis service): a process-local
counter is not reliable for serverless functions.

Test in staging before merging to production.
