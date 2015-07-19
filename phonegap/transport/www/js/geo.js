
	//var geocoder;    
	//geocoder = new google.maps.Geocoder();			  
		  
	function findAdressfromCoordinates(){

	navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);

	
	}
          
    var onGetCurrentPositionSuccess = function(position) {
		
		var lat = parseFloat(position.coords.latitude);
		var lng = parseFloat(position.coords.longitude);
		
		var latlng=[lat,lng];
                        
      //var latlng = new google.maps.LatLng(lat, lng);
    
	  
	  // $('#test').html(teeeest');
	   
	  onLocationFound(latlng,lat,lng);
	   
     /*geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            var arrAddress = results[0].address_components;
            // iterate through address_component array
            $.each(arrAddress, function (i, address_component) {
              if (address_component.types[0] == "route") {
                alert(address_component.long_name); // city

					/*var address=document.getElementById('address');
					address.style.display = 'block';
					address.innerHTML=address_component.long_name;*/
				
               // alert(address_component.long_name);
               /* return false; // break
              }
            });
          } else {
            alert("No results found");
          }
        } else {
          alert("Geocoder failed due to: " + status);
        }
      });*/
    }
	
  
    var onGetCurrentPositionError = function(error) { 
      console.log("Couldn't get geo coords from device");
    } 
