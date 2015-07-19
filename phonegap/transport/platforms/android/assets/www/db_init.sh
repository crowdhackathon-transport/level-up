#!/bin/bash

MY_USER=transport
MY_PASS=transport

mysql -u $MY_USER -p$MY_PASS -e"create database contractuals character set utf8"
mysql -u $MY_USER -p$MY_PASS contractuals < contractuals.sql
