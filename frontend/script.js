const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");
const formAlert = document.getElementById("formAlert");

/* Required text fields */
const fields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "address",
    "password",
    "confirmPassword"
];

/* ---------- DISPOSABLE EMAIL DOMAINS ---------- */
const disposableDomains = [
    "tempmail.com",
    "mailinator.com",
    "10minutemail.com",
    "guerrillamail.com",
    "yopmail.com"
];

/* ---------- COUNTRY PHONE RULES ---------- */
const countryPhoneRules = {
    India: /^(?:\+91|91)?[6-9]\d{9}$/,
    USA: /^(?:\+1|1)?\d{10}$/
};

/* ---------- ERROR HANDLING ---------- */
function showError(input, message) {
    const formGroup = input.closest(".form-group");
    const error = formGroup.querySelector(".error");
    input.classList.add("error-border");
    error.innerText = message;
}

function clearError(input) {
    const formGroup = input.closest(".form-group");
    const error = formGroup.querySelector(".error");
    input.classList.remove("error-border");
    error.innerText = "";
}

/* ---------- VALIDATORS ---------- */
function validateEmail(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return false;
    }
    const domain = email.split("@")[1].toLowerCase();
    return !disposableDomains.includes(domain);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validatePhoneByCountry(phone, country) {
    if (!country || !countryPhoneRules[country]) {
        return /^\d{10,15}$/.test(phone);
    }
    return countryPhoneRules[country].test(phone);
}

/* ---------- PASSWORD STRENGTH ---------- */
const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strengthText");

function checkPasswordStrength(password) {
    strengthText.className = "";

    if (password.length === 0) {
        strengthText.innerText = "";
        return;
    }

    if (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[@$!%*?&]/.test(password)
    ) {
        strengthText.innerText = "Strong Password";
        strengthText.classList.add("strength-strong");
    } 
    else if (
        password.length >= 6 &&
        /[A-Za-z]/.test(password) &&
        /\d/.test(password)
    ) {
        strengthText.innerText = "Medium Password";
        strengthText.classList.add("strength-medium");
    } 
    else {
        strengthText.innerText = "Weak Password";
        strengthText.classList.add("strength-weak");
    }
}

passwordInput.addEventListener("input", function () {
    checkPasswordStrength(passwordInput.value);
});

/* ---------- MAIN VALIDATION ---------- */
function validateForm() {
    let isValid = true;
    formAlert.className = "alert";

    /* Required fields */
    fields.forEach(id => {
        const input = document.getElementById(id);
        if (input.value.trim() === "") {
            showError(input, "This field is required");
            isValid = false;
        } else {
            clearError(input);
        }
    });

    /* Email */
    const email = document.getElementById("email");
    if (!validateEmail(email.value)) {
        showError(email, "Disposable or invalid email not allowed");
        isValid = false;
    }

    /* Phone + Country */
    const phone = document.getElementById("phone");
    const country = document.getElementById("country").value;

    if (!validatePhoneByCountry(phone.value, country)) {
        showError(
            phone,
            country
                ? `Enter valid phone number for ${country}`
                : "Enter valid phone number"
        );
        isValid = false;
    }

    /* Address */
    const address = document.getElementById("address");
    if (address.value.trim().length < 10) {
        showError(address, "Address must be at least 10 characters");
        isValid = false;
    }

    /* Password */
    const password = document.getElementById("password");
    if (!validatePassword(password.value)) {
        showError(password, "Password must be at least 6 characters");
        isValid = false;
    }

    /* Confirm Password */
    const confirmPassword = document.getElementById("confirmPassword");
    if (password.value !== confirmPassword.value || confirmPassword.value === "") {
        showError(confirmPassword, "Passwords do not match");
        isValid = false;
    }

    /* Gender */
    const gender = document.querySelector('input[name="gender"]:checked');
    const genderError = document.querySelector(".gender-group").nextElementSibling;
    if (!gender) {
        genderError.innerText = "Please select gender";
        isValid = false;
    } else {
        genderError.innerText = "";
    }

    /* Terms */
    const terms = document.getElementById("terms");
    const termsError = terms.closest(".form-group").querySelector(".error");
    if (!terms.checked) {
        termsError.innerText = "You must accept terms & conditions";
        isValid = false;
    } else {
        termsError.innerText = "";
    }

    /* Top error alert */
    if (!isValid) {
        formAlert.style.display = "block";
        formAlert.classList.add("error");
        formAlert.innerText = "Please fix the errors highlighted below.";
    }

    submitBtn.disabled = !isValid;
    return isValid;
}

/* Live validation */
form.addEventListener("input", validateForm);

/* ---------- SUBMIT ---------- */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
        formAlert.style.display = "block";
        formAlert.classList.remove("error");
        formAlert.classList.add("success");
        formAlert.innerText = "Registration Successful!";

        successMessage.innerText = "Registration Successful!";
        submitBtn.disabled = true;

        // keep visible for automation screenshot
        setTimeout(() => {}, 5000);
    }
});

/* ---------- COUNTRY → STATE → CITY ---------- */
const countrySelect = document.getElementById("country");
const state = document.getElementById("state");
const city = document.getElementById("city");

const data = {
    India: {
        Punjab: ["Patiala", "Ludhiana"],
        Haryana: ["Gurgaon", "Faridabad"]
    },
    USA: {
        California: ["Los Angeles", "San Diego"],
        Texas: ["Austin", "Dallas"]
    }
};

countrySelect.addEventListener("change", function () {
    state.innerHTML = '<option value="">Select State</option>';
    city.innerHTML = '<option value="">Select City</option>';

    if (this.value) {
        Object.keys(data[this.value]).forEach(s => {
            const option = document.createElement("option");
            option.value = s;
            option.textContent = s;
            state.appendChild(option);
        });
    }
});

state.addEventListener("change", function () {
    city.innerHTML = '<option value="">Select City</option>';

    if (this.value) {
        data[countrySelect.value][this.value].forEach(c => {
            const option = document.createElement("option");
            option.value = c;
            option.textContent = c;
            city.appendChild(option);
        });
    }
});
