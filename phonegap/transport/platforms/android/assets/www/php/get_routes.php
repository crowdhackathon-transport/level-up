<?php 

header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

  $host = "localhost";
  $user = "transport";
  $pass = "transport";
  $databaseName = "contractuals";

  //include 'DB.php';
  $con = mysqli_connect($host,$user,$pass,$databaseName );
  mysqli_set_charset( $con ,"utf8" );

  $stop_id = $_GET['stop_id'];
  //$stop_id = 1;

     //echo 'tttt';
  
  $result = mysqli_query($con,"SELECT route_id,route_short_name,route_color,route_text_color,stop_id,stop_name,stop_lat,stop_lon FROM dromologia as d,stops as s WHERE LOCATE('$stop_id',staseis)>0 AND LOCATE(stop_id,staseis)>0 ORDER BY route_id,locate(stop_id,staseis)") or die (mysqli_error($con)); 

  $data = array();
  while ( $row = mysqli_fetch_row($result) )
  {
    $data[] = $row;
  }
  
  echo json_encode( $data );

?>
