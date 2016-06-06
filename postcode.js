//encodeURIComponent($("#address").val()) retrieves address from input and appends to url string
$("#find").click(function(e) {
	e.preventDefault();
	
	$.ajax({
		url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent($("#address").val()) +
		"&key=AIzaSyB34r52uas7DfclBLNF1tToyhaeFD3iPa8",
		type: "GET",
		//dataType: "json",
		success: function(data) {
			//status === "ZERO RESULTS" if field left blank OR if address doesn't geocode 
			//status === "OK" for a valid result 
			if (data["status"] !== "OK") {
				$("#errorMessage").html('<div class="alert alert-danger" role="alert"><strong>Postcode Not Found! Please try again.</strong></div>'); //returns error message for blank or invalid input
			} else {
				$.each(data["results"][0]["address_components"], function(key, value) {
					if(value["types"][0] === "postal_code") {
						$("#successMessage").html('<div class="alert alert-success" role="alert"><strong>Postcode Found!</strong> The post code is ' + value["long_name"] + '. </div>')  //returns postal code + message for valid address
					} 
				});
			} 
		}
	});
});