Vehicle Rental API – REST Backend A clean and structured REST API for a Vehicle Rental platform. Supports authentication, user management, vehicle management, and booking system.

🔗 Live URL https://assignment2-sage-rho.vercel.app/

📦 Repository https://github.com/MD-ABDULLAH24/Assignment-2.git

🚀 Features User Authentication (Signup / Signin) Role-based Access (customer/Admin) Vehicle CRUD operations Booking system User management Secure routes using JWT Clean folder structure

🛠️ Technology Stack Node.js Express.js PostgreSQL + NeonBD JWT Authentication bcrypt Password Hashing dotenv for environment config 📁 API Endpoints 🔐 Auth Routes POST /api/v1/auth/signup Create a new user account.

POST /api/v1/auth/signin Sign in and receive JWT token.

🚗 Vehicle Routes POST /api/v1/vehicles Create new vehicle (Admin).

GET /api/v1/vehicles Get all vehicles.

GET /api/v1/vehicles/:id Get single vehicle details.

PUT /api/v1/vehicles/:id Update a vehicle.

DELETE /api/v1/vehicles/:id Delete a vehicle.

👤 User Routes GET /api/v1/users Get all users.

PUT /api/v1/users/:id Update a user.

DELETE /api/v1/users/:id Delete a user.

📄 Booking Routes POST /api/v1/bookings Create a booking.

GET /api/v1/bookings Get all bookings (Admin → all, User → own bookings)

PUT /api/v1/bookings/:id Update a specific booking.

✅ Summary This README includes:

Full API documentation Installation guide Tech stack All endpoints Usage instructions Add your repo link + live URL at the top and you're done.

