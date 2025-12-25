#!/bin/bash

# Simple server start script (alternative method)
# Your computer IP: 192.168.0.142

PORT=8000

echo "=========================================="
echo "Starting AL SAHRA PRECIOUS METALS Server"
echo "=========================================="
echo ""
echo "If you get a permission error, try:"
echo "  1. Use a different port (8080, 3000, etc.)"
echo "  2. Check if port $PORT is already in use"
echo "  3. Allow Python in System Preferences > Security"
echo ""
echo "Server URL for your phone:"
echo "  http://192.168.0.142:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=========================================="
echo ""

# Start server (this should work even if --bind doesn't)
python3 -m http.server $PORT

