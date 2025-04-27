## MyMood Application

## Overview
MyMood is a web-based application designed to monitor and track your team's daily mood. 

1. Users can submit their mood for the day, and the system will store their responses. The app detects duplicate entries to ensure users don't submit multiple responses on the same day
2. Admin users can view the daily, weekly, and monthly average mood ratings, as well as a stream of recent comments. 


This app is built using React, TypeScript, and Vite.

## Setup and Installation

1. To get started with the application, clone this repository
2. Make sure you have Node.js and npm installed. You can check the versions with the following commands:
  node -v   # Should be v23.3.0 or similar
  npm -v    # Should be v11.0.0 or similar
3. Goto the mymood-app, and install dependencies:
  npm install
4. For setting up/changing environment Variables - update `.env` file in the root of this project 

Note: The env.prod file has not been added yet, so be sure to configure it when preparing the app for production.

## Development

Start the application in development mode using: npm run dev. 
Your backend should be running

## Pending Features
Stream of Recent Comments: Is not yet implemented.
Monthly and Weekly Bar Charts: Need improvement for better readability and presentation.