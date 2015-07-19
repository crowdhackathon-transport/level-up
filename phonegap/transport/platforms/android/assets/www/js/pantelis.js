



function sendtest() {
	
	test='test';
	
	sendtestajax();
}

function sendtestajax() {

test="_id":"dmanias","destination1":"37.93702,23.6366","destination2":"37.93653,23.9465","days": 1,"home":"37.9745068,23.735265099999992";

pois={};
pois.push(test);


    //-----------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------
    $.ajax({     
		type: "POST",	
		url: 'http://193.108.160.55:8081',  // to klasiko einai url: '79.166.60.75/send_apodeiksi.php'       
		data:pois,                          
     


	  //data format      
      success: function(data)          //on recieve of reply
      {
	  
	  alert(data);
	  //alert('success');
	 
      } 
    });
  } 