#!/bin/bash

# Script to start server accessible from mobile devices
# Your computer IP: 192.168.0.142

PORT=8000

# Check if port is in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "Port $PORT is already in use. Trying port 8080..."
    PORT=8080
fi

echo "=========================================="
echo "Starting AL SAHRA PRECIOUS METALS Server"
echo "=========================================="
echo ""
echo "Server will be accessible at:"
echo "  http://192.168.0.142:$PORT"
echo ""
echo "On your phone, open a browser and go to:"
echo "  http://192.168.0.142:$PORT"
echo ""
echo "Make sure your phone is on the same WiFi network!"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=========================================="
echo ""

# Try to start server accessible from network
if python3 -m http.server $PORT --bind 0.0.0.0 2>/dev/null; then
    echo "Server started successfully!"
else
    echo "Error: Could not start server with network access."
    echo "Trying alternative method..."
    echo ""
    echo "Please run this command manually:"
    echo "  python3 -m http.server $PORT"
    echo ""
    echo "Then access from your phone using:"
    echo "  http://192.168.0.142:$PORT"
    echo ""
    echo "Note: This method may only work if your firewall allows it."
fi
