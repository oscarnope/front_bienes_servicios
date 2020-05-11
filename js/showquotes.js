$(document).ready(function() {

	var queryString = decodeURIComponent(window.location.search);
	
	queryString = queryString.substring(1);
	var queries = queryString.split("&");
	
	supplier = {
		id: queries[0],
		email: queries[1],
		name: queries[2]
	}

	var id_quote;

	$(document).on("click", "#btnSalir", function(e) {
		e.preventDefault()
	    
	    window.location.replace("../views/login.html");

	});

	$(document).on("click", "#btnTender", function(e) {
		e.preventDefault()
	    
	    var price = $("#price").val();
	    var offerDescription = $("#offerDescription").val();

	    if (price === "" || offerDescription === "") {
	    	alert("Por favor complete los datos de la oferta")
	    }else{
			
			offer = {
				"price": price,
				"description": offerDescription,
				"quotationId": id_quote,
				"supplierId": supplier.id
			}
			
			$.ajax({
				type: "POST",
		      	url: 'http://localhost:8080/offers',
		      	data: JSON.stringify(offer),
		      	success: function(data) {
		      		$('#offer').modal('hide');
	            	alert("Oferta Generada Satisfactoriamente");
	            	funcionVer();
		      	},
		    	error: function (xhr, ajaxOptions, thrownError) {
	        		alert("Se ha presentado un error. Intente nuevamente.")
	      	  	},
		      	dataType: 'json',
		      	contentType: "application/json"
		    });
	    }
	});

	$(document).on("click", ".offer", function(e) {
		e.preventDefault()
	    
	    id_quote = $(this).attr("id").replace("quote_", "")

	});

	var fakeResponse = 	[
		{
		    "id": 2,
		    "name": "mobileApp",
		    "description": "Descripción del producto 1",
		    "client": {
		        "id": 1,
		        "email": "user1@gmail.com",
		        "password": "123",
		        "name": "mobileApp",
		        "profile": "SUPPLIER",
		        "items": [],
		        "quotations": [],
		        "offers": []
		    },
		    "offers": null,
		    "item": null
		},
		{
		    "id": 1,
		    "name": "mobileApp",
		    "description": "Descripción del producto 2",
		    "client": {
		        "id": 1,
		        "email": "user1@gmail.com",
		        "password": "123",
		        "name": "mobileApp",
		        "profile": "SUPPLIER",
		        "items": [],
		        "quotations": [],
		        "offers": []
		    },
		    "offers": null,
		    "item": null
		}
	]

	var funcionVer = function() {

    
    $("#tableQuote").empty()
        	fakeResponse.forEach(function(cotizacion) {
          	$(`#tableQuote`).append(`<tr>
            	<td>${cotizacion.id}</td>
            	<td>${cotizacion.name}</td>
            	<td>${cotizacion.description}</td>
            	<td>${cotizacion.client.name}</td>
            	<td>${cotizacion.client.email}</td>
            	<td>
                	<p data-placement="top" data-toggle="tooltip" title="Offer"><button id="quote_${cotizacion.id}" class="btn btn-primary btn-xs offer" data-title="Offer" data-toggle="modal" data-target="#offer" ><span class="glyphicon glyphicon-pencil"></span></button></p>
              	</td>
            </tr>`)
        })

    $.ajax({
    	"url": "http://localhost:8080/quotation/" + supplier.id,
      	"method": "get",
      	"success": function(data) {
    		$("#tableQuote").empty()
        	data.forEach(function(cotizacion) {
          	$(`#tableQuote`).append(`<tr>
            	<td>${cotizacion.id}</td>
            	<td>${cotizacion.name}</td>
            	<td>${cotizacion.description}</td>
            	<td>${cotizacion.client.name}</td>
            	<td>${cotizacion.client.email}</td>
            	<td>
                	<p data-placement="top" data-toggle="tooltip" title="Offer"><button class="btn btn-primary btn-xs" data-title="Offer" data-toggle="modal" data-target="#offer" ><span class="glyphicon glyphicon-pencil"></span></button></p>
              	</td>
            </tr>`)
        })
      }
    })

  }
    
  funcionVer();

  $("[data-toggle=tooltip]").tooltip();

})