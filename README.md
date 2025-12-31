# Intelligent Registration System – Frugal Testing Assignment

## Project Overview
This project is a simple and responsive Registration System developed as part of the Frugal Testing Software Engineer assignment. The application focuses on client-side validations, user-friendly feedback, and automated testing to ensure quality and reliability.

The system validates user input in real time and prevents form submission until all required conditions are met. Automation testing is implemented to verify both negative and positive scenarios.

---

## Features Implemented
- User registration form with mandatory fields
- Client-side validations with inline error messages
- Submit button enabled only after valid inputs
- Country → State → City dynamic dropdown logic
- Clear success message on valid submission
- Automated UI testing using Selenium WebDriver
- Screenshot capture for test evidence

---

## Technology Stack
- HTML5
- CSS3
- JavaScript (Vanilla)
- Python
- Selenium WebDriver
- webdriver-manager

---

## Folder Structure

frugal-registration-system/

├── frontend/

│ ├── index.html

│ ├── style.css

│ └── script.js

├── automation/

│ └── registration_test.py

├── screenshots/

│ ├── error-state.png

│ └── success-state.png

└── README.md


---

## How to Run the Application
1. Open the `frontend/index.html` file in any modern browser.
2. Fill the form with invalid data to observe validations.
3. Fill the form with valid data to see the success message.

---

## Automation Testing Steps
1. Navigate to the `automation` directory.
2. Install dependencies:
3. Run the automation script:

---

## Automated Test Scenarios Covered
### Negative Scenario
- Missing mandatory field (Last Name)
- Validation error displayed
- Screenshot captured (`error-state.png`)

### Positive Scenario
- All valid inputs provided
- Successful registration message displayed
- Screenshot captured (`success-state.png`)

---

## Conclusion
This project demonstrates a balanced approach to development and testing by combining clean UI design, strong validation logic, and reliable automation testing. The implementation aligns with real-world testing practices and ensures application quality before release.
