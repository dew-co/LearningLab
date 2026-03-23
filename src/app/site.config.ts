import type { HeaderAction, HeaderLink } from './components/site-header/site-header.component';
import type {
  FooterContactItem,
  FooterLink,
  FooterSocialLink
} from './components/site-footer/site-footer.component';

export const SITE_BRAND_NAME = 'TheLearningLabs';

export const SITE_NAV_ITEMS: HeaderLink[] = [
  { label: 'Home', path: '/home', exact: true },
  { label: 'Courses', path: '/courses' },
  { label: 'Live Classes', path: '/live-classes' },
  { label: 'Results', path: '/results' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Contact Us', path: '/contact-us' }
];

export const SITE_HEADER_ACTIONS: HeaderAction[] = [
  { label: 'Admission', path: '/admission', variant: 'accent' }
];

export const SITE_FOOTER_DESCRIPTION =
  'Empowering students across India with world-class live learning experiences, expert faculty, and personalized mentorship to excel in their academic journey.';

export const SITE_FOOTER_QUICK_LINKS: FooterLink[] = [
  { label: 'Courses', path: '/courses' },
  { label: 'Live Classes', path: '/live-classes' },
  { label: 'Results', path: '/results' },
  { label: 'Admission', path: '/admission' }
];

export const SITE_FOOTER_CONTACT_ITEMS: FooterContactItem[] = [
  {
    iconClass: 'fa-solid fa-location-dot',
    value: 'TheLearningLabs Academy Tower\nPlot 42, Knowledge Park III,\nNear Metro Station, New Delhi 110001',
    href: 'https://maps.google.com/?q=Plot+42+Knowledge+Park+III+New+Delhi+110001',
    external: true
  },
  {
    iconClass: 'fa-solid fa-phone',
    value: '+91 1800 200 1234',
    href: 'tel:+9118002001234'
  },
  {
    iconClass: 'fa-regular fa-envelope',
    value: 'support@learninglab.com',
    href: 'mailto:support@learninglab.com'
  }
];

export const SITE_FOOTER_SOCIAL_LINKS: FooterSocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com', iconClass: 'fa-brands fa-instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com', iconClass: 'fa-brands fa-youtube' },
  { label: 'Facebook', href: 'https://www.facebook.com', iconClass: 'fa-brands fa-facebook-f' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', iconClass: 'fa-brands fa-linkedin-in' }
];

export const SITE_FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms of Service', path: '/terms-of-service' }
];
