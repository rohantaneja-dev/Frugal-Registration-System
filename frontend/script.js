const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

const fields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "password",
    "confirmPassword"
];

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error");
    input.classList.add("error-border");
    error.innerText = message;
}

function clearError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error");
    input.classList.remove("error-border");
    error.innerText = "";
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateForm() {
    let isValid = true;

    fields.forEach(id => {
        const input = document.getElementById(id);
        if (input.value.trim() === "") {
            showError(input, "This field is required");
            isValid = false;
        } else {
            clearError(input);
        }
    });

    const email = document.getElementById("email");
    if (!validateEmail(email.value)) {
        showError(email, "Invalid email format");
        isValid = false;
    }

    const password = document.getElementById("password");
    if (!validatePassword(password.value)) {
        showError(password, "Password must be at least 6 characters");
        isValid = false;
    }

    const confirmPassword = document.getElementById("confirmPassword");
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        isValid = false;
    }

    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        document.querySelector('.gender-group').nextElementSibling.innerText = "Select gender";
        isValid = false;
    } else {
        document.querySelector('.gender-group').nextElementSibling.innerText = "";
    }

    const terms = document.getElementById("terms");
    if (!terms.checked) {
        terms.parentElement.querySelector(".error").innerText = "Accept terms";
        isValid = false;
    } else {
        terms.parentElement.querySelector(".error").innerText = "";
    }

    submitBtn.disabled = !isValid;
    return isValid;
}

form.addEventListener("input", validateForm);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
        successMessage.innerText = "Registration Successful!";
        form.reset();
        submitBtn.disabled = true;
    }
});

/* Country - State - City Logic */
const country = document.getElementById("country");
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

country.addEventListener("change", function () {
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
        data[country.value][this.value].forEach(c => {
            const option = document.createElement("option");
            option.value = c;
            option.textContent = c;
            city.appendChild(option);
        });
    }
});
