# Twitter Clone
#### Twitter Clone is a social media application built with Node.js, Express.js, and EJS. It allows users to create accounts, post tweets, follow other users, and view a feed of tweets.

To get started with the Twitter Clone, follow these steps:

Clone the repository
```
https://github.com/gregorisbachtsevanos/twitter-clone.git
```
cd into the project
```
cd twitter-clone
```
Install dependencies:

```
npm install
```
Set up environment variables:

Create a .env file in the root of your project and add the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```
Start the development server:

```
npm run nodemon
```
The app should now be running on http://localhost:3000.

Usage
Sign Up / Login:

Users can sign up or log in using their email and password.
Create Tweet:

Once logged in, users can create new tweets.
View Tweets:

Users can view their tweets and the tweets of users they follow in their feed.
Follow / Unfollow:

Users can follow and unfollow other users.
Edit / Delete Tweet:

Users can edit or delete their own tweets.
