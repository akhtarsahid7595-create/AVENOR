const fs = require('fs');
const path = require('path');

const indexContent = fs.readFileSync('index.html', 'utf-8');

// Extract common parts
const headToNavEndMatch = indexContent.match(/([\s\S]*?)<section class="hero"/);
const headToNavEnd = headToNavEndMatch ? headToNavEndMatch[1] : '';

const leadFormToEndMatch = indexContent.match(/(<!-- ===== LEAD FORM ===== -->[\s\S]*)/);
const leadFormToEnd = leadFormToEndMatch ? leadFormToEndMatch[1] : '';

const pages = [
  {
    filename: 'google-ads.html',
    title: 'Google Ads Management | Avenor',
    heroTag: 'Google Ads',
    heroTitle: 'Capture <span class="gradient-text">High-Intent</span> Customers',
    heroSubtitle: 'We build Google Ads campaigns that target people who are actively searching for your services right now. Maximize ROI and dominate search results.',
    benefits: [
      { title: 'Keyword Domination', desc: 'We bid on the exact keywords your customers are typing into Google.' },
      { title: 'Conversion Tracking', desc: 'Know exactly which click turned into a paying customer.' },
      { title: 'Ad Copy That Converts', desc: 'We write compelling ads that make users click yours instead of competitors.' }
    ]
  },
  {
    filename: 'meta-ads.html',
    title: 'Meta Ads Management | Avenor',
    heroTag: 'Meta Ads',
    heroTitle: 'Turn Scrolls into <span class="gradient-text">Sales</span>',
    heroSubtitle: 'Disrupt the timeline. We create hyper-targeted Facebook and Instagram ads that grab attention, generate leads, and scale your brand.',
    benefits: [
      { title: 'Precision Targeting', desc: 'Show your ads only to people most likely to buy your product or service.' },
      { title: 'Creative Testing', desc: 'We test multiple angles and creatives to find the winning combination.' },
      { title: 'Retargeting Campaigns', desc: "Bring back website visitors who didn't convert the first time." }
    ]
  },
  {
    filename: 'automation.html',
    title: 'Business Automation | Avenor',
    heroTag: 'Automation',
    heroTitle: 'Automate & <span class="gradient-text">Scale</span>',
    heroSubtitle: 'Stop doing manual data entry. We build Zapier/Make automations that connect your apps, follow up with leads, and save you 20+ hours a week.',
    benefits: [
      { title: 'Instant Lead Follow-ups', desc: 'Automatically text and email leads the second they submit a form.' },
      { title: 'CRM Integration', desc: 'Sync all your leads seamlessly into HubSpot, GoHighLevel, or any CRM.' },
      { title: 'Custom Workflows', desc: 'Tailored automated solutions to replace your repetitive daily tasks.' }
    ]
  }
];

pages.forEach(page => {
  // Replace title in head
  let pageHead = headToNavEnd.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);
  // Update nav links so they point correctly if they used index.html#...
  pageHead = pageHead.replace(/href="#/g, 'href="index.html#');
  
  // Custom Content
  const customContent = `
    <!-- ===== SERVICE HERO ===== -->
    <header class="hero" style="min-height: 60vh; padding-top: 180px; padding-bottom: 80px;">
        <div class="container hero-inner">
            <div class="hero-content reveal-up" style="max-width: 800px; margin: 0 auto; text-align: center;">
                <div class="hero-tagline">${page.heroTag}</div>
                <h1 class="hero-heading" style="font-size: clamp(3rem, 6vw, 4.5rem); line-height: 1.1;">${page.heroTitle}</h1>
                <p class="hero-sub" style="font-size: 1.25rem; max-width: 650px; margin: 1.5rem auto;">${page.heroSubtitle}</p>
                <div class="hero-ctas" style="justify-content: center;">
                    <a href="#contact" class="btn btn-primary btn-lg">Get a Free Proposal</a>
                </div>
            </div>
        </div>
    </header>

    <!-- ===== BENEFITS ===== -->
    <section class="benefits" style="padding: 60px 0 100px;">
        <div class="container">
            <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                ${page.benefits.map((b, i) => `
                <div class="benefit-card reveal-up delay-${i+1}" style="background: var(--surface); padding: 2.5rem; border-radius: 20px; border: 1px solid var(--border);">
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #fff;">${b.title}</h3>
                    <p style="color: var(--text-secondary);">${b.desc}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
  `;

  const finalHtml = pageHead + customContent + leadFormToEnd;
  fs.writeFileSync(page.filename, finalHtml);
  console.log(`Created ${page.filename}`);
});
