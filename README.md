# Doctor Directory Web App

A responsive and fully client-side searchable, filterable, and sortable doctor directory. This project fetches data from a mock API and allows users to search for doctors, apply multiple filters, and sort results. URL query parameters are maintained to ensure back/forward browser navigation retains state.

## Features

- **Autocomplete Search**
  - Search by doctor name.
  - Shows top 3 suggestions.
  - Press Enter or click suggestion to filter list.

- **Filter Panel**
  - **Consultation Type**: Single-select radio (Video Consult, In Clinic).
  - **Specialties**: Multi-select checkboxes (General Physician, Dermatologist, etc.).
  - **Sort Options**: 
    - Fees (ascending).
    - Experience (descending).
    
- **Doctor List**
  - Shows name, specialty, experience, and consultation fee.
  - Rendered dynamically from API.
  
- **Client-side Filtering**
  - All search, filter, and sort logic handled on the client.
  - Query parameters reflect current filters.
  - Browser navigation retains state.

## Tech Stack

- HTML, CSS (Vanilla/Bootstrap)
- JavaScript (Vanilla JS)
- [Mock API](https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json)

## How to Run

1. Clone or download the repository.
2. Open `index.html` in any browser.
3. Start searching and filtering doctors!

## Folder Structure
doctor-directory/
├── index.html
├── style.css
├── script.js
└── README.md
## `data-testid` Support

Test automation supported via specific `data-testid` attributes for every interactive element:
- `autocomplete-input`, `suggestion-item`, `doctor-card`, `filter-video-consult`, `filter-specialty-*`, `sort-fees`, etc.

Refer to the official task documentation for the complete list.

## Screenshots

![UI Design](./screenshot.png)

## Deployment

Can be hosted on GitHub Pages, Netlify, or Vercel.

---

**Final Submission:** [Submission Form](https://forms.office.com/r/jzUf2S2tSC)
