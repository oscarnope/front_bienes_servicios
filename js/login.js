$(document).ready(function() {

	$("form").on("submit", function(e) {

    	e.preventDefault()
    	$email = $("#inputUsername")
    	$password = $("#inputPassword")

    	if ($email.val() === "" || $password.val() === "") {
      		alert("Por favor ingresa todos tus datos")
    	}
	    
	    userLogin = {
	      email: $email.val(),
	      password: $password.val()
	    }

	    $.ajax({
	      type: "POST",
	      url: 'http://localhost:8080/login',
	      data: JSON.stringify(userLogin),
	      success: function(data) {
	        console.log("USUARIO LOGEADO" + data);
	      },
	      dataType: 'json',
	      contentType: "application/json"
	    });
  	})
})