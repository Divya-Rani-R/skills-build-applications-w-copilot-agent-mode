#!/bin/bash

# OctoFit Tracker API Test Script
# This script tests the API endpoints after the server starts

API_BASE_URL="http://localhost:8000"
CODESPACE_NAME="${CODESPACE_NAME}"

if [ -n "$CODESPACE_NAME" ]; then
  API_BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
fi

echo "🧪 Testing OctoFit Tracker API"
echo "Base URL: $API_BASE_URL"
echo ""

# Function to test endpoint
test_endpoint() {
  local method=$1
  local endpoint=$2
  local description=$3
  
  echo "Testing: $description"
  echo "  $method $endpoint"
  
  if [ "$method" = "GET" ]; then
    curl -s -X GET "$API_BASE_URL$endpoint" | python3 -m json.tool 2>/dev/null || echo "Connection error"
  fi
  
  echo ""
}

# Test endpoints
echo "=== Basic Endpoints ==="
test_endpoint "GET" "/" "Root endpoint"
test_endpoint "GET" "/health" "Health check"

echo ""
echo "=== Users Endpoints ==="
test_endpoint "GET" "/api/users/" "Get all users"

echo ""
echo "=== Teams Endpoints ==="
test_endpoint "GET" "/api/teams/" "Get all teams"

echo ""
echo "=== Activities Endpoints ==="
test_endpoint "GET" "/api/activities/" "Get all activities"

echo ""
echo "=== Leaderboard Endpoints ==="
test_endpoint "GET" "/api/leaderboard/" "Get leaderboard"

echo ""
echo "=== Workouts Endpoints ==="
test_endpoint "GET" "/api/workouts/" "Get all workouts"

echo "✅ API tests complete!"
