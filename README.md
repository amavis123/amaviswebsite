# Amavis.AI - Official Website

A modern, responsive website for Amavis.AI featuring advanced scrolljacking hero section, dual-direction partner tickers, and comprehensive AI service showcase.

## 🚀 Quick Start

This is a static website that can be deployed to any web server or hosting platform.

### Option 1: Local Development
```bash
# Navigate to the project directory
cd amavisai-home-site

# Serve with Python (Python 3)
python -m http.server 8000

# Or serve with Node.js (if you have http-server installed)
npx http-server -p 8000

# Visit http://localhost:8000
```

### Option 2: Deploy to Hosting Platforms

**Netlify:**
- Drag and drop the entire `amavisai-home-site` folder to Netlify
- Or connect your GitHub repository

**Vercel:**
- Import the project from GitHub
- Or use the Vercel CLI: `vercel --prod`

**GitHub Pages:**
- Push to a GitHub repository
- Enable GitHub Pages in repository settings

**Traditional Web Hosting:**
- Upload all files to your web server's public directory
- Ensure your server supports HTML5 and modern web standards

## 📁 Project Structure

```
amavisai-home-site/
├── index.html              # Main HTML file
├── favicon.png             # Site favicon
├── README.md               # This file
└── assets/
    ├── css/
    │   └── style.css       # Main stylesheet
    ├── js/
    │   └── main.js         # Main JavaScript functionality
    ├── images/
    │   ├── logos/          # Amavis.AI brand logos
    │   │   ├── amavis-logo.png
    │   │   └── amavis-wordmark.png
    │   ├── tech-partners/  # Technology partner logos
    │   │   ├── amazon-web-services.png
    │   │   ├── canva.png
    │   │   ├── claude.png
    │   │   ├── clickup.png
    │   │   ├── cursor.png
    │   │   ├── elevenlabs.png
    │   │   ├── figma.png
    │   │   ├── google.png
    │   │   ├── langchain.png
    │   │   ├── n8n.png
    │   │   ├── meta.png
    │   │   ├── microsoft.png
    │   │   ├── monday.png
    │   │   ├── openai.png
    │   │   ├── perplexity.png
    │   │   ├── salesforce.png
    │   │   ├── slack.png
    │   │   ├── stripe.png
    │   │   ├── x-twitter.png
    │   │   └── make.png
    │   └── heroes/         # Hero and service images
    │       ├── business-growth.png
    │       ├── ai-workshop.jpg
    │       └── build-deploy.jpg
    └── videos/
        └── demo.mp4        # Main demonstration video
```

## ✨ Key Features

### 🎨 Modern Design
- Clean, professional layout optimized for AI consulting services
- Responsive design that works on all devices
- Modern typography and spacing

### 🔄 Enhanced Hero Section
- **Scrolljacking Technology**: Immersive card-based progression system
- **Smart Navigation**: Automatic bypass system for navigation links and CTA buttons
- **Animated Background**: Floating geometric elements with enhanced visual effects
- **Progress Indicators**: Visual progress bar and navigation dots
- **Auto-play with Interactions**: Intelligent pause/resume based on user interactions

### 🎢 Partners Section
- **Dual Scrolling Tickers**: Top ticker (left-to-right) and bottom ticker (right-to-left)
- **20 Technology Partners**: Including OpenAI, Meta, Microsoft, Google, and more
- **Custom Logo Sizing**: Strategic emphasis on key partners
- **Hover Effects**: Animation pause and logo scaling on interaction
- **Smooth Performance**: Optimized animations using CSS transforms

### 🎯 Interactive Elements
- **Hybrid Service Cards**: Expandable cards with detailed service information
- **Smooth Scrolling**: Enhanced navigation with intelligent section targeting
- **Call-to-Action Integration**: Seamless calendar booking integration
- **Mobile Optimization**: Touch-friendly interactions and responsive layouts

## 🛠 Technical Details

### Performance Optimizations
- **Lazy Loading**: Images load as needed to improve initial page load
- **CSS Animations**: Hardware-accelerated transforms for smooth performance
- **Optimized Assets**: Compressed images and efficient file organization
- **Modern Web Standards**: HTML5, CSS3, and ES6+ JavaScript

### Browser Support
- Chrome 70+ ✅
- Firefox 65+ ✅
- Safari 12+ ✅
- Edge 79+ ✅

### Dependencies
- **Google Fonts**: Inter, Aileron, Montserrat
- **RemixIcon**: Modern icon library (CDN)
- **Cal.com**: Calendar booking integration

## 🎨 Customization

### Colors
Primary colors are defined in CSS variables in `assets/css/style.css`:
```css
:root {
    --color-primary: #000000;
    --color-secondary: #ffffff;
    --color-accent: #f8f9fa;
    /* ... more variables */
}
```

### Content Updates
- **Services**: Edit service descriptions in the HTML
- **Partner Logos**: Replace images in `assets/images/tech-partners/`
- **Contact**: Update Cal.com iframe URL for booking integration

### Typography
The website uses three main fonts:
- **Inter**: Primary body text and UI elements
- **Aileron**: Display and heading text
- **Montserrat**: Accent and decorative text

## 📊 Analytics & Tracking

To add analytics tracking:
1. Add your Google Analytics or other tracking code before the closing `</head>` tag
2. Ensure GDPR compliance if targeting EU users
3. Update privacy policy as needed

## 🔧 Maintenance

### Regular Updates
- Keep partner logos up to date
- Update service descriptions and pricing
- Refresh hero metrics and testimonials
- Monitor and update external dependencies

### Performance Monitoring
- Check Core Web Vitals regularly
- Monitor loading times and optimize as needed
- Test across different devices and browsers

## 📝 License

This website is proprietary to Amavis.AI. All rights reserved.

## 🤝 Support

For technical support or questions about this website:
- Email: [technical-support@amavis.ai]
- Website: [https://amavis.ai]

---

**Built with ❤️ for the AI revolution by Amavis.AI**