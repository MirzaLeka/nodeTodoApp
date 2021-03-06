
function changeForm(num) {

    let form = document.getElementById("form");

    if (num == 0) {
    
        /* Sign up Form */

        form.innerHTML = `
        
        <form class="signup-form" onsubmit="register();return false">

        <h2 class="formHeader">Sign Up</h2>

        <input oninput="checkIfExists(0)" class="loginInput" name="signupUsername" type="text" placeholder="Username" autofocus autocomplete="off"/>
        <label class="checkLabel userExists"></label>

        <input oninput="checkIfExists(1)" class="loginInput" name="signupEmail" type="text" placeholder="Email" autocomplete="off"/>   
        <label class="checkLabel userExists"></label>  

        <input class="loginInput" name="signupPassword" id="pass" type="password" placeholder="Password" autocomplete="off"/>

        <input class="loginInput" name="confirmPassword" id="confirmPass" type="password" placeholder="Confirm Password" autocomplete="off"/>
    <br>
        <input class="btn btn-success formBtn" type="submit" id="confirmBtn" value="REGISTER"/>
    
        <p class="changeForm" onclick="changeForm(1)">Already a member?</p>

    </form>
        
        `;

        extraValidation();

        // action="/home" method="get"

    } else {

        /* Sign in Form */

        form.innerHTML = `

        <form class="signin-form" onsubmit="login();return false">
        
        <h2 class="formHeader">Sign In</h2>
    
        <input class="loginInput" oninput="fixForm()" name="signinEmail" type="email" placeholder="Email" autofocus/>

        <input class="loginInput" oninput="fixForm()" name="signinPassword" id="signinPass" type="password" placeholder="Password" autocomplete="off"/>
            <label id="loginFailed" class="checkLabel">Incorrect username or password</label>
    <br id="breakTag">
        <input class="btn btn-primary formBtn" type="submit" id="loginBtn" value="CONTINUE"/>

        <p class="changeForm" onclick="changeForm(0)">Not a member?</p>

        </form>
        
        `;

        extraConfirmation();

    }


}


$(function() {

$.validator.addMethod( "nowhitespace", function( value, element ) {
   return this.optional( element )
    || /^\S+$/i.test( value );
}, "No white space please.");   


$.validator.addMethod('strongUsername', function(value, element) {
    return this.optional(element) 
      || value.length >= 6
      && /[a-z]/i.test(value);
  }, 'Username must be at least 6 characters long and contain at least one letter.')


$.validator.addMethod('strongPassword', function(value, element) {
    return this.optional(element) 
      || value.length >= 8
      && /\d/.test(value)
      && /[a-z]/i.test(value)
      && /[$-/:-?{-~!"^_`\[\]]/.test(value);
  }, 'Password must be at least 8 characters long and contain at least one number, one letter and one symbol.')


/* Sign In form validation */

$(".signin-form").validate({
    rules: {
        signinEmail: {
            required: true,
            email: true
        },
        signinPassword: {
            required: true,
            strongPassword: true,
            nowhitespace: true,
            maxlength: 32
        },
        messages: {
            signinEmail: {
                required: "Please enter an email address.",
                email: "Please enter a valid email address."
            }
        }
    }


});

/* Sign Up form validation */

$(".signup-form").validate({
    rules: {
        signupUsername: {
            required: true,
            nowhitespace: true,
            strongUsername: true,
            maxlength: 24
        },
        signupEmail: {
            required: true,
            email: true
        },
        signupPassword: {
            required: true,
            strongPassword: true,
            nowhitespace: true,
            maxlength: 32
        },
        confirmPassword: {
            required: true,
            equalTo: "#pass",
            nowhitespace: true
        },
        messages: {
            signupEmail: {
                required: "Please enter an email address.",
                email: "Please enter a valid email address."
            }
        }
    }


});

});



function register() {

    extraValidation();

    let username = $("input[name='signupUsername']").val();
    let email = $("input[name='signupEmail']").val();
    let password = $("#pass").val();
    let confirm = $("#confirmPass").val();

    if (username == "" || email == "" || password == "" || confirm == "") {
        return;
    }

    if (password != confirm) {
        return;
    }

    let data = {
        "username" : username,
        "email" : email,
        "password" : password
    };

    $.ajax({
        type: "POST",
        url: "/users",
        contentType : 'application/json',
        dataType: "json",
        data : JSON.stringify(data),
        success: function(data) {

        window.location.href = "/home";
        },

        error: function(err) {

           const errType =  err.responseJSON.errmsg;

            if (errType.includes("username")) {
                $(`.userExists:eq(${0})`).css("display", "block");
                $(`.userExists:eq(${0})`).text("Username is already in use.");
            } else {
                $(`.userExists:eq(${1})`).css("display", "block");
                $(`.userExists:eq(${1})`).text("Email is already in use.");
            }

        }
    });


}



function login() {

    extraConfirmation();

    let email = $("input[name='signinEmail']").val();
    let password = $("#signinPass").val();

    if (email == "" || password == "") {
        return;
    }

    // url: "/users/" + email,

    let data = {
        "email" : email,
        "password" : password
    }

    $.ajax({
        type: "POST",
        url: "/users/login",
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify(data),
        success: function(data) {

            if (data) {
                window.location.href = "/home";
            } 

        },

    error: function (err) {

        if (err) {
            document.getElementById("loginFailed").style.display = "block";
            $("#breakTag").css("display", "none");
        }

    }

    });

}

    /* Remove label and fix form */

 function fixForm() {
    $("#breakTag").css("display", "block");
    document.getElementById("loginFailed").style.display = "none";
}

function checkIfExists(num) {
        $(`.userExists:eq(${num})`).css("display", "none");        
}



/* Extra stuff */


function extraValidation() {

    $.validator.addMethod( "nowhitespace", function( value, element ) {
        return this.optional( element )
         || /^\S+$/i.test( value );
     }, "No white space please.");   
     
     
     $.validator.addMethod('strongUsername', function(value, element) {
         return this.optional(element) 
           || value.length >= 6
           && /[a-z]/i.test(value);
       }, 'Username must be at least 6 characters long and contain at least one letter.')
     
     
     $.validator.addMethod('strongPassword', function(value, element) {
         return this.optional(element) 
           || value.length >= 8
           && /\d/.test(value)
           && /[a-z]/i.test(value)
           && /[$-/:-?{-~!"^_`\[\]]/.test(value);
       }, 'Password must be at least 8 characters long and contain at least one number, one letter and one symbol.')
     
     
     $(".signup-form").validate({
         rules: {
             signupUsername: {
                 required: true,
                 nowhitespace: true,
                 strongUsername: true,
                 maxlength: 24
             },
             signupEmail: {
                 required: true,
                 email: true
             },
             signupPassword: {
                 required: true,
                 strongPassword: true,
                 nowhitespace: true,
                 maxlength: 32
             },
             confirmPassword: {
                 required: true,
                 equalTo: "#pass",
                 nowhitespace: true
             },
             messages: {
                 signupEmail: {
                     required: "Please enter an email address.",
                     email: "Please enter a valid email address."
                 }
             }
         }
     
     
     });

}


function extraConfirmation() {
 
    $.validator.addMethod( "nowhitespace", function( value, element ) {
        return this.optional( element )
         || /^\S+$/i.test( value );
     }, "No white space please.");   
     
     $.validator.addMethod('strongPassword', function(value, element) {
         return this.optional(element) 
           || value.length >= 8
           && /\d/.test(value)
           && /[a-z]/i.test(value)
           && /[$-/:-?{-~!"^_`\[\]]/.test(value);
       }, 'Password must be at least 8 characters long and contain at least one number, one letter and one symbol.')
     

    $(".signin-form").validate({
        rules: {
            signinEmail: {
                required: true,
                email: true
            },
            signinPassword: {
                required: true,
                nowhitespace: true,
                strongPassword: true,
                maxlength: 32
            },
            messages: {
                signinEmail: {
                    required: "Please enter an email address.",
                    email: "Please enter a valid email address."
                }
            }
        }
    
    
    });

}