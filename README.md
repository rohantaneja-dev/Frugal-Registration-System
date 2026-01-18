# Intelligent Registration System  
### Frugal Testing – Software Engineer Assignment

---

## 📌 Project Overview
The Intelligent Registration System is a client-side web application developed as part of the **Frugal Testing Software Engineer assignment**.  
The primary objective of this project is to demonstrate **form validation, clean UI design, and basic test automation skills** aligned with real-world QA and frontend testing practices.

The system validates user inputs in real time, prevents invalid submissions, and provides clear feedback to the user. Automated UI tests are implemented using Selenium WebDriver to verify both negative and positive scenarios.

---

## 🚀 Key Features
- User-friendly registration form with mandatory fields
- Real-time client-side validations with inline error messages
- Submit button enabled only when the form is valid
- Country → State → City dependent dropdown logic
- Clear success message on successful registration
- Negative and positive test scenarios automated using Selenium
- Screenshot capture for test execution evidence

---

## 🛠 Technology Stack
- **HTML5** – Structure
- **CSS3** – Styling & layout
- **JavaScript (Vanilla)** – Client-side validation logic
- **Python** – Automation scripting
- **Selenium WebDriver** – UI automation
- **webdriver-manager** – Driver management

---

## 📁 Project Folder Structure


frugal-registration-system/

├── frontend/

│ ├── index.html  # Registration form UI

│ ├── style.css # Styling and layout

│ └── script.js # Client-side validations

├── automation/

│ └── registration_test.py # Selenium automation script

├── screenshots/

│ ├── negative-validation.png

│ └── successful-registration.png

└── README.md



---

## ▶️ How to Run the Application
1. Open the `frontend/index.html` file in any modern web browser.
2. Try submitting the form with missing or invalid data to observe validation messages.
3. Fill all required fields with valid inputs to see the success message.

---

## 🤖 Automation Testing
### Prerequisites
- Python installed
- Google Chrome browser

### Steps to Run Automation
1. Navigate to the `automation` folder.
2. Install required packages:
   ```bash
   pip install selenium webdriver-manager
