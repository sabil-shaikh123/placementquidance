//code to get the code id from the url parameter
const urlParams = new URLSearchParams(window.location.search);
const codeId = urlParams.get('id');

//function to runthe code clicking the run button
async function runCode() {
    const code = document.getElementById("code").value.trim();
    const language = document.getElementById("language").value;

    if (!code) {
        alert("Please write some code before running.");
        return;
    }

    let filename = "main.";
    let version;
    switch (language) {
        case "python3": filename += "py"; version = "3.10.0"; break;
        case "java": filename += "java"; version = "15.0.2"; break;
        case "c": filename += "c"; version = "10.2.0"; break;
        case "cpp": filename += "cpp"; version = "10.2.0"; break;
        default:
            document.getElementById("result").innerText = "Error: Invalid language selected.";
            return;
    }

    try {
        const baseUrl = "https://placementquidance-2.onrender.com";
        // ✅ Using await correctly
        const res = await fetch(`${baseUrl}/getCodeById/${codeId}`);
        if (!res.ok) throw new Error("Failed to load test cases");

        const c = await res.json();
        const inputcases = JSON.parse(c.stdInput);
        const outputcases = JSON.parse(c.stdOutput);

        for (let i = 0; i < inputcases.length; i++) {
            const currentInputArray = inputcases[i];
            const expectedOutput = outputcases[i];

            // Build the standard input string for Piston
            const input = currentInputArray.join('\n').trim();
            const body = {
                language: language,
                "version": version,
                "files": [
                    { "name": filename, "content": code }
                ],
                stdin: input
            };

            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error("Failed to execute code: " + response.status);

            const data = await response.json(); // Piston response
            let actualOutput = (data.run.stdout || "").trim(); // Get stdout and trim it

            function isParsableJSON(str) {
                try {
                    JSON.parse(str);
                    return true;
                } catch (e) {
                    return false;
                }
            }

            if (isParsableJSON(actualOutput)) {
                actualOutput = JSON.parse(actualOutput);
            }
            document.getElementById("result").innerText = data.run.stdout

            // --- 3. Check Result ---
            if (data.run.stderr) {
                // If there's a runtime error or compile error
                document.getElementById("result").innerText = `Test Case ${i + 1} Failed (Runtime Error):\n${data.run.stderr}`;
                return; // Stop execution on the first error
            }

            // Compare actual output with expected output (trimming both for safety)
            if (actualOutput != (expectedOutput || "")) {
                document.getElementById("result").innerText = `Test Case ${i + 1} Failed.\nExpected: ${expectedOutput}\nActual: ${actualOutput}`;
                return; // Stop execution on the first failed test
            }

            // If the loop completes, all tests passed
            if (i == inputcases.length - 1) {
                document.getElementById("result").innerText = "SUCCESS! All test cases passed.";
            }
        }
    } catch (err) {
        document.getElementById("result").innerText = "Error: " + err.message;
    }
}



//code to add the things when the page is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try{
        const baseUrl = "https://placementquidance-2.onrender.com";
        // ✅ Using await correctly
        const question = await fetch(`${baseUrl}/getCodeById/${codeId}`);
        if(!question.ok){
            throw new "error fetching the question please refresh the page";
        }
        const data = await question.json()
        let questionText = data.question;

        // Convert literal \n into real newlines
        questionText = questionText.replace(/\\n/g, "\n");

        const questionDiv = document.getElementById("question");
        questionDiv.innerHTML = ""; // clear previous

        questionText.split("\n").forEach(line => {
            const div = document.createElement("div");
            div.textContent = line;
            questionDiv.appendChild(div);
        });

    }catch(e){
        document.getElementById("question").textContent = "error loading the question"
    }
});

//to change the code synp when we change the language
document.getElementById("language").addEventListener('change', async function() {
    const language = document.getElementById("language").value;

    try {
        const baseUrl = "https://placementquidance-2.onrender.com";
        const res = await fetch(`${baseUrl}/getCodeById/${codeId}`);

        if (!res.ok)
            throw new Error("Failed to fetch code snippet: " + res.status);

        const data = await res.json();
        let codesynp;

        if(language === "python3")
            codesynp = data.pythoncode;
        else if(language === "java")
            codesynp = data.javacode;
        else if(language === "c")
            codesynp = data.ccode;
        else if(language === "cpp")
            codesynp = data.cppcode;
        else
            codesynp = "";

        codesynp = codesynp.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
        document.getElementById("code").value = codesynp;
    } catch (err) {
        console.error(err);
        document.getElementById("code").value = "// Error fetching code snippet";
    }
});


const textarea = document.getElementById("code");

textarea.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        e.preventDefault(); // stop focus jump
        let start = this.selectionStart;
        let end = this.selectionEnd;

        // insert tab
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

        // move cursor after tab
        this.selectionStart = this.selectionEnd = start + 1;
    }
});






