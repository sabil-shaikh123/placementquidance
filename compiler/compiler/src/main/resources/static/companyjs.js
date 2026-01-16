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
document.addEventListener('DOMContentLoaded',() => {

        // Get the company ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const companyId = urlParams.get('id');

        //to check wheather the user is authenticated or not
        //if user is not authenticated then that will return to the login page
        const email = sessionStorage.getItem("Email");
        if(email == null){
            document.getElementById("authMsg").innerText ="You are not an authenticated user";
             setTimeout(() => {
                window.location.href = "login.html";
             }, 2000);

        }

        if (companyId) {
            // Fetch company details by ID
            fetch(`https://placementquidance-2.onrender.com/getCompanyById/${companyId}`)
            .then(res => {
              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
              return res.json();
            })
            .then(company => {
                  checkTogle(companyId);
                  document.getElementById('companyName').textContent = company.company_name;
                  document.getElementById('companyDescription').textContent = company.company_description;
            })
            .catch(err => {
                  console.error('Error loading company:', err);
                  //document.body.innerHTML = "<h2>Failed to load company details.</h2>";
            });
        } else {
            //document.body.innerHTML = "<h2>No company selected!</h2>";
        }

        const div = document.getElementById("companyquestions")

        const baseUrl = "https://placementquidance-2.onrender.com";
        fetch(`${baseUrl}/getCompanyQuestion/${companyId}`)
        .then(res => res.json())
        .then(questions => {
        questions.forEach(q => {
          const qElement = document.createElement("p");
          qElement.textContent = q.breif_question;
          qElement.style.cursor = "pointer";
          qElement.style.color = "blue";
          qElement.style.textDecoration = "underline";
          alert("code id is "+q.codeId)
          qElement.onclick = () => {
            alert("code id is "+q.codeId)
            window.location.href = `compiler.html?id=${q.codeId}`;
          };

          div.appendChild(qElement);
        });
        })
        .catch(err => {
            console.error("Error fetching questions:", err);
        });
})

//this code is for the togle button
//// Example JS to detect toggle change
const toggle = document.getElementById("enrollToggle");
toggle.addEventListener("change", function() {
    // Get the company ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');
    let enab = "yes"
   if(this.checked){
       console.log("Enrollment ENABLED");
       enab = "yes"
       // Call your JS function to enable enrollment

   } else {
       console.log("Enrollment DISABLED");
       enab = "no"
       // Call your JS function to disable enrollment
   }
   const baseUrl = "https://placementquidance-2.onrender.com";
       const email = sessionStorage.getItem("Email");
       fetch(`${baseUrl}/addCompanyToStudent`, {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                   email: email,
                   companyId:String(companyId),
                   enab:enab
               })
        })
       .then(res => res.text)
       .then(data => {})
})



function checkTogle(companyId){
    const toggle = document.getElementById("enrollToggle");
    const baseUrl = "https://placementquidance-2.onrender.com";
    const email = sessionStorage.getItem("Email");
    fetch(`${baseUrl}/getProfileData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
    })
    .then(res => res.json())
    .then(data => {
        const comList = data.companyList; // this is an array of Company objects
        if (!comList || comList.length === 0) {
            toggle.checked = false; // no companies, toggle off
            return;
        }

        // Check if current companyId exists in the company list
        const isEnrolled = comList.some(c => String(c.company_id) === String(companyId));
        toggle.checked = isEnrolled;
    })
    .catch(err => console.error("Error fetching profile data:", err));
    return
}




