const { execSync } = require('child_process');

console.log('🚀 Building mobile app...');

try {
  console.log('📦 Building Next.js app...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('📱 Preparing Capacitor...');
  execSync('npx cap copy', { stdio: 'inherit' });
  
  console.log('🔄 Syncing platforms...');
  execSync('npx cap sync', { stdio: 'inherit' });
  
  console.log('✅ Mobile app ready!');
  console.log('📱 Android: npx cap run android');
  console.log('🍎 iOS: npx cap run ios');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
}