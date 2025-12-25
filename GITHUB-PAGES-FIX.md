# Fix GitHub Pages 404 Error

## Common Causes & Solutions

### ✅ Solution 1: Check Repository Settings

1. **Go to your GitHub repository**
2. **Click "Settings"** (top menu)
3. **Click "Pages"** (left sidebar)
4. **Check these settings:**
   - **Source:** Should be set to a branch (usually `main` or `master`)
   - **Branch:** Select `main` (or `master`) and `/ (root)` folder
   - **Save**

### ✅ Solution 2: Verify File Structure

Your files MUST be in the **root** of your repository:

```
your-repo/
├── index.html          ← MUST be here
├── tracking.html
├── admin.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── tracking.js
│   ├── admin.js
│   ├── auth.js
│   └── translations.js
└── logo.svg
```

**NOT like this:**
```
your-repo/
└── AL SAHRA PRECIOUS METALS/  ← WRONG!
    └── index.html
```

### ✅ Solution 3: Check Branch Name

1. **Go to repository Settings → Pages**
2. **Make sure you're deploying from:**
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`

### ✅ Solution 4: Repository Must Be Public

**GitHub Pages FREE tier only works with PUBLIC repositories!**

1. **Go to Settings → General**
2. **Scroll down to "Danger Zone"**
3. **Change repository visibility to Public**
4. **Or upgrade to GitHub Pro** ($4/month) for private repos

### ✅ Solution 5: Wait for Deployment

After making changes:
1. **Wait 1-5 minutes** for GitHub to rebuild
2. **Check Actions tab** to see if deployment succeeded
3. **Clear browser cache** (Ctrl+Shift+R or Cmd+Shift+R)

### ✅ Solution 6: Check File Names (Case Sensitive)

GitHub Pages is case-sensitive! Make sure:
- `index.html` (lowercase 'i')
- `tracking.html` (lowercase 't')
- `admin.html` (lowercase 'a')

### ✅ Solution 7: Use `/docs` Folder (Alternative)

If root doesn't work:

1. **Create a `docs` folder** in your repository
2. **Move ALL files** into `docs` folder:
   ```
   your-repo/
   └── docs/
       ├── index.html
       ├── tracking.html
       ├── admin.html
       ├── css/
       ├── js/
       └── logo.svg
   ```
3. **In Settings → Pages:**
   - Source: `main` branch
   - Folder: `/docs`
4. **Commit and push**

---

## Step-by-Step Fix

### Step 1: Verify Your Repository Structure

Run this in Terminal (in your project folder):
```bash
ls -la
```

You should see `index.html` directly, not in a subfolder.

### Step 2: Check GitHub Pages Settings

1. Go to: `https://github.com/YOUR-USERNAME/YOUR-REPO/settings/pages`
2. Verify:
   - Source: `Deploy from a branch`
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
3. Click **Save**

### Step 3: Check Repository Visibility

1. Go to: `https://github.com/YOUR-USERNAME/YOUR-REPO/settings`
2. Scroll to bottom
3. If it says "Private", change to "Public" (or upgrade to Pro)

### Step 4: Verify Files Are Committed

Make sure all files are committed and pushed:

```bash
git status
```

If files show as "untracked" or "modified":
```bash
git add .
git commit -m "Initial commit"
git push
```

### Step 5: Check GitHub Actions

1. Go to **Actions** tab in your repository
2. Look for "pages build and deployment"
3. Check if it succeeded (green checkmark) or failed (red X)
4. If failed, click to see error details

### Step 6: Access Your Site

Your site should be at:
- `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

**Note:** It might take 1-5 minutes after pushing changes.

---

## Quick Test

1. **Verify index.html exists:**
   ```bash
   ls index.html
   ```

2. **Check if it's in root:**
   ```bash
   pwd
   # Should show your repo root, not a subfolder
   ```

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Fix GitHub Pages"
   git push
   ```

4. **Wait 2-3 minutes**, then visit:
   `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## Still Not Working?

### Option A: Use Netlify Instead (Easier!)

1. Go to: https://app.netlify.com
2. Drag your folder to deploy
3. Done! (No 404 issues)

### Option B: Check GitHub Status

1. Go to: https://www.githubstatus.com
2. Check if GitHub Pages is having issues

### Option C: Contact GitHub Support

If nothing works, contact GitHub support with:
- Repository URL
- Error message
- Screenshot of Pages settings

---

## Common Mistakes

❌ **Files in subfolder** - Move to root
❌ **Private repository** - Make public or upgrade
❌ **Wrong branch** - Use `main` or `master`
❌ **Wrong folder** - Use `/ (root)` not `/docs`
❌ **Not waiting** - Give it 2-5 minutes to deploy
❌ **Case sensitivity** - `Index.html` ≠ `index.html`

---

## Your Site URL Format

If your repository is:
- **Username:** `yourusername`
- **Repository:** `alsahra-website`

Your site will be at:
- `https://yourusername.github.io/alsahra-website/`

**Note:** The repository name becomes part of the URL!

---

## Need Custom Domain?

After GitHub Pages works:

1. **In repository Settings → Pages**
2. **Add custom domain:** `alsahrapml.com`
3. **Update DNS** at your domain registrar:
   - Add CNAME: `@` → `yourusername.github.io`
   - Or A records (check GitHub docs for IPs)

---

**Most common fix: Make sure repository is PUBLIC and files are in ROOT folder!** ✅





