#!/usr/bin/python

#yum install mysql-python


from collections import defaultdict
from heapq import *
import MySQLdb
import mysql.connector
from mysql.connector import errorcode
import threading
import SimpleHTTPServer
import SocketServer
import logging
import cgi
from BaseHTTPServer import BaseHTTPRequestHandler

PORT = 8088

config = {
  'user': 'transport',
  'password': 'transport',
  'host': 'kesypsy.eap.gr',
  'database': 'contractuals',
  'raise_on_warnings': True,
}


def dijkstra(edges, f, t):
    g = defaultdict(list)
    for l,r,c in edges:
        g[l].append((c,r))

    q, seen = [(0,f,())], set()
    while q:
        (cost,v1,path) = heappop(q)
        if v1 not in seen:
            seen.add(v1)
            path = (v1, path)
            if v1 == t: return (cost, path)

            for c, v2 in g.get(v1, ()):
                if v2 not in seen:
                    heappush(q, (cost+c, v2, path))

    return float("inf")



class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    startBusStop = ""
    lastBusStop = ""

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

        for field in form.keys():
            if "START" in form[field].name:
                startBusStop = form[field].value
            elif "FINISH" in form[field].name:
                lastBusStop = form[field].value


        print startBusStop
        print lastBusStop
        # Calculate response
        route = dijkstra(busStopGraph, startBusStop, lastBusStop)
        route = str(route)
        route = route.replace('(', '')
        route = route.replace(')', '')
        route = route[:-2]
        route = 'instructions: {'+route+'}'

        # Begin the response
        self.send_response(200)
        #self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*");
        self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin");
        self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        self.end_headers()

        print 'RESPONCE: '+str(route)
        self.request.sendall(str(route))
        self.request.sendall('\n')


        SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)


def start_server():
    """Start the server."""
    Handler = ServerHandler
    httpd = SocketServer.TCPServer(("", PORT), Handler)
    print("Server started and listening")
    httpd.serve_forever()

if __name__ == "__main__":
    #edges = [
    #    ("A", "B", 7),
    #    ("A", "D", 5),
    #    ("B", "C", 8),
    #    ("B", "D", 9),
    #    ("B", "E", 7),
    #    ("C", "E", 5),
    #    ("D", "E", 15),
    #    ("D", "F", 6),
    #    ("E", "F", 8),
    #    ("E", "G", 9),
    #    ("F", "G", 11)
    #]

    #print "=== Dijkstra ==="
    #print edges
    #print "A -> E:"
    #print dijkstra(edges, "A", "E")
    #print "F -> G:"
    #print dijkstra(edges, "F", "G")

    busStopGraph = []
    try:


        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query = ("SELECT * FROM graph ")
        cursor.execute(query)
        for row in cursor.fetchall():
            #print row
            currentBusStop = str(row[0])
            #print "Current: "+currentBusStop
            neighbouringBusStops=str(row[1])
            #print "Neighbouring: "+neighbouringBusStops
            temp = neighbouringBusStops.split(',')
            for neighbouringStop in temp:
                #print "Next stop: "+ neighbouringStop
                busStopGraph.append((currentBusStop, neighbouringStop, 1))

        #print dijkstra(busStopGraph, '840024', '840021')

        cursor.close()
        cnx.close()
        print "Got bus stops and ready to start"
        print busStopGraph
        start_server()


    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    else:
        cnx.close()






