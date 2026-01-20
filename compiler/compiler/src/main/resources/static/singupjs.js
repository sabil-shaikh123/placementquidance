let generatedOtp = null;

//validating the feilds
function validateName() {
    const name = document.getElementById("name").value.trim();
    const error = document.getElementById("nameError");
    const regex = /^[A-Za-z ]+$/;

    if (name === "") {
        error.innerText = "Name is required";
        return false;
    }

    if (!regex.test(name)) {
        error.innerText = "Name should contain only letters";
        return false;
    }

    error.innerText = "";
    return true;
}
function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const error = document.getElementById("emailError");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        error.innerText = "Email is required";
        return false;
    }

    if (!regex.test(email)) {
        error.innerText = "Enter a valid email address";
        return false;
    }

    error.innerText = "";
    return true;
}
function validatePassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const error1 = document.getElementById("password1Error");
    const error2 = document.getElementById("password2Error");

    if (password.length < 6) {
        error1.innerText = "Password must be at least 6 characters";
        return false;
    } else {
        error1.innerText = "";
    }

    if (password !== confirmPassword) {
        error2.innerText = "Passwords do not match";
        return false;
    } else {
        error2.innerText = "";
    }

    return true;
}


async function getOtp() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    const otperror = document.getElementById("otpError");

    if (!validateName() || !validateEmail() || !validatePassword()) {
        return;
    }

    alert("Sending the OTP to the user");

    const baseUrl = "https://placementquidance-2.onrender.com";

    try {
        const res = await fetch(`${baseUrl}/send-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        });

        const msg = await res.text();
        otperror.textContent = msg;

        document.getElementById("otpSection").style.display = "block";

    } catch (error) {
        console.error("Error sending OTP:", error);
        otperror.textContent = "Server error. Please try again.";
    }
}

async function submitForm() {
    let email = document.getElementById("email").value;
    let otp = document.getElementById("otp").value;
    const otperror = document.getElementById("otpError");

    if (otp === "") {
        otperror.textContent = "Please enter OTP";
        return;
    }

    try {
        const response = await fetch("https://placementquidance-2.onrender.com/verify-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                otp: otp
            })
        });

        const result = await response.text();

        if (result === "OTP verified") {
            document.getElementById("message").innerText = "Signup successful!";

            // adding the student details in the database
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let name = document.getElementById("name").value.trim();

            const res = await fetch("https://placementquidance-2.onrender.com/addStudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const msg = await res.text();
            alert(msg);

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);

        } else {
            otperror.textContent = "Invalid OTP";
        }

    } catch (error) {
        console.error("Error:", error);
        otperror.textContent = "Server error";
    }
}




