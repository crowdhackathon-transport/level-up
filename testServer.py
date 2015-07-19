__author__ = 'xhaos'
#!/usr/bin/python
import SocketServer as socket
import json
import numpy as np
import scipy.cluster.hierarchy as hac
from scipy import cluster
#from matplotlib import pyplot
import random
import threading
import SimpleHTTPServer
import SocketServer
import logging
import cgi
from BaseHTTPServer import BaseHTTPRequestHandler


import sys

PORT = 8081
elements = []
APIkey = 'AIzaSyARZhrqUd5ZbaPNcSXRIaaZaOZlZ7Br-Y0'
travelMode = 'walking'

def tic():
    import time
    global startTime_for_tictoc
    startTime_for_tictoc = time.time()

def toc():
    import time
    if 'startTime_for_tictoc' in globals():
        print "Elapsed time is " + str(time.time() - startTime_for_tictoc) + " seconds."
    else:
        print "Toc: start time not set"

def claster(destinations, num_clusters):
    z = hac.linkage(destinations, 'ward')
    claster_assignment = hac.fcluster(z, num_clusters, 'maxclust')
    return claster_assignment



class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    ID = ""
    numberOfDays = ""
    homeLocation = ""
    destinations = []
    def do_GET(self):
        logging.warning("======= GET STARTED =======")
        logging.warning(self.headers)
        SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

    def options(self):
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        self.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
        self.response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE'

    def do_POST(self):
        #logging.warning("======= POST STARTED =======")
        #logging.warning(self.headers)
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD':'POST',
                     'CONTENT_TYPE':self.headers['Content-Type'],
                     })
        #logging.warning("======= POST VALUES =======")


        for item in form.list:
            logging.warning(item)
        logging.warning("\n")

        print form
        ID = ""
        numberOfDays = ""
        homeLocation = ""
        destinations = []
        for field in form.keys():
            if "_id" in form[field].name:
                ID = form[field].value
            elif "days" in form[field].name:
                numberOfDays = form[field].value
            elif "home" in form[field].name:
                temp = form[field].value
                homeLocation = temp.split(",")
            elif "destination" in form[field].name:
                temp = form[field].value
                tempDestination = temp.split(",")
                destinations.append(tempDestination)

        print ID
        print numberOfDays
        print homeLocation
        print destinations
        tempClaster = claster(destinations, numberOfDays)
        print tempClaster
        # Calculate response
        googleString = 'https://maps.googleapis.com/maps/api/directions/json?origin='
        googleString += str(homeLocation[0])+','+str(homeLocation[1])+'&destination='+str(homeLocation[0])+','+str(homeLocation[1])+'&waypoints=optimize:true|'

        # Begin the response
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*");
        self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin");
        self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        self.end_headers()

        for i in range(1, int(numberOfDays)+1):
            print "day:"+ str(i)
            for j in range(0, len(tempClaster)):
                if int(tempClaster[j]) == i:
                    #internarary.append(destinations[j])
                    googleString += str(destinations[j][0])+','+str(destinations[j][1])+'|'
            #print internarary
            googleString = googleString[:-1]
            googleString += '&key='+APIkey+'&mode='+travelMode

            self.request.sendall('Days internarary:')

            self.request.sendall('\n')
            print(googleString)
            self.request.sendall(googleString)
            self.request.sendall('\n')

            googleString = 'https://maps.googleapis.com/maps/api/directions/json?origin='
            googleString += str(homeLocation[0])+','+str(homeLocation[1])+'&destination='+str(homeLocation[0])+','+str(homeLocation[1])+'&waypoints=optimize:true|'




        SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)



def start_server():
    """Start the server."""
    Handler = ServerHandler
    httpd = SocketServer.TCPServer(("", PORT), Handler)
    print("Server started and listening")
    httpd.serve_forever()

if __name__ == "__main__":
    start_server()

