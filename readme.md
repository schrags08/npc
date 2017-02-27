# TODO

- X port bars page
- X get flickity working
- X attempt to get a gallery working with bricks or macy.js
  - should read from data file
- add gallery images to Azure
- old code is in foundation.npc1
- legacy site data is in OneDrive/EC2Backup/npc
- JS should only load for the pages that need it
  - e.g. app.js is currently loading flickity on child pages
- verify timeslots on bars page
- add footer from old site

# Neighborhood Pub Crawl Template

This is the official Neighborhood Pub Crawl website template. It has a Gulp-powered build system with these features:

- Handlebars HTML templates with Panini
- Sass compilation and prefixing
- JavaScript concatenation
- Built-in BrowserSync server
- For production builds:
  - CSS compression
  - JavaScript compression
  - Image compression

## Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```

Finally, run `npm start` to run Gulp. Your finished site will be created in a folder called `dist`, viewable at this URL:

```
http://localhost:8000
```

To create compressed, production-ready assets, run `npm run build`.
