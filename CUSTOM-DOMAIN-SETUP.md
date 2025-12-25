# Custom Domain Setup Guide - alsahrapml.com

This guide will help you connect your custom domain `alsahrapml.com` to your GitHub Pages website.

---

## 📋 Prerequisites

1. ✅ You own the domain `alsahrapml.com`
2. ✅ Your website is already deployed on GitHub Pages
3. ✅ You have access to your domain registrar's DNS settings

---

## 🚀 Step-by-Step Instructions

### Step 1: Create CNAME File

A `CNAME` file has been created in your repository root with your domain name.

**File:** `CNAME`  
**Content:** `alsahrapml.com`

This tells GitHub Pages which domain to use.

---

### Step 2: Configure GitHub Pages Settings

1. **Go to your GitHub repository:**
   - Visit: https://github.com/levan5858/JD0146009821SA

2. **Navigate to Settings:**
   - Click on **"Settings"** tab (top menu)

3. **Go to Pages:**
   - Scroll down to **"Pages"** in the left sidebar
   - Click on **"Pages"**

4. **Add Custom Domain:**
   - In the **"Custom domain"** section, enter: `alsahrapml.com`
   - Click **"Save"**

5. **Enable HTTPS (Recommended):**
   - Check the box **"Enforce HTTPS"** (this may take a few minutes to appear)
   - This ensures your site uses secure HTTPS

---

### Step 3: Configure DNS Records

You need to update your DNS records at your domain registrar (where you bought the domain).

#### Option A: Using Apex Domain (alsahrapml.com) - Recommended

**For the root domain (alsahrapml.com):**

Add these **A records** at your domain registrar:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**For www subdomain (www.alsahrapml.com):**

Add this **CNAME record**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | levan5858.github.io | 3600 |

---

#### Option B: Using CNAME Only (www.alsahrapml.com)

If your registrar doesn't support A records for apex domains, you can use:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | levan5858.github.io | 3600 |

Then redirect `alsahrapml.com` to `www.alsahrapml.com` (most registrars support this).

---

### Step 4: Common Domain Registrars Instructions

#### Namecheap
1. Log in to Namecheap
2. Go to **Domain List** → Click **"Manage"** next to your domain
3. Go to **"Advanced DNS"** tab
4. Add the A records and CNAME as shown above
5. Save changes

#### GoDaddy
1. Log in to GoDaddy
2. Go to **My Products** → **DNS** next to your domain
3. Click **"Add"** to add A records and CNAME
4. Enter the values as shown above
5. Save

#### Cloudflare
1. Log in to Cloudflare
2. Select your domain
3. Go to **DNS** → **Records**
4. Add A records and CNAME as shown above
5. Save

#### Google Domains
1. Log in to Google Domains
2. Click on your domain
3. Go to **DNS** tab
4. Scroll to **"Custom resource records"**
5. Add A records and CNAME as shown above
6. Save

---

### Step 5: Wait for DNS Propagation

After updating DNS records:

- ⏱️ **Wait 5 minutes to 48 hours** for DNS changes to propagate
- 🔍 **Check DNS propagation:** Use https://dnschecker.org
- ✅ **Verify:** Enter `alsahrapml.com` and check if it resolves to GitHub Pages IPs

---

### Step 6: Verify Domain is Connected

1. **Check GitHub Pages Settings:**
   - Go to: Settings → Pages
   - You should see: ✅ "Domain is properly configured"

2. **Test Your Domain:**
   - Visit: `https://alsahrapml.com`
   - Visit: `https://www.alsahrapml.com`
   - Both should show your website

3. **Check SSL Certificate:**
   - After DNS propagates, GitHub will automatically issue an SSL certificate
   - This may take a few hours
   - Once ready, enable "Enforce HTTPS" in GitHub Pages settings

---

## 🔍 Troubleshooting

### Domain Not Working?

1. **Check DNS Records:**
   - Use: https://dnschecker.org
   - Enter: `alsahrapml.com`
   - Verify A records point to GitHub Pages IPs

2. **Check CNAME File:**
   - Ensure `CNAME` file exists in repository root
   - Content should be: `alsahrapml.com` (no www, no http://)

3. **Check GitHub Pages Settings:**
   - Go to: Settings → Pages
   - Verify custom domain is set correctly
   - Check for any error messages

4. **Wait Longer:**
   - DNS can take up to 48 hours to fully propagate
   - Be patient!

### HTTPS Not Working?

1. **Wait for SSL Certificate:**
   - GitHub automatically issues SSL certificates
   - This can take a few hours after DNS is configured
   - Check back later

2. **Enable "Enforce HTTPS":**
   - Once certificate is issued, enable it in Settings → Pages

### Still Having Issues?

1. **Check GitHub Status:**
   - Visit: https://www.githubstatus.com

2. **Verify Repository Settings:**
   - Ensure repository is public (or you have GitHub Pro)
   - Ensure GitHub Pages is enabled

3. **Contact Support:**
   - GitHub Support: https://support.github.com
   - Your domain registrar support

---

## ✅ Verification Checklist

- [ ] CNAME file created in repository
- [ ] Custom domain added in GitHub Pages settings
- [ ] A records added at domain registrar (4 IPs)
- [ ] CNAME record added for www subdomain
- [ ] DNS propagation checked (dnschecker.org)
- [ ] Domain resolves correctly
- [ ] Website loads at alsahrapml.com
- [ ] Website loads at www.alsahrapml.com
- [ ] HTTPS certificate issued (may take hours)
- [ ] "Enforce HTTPS" enabled in GitHub Pages

---

## 🎉 Success!

Once everything is configured:

- ✅ Your site will be live at: **https://alsahrapml.com**
- ✅ Also works at: **https://www.alsahrapml.com**
- ✅ Automatic HTTPS/SSL certificate
- ✅ Fast CDN delivery worldwide

---

## 📝 Important Notes

1. **Don't delete the CNAME file** - It's required for custom domains
2. **DNS changes take time** - Be patient (5 min to 48 hours)
3. **SSL certificate is automatic** - GitHub handles it
4. **Keep DNS records** - Don't remove them after setup
5. **Both www and non-www work** - Configured for both

---

## 🔗 Useful Links

- **GitHub Pages Docs:** https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **DNS Checker:** https://dnschecker.org
- **Your Repository:** https://github.com/levan5858/JD0146009821SA

---

**Need help?** Check the troubleshooting section above or contact your domain registrar's support team.


