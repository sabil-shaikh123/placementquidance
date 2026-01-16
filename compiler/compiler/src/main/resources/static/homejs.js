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

document.addEventListener("DOMContentLoaded", () => {

    //to check wheather the user is authenticated or not
    //if user is not authenticated then that will return to the login page
    const email = sessionStorage.getItem("Email");
    if(email == null){
        document.getElementById("authMsg").innerText ="You are not an authenticated user";
         setTimeout(() => {
            window.location.href = "/login";
         }, 2000);

    }else{
        fetch("https://placementquidance-2.onrender.com/getAllCompany")
            .then(res => res.json())
            .then(data => {
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
            })
            .catch(err => {
              console.error("Error fetching companies:", err);
            });
    }



});


function taketest(){
    fetch("https://placementquidance-2.onrender.com/getAllCode")
    .then(res => res.json())
    .then(data => {
        const randomquestion = data[Math.floor(Math.random() * data.length)];
        window.location.href = `/compiler?id=${randomquestion.codeId}`;
    })
}

//when the profile button is clicked to jump to profile page
function goToProfile() {
    window.location.href = "/profile";
}






