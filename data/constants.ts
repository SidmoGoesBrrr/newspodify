export const name_placeholders = [
    "Siddhant",
    "Jason",
    "Arnav"
];

export const feature_placeholders = [
    "Add an option to change the voice of the podcast narrator",
    "Allow users to download podcasts",
    "Add translations for the newsletters"
];

export const newsletter_placeholders = [
    "Morning Brew",
    "The Hustle",
    "SaaS Weekly",
    "Product Hunt",
    "The Saturday Solopreneur"
];

export const price_placeholders = [
    "$5 a month",
    "I'm broke lol",
    "₹199 a month",
    "₹400 a year"
];

export const NAV_LINKS = [
  { href: '#hero', key: 'hero', label: 'Home' },
  { href: '#description', key: 'what_is_nsp', label: 'What is Newspodify' },
  { href: '#features', key: 'features', label: 'Features' },
  { href: '#faq', key: 'faq', label: 'FAQ' },
];

export const FEATURES = [
  {
    title: "Personalized Newsletters",
    description:
      "Transform your favorite newsletters into a tailored podcast. Choose the newsletters you love, and Newspodify will create a personalized listening experience just for you.",
    imageUrl: "/personalisation.webp",
  },
  {
    title: "Effortless Updates",
    description:
      "Stay informed effortlessly! Newspodify curates and converts your chosen newsletters into an easy-to-listen podcast, perfect for your busy lifestyle.",
    imageUrl: "/commute.webp",
  },
  {
    title: "Bite-Sized Insights",
    description:
      "Receive concise and engaging summaries of your newsletters. Newspodify delivers the key insights, ensuring you stay updated without the need to read through lengthy articles.",
    imageUrl: "/mobile.webp",
  },
  {
    title: "Ad-Free Listening",
    description:
      "Enjoy uninterrupted news with our ad-free experience. Focus on the stories that matter without any distractions, making your listening experience seamless and enjoyable.",
    imageUrl: "/noads.webp",
  },
  
];

export const FAQS = [
  {
    question: "What is Newspodify?",
    answer:
      "Newspodify transforms written news from various newsletters into convenient podcast summaries, making it easy for users to stay informed by listening instead of reading.",
  },
  {
    question: "How does Newspodify work?",
    answer:
      "Newspodify employs advanced algorithms to scan, summarize, and convert newsletter content into podcast episodes, delivering concise audio updates to keep you informed on the go.",
  },
  {
    question: "Is Newspodify free to use?",
    answer:
      "Yes, Newspodify provides a free plan with essential features. For more advanced functionalities, premium plans are available.",
  },
  {
    question: "Can I customize the content in my Newspodify podcast?",
    answer:
      "Currently, Newspodify allows users to select their preferred newsletters. We are working on adding more detailed customization options in the future.",
  },
];

export const AVAILABLE_NEWSLETTERS: string[] = [
  'The New York Times',
  'BBC News Briefing',
  'The Hustle',
  'Huberman Lab',
  'Morning Brew',
  'Work \\After\\ Work',
  'Justin Welsh',
  'James Clear',
  'Tom Snyder',
  'Gohar Khan',
  'Katelyn Bourgoin',
  'Al Jazeera English',
  'Substack',
]; // TODO Get all newsletters from email, add them here and on the bottom

export const newsletters=[
  {
    name:"The New York Times",
    display_name:"The New York Times",
    categories:["News", "Lifestyle", "Sports", "Science"]
  },
  {
    name:"The Hustle",
    display_name:"The Hustle",
    categories:["News", "Lifestyle", "Sports", "Science"]

  },
  {
    name:"Justin Welsh",
    display_name:"Justin Welsh",
    categories:["Tools and Resources", "Marketing and Content Strategies", "Actionable Tips"]

  },
  {
    name:"Morning Brew",
    display_name:"Morning Brew",
    categories:["News", "Lifestyle", "Sports", "Science"]
  },
  {
    name:"Tom Snyder",
    display_name:"Tom Snyder",
    categories:["News", "Lifestyle", "Sports", "Science"]
  },
  {
    name:"BBC News Briefing",
    display_name:"BBC News Briefing",
    categories:["News", "Lifestyle", "Sports", "Science"]},
  {
    name:"Substack",
    display_name:"Substack",
    categories:[]},
  {
    name:"Gohar Khan",
    display_name:"Gohar Khan",
    categories:["Education", "Career"]},
  {
    name:"Huberman Lab",
    display_name:"Huberman Lab",
    categories:["Neuro Science","Health and Science"]},
  {
    name:"Katelyn Bourgoin",
    display_name:"Katelyn Bourgoin",
    categories:["Marketing tips"],
  },
  {
    name:"Al Jazeera English",
    display_name:"Al Jazeera English",
    categories:["International Events","Sports"]},
  {
    name:"James Clear",
    display_name:"James Clear",
    categories:["Habits", "Decision Making" ,"Self Improvement"]}
];
