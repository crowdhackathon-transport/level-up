<?php 
  $host = "localhost";
  $user = "transport";
  $pass = "transport";
  $databaseName = "contractuals";

  $con = mysqli_connect($host,$user,$pass,$databaseName );  
  //$dbs = mysql_select_db($databaseName, $con);
  mysqli_set_charset( $con ,"utf8" );

  $lat = $_GET['lat'];  // latitude of centre of bounding circle in degrees
  $lon = $_GET['lon'];  // longitude of centre of bounding circle in degrees
  $rad = $_GET['rad'];  // radius of bounding circle in kilometers

  //$lat = 37.978435;
  //$lon = 23.712218;
  //$rad = 1;

  $R = 6371;  // earth's radius, km
  $minLat = $lat - rad2deg($rad/$R);
  $maxLat = $lat + rad2deg($rad/$R);
  $minLon = $lon - rad2deg($rad/$R/cos(deg2rad($lat)));
  $maxLon = $lon + rad2deg($rad/$R/cos(deg2rad($lat)));
  $lat = deg2rad($lat);
  $lon = deg2rad($lon);

  $qry = "SELECT e.id,e.eponymia,e.longitude,e.latitude,'ESPRESSO',e.dieythinsi,k.espresso,avg(p.rating)
  FROM foursquare_coffees e, epixeiriseis_katalogos k, paraggelies p 
  WHERE e.epixeirisi_identity=k.epixeirisi_identity AND
  e.epixeirisi_identity=p.epixeirisi_identity AND
  latitude >= '$minLat' AND
  latitude <= '$maxLat' AND
  longitude >= '$minLon' AND
  longitude <= '$maxLon' AND
  acos(sin('$lat')*sin(radians(latitude))+cos('$lat')*cos(radians(latitude))*cos(radians(longitude)-'$lon'))*'$R' < '$rad' group by e.eponymia order by k.espresso,avg(p.rating) desc";
  
  //echo $qry;

  $result = mysqli_query($con,$qry); 
 
  $data = array();
  while ( $row = mysqli_fetch_row($result) )
  {
    $data[] = $row;
  }
  echo json_encode( $data );

?>
