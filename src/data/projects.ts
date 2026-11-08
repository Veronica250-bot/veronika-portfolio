
export type Project = {
  name: string
  description: string
  role: string
  period?: string
  overview: string
  challenge: string
  process: string
  solutions: string
  outcome: string
  images: string[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'DENTSKILLS',
    period: '2025–2026',
    featured: true,
    description: 'Digital dental skills assessment',
    role: 'Project Management · UX/UI Design',
    overview: 'Transforming paper-based skill cards into a digital learning experience for dental students and educators.',
    challenge: 'Modernizing practical skills assessment and replacing paper-based workflows.',
    process: 'User research, requirements, user journeys, wireframes and prototyping.',
    solutions: 'Student and teacher mobile experiences and a web-based administration interface.',
    outcome: 'High-fidelity prototypes for student, teacher and administration workflows.',
    images: [
      '/projects/dentskills-student.png',
      '/projects/dentskills-teacher.png',
      '/projects/dentskills-admin.png',
    ],
  },
 
{
  name: 'HOWSPACE',
  period: '2026',
  featured: true,

  description:
    'A digital collaboration workspace connecting people, ideas and shared decision-making.',

  role:
    'Project Management · UX/UI Design · Service Design',

  overview:
    'A digital collaboration platform developed for the Huomisvoimalaitos Kokonniemi project in Porvoo, together with Posintra. The goal was to bring stakeholders, workshops, ideas and shared materials into one accessible workspace.',

  challenge:
    'Collaboration was spread across multiple channels, making information sharing and joint decision-making challenging. The project needed a clear and easy-to-use digital environment that could support both in-person workshops and remote participation.',

  process:
    'I coordinated a six-person team and contributed to stakeholder interviews, user journeys, platform comparisons and UX/UI design. Based on seven interviews, we explored user needs, created concept prototypes in Figma Make and evaluated collaboration platforms.',

  solutions:
    'We selected Howspace and built a collaborative workspace for workshops, idea prioritization, discussions, shared materials and remote decision-making. The final implementation was informed by user research and earlier concept prototypes.',

  outcome:
    'The project delivered a configured Howspace workspace, a supporting Figma Make concept prototype and a structured approach to digital collaboration. It strengthened my skills in project leadership, service design and designing within real platform constraints.',

  images: [
  '/projects/howspace-home.png',
  '/projects/howspace-prioritization.png',
  '/projects/howspace-workshop.png',
  '/projects/howspace-prototype-home.png',
  '/projects/howspace-prototype-workshop.png',
  '/projects/howspace-prototype-discussion.png',
],
},

  
{
  name: 'MAP MY TRIP',
  period: '2026',
  featured: true,

  description:
    'Connecting physical museum travel experiences with an interactive digital journey.',

  role:
    'UX/UI Design · Concept Development · Prototyping',

  overview:
    'MAP MY TRIP was a five-day Design Sprint project developed for Museomatkat. The concept explored how a physical pop-up travel experience could inspire visitors to discover cultural destinations in Finland and continue their journey through a digital service.',

  challenge:
    'The challenge was to connect a physical Museomatkat pop-up with the online service. We needed to make discovering museum trips inspiring and approachable while creating a clear path from initial interest to exploring travel options and potentially booking a trip.',

  process:
    'Using the Design Sprint approach, our team explored customer journeys, identified opportunities, generated concepts and created interactive prototypes. My contributions focused on UX/UI design, visual concepts, prototyping and the customer journey between physical and digital touchpoints.',

  solutions:
    'We developed an interactive travel exploration concept featuring a map of Finland, destination cards and detailed trip information. Alongside the digital interface, we explored a pop-up touchscreen experience and a QR-code-based digital flyer that visitors could continue exploring on their phones.',

  outcome:
    'The sprint resulted in a set of digital service prototypes and a concept connecting physical and online customer experiences. The project strengthened my ability to translate ideas into visual interfaces, design across multiple touchpoints and communicate an end-to-end user journey within a limited timeframe.',

  
images: [
  '/projects/mapmytrip-explore.png',
  '/projects/mapmytrip-map.png',
  '/projects/mapmytrip-popup.png',
  '/projects/mapmytrip-flyer.png',
  '/projects/mapmytrip-ad.png',
  '/projects/mapmytrip-details.png',
],

},

  
{
  name: 'AI & UX',
  period: '2026',
  featured: true,

  description:
    'Exploring how AI can support human-centered UX design, from research to evaluation.',

  role:
    'UX Research · AI Experimentation · UX Design',

  
overview:
  'Exploring how AI can support UX research, ideation, prototyping and evaluation — and where human judgment remains essential.',


  challenge:
    'Understanding where AI can support UX designers while recognizing its limitations and the importance of real user insights.',

  process:
    'Four practical experiments exploring user understanding, AI-assisted ideation, rapid prototyping and usability evaluation.',

  solutions:
    'AI-assisted workflows and a visual framework showing opportunities, benefits and limitations across the Discover, Define, Develop and Deliver phases.',

  outcome:
    'A published bachelor’s thesis and a practical framework for using AI as a supporting tool in human-centered UX design.',

  images: [
    '/projects/aiux-framework.png',
    '/projects/aiux-stitch.png',
    '/projects/aiux-copilot.png',
    '/projects/aiux-personas.png',
    '/projects/aiux-ideation.png',
    '/projects/aiux-figma-make.png',
    '/projects/aiux-evaluation.png',
  ],
},

  
{
  name: 'RENDI',
  period: '2025',
  featured: true,

  description:
    'Making sports equipment more accessible through a digital rental experience.',

  role:
    'UX/UI Design · Service Design · Front-End Development',

  overview:
    'RENDI is a team-developed digital service concept that makes sports equipment rental more accessible, convenient and sustainable. The concept combines a mobile rental experience with equipment collection and return at activity locations.',

  challenge:
    'Sports equipment can be expensive to buy and inconvenient to own, especially when trying a new activity. Our challenge was to make finding, booking and renting equipment easier.',

  process:
    'Our team conducted stakeholder interviews, explored user needs and developed the service concept and customer journey. I created Figma prototypes, contributed to the service design and developed the business model canvases.',

  solutions:
    'The concept includes a mobile rental application, onboarding flows, a service blueprint and a website prototype. I independently implemented the website front end using HTML and CSS.',

  outcome:
    'The project resulted in a digital service concept, interface prototypes, a service blueprint and an unfinished but functional front-end website prototype.',

  images: [
    '/projects/rendi-app.png',
    '/projects/rendi-onboarding.png',
    '/projects/rendi-website.png',
    '/projects/rendi-userflow.png',
    '/projects/rendi-blueprint.png',
    '/projects/rendi-categories.png',
  ],
},

  {
    name: 'CLICK & PICK',
    period: '2025',
    featured: true,
    description: 'A grocery click-and-collect mobile concept',
    role: 'UX/UI Design · Interactive Prototyping',
    overview: 'A concept for ordering groceries through a Lidl Plus-inspired mobile experience.',
    challenge: 'Making everyday grocery shopping faster and more convenient.',
    process: 'User flows, onboarding, interface design and interactive prototyping.',
    solutions: 'A mobile experience covering product selection, checkout and collection.',
    outcome: 'An interactive Figma prototype illustrating the complete ordering journey.',
    images: [
  '/projects/clickpick-app.png',
  '/projects/clickpick-onboarding.png',
  '/projects/clickpick-marketing.png',
],
  },
  
{
  name: 'GREEN TRAVELS',
  period: '2025',
  featured: false,
  description: 'Web Design · WordPress Development',
  role: 'Web Design · WordPress Development',
  overview:
    'A travel website concept bringing destinations, travel packages and inspiring content together in one digital experience.',
  challenge:
    'Creating a clear and engaging website where visitors can explore destinations, discover travel services and find inspiration.',
  process:
    'Website structure, visual design, content organization and WordPress implementation.',
  solutions:
    'A destination-focused homepage, travel package listings and a travel blog.',
  outcome:
    'A WordPress website demonstrating travel-oriented web design and content organization.',
  images: [
    '/projects/greentravels-home.png',
    '/projects/greentravels-services.png',
    '/projects/greentravels-blog.png',
  ],
},
{
  name: 'PIENI JÄLKI',
  period: '2025',
  featured: false,
  description: 'E-commerce Design · Wix Development',
  role: 'E-commerce Design · UX/UI',
  overview:
    'A sustainable second-hand childrenswear store concept developed as a team project using Wix.',
  challenge:
    'Making second-hand children’s clothing easy to discover, purchase and donate through one digital service.',
  process:
    'E-commerce planning, customer journey design, content structure and Wix website development.',
  solutions:
    'A product catalogue, product filtering, donation form and supporting content pages.',
  outcome:
    'A Wix-based e-commerce concept combining second-hand shopping, clothing donations and circular economy principles.',
  images: [
    '/projects/pienijalk-products.png',
    '/projects/pienijalk-donation.png',
    '/projects/pienijalk-home.png',
  ],
},

{
  name: 'WEATHER APP',
  period: '2025',
  featured: false,
  description: 'Web Development · Firebase · REST API',
  role: 'Web Development · Firebase Integration',
  overview:
    'A responsive weather application combining user authentication, cloud-based data storage and weather information retrieved from an external API.',
  challenge:
    'Creating a simple and functional weather service with user accounts and up-to-date weather information.',
  process:
    'Implemented Firebase Authentication, Firestore database integration and REST API communication using Axios.',
  solutions:
    'User registration, login, city-based weather search and responsive weather information views.',
  outcome:
    'Lighthouse testing in May 2025 achieved performance scores of 99/100 on mobile and 100/100 on desktop. The project strengthened my experience with cloud services, APIs and web application development.',
  images: [
    '/projects/weather-app.png',
    '/projects/weather-performance.png',
  ],
},

].map((project) => ({
  ...project,
  images: project.images.map(
    (src) => `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`
  ),
}))
