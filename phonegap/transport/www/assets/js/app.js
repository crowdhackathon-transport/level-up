var map, lc, featureList, boroughSearch = [], placeSearch = [], museumSearch = [], ArtsEntertainmentSearch=[], CollegesUniversitiesSearch=[], EventsSearch=[],FoodSearch=[],NightlifeSpotsSearch=[],OutdoorsRecreationSearch=[],ProfessionalOtherPlacesearch=[],ResidencesSearch=[],ShopsServicesSearch=[],TravelTransportSearch=[];

var sharepois=[];
var pois={};

var route={};

 var geo = new google.maps.Geocoder();

$( document ).ready(function() {
	$('#sidebar').hide();
	$('#user-sidebar').hide();
	$('#nav-sidebar').hide();
	map.invalidateSize();


	katanalotis_id='dmanias';
	i=0;
	//pois= "'_id':"+katanalotis_id+"',";
	pois._id=katanalotis_id;

});

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".fa-chevron-right", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});


////////////////dimos remove///////////////
$(document).on("dblclick", ".feature-row", function(e) {
$(document).off("mouseout", ".feature-row", clearHighlight);
 $(this).remove();

});

$(document).on("click", ".choose-poi", function(e) {
  POIClick(parseInt($(this).attr("id"), 10));
});


///////dimos vres diadromi////
$(document).on("click", ".choose-destination", function(e) {
  var id = parseInt($(this).attr("id"), 10);

  var layer = markerClusters.getLayer(id);

    route.START='060283';
  route.FINISH='060718';


    console.log(route);

	sendrouteajax(route);

  //name=layer.feature.properties.NAME;

  ///////home /////

/*	navigator.geolocation.getCurrentPosition(homesuccess, homeerror);

	    var homesuccess = function(position) {

		var lat = parseFloat(position.coords.latitude);
		var lng = parseFloat(position.coords.longitude);

		var home=[lat,lng];
	}


  	var address = prompt("Ορίστε την διεύθυνση αφετηρίας σας", home);


		geo.geocode({'address':address},function(results, status){
			if (status == google.maps.GeocoderStatus.OK) {
      // do something with the geocoded result
      //

	   var lng = results[0].geometry.location.lng();
       var lat = results[0].geometry.location.lat();

	   route.home=lat+','+lng;*/
});


var markers = new L.FeatureGroup();
var markers_dest = new L.FeatureGroup();
var circles = new L.FeatureGroup();
var route_circles = new L.FeatureGroup();
var route_lines = new L.FeatureGroup();
var p_marker;
var p_circle;
var r_circle;
var r_lines;

$(document).on("click", ".kontinoi-stathmoi", function() {
    var e_lat = $(this).attr("lat");
    var e_lng = $(this).attr("lng");
    var radius = document.getElementById("fader").value;
    var zoom = 16;
    markers.clearLayers();
    circles.clearLayers();
    p_marker = L.marker([e_lat,e_lng])
        .bindPopup(radius + " meters from this point").openPopup();
    p_circle = L.circle([e_lat,e_lng], radius);
    markers.addLayer(p_marker);
    circles.addLayer(p_circle);
    var qry = "rad="+radius/1000+"&lat="+e_lat+"&lon="+e_lng;
    var LeafIcon = L.Icon.extend({
       options: {
        //shadowUrl: 'assets/img/station.png',
        iconSize:     [25, 30],
        //shadowSize:   [50, 64],
        iconAnchor:   [10, 30]//,
        //shadowAnchor: [4, 62],
        //popupAnchor:  [-3, -76]
       }
    });

    var icon_station = new LeafIcon({iconUrl: 'assets/img/station.png'});

    $.ajax({
      //url: 'php/get_close_stations.php',  //the script to call to get data
      url: 'http://193.108.160.55/phpinfo/contractuals-test/www/php/get_close_stations.php',  //the script to call to get data
      data: qry,                          //you can insert url argumnets here to pass to php
      dataType: 'json',                   //data format
      success: function(alldata)          //on recieve of reply
      {
        for (var i in alldata)
        {
          var data = alldata[i];
          var stop_id = data[0];
          var stop_code = data[1];
          var stop_name = data[2];
          var stop_desc = data[3];
          var stop_lat = data[4];
          var stop_lon = data[5];
          var location_type = data[6];
          //p_marker = L.marker([stop_lat, stop_lon], {icon: icon_station})
          var msg = "<h3 align=\"center\">"+stop_name+"</h3>"+
              "<h5 align=\"center\">(&nbsp;"+stop_desc+"&nbsp;)</h5>"+
              "<button id=\"dst\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnDst()\" type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pushpin\" aria-hidden=\"true\"></span> Προορισμός</button>"+
              "<button id=\"cafe\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnCafe()\" type=\"button\" class=\"btn btn-warning\" style=\"margin-left:10px;\"><span class=\"glyphicon glyphicon-tint\" aria-hidden=\"true\"></span> Φτιάξε μου καφέ!</button>";
          p_marker = new customMarker([stop_lat, stop_lon], {icon: icon_station, stopid: stop_id})
             .on('click', onClickStation)
             .bindPopup(msg);
             //.bindPopup(stop_name+' ('+stop_desc+')');
          markers.addLayer(p_marker);
        }
      }
    });

    map.addLayer(markers);
    map.addLayer(circles);
    map.setView([e_lat, e_lng], zoom);
});

function OnDst() {
    var e_lat = document.getElementById("dst").getAttribute("lat");
    var e_lng = document.getElementById("dst").getAttribute("lng");
    var radius = document.getElementById("fader").value;
    var zoom = 16;
    markers.clearLayers();
    circles.clearLayers();
    p_marker = L.marker([e_lat,e_lng])
        .bindPopup(radius + " meters from this point").openPopup();
    p_circle = L.circle([e_lat,e_lng], radius);
    markers.addLayer(p_marker);
    circles.addLayer(p_circle);
    var qry = "rad="+radius/1000+"&lat="+e_lat+"&lon="+e_lng;
    var LeafIcon = L.Icon.extend({
       options: {
        //shadowUrl: 'assets/img/station.png',
        iconSize:     [25, 30],
        //shadowSize:   [50, 64],
        iconAnchor:   [10, 30]//,
        //shadowAnchor: [4, 62],
        //popupAnchor:  [-3, -76]
       }
    });

    var icon_station = new LeafIcon({iconUrl: 'assets/img/station.png'});

    $.ajax({
      //url: 'php/get_close_stations.php',  //the script to call to get data
      url: 'http://193.108.160.55/phpinfo/contractuals-test/www/php/get_close_stations.php',  //the script to call to get data
      data: qry,                          //you can insert url argumnets here to pass to php
      dataType: 'json',                   //data format
      success: function(alldata)          //on recieve of reply
      {
        for (var i in alldata)
        {
          var data = alldata[i];
          var stop_id = data[0];
          var stop_code = data[1];
          var stop_name = data[2];
          var stop_desc = data[3];
          var stop_lat = data[4];
          var stop_lon = data[5];
          var location_type = data[6];
          //p_marker = L.marker([stop_lat, stop_lon], {icon: icon_station})
          var msg = "<h3 align=\"center\">"+stop_name+"</h3>"+
              "<h5 align=\"center\">(&nbsp;"+stop_desc+"&nbsp;)</h5>"+
              "<button id=\"dst\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnDst()\" type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pushpin\" aria-hidden=\"true\"></span> Προορισμός</button>"+
              "<button id=\"cafe\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnCafe()\" type=\"button\" class=\"btn btn-warning\" style=\"margin-left:10px;\"><span class=\"glyphicon glyphicon-tint\" aria-hidden=\"true\"></span> Φτιάξε μου καφέ!</button>";
          p_marker = new customMarker([stop_lat, stop_lon], {icon: icon_station, stopid: stop_id})
             .on('click', onClickStation)
             .bindPopup(msg);
          markers.addLayer(p_marker);
        }
      }
    });

    map.addLayer(markers);
    map.addLayer(circles);
    map.setView([e_lat, e_lng], zoom);
}

function OnCafe() {
    var e_lat = document.getElementById("dst").getAttribute("lat");
    var e_lng = document.getElementById("dst").getAttribute("lng");
    var radius = document.getElementById("fader").value;
    var zoom = 16;
    markers.clearLayers();
    circles.clearLayers();
    p_marker = L.marker([e_lat,e_lng])
        .bindPopup(radius + " meters from this point").openPopup();
    p_circle = L.circle([e_lat,e_lng], radius);
    markers.addLayer(p_marker);
    circles.addLayer(p_circle);
    var qry = "rad="+radius/1000+"&lat="+e_lat+"&lon="+e_lng;
    var LeafIcon = L.Icon.extend({
       options: {
        //shadowUrl: 'assets/img/station.png',
        iconSize:     [25, 30],
        //shadowSize:   [50, 64],
        iconAnchor:   [10, 30]//,
        //shadowAnchor: [4, 62],
        //popupAnchor:  [-3, -76]
       }
    });

    var icon_station = new LeafIcon({iconUrl: 'assets/img/station.png'});

    $.ajax({
      //url: 'php/get_close_stations.php',  //the script to call to get data
      url: 'http://193.108.160.55/phpinfo/contractuals-test/www/php/get_close_stations.php',  //the script to call to get data
      data: qry,                          //you can insert url argumnets here to pass to php
      dataType: 'json',                   //data format
      success: function(alldata)          //on recieve of reply
      {
        for (var i in alldata)
        {
          var data = alldata[i];
          var stop_id = data[0];
          var stop_code = data[1];
          var stop_name = data[2];
          var stop_desc = data[3];
          var stop_lat = data[4];
          var stop_lon = data[5];
          var location_type = data[6];
          //p_marker = L.marker([stop_lat, stop_lon], {icon: icon_station})
          var msg = "<h3 align=\"center\">"+stop_name+"</h3>"+
              "<h5 align=\"center\">(&nbsp;"+stop_desc+"&nbsp;)</h5>"+
              "<button id=\"dst\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnDst()\" type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pushpin\" aria-hidden=\"true\"></span> Προορισμός</button>"+
              "<button id=\"cafe\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnCafe()\" type=\"button\" class=\"btn btn-warning\" style=\"margin-left:10px;\"><span class=\"glyphicon glyphicon-tint\" aria-hidden=\"true\"></span> Φτιάξε μου καφέ!</button>";
          p_marker = new customMarker([stop_lat, stop_lon], {icon: icon_station, stopid: stop_id})
             .on('click', onClickStation)
             .bindPopup(msg);
          markers.addLayer(p_marker);
        }
      }
    });

    var LeafIcon2 = L.Icon.extend({
       options: {
        //shadowUrl: 'assets/img/station.png',
        iconSize:     [25, 30],
        //shadowSize:   [50, 64],
        iconAnchor:   [10, 30]//,
        //shadowAnchor: [4, 62],
        //popupAnchor:  [-3, -76]
       }
    });

    var icon_offer = new LeafIcon2({iconUrl: 'assets/img/offer.png'});
    $.ajax({
      //url: 'php/get_close_offers.php',  //the script to call to get data
      url: 'http://193.108.160.55/phpinfo/contractuals-test/www/php/get_close_offers.php',  //the script to call to get data
      data: qry,                          //you can insert url argumnets here to pass to php
      dataType: 'json',                   //data format
      success: function(alldata)          //on recieve of reply
      {
        for (var i in alldata)
        {
          var data = alldata[i];
          var id = data[0];
          var name = data[1];
          var lon = data[2];
          var lat = data[3];
          var cafes = data[4];
          var addr = data[5];
          var price = data[6];
          var rating = data[7];
	  var msg = "<h4>"+name+"</h4>"+
                    " ( "+addr+" ) "+
                    "<p>"+cafes+" "+price+" ( rating : "+rating+" )</p>"+
                    "<button id=\"makecafe\" cafe_id=\""+id+"\" onclick=\"paraggelia()\" type=\"button\" class=\"btn btn-warning\" style=\"margin-left:10px;\"><span class=\"glyphicon glyphicon-tint\" aria-hidden=\"true\"></span> Παραγγελία!</button>";
          p_marker = new customMarker([lat, lon], {icon: icon_offer, stopid: id})
             //.on('click', onClickOffer)
             //.bindPopup(name + ' ( ' + addr + ' )' + ' : ' + txt);
             .bindPopup(msg);
          markers.addLayer(p_marker);
        }
      }
    });

    map.addLayer(markers);
    map.addLayer(circles);
    map.setView([e_lat, e_lng], zoom);
}

$(document).on("click", ".send-pois", function(e) {

	var address = prompt("Ορίστε την διεύθυνση αφετηρίας σας", "Σύνταγμα");
	var days=$('#days').val();

		geo.geocode({'address':address},function(results, status){
			if (status == google.maps.GeocoderStatus.OK) {
      // do something with the geocoded result
      //

	   var lng = results[0].geometry.location.lng();
       var lat = results[0].geometry.location.lat();

	   	//pois=pois+"'days': '"+days+"','home':'"+lat+"','"+lng+"'";

	pois.days=Number(days);
	pois.home=lat+','+lng;

	sendpoisajax(pois);

    } else {
        alert("Geocode was not successful for the following reason: " + status);
    }
});

});

/////////////////share pois////
$(document).on("click", ".share-pois", function(e) {

shareajax(sharepois);


});

$(document).on("mouseover", ".feature-row", function(e) {
  highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
});

$(document).on("mouseout", ".feature-row", clearHighlight);



$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#incidents-report-btn").click(function() {
  $("#incident-reportModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


$("#full-extent-btn").click(function() {
  //map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


////////// ACTIVE PANEL buttons ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
$("#multi-nav-toggle-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#poi-toggle-btn").click(function() {
  $("#cafe-sidebar").hide();
  $("#sidebar").toggle();
  $("#nav-sidebar").hide();
  $('#user-sidebar').hide();
  map.invalidateSize();
  return false;
});
$("#poi-toggle-btn-md").click(function() {
  $("#cafe-sidebar").hide();
  $("#sidebar").toggle();
  $("#nav-sidebar").hide();
  $('#user-sidebar').hide();
  map.invalidateSize();
  return false;
});
$("#nav-toggle-btn").click(function() {
  $("#cafe-sidebar").hide();
  $("#sidebar").hide();
  $("#nav-sidebar").toggle();
  $('#user-sidebar').hide();
  map.invalidateSize();
  return false;
});
$("#nav-toggle-btn-md").click(function() {
  $("#cafe-sidebar").hide();
  $("#sidebar").hide();
  $("#nav-sidebar").toggle();
  $('#user-sidebar').hide();
  map.invalidateSize();
  return false;
});
$("#plan-toggle-btn").click(function() {
  $("#cafe-sidebar").hide();
  $("#sidebar").hide();
  $("#nav-sidebar").hide();
  $('#user-sidebar').toggle();
  $('#user-sidebar').toggle();
  map.invalidateSize();
  return false;
});
$("#plan-toggle-btn-md").click(function() {
  $("#cafe-sidebar").hide();
  $("#sidebar").hide();
  $("#nav-sidebar").hide();
  $('#user-sidebar').toggle();
  map.invalidateSize();
  return false;
});
////////// PANEL close buttons /////////////////////////////////////////

$("#nav-sidebar-hide-btn").click(function() {
  $('#nav-sidebar').hide();
  map.invalidateSize();
});
$("#plan-sidebar-hide-btn").click(function() {
  $('#user-sidebar').hide();
  map.invalidateSize();
});
$("#poi-sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});
////////////////////////////////////////////////////////////////////////

customMarker = L.Marker.extend({
   options: {
      stopid: 'NULL'
   }
});



function onClickStation() {
    route_lines.clearLayers();
    route_circles.clearLayers();
    var qry = "stop_id="+this.options.stopid;
    $.ajax({
        //url: 'php/get_routes.php',  //the script to call to get data
        url: 'http://193.108.160.55/phpinfo/contractuals-test/www/php/get_routes.php',  //the script to call to get data
        data: qry,                          //you can insert url argumnets here to pass to php
        dataType: 'json',                   //data format
        success: function(routes)          //on recieve of reply
        {
          var pointList = [], pointList_name = [], pointList_line = [];
	  var data, route_id, pre_route_id = 0, route_short_name, route_color, route_text_color;
	  var stop_id, stop_name, stop_lat, stop_lon, point, color, r, g, b, popup;
          for (var i in routes)
          {
             data = routes[i];
             route_id = data[0];
             route_short_name = data[1];
             route_color = data[2];
             route_text_color = data[3];
             stop_id = data[4];
             stop_name = data[5];
             stop_lat = data[6];
             stop_lon = data[7];
	     point = new L.LatLng(stop_lat, stop_lon);
	     if( i > 0 && pre_route_id != route_id ){
	         r = Math.floor(Math.random() * 255);
                 g = Math.floor(Math.random() * 255);
	         b = Math.floor(Math.random() * 255);
	         color= "rgb("+r+" ,"+g+","+ b+")";
                 var firstpolyline = new L.Polyline(pointList, {
                    color: color,
                    weight: 3,
                    opacity: 0.8,
                    smoothFactor: 1
                    });
                 route_lines.addLayer(firstpolyline);
                 map.addLayer(route_lines);
		 for (var i = 0, l = pointList.length; i < l; i++)
		 {
		     var MarkerOptions = {
                         radius: 8,
                         //fillColor: "#ff7800",
                         fillColor: color,
                         color: "#000",
                         weight: 1,
                         opacity: 1,
                         fillOpacity: 0.8
                     };
                     var msg = "<h3 align=\"center\">"+pointList_name[i]+"</h3>"+
                     "<h5 align=\"center\">(&nbsp;"+pointList_line[i]+"&nbsp;)</h5>"+
                     "<button id=\"dst\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnDst()\" type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pushpin\" aria-hidden=\"true\"></span> Προορισμός</button>"+
                     "<button id=\"cafe\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnCafe()\" type=\"button\" class=\"btn btn-warning\" style=\"margin-left:10px;\"><span class=\"glyphicon glyphicon-tint\" aria-hidden=\"true\"></span> Φτιάξε μου καφέ!</button>";
                     popup = L.popup().setContent(msg);
                     //popup = L.popup().setContent(pointList_name[i]+' (ΓΡΑΜΜΗ: '+pointList_line[i]+')');
		     r_circle = L.circleMarker(pointList[i], MarkerOptions);
                     r_circle.bindPopup(popup);
		     route_circles.addLayer(r_circle);
		 }
		 map.addLayer(route_circles);
                 pointList = [];
                 pointList_name = [];
                 pointList_line = [];
	     }
	     pointList.push(point);
	     pointList_name.push(stop_name);
	     pointList_line.push(route_short_name);
	     pre_route_id = route_id;
          }
	  r = Math.floor(Math.random() * 255);
          g = Math.floor(Math.random() * 255);
	  b = Math.floor(Math.random() * 255);
	  color= "rgb("+r+" ,"+g+","+ b+")";
          var firstpolyline = new L.Polyline(pointList, {
             color: color,
             weight: 3,
             opacity: 0.8,
             smoothFactor: 1
             });
          route_lines.addLayer(firstpolyline);
          map.addLayer(route_lines);
          for (var i = 0, l = pointList.length; i < l; i++) {
	     var MarkerOptions = {
                  radius: 8,
                  //fillColor: "#ff7800",
                  fillColor: color,
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
             };
             var msg = "<h3 align=\"center\">"+pointList_name[i]+"</h3>"+
             "<h5 align=\"center\">(&nbsp;"+pointList_line[i]+"&nbsp;)</h5>"+
             "<button id=\"dst\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnDst()\" type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pushpin\" aria-hidden=\"true\"></span> Προορισμός</button>"+
             "<button id=\"cafe\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnCafe()\" type=\"button\" class=\"btn btn-warning\" style=\"margin-left:10px;\"><span class=\"glyphicon glyphicon-tint\" aria-hidden=\"true\"></span> Φτιάξε μου καφέ!</button>";
             popup = L.popup().setContent(msg);
             //popup = L.popup().setContent(pointList_name[i]+' (ΓΡΑΜΜΗ: '+pointList_line[i]+')');
	     r_circle = L.circleMarker(pointList[i], MarkerOptions);
             r_circle.bindPopup(popup);
	     route_circles.addLayer(r_circle);
	  }
	  map.addLayer(route_circles);
       }
    });
}

function paraggelia(){
    var cafe_id = document.getElementById("cafe_paraggelia").getAttribute("cafe_id");
//dmdm  add code here
alert(cafe_id);
}

function onLocationFound(latlng,lat,lng) {
///////////demo/////////////
    //lat = 37.978260;
    //lng = 23.712496;
    //latlng = [lat,lng];
////////////////////////////
    var radius = document.getElementById("fader").value;
    var zoom = 15;
    markers.clearLayers();
    circles.clearLayers();

    var msg2 = "<h5 align=\"center\">You are within "+radius+" meters from this point</h5>"+
              "<div class=\"span7 text-center\">"+
              "<button align=\"center\" id=\"cafe_paraggelia\" lat=\""+lat+"\" lng=\""+lng+"\" onclick=\"OnCafe()\" type=\"button\" class=\"btn btn-warning\" style=\"margin-left:10px;\"><span class=\"glyphicon glyphicon-tint\" aria-hidden=\"true\"></span> Φτιάξε μου καφέ!</button></div>";
    p_marker = L.marker(latlng)
        .bindPopup(msg2).openPopup();
        //.bindPopup("You are within " + radius + " meters from this point").openPopup();
    p_circle = L.circle(latlng, radius);
    markers.addLayer(p_marker);
    circles.addLayer(p_circle);
    var qry = "rad="+radius/1000+"&lat="+lat.toString()+"&lon="+lng.toString();

    var LeafIcon = L.Icon.extend({
       options: {
        //shadowUrl: 'assets/img/station.png',
        iconSize:     [25, 30],
        //shadowSize:   [50, 64],
        iconAnchor:   [10, 30]//,
        //shadowAnchor: [4, 62],
        //popupAnchor:  [-3, -76]
       }
    });
    var icon_station = new LeafIcon({iconUrl: 'assets/img/station.png'});
    $.ajax({
      //url: 'php/get_close_stations.php',  //the script to call to get data
      url: 'http://193.108.160.55/phpinfo/contractuals-test/www/php/get_close_stations.php',  //the script to call to get data
      data: qry,                          //you can insert url argumnets here to pass to php
      dataType: 'json',                   //data format
      success: function(alldata)          //on recieve of reply
      {
        for (var i in alldata)
        {
          var data = alldata[i];
          var stop_id = data[0];
          var stop_code = data[1];
          var stop_name = data[2];
          var stop_desc = data[3];
          var stop_lat = data[4];
          var stop_lon = data[5];
          var location_type = data[6];
          var msg = "<h3 align=\"center\">"+stop_name+"</h3>"+
              "<h5 align=\"center\">(&nbsp;"+stop_desc+"&nbsp;)</h5>"+
              "<button id=\"dst\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnDst()\" type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pushpin\" aria-hidden=\"true\"></span> Προορισμός</button>"+
              "<button id=\"cafe\" lat=\""+stop_lat+"\" lng=\""+stop_lon+"\" onclick=\"OnCafe()\" type=\"button\" class=\"btn btn-warning\" style=\"margin-left:10px;\"><span class=\"glyphicon glyphicon-tint\" aria-hidden=\"true\"></span> Φτιάξε μου καφέ!</button>";
          p_marker = new customMarker([stop_lat, stop_lon], {icon: icon_station, stopid: stop_id})
             .on('click', onClickStation)
             .bindPopup(msg);
          markers.addLayer(p_marker);
        }
      }
    });


    var LeafIcon2 = L.Icon.extend({
       options: {
        //shadowUrl: 'assets/img/station.png',
        iconSize:     [25, 30],
        //shadowSize:   [50, 64],
        iconAnchor:   [10, 30]//,
        //shadowAnchor: [4, 62],
        //popupAnchor:  [-3, -76]
       }
    });

    var icon_offer = new LeafIcon2({iconUrl: 'assets/img/offer.png'});
    $.ajax({
      //url: 'php/get_close_offers.php',  //the script to call to get data
      url: 'http://193.108.160.55/phpinfo/contractuals-test/www/php/get_close_offers.php',  //the script to call to get data
      data: qry,                          //you can insert url argumnets here to pass to php
      dataType: 'json',                   //data format
      success: function(alldata)          //on recieve of reply
      {
        for (var i in alldata)
        {
          var data = alldata[i];
          var id = data[0];
          var name = data[1];
          var lon = data[2];
          var lat = data[3];
          var cafes = data[4];
          var addr = data[5];
          var price = data[6];
          var rating = data[7];
	  var msg = "<h4>"+name+"</h4>"+
                    " ( "+addr+" ) "+
                    "<p>"+cafes+" "+price+" ( rating : "+rating+" )</p>"+
                    "<button id=\"makecafe\" cafe_id=\""+id+"\" onclick=\"paraggelia()\" type=\"button\" class=\"btn btn-warning\" style=\"margin-left:10px;\"><span class=\"glyphicon glyphicon-tint\" aria-hidden=\"true\"></span> Παραγγελία!</button>";
          p_marker = new customMarker([lat, lon], {icon: icon_offer, stopid: id})
             //.on('click', onClickOffer)
             //.bindPopup(name + ' ( ' + addr + ' )' + ' : ' + txt);
             .bindPopup(msg);
          markers.addLayer(p_marker);
        }
      }
    });

    map.addLayer(markers);
    map.addLayer(circles);
    map.setView([lat, lng], zoom);
    var track = document.getElementById("track").checked;
    if(track==false){
       lc.stop();
       return;
    }
    else{
       lc.start();
    }
}

function addMarker(e){  //pvpv
    markers_dest.clearLayers();
    var msg = "<h3 align=\"center\">Νέο σημείο</h3>"+
              "<h5 align=\"center\">(&nbsp;"+e.latlng.lat.toFixed(6)+"&nbsp;,&nbsp;"+e.latlng.lng.toFixed(6)+"&nbsp;)</h5>"+
              "<button id=\"dst\" lat=\""+e.latlng.lat.toFixed(6)+"\" lng=\""+e.latlng.lng.toFixed(6)+"\" onclick=\"OnDst()\" type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pushpin\" aria-hidden=\"true\"></span> Προορισμός</button>"+
              "<button id=\"cafe\" lat=\""+e.latlng.lat.toFixed(6)+"\" lng=\""+e.latlng.lng.toFixed(6)+"\" onclick=\"OnCafe()\" type=\"button\" class=\"btn btn-warning\" style=\"margin-left:10px;\"><span class=\"glyphicon glyphicon-tint\" aria-hidden=\"true\"></span> Φτιάξε μου καφέ!</button>";
    var newMarker = new L.marker(e.latlng).bindPopup(msg);
    markers_dest.addLayer(newMarker);
    map.addLayer(markers_dest);
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

////////////dimos user list//////
function POIClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");

	i+=1;
	//pois+= "'destination"+i+"':'"+layer.getLatLng().lat+"','"+layer.getLatLng().lng+"',";
	destination="destination"+i;

	pois[destination]=layer.getLatLng().lat+','+layer.getLatLng().lng;

	name=layer.feature.properties.NAME;

	sharepois.push(name);
	//sharepois=sharepois+layer.feature.properties.NAME+' , ';

	////////////////DIMOS AYTO ALLAZO GIA REMOVE///////////////
        $("#user-feature-list tbody").append('<tr class="feature-row" ><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '" class="fa fa-chevron-right pull-right"></i></td></tr>');
      theaterSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "Theaters",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });


}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
  /* Loop through places layer and add only features which are in the map bounds */
  places.eachLayer(function (layer) {
    if (map.hasLayer(placesLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/place.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  wifi.eachLayer(function (layer) {
    if (map.hasLayer(wifiLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/wifi.png"></td><td class="feature-name">' + layer.feature.properties.Name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  beach.eachLayer(function (layer) {
    if (map.hasLayer(beachLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/beach.png"></td><td class="feature-name">' + layer.feature.properties.Name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  church.eachLayer(function (layer) {
    if (map.hasLayer(churchLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/church.png"></td><td class="feature-name">' + layer.feature.properties.Name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  ArtsEntertainment.eachLayer(function (layer) {
    if (map.hasLayer(ArtsEntertainmentLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.Name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Loop through museums layer and add only features which are in the map bounds */
  museums.eachLayer(function (layer) {
    if (map.hasLayer(museumLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

/* Basemap Layers */
var googleLayer = new L.Google('ROADMAP');

var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

/******************************
var HERE_normalDayTransit = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day.transit/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
	attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
	subdomains: '1234',
	mapID: 'newest',
	app_id: 'FaabXB0N2oPJizsgcPE4',
	app_code: 'AOBNn6MM9plWYdaEG0-TJQ',
	base: 'base',
	maxZoom: 20
});
****************************/

var HERE_pedestrianNight = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/pedestrian.night/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
	attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
	subdomains: '1234',
	mapID: 'newest',
	app_id: 'FaabXB0N2oPJizsgcPE4',
	app_code: 'AOBNn6MM9plWYdaEG0-TJQ',
	base: 'base',
	maxZoom: 20
});

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

/*************************
var boroughs = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.BoroName,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  }
});
*************************/
//$.getJSON("data/boroughs.geojson", function (data) {
  //boroughs.addData(data);
//});

var subwayLines = L.geoJson(null, {
  style: function (feature) {
    if (feature.properties.route_id === "1" || feature.properties.route_id === "2" || feature.properties.route_id === "3") {
      return {
        color: "#ff3135",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "4" || feature.properties.route_id === "5" || feature.properties.route_id === "6") {
      return {
        color: "#009b2e",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "7") {
      return {
        color: "#ce06cb",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "A" || feature.properties.route_id === "C" || feature.properties.route_id === "E" || feature.properties.route_id === "SI" || feature.properties.route_id === "H") {
      return {
        color: "#fd9a00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "Air") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "B" || feature.properties.route_id === "D" || feature.properties.route_id === "F" || feature.properties.route_id === "M") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "G") {
      return {
        color: "#9ace00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "FS" || feature.properties.route_id === "GS") {
      return {
        color: "#6e6e6e",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "J" || feature.properties.route_id === "Z") {
      return {
        color: "#976900",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "L") {
      return {
        color: "#969696",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "N" || feature.properties.route_id === "Q" || feature.properties.route_id === "R") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Division</th><td>" + feature.properties.Division + "</td></tr>" + "<tr><th>Line</th><td>" + feature.properties.Line + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Line);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        subwayLines.resetStyle(e.target);
      }
    });
  }
});
//$.getJSON("data/subways.geojson", function (data) {
  //subwayLines.addData(data);
//});

/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/* Empty layer placeholder to add to layer control for listening when to add/remove places to markerClusters layer */
var placesLayer = L.geoJson(null);
var places = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/place.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table  class='table table-striped table-bordered table-condensed' >" + "<tr><th>Όνομα</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Τηλέφωνο</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Διεύθυνση</th><td>" + feature.properties.ADDRESS1 + "</td></tr>" + "<tr><th>Ιστοσελίδα</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr> </td></tr><table>"+
	  "<hr><a type='button' id='"+L.stamp(layer)+"' class='btn btn-success choose-poi' aria-expanded='false' onclick='addPOI()' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng +"'>Επιλογή</a><a data-dismiss='modal' type='button' style='margin-left:20px;'  class='btn btn-primary kontinoi-stathmoi' aria-expanded='false' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng + "'>Κοντινές στάσεις</a><a type='button' id='"+L.stamp(layer)+"' class='btn btn-success choose-destination' aria-expanded='false' onclick='addPOI()' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng +"'>Πήγαινε με εδώ</a>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/place.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      placeSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "Places",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/places.geojson", function (data) {
  places.addData(data);
  map.addLayer(placesLayer);
});
////////////////////////////////////

var wifiLayer = L.geoJson(null);
var wifi = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/wifi.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table  class='table table-striped table-bordered table-condensed' >" + "<tr><th>Όνομα</th><td>" + feature.properties.Name + "</td></tr>" + "<tr><th>Τηλέφωνο</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Διεύθυνση</th><td>" + feature.properties.ADDRESS1 + "</td></tr>" + "<tr><th>Ιστοσελίδα</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr> </td></tr><table>"+
	  "<hr><a type='button' id='"+L.stamp(layer)+"' class='btn btn-success choose-poi' aria-expanded='false' onclick='addPOI()' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng +"'>Επιλογή</a><button data-dismiss='modal' type='button' style='margin-left:20px;'  class='btn btn-primary kontinoi-stathmoi' aria-expanded='false' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng + "'>Κοντινές στάσεις</a>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/wifi.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      placeSearch.push({
        name: layer.feature.properties.Name,
        address: layer.feature.properties.ADDRESS1,
        source: "Wifi",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/wifi.geojson", function (data) {
  wifi.addData(data);
  map.addLayer(wifiLayer);
});
////////////////////////////////////

var beachLayer = L.geoJson(null);
var beach = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/beach.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table  class='table table-striped table-bordered table-condensed' >" + "<tr><th>Όνομα</th><td>" + feature.properties.Name + "</td></tr>" + "<tr><th>Τηλέφωνο</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Διεύθυνση</th><td>" + feature.properties.ADDRESS1 + "</td></tr>" + "<tr><th>Ιστοσελίδα</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr> </td></tr><table>"+
	  "<hr><a type='button' id='"+L.stamp(layer)+"' class='btn btn-success choose-poi' aria-expanded='false' onclick='addPOI()' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng +"'>Επιλογή</a><button data-dismiss='modal' type='button' style='margin-left:20px;'  class='btn btn-primary kontinoi-stathmoi' aria-expanded='false' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng + "'>Κοντινές στάσεις</a>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/beach.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      placeSearch.push({
        name: layer.feature.properties.Name,
        address: layer.feature.properties.ADDRESS1,
        source: "Beaches",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/beach.geojson", function (data) {
  beach.addData(data);
  map.addLayer(beachLayer);
});
////////////////////////////////////

var churchLayer = L.geoJson(null);
var church = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/church.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table  class='table table-striped table-bordered table-condensed' >" + "<tr><th>Όνομα</th><td>" + feature.properties.Name + "</td></tr>" + "<tr><th>Τηλέφωνο</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Διεύθυνση</th><td>" + feature.properties.ADDRESS1 + "</td></tr>" + "<tr><th>Ιστοσελίδα</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr> </td></tr><table>"+
	  "<hr><a type='button' id='"+L.stamp(layer)+"' class='btn btn-success choose-poi' aria-expanded='false' onclick='addPOI()' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng +"'>Επιλογή</a><button data-dismiss='modal' type='button' style='margin-left:20px;'  class='btn btn-primary kontinoi-stathmoi' aria-expanded='false' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng + "'>Κοντινές στάσεις</a>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/church.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      placeSearch.push({
        name: layer.feature.properties.Name,
        address: layer.feature.properties.ADDRESS1,
        source: "Churches",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/church.geojson", function (data) {
  church.addData(data);
  map.addLayer(churchLayer);
});
////////////////////////////////////
/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var ArtsEntertainmentLayer = L.geoJson(null);
var ArtsEntertainment = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/theater.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table  class='table table-striped table-bordered table-condensed' >" + "<tr><th>Όνομα</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Τηλέφωνο</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Διεύθυνση</th><td>" + feature.properties.ADDRESS1 + "</td></tr>" + "<tr><th>Ιστοσελίδα</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr> </td></tr><table>"+
	  "<hr><a type='button' id='"+L.stamp(layer)+"' class='btn btn-success choose-poi' aria-expanded='false' onclick='addPOI()' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng +"'>Επιλογή</a><button data-dismiss='modal' type='button' style='margin-left:20px;'  class='btn btn-primary kontinoi-stathmoi' aria-expanded='false' lat='" + layer.getLatLng().lat + "' lng='" + layer.getLatLng().lng + "'>Κοντινές στάσεις</a>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      ArtsEntertainmentSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "ArtsEntertainment",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/foursquare_arts.geojson", function (data) {
  ArtsEntertainment.addData(data);
    map.addLayer(ArtsEntertainmentLayer);
});

//////////////////////////

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var CollegesUniversitiesLayer = L.geoJson(null);
var CollegesUniversities = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      CollegesUniversitiesSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "CollegesUniversities",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/


/////////////////////////////

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var EventsLayer = L.geoJson(null);
var Events = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      EventsSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "Events",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/


/////////////////////////////////

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var FoodLayer = L.geoJson(null);
var Food = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      FoodSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "Food",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/
////////////////////////


/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var NightlifeSpotsLayer = L.geoJson(null);
var NightlifeSpots = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      NightlifeSpotsSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "NightlifeSpots",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/


/////////////

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var OutdoorsRecreationLayer = L.geoJson(null);
var OutdoorsRecreation = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      OutdoorsRecreationSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "OutdoorsRecreation",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/


/////////////

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var ProfessionalOtherPlacesLayer = L.geoJson(null);
var ProfessionalOtherPlaces = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      ProfessionalOtherPlacesSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "ProfessionalOtherPlaces",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/

//////////////////////////////////////

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var ProfessionalOtherPlacesLayer = L.geoJson(null);
var ProfessionalOtherPlaces = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      ProfessionalOtherPlacesSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "ProfessionalOtherPlaces",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/


/////////////////

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var ResidencesLayer = L.geoJson(null);
var Residences = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      ResidencesSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "Residences",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/


/////////////////////
/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var ShopsServicesLayer = L.geoJson(null);
var ShopsServices = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      ShopsServicesSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "ShopsServices",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/

////////////////////////

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var TravelTransportLayer = L.geoJson(null);
var TravelTransport = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      TravelTransportSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "TravelTransport",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/


//////////////////////////

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var museumLayer = L.geoJson(null);
var museums = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      museumSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "Museums",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
/*$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});*/

map = L.map("map", {
  zoom: 10,
  center: [37.984630, 23.728333],
  //layers: [googleLayer, HERE_normalDayTransit, HERE_pedestrianNight, osm, markerClusters, highlight ],
  layers: [googleLayer, HERE_pedestrianNight, osm, markerClusters, highlight ],
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === placesLayer) {
    markerClusters.addLayer(places);
    syncSidebar();
  }

  if (e.layer === wifiLayer) {
    markerClusters.addLayer(wifi);
    syncSidebar();
  }

  if (e.layer === beachLayer) {
    markerClusters.addLayer(beach);
    syncSidebar();
  }

  if (e.layer === churchLayer) {
    markerClusters.addLayer(church);
    syncSidebar();
  }

  if (e.layer === ArtsEntertainmentLayer) {
    markerClusters.addLayer(ArtsEntertainment);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === placesLayer) {
    markerClusters.removeLayer(places);
    syncSidebar();
  }
  if (e.layer === wifiLayer) {
    markerClusters.removeLayer(wifi);
    syncSidebar();
  }
  if (e.layer === beachLayer) {
    markerClusters.removeLayer(beach);
    syncSidebar();
  }
  if (e.layer === churchLayer) {
    markerClusters.removeLayer(church);
    syncSidebar();
  }
  if (e.layer === ArtsEntertainmentLayer) {
    markerClusters.removeLayer(ArtsEntertainment);
    syncSidebar();
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://bryanmcbride.com'>bryanmcbride.com</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
/*************************
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: false,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: true,
  strings: {
    title: "My location",
    metersUnit: "meters", // string for metric units
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
});
*****************************/

L.Control.MyLocate = L.Control.Locate.extend({
   options: {
    position: "bottomright",
    icon: "fa fa-location-arrow"
   },
   drawMarker: function() {
    map.on('click',findAdressfromCoordinates());
   }
});

lc = new L.Control.MyLocate().addTo(map);
lc.start();  //pvpv

map.on('click', addMarker);

/****************************
map.on('startfollowing', function() {
    map.on('dragstart', lc._stopFollowing, lc);
}).on('stopfollowing', function() {
    map.off('dragstart', lc._stopFollowing, lc);
});
*****************************/

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Google Maps": googleLayer,
  //"HERE Maps": HERE_normalDayTransit,
  "HERE Maps Dark": HERE_pedestrianNight,
  "OSM Maps": osm
  //"Aerial Imagery": mapquestOAM,
  //"Imagery with Streets": mapquestHYB
};

var groupedOverlays = {
  "Points of Interest": {
    "<img src='assets/img/place.png' width='20' >&nbsp;Places": placesLayer,
    "<img src='assets/img/wifi.png' width='20' >&nbsp;Wifi": wifiLayer,
    "<img src='assets/img/beach.png' width='20' >&nbsp;Beaches": beachLayer,
    "<img src='assets/img/church.png' width='20' >&nbsp;Churches": churchLayer
  },
  "Foursquare": {
	"<img src='assets/img/theater.png' width='20' >&nbsp;Arts-Entertainment":ArtsEntertainmentLayer,
	"Colleges & Universities":CollegesUniversitiesLayer,
	"Events":EventsLayer,
	"Food":FoodLayer,
	"Nightlife Spots":NightlifeSpotsLayer,
	"Outdoors & Recreation":OutdoorsRecreationLayer,
	"Professional & Other Places":ProfessionalOtherPlacesLayer,
	"Residences":ResidencesLayer,
	"Shops & Services":ShopsServicesLayer,
	"Travel & Transport":TravelTransportLayer
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to boroughs bounds */
  //map.fitBounds(boroughs.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  var boroughsBH = new Bloodhound({
    name: "Boroughs",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: boroughSearch,
    limit: 10
  });

  var placesBH = new Bloodhound({
    name: "Places",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });

////////////////////////Arts-Entertainment
  var ArtsEntertainmentBH = new Bloodhound({
    name: "Arts-Entertainment",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });


  ////////////////////////Colleges & Universities
    var CollegesUniversitiesBH = new Bloodhound({
    name: "Colleges & Universities",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });

  ////////////////////////Events
    var EventsBH = new Bloodhound({
    name: "Events",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });

  ////////////////////////Food
    var FoodBH = new Bloodhound({
    name: "Food",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });

  ////////////////////////Nightlife Spots
    var NightlifeSpotsBH = new Bloodhound({
    name: "Nightlife Spots",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });

  ////////////////////////Outdoors & Recreation
    var OutdoorsRecreationBH = new Bloodhound({
    name: "Outdoors & Recreation",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });

  ////////////////////////Professional & Other Places
    var ProfessionalOtherPlacesBH = new Bloodhound({
    name: "Professional & Other Places",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });
  ////////////////////////Residences
    var ResidencesBH = new Bloodhound({
    name: "Residences",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });

  ////////////////////////ShopsServices
    var ShopsServicesBH = new Bloodhound({
    name: "Shops & Services",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });
  ////////////////////////Travel & Transport
    var TravelTransportBH = new Bloodhound({
    name: "Travel & Transport",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: placeSearch,
    limit: 10
  });

/////////////////////////////////
  var museumsBH = new Bloodhound({
    name: "Museums",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: museumSearch,
    limit: 10
  });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  boroughsBH.initialize();
  placesBH.initialize();
  museumsBH.initialize();
  geonamesBH.initialize();

  ///////////////////////////
  ArtsEntertainmentBH.initialize();
  CollegesUniversitiesBH .initialize();
  EventsBH.initialize();
  FoodBH.initialize();
  NightlifeSpotsBH.initialize();
  OutdoorsRecreationBH.initialize();
  ProfessionalOtherPlacesBH.initialize();
  ResidencesBH.initialize();
  ShopsServicesBH.initialize();
  TravelTransportBH.initialize();
  //////////////////////////////////////////////



  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Boroughs",
    displayKey: "name",
    source: boroughsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Boroughs</h4>"
    }
  }, {
    name: "Places",
    displayKey: "name",
    source: placesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/place.png' width='24' height='28'>&nbsp;Places</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },
////////////////////////////Arts-Entertainment
{
    name: "Arts-Entertainment",
    displayKey: "name",
    source: ArtsEntertainmentBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/place.png' width='24' height='28'>&nbsp;Arts-Entertainment</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },

  {
    name: "Museums",
    displayKey: "name",
    source: museumsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/museum.png' width='24' height='28'>&nbsp;Museums</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Boroughs") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "Places") {
      if (!map.hasLayer(placesLayer)) {
        map.addLayer(placesLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
//////	ArtsEntertainment

    if (datum.source === "Arts-Entertainment") {
      if (!map.hasLayer(ArtsEntertainmentLayer)) {
        map.addLayer(ArtsEntertainmentLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
/////////////	CollegesUniversities
    if (datum.source === "CollegesUniversities") {
      if (!map.hasLayer(CollegesUniversities)) {
        map.addLayer(CollegesUniversities);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
///////////////////////	Events
    if (datum.source === "Events") {
      if (!map.hasLayer(Events)) {
        map.addLayer(Events);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
////////////////////Food
    if (datum.source === "Food") {
      if (!map.hasLayer(Food)) {
        map.addLayer(Food);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
////////////////////NightlifeSpots
    if (datum.source === "NightlifeSpots") {
      if (!map.hasLayer(NightlifeSpots)) {
        map.addLayer(NightlifeSpots);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
////////////////////////////	OutdoorsRecreation
    if (datum.source === "OutdoorsRecreation") {
      if (!map.hasLayer(OutdoorsRecreation)) {
        map.addLayer(OutdoorsRecreation);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
////////////////////////////	ProfessionalOtherPlaces
    if (datum.source === "ProfessionalOtherPlaces") {
      if (!map.hasLayer(ProfessionalOtherPlaces)) {
        map.addLayer(ProfessionalOtherPlaces);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
/////////////////////////	Residences
    if (datum.source === "Residences") {
      if (!map.hasLayer(Residences)) {
        map.addLayer(Residences);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
////////////////////////ShopsServices
    if (datum.source === "ShopsServices") {
      if (!map.hasLayer(ShopsServices)) {
        map.addLayer(ShopsServices);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
///////////TravelTransport
    if (datum.source === "TravelTransport") {
      if (!map.hasLayer(TravelTransport)) {
        map.addLayer(TravelTransport);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
////////////



    if (datum.source === "Museums") {
      if (!map.hasLayer(museumLayer)) {
        map.addLayer(museumLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
