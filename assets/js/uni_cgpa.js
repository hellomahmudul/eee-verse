const add = document.querySelector("#add");
const semester = document.querySelector("#semester");
const totalCreditsInput = document.querySelector("#total-credits-select");
const customCredits = document.querySelector("#custom-credits");
const gpaInput = document.querySelector("#gpa");
const tbody = document.querySelector("#tbody");
const table = document.querySelector("#table");
const clear = document.querySelector("#clear");

// Show custom credits input when "other" selected
totalCreditsInput.addEventListener("change", () => {
  if (totalCreditsInput.value === "other") {
    customCredits.style.display = "inline-block";
    customCredits.focus();
  } else {
    customCredits.style.display = "none";
    customCredits.value = "";
  }
});

// ==================== Add new semester ====================
add.addEventListener("click", () => {
  if (
    semester.selectedIndex === 0 ||
    (totalCreditsInput.value === "" && customCredits.value === "") ||
    gpaInput.value === "" ||
    gpaInput.value < 0
  ) {
    alert("Wrong input, check and try again");
  } else {
    const tr = document.createElement("tr");

    const tdSemester = document.createElement("td");
    tdSemester.innerHTML = semester.options[semester.selectedIndex].text;

    const tdCredits = document.createElement("td");
    tdCredits.innerHTML =
      totalCreditsInput.value === "other"
        ? customCredits.value
        : totalCreditsInput.value;

    const tdGpa = document.createElement("td");
    tdGpa.innerHTML = gpaInput.value;

    // ===== Delete button cell =====
    const tdAction = document.createElement("td");
    const delBtn = document.createElement("button1");
    delBtn.classList.add("delete-btn1");
    delBtn.innerHTML = `<i class='bx bx-trash'></i>`;
    tdAction.appendChild(delBtn);

    // Delete row + recalc
    delBtn.addEventListener("click", () => {
      tr.remove();
      recalcCGPA();
    });

    tr.appendChild(tdSemester);
    tr.appendChild(tdCredits);
    tr.appendChild(tdGpa);
    tr.appendChild(tdAction);
    tbody.appendChild(tr);

    table.classList.remove("display-none");
    clear.classList.remove("display-none");

    // Reset inputs
    semester.selectedIndex = 0;
    totalCreditsInput.selectedIndex = 0;
    customCredits.style.display = "none";
    customCredits.value = "";
    gpaInput.value = "";

    // 🔥 Auto recalc
    recalcCGPA();
  }
});

// ==================== Recalculate CGPA ====================
function recalcCGPA() {
  let totalCredits = 0;
  let totalWeighted = 0;

  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    const credits = parseFloat(row.children[1].innerText);
    const gpa = parseFloat(row.children[2].innerText);

    totalCredits += credits;
    totalWeighted += credits * gpa;
  });

  const resultBox = document.getElementById("result-section");
  const totalCreditsEl = document.getElementById("total-credits-display");
  const gpaResultEl = document.getElementById("gpa-result");

  if (totalCredits === 0) {
    resultBox.classList.remove("success");
    resultBox.classList.add("error");
    totalCreditsEl.textContent = "";
    gpaResultEl.textContent = "No semesters added yet!";
    resultBox.classList.remove("display-none");
    return;
  }

  let cgpa = (totalWeighted / totalCredits).toFixed(2);

  resultBox.classList.remove("error");
  resultBox.classList.add("success");
  totalCreditsEl.textContent = `Your total credits: ${totalCredits}`;
  gpaResultEl.textContent = `Your CGPA: ${cgpa}`;

  resultBox.classList.remove("display-none");
}

const exportBtn = document.getElementById("export");

// Show export button whenever table has rows
function toggleExportButton() {
  if (tbody.querySelectorAll("tr").length > 0) {
    exportBtn.classList.remove("display-none");
  } else {
    exportBtn.classList.add("display-none");
  }
}

// Recheck whenever CGPA recalculated
add.addEventListener("click", toggleExportButton);
clear.addEventListener("click", toggleExportButton);

// Export / Print functionality
exportBtn.addEventListener("click", () => {
  // Clone table and result section
  const tableClone = table.cloneNode(true);
  const resultClone = document.getElementById("result-section").cloneNode(true);
// Remove unwanted column from cloned table
  const columnIndexToRemove = 3; // Change this to the column index you want to remove
  Array.from(tableClone.rows).forEach(row => {
    if (row.cells[columnIndexToRemove]) {
      row.deleteCell(columnIndexToRemove);
    }
  });
  // Open print window
  const printWindow = window.open("", "", "width=800,height=600");

  printWindow.document.open();
  printWindow.document.write(`
     <html>
      <head>
        <title>CGPA_Export</title>
        <link rel="stylesheet" href="assets/css/exportstyle.css">
        <style>
          body { margin:16mm; font-family: Arial, sans-serif; }
          .display-none { display: none !important; }
        </style>
      </head>
      <body>
        <h1>EEE-VERSE || Result</h1>
        ${tableClone.outerHTML}
        ${resultClone.outerHTML}
        </br>
        <div class="meta">Generated on ${new Date().toLocaleString()}</div>
      </body>
    </html>
  `);
  printWindow.document.close();

  // Wait until CSS loads before printing
  printWindow.onload = function () {
    printWindow.print();
    printWindow.close();
  };
});


// ==================== Clear all ====================
clear.addEventListener("click", () => {
  tbody.innerHTML = "";
  table.classList.add("display-none");
  clear.classList.add("display-none");
  exportBtn.classList.add("display-none");
  
  const resultBox = document.getElementById("result-section");
  resultBox.classList.add("display-none");
});
