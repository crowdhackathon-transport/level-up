$(document).ready(function() {
	$('body').addClass('loaded');
	$('.loader-logo').hide();
  $("#cafe-sidebar").hide();
});

$("#complete-payment-btn").click(function() {
	$('#paymentModal').modal('hide');
	$('#buy-ticket').modal('hide');
});


// brand btn behaviour /////////////////////////////////////////////////
function hideallbutmap() {
  $("#map").show();
  $("#content-stats").hide();
  $("#content-tickets").hide();
}



$("#cafe-sidebar-hide-btn").click(function() {
  $("#cafe-sidebar").toggle();
  $("#sidebar").hide();
  $("#nav-sidebar").hide();
  $('#user-sidebar').hide();
  map.invalidateSize();
  return false;
});
$("#cafe-toggle-btn-md").click(function() {
  $("#cafe-sidebar").toggle();
  $("#sidebar").hide();
  $("#nav-sidebar").hide();
  $('#user-sidebar').hide();
  map.invalidateSize();
  return false;
});


// hide sidebar on item click //////////////////////////////////////////
$("#bus-toggle-btn").click(function() {
  $("#nav-sidebar").hide();
});
$("#tickets-toggle-btn").click(function() {
  $("#nav-sidebar").hide();
});
$("#stats-toggle-btn").click(function() {
  $("#nav-sidebar").hide();
});




// sidebar special item actions ////////////////////////////////////////
$("#tickets-toggle-btn").click(function() {
  $("#map").hide();
  $("#content-stats").hide();
  $("#content-tickets").show();
  return false;
});
$("#stats-toggle-btn").click(function() {
  $("#map").hide();
  $("#content-stats").show();
  $("#content-tickets").hide();
  return false;
});


var ttype;

$('#buyticket1').click(function(){
	ttype=1;
	return ttype;
});
$('#buyticket2').click(function(){
	ttype=2;
	return ttype;
});
$('#buyticket3').click(function(){
	ttype=3;
	return ttype;
});
$('#buyticket4').click(function(){
	ttype=4;
	return ttype;
});
$('#buyticket5').click(function(){
	ttype=5;
	return ttype;
});
$('#buyticket6').click(function(){
	ttype=6;
	return ttype;
});
$('#buyticket7').click(function(){
	ttype=7;
	return ttype;
});

$('#complete-payment-btn').click(function(){
	document.querySelector('#ticket'+ttype+'-amount').value = +(document.querySelector('#quant').value) + +(document.querySelector('#ticket'+ttype+'-amount').value);
});




function useTicket() {
	document.querySelector('#ticket'+ttype+'-amount').value -= 1;
	var ticket = Math.floor((Math.random() * 10000000000) + 1); ;
	alert("To εισιτήριό σας ενεργοποιήθηκε.\n\nΈχετε 20 δευτερόλεπτα για να ακυρώσετε την ενεργοποίηση\n\n\nΟ κωδικός του εισιτηρίου είναι:\n\n"+ticket);
}

$('#useticket1').click(function(){
	ttype=1;
	useTicket();
	return ttype;
});
$('#useticket2').click(function(){
	ttype=2;
	useTicket();
	return ttype;
});
$('#useticket3').click(function(){
	ttype=3;
	useTicket();
	return ttype;
});
$('#useticket4').click(function(){
	ttype=4;
	useTicket();
	return ttype;
});
$('#useticket5').click(function(){
	ttype=5;
	useTicket();
	return ttype;
});
$('#useticket6').click(function(){
	ttype=6;
	useTicket();
	return ttype;
});
$('#useticket7').click(function(){
	ttype=7;
	useTicket();
	return ttype;
});





//add-remove tickets ///////////////////////////////////////////////////
function updatePriceTotal() {
	document.querySelector('#totalamount').value = (+(document.querySelector('#quant').value) * +(document.querySelector('#ticketprice').value)) /100;

}
$( document ).ready(function() {
    updatePriceTotal();
});


$('.btn-number').click(function(e){
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {

            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
                updatePriceTotal();
            }
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
                updatePriceTotal();
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
                updatePriceTotal();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
                updatePriceTotal();
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
   updatePriceTotal();
});
$('.input-number').change(function() {

    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }


});
$(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
//end plus-minus ///////////////////////////////////////////////////////








$.getScript('//cdnjs.cloudflare.com/ajax/libs/flot/0.8.2/jquery.flot.min.js',function(){
  $.getScript('//cdnjs.cloudflare.com/ajax/libs/flot/0.8.2/jquery.flot.pie.min.js',function(){
    $.getScript('//cdnjs.cloudflare.com/ajax/libs/flot/0.8.2/jquery.flot.resize.min.js',function(){


      // static charts
      var d1 = [];
      for (var i = 0; i < 14; i += 0.2) {
         d1.push([i, Math.sin(i)]);
      }
      var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];
      var d3 = [[0, 12], [7, 12], [12, 13]];

      // line
      $.plot("#chart2",[d1],{yaxis:{show:false},grid:{borderColor:'#ccc'}});
      $.plot("#chart3",[d2,d3],{yaxis:{show:false},grid:{borderColor:'#ccc'},series:{color:'#ff4444',lines:{show:true},points:{show:true}}});
      $.plot("#chart4",[d3],{yaxis:{show:false},grid:{borderColor:'#ccc'},series:{color:'#4444ff'}});

      // pie
      $.plot("#chart5",[{data:70,color:'#5566ff'},{data:20,color:'#ddd'}],{series:{pie:{show: true,innerRadius: 0.6}}});
      $.plot("#chart6",[{data:10,color:'#5566ff'},{data:30,color:'#ddd'}],{series:{pie:{show: true,innerRadius: 0.6}}});

      // real-time chart
      // we use an inline data source in the example, usually data would
      // be fetched from a server
      var data = [], totalPoints = 200;
      function getRandomData() {

        if (data.length > 0)
          data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
          var prev = data.length > 0 ? data[data.length - 1] : 50;
          var y = prev + Math.random() * 10 - 5;
          if (y < 0)
            y = 0;
          if (y > 100)
            y = 100;
          data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
          res.push([i, data[i]])
          return res;
      }

      // setup control widget
      var updateInterval = 500;
      $("#updateInterval").val(updateInterval).change(function () {
      var v = $(this).val();
      if (v && !isNaN(+v)) {
        updateInterval = +v;
        if (updateInterval < 1)
            updateInterval = 1;
            if (updateInterval > 2000)
             updateInterval = 2000;
             $(this).val("" + updateInterval);
            }
      });

      // setup plots
      var options = {
        grid:{borderColor:'#ccc'},
        series:{shadowSize:0,color:"#33ff33"},
        yaxis:{min:0,max:100},
        xaxis:{show:true}
      };

      var plot = $.plot($("#chart1"), [ getRandomData() ], options);

      function update() {
        plot.setData([ getRandomData() ]);
        plot.draw();
        setTimeout(update, updateInterval);
      }

      update();

    });// end getScript (resize)
  });// end getScript (pie)
});// end getScript





