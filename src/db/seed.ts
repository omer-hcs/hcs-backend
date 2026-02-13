import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load env
dotenv.config({ path: resolve(__dirname, '../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const db = drizzle(pool, { schema });

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Clinic Settings
  console.log('Setting up Clinic Settings...');
  await db.insert(schema.clinicSettings).values({
    phone: "1-800-123-456",
    email: "info@hearingcare.com",
    address: "123 Health Street, Medical District",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    socialLinks: { 
        facebook: "https://facebook.com", 
        twitter: "https://twitter.com", 
        linkedin: "https://linkedin.com", 
        instagram: "https://instagram.com" 
    },
    operatingHours: [
        { day: 'Monday - Friday', open: '8:00 AM', close: '6:00 PM' },
        { day: 'Saturday', open: '9:00 AM', close: '2:00 PM' },
        { day: 'Sunday', close: 'Closed', isClosed: true }
    ],
    weekdayHours: "8:00 AM - 6:00 PM",
    saturdayHours: "9:00 AM - 2:00 PM",
    sundayHours: "Closed"
  }).onConflictDoNothing();

  // 2. Homepage Content
  console.log('Setting up Homepage Content...');
  await db.insert(schema.homepageContent).values({
    heroHeadline: "Experience Life's Sounds Clearly",
    heroSubheadline: "Professional hearing care services tailored to your needs. From comprehensive hearing tests to the latest digital hearing aids, we're here to help you hear better.",
    stats: [
        { label: 'Patients Served', value: '5,000+', icon: 'SafetyCertificateOutlined', desc: 'Trusted by thousands of clients' },
        { label: 'Years Experience', value: '25+', icon: 'SafetyCertificateOutlined', desc: 'Decades of clinical excellence' },
        { label: 'Certified Devices', value: '100%', icon: 'SafetyCertificateOutlined', desc: 'Only premium, authentic brands' },
        { label: 'Support Available', value: '24/7', icon: 'CalendarOutlined', desc: 'Always here when you need us' }
    ],
    whyUsHeadline: "Expert Care You Can Trust",
    whyUsSubheadline: "We combine clinical excellence with genuine compassion to deliver hearing care that truly makes a difference in your life.",
    whyUs: [
        { title: 'Award-Winning Audiologists', description: 'Our team of certified audiologists brings decades of experience and continuous training in the latest hearing technologies.' },
        { title: 'Premium Brands Only', description: 'We partner exclusively with world-leading hearing aid manufacturers to ensure you receive authentic, high-quality devices.' },
        { title: 'Latest Technology', description: 'Access to cutting-edge digital hearing aids with Bluetooth connectivity, AI noise reduction, and rechargeable batteries.' },
        { title: 'Lifetime Support', description: "Our commitment doesn't end at fitting. Enjoy unlimited adjustments, cleanings, and support for the life of your device." }
    ],
    ctaHeadline: "Ready to Hear Better?",
    ctaSubheadline: "Schedule your free consultation with our expert audiologists today and rediscover the joy of sound."
  }).onConflictDoNothing();

  // 3. About Page
  console.log('Setting up About Page...');
  await db.insert(schema.aboutPageContent).values({
    introHeadline: "Dedicated to your Hearing Health",
    missionStatement: "<p>For 25+ years, we've helped people reconnect with the sounds they love. We believe everyone deserves to experience the joy of sound.</p>",
    coreValues: [
        { title: 'Compassionate Care', description: 'We treat every patient with empathy, respect, and understanding. Your comfort and wellbeing are our top priorities.' },
        { title: 'Integrity & Trust', description: 'We provide honest, transparent recommendations and never pressure you into unnecessary services or products.' },
        { title: 'Excellence', description: 'We maintain the highest standards in clinical practice, continuing education, and patient outcomes.' },
        { title: 'Patient-Centered', description: 'Your unique needs, lifestyle, and preferences guide every recommendation and treatment plan we create.' },
        { title: 'Innovation', description: 'We stay at the forefront of hearing technology and treatment methods to offer you the best solutions.' },
        { title: 'Lifetime Support', description: "Our commitment doesn't end at your first appointment. We're here for you throughout your hearing journey." }
    ]
  }).onConflictDoNothing();

  // 4. Timeline
  console.log('Setting up Timeline...');
  const timelineItems = [
    { year: 1998, title: "Clinic Foundation", description: "Our clinic was founded with a mission to provide accessible hearing care." },
    { year: 2005, title: "Advanced Technology Integration", description: "Became early adopters of 100% digital hearing technology." },
    { year: 2012, title: "Expansion", description: "Moved to our current state-of-the-art medical district facility." },
    { year: 2020, title: "Tele-Audiology Launch", description: "Introduced remote adjustment and consultation services." },
    { year: 2023, title: "25th Anniversary", description: "Celebrating a quarter-century of helping our community hear better." }
  ];
  for (const item of timelineItems) {
    await db.insert(schema.aboutTimeline).values(item).onConflictDoNothing();
  }

  // 5. Services
  console.log('Setting up Services...');
  const services = [
    {
        title: "Comprehensive Hearing Assessments",
        description: "State-of-the-art diagnostic testing to evaluate your hearing health and identify any issues.",
        duration: "45-60 minutes",
        isFree: true,
        inclusions: [
            "Pure tone audiometry testing",
            "Speech recognition assessment",
            "Tympanometry evaluation",
            "Otoscopic examination",
            "Detailed results explanation"
        ]
    },
    {
        title: "Precision Hearing Aid Fitting",
        description: "Expert fitting and programming ensuring comfort and optimal sound quality tailored to your ears.",
        duration: "60 minutes",
        isFree: false,
        inclusions: [
            "Real Ear Measurement (REM)",
            "Custom ear mold impressions",
            "Bluetooth pairing assistance",
            "Personalized sound fine-tuning",
            "Usage & care training"
        ]
    },
    {
        title: "Tinnitus Management Solutions",
        description: "Specialized counseling and sound therapy options to help manage ringing or buzzing in the ears.",
        duration: "45-60 minutes",
        isFree: false,
        inclusions: [
            "Tinnitus pitch & loudness matching",
            "Sound therapy device demonstration",
            "Cognitive behavioral strategies",
            "Sleep hygiene counseling",
            "Ongoing management plan"
        ]
    }
  ];
  for (const service of services) {
    await db.insert(schema.services).values(service).onConflictDoNothing();
  }

  // 6. Products
  console.log('Setting up Products...');
  const products = [
    {
        name: "Phonak Virto Paradise Titanium",
        style: "CIC",
        price: 2499,
        description: "Nearly invisible hearing solution made from premium titanium for durability and comfort.",
        imageUrl: "/images/p1.jpg",
        features: ["Titanium shell", "Natural sound", "Custom molded", "Automatic adjustment"],
        isActive: true
    },
    {
        name: "Starkey SoundLens Synergy IQ",
        style: "CIC",
        price: 2699,
        description: "AI powered invisible-in-canal hearing aid with superior sound processing.",
        imageUrl: "/images/p2.jpg",
        features: ["Artificial intelligence", "Music optimization", "Feedback cancellation", "Wireless connectivity"],
        isActive: true
    },
    {
        name: "Signia Silk X",
        style: "CIC",
        price: 1899,
        description: "Instant fit hearing aid with crystal clear sound and ultra-discreet design.",
        imageUrl: "/images/p3.jpg",
        features: ["Instant fit (no mold)", "Crystal clear sound", "Remote control ready", "Speech focus"],
        isActive: true
    },
    {
        name: "Widex Moment Sheer",
        style: "RIC",
        price: 2299,
        description: "Uses ZeroDelay technology for the most natural sound experience.",
        imageUrl: "/images/p4.jpg",
        features: ["ZeroDelay technology", "PureSound experience", "Rechargeable", "Water resistant"],
        isActive: true
    }
  ];
  for (const product of products) {
    // Note: Schema has RIC, BTE, CIC as enum values.
    await db.insert(schema.products).values(product as any).onConflictDoNothing();
  }

  // 7. Blog Articles (Guides)
  console.log('Setting up Blog Articles...');
  const articles = [
    {
        title: "Complete Guide to Hearing Loss",
        slug: "complete-guide-to-hearing-loss",
        category: "Basics",
        readTime: 10,
        excerpt: "Understanding types, causes, and treatment options for hearing loss",
        contentBody: "<h3>Types of Hearing Loss</h3><p>Not all hearing loss is the same...</p>",
        isPublished: true,
        topicsCovered: ['Types of hearing loss', 'Common causes', 'When to seek help', 'Treatment options']
    },
    {
        title: "Choosing the Right Hearing Aid",
        slug: "choosing-the-right-hearing-aid",
        category: "Hearing Aids",
        readTime: 15,
        excerpt: "A comprehensive comparison of styles, features, and technology levels",
        contentBody: "<h3>Styles comparison</h3><p>A hearing aid is only as good as its fitting...</p>",
        isPublished: true,
        topicsCovered: ['Styles comparison', 'Technology levels', 'Pricing guide', 'Maintenance tips']
    }
  ];
  for (const article of articles) {
    await db.insert(schema.articles).values(article).onConflictDoNothing();
  }

  // 8. FAQs
  console.log('Setting up FAQs...');
  const faqs = [
    { 
        category: 'General', 
        question: 'How do I know if I have hearing loss?', 
        answer: 'Common signs include difficulty understanding conversations in noisy environments, frequently asking people to repeat themselves...', 
        orderIndex: 0 
    },
    { 
        category: 'General', 
        question: 'Is the initial consultation really free?', 
        answer: 'Yes! We believe everyone deserves access to hearing health information.', 
        orderIndex: 1 
    },
    { 
        category: 'Hearing Aids', 
        question: 'How much do hearing aids cost?', 
        answer: 'Hearing aid prices vary depending on technology level and features, typically ranging from $1,000 to $4,000 per ear.', 
        orderIndex: 2 
    }
  ];
  for (const faq of faqs) {
    await db.insert(schema.faqs).values(faq).onConflictDoNothing();
  }

  console.log('✅ Seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seeding failed:');
  console.error(err);
  process.exit(1);
});
