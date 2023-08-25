# EDU HORIZONS - E-Learning Platform

![EDU HORIZONS Logo](link_to_your_logo.png)

Welcome to EDU HORIZONS, your gateway to quality education from anywhere in the world. EDU HORIZONS is an online e-learning platform designed to connect students and tutors, providing a seamless and interactive educational experience.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure registration and login functionality, including custom login and Google OAuth integration.
- **User Profiles**: Allow users to create and manage their profiles, including personal information, age, and areas of interest.
- **Class Management**: Enable tutors to create and manage classes, set descriptions, and specify class types and levels.
- **Payment Integration**: Integrate Paystack for secure payment processing, granting access to paid classes.
- **Appointment Scheduling**: Facilitate the scheduling of classes and appointments on Google Calendar.
- **Resource Library**: Provide a centralized repository for educational resources like PDFs, videos, and links.
- **Gamification**: Implement gamification elements such as badges, achievements, and leaderboards to motivate student engagement.
- **Assessment Tools**: Allow tutors to create quizzes, tests, and assignments for students, with automatic grading and feedback.
- **Progress Analytics**: Provide detailed progress tracking and assessment analytics.
- **Content Recommendations**: Recommend additional classes and resources based on user interests and activity.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- PostgreSQL database
- Paystack API keys (for payment integration)
- Google OAuth credentials (for OAuth login and Google Calendar integration)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/edu-horizons.git
   ```

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd edu-horizons-backend
   npm install
   ```

3. Set up your PostgreSQL database and update the database configuration in `.env`:

   ```env
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. Set up your Paystack API keys in `.env`:

   ```env
   PAYSTACK_PUBLIC_KEY=your_public_key
   PAYSTACK_SECRET_KEY=your_secret_key
   ```

5. Set up your Google OAuth credentials for authentication and Google Calendar integration.

6. Navigate to the frontend directory and install dependencies:

   ```bash
   cd edu-horizons-frontend
   npm install
   ```

7. Update the API URL in `src/environments/environment.ts` to point to your backend server:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://your-backend-server-url:port',
   };
   ```

8. Start both the backend and frontend servers:

   ```bash
   # In the backend directory
   npm start

   # In the frontend directory
   ng serve
   ```

Now, you can access the EDU HORIZONS platform at `http://localhost:4200` in your web browser.

## Usage

- Register as a student or tutor to access the platform's features.
- Explore classes, schedule appointments, and make payments for courses.
- Manage your profile and track your progress.
- Contribute to the community by uploading educational resources.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear and concise commit messages.
4. Push your changes to your fork.
5. Create a pull request to the main repository's `main` branch.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README file further to match the specifics of your project. Include additional sections if needed, such as deployment instructions, troubleshooting, or contact information for support and feedback.