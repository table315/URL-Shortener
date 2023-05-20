
# URL Shortener

This app consist of:
- A front-end react app that render a form to allow user to generate the shorten url, there is also a page where user can see list of shortener url.
- A node back-end that handle the url validation shorten logic. just for simplicity, data are in memory and there is a json that mocks exisiting list of shortened urls.

## Getting start  
### To install packages
`npm install` will install packages for both the front-end and backend.
### `npm install`

### To start the server, first `cd server` then:
### `npm run api`

### To run the client
open another terminal and 
### `npm run start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### To run Test 
### `npm test`


### Area of improvements
If there are more times...
- allow the input to take url without protocol section.
- add paginations to the url list.
- add the ability to verify the destination site is valid and grab the title of the site and store them.
