# CILab Website

Official website of the **Computational Intelligence Laboratory (CILab)** at the **University of Bari Aldo Moro**.

Built with [Hugo](https://gohugo.io/).

## Local development

```bash
hugo server
```

The website will be available at:

```text
http://localhost:1313/
```

## Structure

```text
content/                # Website content and member profiles
data/people.yaml        # Current members
data/alumni.yaml        # Former members
static/images/people/   # Member photographs
layouts/                # Hugo templates
hugo.toml               # Site configuration
```

## Production

Before deployment, set the canonical production URL in `hugo.toml`:

```toml
baseURL = 'https://<production-domain>/'
```

Then generate a fresh production build:

```bash
hugo --minify
```

The generated website will be available in `public/`.

Do not edit or commit `public/` manually.

---

**Computational Intelligence Laboratory (CILab)**  
Department of Computer Science  
University of Bari Aldo Moro