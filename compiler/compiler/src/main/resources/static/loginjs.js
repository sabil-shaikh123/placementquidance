async function login1() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    alert("calling the backend");

    try {
        const response = await fetch("https://placementquidance-2.onrender.com/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.text();

        alert("is the user is prensent in the db " + result);

        if (result == "false") {
            const error1 = document.getElementById("errorpara");
            error1.textContent = "Invalid Password or Email";
        } else {
            // adding the email to the session storage so that in next page i can easily fetch it
            sessionStorage.setItem("Email", email);
            window.location.href = '/home';
        }

    } catch (error) {
        console.error("Error:", error);
    }
}
