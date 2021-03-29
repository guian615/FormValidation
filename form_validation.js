$(document).ready(function () {
    $(function () {
        // INITIALIZE DATEPICKER PLUGIN
        $('#inputbirth').datepicker({
            // uiLibrary: 'dd/mm/yy'
        });

    });

    $("#btnClosePopup").click(function () {
        $("#erros").modal("hide");
        $(".error").html("")
    });
    $("#signInBtn").click(function () {

        validateName($(".name"))
        validateLastName($(".lname"))

       
        validateEmail($(".email").val())
        validatePass($(".password"))
        if ($(".password").val() != $(".rpassword").val()) {
            $(".error").append("<br>Your passwords do not match. Please try again")
        }

        if ($(".birth").val() == "") {
            $(".error").append("<br>You must be 18 years old and above to create an account.")
        } else {
            $today = new Date();
            $dob = new Date($(".birth").val());
            $age = Math.floor(($today - $dob) / (365.25 * 24 * 60 * 60 * 1000));
            if ($age < 18) {
                $(".error").append("<br>You must be 18 years old and above to create an account.")
            }
        }


        if ($(".pNumber").val() == "") {
            $(".error").append("<br>Please enter a valid phone number ")
            $(".error").append("<br>Your phone number is not on PH origin.")
            $(".error").append("<br>Accounts are exclusive for Philippine users only")
        } else {
            if (!phone_validate($(".pNumber").val())) {
                $(".error").append("<br>Please enter a valid phone number ")
                $(".error").append("<br>Your phone number is not on PH origin.")
                $(".error").append("<br>Accounts are exclusive for Philippine users only")
            }
            if ($(".pNumber").val().length != 13) {
                $(".error").append("<br>Please enter a valid phone number ")
                $(".error").append("<br>Your phone number is not on PH origin.")
                $(".error").append("<br>Accounts are exclusive for Philippine users only")
            }
        }


        if ($(".error").html() == "") {
            $(".modal-header").html("Successfully Register")
            $(".modal-header").removeClass("bg-danger")
            $(".modal-header").addClass("bg-warning")
            $(".error").append("<br>Account Created")

        } else {
            $(".modal-header").html("Oops")
            $(".modal-header").removeClass("bg-success")
            $(".modal-header").addClass("bg-danger")

        }
        $('#errors').modal('show');

    })

    function phone_validate(pNumber) {
        var regexPattern = new RegExp(/^[0-9-+]+$/);
        return regexPattern.test(pNumber);
    }

    function validateEmail(email) {
        var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        if (re.test(email)) {
            if (email.indexOf('com', email.length - 'com'.length) !== -1 || email.indexOf('net', email.length - 'net'.length) !== -1 || email.indexOf('org', email.length - 'org'.length) !== -1 || email.indexOf('ph', email.length - 'ph'.length) !== -1) {
            } else {
                $(".error").append('<br>Please enter a valid email');
            }
        } else {
            $(".error").append('<br>Please enter a valid email');
        }
    }

    function validateName($name) {
        if ($name.val() == "") {
            $(".error").append("<br>Please enter a valid first name.")
        } else {
            if (checkForSpecialChar($name.val()) || $name.val().charAt(0) == '.') {
                $(".error").append("<br>Please enter a valid first name. ")
            }
        }
    }

    function validatePrefix($name) {
        if ($name.val().includes("Jr.") || $name.val().includes("Sr.")) {
            return true
        }
        return false
    }

    function validateLastName($name) {
        if ($name.val() == "") {
            $(".error").append("<br>Please enter a valid last name.")
        } else {
            validlSp($name.val())
        }
    }

    function validSp($name) {
        if (/^[a-zA-Z0-9- -.-II-III]*$/.test($name) == false) {
            $(".error").append("<br>Please enter a valid name.")
        }
    }
    function validlSp($name) {
        if (/^[a-zA-Z- -.-II-III]*$/.test($name) == false) {
            $(".error").append("<br>Please enter a valid name.")
        }
    }

    var specialChars = "<>@!#$%^&*()_+[]{}?:.;|'\"\\,/~`-=0123456789";
    function checkForSpecialChar(string) {
        for (i = 0; i < specialChars.length; i++) {
            if (string.indexOf(specialChars[i]) > -1) {
                return true;
            }
        }
        return false;
    }

    function validatePass($pass) {
        if ($pass.val().length < 8) {
            $(".error").append("<br>Your password must have 8 characters or more, and contain at least one special character, number, uppercase letter, and lowercase letter")
        } else {
            checkPassword($pass.val())
        }
    }
    function checkPassword($password) {
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #+=\(\)\^?&])[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/.test($password) == false) {
            $(".error").append("<br>Password must contains atleast one special char, number, lowercase, uppercase")
        }


    };
})



