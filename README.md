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
- `images/storyboard/slide1.png`
- `images/storyboard/slide2.png`
- `images/storyboard/slide3.png`
- `images/storyboard/slide4.png`
- `images/storyboard/slide5.png`

---

## Exercise 4 – D3 Visualisation

Exercise 4 extended the website by implementing **D3.js** to generate charts directly from CSV data instead of using static images.

The following steps were completed:

- **4.1:** Created an SVG illustration using basic SVG shapes to understand the SVG coordinate system and grouping elements.
- **4.2:** Used D3 to manipulate webpage elements, change styles, and dynamically append elements to the DOM.
- **4.3:** Set up a responsive SVG container to display charts using D3.
- **4.4:** Loaded processed data from a CSV file using `d3.csv()` and converted numeric values for use in visualisation.
- **4.5:** Bound the dataset to SVG rectangles to generate a bar chart.
- **4.6:** Implemented D3 scaling (`scaleLinear` and `scaleBand`) to ensure the chart adapts to different data ranges and SVG sizes.
- **4.7:** Added labels to the chart using grouped SVG elements so that each bar displays both the brand name and the model count.

The final result is a **D3-generated bar chart showing the number of television models available for each brand**, built dynamically from the dataset.

---

## Data Source

Australian Government Energy Rating product comparator (Televisions category):  
https://reg.energyrating.gov.au/comparator/product_types/

---

## Use of Generative AI (GenAI) Declaration

Generative AI tools were used to assist with:

- Revising and improving website content for **Exercise 3** (data story text, headings, chart captions)
- Providing suggested structure for the storyboard and “About the data” sections
- Helping understand D3 concepts and suggesting implementation approaches for the visualisation tasks

After receiving GenAI assistance:
- I reviewed and edited the outputs to match my dataset and results
- I implemented and tested the final code myself
- I verified that the visualisations matched the processed data

All final content and code submitted in this repository has been reviewed and understood by me.

---

## Hosting

The website is hosted using **GitHub Pages**, as instructed by the tutor.

---

## Author

Nguyen Dong Khanh – 105553910  
COS30045 – Data Visualisation