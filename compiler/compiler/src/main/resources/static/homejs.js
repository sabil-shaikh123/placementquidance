// document.addEventListener("DOMContentLoaded", () => {
//   fetch("https://placementquidance-2.onrender.com/getAllCompany")
//     .then(res => res.json())
//     .then(data => {
//       const div = document.getElementById("companyList");
//       div.innerHTML = "";

//       data.forEach(company => {
//         const nameElement = document.createElement("p");
//         nameElement.textContent = company.company_name;
//         nameElement.style.cursor = "pointer";
//         nameElement.style.color = "blue";
//         nameElement.style.textDecoration = "underline";

//         nameElement.onclick = () => {
//           window.location.href = `/company?id=${company.company_id}`;
//         };

//         div.appendChild(nameElement);
//       });
//     })
//     .catch(err => {
//       console.error("Error fetching companies:", err);
//     });
// });


// function taketest(){
//     fetch("https://placementquidance-2.onrender.com/getAllCode")
//     .then(res => res.json())
//     .then(data => {
//         const randomquestion = data[Math.floor(Math.random() * data.length)];
//          window.location.href = `/compiler?id=${randomquestion.codeId}`;
//     })
// }
document.addEventListener("DOMContentLoaded", async () => {

    // to check whether the user is authenticated or not
    // if user is not authenticated then redirect to login page
    const email = sessionStorage.getItem("Email");

    if (email == null) {
        document.getElementById("authMsg").innerText = "You are not an authenticated user";
        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);
    } else {
        try {
            const res = await fetch("https://placementquidance-2.onrender.com/getAllCompany");
            const data = await res.json();

            const div = document.getElementById("companyList");
            div.innerHTML = "";

            data.forEach(company => {
                const nameElement = document.createElement("p");
                nameElement.textContent = company.company_name;
                nameElement.style.cursor = "pointer";
                nameElement.style.color = "blue";
                nameElement.style.textDecoration = "underline";

                nameElement.onclick = () => {
                    window.location.href = `/company?id=${company.company_id}`;
                };

                div.appendChild(nameElement);
            });

        } catch (err) {
            console.error("Error fetching companies:", err);
        }
    }
});

async function taketest() {
    try {
        const res = await fetch("https://placementquidance-2.onrender.com/getAllCode");
        const data = await res.json();

        const randomquestion = data[Math.floor(Math.random() * data.length)];
        window.location.href = `/compiler?id=${randomquestion.codeId}`;

    } catch (err) {
        console.error("Error fetching codes:", err);
    }
}

// when the profile button is clicked to jump to profile page
function goToProfile() {
    window.location.href = "/profile";
}







