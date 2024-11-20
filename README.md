
# The Bull's Gazette

## Overview
The Bull's Gazette is a dynamic, modern, and fully functional news platform inspired by the Tagdiv Newspaper theme. This project is designed to provide a seamless content management experience for administrators and a premium content delivery system for end-users.

## Features
- **Frontend:**
  - Modern and responsive UI built with React and TailwindCSS.
  - Dynamic article grid layout on the homepage.
  - Individual article pages with SEO-optimized meta tags.
  - Subscription management page for upgrading to premium.
  - AdBlock detection with a polite enforcement popup.

- **Backend:**
  - Built with Node.js and Express.
  - PostgreSQL database for articles, users, and subscriptions.
  - Authentication and role-based access control.
  - Subscription-based access to premium content.
  - Integrated with Stripe for payment processing.
  - Generates RSS feed and XML sitemap dynamically.

- **SEO & Social Optimization:**
  - Metadata for Open Graph and Twitter Cards.
  - JSON-LD structured data for better search engine visibility.
  - Dynamic sitemap and RSS feed for article discovery.

- **AdBlock Protection:**
  - Detects AdBlock usage and displays a popup.
  - Forces free users to disable AdBlock or subscribe to premium.
  - Premium users can skip restrictions.

## Deployment Instructions

### Local Deployment
1. Clone the repository:
   ```bash
   git clone https://github.com/OswaldKardingson/TheBullsGazette.git
cd TheBullsGazette
   ```

2. **Backend Setup:**
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file with the following variables:
     ```
     DATABASE_URL=your_postgresql_connection_string
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_key
     ```
   - Run database migrations:
     ```bash
     psql -U your_user -d your_db -f database/init.sql
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Frontend Setup:**
   - Navigate to the `frontend` directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

4. Access the site at `http://localhost:3000`.

### Deployment to Production Server
1. **Backend Deployment:**
   - Use a server like AWS, DigitalOcean, or Heroku.
   - Install Node.js and PostgreSQL on your server.
   - Upload the backend folder and configure the environment variables in `.env`.

2. **Frontend Deployment:**
   - Build the React app:
     ```bash
     npm run build
     ```
   - Deploy the `build` folder using a service like Vercel, Netlify, or as static files via Nginx.

3. **Secure and Optimize:**
   - Use HTTPS.
   - Set up a reverse proxy with Nginx for backend and frontend integration.
   - Configure caching and CDN for assets.

## Testing
- Test all features, including subscription functionality and AdBlock protection.
- Use modern browsers to verify cross-browser compatibility.

## Contributing
Contributions and suggestions are welcome! Open an issue or submit a pull request.

## License
The Bull's Gazette License

Copyright (c) [2024] [The Bulls Gazette]. All Rights Reserved.

Permission is NOT granted to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, nor to permit persons to whom the software is furnished to do so, without prior written consent from [The Bull's Gazette].

This software is provided "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

