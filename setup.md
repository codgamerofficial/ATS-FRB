# Supabase Setup Guide

## 🔧 Quick Start Setup

### 1. Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up with GitHub, Google, or email
3. Create a new project

### 2. Get Your Credentials
1. Go to your project dashboard
2. Click on **Settings** → **API**
3. Copy your:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (starts with `eyJ`)

### 3. Configure Environment Variables

#### For Next.js (Web App)
1. Copy `.env.example` to `.env.local` in the root directory
2. Replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

#### For React Native (Mobile App)
1. Copy `react-native-app/.env.example` to `react-native-app/.env`
2. Replace the placeholder values:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   EXPO_PUBLIC_APP_NAME=ATS Resume Builder
   EXPO_PUBLIC_APP_VERSION=1.0.0
   ```

### 4. Database Setup

#### Option A: Use Pre-built Schemas
1. Go to **SQL Editor** in your Supabase dashboard
2. Run the SQL commands in this order:
   - `lib/supabase/schema.sql` (main schema)
   - `lib/supabase/collaboration-schema.sql` (collaboration features)

#### Option B: Quick Start (Minimal Setup)
1. Run `lib/supabase/minimal-schema.sql` for basic functionality

### 5. Enable Authentication
1. Go to **Authentication** → **Settings**
2. Configure your site URL: `http://localhost:3000` (for development)
3. Enable email authentication (if not already enabled)

### 6. Test the Setup
1. Start your development server: `npm run dev`
2. Try to sign up/sign in to test the connection
3. Check browser console for any errors

## 🛡️ Security Best Practices

### Environment Variables
- ✅ **Safe to commit**: `.env.example` files with placeholder values
- ❌ **Never commit**: `.env`, `.env.local`, or files with real credentials
- ✅ **Add to .gitignore**: All environment files except examples

### Database Policies
- All tables have Row Level Security (RLS) enabled
- Policies ensure users can only access their own data
- Public templates are readable by everyone

### API Keys
- **anon/public key**: Safe to use in client-side code
- **service_role key**: Never expose in client-side code
- **project URL**: Safe to share

## 🏗️ Database Schema

### Core Tables
- **profiles**: User profiles and information
- **templates**: Resume templates (public)
- **resumes**: User-created resumes

### Additional Features (when using collaboration schema)
- **resume_analytics**: Resume view/download tracking
- **resume_versions**: Version control for resumes

## 🚀 Deployment

### Vercel (Web App)
1. Add environment variables in Vercel dashboard
2. Go to **Settings** → **Environment Variables**
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Expo EAS Build (Mobile App)
1. Set environment variables in EAS
2. Or use `eas secrets:set` for secure storage

## 🔍 Troubleshooting

### Common Issues
1. **"supabaseUrl is required"**:
   - Check if environment variables are set
   - Restart your development server

2. **Authentication not working**:
   - Verify site URL in Supabase settings
   - Check if email confirmation is required

3. **Database connection errors**:
   - Confirm project is active (not paused)
   - Check if you're within rate limits

### Debug Mode
The apps include fallback handling for missing credentials:
- They'll run with placeholder data
- Console will show helpful error messages
- No crashes due to missing environment variables

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase project is active
3. Ensure environment variables are correctly set
4. Check Supabase dashboard for any service issues

## 🔄 Updating Schemas

When updating database schemas:
1. Use the `DROP POLICY IF EXISTS` statements in the schema files
2. Run migrations in the correct order
3. Test thoroughly before deploying to production

---

**Note**: The apps are designed to work gracefully even without Supabase configured, showing helpful error messages to guide setup.