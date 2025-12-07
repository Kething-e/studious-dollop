# Studious Dollop — GitHub Pages site

This repository contains a minimal static site for GitHub Pages.

Files added:
- `index.html` — the page that will be served.
- `.nojekyll` — prevents GitHub Pages from processing the site with Jekyll (useful for files/dirs that start with an underscore).

How to publish
1. Push these files to your repository.
2. Go to the repository on GitHub → Settings → Pages (or Settings → Code and automation → Pages).
3. Under "Source" select the branch you pushed to (usually `main`) and the folder `/ (root)` and save.
4. GitHub will provide the published URL (for a project site it will be: https://kething-e.github.io/studious-dollop).

If you want the site at the root user domain (kething-e.github.io), rename the repository to `kething-e.github.io`.

Local commands to push a branch and open a PR (recommended)
# create a branch, add the files, push branch, then open a PR
git checkout -b gh-pages-setup
# create the three files (or copy them into your working tree)
git add index.html .nojekyll README.md
git commit -m "Add minimal GitHub Pages site (index.html)"
git push -u origin gh-pages-setup

# Open a PR (two options)
# Option 1: using the GitHub CLI
gh pr create --base main --head gh-pages-setup --title "Add minimal static GitHub Pages site" --body "This PR adds a minimal static site (index.html), a .nojekyll file to prevent Jekyll processing, and a README with publishing instructions. After merging, enable Pages in Settings → Pages with branch main and folder / (root)."

# Option 2: open a PR in the web UI by visiting:
# https://github.com/Kething-e/studious-dollop/compare/main...gh-pages-setup