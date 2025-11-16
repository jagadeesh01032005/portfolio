# Portfolio (static site)

This is a simple static portfolio website (HTML, CSS, JS) ready to deploy.

Local development
- Serve locally with Python (works on Windows PowerShell):

```powershell
cd "d:\New folder"
python -m http.server 8000

# then open http://localhost:8000
```

Deploy options

1) GitHub Pages (recommended)

- A GitHub Actions workflow is included to automatically publish the repository root to the `gh-pages` branch whenever you push to `master`.
- Verify the repository settings → Pages to ensure the site is served from `gh-pages` branch (if configured) or wait a few minutes after the first successful workflow run.

2) Netlify / Vercel

- Both services detect static sites automatically. Point them at this repository and they will deploy the root folder.

Notes
- When testing locally, use a local server instead of opening `index.html` via `file://` to avoid issues loading assets and cross-origin restrictions.
- The PDFs and images included in the repository are referenced by relative paths and will be served correctly by the static host.

If you want a different deployment target (Netlify, Vercel, Firebase Hosting), tell me which one and I can add an optional configuration file.

Contact form (Formspree)

If you want form submissions emailed to `jagadeeshmollguri@gmail.com` without building a server, use Formspree:

1. Go to https://formspree.io and sign up.
2. Create a new form and copy the form endpoint (looks like `https://formspree.io/f/XXXXXX`).
3. Open `d:\New folder\script.js` and set `CONTACT_ENDPOINT` to that URL.
4. Deploy — submissions will be forwarded to the email you configure in Formspree.

The included contact form falls back to opening the user's mail client if no endpoint is configured.
