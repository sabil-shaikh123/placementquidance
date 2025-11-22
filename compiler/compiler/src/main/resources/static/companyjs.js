// Get the company ID from URL
const urlParams = new URLSearchParams(window.location.search);
const companyId = urlParams.get('id');

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
      document.getElementById('companyName').textContent = company.company_name;
      document.getElementById('companyDescription').textContent = company.company_description;
    })
    .catch(err => {
      console.error('Error loading company:', err);
      document.body.innerHTML = "<h2>Failed to load company details.</h2>";
    });
} else {
  document.body.innerHTML = "<h2>No company selected!</h2>";
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



