This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Neighborhood Map

This project displays a selection of coffeeshops in Oakland,CA. Click on Menu button in top left corner to see list of all coffee shops. Use the search feature to narrow down the selection. Click on location markers to learn more information about each coffee shop.

### Instructions

- Clone or download this repo
- With your command terminal pointing to the directory where the files are cloned/downloaded to, install all necessary dependencies by running npm install
- Launch the app by running npm start
- NOTE The service worker will only work in production build, not in development mode. You can run the app in production build by running npm run build and server -s build then visiting localhost:5000 in your browser.


### Acknowledgements
- Udacity Slack channel for Project 7 to help me with typos and search for errors other students encountered
- Referenced [Doug Brown's Walkthrough](https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be) for component structure.
  - Specifically for error handling when offline. Please see MapNotDisplayed.js file
- Watched [Yahya Elharony's Video on Dynamic Markers](https://www.youtube.com/watch?v=nDJ00zO9X2U)
- GooglMaps API error handling help from Project 7 slack channel and @Kaisma

### APIs
This app utilizes Google Maps and FourSquare APIs
