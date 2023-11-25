# House Marketplace App

- Dynamic House Marketplace React.js project
- User functionalities:
  - Registration and login
  - Posting property listings for rent or sale
  - Browsing available listings with pagination
  - Seamless interaction with property owners
    - Using `mailto` function for communication via email
  - Logged-in users can manage listings:
    - Edit or remove listed properties
- Responsive design implemented:
  - Includes a bottom navigation bar for enhanced mobile user experience

## Features

- **User Authentication**: Utilizes Firebase for authentication methods including email-password login and Google authentication.
- **Database Management**: Firestore serves as the database to store user details and property listings data.
- **Image Uploads**: Firebase Storage enables users to upload images associated with their property listings.
- **Interactive Image Slider**: Implements the React Swiper library for a user-friendly image slider feature within property listings.
- **Map Embedding**: Utilizes React Leaflet library to display property addresses via an embedded map view.
- **Profile Editing**: Users have the ability to edit their profiles, including their name.
- **Toast Notifications**: Utilizes React-Toastify for displaying stylish success or error messages.
- **Responsive Design**: Tailwind CSS framework used for a responsive UI design.

## Future Implementations

- **Dark Mode**: Implement a dark mode feature to enhance user experience and reduce eye strain.
- **Image Handling**: Allow users to view and delete previously uploaded listing images while updating their listings.

## Installation

To run this project locally:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up Firebase configuration for authentication, Firestore, and Firebase Storage.
4. Run the application using `npm start`.

## Tech Stack

- React.js
- React Router
- Firebase (Authentication, Firestore, Storage)
- React Swiper
- React Leaflet
- React-Toastify
- Tailwind CSS

---
