# Detailed DNS Setup for Spaceship - Step by Step

## 📝 How to Add DNS Records in Spaceship

### Understanding the Fields:

- **Type:** A or CNAME
- **Name/Host:** What goes here (see below)
- **Value/Points to:** The IP address or domain
- **TTL (Time To Live):** How long DNS is cached (use 3600 or default)

---

## 🔧 Step-by-Step: Adding A Records

### For Each A Record (You need 4):

1. **Click "Add Record" or "+" button**

2. **Fill in the form:**

   **Type:**
   - Select: **"A"** (from dropdown)

   **Name/Host:**
   - Enter: **`@`** (just the @ symbol, nothing else)
   - OR leave it **blank** (if Spaceship allows)
   - OR enter: **`alsahrapml.com`** (if @ doesn't work)
   - **This represents your root domain** (alsahrapml.com)

   **Value/Points to:**
   - Enter one of these IP addresses (one per record):
     - `185.199.108.153`
      - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

   **TTL (Time To Live):**
   - Enter: **`3600`**
   - OR select **"Default"** or **"Auto"** if available
   - This is how long DNS servers cache the record (3600 seconds = 1 hour)

3. **Click "Save" or "Add"**

4. **Repeat for all 4 IP addresses** (create 4 separate A records)

---

## 📋 Example: What Your A Records Should Look Like

After adding all 4, you should see:

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**Note:** The order doesn't matter, and you might see them listed differently.

---

## 🌐 Step-by-Step: Adding CNAME Record

1. **Click "Add Record" or "+" button**

2. **Fill in the form:**

   **Type:**
   - Select: **"CNAME"** (from dropdown)

   **Name/Host:**
   - Enter: **`www`** (just "www", nothing else)
   - **This creates www.alsahrapml.com**

   **Value/Points to:**
   - Enter: **`levan5858.github.io`**
   - (This is your GitHub Pages URL)

   **TTL (Time To Live):**
   - Enter: **`3600`**
   - OR select **"Default"** or **"Auto"** if available

3. **Click "Save" or "Add"**

---

## ✅ Final DNS Records Summary

After completing, you should have **5 records total**:

1. ✅ A record: `@` → `185.199.108.153`
2. ✅ A record: `@` → `185.199.109.153`
3. ✅ A record: `@` → `185.199.110.153`
4. ✅ A record: `@` → `185.199.111.153`
5. ✅ CNAME record: `www` → `levan5858.github.io`

---

## 🎯 Common Questions Answered

### Q: What if the Name/Host field shows "@" already?

**A:** If it shows `@` or `alsahrapml.com` already:
- You can leave it as is
- OR type `@` in the field
- Both work the same way

### Q: What if there's a dropdown for Name/Host?

**A:** If there's a dropdown:
- Select `@` or `(root)` or `alsahrapml.com`
- Whatever option represents your root domain

### Q: What if I see "Host" and "Subdomain" as separate fields?

**A:** 
- **Host/Subdomain:** Leave blank or enter `@`
- **Domain:** Should show `alsahrapml.com` automatically

### Q: What TTL should I use?

**A:** 
- **Best:** `3600` (1 hour) - recommended
- **Alternative:** `1800` (30 minutes) - faster updates
- **Also OK:** Default/Auto if available
- **Avoid:** Very high values like 86400 (24 hours) - slower updates

### Q: What if I see "Time to Live" or "TTL" with options?

**A:** 
- Select `3600` if it's a number input
- OR select `1 hour` if it's a dropdown
- OR select `Default` or `Auto` if available

---

## 🖼️ Visual Guide (What You Should See)

### A Record Example:

```
┌─────────────────────────────────────┐
│ Type: [A ▼]                         │
│ Name/Host: [@]                      │
│ Value: [185.199.108.153]            │
│ TTL: [3600]                         │
│ [Save] [Cancel]                     │
└─────────────────────────────────────┘
```

### CNAME Record Example:

```
┌─────────────────────────────────────┐
│ Type: [CNAME ▼]                     │
│ Name/Host: [www]                    │
│ Value: [levan5858.github.io]        │
│ TTL: [3600]                         │
│ [Save] [Cancel]                     │
└─────────────────────────────────────┘
```

---

## ⚠️ Important Notes

1. **Don't add "http://" or "https://"** in the Value field
2. **Don't add a trailing slash** (like `levan5858.github.io/`)
3. **Make sure there are no spaces** before or after values
4. **The @ symbol represents your root domain** (alsahrapml.com)
5. **www is just "www"** - no @, no domain name

---

## 🔍 How to Verify Your Records

After saving, check your DNS records list. You should see:

- 4 A records with `@` or `alsahrapml.com` as the name
- 1 CNAME record with `www` as the name

If you see any other records you didn't add (like default Spaceship records), **delete them**.

---

## 🆘 Troubleshooting

### "Invalid format" error?

- Make sure IP addresses have no spaces
- Make sure CNAME value has no `http://` or `https://`
- Check for typos

### Can't find where to add records?

- Look for "Add Record", "+", "New Record", or "Create Record" button
- It might be in a "DNS" or "DNS Management" tab
- Check if you need to enable "Custom DNS" first

### Records not saving?

- Make sure you click "Save" or "Add" after each record
- Refresh the page and check if records appear
- Try one record at a time

---

## ✅ Quick Checklist

- [ ] Added 4 A records with `@` as Name/Host
- [ ] Each A record has a different IP (185.199.108.153, 109.153, 110.153, 111.153)
- [ ] Added 1 CNAME record with `www` as Name/Host
- [ ] CNAME record points to `levan5858.github.io`
- [ ] TTL set to 3600 (or default)
- [ ] All records saved successfully
- [ ] No extra/default records remaining

---

**Once all records are added, proceed to Step 2 (GitHub Pages configuration)!** 🚀

