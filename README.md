# Nelson Pham Portfolio

Personal portfolio site for Nelson Pham, focused on business analytics, data visualization, SQL, Python, and applied project work.

Live site: [nelsonpham64.github.io](https://nelsonpham64.github.io/)

## Project Structure

```text
.
├── index.html                 # Main portfolio page
├── sql-project.html           # Library database case study
├── analytics-project.html     # Respiratory mortality analytics case study
├── amazon-externship.html     # Sentiment and burnout analysis case study
├── csharp-project.html        # Bakery vending machine project
├── styles.css                 # Shared site styles
├── script.js                  # Shared interactions and animations
└── assets
    ├── docs                   # Resume and document assets
    └── images                 # Portfolio and project images
```

## Notes

- This is a static GitHub Pages site with no build step.
- Keep `index.html` at the repository root so GitHub Pages can serve the homepage correctly.
- Add new project images to `assets/images`.
- Add resume or document files to `assets/docs`.
- When changing `styles.css` or `script.js`, update the version query string in the HTML files so browsers load the newest version.
