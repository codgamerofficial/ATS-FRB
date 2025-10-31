# ATS Resume Builder

A modern, professional resume builder with 3D splash screen, Supabase backend integration, and ATS optimization features. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 **3D Splash Screen** - Interactive Three.js powered loading experience
- 📝 **Multi-Step Resume Builder** - Intuitive form-based resume creation
- 🤖 **ATS Optimized** - Templates designed to pass Applicant Tracking Systems
- 💾 **Supabase Backend** - Secure data storage and user authentication
- 📱 **Responsive Design** - Works perfectly on all devices
- 📄 **PDF Export** - Download professional PDF resumes instantly
- 🎯 **Sample Resume** - Includes Saswata Dey's resume as an example
- 🔒 **Secure & Private** - Your data is encrypted and protected

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **State Management**: Zustand
- **PDF Generation**: jsPDF
- **Forms**: React Hook Form
- **Icons**: Lucide React

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ats-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the SQL schema from `lib/supabase/schema.sql` in your Supabase SQL editor

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── auth/              # Authentication pages
│   ├── builder/           # Resume builder interface
│   ├── home/              # Landing page
│   └── templates/         # Template gallery
├── components/            # Reusable React components
│   ├── 3d/               # Three.js components
│   ├── forms/            # Form components
│   ├── resume/           # Resume display components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   └── supabase/         # Supabase configuration
├── store/                # Zustand state management
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Usage

### Building a Resume

1. **Start Building**: Click "Get Started" or "Start Building Now"
2. **Personal Info**: Enter your contact information
3. **Summary**: Write a professional summary
4. **Experience**: Add your work experience
5. **Education**: Include your educational background
6. **Skills**: List your technical and soft skills
7. **Projects**: Showcase your notable projects
8. **Additional**: Add certifications, languages, and hobbies
9. **Download**: Export your resume as PDF

### Sample Resume

The application includes Saswata Dey's complete resume as an example. You can:
- View it by clicking "View Saswata's Resume Example" on the homepage
- Use it as a template by visiting `/builder?sample=saswata`
- Learn from the structure and content organization

### Supabase Database Schema

The application uses the following main tables:

- **profiles**: User profile information
- **resumes**: Resume data and metadata
- **templates**: Resume template definitions

Row Level Security (RLS) is enabled to ensure data privacy.

## Customization

### Adding New Templates

1. Create a new template component in `components/resume/templates/`
2. Add template metadata to the `templates` table in Supabase
3. Update the template selector in the builder

### Modifying Resume Sections

1. Update the TypeScript interfaces in `types/index.ts`
2. Modify the corresponding form components in `components/forms/`
3. Update the preview component in `components/resume/ResumePreview.tsx`
4. Adjust the PDF generator in `utils/pdfGenerator.ts`

### Styling Changes

The application uses Tailwind CSS with a custom configuration. Key files:
- `tailwind.config.js` - Tailwind configuration
- `app/globals.css` - Global styles and custom CSS

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## Acknowledgments

- **Saswata Dey** - For providing the sample resume data
- **Supabase** - For the excellent backend-as-a-service platform
- **Vercel** - For Next.js and deployment platform
- **Three.js** - For 3D graphics capabilities

---

Built with ❤️ for job seekers everywhere. Good luck with your applications!