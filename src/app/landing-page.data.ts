export type NavItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  titleSuffix: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  imageAlt: string;
  imageSrc: string;
};

export type Feature = {
  icon: 'classes' | 'mentors' | 'support';
  title: string;
  description: string;
};

export type FacultyMember = {
  name: string;
  title: string;
  credential: string;
  experience: string;
};

export type Testimonial = {
  name: string;
  detail: string;
  quote: string;
  avatarInitials: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  billing: string;
  badge?: string;
  featured?: boolean;
  features: string[];
  ctaLabel: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type NewsletterContent = {
  titlePrefix: string;
  titleAccent: string;
  description: string;
  inputPlaceholder: string;
  buttonLabel: string;
  note: string;
};

export type LandingPageContent = {
  brand: string;
  topBanner: string;
  navItems: NavItem[];
  hero: HeroContent;
  features: Feature[];
  faculty: FacultyMember[];
  testimonials: Testimonial[];
  plans: PricingPlan[];
  faqs: FaqItem[];
  newsletter: NewsletterContent;
};

export const landingPageContent: LandingPageContent = {
  brand: 'LearningLab',
  topBanner: 'Admissions are open for the next live batch.',
  navItems: [
    { label: 'Home', href: '#top' },
    { label: 'Courses', href: '#programs' },
    { label: 'Live Classes', href: '#features' },
    { label: 'Results', href: '#results' }
  ],
  hero: {
    eyebrow: 'NEW BATCH STARTING SOON',
    titlePrefix: "Master Your Exams with India's",
    titleAccent: 'Top Live',
    titleSuffix: 'Learning Platform',
    description:
      'Expert coaching for Grades 6-12 and IIT-JEE preparation. Join over 50,000 successful students across the nation.',
    primaryCtaLabel: 'Enquire Now',
    primaryCtaHref: '#admissions',
    secondaryCtaLabel: 'Download App',
    secondaryCtaHref: '#top',
    imageAlt: 'Student holding the learning app preview',
    imageSrc: 'design/hero-student.png'
  },
  features: [
    {
      icon: 'classes',
      title: 'Interactive Live Classes',
      description: 'Engage in real-time with top educators, ask questions, and participate in polls instantly.'
    },
    {
      icon: 'mentors',
      title: 'Expert Mentors',
      description: 'Learn directly from IITians and subject matter experts with years of coaching experience.'
    },
    {
      icon: 'support',
      title: '24/7 Doubt Support',
      description: 'Never get stuck. Get your queries resolved instantly by our dedicated team of doubt-solving experts.'
    }
  ],
  faculty: [
    {
      name: 'Dr. Arjun Sharma',
      title: 'Senior Physics Faculty',
      credential: 'IIT Delhi Alumnus',
      experience: '15+ Years Experience'
    },
    {
      name: 'Prof. Sarah Khan',
      title: 'Mathematics Expert',
      credential: 'IISc Bangalore Alumna',
      experience: '12+ Years Experience'
    },
    {
      name: 'Dr. Rajesh Iyer',
      title: 'Chemistry Head',
      credential: 'IIT Bombay Alumnus',
      experience: '20+ Years Experience'
    },
    {
      name: 'Ms. Meera Reddy',
      title: 'Senior Biology Faculty',
      credential: 'AIIMS Delhi Alumna',
      experience: '10+ Years Experience'
    }
  ],
  testimonials: [
    {
      name: 'Rahul Verma',
      detail: 'IIT-JEE Aspirant',
      quote:
        'The live interactive classes made complex physics concepts so easy to understand. The doubt support team is incredible and helped me clear my basics within minutes.',
      avatarInitials: 'RV'
    },
    {
      name: 'Ananya Singh',
      detail: 'NEET 2024 Candidate',
      quote:
        'Studying with expert mentors from AIIMS gave me the right direction for my biology preparation. The personalised study material is way ahead of anything else available online.',
      avatarInitials: 'AS'
    },
    {
      name: 'Karthik Iyer',
      detail: 'Class 10 Board Topper',
      quote:
        "I boosted my maths score by 30% in just two months thanks to the regular tests, smart doubt support, and clear performance analysis. LearningLab truly cares about every student's growth.",
      avatarInitials: 'KI'
    }
  ],
  plans: [
    {
      name: 'Basic',
      price: '₹2,999',
      billing: '/month',
      features: ['Daily Live Classes', 'Core Study Materials', 'Weekly Mock Tests'],
      ctaLabel: 'Join Now'
    },
    {
      name: 'Premium',
      price: '₹4,999',
      billing: '/month',
      badge: 'Most Popular',
      featured: true,
      features: ['Everything in Basic', '24/7 Priority Doubt Support', 'Personalized Mentorship', 'Recorded Session Library'],
      ctaLabel: 'Start Your Free Trial'
    },
    {
      name: 'Elite',
      price: '₹7,999',
      billing: '/month',
      features: ['Everything in Premium', '1-on-1 Session Weekly', 'Physical Study Material Kits'],
      ctaLabel: 'Join Now'
    }
  ],
  faqs: [
    {
      question: 'What classes do you cover?',
      answer:
        'We provide comprehensive coaching for students in Grades 6-12 across all major boards (CBSE, ICSE, and State Boards), along with specialized preparation for competitive exams like IIT-JEE and NEET.'
    },
    {
      question: 'How do live classes work?',
      answer:
        'Our live classes are held on our proprietary interactive platform. Students can see and hear the teacher, ask questions in real-time via chat or audio, and participate in live polls and quizzes during the session.'
    },
    {
      question: 'Can I watch recordings later?',
      answer:
        'Yes. Every live class is recorded and uploaded to your personal dashboard within 2 hours. You can watch those recordings anytime, anywhere, and as many times as you need for revision.'
    },
    {
      question: 'What is the batch size?',
      answer:
        "To ensure personalized attention, we keep our batch sizes small. Regular batches typically have 30-40 students, allowing mentors to track each student's progress and address individual doubts effectively."
    },
    {
      question: 'How is doubt solving handled?',
      answer:
        'We have a dedicated 24/7 doubt support feature. Students can upload a photo of their query or type it out, and our expert doubt-solving team provides detailed solutions within minutes.'
    }
  ],
  newsletter: {
    titlePrefix: 'Stay Ahead in Your',
    titleAccent: 'Learning Journey',
    description:
      'Get the latest exam tips, study strategies, and important updates delivered straight to your inbox. Join our community of high achievers.',
    inputPlaceholder: 'Enter your email address',
    buttonLabel: 'Subscribe Now',
    note: 'No spam, only valuable learning resources.'
  }
};
