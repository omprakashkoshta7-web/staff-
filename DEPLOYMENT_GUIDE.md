# Staff Portal Deployment Guide

## 🚀 Deployment Fixes Applied

### Issues Fixed:
1. **404 Errors**: Added SPA routing configuration
2. **Build Optimization**: Configured Vite for production builds
3. **Deployment Configuration**: Added platform-specific configs

### Files Added/Modified:
- `vite.config.ts` - Updated with SPA routing and build optimization
- `vercel.json` - Vercel deployment configuration
- `public/_redirects` - Netlify deployment configuration  
- `.htaccess` - Apache server configuration
- `package.json` - Added serve script

## 🔧 Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. The `vercel.json` file will handle SPA routing automatically
3. Environment variables are already configured in `.env`

### Option 2: Netlify
1. Connect your GitHub repository to Netlify
2. The `public/_redirects` file will handle SPA routing
3. Build command: `npm run build`
4. Publish directory: `dist`

### Option 3: Local Testing
```bash
# Build the application
npm run build

# Serve locally for testing
npm run serve
```

## 🌐 Environment Variables

The following environment variables are configured in `.env`:

```env
VITE_API_URL=https://gateway-202671058278.asia-south1.run.app
VITE_AUTH_SERVICE_URL=https://auth-202671058278.asia-south1.run.app
VITE_DESIGN_SERVICE_URL=https://design-202671058278.asia-south1.run.app
VITE_NOTIFICATION_SERVICE_URL=https://notification-202671058278.asia-south1.run.app
VITE_PRODUCT_SERVICE_URL=https://product-202671058278.asia-south1.run.app
VITE_FINANCE_SERVICE_URL=https://finance-202671058278.asia-south1.run.app
VITE_ADMIN_SERVICE_URL=https://admin-202671058278.asia-south1.run.app

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyBL28u26gcBmQUqhIANDj-PUi0C5BnmCvM
VITE_FIREBASE_AUTH_DOMAIN=chat-application-294a9.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=chat-application-294a9
VITE_FIREBASE_STORAGE_BUCKET=chat-application-294a9.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=492547915641
VITE_FIREBASE_APP_ID=1:492547915641:web:f3598ba50352ea6be779a8
VITE_FIREBASE_MEASUREMENT_ID=G-LPG8H0GEBG
```

## 🔍 Troubleshooting

### Common Issues:

1. **404 on Page Refresh**: 
   - Ensure SPA routing is configured (files added above)
   - Check that the deployment platform supports the configuration

2. **API Connection Issues**:
   - Verify environment variables are set correctly
   - Check CORS settings on backend services
   - Ensure Firebase configuration is valid

3. **Build Errors**:
   - Run `npm run build` locally to test
   - Check TypeScript errors with `npm run lint`

### Testing Checklist:
- [ ] Application builds successfully (`npm run build`)
- [ ] All routes work without 404 errors
- [ ] Authentication flow works
- [ ] API calls are successful
- [ ] Environment variables are loaded

## 📱 Features Included:
- Staff authentication with Firebase
- Role-based access control
- Order management queue
- Support ticket system
- Finance operations (refunds, payouts)
- Marketing campaign management
- Real-time updates and notifications

## 🔐 Security Features:
- JWT token authentication
- Role-based permissions
- Secure API endpoints
- CORS protection
- XSS protection headers