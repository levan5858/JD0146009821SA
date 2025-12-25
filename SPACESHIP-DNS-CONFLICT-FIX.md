# Fix DNS Conflict Error in Spaceship

## ⚠️ Error Message Explained

**Error:** "Add conflicting A record? The A record you are adding, may conflict with your current Default Record Group records."

**What this means:**
- Spaceship has **default DNS records** already set up
- These default records are conflicting with the GitHub Pages A records you're trying to add
- You need to **delete the default records first**, then add the GitHub Pages records

---

## 🔧 Solution: Remove Default Records First

### Step 1: Find and Delete Default Records

1. **In your DNS management page, look for existing records**
2. **You'll likely see records like:**
   - Default A records (pointing to Spaceship IPs)
   - Default CNAME records
   - Any other records you didn't create

3. **Delete ALL default records:**
   - Click on each record
   - Click "Delete" or trash icon
   - Confirm deletion
   - Repeat for all default records

### Step 2: Check for "Default Record Group"

1. **Look for a section called "Default Record Group" or "Default Records"**
2. **If you see this section:**
   - Delete all records in this group
   - OR disable the default record group
   - Look for a toggle or "Disable" button

### Step 3: Now Add Your GitHub Pages Records

**After deleting default records, add your 4 A records:**

1. **A Record 1:**
   - Type: A
   - Name/Host: `@`
   - Value: `185.199.108.153`
   - TTL: 3600
   - Save

2. **A Record 2:**
   - Type: A
   - Name/Host: `@`
   - Value: `185.199.109.153`
   - TTL: 3600
   - Save

3. **A Record 3:**
   - Type: A
   - Name/Host: `@`
   - Value: `185.199.110.153`
   - TTL: 3600
   - Save

4. **A Record 4:**
   - Type: A
   - Name/Host: `@`
   - Value: `185.199.111.153`
   - TTL: 3600
   - Save

5. **CNAME Record:**
   - Type: CNAME
   - Name/Host: `www`
   - Value: `levan5858.github.io`
   - TTL: 3600
   - Save

---

## 🎯 Solution: Use Custom Record Group (If Available)

**If Spaceship has a "Custom Group" or "Custom Record Group" option, this is the BEST solution!**

### How to Use Custom Group:

1. **Create a Custom Group:**
   - Look for "Create Custom Group" or "New Record Group" button
   - Name it something like "GitHub Pages" or "Website DNS"
   - Click "Create" or "Save"

2. **Add All 4 A Records to This Custom Group:**
   - **IMPORTANT:** Create 4 SEPARATE A records (not one record with 4 IPs)
   - Each record should be:
     - Type: A
     - Name/Host: `@`
     - Value: One of the 4 IPs (see below)
     - TTL: 3600
     - **Make sure each record is added to your Custom Group**

3. **The 4 A Records You Need:**
   - Record 1: `@` → `185.199.108.153`
   - Record 2: `@` → `185.199.109.153`
   - Record 3: `@` → `185.199.110.153`
   - Record 4: `@` → `185.199.111.153`

4. **Add CNAME to Custom Group:**
   - Type: CNAME
   - Name/Host: `www`
   - Value: `levan5858.github.io`
   - TTL: 3600

### Why This Works:
- Custom groups are separate from the "Default Record Group"
- This avoids conflicts with hidden default records
- All your records will be organized together

### ⚠️ Important:
- You need **4 separate A records**, each with a different IP
- Don't try to put 4 IPs in one record
- All records should have Name/Host: `@` (for root domain)

---

## 🎯 Alternative Solution: Use Custom Nameservers

If you can't delete the default records, you can use **Custom Nameservers** instead:

### Option A: Use Cloudflare (Free DNS)

1. **Sign up for Cloudflare (free):**
   - Go to: https://www.cloudflare.com/
   - Create free account
   - Add your domain `alsahrapml.com`

2. **Cloudflare will give you nameservers:**
   - Example: `ns1.cloudflare.com`, `ns2.cloudflare.com`

3. **In Spaceship, switch to Custom Nameservers:**
   - Go to Nameservers section
   - Select "Custom Nameservers"
   - Enter Cloudflare nameservers
   - Save

4. **Configure DNS in Cloudflare:**
   - Add the 4 A records
   - Add the CNAME record
   - Cloudflare has better DNS management

### Option B: Use GitHub Pages Nameservers (If Available)

Some registrars allow using GitHub's nameservers directly, but this is less common.

---

## 📋 Step-by-Step: Delete Default Records

### What to Look For:

**Default records might look like:**
- A record: `@` → `some.spaceship.ip.address`
- A record: `@` → `another.spaceship.ip`
- CNAME: `www` → `something.spaceship.com`
- Any record you didn't create

### How to Delete:

1. **Find the record in your DNS list**
2. **Click on it** (or click edit/delete icon)
3. **Click "Delete"** or trash icon
4. **Confirm deletion**
5. **Repeat for all default records**

### After Deleting:

- Your DNS list should be **empty** (or only have records you created)
- Now you can add the GitHub Pages records without conflicts

---

## ✅ Verification

After deleting defaults and adding your records, you should see:

**Only these 5 records:**
- ✅ A: `@` → `185.199.108.153`
- ✅ A: `@` → `185.199.109.153`
- ✅ A: `@` → `185.199.110.153`
- ✅ A: `@` → `185.199.111.153`
- ✅ CNAME: `www` → `levan5858.github.io`

**No other records should exist!**

---

## 🆘 If You Can't Delete Default Records (Empty List But Still Getting Error)

**This means Spaceship has hidden/system default records that you can't see or delete.**

### Try These Solutions (In Order):

#### Solution 1: Proceed Despite Warning ⚠️
1. **When you see the conflict warning, try clicking:**
   - "OK" or "Continue" 
   - "Add Anyway" or "Proceed"
   - Sometimes it's just a warning and you can still add the record

2. **If it lets you proceed, add all 4 A records this way**

#### Solution 2: Look for Default Record Group Toggle 🔄
1. **In your DNS management page, look for:**
   - A toggle/switch labeled "Default Records" or "Default Record Group"
   - A checkbox to "Disable Default Records"
   - An option to "Use Custom DNS Only"
   - A section that says "Default Record Group" with a disable button

2. **If you find it:**
   - Toggle it OFF
   - OR click "Disable"
   - Then try adding your records again

#### Solution 3: Add Records One at a Time 🕐
1. **Add the first A record:**
   - Type: A
   - Name: `@`
   - Value: `185.199.108.153`
   - Click "Save" or "Add"
   - **Wait 5-10 seconds**

2. **Add the second A record:**
   - Type: A
   - Name: `@`
   - Value: `185.199.109.153`
   - Click "Save"
   - **Wait 5-10 seconds**

3. **Continue with the remaining 2 A records and CNAME**

#### Solution 4: Contact Spaceship Support 📞
1. **Go to:** https://www.spaceship.com/support/
2. **Contact them:**
   - Email: support@spaceship.com
   - Live chat (if available)
   - Support ticket

3. **Ask them to:**
   - Remove hidden default DNS records
   - Disable default record group
   - Allow you to manage DNS manually
   - Tell them: "I'm trying to add GitHub Pages A records but getting a conflict with hidden default records"

---

## 💡 Pro Tip

**If the conflict persists:**

1. **Try adding records one at a time:**
   - Add first A record
   - Wait a few seconds
   - Add second A record
   - Continue...

2. **Clear browser cache:**
   - Sometimes the interface needs a refresh

3. **Try a different browser:**
   - Sometimes browser-specific issues occur

---

## 🎯 Quick Action Plan

1. ✅ **Delete ALL default DNS records**
2. ✅ **Delete records in "Default Record Group" (if exists)**
3. ✅ **Verify DNS list is empty**
4. ✅ **Add 4 A records** (one at a time)
5. ✅ **Add 1 CNAME record**
6. ✅ **Verify only your 5 records exist**

---

**Once you've deleted the default records, you should be able to add all 4 A records without conflicts!** 🚀


