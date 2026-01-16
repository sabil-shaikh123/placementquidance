document.addEventListener("DOMContentLoaded", () => {
    //to check wheather the user is authenticated or not
    //if user is not authenticated then that will return to the login page
    const email = sessionStorage.getItem("Email");
    alert("the email is "+email)
    if(email == null){
        document.getElementById("authMsg").innerText ="You are not an authenticated user";
         setTimeout(() => {
            window.location.href = "login.html";
         }, 2000);

    }else{
        //fetch all the details from the db
          fetch("http://localhost:8080/getProfileData", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      email: email
                  })
          }).then(res =>res.json())
          .then(msg => {
                alert(msg)
               const name = document.getElementById("userName")
               const email1 = document.getElementById("userEmail")
               alert(msg.name)
               name.textContent = msg.name
               email1.textContent = msg.email

               // Container for enrolled companies
               const companiesDiv = document.getElementById("enrolledCompanies");

               // Clear existing content
               companiesDiv.innerHTML = '';

               // Check if student has any enrolled companies
               if(msg.companyList && msg.companyList.length > 0) {
                   msg.companyList.forEach(company => {
                       // Create a div for each company
                       const companyEl = document.createElement("div");
                       companyEl.classList.add("company-item"); // optional class for styling

                       // Add company name
                       companyEl.textContent = company.company_name + " - "
                                               + new Date(company.visiting_date).toLocaleDateString();

                       // Make it clickable
                       companyEl.style.cursor = "pointer";
                       companyEl.addEventListener("click", () => {
                           // Navigate to the company page with company ID
                           window.location.href = `company.html?id=${company.company_id}`;
                       });

                       // Append to the container
                       companiesDiv.appendChild(companyEl);
                   });
               } else {
                   companiesDiv.textContent = "No enrolled companies yet.";
               }

          })
    }



})