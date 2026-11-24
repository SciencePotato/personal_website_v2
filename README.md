# personal_website_v2
Second edition of my Personal Website

## Local preview

This is a static HTML, CSS, and JavaScript site, with no npm build step.
From the repository root, run:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. Stop the server with Ctrl+C.
Serve the repository root so `lib/script.js`, `src/css/main.css`, and
`assets/` resolve correctly. Google Fonts and jQuery are loaded from CDNs,
so those resources require an internet connection.

The browser uses the checked-in `src/css/main.css`. If you change the Sass
source, regenerate that CSS with a separately installed Dart Sass CLI:

```bash
sass src/scss/main.scss src/css/main.css
```