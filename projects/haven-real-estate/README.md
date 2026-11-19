# HAVEN Real Estate — Demo

Arabic RTL, responsive, static real-estate website for a design portfolio.

## Run
Open `index.html` in a browser. Internet access is needed for Google Fonts and Unsplash photographs.

## Features
- Nine **fictional** property listings with search by purpose, city, type, and max price
- Category filters, property details, favorites persisted in localStorage
- Compare up to three listings
- Mortgage payment estimator with validation
- Property visit and seller lead forms that prepare WhatsApp messages
- Responsive layout, accessible buttons, mobile menu, FAQ

## WhatsApp
Set `window.HAVEN_CONFIG.whatsappNumber` in `config.js` to the actual business number in international format, digits only. Until configured, the website attempts to copy the message instead of opening a fictitious recipient.

## GitHub Pages
Create a public repository and upload the contents of this directory at the repository root. In **Settings > Pages**, choose **Deploy from a branch**, `main`, `/(root)`. Wait for GitHub to publish the site.

## Important limitations
- All property names, locations, descriptions, prices, and imagery are fictional/illustrative, not real listings.
- Photos are externally loaded from Unsplash and must be checked for appropriate licensing and replaced with client-approved property photographs before production.
- The site does not persist bookings, check real availability, process payments, or manage listings. A backend, authentication, and database are needed for a production listing management dashboard and verified appointments.
- Favorites are stored only in the visitor's browser.
- Mortgage estimates are illustrative and exclude taxes, insurance, fees, and lender terms.
