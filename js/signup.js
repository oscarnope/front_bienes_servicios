$(document).ready(function() {

    $("#btnRegisterClient").click(function () {

        var nameClient = $("#nameClient").val();
        var lastNameClient = $("#lastNameClient").val();
        var passwordClient = $("#passwordClient").val();
        var checkPasswordClient = $("#checkPasswordClient").val();
        var emailClient = $("#emailClient").val();
        
        user = {
          email: emailClient,
          password: passwordClient,
          name: nameClient + " " + lastNameClient,
          profile: "CLIENT"
        }

        if (passwordClient != checkPasswordClient){
            alert("Las contraseñas no coinciden, ingreselas nuevamente");
        }else{
            registrarUsuario(user); 
        }
    })

    
    $("#btnRegisterSupplier").click(function () {

        var nameSupplier = $("#nameSupplier").val();
        var lastNameSupplier = $("#lastNameSupplier").val();
        var passwordSupplier = $("#passwordSupplier").val();
        var checkPasswordSupplier = $("#checkPasswordSupplier").val();
        var emailSupplier = $("#emailSupplier").val();
        
        user = {
          email: emailClient,
          password: passwordSupplier,
          name: nameSupplier + " " + lastNameSupplier,
          profile: "SUPPLIER"
        }

        if (passwordSuppliler != checkPasswordSuppliler){
            alert("Las contraseñas no coinciden, ingreselas nuevamente");
        }else{
            registrarUsuario(user); 
        }

    })


    function registrarUsuario(user){

        console.log("SI ENTRA Nombre= " + user.name + " password = " + user.password + " email = " + user.email + " profile = " + user.profile);

        if (user.name === "" || user.password === "" || user.email === ""){

            alert("Por favor diligencie el formulario completamente");

        }else{
            
            $.ajax({
              type: "POST",
              url: 'http://localhost:8080/users',
              data: JSON.stringify(user),
              success: function(data) {
                console.log("USUARIO REGISTRADO" + data);
              },
              dataType: 'json',
              contentType: "application/json"
            });
        }
    }
})