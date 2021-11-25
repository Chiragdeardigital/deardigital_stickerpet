var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    x[n].classList.add("tab-selected");
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").disabled = true;
    } else {
        document.getElementById("prevBtn").disabled = false;
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "ADD TO CART";
        document.getElementById("nextBtn").classList.add("no-disp");
        document.getElementById("AddToCart--product-custom-template-2").classList.remove("no-disp");
    } else {
        document.getElementById("nextBtn").innerHTML = `STEP ${n + 2}`;
        document.getElementById("nextBtn").classList.remove("no-disp");
        document.getElementById("AddToCart--product-custom-template-2").classList.add("no-disp");
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    // if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    x[currentTab].classList.remove("tab-selected");
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        // document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "step-selected" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" step-selected", "");
    }
    //... and adds the "step-selected" class on the current step:
    x[n].className += " step-selected";
}

// $(".option-title-label").click(function () {
//     checkFrames();
// });

function checkFrames(element) {
    if (element.value === "Two" && element.checked) {
        $(".pet2").removeClass("no-disp");
    }
    else {
        $(".pet2").addClass("no-disp");
    }
}

$(document).ready(function () {
    let option = document.getElementsByClassName("option-title-input");
    for (let i = 0; i < option.length; i++) {
        checkFrames(option[i]);
    }



    $(".fifth-step .hanging-products").click(function () {
        $(".fifth-step .hanging-products").removeClass("hanging-product-selected");
        $(this).addClass("hanging-product-selected");
        let variant_id = $(this).data("variant");
        if (variant_id) {
            $("#upsellProductId").html(`<input type="hidden" name="items[1][id]" value="${variant_id}">`);
        } else {
            $("#upsellProductId").html("");
        }
        $("#AddToCart--product-custom-template-2").attr("disabled", false);
    });



    setInterval(function () {
        let el = document.getElementsByClassName('tab-selected');
        let el_has_class = el[0].closest(".pet1");
        if (el_has_class) {
            console.log("test")
            if ($('.pet2').hasClass("no-disp")) {
                if ($('#pet1').val() == "") {
                    $('#nextBtn').attr('disabled', true);
                }
                else {
                    $('#nextBtn').text('Step 5');
                    $('#nextBtn').attr('disabled', false);
                }
            }
            else {
                if ($('#pet1').val() == "" || $('#pet2').val() == "") {
                    $('#nextBtn').attr('disabled', true);
                }
                else {
                    $('#nextBtn').text('Step 5');
                    $('#nextBtn').attr('disabled', false);
                }
            }
        } else {
            // $('#nextBtn').attr('disabled', false);
        }
    }, 500);



    // $('#AddToCart--product-custom-template-2').click(function (e) {
    //     e.preventDefault();
    //       addToCartVariant();
    //   });
});

