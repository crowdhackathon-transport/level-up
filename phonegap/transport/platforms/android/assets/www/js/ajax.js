katanalotis_id='dmanias';


    receiveeisitiriaajax(katanalotis_id);


  function buyTickets() {

  var arithmoseisitirion= $( "#quant").val();
    var timi= $( "#ticketprice").val();
    var eidoseisitiriou= $( "#ticketstatus").val();

  sendeisitiriaajax(katanalotis_id,arithmoseisitirion,timi,eidoseisitiriou );

}

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
  var atixima= $( "#atixima").val();
  var stasi_gemati= $( "#stasi_gemati").val();
  var smallImage= $( "#imagehidden").val();
  var sxolio= $( "#sxolio").val();
  sendanaforajax(xarti,fotismo,atixima,stasi_gemati,stasi_onoma,dromologia,prosvasi,stegastro,braille,stasi_fthores,leoforeio_gemato,klimatismo,mpotiliarisma,peristatiko,sxolio,smallImage );

    alert("Η αναφορά στάλθηκε επιτυχώς!\n\nΕυχαριστούμε για τη συμβολή σας.");

}

function sendanaforajax(xarti,fotismo,atixima,stasi_gemati,stasi_onoma,dromologia,prosvasi,stegastro,braille,stasi_fthores,leoforeio_gemato,klimatismo,mpotiliarisma,peristatiko,sxolio,smallImage) {

    //-----------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------
    $.ajax({
		type: "POST",
		url: 'http://193.108.160.55/phpinfo/contractuals-test/send_anafora.php',
		data: {katanalotis_id:katanalotis_id,atixima:atixima,stasi_gemati:stasi_gemati,xarti:xarti,fotismo:fotismo,stasi_onoma:stasi_onoma,dromologia:dromologia,prosvasi:prosvasi,stegastro:stegastro,braille:braille,stasi_fthores:stasi_fthores,leoforeio_gemato:leoforeio_gemato,klimatismo:klimatismo,mpotiliarisma:mpotiliarisma,peristatiko:peristatiko,smallImage:smallImage,sxolio:sxolio},
		dataType: 'json',


	  //data format
      success: function(data)          //on recieve of reply
      {

	  console.log("success");
	  console.log(data);

      }
    });
  }

function sendeisitiriaajax(katanalotis_id,arithmoseisitirion,timi,eidoseisitiriou ) {

    //-----------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------
    $.ajax({
		type: "POST",
		url: 'http://193.108.160.55/phpinfo/contractuals-test/send_eisitiria.php',
		data: {katanalotis_id:katanalotis_id,arithmoseisitirion:arithmoseisitirion,timi:timi,eidoseisitiriou:eidoseisitiriou},
		dataType: 'json',


	  //data format
      success: function(data)          //on recieve of reply
      {

	  console.log("success");

	  //window.location.href="#";


      }
    });
  }

 function receiveeisitiriaajax(katanalotis_id ) {

    //-----------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------
    $.ajax({
		type: "POST",
		url: 'http://193.108.160.55/phpinfo/contractuals-test/receive_eisitiria.php',
		data: {katanalotis_id:katanalotis_id},
		dataType: 'json',


	  //data format
      success: function(data)          //on recieve of reply
      {

	  $('#ticket1-amount').val(data);

	  console.log("success");

      }
    });
  }

   function receiveeisitiriastatsajax(katanalotis_id ) {

    //-----------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------
    $.ajax({
		type: "POST",
		url: 'http://193.108.160.55/phpinfo/contractuals-test/receive_eisitiria_stats.php',
		data: {katanalotis_id:katanalotis_id},
		dataType: 'json',


	  //data format
      success: function(data)          //on recieve of reply
      {

	var stats=[];

	$.each( data, function( key, value ) {

		stats.push({
			value:   value[0],
			color: getRandomColor(),
			label:value[1]
		});


	});

	var ctx = document.getElementById("chart-area").getContext("2d");
	window.myPie = new Chart(ctx).Pie(stats);


      }
    });
  }

  function sendpoisajax(pois) {

  $(".routes-modal-body").empty();

    $.ajax({
		type: "POST",
		url: 'http://193.108.160.55:8081',
		data:pois ,
		//dataType: 'json',


	  //data format
      success: function(data)          //on recieve of reply
      {
		days=0;
		var lines = data.split('\n');

			$.each(lines, function(){

				if (this.indexOf("http") >= 0)
					{
						days=days+1;
						googledirectionsajax(this,days);

					}
			});

	  console.log(data);


      }
    });
  }



   function sendrouteajax(route) {
    $.ajax({
		type: "POST",
		url: 'http://193.108.160.55:8082',
		data:route ,
		//dataType: 'json',


	  //data format
      success: function(data)          //on recieve of reply
      {
		var data = data.slice(19,-2003);
		
		var data = data.split(',');
		//var res=[];
			for( var i=data.length -1; i>=0;i--) {
					str=data[i];
				console.log(str);
str = str.replace(/\s/g, '');				
				 res = str.substring(1, 7);	
				 result.push(res);
					console.log(res);
	
			}
	
	  
	  console.log(result);
	  


      } 
    });
  }

 function shareajax(sharepois){

FB.ui(
{
method: 'feed',
name: "Αυτά είναι τα σημέια που θέλω να πάω:"+ sharepois,
//link: ' http://www.hyperarts.com/',
picture: 'http://193.108.160.55/phpinfo/contractuals-test/www/img/happy-baby.png',
caption: 'Σημεία ενδιαφέροντος',
description: 'Θα χρησιμοποιήσω την εφαρμογή easyTransport για να βγάλω τη καλύτερη διαδρομή!',
message: ''
});

 }

function deleteticketajax(){
    //-----------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------
    $.ajax({
		type: "POST",
		url: 'http://193.108.160.55/phpinfo/contractuals-test/delete_eisitiria.php',
		data: {katanalotis_id:katanalotis_id},
		dataType: 'json',


	  //data format
      success: function(data)          //on recieve of reply
      {

	  console.log("success");
	  window.location.href="tickets.html";
	  alert('Τελείωσε η διάρκεια του εισιτηρίου');


      }
    });
  }


 function googledirectionsajax(gurl,days){
    //-----------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------
    $.ajax({
		type: "POST",
		url: 'http://193.108.160.55/phpinfo/contractuals-test/google-directions-api.php',
		data: {gurl:gurl},
		dataType: 'json',


	  //data format
      success: function(data)          //on recieve of reply
      {
			imera="<h3> Ημέρα: "+days+"</h3>";

			simeia='';


			//console.log(data);

			for( var i=data.length -1; i>=0;i--) {

				//console.log(value);


				odigies="<h3>Από: "+data[i][0]+" - Πρός: "+data[i][1]+"</h3>";

				for( var j=data[i][2].length -1; j>=0;j--) {

					odigies=odigies+"<li>"+data[i][2][j]+"</li>";

				}



				simeia="<a href='#' data-toggle='modal' data-target='#instructionsModal' id='"+odigies+"' onclick='createinstructions(this.id)'> <li class='list-group-item'><strong>Από: "+data[i][0]+"<br>Πρός: "+data[i][1]+"</strong></li></a><br>"+simeia;

			}

			$(".routes-modal-body").after("<div>"+imera+simeia+"</div>");
      }
    });
  }


 function createinstructions(odigies){


	 $("#instructions").html("<div>"+odigies+"</div>");


 }
