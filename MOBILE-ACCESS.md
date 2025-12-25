# How to Access Website on Your Phone

## Your Computer IP: 192.168.0.142

## Solution 1: Use a Different Port (Easiest)

1. Open Terminal
2. Navigate to the project folder:
   ```bash
   cd "/Users/work1/Desktop/AL SAHRA PRECIOUS METALS"
   ```

3. Start server on port 8080:
   ```bash
   python3 -m http.server 8080 --bind 0.0.0.0
   ```

4. On your phone, open browser and go to:
   ```
   http://192.168.0.142:8080
   ```

## Solution 2: Free Up Port 8000

If you want to use port 8000:

1. Find what's using port 8000:
   ```bash
   lsof -ti:8000
   ```

2. Kill that process:
   ```bash
   kill -9 $(lsof -ti:8000)
   ```

3. Start server:
   ```bash
   python3 -m http.server 8000 --bind 0.0.0.0
   ```

4. On your phone: `http://192.168.0.142:8000`

## Solution 3: Simple Server (No Network Binding)

If `--bind 0.0.0.0` doesn't work:

1. Start simple server:
   ```bash
   python3 -m http.server 8080
   ```

2. Try accessing from phone: `http://192.168.0.142:8080`

   Note: This may only work if your Mac's firewall allows it.

## Solution 4: Allow Python in Firewall

1. Go to **System Preferences** → **Security & Privacy** → **Firewall**
2. Click **Firewall Options**
3. Make sure Python is allowed to accept incoming connections
4. If not listed, add it manually

## Quick Test Ports

Try these ports if others don't work:
- 8080
- 3000
- 5000
- 8888

## Important Notes

- ✅ Make sure your phone is on the **same WiFi network**
- ✅ Keep Terminal open while using the website
- ✅ If you see "Allow incoming connections?" → Click **Allow**

## Troubleshooting

**Can't access from phone?**
1. Check both devices are on same WiFi
2. Try disabling Mac firewall temporarily
3. Try a different port
4. Check if your router blocks device-to-device communication

**Permission errors?**
- Use a different port (8080, 3000, etc.)
- Check System Preferences → Security & Privacy



