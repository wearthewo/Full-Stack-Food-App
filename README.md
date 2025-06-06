A fully functional food App using the Mern Stack In home page we fetch foods with images stored in Cloudinary. We also use search, filters and pagination logic.User can register, login using JWT tokens and logout.  After user authentication he can click the food he want and goes to cart page. There he click the Pay with Stripe button, navigates in Stripe payment page using fake test credentials and after successful payment he redirects to our app. Finally he can see every order he made in orders page. App is fully containerized with Docker.

INSTRUCTIONS 

1. Clone the repo:
 git clone https://github.com/wearthewo/Full-Stack-Food-App.git and
 cd Full-Stack-Food-App
2. Copy .env.example in root folder with your keys and Copy .env.example in frontend folder with your keys as they are in the project structure.
3. Run this command docker-compose up --build in root folder.
4. Frontend + Backend: http://localhost:5000

Root folder:

MONGO_URI=your_mongodb_uri,

PORT=5000,

SECRET_KEY=your_jwt_secret,

CLIENT_URL=http://localhost:5000,

NODE_ENV=development,

STRIPE_SECRET_KEY=your_stripe_secret_key,

CLOUD_NAME=your_cloudinary_name,

CLOUD_API_KEY=your_cloudinary_api_key,

CLOUD_API_SECRET=your_cloudinary_api_secret,

Frontend folder: 

VITE_STRIPE_PUBLIC_KEY=your_public_stripe_key,
