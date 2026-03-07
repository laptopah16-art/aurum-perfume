# Admin Dashboard White Screen - Fix Plan

## Root Cause Analysis

### Issue 1: AdminAuthProvider Not Wrapping App (CRITICAL)
**File:** aurum-admin/src/main.jsx
**Problem:** The App component is NOT wrapped with AdminAuthProvider
**Effect:** useAuth() hook throws error in all components - causes white screen

### Issue 2: Inconsistent Context Usage (Minor)
**Files:** Login.jsx, Header.jsx, Sidebar.jsx  
**Problem:** Using useContext(AdminAuthContext) directly instead of useAuth() hook
**Effect:** Inconsistent code pattern, potential issues if provider setup changes

## Fix Plan

### Step 1: Fix main.jsx - Add AdminAuthProvider
- Import AdminAuthProvider from context
- Wrap App component with AdminAuthProvider

### Step 2: Fix Login.jsx - Use useAuth() hook
- Replace useContext(AdminAuthContext) with useAuth() hook

### Step 3: Fix Header.jsx - Use useAuth() hook
- Replace useContext(AdminAuthContext) with useAuth() hook

### Step 4: Fix Sidebar.jsx - Use useAuth() hook
- Replace useContext(AdminAuthContext) with useAuth() hook

## Files to Edit
1. aurum-admin/src/main.jsx (CRITICAL)
2. aurum-admin/src/pages/Login.jsx
3. aurum-admin/src/components/Header.jsx
4. aurum-admin/src/components/Sidebar.jsx

