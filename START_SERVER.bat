@echo off
title Mahakal Property - Server & Global Tunnel
echo ========================================================
echo       MAHAKAL PROPERTY - LAUNCHING LOCAL & GLOBAL
echo ========================================================
echo Starting local Vite server...
start /B npm run dev -- --host

timeout /t 3 /nobreak >nul

echo Starting Cloudflare Secure Public Tunnel...
echo Open the trycloudflare.com URL shown below on any mobile phone!
echo ========================================================
.\cloudflared.exe tunnel --url http://localhost:5173
pause
