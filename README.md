# Natours – Full Stack Travel Booking Application

A full-stack travel booking application inspired by the Natours project, built using **React.js, Node.js, Express.js, MongoDB, and Mongoose**.

The application provides a platform for users to explore tours, view tour details, manage their accounts, and book travel experiences through a RESTful backend API.

The frontend is developed using React.js, while the backend provides authentication, tour management, database operations, and business logic.

## 🚀 Features

- **User Authentication:** Secure registration and login using JWT.
- **User Management:** Manage user profiles and account information.
- **Tour Management:** Create, retrieve, update, and delete tours.
- **Tour Details:** View detailed information about individual tours.
- **Tour Filtering:** Filter tours based on available criteria.
- **Sorting and Pagination:** Organize API results efficiently.
- **Reviews and Ratings:** Support tour reviews and ratings.
- **Booking Management:** Manage tour booking workflows.
- **RESTful API:** Backend APIs built using Express.js.
- **MongoDB Integration:** Store application data using MongoDB and Mongoose.
- **Security:** Authentication, authorization, data validation, and API protection.

## 🛠️ Technology Stack

| Technology | Purpose                             |
| ---------- | ----------------------------------- |
| React.js   | Frontend development                |
| JavaScript | Application programming             |
| Node.js    | Backend runtime                     |
| Express.js | REST API development                |
| MongoDB    | NoSQL database                      |
| Mongoose   | MongoDB object modeling             |
| JWT        | Authentication                      |
| bcrypt     | Password hashing                    |
| Stripe     | Payment integration, if implemented |

## 🏗️ Application Architecture

```text
             React Frontend
                   |
                   | HTTP Requests
                   |
                   v
          Node.js + Express.js
                   |
          RESTful API Endpoints
                   |
          ---------------------
          |                   |
          v                   v
      MongoDB             Authentication
      Database            & Authorization
          |
          v
   Tours, Users, Reviews,
      and Bookings
```

## 📁 Project Structure

```text
natours-fullstack-react-node-mongodb/
│
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config.env
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL

cd natours-fullstack-react-node-mongodb
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Configure your environment variables:

```env
NODE_ENV=development
PORT=5000

DATABASE=your_mongodb_connection_string
DATABASE_PASSWORD=your_database_password

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d

CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm start
```

For development, if configured:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Open the application in your browser using the URL displayed by Vite.

## 🌐 API Functionality

The backend is designed around RESTful API principles.

| Resource | Operations                              |
| -------- | --------------------------------------- |
| Tours    | Create, read, update, delete            |
| Users    | Registration, login, profile management |
| Reviews  | Create, retrieve, update, delete        |
| Bookings | Create and manage bookings              |

Example API endpoints (adjust to match your implementation):

```text
/api/v1/tours
/api/v1/users
/api/v1/users/login
/api/v1/users/signup
/api/v1/reviews
/api/v1/bookings
```

## 🔐 Security

Security features covered by the backend architecture include:

- JWT-based authentication.
- Password hashing.
- Protected routes and authorization.
- Input validation and sanitization.
- Secure HTTP headers.
- Rate limiting.
- Environment-based configuration.
- Centralized error handling.

## 🚀 Deployment

The application can be deployed using cloud hosting providers.

- **Frontend:** Deploy the React production build.
- **Backend:** Deploy the Node.js and Express application.
- **Database:** Use MongoDB Atlas.
- **Environment Variables:** Configure database credentials, JWT secrets, and frontend URLs through the hosting provider.

## 📚 Key Learning Outcomes

- Understanding Node.js architecture and event loop.
- Building RESTful APIs using Express.js.
- MongoDB CRUD operations using Mongoose.
- Advanced Mongoose features and relationships.
- Authentication and authorization using JWT.
- API filtering, sorting, and pagination.
- Backend security and error handling.
- Integrating React with a Node.js backend.
- Full-stack application deployment.

## 👨‍💻 Author

**Mohammed Faisal Usmani**

- GitHub: [Faisal-Usmani](https://github.com/Faisal-Usmani)
- LinkedIn: [Mohammed Faisal Usmani](https://www.linkedin.com/in/mohammed-faisal-usmani-4ba00320b/)

---

⭐ If you find this project useful, consider giving it a star!
