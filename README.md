# The Bull's Gazette

## Overview

The Bull's Gazette is a modern, feature-rich news platform designed to deliver articles dynamically while providing robust subscription and AdBlock detection mechanisms. It includes a sleek frontend inspired by the Tagdiv Newspaper theme and a powerful backend built with Node.js and PostgreSQL.

---

## Features

### **Frontend**
- **Responsive UI**: Built with React and TailwindCSS for a seamless user experience.
- **Dynamic Content**: Articles fetched dynamically from the backend.
- **Subscription Management**: Allows users to upgrade to premium for additional benefits.
- **AdBlock Detection**: Polite popup for users with AdBlock enabled.

### **Backend**
- **Built with Node.js and Express**: Handles APIs, authentication, and business logic.
- **PostgreSQL Database**: Stores articles, users, and subscriptions securely.
- **Stripe Integration**: Supports payments for premium subscriptions.
- **SEO Optimization**:
  - Meta tags, JSON-LD structured data, and Open Graph support.
  - Sitemap and RSS feed generation for better search engine visibility.

### **Other Features**
- **Scraper Utility**: Fetches content from existing websites for easy data population.
- **Admin Controls**: Allows administrators to manage articles and users.

---

## Project Structure

TheBullsGazette/
├── backend/            # Node.js backend
│   ├── server.js       # Main server file
│   ├── routes/         # API route handlers
│   ├── middleware/     # Authentication and subscription checks
│   ├── utils/          # Utility scripts (e.g., seedDatabase)
│   └── .env            # Environment variables (not included in repo)
├── frontend/           # React frontend
│   ├── src/
│   │   ├── pages/      # Home, Article, Subscription pages
│   │   ├── components/ # Reusable UI components (e.g., AdBlockPopup)
│   │   ├── context/    # Global state management (e.g., UserContext)
│   │   ├── utils/      # Utility functions (e.g., AdBlock detection)
│   │   └── App.js      # Main React application
│   └── package.json    # Frontend dependencies
├── scraper/            # Scraper utility
│   └── scrapeContent.js
├── README.md           # Project documentation
└── LICENSE             # Project license


---

## Prerequisites

Before running this project, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git**

---

## Setup Instructions

### **1. Clone the Repository**
```bash
git clone https://github.com/OswaldKardingson/TheBullsGazette.git
cd TheBullsGazette

### **2. Backend Setup**
cd backend
npm start

# Edit the .env file with your own database credentials
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/your_database_name  //default postgresql username is postgres1 and pass postgres
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key //use random number for testing

# Set up the database
CREATE DATABASE bulls_gazette;

### **3. Scraper Setup**
cd ../scraper
npm start

### **3. Frontend Setup**
cd ../frontend
npm install
npm start

# The frontend will run at http://localhost:3000

### **4. Running Scraper **
cd ../scraper
node scrapeContent.js // Populates the database with TBG articles

## Deployment Instructions

# Deploy Backend
# Use Render (https://render.com/) or Railway (https://railway.app/) to deploy the backend.
# Add environment variables: DATABASE_URL, JWT_SECRET, STRIPE_SECRET_KEY.

# Deploy Frontend
# Use Netlify (https://netlify.com/) or Vercel (https://vercel.com/).
# Build command: npm run build
# Publish directory: build

## Testing the Application

# Verify Functionality
# - Visit the frontend URL to ensure:
#   - Articles load on the homepage
#   - AdBlock detection works
#   - Subscription flow is functional

# - Test backend APIs with Postman or curl:
curl http://localhost:5000/api/articles

## License

The Bull's Gazette License

Copyright (c) 2024 The Bull's Gazette. All Rights Reserved.

Permission is NOT granted to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, nor to permit persons to whom the software is furnished to do so, without prior written consent from The Bull's Gazette.

This software is provided "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

For inquiries, contact: legal@bullsgazette.com

## Contact

For any questions or issues, feel free to reach out:
Email: support@bullsgazette.com


