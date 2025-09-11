# Aadhaar & DBT Awareness Website

A student-friendly educational website to help understand the difference between Aadhaar-linked and DBT-enabled bank accounts, with clear explanations and resources.

## 🎯 Purpose

This website aims to enhance student awareness about the crucial difference between:
- **Aadhaar-linked bank accounts** (basic KYC compliance)
- **DBT-enabled Aadhaar-seeded accounts** (required for government benefit transfers)

Many students miss out on scholarships, subsidies, and other benefits simply because they don't understand this distinction or haven't properly enabled DBT on their accounts.

## ✨ Features

- **Clear Comparison**: Side-by-side explanation of linked vs DBT-enabled accounts
- **Step-by-step Guide**: Simple instructions for enabling DBT
- **Comprehensive FAQ**: Answers to common student questions
- **Official Resources**: Links to government portals and documentation
- **Mobile Responsive**: Works seamlessly on all devices
- **Accessible Design**: Screen reader compatible with proper ARIA labels
- **Interactive Elements**: Accordion FAQs and smooth navigation

## 🚀 Quick Start

### Option 1: Simple Setup (Recommended)
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. The website works entirely with static files - no server required!

### Option 2: Local Development Server
```bash
# If you have Python installed
python -m http.server 8000

# If you have Node.js installed
npx http-server

# Then visit http://localhost:8000
```

## 📁 Project Structure

```
aadhaar-dbt-awareness-website/
├── index.html              # Main landing page
├── faq.html                # Detailed FAQ page
├── resources.html          # Official resources and links
├── css/
│   └── styles.css          # Complete styling and responsive design
├── js/
│   └── script.js           # Interactive functionality
├── images/                 # For future graphics/infographics
├── assets/                 # Additional resources
└── README.md              # This file
```

## 🎨 Design Features

- **Student-Friendly**: Clean, modern design with easy-to-read typography
- **Color Scheme**: Professional blue-purple gradient with accessible contrast ratios
- **Typography**: Inter font family for optimal readability
- **Mobile-First**: Responsive design that works on phones, tablets, and desktops
- **Accessibility**: WCAG 2.1 compliant with proper semantic HTML

## 🛠 Technologies Used

- **HTML5**: Semantic markup with proper accessibility features
- **CSS3**: Modern flexbox and grid layouts, custom properties
- **Vanilla JavaScript**: No frameworks - lightweight and fast loading
- **Progressive Enhancement**: Works even with JavaScript disabled

## 📱 Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Educational Content

### What's Covered

1. **Key Differences**: Clear explanation of Aadhaar-linked vs DBT-enabled accounts
2. **Process Guide**: Step-by-step instructions for enabling DBT
3. **FAQ Section**: 10+ common questions with detailed answers
4. **Official Resources**: Government portals, helpline numbers, and official documentation
5. **Troubleshooting**: Common issues and their solutions

### Target Audience

- College and university students
- Recent graduates applying for government schemes
- Anyone needing to receive DBT benefits
- Educational institutions for awareness programs

## 🚀 Deployment Options

### GitHub Pages (Free)
1. Fork this repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" → main branch
4. Your site will be live at `https://yourusername.github.io/aadhaar-dbt-awareness-website/`

### Netlify (Free)
1. Create account at netlify.com
2. Drag and drop your project folder to deploy
3. Automatic deployments from Git repository

### Vercel (Free)
```bash
npm i -g vercel
vercel --name my-aadhaar-website
```

### Traditional Web Hosting
Simply upload all files to your web server's public directory.

## 🔧 Customization

### Content Updates
- Edit HTML files directly to update information
- Modify FAQ section in `faq.html` 
- Add new resources in `resources.html`

### Styling Changes
- Primary colors: Modify CSS custom properties in `styles.css`
- Typography: Update font-family declarations
- Layout: Adjust grid and flexbox properties

### Adding Features
- New pages: Create HTML files and link them in navigation
- Interactive elements: Extend `script.js`
- Graphics: Add images to `/images` directory

## 📋 Content Guidelines

When updating content, ensure:
- Information remains accurate and up-to-date
- All government links are official (.gov.in domains)
- Language stays student-friendly and accessible
- Disclaimer emphasizes educational purpose only

## 🤝 Contributing

This is an educational project. Contributions welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers/devices
5. Submit a pull request

### Areas for Contribution
- Updated government links and procedures
- Additional FAQ questions
- Multi-language support
- Improved accessibility features
- Performance optimizations

## 📞 Support

For questions about the website:
- Check the Issues section of this repository
- Refer users to official government helplines for specific account issues

## ⚖️ License

This project is open source and available under the MIT License.

## 🔗 Official Resources Referenced

- [UIDAI (Aadhaar Authority)](https://uidai.gov.in/)
- [DBT Mission Portal](https://dbtbharat.gov.in/)
- [Reserve Bank of India](https://www.rbi.org.in/)
- [National Payments Corporation of India](https://www.npci.org.in/)

## 💡 Disclaimer

This website is for **educational purposes only**. Always verify information with official government sources and your bank. Procedures may vary by bank and change over time. We are not affiliated with any government agency.

---

**Built with ❤️ for student awareness and financial inclusion**
