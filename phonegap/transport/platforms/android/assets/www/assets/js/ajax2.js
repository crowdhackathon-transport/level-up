katanalotis_id='111111111';

function sendanafora() {

  var xarti= $( "#xarti").val();
  
  var fotismo= $( "#fotismo").val();
  	  
  var stasi_onoma= $( "#stasi_onoma").val();
    
  var dromologia= $( "#dromologia").val();
  
  var prosvasi= $( "#prosvasi").val();
  
  var stegastro= $( "#stegastro").val();
  
  var braille= $( "#braille").val();

  var stasi_fthores= $( "#stasi_fthores").val();
    
  var leoforeio_gemato= $( "#leoforeio_gemato").val(); 
  
  var klimatismo= $( "#klimatismo").val(); 

  var mpotiliarisma= $( "#mpotiliarisma").val(); 
  
  var peristatiko= $( "#peristatiko").val(); 
  
  var sxolio= $( "#sxolio").val(); 
 
  sendanaforajax(xarti,fotismo,stasi_onoma,dromologia,prosvasi,stegastro,braille,stasi_fthores,leoforeio_gemato,klimatismo,mpotiliarisma,peristatiko,sxolio );
}

function sendanaforajax(xarti,fotismo,stasi_onoma,dromologia,prosvasi,stegastro,braille,stasi_fthores,leoforeio_gemato,klimatismo,mpotiliarisma,peristatiko,sxolio) {

    //-----------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------
    $.ajax({     
		type: "POST",	
		url: 'http://localhost/transport/send_anafora.php',           
		data: {katanalotis_id:katanalotis_id,xarti:xarti,fotismo:fotismo,stasi-onoma:stasi-onoma,dromologia:dromologia,prosvasi:prosvasi,stegastro:stegastro,braille:braille,stasi-fthores:stasi-fthores,leoforeio-gemato:leoforeio-gemato,klimatismo:klimatismo,mpotiliarisma:mpotiliarisma,peristatiko:peristatiko,sxolio:sxolio},      
                              
		dataType: 'json',     


	  //data format      
      success: function(data)          //on recieve of reply
      {
	  
	  console.log("success");
	  console.log(data);
	 

      } 
    });
  } 