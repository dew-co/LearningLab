import type { FooterContactItem, FooterLink, FooterSocialLink } from './components/site-footer/site-footer.component';
import type { HeaderAction, HeaderLink } from './components/site-header/site-header.component';
import {
  landingPageContent,
  type FaqItem,
  type Feature,
  type FacultyMember,
  type HeroContent,
  type NewsletterContent,
  type PricingPlan,
  type Testimonial
} from './landing-page.data';
import {
  SITE_BRAND_NAME,
  SITE_FOOTER_CONTACT_ITEMS,
  SITE_FOOTER_DESCRIPTION,
  SITE_FOOTER_LEGAL_LINKS,
  SITE_FOOTER_QUICK_LINKS,
  SITE_FOOTER_SOCIAL_LINKS,
  SITE_HEADER_ACTIONS,
  SITE_NAV_ITEMS
} from './site.config';

export type SiteChromeContent = {
  brandName: string;
  navItems: HeaderLink[];
  headerActions: HeaderAction[];
  footerDescription: string;
  footerQuickLinks: FooterLink[];
  footerContactItems: FooterContactItem[];
  footerSocialLinks: FooterSocialLink[];
  footerLegalLinks: FooterLink[];
};

export type HomeListSection<T> = {
  titlePrefix: string;
  titleAccent: string;
  description: string;
  items: T[];
};

export type HomeFeatureSection = {
  eyebrow: string;
  items: Feature[];
};

export type HomePageContent = {
  hero: HeroContent;
  featuresSection: HomeFeatureSection;
  facultySection: HomeListSection<FacultyMember>;
  testimonialsSection: HomeListSection<Testimonial>;
  plansSection: HomeListSection<PricingPlan>;
  faqSection: HomeListSection<FaqItem>;
  newsletter: NewsletterContent;
};

export type CourseFeature = {
  title: string;
  description: string;
};

export type TrackCard = {
  title: string;
  description: string;
};

export type PathStep = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  highlight?: boolean;
};

export type CoursesPageContent = {
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    statTitle: string;
    statLabel: string;
  };
  foundationSection: {
    title: string;
    description: string;
    ctaLabel: string;
    items: CourseFeature[];
  };
  dualFocusSection: {
    micro: string;
    title: string;
    description: string;
    ctaLabel: string;
    items: TrackCard[];
  };
  jeeSection: {
    title: string;
    subtitle: string;
    description: string;
    ctaLabel: string;
    imageSrc: string;
    imageAlt: string;
    items: CourseFeature[];
  };
  pathSection: {
    title: string;
    description: string;
    items: PathStep[];
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
    tertiaryLabel: string;
  };
};

export type Step = {
  title: string;
  description: string;
};

export type Benefit = {
  title: string;
  description: string;
};

export type EcosystemItem = {
  title: string;
  description: string;
};

export type ProgramCard = {
  label: string;
  title: string;
  items: string[];
  featured?: boolean;
};

export type LiveClassesPageContent = {
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  stepsSection: {
    title: string;
    items: Step[];
  };
  benefitsSection: {
    title: string;
    description: string;
    items: Benefit[];
  };
  ecosystemSection: {
    title: string;
    description: string;
    studentTitle: string;
    studentItems: EcosystemItem[];
    parentTitle: string;
    parentItems: EcosystemItem[];
  };
  programsSection: {
    title: string;
    description: string;
    items: ProgramCard[];
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
    tertiaryLabel: string;
    note: string;
  };
};

export type Achiever = {
  name: string;
  level: string;
  highlights: string[];
  quote: string;
  image: string;
};

export type RankCard = {
  badge: string;
  name: string;
  score: string;
  detail: string[];
  image: string;
};

export type ResultDriver = {
  title: string;
  description: string;
};

export type ResultsPageContent = {
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    subdescription: string;
    ctaLabel: string;
  };
  foundationSection: {
    title: string;
    description: string;
    items: Achiever[];
  };
  featuredSection: {
    title: string;
    description: string;
    items: Achiever[];
  };
  jeeSection: {
    title: string;
    description: string;
    items: RankCard[];
  };
  driversSection: {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    items: ResultDriver[];
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
    tertiaryLabel: string;
    note: string;
  };
};

export type SimpleCard = {
  title: string;
  description: string;
};

export type DifferenceCard = {
  title: string;
  description: string;
};

export type SegmentCard = {
  title: string;
  subtitle: string;
  description: string;
};

export type AboutPageContent = {
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    description: string;
    points: string[];
  };
  philosophySection: {
    title: string;
    items: SimpleCard[];
  };
  differenceSection: {
    title: string;
    description: string;
    items: DifferenceCard[];
  };
  facultySection: {
    title: string;
    paragraphOne: string;
    paragraphTwo: string;
    primaryImageSrc: string;
    primaryImageAlt: string;
    secondaryImageSrc: string;
    secondaryImageAlt: string;
  };
  segmentsSection: {
    title: string;
    description: string;
    items: SegmentCard[];
  };
  quoteSection: {
    quote: string;
    authorInitials: string;
    authorName: string;
    authorRole: string;
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
    tertiaryLabel: string;
  };
};

export type ContactCard = {
  label: string;
  value: string;
};

export type ContactPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };
  enquiryForm: {
    title: string;
    description: string;
    studentNameLabel: string;
    studentNamePlaceholder: string;
    classLabel: string;
    classOptions: string[];
    goalLabel: string;
    goalOptions: string[];
    phoneLabel: string;
    phonePrefix: string;
    phonePlaceholder: string;
    submitLabel: string;
    responseNote: string;
  };
  quickCards: ContactCard[];
  officeCard: {
    label: string;
    title: string;
    address: string;
    emphasis: string;
  };
  mapSection: {
    title: string;
    embedUrl: string;
    externalUrl: string;
    iframeTitle: string;
    cardTitle: string;
    cardDescription: string;
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

export type AdmissionStep = {
  title: string;
  description: string;
  tone: 'solid' | 'outline' | 'muted';
};

export type AdmissionPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  form: {
    studentDetailsTitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    currentClassLabel: string;
    currentClassOptions: string[];
    desiredCourseLabel: string;
    desiredCourseOptions: string[];
    academicBackgroundTitle: string;
    previousSchoolLabel: string;
    previousSchoolPlaceholder: string;
    boardLabel: string;
    boardOptions: string[];
    contactLocationTitle: string;
    parentPhoneLabel: string;
    parentPhonePlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    stateLabel: string;
    statePlaceholder: string;
    submitLabel: string;
    responseNote: string;
    privacyText: string;
  };
  stepsPanel: {
    title: string;
    items: AdmissionStep[];
  };
  helpPanel: {
    title: string;
    description: string;
    callLabel: string;
    whatsappLabel: string;
  };
  promoCard: {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

export type NextStep = {
  title: string;
  description: string;
  icon: 'download' | 'demo';
};

export type AdmissionThankYouPageContent = {
  title: string;
  description: string;
  highlightText: string;
  nextTitle: string;
  nextSteps: NextStep[];
  primaryLabel: string;
  secondaryLabel: string;
  backLabel: string;
  trustText: string;
};

export type LegalSection = {
  heading: string;
  body: string[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  summary: string;
  updatedAt: string;
  sections: LegalSection[];
};

export type SiteContent = {
  site: SiteChromeContent;
  home: HomePageContent;
  courses: CoursesPageContent;
  liveClasses: LiveClassesPageContent;
  results: ResultsPageContent;
  about: AboutPageContent;
  contact: ContactPageContent;
  admission: AdmissionPageContent;
  admissionThankYou: AdmissionThankYouPageContent;
  legal: {
    privacy: LegalDocument;
    terms: LegalDocument;
  };
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  site: {
    brandName: SITE_BRAND_NAME,
    navItems: SITE_NAV_ITEMS,
    headerActions: SITE_HEADER_ACTIONS,
    footerDescription: SITE_FOOTER_DESCRIPTION,
    footerQuickLinks: SITE_FOOTER_QUICK_LINKS,
    footerContactItems: SITE_FOOTER_CONTACT_ITEMS,
    footerSocialLinks: SITE_FOOTER_SOCIAL_LINKS,
    footerLegalLinks: SITE_FOOTER_LEGAL_LINKS
  },
  home: {
    hero: landingPageContent.hero,
    featuresSection: {
      eyebrow: 'WHY 50,000+ STUDENTS TRUST US',
      items: landingPageContent.features
    },
    facultySection: {
      titlePrefix: 'Meet Our',
      titleAccent: 'Expert Faculty',
      description: 'Learn from the best minds in the industry, dedicated to your academic success.',
      items: landingPageContent.faculty
    },
    testimonialsSection: {
      titlePrefix: 'What Our',
      titleAccent: 'Students Say',
      description: 'Real stories from students who achieved their dreams with LearningLab.',
      items: landingPageContent.testimonials
    },
    plansSection: {
      titlePrefix: 'Choose Your',
      titleAccent: 'Learning Path',
      description: 'Flexible subscription plans tailored to your academic goals and learning pace.',
      items: landingPageContent.plans
    },
    faqSection: {
      titlePrefix: 'Frequently Asked',
      titleAccent: 'Questions',
      description: 'Everything you need to know about our learning platform and courses.',
      items: landingPageContent.faqs
    },
    newsletter: landingPageContent.newsletter
  },
  courses: {
    hero: {
      eyebrow: 'Expert Academic Coaching',
      titlePrefix: 'Structured Courses from',
      titleAccent: 'Class 6 to IIT-JEE',
      description:
        'Live classes, expert faculty, and app-based learning for a brighter academic future. Join thousands of successful students.',
      imageSrc: 'design/mentor-b.jpg',
      imageAlt: 'Structured classroom coaching',
      statTitle: '98% Success',
      statLabel: 'Board Exam Results'
    },
    foundationSection: {
      title: 'Classes 6-10 Foundation Program',
      description: 'Building a rock-solid base for competitive excellence early on.',
      ctaLabel: 'Book a Free Demo Class',
      items: [
        { title: 'Live Classes', description: 'Interactive sessions with top educators across India.' },
        { title: 'Concept-based Teaching', description: 'Focus on why before how to ensure lifelong clarity.' },
        { title: 'Weekly Tests', description: 'Regular assessment modules to track learning progress.' },
        { title: 'Recorded Lectures', description: 'Never miss a class with 24/7 access to recordings.' },
        { title: 'Parent Reports', description: 'Detailed performance analytics sent to parents weekly.' },
        { title: 'App Practice', description: '100k+ questions for self-paced practice on our app.' }
      ]
    },
    dualFocusSection: {
      micro: 'Grades 11-12',
      title: 'Boards + Competitive Synergy',
      description:
        'Master your school curriculum while simultaneously cracking national-level entrance exams. Our dual-focus pedagogy ensures you do not have to choose between grades and goals.',
      ctaLabel: 'Talk to a Mentor',
      items: [
        { title: 'Subject Live Classes', description: 'In-depth coverage of Physics, Chemistry, Math, and Bio.' },
        { title: 'Board Prep', description: 'Sample papers and NCERT-aligned study material.' },
        { title: 'Competitive Practice', description: 'Bridge courses for NTSE, Olympiads, and early JEE/NEET.' },
        { title: 'Mentorship', description: '1-on-1 sessions to manage stress and career paths.' }
      ]
    },
    jeeSection: {
      title: 'IIT-JEE',
      subtitle: '(Main & Advanced)',
      description:
        "An intensive program designed by former IITians to help you secure a seat in the nation's premier engineering institutes.",
      ctaLabel: 'Start Your IIT-JEE Journey',
      imageSrc: 'design/mentor-a.jpg',
      imageAlt: 'Student writing during advanced preparation',
      items: [
        { title: 'Advanced Live Classes', description: 'Deep dives into complex problem solving.' },
        { title: 'DPPs & Mock Tests', description: 'Daily practice and weekly full-length mocks.' },
        { title: 'Personal Mentoring', description: 'Dedicated academic coach for your journey.' },
        { title: 'Doubt Solving', description: '24/7 instant doubt clearing on our app.' }
      ]
    },
    pathSection: {
      title: 'Your Path to Excellence',
      description:
        'From building fundamentals in middle school to mastering competitive exams, we walk with you every step of the way.',
      items: [
        { label: '01', title: 'Foundation', subtitle: 'Class 6-8', description: 'Developing logic and conceptual curiosity.' },
        { label: '02', title: 'Pre-Competitive', subtitle: 'Class 9-10', description: 'NTSE, Olympiads & board preparation.' },
        { label: '03', title: 'Dual Focus', subtitle: 'Class 11', description: 'Deep diving into JEE/NEET subjects.' },
        { label: '04', title: 'The Final Leap', subtitle: 'Class 12', description: 'Mastery and exam success.', highlight: true }
      ]
    },
    cta: {
      title: 'Not Sure Which Course Is Right?',
      description: 'Our academic counselors are here to help you design your ideal learning path.',
      primaryLabel: 'Book Free Demo',
      secondaryLabel: 'Speak to a Counselor',
      tertiaryLabel: 'WhatsApp Enquiry'
    }
  },
  liveClasses: {
    hero: {
      eyebrow: 'Live Interactive Sessions',
      titlePrefix: "Experience India's Best",
      titleAccent: 'Live Interactive',
      titleSuffix: 'Classes',
      description:
        'Learn anytime, anywhere on our Learning App and Website. Engage in two-way interaction and real-time doubt solving with expert faculty from across India.',
      primaryCtaLabel: 'Book Free Live Demo',
      secondaryCtaLabel: 'Join via App or Website'
    },
    stepsSection: {
      title: 'How Live Classes Work',
      items: [
        { title: 'Join Live', description: 'Log in via app or website.' },
        { title: 'Interactive Learning', description: 'Two-way audio/chat with teachers.' },
        { title: 'Expert Guidance', description: 'Learn from top-tier faculty.' },
        { title: '24/7 Access', description: 'Watch recorded sessions anytime.' },
        { title: 'Holistic Practice', description: 'Interactive quizzes and tests.' }
      ]
    },
    benefitsSection: {
      title: 'What Makes Us Different',
      description: 'We focus on more than just teaching; we ensure personalized attention and measurable progress for every single student.',
      items: [
        { title: 'Small Batch Sizes', description: 'Personalized attention with limited students per batch to ensure interactive learning.' },
        { title: 'Real-time Doubts', description: 'Get your queries resolved instantly during the live session by expert teachers.' },
        { title: 'Multi-Platform', description: 'Seamlessly switch between Android app, iOS app, and your web browser.' },
        { title: 'Structured Syllabus', description: 'Meticulously planned weekly schedules aligned with school and competitive exams.' },
        { title: 'Recorded Lectures', description: 'Missed a lecture? Re-watch any lecture multiple times at your own pace.' },
        { title: 'App-based Notes', description: 'Access high-quality study materials and handwritten notes directly in the app.' },
        { title: 'Parent Tracking', description: 'Exclusive portal for parents to monitor attendance and performance in real-time.' },
        { title: 'Top Educators', description: 'Learn from IITians and experienced faculty with over 10+ years of teaching excellence.' }
      ]
    },
    ecosystemSection: {
      title: 'Tech-Enabled Learning Ecosystem',
      description: 'Bridging the gap between students and parents through advanced analytics and seamless communication.',
      studentTitle: 'For Students',
      studentItems: [
        { title: 'Multi-device access', description: 'Learn on laptop, tablet, or smartphone with sync.' },
        { title: 'Performance Analytics', description: 'Detailed insights into strengths and weak areas.' },
        { title: 'Instant Recordings', description: 'Access recorded classes within 30 minutes of live sessions.' }
      ],
      parentTitle: 'For Parents',
      parentItems: [
        { title: 'Real-time progress tracking', description: 'Instant notifications for test scores and attendance.' },
        { title: 'Monthly reports', description: "Comprehensive monthly PDF analysis of your child's growth." },
        { title: 'Direct teacher feedback', description: 'Scheduled parent-teacher meetings via video call.' }
      ]
    },
    programsSection: {
      title: 'Choose Your Program',
      description: 'Tailored learning paths for every stage of your academic journey.',
      items: [
        { label: 'Foundation', title: 'Classes 6-10', items: ['NCERT & School Syllabus', 'Olympiad Preparation', 'Logical Reasoning Skills'] },
        { label: 'Boards Excellence', title: 'Classes 11-12', items: ['Comprehensive Board Prep', 'AIJ subjects & practicals', 'Sample Paper Solving'], featured: true },
        { label: 'Competitive', title: 'IIT-JEE', items: ['Main & Advanced Focus', 'Daily Practice Problems', 'All India Test Series'] }
      ]
    },
    cta: {
      title: 'Ready to Start Your Journey?',
      description:
        'Join over 100,000+ students who have transformed their grades with our interactive live sessions. Join a free demo class today.',
      primaryLabel: 'Book Free Demo',
      secondaryLabel: 'Speak to a Counselor',
      tertiaryLabel: 'WhatsApp Enquiry',
      note: 'Demo classes are free of cost. No credit card required.'
    }
  },
  results: {
    hero: {
      eyebrow: 'Hall of Fame 2024',
      titlePrefix: 'Real Students.',
      titleAccent: 'Real Success.',
      titleSuffix: 'Real Results.',
      description:
        'Celebrating the consistent progress of our students achieved through structured live classes on our app and website.',
      subdescription:
        'Our commitment is to honest, data-driven results and student growth. We believe every child has the potential to excel with the right guidance and environment.',
      ctaLabel: 'Explore Our Methodology'
    },
    foundationSection: {
      title: 'Classes 6-10 | Foundation Achievers',
      description: 'Building strong conceptual foundations for future competitive success.',
      items: [
        {
          name: 'Aarav Sharma',
          level: 'Class 9',
          highlights: ['95% in Mathematics', '20% score improvement'],
          quote: 'The live classes made complex algebra concepts so clear and fun.',
          image: 'design/mentor-b.jpg'
        },
        {
          name: 'Sanya Iyer',
          level: 'Class 8',
          highlights: ['97% in Science', 'Olympiad gold medalist'],
          quote: 'I love the interactive quizzes. They make revision feel like a game.',
          image: 'design/mentor-c.jpg'
        },
        {
          name: 'Rohan Gupta',
          level: 'Class 10',
          highlights: ['98% in Board Foundation', 'NTSE scholar'],
          quote: 'Personal mentoring changed my approach toward difficult Physics topics.',
          image: 'design/mentor-d.jpg'
        },
        {
          name: 'Ananya Singh',
          level: 'Class 7',
          highlights: ['94% aggregate', 'English debate winner'],
          quote: 'The recorded lectures are a lifesaver when I need to revise before exams.',
          image: 'design/mentor-a.jpg'
        }
      ]
    },
    featuredSection: {
      title: 'Classes 6-10 | Foundation Achievers',
      description: 'Building strong conceptual foundations for future competitive success.',
      items: [
        {
          name: 'Aarav Sharma',
          level: 'Class 9',
          highlights: ['95% in Mathematics', '20% score improvement'],
          quote: 'The live classes made complex algebra concepts so clear and fun.',
          image: 'design/mentor-b.jpg'
        },
        {
          name: 'Sanya Iyer',
          level: 'Class 8',
          highlights: ['97% in Science', 'Olympiad gold medalist'],
          quote: 'I love the interactive quizzes. They make revision feel like a game.',
          image: 'design/mentor-c.jpg'
        },
        {
          name: 'Rohan Gupta',
          level: 'Class 10',
          highlights: ['98% in Board Foundation', 'NTSE scholar'],
          quote: 'Personal mentoring changed my approach toward difficult Physics topics.',
          image: 'design/mentor-d.jpg'
        },
        {
          name: 'Ananya Singh',
          level: 'Class 7',
          highlights: ['94% aggregate', 'English debate winner'],
          quote: 'The recorded lectures are a lifesaver when I need to revise before exams.',
          image: 'design/mentor-a.jpg'
        }
      ]
    },
    jeeSection: {
      title: 'IIT-JEE | Competitive Excellence',
      description: 'Advanced mentoring and strategy for India toughest engineering exams.',
      items: [
        {
          badge: 'IIT-JEE Advanced',
          name: 'Kabir Mehra',
          score: '99.98 Percentile',
          detail: ['All India Rank (AIR): 142', 'Perfect 100 in Physics', 'Qualified for IIT Bombay'],
          image: 'design/mentor-d.jpg'
        },
        {
          badge: 'JEE Main Topper',
          name: 'Aditya Sen',
          score: '99.85 Percentile',
          detail: ['All India Rank (AIR): 856', 'Top 0.1% in Mathematics', 'NIT Trichy aspirant'],
          image: 'design/mentor-c.jpg'
        },
        {
          badge: 'IIT-JEE Success',
          name: 'Meera Joshi',
          score: '99.72 Percentile',
          detail: ['State Rank: 12', 'Chemistry specialist', 'IIT Delhi bound'],
          image: 'design/mentor-a.jpg'
        }
      ]
    },
    driversSection: {
      title: 'How These Exceptional Results Are Achieved',
      description: 'We do not just teach; we transform the way students learn through a meticulously designed 6-pillar ecosystem.',
      imageSrc: 'design/mentor-a.jpg',
      imageAlt: 'Students learning with a mentor',
      items: [
        { title: 'Interactive Classes', description: 'Real-time engagement via app & web portal.' },
        { title: 'Small Batch Sizes', description: 'Ensuring every student gets individual attention.' },
        { title: 'Testing & Analytics', description: 'Weekly tests with deep performance insights.' },
        { title: 'Recorded Lectures', description: '24/7 access for seamless revision & backlog.' },
        { title: 'Personal Mentoring', description: '1-on-1 guidance for academic stress & strategy.' },
        { title: 'Progress Tracking', description: 'Dedicated portal for parents to track growth.' }
      ]
    },
    cta: {
      title: 'Experience our teaching system firsthand.',
      description: 'Join thousands of students who have transformed their grades and boosted their confidence. Start your success story today.',
      primaryLabel: 'Book Free Demo Class',
      secondaryLabel: 'Speak to a Counselor',
      tertiaryLabel: 'WhatsApp Enquiry',
      note: 'Over 50,000 students mentored since 2015'
    }
  },
  about: {
    hero: {
      eyebrow: 'Empowering Success',
      titlePrefix: 'Quality Education for',
      titleAccent: 'Real Results',
      description:
        'Experience interactive live classes via our high-speed app and web platform. Our mission is to empower every student with the tools they need for academic excellence and lifelong mastery.',
      points: ['Live Interactive Sessions', 'Mission-Driven Growth']
    },
    philosophySection: {
      title: 'Our Teaching Philosophy',
      items: [
        {
          title: 'Concept-Based Learning',
          description:
            'We move beyond rote memorization. Our pedagogy focuses on deep understanding of core principles, ensuring students can apply knowledge to complex, real-world problems.'
        },
        {
          title: 'Quality Teaching, Better Outcomes',
          description:
            'We believe that expert instruction combined with rigorous methodology leads to proven student success. Every lesson is crafted to maximize retention and spark curiosity.'
        }
      ]
    },
    differenceSection: {
      title: 'What Makes Us Different',
      description: 'Our comprehensive approach to digital learning ensures no student is left behind.',
      items: [
        { title: 'App & Web Live Classes', description: 'Seamlessly join classes from your laptop or mobile device with zero lag.' },
        { title: 'Experienced Faculty', description: 'Learn from industry veterans and top-tier academic experts.' },
        { title: 'Small Batches', description: 'Personalized attention with limited students per session for better focus.' },
        { title: 'Structured Curriculum', description: 'Mapped precisely to competitive exams and board requirements.' },
        { title: 'Regular Testing', description: 'Weekly assessments and performance reports to track your progress.' },
        { title: 'Recorded Lectures', description: 'Missed a class? Access all recordings and notes anytime, anywhere.' },
        { title: 'Parent Tracking', description: 'A dedicated app for parents to monitor attendance and results.' },
        { title: '24/7 Doubt Support', description: 'Get your questions answered instantly by our dedicated mentors.' }
      ]
    },
    facultySection: {
      title: 'Expert Faculty & Dedicated Mentorship',
      paragraphOne:
        'Our teachers are not just subject experts; they are mentors. At LearningLab, we select only the top 1% of educators who have a passion for simplification and a track record of guiding students to top ranks.',
      paragraphTwo:
        'Beyond the lectures, our mentorship program ensures that every student receives emotional and tactical support to navigate the pressures of competitive exams.',
      primaryImageSrc: 'design/mentor-c.jpg',
      primaryImageAlt: 'Faculty mentor working with students',
      secondaryImageSrc: 'design/mentor-b.jpg',
      secondaryImageAlt: 'Senior faculty mentor'
    },
    segmentsSection: {
      title: 'Academic Segments We Serve',
      description: 'Tailored programs for every stage of your academic journey.',
      items: [
        {
          title: 'Foundation',
          subtitle: 'Classes 6 - 10',
          description: 'Building strong fundamentals in Mathematics, Science, and Logical Reasoning.'
        },
        {
          title: 'Competitive Prep',
          subtitle: 'IIT-JEE Aspirants',
          description: 'Intensive coaching for JEE Main & Advanced with top-tier problem sets.'
        },
        {
          title: 'Board Excellence',
          subtitle: 'Classes 11 - 12',
          description: 'Specialized focus on CBSE/ISC boards with a perfect balance of theory and practice.'
        }
      ]
    },
    quoteSection: {
      quote:
        'Our dedication goes beyond syllabus completion. We are committed to the intellectual and personal growth of every student who walks through our virtual doors. At LearningLab, your ambition is our mission.',
      authorInitials: 'EL',
      authorName: 'Team LearningLab',
      authorRole: 'Academic Excellence Cell'
    },
    cta: {
      title: 'Not Sure Which Course Is Right?',
      description: 'Our academic counselors are here to help you design your ideal learning path.',
      primaryLabel: 'Book Free Demo',
      secondaryLabel: 'Speak to a Counselor',
      tertiaryLabel: 'WhatsApp Enquiry'
    }
  },
  contact: {
    hero: {
      eyebrow: 'Expert Academic Support',
      title: 'Get in Touch with Our Experts',
      description:
        "We're here to guide you on your academic journey. Reach out for any queries or support regarding admissions, courses, or technical help.",
      points: ['24/7 Portal Access', 'Expert Counselors', 'Nationwide Presence']
    },
    enquiryForm: {
      title: 'Quick Enquiry',
      description: 'Fill in the details below and our academic counselors will reach out to you shortly.',
      studentNameLabel: 'Student Name',
      studentNamePlaceholder: 'Enter your full name',
      classLabel: 'Class',
      classOptions: ['Select Class', 'Class 6-8', 'Class 9-10', 'Class 11-12'],
      goalLabel: 'Exam Interest',
      goalOptions: ['Select Goal', 'Boards', 'IIT-JEE', 'Foundation'],
      phoneLabel: 'Phone Number',
      phonePrefix: '+91',
      phonePlaceholder: '10-digit mobile number',
      submitLabel: 'Request Call Back',
      responseNote: 'We typically respond within 2 hours.'
    },
    quickCards: [
      { label: 'Call Us', value: '+91 1800 200 1234' },
      { label: 'WhatsApp', value: 'Chat with Counselor' },
      { label: 'Email Support', value: 'support@learninglab.com' }
    ],
    officeCard: {
      label: 'Head Office',
      title: 'LearningLab Academy Tower',
      address: 'Plot 42, Knowledge Park III, Near Metro Station, New Delhi, 110001, India',
      emphasis: 'Available Nationwide via Online Access'
    },
    mapSection: {
      title: 'Find us on the Map',
      embedUrl: 'https://www.google.com/maps?q=Plot%2042,%20Knowledge%20Park%20III,%20Near%20Metro%20Station,%20New%20Delhi%20110001&z=15&output=embed',
      externalUrl: 'https://www.google.com/maps/search/?api=1&query=Plot+42,+Knowledge+Park+III,+Near+Metro+Station,+New+Delhi+110001',
      iframeTitle: 'LearningLab office map',
      cardTitle: 'LearningLab HQ',
      cardDescription: 'Open in Google Maps'
    },
    cta: {
      title: 'Experience Live Learning Today',
      description: 'Join thousands of students who are excelling with our live interactive classes. Book your slot now for a free demo session.',
      primaryLabel: 'Book Free Demo Class',
      secondaryLabel: 'Join Live via Web/App'
    }
  },
  admission: {
    hero: {
      eyebrow: 'Admissions Open 2024-25',
      title: 'Admission Request Form',
      description: 'The first step toward your academic success. Join over 5,000+ successful students today and transform your future.'
    },
    form: {
      studentDetailsTitle: 'Student Details',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'e.g. John Doe',
      currentClassLabel: 'Current Class',
      currentClassOptions: ['Select Class', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
      desiredCourseLabel: 'Desired Course',
      desiredCourseOptions: ['Select Program', 'Foundation Program', 'Boards Excellence', 'IIT-JEE Preparation', 'Live Classes Combo'],
      academicBackgroundTitle: 'Academic Background',
      previousSchoolLabel: 'Previous School Name',
      previousSchoolPlaceholder: 'Enter school name',
      boardLabel: 'Board',
      boardOptions: ['CBSE', 'ICSE', 'State Board', 'IB'],
      contactLocationTitle: 'Contact & Location',
      parentPhoneLabel: "Parent's Mobile Number",
      parentPhonePlaceholder: '+91 000-0000',
      cityLabel: 'City',
      cityPlaceholder: 'Your City',
      stateLabel: 'State / Region',
      statePlaceholder: 'Your State',
      submitLabel: 'Submit Admission Request',
      responseNote: 'Expected response time: 24-48 hours',
      privacyText:
        'We value your privacy. Your information is securely encrypted and will only be used to contact you regarding admission queries and course updates.'
    },
    stepsPanel: {
      title: 'What Happens Next?',
      items: [
        {
          title: 'Request Review',
          description: 'Our academic team reviews your profile within 24 hours.',
          tone: 'solid'
        },
        {
          title: 'Counselor Call',
          description: 'Expert counselor calls to understand your career goals.',
          tone: 'outline'
        },
        {
          title: 'Personalized Plan',
          description: 'Receive a tailored curriculum and study schedule.',
          tone: 'muted'
        },
        {
          title: 'Enrollment',
          description: 'Complete fee payment and start your learning journey.',
          tone: 'muted'
        }
      ]
    },
    helpPanel: {
      title: 'Need Help Now?',
      description: 'Talk to our admissions office for immediate assistance.',
      callLabel: 'Call Counselor',
      whatsappLabel: 'WhatsApp Us'
    },
    promoCard: {
      imageSrc: 'design/mentor-b.jpg',
      imageAlt: 'Academic mentor counseling students',
      title: 'Experience the LearningLab Advantage',
      description: 'Live labs, expert faculty, and peer learning.'
    },
    cta: {
      title: 'Want to see us in action?',
      description: 'Experience our unique teaching methodology before you commit. Book a free live demo session today.',
      primaryLabel: 'Book Free Demo Class',
      secondaryLabel: 'Join Live via App/Web'
    }
  },
  admissionThankYou: {
    title: 'Thank You for Reaching Out!',
    description: "We've received your request and our academic counselor will call you back within",
    highlightText: '24 hours',
    nextTitle: "What's Next?",
    nextSteps: [
      {
        title: 'Download our learning app',
        description: 'Get instant access to free study material and mock tests.',
        icon: 'download'
      },
      {
        title: 'Join our upcoming live demo',
        description: 'Experience our teaching methodology first-hand this Saturday.',
        icon: 'demo'
      }
    ],
    primaryLabel: 'Explore Courses',
    secondaryLabel: 'Download App',
    backLabel: 'Back to Home',
    trustText: 'Trusted by 10,000+ students across the globe'
  },
  legal: {
    privacy: {
      eyebrow: 'Privacy Policy',
      title: 'How LearningLab handles your information',
      summary:
        'We collect only the information needed to deliver admissions support, live classes, performance tracking, and student communication securely.',
      updatedAt: 'Last updated: March 12, 2026',
      sections: [
        {
          heading: 'Information we collect',
          body: [
            'We may collect student and parent details such as name, phone number, email address, class, exam interests, and learning preferences when you fill out admission or contact forms.',
            'We also collect essential usage data from our website and learning platform to improve performance, fix errors, and personalize the student experience.'
          ]
        },
        {
          heading: 'How we use it',
          body: [
            'Your information is used to respond to enquiries, manage admissions, schedule counseling calls, deliver academic support, and share important course updates.',
            'We do not sell personal data to third parties. Any service partners we use are limited to operational needs such as hosting, analytics, and communication delivery.'
          ]
        },
        {
          heading: 'Security and retention',
          body: [
            'We use reasonable technical and administrative safeguards to protect submitted information against unauthorized access, misuse, and disclosure.',
            'Data is retained only as long as required for academic operations, legal compliance, and support history, after which it is deleted or anonymized.'
          ]
        }
      ]
    },
    terms: {
      eyebrow: 'Terms of Service',
      title: 'Rules for using LearningLab services',
      summary:
        'These terms govern access to our website, live classes, academic materials, and counseling services. By using the platform, you agree to comply with them.',
      updatedAt: 'Last updated: March 12, 2026',
      sections: [
        {
          heading: 'Platform usage',
          body: [
            'Students and parents must provide accurate information during registration and enquiries. Accounts or submissions containing misleading information may be restricted.',
            'Learning materials, recordings, assignments, and test content are for enrolled student use only and may not be copied, redistributed, or resold.'
          ]
        },
        {
          heading: 'Classes, payments, and support',
          body: [
            'Batch schedules, demo sessions, and mentor availability may change based on academic planning. We aim to communicate any significant updates in advance.',
            'Fees, refund rules, and program access are governed by the specific enrollment terms shared at the time of admission or purchase.'
          ]
        },
        {
          heading: 'Conduct and limitations',
          body: [
            'Users must not misuse the website or learning systems, interfere with classes, attempt unauthorized access, or upload harmful content.',
            'LearningLab is not liable for interruptions caused by third-party infrastructure, device issues, or internet connectivity problems outside our direct control.'
          ]
        }
      ]
    }
  }
};
