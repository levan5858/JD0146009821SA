#!/bin/bash

# Commands to deploy Firebase changes to GitHub

echo "Deploying Firebase configuration to GitHub..."
echo ""

cd "/Users/work1/Desktop/AL SAHRA PRECIOUS METALS"

# Check git status
echo "Checking changes..."
git status

echo ""
echo "Adding all changes..."
git add .

echo ""
echo "Committing changes..."
git commit -m "Add Firebase configuration for persistent storage"

echo ""
echo "Pushing to GitHub..."
git push

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Wait 2-3 minutes for GitHub Pages to update, then test your website."


