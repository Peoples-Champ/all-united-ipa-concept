# All United Medical Group IPA — Website Concept

A standalone, responsive website concept created from All United Medical Group IPA's publicly available information.

## Included

- Conversion-focused homepage
- Mobile navigation and persistent mobile quick actions
- Searchable demonstration physician directory
- Grid and map-style directory views
- Six reusable fictional physician profiles
- Member Resources page
- Health Plans page
- Provider Resources and network-interest page
- About, mission, service areas, and leadership page
- Contact and policy-placeholder pages
- Accessibility-conscious focus, contrast, semantics, and reduced-motion support

## Run locally

No build step or package installation is required. Open `index.html` in a modern browser, or serve this directory with any static web server.

For example:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Content status

Publicly verified content used in the concept includes:

- Founded in 2016
- Service areas listed on All United's public website
- Eleven publicly listed health-plan relationships
- Publicly listed leadership names and titles
- Colton office address
- Stephanie Serrano's publicly listed provider-relations email

The six physician records, availability, care philosophies, plan assignments, portraits, office information, and form interactions are demonstration content only. They are labeled accordingly throughout the website.

## Before production use

All United should provide and approve:

- Official logo artwork and complete brand standards
- Current physician roster and directory data
- Verified health-plan participation by physician
- Main and member-services phone numbers
- General email and office hours
- Urgent care, hospital, lab, and facility data
- Member and provider workflows
- Forms and portal destinations
- Approved legal, privacy, accessibility, and nondiscrimination language
- Licensed photography or approved staff/physician imagery

## Structure

- `index.html` — application shell, navigation, footer
- `styles.css` — complete responsive visual system
- `data.js` — demonstration physicians and verified public organization data
- `app.js` — page templates, hash router, directory filtering, and interactions

The data layer is deliberately separated so a production API or database can replace the demonstration records without redesigning the user interface.