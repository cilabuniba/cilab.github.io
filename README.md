# CILab website

Redesign of the Computational Intelligence Laboratory (CILab), Department of Computer Science, University of Bari Aldo Moro.

## Local preview

Install Hugo Extended, then from this folder run:

```powershell
hugo server -D
```

Open `http://localhost:1313/`.

## Main content

- `data/people.yaml` — current members and profile links
- `data/visitors.yaml` — visiting researchers
- `data/alumni.yaml` — alumni
- `data/publications.yaml` — selected publications
- `data/projects.yaml` — selected projects
- `content/research/` — research areas
- `content/news/` — news archive
- `content/theses.md` — thesis information
- `assets/css/main.css` — visual design
- `static/images/cilab-logo.svg` — CILab wordmark used by the site

## Visual identity

Primary blue: `#345995`

Accent yellow (Sunflower Delight): `#EAC435`

The design intentionally uses blue as the dominant institutional colour and yellow only as an accent.

## Images

The People page references the photographs already published by the current CILab Google Site. These are intentionally kept as source URLs so the redesign can be reviewed immediately without redistributing third-party copies. If a Google-hosted photograph does not load, the template automatically falls back to an initial-based placeholder. Before production deployment, replace each remote `image:` URL in `data/people.yaml` with a local path such as `/images/people/name.jpg` after choosing the definitive portrait for each member.

## Production build

```powershell
hugo --minify
```

The generated static site is placed in `public/` and can be deployed to GitHub Pages or a University web server.

## Brand assets

The supplied CILab logo has been cropped to its actual drawing bounds and included in two variants:

- `static/images/cilab-logo-blue.svg` — `#345995`, for white/light backgrounds
- `static/images/cilab-logo-white.svg` — white, for blue/dark backgrounds

The header and homepage use the blue version; the footer uses the white version.

## People profiles

Every current CILab member has an internal profile at `/people/<name>/`. External personal or institutional homepages, when available, are linked from the internal profile rather than replacing it. Senior profiles have been migrated and cleaned from the previous CILab pages.
