document.addEventListener("DOMContentLoaded", function () {
    /*===== SHOW NAVBAR  =====*/
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show')
                toggle.classList.toggle('bx-x')
                bodypd.classList.toggle('body-pd')
                headerpd.classList.toggle('body-pd')
            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    /*===== LINK ACTIVE  =====*/
    const linkColor = document.querySelectorAll('.nav__link')
    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))


    // Show action buttons after GPA calculation
    function showActionButtons() {
        document.getElementById("actionButtons").style.display = "block";
    }

    // Clear button logic
    const clearBtn = document.getElementById("clearBtn");
    clearBtn.addEventListener("click", function () {
        document.querySelectorAll("#gpaForm input[type='number']").forEach(inp => inp.value = "");
        document.getElementById("resultContainer").style.display = "none";
        document.getElementById("actionButtons").style.display = "none";
    });



    // Modify calculateGPAAndScroll to show buttons
    window.calculateGPAAndScroll = function (customMessage) {
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
        var cc9 = parseFloat(document.getElementById("cc9").value);
        var gp9 = parseFloat(document.getElementById("gp9").value);

        var calculatedGPA =
            (cc1 * gp1 + cc2 * gp2 + cc3 * gp3 + cc4 * gp4 + cc5 * gp5 +
                cc6 * gp6 + cc7 * gp7 + cc8 * gp8 + cc9 * gp9) /
            (cc1 + cc2 + cc3 + cc4 + cc5 + cc6 + cc7 + cc8 + cc9);

        var resultContainer = document.getElementById("resultContainer");
        resultContainer.style.display = "block";
        resultContainer.innerHTML =
            "<h3>" + customMessage + "</h3><p><strong>" +
            calculatedGPA.toFixed(2) + "</strong></p>";


        // Show Clear + Export buttons
        showActionButtons();
        resultContainer.scrollIntoView({ behavior: "smooth" });
    }
});
