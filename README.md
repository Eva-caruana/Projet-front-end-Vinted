# Front-end Vinted

---

## Table of Contents
- About The Project  
- Built With  
- Getting Started  
- Usage  
- Roadmap  
- Disclaimer  
- Contact  

---

## About The Project

This project is the frontend of a Vinted-like marketplace, developed as part of Le Reacteur bootcamp.

It allows users to browse, search and interact with offers through an interface connected to a backend API.

Main features:

- Display of offers  
- Offer details page  
- Search and filters  
- User authentication handled with cookies for secure token storage (login / signup)
- Publish new offers  
- Payment flow with Stripe  
- Navigation with React Router  

This project helped me understand how to build a complete frontend application and connect it to a backend API.

---

## Built With

- React  
- Vite  
- React Router  
- Axios  
- Stripe (payment integration)  
- CSS  

---

## Getting Started

### Prerequisites

Make sure you have Node.js and Yarn installed.

### Installation

Clone the repository:
git clone https://github.com/Eva-caruana/Projet-front-end-Vinted.git  
cd Projet-front-end-Vinted

Install dependencies
```bash
yarn install
```
Create a `.env` file if needed (API URL, Stripe public key, etc.).

Start the development server:
```bash
yarn dev
```

---

### Usage

### Pages

- Home → display all offers  
- Offer → display details of a specific offer  
- Login / Signup → user authentication  
- Publish → create a new offer  
- Payment → handle payment flow  

### Features

- Search offers by title  
- Filter offers by price  
- Navigate between pages  
- Secure payment with Stripe  

## Roadmap

- Improve state management using React Context for global data (user, offers, etc.)
- Add better error handling  
- Add pagination  
- Improve CSS
- Make it responsive

## Disclaimer

This project is an educational replica of the Vinted platform.  
It is not affiliated with Vinted and has no commercial purpose.

## Contact

Eva Caruana  
GitHub: https://github.com/Eva-caruana  
Project: https://github.com/Eva-caruana/Projet-front-end-Vinted.git 
