#!/bin/bash
# Script to create GitHub repo and push code
# Run this after creating the repo on GitHub

echo "🚀 Pushing to GitHub..."
echo ""

# Create repo on GitHub (requires manual step first)
echo "📝 STEP 1: Create the repo on GitHub first:"
echo "   1. Go to: https://github.com/new"
echo "   2. Repository name: pumex-rag"
echo "   3. Description: RAG system for Pumex knowledge base"
echo "   4. Choose Public or Private"
echo "   5. DO NOT initialize with README/license"
echo "   6. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repo on GitHub..."

# Add remote and push
echo ""
echo "📤 Adding remote and pushing..."
git remote add origin https://github.com/kholl31/pumex-rag.git 2>/dev/null || git remote set-url origin https://github.com/kholl31/pumex-rag.git
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Your code is now on GitHub."
echo ""
echo "Next steps:"
echo "  1. Deploy to Railway: https://railway.app"
echo "  2. See CHATGPT_SETUP.md for ChatGPT integration"

