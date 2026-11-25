# personal_website_v2

## Reveal bootstrap check

```bash
node --test tests/reveal-bootstrap.test.cjs
```

This dependency-free check covers unavailable jQuery and the existing reveal
registration. Hidden reveal styles are enabled only after jQuery is available,
so timeline content remains readable without the decorative CDN or JavaScript.
After editing Sass, regenerate the served stylesheet with:

```bash
sass src/scss/main.scss src/css/main.css
```

Second edition of my Personal Website
Testing