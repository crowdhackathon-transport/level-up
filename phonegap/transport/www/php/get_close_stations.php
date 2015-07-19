<?php 
  $host = "localhost";
  $user = "transport";
  $pass = "transport";
  $databaseName = "contractuals";

  
  $con = mysqli_connect($host,$user,$pass,$databaseName);
 mysqli_set_charset( $con ,"utf8" );

  $lat = $_GET['lat'];  // latitude of centre of bounding circle in degrees
  $lon = $_GET['lon'];  // longitude of centre of bounding circle in degrees
  $rad = $_GET['rad'];  // radius of bounding circle in kilometers

  //$lat = 37.984444;
  //$lon = 23.728165;
  //$rad = 1;

  $R = 6371;  // earth's radius, km
  $minLat = $lat - rad2deg($rad/$R);
  $maxLat = $lat + rad2deg($rad/$R);
  $minLon = $lon - rad2deg($rad/$R/cos(deg2rad($lat)));
  $maxLon = $lon + rad2deg($rad/$R/cos(deg2rad($lat)));
  $lat = deg2rad($lat);
  $lon = deg2rad($lon);

  
 
  
  $result = mysqli_query($con,"SELECT * FROM stops WHERE stop_lat >= '$minLat' AND stop_lat <= '$maxLat' AND stop_lon >= '$minLon' AND stop_lon <= '$maxLon' AND acos(sin('$lat')*sin(radians(stop_lat))+cos('$lat')*cos(radians(stop_lat))*cos(radians(stop_lon)-'$lon'))*'$R' < '$rad'")or die (mysqli_error($con)); 
  
  $data = array();
  while ( $row = mysqli_fetch_row($result) )
  {
    $data[] = $row;
  }
   
  echo json_encode( $data );

?>
