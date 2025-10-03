/*===== SHOW NAVBAR  =====*/ 
const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }
}

showNavbar('header-toggle','nav-bar','body-pd','header')

/*===== LINK ACTIVE  =====*/ 
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
    }
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))

function calculateGPAAndScroll(customMessage) {
    // Get input values
    var cc1 = parseFloat(document.getElementById("cc1").value);
    var gp1 = parseFloat(document.getElementById("gp1").value);

    var cc2 = parseFloat(document.getElementById("cc2").value);
    var gp2 = parseFloat(document.getElementById("gp2").value);

    var cc3 = parseFloat(document.getElementById("cc3").value);
    var gp3 = parseFloat(document.getElementById("gp3").value);

    var cc4 = parseFloat(document.getElementById("cc4").value);
    var gp4 = parseFloat(document.getElementById("gp4").value);

    var cc5 = parseFloat(document.getElementById("cc5").value);
    var gp5 = parseFloat(document.getElementById("gp5").value);

    var cc6 = parseFloat(document.getElementById("cc6").value);
    var gp6 = parseFloat(document.getElementById("gp6").value);

    var cc7 = parseFloat(document.getElementById("cc7").value);
    var gp7 = parseFloat(document.getElementById("gp7").value);

    var cc8 = parseFloat(document.getElementById("cc8").value);
    var gp8 = parseFloat(document.getElementById("gp8").value);

    // Repeat for other courses

    // Replace the following lines with your actual GPA calculation logic
    // Your GPA calculation logic goes here
    var calculatedGPA =
      (cc1 * gp1 +
        cc2 * gp2 +
        cc3 * gp3 +
        cc4 * gp4 +
        cc5 * gp5 +
        cc6 * gp6 +
        cc7 * gp7 +
        cc8 * gp8) /
      (cc1 + cc2 + cc3 + cc4 + cc5 + cc6 + cc7 + cc8);
   

    // // Display results
    // var resultContainer = document.getElementById("resultContainer");
    // resultContainer.style.display = "block";
    // resultContainer.innerHTML =
    //   "<p>Your 1st Semester GPA is :<br> <strong>" +
    //   calculatedGPA.toFixed(2) +
    //   "</strong></p>";

            // Display results
        var resultContainer = document.getElementById("resultContainer");
        resultContainer.style.display = "block";



        resultContainer.innerHTML =
        "<h3>" + customMessage + "</h3><p><strong>" +
        calculatedGPA.toFixed(2) + "</strong></p>";

         // Show action buttons
    document.getElementById("actionButtons").style.display = "block";
    
        // Scroll to the result container
        resultContainer.scrollIntoView({ behavior: "smooth" });
    
    // Repeat for displaying course results
  }

// Clear button logic
document.getElementById("clearBtn").addEventListener("click", function () {
    // Reset all inputs
    document.querySelectorAll("#gpaForm input[type='number']").forEach(inp => inp.value = "");

    // Hide result + buttons
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("actionButtons").style.display = "none";
});

// // Export button logic
// document.getElementById("exportBtn").addEventListener("click", function () {
//     let resultText = document.getElementById("resultContainer").innerText;
//     let blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
//     let link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "GPA_Result.txt";
//     link.click();
// });





  
