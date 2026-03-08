@echo off

echo Iniciando servidor...

start cmd k cd Cmr-imports-erp && node server.js

echo Iniciando sistema...

start cmd k cd Cmr-imports-erpdashboard && npm start

timeout t 5

start httplocalhost3000