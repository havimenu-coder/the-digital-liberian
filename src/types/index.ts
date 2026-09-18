export interface SiteSettings {
  site_name: string;
  site_tagline: string;
  logo_url: string;
  logo_alt_text: string;
  favicon_url: string;
  primary_color: string;
  accent_color: string;
  dark_color: string;
  contact_phone: string;
  contact_email: string;
  whatsapp_number: string;
  whatsapp_link: string;
  whatsapp_community_link: string;
  social_links: {
    twitter: string;
    linkedin: string;
    facebook_page: string;
    facebook_personal: string;
    facebook_group: string;
    instagram: string;
    youtube: string;
  };
  footer_tagline: string;
  copyright_text: string;
  default_seo_title: string;
  default_seo_description: string;
  default_og_image: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  order: number;
  open_in_new_tab: boolean;
  children?: {
    id: string;
    label: string;
    url: string;
    order: number;
    description?: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
  image_url?: string;
  features: string[];
  cta_text: string;
  cta_url: string;
  display_order: number;
  published: boolean;
}

export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  category: 'blog' | 'courses' | 'coaching' | 'tutorials' | 'presentations' | 'books';
  description: string;
  content?: string;
  thumbnail_url: string;
  external_url?: string;
  download_url?: string;
  price?: string;
  author: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

export interface AITool {
  id: string;
  name: string;
  category: 'academics' | 'creative' | 'data' | 'multimedia' | 'health' | 'finance' | 'legal' | 'engineering' | 'productivity';
  category_label: string;
  description: string;
  website_url: string;
  is_free?: boolean;
  requires_premium?: boolean;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string[];
  author_name: string;
  author_role: string;
  author_avatar: string;
  published: boolean;
  published_at: string;
  reading_time: string;
  seo_title?: string;
  seo_description?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: string;
  status: 'upcoming' | 'past' | 'ongoing';
  date: string;
  time: string;
  location: string;
  is_virtual: boolean;
  flyer_url: string;
  description: string;
  expectations: string[];
  investment_tiers: {
    label: string;
    amount: string;
    description?: string;
  }[];
  bank_details: {
    account_name: string;
    account_number: string;
    bank_name: string;
    contact: string;
  };
  whatsapp_redirect_url: string;
  published: boolean;
  featured: boolean;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  location: string;
  category: string;
  proficiency: string;
  expectations: string[];
  investment: string;
  payment_reference: string;
  created_at: string;
}

export interface Initiative {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  short_description: string;
  content: string;
  featured_image: string;
  logo_url?: string;
  published: boolean;
  display_order: number;
}

export interface Honoree {
  id: string;
  name: string;
  month: string;
  year: number;
  country: string;
  institution: string;
  role: string;
  bio: string;
  photo_url: string;
  featured_quote: string;
  interview_url?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  organization?: string;
  bio: string;
  photo_url: string;
  display_order: number;
  initiative?: 'core' | 'lsa';
  is_active: boolean;
  social_links?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  photo_url?: string;
  rating: number;
  featured: boolean;
  location_context?: 'home' | 'upskilling' | 'lsa';
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  description?: string;
  display_order: number;
}

export interface MediaItem {
  id: string;
  title: string;
  file_name: string;
  file_url: string;
  file_type: 'image' | 'pdf' | 'video' | 'document';
  file_size: string;
  created_at: string;
}

export interface FormSubmission {
  id: string;
  form_type: 'contact' | 'gift_download' | 'event_registration' | 'lsa_nomination' | 'lsa_impact';
  data: Record<string, any>;
  status: 'new' | 'reviewed' | 'archived';
  created_at: string;
}

export type SectionType = 
  | 'hero'
  | 'text_image'
  | 'text_block'
  | 'rich_text'
  | 'cards_grid'
  | 'services_grid'
  | 'testimonials'
  | 'stats'
  | 'team_grid'
  | 'blog_feed'
  | 'events_feed'
  | 'resources_feed'
  | 'partners_grid'
  | 'faq'
  | 'contact_form'
  | 'cta_banner'
  | 'quote';

export interface PageSection {
  id: string;
  type: SectionType;
  order: number;
  data: Record<string, any>;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  sections: PageSection[];
  featured_image?: string;
  seo_title?: string;
  seo_description?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface HomepageData {
  hero: {
    headline: string;
    subheadline: string;
    description: string;
    image_url: string;
    primary_btn_text: string;
    primary_btn_url: string;
    secondary_btn_text: string;
    secondary_btn_url: string;
    ticker_tags: string[];
  };
  about_teaser: {
    heading: string;
    description: string;
    cta_text: string;
    cta_url: string;
  };
  quick_explore: {
    heading: string;
    subheading: string;
    items: {
      title: string;
      description: string;
      link: string;
      icon: string;
    }[];
  };
  featured_learning: {
    title: string;
    subtitle: string;
    description: string;
    video_url: string;
    thumbnail_url: string;
    cta_text: string;
    cta_url: string;
  };
  stats: {
    stat1_value: string;
    stat1_label: string;
    stat1_sub: string;
    stat2_value: string;
    stat2_label: string;
    stat2_sub: string;
    stat3_value: string;
    stat3_label: string;
    stat3_sub: string;
  };
  final_cta: {
    heading: string;
    description: string;
    primary_btn_text: string;
    primary_btn_url: string;
    secondary_btn_text: string;
    secondary_btn_url: string;
  };
}
