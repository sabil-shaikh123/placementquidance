document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/getAllCompany")
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
          window.location.href = `company.html?id=${company.company_id}`;
        };

        div.appendChild(nameElement);
      });
    })
    .catch(err => {
      console.error("Error fetching companies:", err);
    });
});


function taketest(){
    fetch("http://localhost:8080/getAllCode")
    .then(res => res.json())
    .then(data => {
        const randomquestion = data[Math.floor(Math.random() * data.length)];
        window.location.href = `compiler.html?id=${randomquestion.codeId}`;
    })
}

