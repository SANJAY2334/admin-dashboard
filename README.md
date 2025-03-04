# Office-Dashboard
Login System

Overview

This project is a secure and user-friendly login system built using:

Frontend: React.js

Styling: Tailwind CSS

API Requests: Axios

The system supports email-based authentication with password validation and error handling. To enhance security, only company emails are allowed, while Gmail and Outlook addresses are blocked.

Features

Company email-based authentication

Password validation (minimum length, uppercase, lowercase, number, and special character)

Error handling with user-friendly messages

Loading indicators during login attempts

Secure token storage in localStorage

Responsive UI

Installation

Clone the repository:

git clone <repo-url>

Navigate to the project folder:

cd project-directory

Install dependencies:

npm install

Running the Project

Start the development server:

npm run dev

Open your browser and go to:

http://localhost:5173

Usage Guide

Logging In

Enter a valid company email (Gmail and Outlook are not allowed).

Provide your password.

Click Login.

If the credentials are correct, you will be redirected to the dashboard.

If there is an error, a message will be displayed.

Challenges & Solutions

1. Blocking Certain Email Domains

Issue: Users should not log in with personal emails.
Solution: Implemented email validation that restricts Gmail and Outlook domains.

2. Password Validation

Issue: Ensuring users create strong passwords.
Solution: Added a validation system to check for length, uppercase/lowercase letters, numbers, and special characters.

3. Improving User Experience

Issue: Lack of feedback during login attempts.
Solution: Implemented real-time error messages and loading indicators.

Future Improvements

Add a password reset feature.

Implement multi-factor authentication (MFA).

Enhance security by improving token storage.

Further improve UI responsiveness and accessibility.

License

This project is open-source and available under the MIT License.

