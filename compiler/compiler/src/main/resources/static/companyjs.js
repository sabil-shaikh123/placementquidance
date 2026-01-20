// // Get the company ID from URL
// const urlParams = new URLSearchParams(window.location.search);
// const companyId = urlParams.get('id');

// if (companyId) {
//   // Fetch company details by ID
//   fetch(`https://placementquidance-2.onrender.com/getCompanyById/${companyId}`)
//     .then(res => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then(company => {
//       document.getElementById('companyName').textContent = company.company_name;
//       document.getElementById('companyDescription').textContent = company.company_description;
//     })
//     .catch(err => {
//       console.error('Error loading company:', err);
//       document.body.innerHTML = "<h2>Failed to load company details.</h2>";
//     });
// } else {
//   document.body.innerHTML = "<h2>No company selected!</h2>";
// }

// const div = document.getElementById("companyquestions")

// const baseUrl = "https://placementquidance-2.onrender.com";
// fetch(`${baseUrl}/getCompanyQuestion/${companyId}`)
//   .then(res => res.json())
//   .then(questions => {
//     questions.forEach(q => {
//       const qElement = document.createElement("p");
//       qElement.textContent = q.breif_question;
//       qElement.style.cursor = "pointer";
//       qElement.style.color = "blue";
//       qElement.style.textDecoration = "underline";
//       qElement.onclick = () => {
//         window.location.href = `/compiler?id=${q.codeId}`; // ✅ correct
//       };

//       div.appendChild(qElement);
//     });
//   })
//   .catch(err => {
//     console.error("Error fetching questions:", err);
//   });


//code to add the things when the page is loaded
// code to add the things when the page is loaded
document.addEventListener('DOMContentLoaded', async () => {

    // Get the company ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    // to check whether the user is authenticated or not
    const email = sessionStorage.getItem("Email");
    if (email == null) {
        document.getElementById("authMsg").innerText = "You are not an authenticated user";
        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);
        return;
    }

    try {
        if (companyId) {
            // Fetch company details by ID
            const res = await fetch(`https://placementquidance-2.onrender.com/getCompanyById/${companyId}`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const company = await res.json();
            checkTogle(companyId);

            document.getElementById('companyName').textContent = company.company_name;
            document.getElementById('companyDescription').textContent = company.company_description;
        }

        const div = document.getElementById("companyquestions");
        const baseUrl = "https://placementquidance-2.onrender.com";

        const qRes = await fetch(`${baseUrl}/getCompanyQuestion/${companyId}`);
        const questions = await qRes.json();

        questions.forEach(q => {
            const qElement = document.createElement("p");
            qElement.textContent = q.breif_question;
            qElement.style.cursor = "pointer";
            qElement.style.color = "blue";
            qElement.style.textDecoration = "underline";

            alert("code id is " + q.codeId);

            qElement.onclick = () => {
                alert("code id is " + q.codeId);
                window.location.href = `/compiler?id=${q.codeId}`;
            };

            div.appendChild(qElement);
        });

    } catch (err) {
        console.error("Error loading company or questions:", err);
    }
});


// this code is for the toggle button
const toggle = document.getElementById("enrollToggle");

toggle.addEventListener("change", async function () {

    // Get the company ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    let enab = "yes";

    if (this.checked) {
        console.log("Enrollment ENABLED");
        enab = "yes";
    } else {
        console.log("Enrollment DISABLED");
        enab = "no";
    }

    const baseUrl = "https://placementquidance-2.onrender.com";
    const email = sessionStorage.getItem("Email");

    try {
        const res = await fetch(`${baseUrl}/addCompanyToStudent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                companyId: String(companyId),
                enab: enab
            })
        });

        await res.text();

    } catch (err) {
        console.error("Error updating enrollment:", err);
    }
});


// check toggle status
async function checkTogle(companyId) {

    const toggle = document.getElementById("enrollToggle");
    const baseUrl = "https://placementquidance-2.onrender.com";
    const email = sessionStorage.getItem("Email");

    try {
        const res = await fetch(`${baseUrl}/getProfileData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        });

        const data = await res.json();
        const comList = data.companyList;

        if (!comList || comList.length === 0) {
            toggle.checked = false;
            return;
        }

        const isEnrolled = comList.some(
            c => String(c.company_id) === String(companyId)
        );

        toggle.checked = isEnrolled;

    } catch (err) {
        console.error("Error fetching profile data:", err);
    }
}







