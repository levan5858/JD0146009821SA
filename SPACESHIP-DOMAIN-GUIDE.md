# Complete Guide: Register Domain with Spaceship

This guide will walk you through registering `alsahrapml.com` with Spaceship step-by-step.

---

## 🚀 Step 1: Visit Spaceship Website

1. **Open your web browser**
2. **Go to:** https://www.spaceship.com/
3. You'll see the Spaceship homepage

---

## 🔍 Step 2: Check Domain Availability

1. **Find the search box** at the top of the page
2. **Type:** `alsahrapml.com`
3. **Click "Search"** or press Enter
4. **Wait for results** (takes a few seconds)

### What You'll See:

**If Available:**
- ✅ Green checkmark
- Price: $4.99/year (first year)
- "Add to Cart" button

**If Not Available:**
- ❌ Red X or "Taken"
- Suggestions for similar domains
- You can try alternatives like:
  - `alsahrapml.net`
  - `alsahrapml.org`
  - `alsahrapml-logistics.com`

---

## 🛒 Step 3: Add to Cart

1. **If available, click "Add to Cart"**
2. **Review your cart:**
   - Domain name: `alsahrapml.com`
   - Price: $4.99 (first year)
   - Renewal: $9.98/year (shown in small text)
3. **Click "Continue"** or "Checkout"

---

## 👤 Step 4: Create Account (If New User)

### If you don't have an account:

1. **Click "Sign Up"** or "Create Account"
2. **Enter your information:**
   - Email address (use a real one - you'll need to verify it)
   - Password (make it strong!)
   - Confirm password
3. **Click "Create Account"**
4. **Check your email** for verification link
5. **Click the verification link** in the email

### If you already have an account:

1. **Click "Sign In"**
2. **Enter your email and password**
3. **Click "Sign In"**

---

## 📝 Step 5: Enter Domain Registration Details

After signing in, you'll see a form to complete registration:

### A. Contact Information

**Registrant Contact** (Domain Owner):
- **First Name:** Your first name
- **Last Name:** Your last name
- **Organization:** AL SAHRA PRECIOUS METALS & LOGISTICS LLC (optional)
- **Email:** Your email address
- **Phone:** Your phone number (include country code, e.g., +966...)
- **Address:** Your street address
- **City:** Your city
- **State/Province:** Your state or province
- **Postal Code:** Your ZIP/postal code
- **Country:** Select your country (Saudi Arabia)

**Note:** You can use the same information for all contact types (Admin, Technical, Billing) or enter different ones.

### B. Privacy Protection

- ✅ **Enable WHOIS Privacy** (usually FREE and recommended)
- This hides your personal information from public databases
- **Keep this checked!**

### C. Registration Period

- **Select:** 1 year (minimum)
- You can register for multiple years if you want
- Price: $4.99 for first year, $9.98/year for additional years

### D. Auto-Renewal (Optional)

- ✅ **Enable Auto-Renewal** (recommended)
- This automatically renews your domain so it doesn't expire
- You can cancel anytime

---

## 💳 Step 6: Payment

1. **Select payment method:**
   - Credit/Debit Card (Visa, Mastercard, Amex)
   - PayPal (if available)
   - Other payment methods

2. **Enter payment details:**
   - Card number
   - Expiry date
   - CVV (security code)
   - Cardholder name
   - Billing address

3. **Review your order:**
   - Domain: `alsahrapml.com`
   - Registration period: 1 year
   - Total: $4.99
   - Privacy protection: FREE

4. **Click "Complete Purchase"** or "Pay Now"

---

## ✅ Step 7: Confirmation

After payment:

1. **You'll see a confirmation page:**
   - ✅ "Domain registered successfully!"
   - Your domain: `alsahrapml.com`
   - Registration date
   - Expiry date (1 year from now)

2. **Check your email:**
   - You'll receive a confirmation email
   - Save this email for your records

3. **Access your account:**
   - You can now manage your domain from your Spaceship dashboard

---

## 🎛️ Step 8: Access Domain Management

1. **Go to Spaceship dashboard:**
   - https://www.spaceship.com/account/domains
   - Or click "My Domains" in the top menu

2. **Find your domain:**
   - You'll see `alsahrapml.com` in your domain list
   - Click on it to manage

---

## ⚙️ Step 9: Configure DNS Settings (For GitHub Pages)

Now you need to configure DNS to point to GitHub Pages:

1. **In your domain management page, find "DNS" or "DNS Management"**
2. **Click "Manage DNS"** or "DNS Settings"

3. **Add A Records** (for root domain `alsahrapml.com`):

   Click "Add Record" and add these 4 A records:

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | A | @ | 185.199.108.153 | 3600 |
   | A | @ | 185.199.109.153 | 3600 |
   | A | @ | 185.199.110.153 | 3600 |
   | A | @ | 185.199.111.153 | 3600 |

   **How to add:**
   - Type: Select "A"
   - Name/Host: Enter `@` (or leave blank, or `alsahrapml.com`)
   - Value/Points to: Enter the IP address (one at a time)
   - TTL: 3600 (or default)
   - Click "Save" or "Add Record"
   - Repeat for all 4 IP addresses

4. **Add CNAME Record** (for www subdomain):

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | CNAME | www | levan5858.github.io | 3600 |

   **How to add:**
   - Type: Select "CNAME"
   - Name/Host: Enter `www`
   - Value/Points to: Enter `levan5858.github.io`
   - TTL: 3600 (or default)
   - Click "Save" or "Add Record"

5. **Save all changes**

---

## 🔗 Step 10: Configure GitHub Pages

1. **Go to your GitHub repository:**
   - https://github.com/levan5858/JD0146009821SA/settings/pages

2. **Add Custom Domain:**
   - Scroll to "Custom domain" section
   - Enter: `alsahrapml.com`
   - Click "Save"

3. **Enable HTTPS:**
   - After a few minutes/hours, you'll see "Enforce HTTPS" option
   - Check the box to enable it

---

## ⏱️ Step 11: Wait for DNS Propagation

1. **DNS changes take time to propagate:**
   - Usually: 5 minutes to 1 hour
   - Maximum: 48 hours
   - Most common: 15-30 minutes

2. **Check DNS propagation:**
   - Visit: https://dnschecker.org
   - Enter: `alsahrapml.com`
   - Select "A" record type
   - Click "Search"
   - You should see the 4 GitHub Pages IPs listed

3. **Test your domain:**
   - Visit: `https://alsahrapml.com`
   - Visit: `https://www.alsahrapml.com`
   - Both should show your website

---

## 📱 Spaceship Dashboard Overview

### What You Can Do in Your Dashboard:

1. **Manage DNS:**
   - Add/edit/delete DNS records
   - Change nameservers (if needed)

2. **Renew Domain:**
   - See expiry date
   - Renew early if you want
   - Enable auto-renewal

3. **Transfer Domain:**
   - Transfer to another registrar (after 60 days)
   - Transfer to another account

4. **Privacy Settings:**
   - Enable/disable WHOIS privacy
   - Update contact information

5. **Email Forwarding:**
   - Set up email forwarding (if available)
   - Forward `info@alsahrapml.com` to your email

---

## 🔒 Security Tips

1. **Enable Two-Factor Authentication (2FA):**
   - Go to Account Settings
   - Enable 2FA for extra security
   - Use an authenticator app (Google Authenticator, Authy)

2. **Keep Auto-Renewal Enabled:**
   - Prevents accidental domain expiration
   - You'll get email reminders before renewal

3. **Save Your Account Details:**
   - Write down your login email and password
   - Store in a secure password manager

4. **Check Email Regularly:**
   - Spaceship sends important notifications
   - Don't ignore renewal reminders

---

## 💡 Pro Tips

1. **Register for Multiple Years:**
   - If you plan to keep the domain long-term
   - Saves you from remembering to renew
   - Price: $4.99 (year 1) + $9.98 (year 2) = $14.97 for 2 years

2. **Set Up Email Forwarding:**
   - Forward `export@alsahrapml.com` to your personal email
   - Free email forwarding (if Spaceship offers it)

3. **Keep Contact Info Updated:**
   - Update your email if it changes
   - Important for renewal reminders

4. **Save Receipts:**
   - Keep confirmation emails
   - Useful for business records

---

## ❓ Troubleshooting

### Domain Not Showing in Dashboard?

- Wait a few minutes after purchase
- Refresh the page
- Check your email for confirmation
- Contact Spaceship support

### Can't Access DNS Settings?

- Make sure you're logged in
- Click on the domain name in your domain list
- Look for "DNS" or "DNS Management" tab
- Contact support if you can't find it

### DNS Changes Not Working?

- Wait longer (up to 48 hours)
- Double-check you entered the correct IPs
- Verify DNS propagation at dnschecker.org
- Clear your browser cache

### Payment Issues?

- Check your card has sufficient funds
- Verify card details are correct
- Try a different payment method
- Contact Spaceship support

---

## 📞 Spaceship Support

If you need help:

1. **Help Center:**
   - https://www.spaceship.com/support/
   - Search for answers to common questions

2. **Contact Support:**
   - Email: support@spaceship.com
   - Live chat (if available)
   - Support tickets

3. **Knowledge Base:**
   - Step-by-step guides
   - Video tutorials
   - FAQ section

---

## ✅ Checklist

After registration, make sure you've:

- [ ] Registered the domain successfully
- [ ] Received confirmation email
- [ ] Enabled WHOIS privacy protection
- [ ] Enabled auto-renewal (recommended)
- [ ] Added 4 A records for root domain
- [ ] Added CNAME record for www subdomain
- [ ] Configured custom domain in GitHub Pages
- [ ] Waited for DNS propagation
- [ ] Tested domain works (alsahrapml.com)
- [ ] Tested www subdomain (www.alsahrapml.com)
- [ ] Enabled HTTPS in GitHub Pages

---

## 🎉 Success!

Once everything is configured:

- ✅ Your domain is registered
- ✅ DNS is pointing to GitHub Pages
- ✅ Your site is live at `https://alsahrapml.com`
- ✅ Both www and non-www work
- ✅ HTTPS is enabled

**Congratulations! Your custom domain is set up!** 🚀

---

## 📚 Next Steps

1. **Test your website:**
   - Visit `https://alsahrapml.com`
   - Test all pages
   - Test tracking functionality
   - Test admin panel

2. **Set up email forwarding** (optional):
   - Forward `export@alsahrapml.com` to your email
   - Or set up professional email (if Spaceship offers it)

3. **Monitor your domain:**
   - Check expiry date regularly
   - Keep auto-renewal enabled
   - Update contact info if needed

---

**Need more help?** Check the `CUSTOM-DOMAIN-SETUP.md` guide for GitHub Pages configuration details!

