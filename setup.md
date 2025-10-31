# Setup Instructions

## Quick Setup Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (usually 2-3 minutes)
3. Go to Settings > API in your Supabase dashboard
4. Copy your Project URL and anon/public key

### 3. Configure Environment Variables

Update the `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up Database Schema

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `lib/supabase/schema.sql`
4. Run the SQL script

### 5. Start Development Server

```bash
npm run dev
```

### 6. Open Application

Navigate to [http://localhost:3000](http://localhost:3000)

## Features to Test

1. **3D Splash Screen** - Should load with animated 3D elements
2. **Sample Resume** - Click "View Saswata's Resume Example" to see pre-loaded data
3. **Resume Builder** - Navigate through all 7 steps of the form
4. **PDF Export** - Download functionality (requires form data)
5. **Responsive Design** - Test on different screen sizes

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify your environment variables are correct
   - Check that your Supabase project is active
   - Ensure the database schema has been applied

2. **3D Elements Not Loading**
   - Check browser console for WebGL errors
   - Ensure your browser supports WebGL
   - Try refreshing the page

3. **PDF Download Not Working**
   - Ensure you have filled out at least the personal information
   - Check browser console for JavaScript errors
   - Try a different browser

4. **Build Errors**
   - Run `npm install` again
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check Node.js version (requires 18+)

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure Supabase project is properly configured
4. Try the application in an incognito/private browser window

## Next Steps

After setup:
1. Customize the templates in `components/resume/`
2. Add your own branding and colors in `tailwind.config.js`
3. Deploy to Vercel or your preferred platform
4. Set up custom domain (optional)

## Production Deployment

For production deployment:
1. Update `NEXT_PUBLIC_APP_URL` to your production domain
2. Configure Supabase authentication settings
3. Set up proper CORS policies in Supabase
4. Enable RLS policies for security