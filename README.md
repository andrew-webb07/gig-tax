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

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
