#!/bin/bash

MY_USER=transport
MY_PASS=transport


GET=`wget -N http://geodata.gov.gr/datasets/attachments/cf843c3f-b3b6-49e3-b271-e4bf5481537e/csv/oasa_routes.zip 2>&1`
echo $GET | grep "Server file no newer than local file"
if test $? -eq 0
then
   echo nothing to do
else
   if test -f oasa_routes.zip
   then
      rm -rf oasa_routes
      unzip oasa_routes.zip
      cd oasa_routes
      sed '1d' agency.txt > tmpfile; mv tmpfile agency.txt
      sed '1d' calendar_dates.txt > tmpfile; mv tmpfile calendar_dates.txt
      sed '1d' calendar.txt > tmpfile; mv tmpfile calendar.txt
      sed '1d' feed_info.txt > tmpfile; mv tmpfile feed_info.txt
      sed '1d' routes.txt > tmpfile; mv tmpfile routes.txt
      sed '1d' shapes.txt > tmpfile; mv tmpfile shapes.txt
      sed '1d' stops.txt > tmpfile; mv tmpfile stops.txt
      sed '1d' stop_times.txt > tmpfile; mv tmpfile stop_times.txt
      sed '1d' trips.txt > tmpfile; mv tmpfile trips.txt

      mysql -u $MY_USER -p$MY_PASS transport -e"DELETE FROM agency"
      mysql -u $MY_USER -p$MY_PASS transport --local-infile -e\
         "LOAD DATA LOCAL INFILE 'agency.txt' INTO TABLE agency\
          CHARACTER SET UTF8\
          FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'\
          (agency_name,agency_url,agency_timezone,agency_lang,agency_phone)"

      mysql -u $MY_USER -p$MY_PASS transport -e"DELETE FROM calendar_dates"
      mysql -u $MY_USER -p$MY_PASS transport --local-infile -e\
         "LOAD DATA LOCAL INFILE 'calendar_dates.txt' INTO TABLE calendar_dates\
          CHARACTER SET UTF8\
          FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'\
          (service_id,c_date,exception_type)"

      mysql -u $MY_USER -p$MY_PASS transport -e"DELETE FROM calendar"
      mysql -u $MY_USER -p$MY_PASS transport --local-infile -e\
         "LOAD DATA LOCAL INFILE 'calendar.txt' INTO TABLE calendar\
          CHARACTER SET UTF8\
          FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'\
          (service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date)"
   
      mysql -u $MY_USER -p$MY_PASS transport -e"DELETE FROM feed_info"
      mysql -u $MY_USER -p$MY_PASS transport --local-infile -e\
         "LOAD DATA LOCAL INFILE 'feed_info.txt' INTO TABLE feed_info\
          CHARACTER SET UTF8\
          FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'\
          (feed_publisher_name,feed_publisher_url,feed_lang,feed_version)"

      mysql -u $MY_USER -p$MY_PASS transport -e"DELETE FROM routes"
      mysql -u $MY_USER -p$MY_PASS transport --local-infile -e\
         "LOAD DATA LOCAL INFILE 'routes.txt' INTO TABLE routes\
          CHARACTER SET UTF8\
          FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'\
          (route_id,route_short_name,route_long_name,route_desc,route_type,route_color, route_text_color)"
   
      mysql -u $MY_USER -p$MY_PASS transport -e"DELETE FROM shapes"
      mysql -u $MY_USER -p$MY_PASS transport --local-infile -e\
         "LOAD DATA LOCAL INFILE 'shapes.txt' INTO TABLE shapes\
          CHARACTER SET UTF8\
          FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'\
          (shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence)"
   
      mysql -u $MY_USER -p$MY_PASS transport -e"DELETE FROM stops"
      mysql -u $MY_USER -p$MY_PASS transport --local-infile -e\
         "LOAD DATA LOCAL INFILE 'stops.txt' INTO TABLE stops\
          CHARACTER SET UTF8\
          FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'\
          (stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,location_type)"
   
      mysql -u $MY_USER -p$MY_PASS transport -e"DELETE FROM stop_times"
      mysql -u $MY_USER -p$MY_PASS transport --local-infile -e\
         "LOAD DATA LOCAL INFILE 'stop_times.txt' INTO TABLE stop_times\
          CHARACTER SET UTF8\
          FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'\
          (trip_id,stop_id,stop_sequence,pickup_type,drop_off_type)"
   
      mysql -u $MY_USER -p$MY_PASS transport -e"DELETE FROM trips"
      mysql -u $MY_USER -p$MY_PASS transport --local-infile -e\
         "LOAD DATA LOCAL INFILE 'trips.txt' INTO TABLE trips\
          CHARACTER SET UTF8\
          FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'\
          (route_id,service_id,trip_id,trip_headsign,direction_id,block_id,shape_id)"
   
      mysql -u $MY_USER -p$MY_PASS transport -e"DROP TABLE dromologia"
      mysql -u $MY_USER -p$MY_PASS transport -e"CREATE TABLE dromologia(route_id VARCHAR(100),trip_id VARCHAR(100))"
      mysql -u $MY_USER -p$MY_PASS transport -e"INSERT INTO dromologia(route_id,trip_id) SELECT route_id,trip_id FROM trips GROUP BY route_id"
      mysql -u $MY_USER -p$MY_PASS transport -e"ALTER TABLE dromologia ADD COLUMN staseis VARCHAR(1000)"
      mysql -u $MY_USER -p$MY_PASS transport -e"UPDATE dromologia d,stop_times s SET d.staseis=(SELECT GROUP_CONCAT(stop_id)\
           FROM stop_times AS s\
           WHERE d.trip_id = s.trip_id\
           ORDER BY CAST(stop_sequence AS UNSIGNED))"
      mysql -u $MY_USER -p$MY_PASS transport -e"ALTER TABLE dromologia ADD COLUMN route_short_name VARCHAR(10)"
      mysql -u $MY_USER -p$MY_PASS transport -e"ALTER TABLE dromologia ADD COLUMN route_color VARCHAR(6)"
      mysql -u $MY_USER -p$MY_PASS transport -e"ALTER TABLE dromologia ADD COLUMN route_text_color VARCHAR(6)"
      mysql -u $MY_USER -p$MY_PASS transport -e"ALTER TABLE dromologia ADD COLUMN route_long_name VARCHAR(100)"
      mysql -u $MY_USER -p$MY_PASS transport -e"UPDATE dromologia d,routes r SET\
           d.route_long_name=r.route_long_name,\
           d.route_short_name=r.route_short_name,\
           d.route_color=r.route_color,\
           d.route_text_color=r.route_text_color\
           WHERE d.route_id=r.route_id"
      mysql -u $MY_USER -p$MY_PASS transport -e"DROP TABLE graph"
      mysql -u $MY_USER -p$MY_PASS transport -e"CREATE TABLE graph( stop_id VARCHAR(6), neighbors VARCHAR(1000))"
      mysql -u $MY_USER -p$MY_PASS transport -e"INSERT INTO graph(stop_id) SELECT stop_id FROM stops"
      mysql -u $MY_USER -p$MY_PASS transport -e"UPDATE graph,dromologia SET neighbors = (SELECT GROUP_CONCAT(DISTINCT(SUBSTR(staseis,LOCATE(CONCAT(stop_id,','),staseis)+7,6))) FROM dromologia WHERE LOCATE(CONCAT(stop_id,','),staseis)>0)"
   fi
fi

cd ..
GET=`wget -N http://www.travelbygps.com/premium/greece/Greece.csv  2>&1`
echo $GET | grep "Server file no newer than local file"
if test $? -eq 0
then
   echo nothing to do
else
   if test -f Greece.csv
   then
      echo ...
      sed '1d' Greece.csv > tmpfile; mv tmpfile Greece.csv

      NUMOFLINES=`cat Greece.csv | wc -l`
      i=0
      echo "{\"type\": \"FeatureCollection\",\"features\": [" > data/places.geojson
      while read LINE
      do
         i=$((i+1))

         Label=$(echo "$LINE" | awk -F',' '{print $1}')
         Type=$(echo "$LINE" | awk -F',' '{print $2}')
         Symbol=$(echo "$LINE" | awk -F',' '{print $3}')
         Description=$(echo "$LINE" | awk -F',' '{print $4}')
         Description2=$(echo "$LINE" | awk -F',' '{print $5}')
         Description3=$(echo "$LINE" | awk -F',' '{print $6}')
         Waypoint=$(echo "$LINE" | awk -F',' '{print $7}')
         Comment=$(echo "$LINE" | awk -F',' '{print $8}')
         Latitude=$(echo "$LINE" | awk -F',' '{print $9}')
         Longitude=$(echo "$LINE" | awk -F',' '{print $10}')

         #echo Label=$Label
         #echo Type=$Type
         #echo Symbol=$Symbol
         #echo Description=$Description
         #echo Description2=$Description
         #echo Description3=$Description
         #echo Waypoint=$Waypoint
         #echo Comment=$Comment
         #echo Latitude=$Latitude
         #echo Longitude=$Longitude
   
         #agency_name=$(echo "$agency_name" | sed -e 's/^ *//g' -e 's/ *$//g')
         if test $i -lt $NUMOFLINES
         then
             echo "{ \"type\": \"Feature\", \"id\": $i, \"properties\": { \"NAME\": \"$Label\", \"TEL\": null, \"URL\": null, \"ADDRESS1\": $Description, $Description2, $Description3, \"ADDRES2\": null, \"CITY\": null, \"ZIP\": null }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ $Longitude , $Latitude ] } }," >> data/places.geojson
         else
             echo "{ \"type\": \"Feature\", \"id\": $i, \"properties\": { \"NAME\": \"$Label\", \"TEL\": null, \"URL\": null, \"ADDRESS1\": $Description, $Description2, $Description3, \"ADDRES2\": null, \"CITY\": null, \"ZIP\": null }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ $Longitude , $Latitude ] } }" >> data/places.geojson
         fi
      done < Greece.csv
      echo "]}" >> data/places.geojson
      sed 's///' data/places.geojson > tmpfile; mv tmpfile data/places.geojson
   fi
fi

GET=`wget -N http://geodata.gov.gr/datasets/attachments/3fead307-166b-4714-88d4-699acb71284a/kml/dhmosia_wifi.zip 2>&1`
echo $GET | grep "Server file no newer than local file"
if test $? -eq 0
then
   echo nothing to do
else
   if test -f dhmosia_wifi.zip
   then
      rm -rf dhmosia_wifi
      unzip dhmosia_wifi.zip
      cd dhmosia_wifi
      ogr2ogr -f GeoJSON ../data/wifi.geojson dhmosia_wifi.kml
      cd ..
   fi
fi

GET=`wget -N http://geodata.gov.gr/datasets/attachments/ac12f7d4-f8c7-4d36-a38a-d44b6f4a34b6/kml/galazies_shmaies_2010.zip 2>&1`
echo $GET | grep "Server file no newer than local file"
if test $? -eq 0
then
   echo nothing to do
else
   if test -f galazies_shmaies_2010.zip
   then
      rm -rf galazies_shmaies_2010
      unzip galazies_shmaies_2010.zip
      cd galazies_shmaies_2010
      ogr2ogr -f GeoJSON ../data/beach.geojson galazies_shmaies_2010.kml
      cd ..
   fi
fi


