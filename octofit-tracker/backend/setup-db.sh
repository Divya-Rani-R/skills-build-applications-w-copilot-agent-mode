#!/bin/bash

# OctoFit Tracker Database Setup and Testing Script
# This script seeds the database and then tests the API endpoints

set -e

echo "🚀 OctoFit Tracker Database Setup"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if MongoDB is running
echo -e "${BLUE}Checking MongoDB connection...${NC}"
if ! ps aux | grep -i mongod | grep -v grep > /dev/null; then
  echo -e "${YELLOW}⚠️  Warning: mongod process not detected${NC}"
  echo "   Make sure MongoDB is running on port 27017"
  echo ""
fi

# Build backend
echo -e "${BLUE}Building backend...${NC}"
npm run build > /dev/null 2>&1
echo -e "${GREEN}✓ Backend built${NC}"
echo ""

# Run seed script
echo -e "${BLUE}Seeding database...${NC}"
npm run dev src/scripts/seed.ts

echo ""
echo -e "${GREEN}✅ Database setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Start the API server: npm run dev"
echo "  2. Test the API endpoints: ./test-api.sh"
echo "  3. Or test manually:"
echo "     curl http://localhost:8000/"
echo "     curl http://localhost:8000/api/users/"
echo "     curl http://localhost:8000/api/teams/"
echo "     curl http://localhost:8000/api/activities/"
echo "     curl http://localhost:8000/api/leaderboard/"
echo "     curl http://localhost:8000/api/workouts/"
echo ""
