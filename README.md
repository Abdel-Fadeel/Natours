# Natours

A full-stack tour-booking app: browse adventure tours, read reviews, log in, manage your account and book tours with Stripe. Built with **Node.js, Express and MongoDB**. Pages are rendered on the server with **Pug**, and the same back end exposes a full **REST API**.

**Live demo:** _coming soon_ · Log in with **`laura@example.com`** / **`test1234`** (demo user). The app runs on Render's free tier, so the first request may take up to a minute to wake it up.

## Features

**Website (server-side rendered)**
- Tour overview and detailed tour pages, with guides, a description and reviews.
- Sign up, log in and log out with JWT stored in an HTTP-only cookie.
- Account page: update your name, email and photo (resized with Sharp) and change your password.
- Book a tour with **Stripe Checkout** and view your bookings.
- Welcome and password-reset emails (Nodemailer, with SendGrid in production).

**REST API** (`/api/v1`)
- **Tours:** CRUD plus filtering, sorting, field limiting and pagination (`APIFeatures` class), an alias route (`/top-5-cheap`), aggregation pipelines (`/tour-stats`, `/monthly-plan/:year`) and **geospatial queries** (`/tours-within/...`, `/distances/...`).
- **Users:** signup, login, forgot and reset password, update me, delete me (soft delete), admin CRUD.
- **Reviews:** nested routes (`/tours/:tourId/reviews`), one review per user per tour, and average ratings recalculated automatically.
- **Bookings:** Stripe checkout session and admin CRUD.
- **Roles and permissions:** user, guide, lead-guide and admin.

**Security**
- Helmet, rate limiting, `express-mongo-sanitize`, `xss-clean`, `hpp` (parameter pollution), bcrypt password hashing, and password-reset tokens that expire.
- Central error handling with separate development and production error responses, plus handling for unhandled rejections and uncaught exceptions.

## Tech stack

| | |
|---|---|
| Back end | Node.js 20, Express 4 |
| Database | MongoDB Atlas + Mongoose 5 (virtual populate, indexes, geospatial, aggregation) |
| Views | Pug templates, vanilla JS (bundled with Parcel), Axios |
| Auth | JWT, bcryptjs, cookies |
| Payments | Stripe Checkout |
| Email | Nodemailer, SendGrid, Mailtrap (development) |
| Images | Multer + Sharp |
| Hosting | Render, MongoDB Atlas |

## Architecture

MVC: `models/` (Mongoose schemas plus middleware), `controllers/` (including a generic `handlerFactory` for CRUD), `routes/`, and `views/` (Pug). The front-end JS lives in `public/js/` and is bundled into `bundle.js`.

## Getting started

```bash
git clone https://github.com/Abdel-Fadeel/Natours.git
cd Natours
npm install
cp config.env.example config.env   # then fill in your values
npm run dev
```

Then open http://localhost:3000.

To load the sample tours, users and reviews into your database, either set `SEED_DEMO_DATA=true` (they're loaded automatically on start when the database is empty) or run:

```bash
node dev-data/data/import-dev-data.js --import
```

| Command | What it does |
|---|---|
| `npm run dev` | Start with nodemon |
| `npm start` | Start the server |
| `npm run watch:js` | Rebuild the front-end bundle on change |
| `npm run build:js` | Build the front-end bundle |

## Project structure

```
app.js, server.js    # Express app and server/DB bootstrap
controllers/         # tour, user, review, booking, auth, views, error, handlerFactory
models/              # Tour, User, Review, Booking
routes/              # tour, user, review, booking, views
utils/               # APIFeatures, AppError, catchAsync, email, seedDemoData
views/               # Pug templates (+ email templates)
public/              # CSS, images, front-end JS
dev-data/            # Sample data and import script
```

## Author

**Abdel-Fadeel Hamdy**, Front-End Engineer · [GitHub](https://github.com/Abdel-Fadeel)
