# Appliance Energy Consumption Website – COS30045

## Overview
This repository contains a small website developed for COS30045. It started as a basic demonstration site for **Exercise 0.2** (HTML/CSS/JS + GitHub workflow) and was later extended for **Exercise 3** to communicate a short data story about televisions currently available in Australia.

The website includes three pages:
- **Home** – Data story using charts (Q1–Q3)
- **Televisions** – Storyboard showing the intended user journey
- **About Us** – Data source and data quality information (source, processing, privacy, limitations, ethics)

Navigation between pages is handled using JavaScript, and consistent styling is applied using an external CSS file.

---

## Exercise 3 – Data Story (What was added/changed)
For Exercise 3, the website was updated to present a data story using three questions:

1. **Screen technologies:** Which screen technologies are currently available in Australia and which are most frequent?  
2. **Screen sizes:** What screen sizes are currently available and which are most frequent?  
3. **Brands:** Which brands have the greatest number of different models?

### What I produced for the website
- Updated **Home page (index.html)** to include the three charts with supporting text:
  - “What this shows”
  - “Why it matters”
  - “Key finding”
  - A short summary section
- Updated **Televisions page (television.html)** to display a **horizontal storyboard** (slides) that outlines the story flow from introduction → insights → limitations.
- Updated **About Us page (about.html)** to include:
  - Data source (Australian Government Energy Rating comparator website)
  - Data processing summary (cleaning + standardising + aggregation)
  - Privacy statement
  - Accuracy/limitations
  - Ethics statement

### Visual assets used
The website displays exported chart images and storyboard slides:
- `images/q1_screen_tech.png`
- `images/q2_screen_size.png`
- `images/q3_brand_models.png`
- `images/storyboard/slide1.png` to `slide5.png`

---

## Data source
Australian Government Energy Rating product comparator (Televisions category):  
https://reg.energyrating.gov.au/comparator/product_types/

---

## Use of Generative AI (GenAI) Declaration
Generative AI tools were used to assist with:
- Revising and improving website content for **Exercise 3** (data story text, headings, chart captions)
- Providing suggested structure for the **storyboard** and the written “About the data” sections
- Suggesting formatting and styling improvements (e.g., horizontal storyboard layout and readable section structure)

After receiving GenAI assistance:
- I reviewed and edited the final text to match my dataset and charts
- I implemented the changes myself in HTML/CSS
- I verified the outputs on the website and ensured they matched my KNIME results

All final content and code submitted in this repository has been checked, understood, and tested by me, and I can explain how the site works and how the story was constructed.

---

## Hosting
The website is hosted using **GitHub Pages**, as instructed by the tutor.

---

## Author
Nguyen Dong Khanh - 105553910
COS30045 – Data Visualisation
