# Gig-Tax: Tax calculator for independent and professional musicians

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

Gig-Tax is designed to help hire-on musicians keep track of their income and tax deductions in a user-friendly and efficient app. 

It focuses on 3 different input forms: gigs, tours and receipts. The user has the ability to enter in individual gigs that store the artist, location, description of the gig, the date of the gig and the gig's pay. A gig can be a show, studio session, drum lesson or anything related to independent music income. The tour form has all of the above plus the number of gigs, per diem, travel day pay and a date range for the tour start and end. The last input form allows users to save receipts that can be used to deduct from their total taxable income.

Becase the app is focused on efficiency and simplicity for the user, it calculates a number of things behind the scences for the user. Using the geocoder API from google, the app calculates the number of miles to deduct for a gig or tour by calculating the distance in miles between the user's home address and the gig address (or tour start address) and returns and stores that mileage. The app calculates the number of travel days (non-show days) on a tour by subtracting the total number of shows from the total number of days between the start and end date of the tour.

The app has an entries page that shows all of the user's gig, tour and receipt entries.

The key feature is shown in the tax totals page. The page displays the total amount of money spent on receipts, total amount of money made (gross), total mileage, total mileage tax deduction and most importantly, the total amount of tax owed. It displays the totals by year as well as quarterly in a specfic year. All of these calculations are done by the app.

### Additional Features

The app has buttons on the landing page that take the user to each of the 3 forms. The entries page has a search bar that searches through all of the gigs, tours and receipts. It also has a year dropdown menu that shows only the entries within that specified year. The tax totals page also has this year dropdown menu as well.

The app also has login, register and logout options as well.

## Wireframe

![WireframeGigTax](https://user-images.githubusercontent.com/81766179/123299766-7aebc780-d4df-11eb-8872-25f03064eabb.png)

## ERD

![ERDGigTax](https://user-images.githubusercontent.com/81766179/123299884-92c34b80-d4df-11eb-9fcc-1313e055e17f.png)

## Images of Gig-Tax

![GigTaxLogin](https://user-images.githubusercontent.com/81766179/123300762-825fa080-d4e0-11eb-8464-4dd16498c84b.png)

![GigTaxRegisterForm](https://user-images.githubusercontent.com/81766179/123300833-94d9da00-d4e0-11eb-84dc-df1dd35ef36f.png)

![GigTaxLandingPage](https://user-images.githubusercontent.com/81766179/123300869-a02d0580-d4e0-11eb-9310-4bda0b681cab.png)

![GigTaxGigForm](https://user-images.githubusercontent.com/81766179/123300924-af13b800-d4e0-11eb-9493-280ce401e7d2.png)

![GigTaxTourForm](https://user-images.githubusercontent.com/81766179/123300960-b89d2000-d4e0-11eb-89d5-e9fa4b53440f.png)

![GigTaxReceiptForm](https://user-images.githubusercontent.com/81766179/123301006-c488e200-d4e0-11eb-8237-ac37a72f21b6.png)

![GigTaxEntries](https://user-images.githubusercontent.com/81766179/123301055-d1a5d100-d4e0-11eb-8b72-eb0c177b3517.png)

![GigTaxTotals](https://user-images.githubusercontent.com/81766179/123301086-db2f3900-d4e0-11eb-9e65-9325929059a6.png)

### Getting Started

npx create-react-app my-app
cd my-app
npm start

If you've previously installed create-react-app globally via npm install -g create-react-app, we recommend you uninstall the package using npm uninstall -g create-react-app or yarn global remove create-react-app to ensure that npx always uses the latest version.

### Creating an App

You’ll need to have Node 10.16.0 or later version on your local development machine (but it’s not required on the server). We recommend using the latest LTS version. You can use nvm (macOS/Linux) or nvm-windows to switch Node versions between different projects.

To create a new app, you may choose one of the following methods:

npx
npx create-react-app my-app
(npx is a package runner tool that comes with npm 5.2+ and higher, see instructions for older npm versions)

npm
npm init react-app my-app
npm init <initializer> is available in npm 6+