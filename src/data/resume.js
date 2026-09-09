export const profile = {
  name: 'Dheeraj Kiran Enna',
  title: 'Robotics & AI Engineer',
  tagline:
    'M.S. Robotics and Autonomous Systems (AI) building perception pipelines, LLM-driven systems, and real-time intelligent applications.',
  email: 'denna@asu.edu',
  phone: '623-330-6532',
  linkedin: 'https://linkedin.com/in/dheerajkiran',
  github: 'https://github.com/dheerajkiran',
  resumeUrl: '/Resume.pdf',
}

export const education = [
  {
    school: 'Arizona State University',
    location: 'Tempe, AZ',
    degree: 'M.S. Robotics and Autonomous Systems (Artificial Intelligence)',
    date: 'May 2026',
    detail: 'GPA: 3.9 / 4.0',
  },
  {
    school: 'VIT-AP Institute of Technology',
    location: 'India',
    degree: 'B.Tech in Computer Science (Robotics)',
    date: '2024',
    detail: 'GPA: 9.41 / 10',
  },
]

export const skills = [
  {
    group: 'Programming',
    items: ['Python', 'Java', 'C', 'SQL'],
  },
  {
    group: 'AI / ML',
    items: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'LLMs', 'Statistical Modeling'],
  },
  {
    group: 'Frameworks & Libraries',
    items: ['PyTorch', 'Scikit-learn', 'NumPy', 'Pandas', 'OpenCV', 'YOLOv8', 'OpenAI API'],
  },
  {
    group: 'Robotics',
    items: ['ROS 2', 'Autonomous Systems', 'Perception Systems'],
  },
  {
    group: 'Cloud & Databases',
    items: ['AWS', 'Firebase', 'MongoDB'],
  },
  {
    group: 'Tools',
    items: ['Docker', 'Linux', 'Git', 'Tableau'],
  },
]

export const projects = [
  {
    title: 'Autonomous Perception System',
    date: '2026',
    tag: 'In Progress',
    summary:
      'Perception pipeline inspired by self-driving systems, combining object detection and scene understanding in a modular, scalable architecture.',
    bullets: [
      'Developed an autonomous perception pipeline inspired by self-driving systems',
      'Implemented object detection and scene understanding modules',
      'Designed a modular architecture supporting experimentation and scalable deployment',
    ],
    stack: ['Computer Vision', 'Perception', 'Modular Architecture'],
  },
  {
    title: 'Emotion-Aware Analytics System',
    date: '2025',
    tag: 'LLM Pipeline',
    summary:
      'Real-time sentiment analysis system built on OpenAI APIs with a live dashboard for time-series emotional trend analysis.',
    bullets: [
      'Developed a real-time sentiment analysis system using OpenAI APIs',
      'Built backend pipeline using Firebase and Google Sheets for data processing',
      'Designed visualization dashboard for time-series emotional trend analysis',
      'Integrated LLM-based inference into a production-style analytics workflow',
    ],
    stack: ['OpenAI API', 'Firebase', 'Google Sheets', 'Dashboarding'],
  },
  {
    title: 'AI-Powered Assistive Vision System',
    date: '2023 – 2024',
    tag: 'Real-Time Perception',
    summary:
      'End-to-end assistive vision system pairing YOLOv8 detection with a Random Forest classifier (91% accuracy), deployed on ESP32-CAM hardware with real-time alerts.',
    bullets: [
      'Designed and deployed a real-time computer vision system using YOLOv8 and Random Forest (91% accuracy)',
      'Built an end-to-end perception pipeline integrating ESP32-CAM, inference, and Telegram-based alerts',
      'Implemented backend system using MongoDB for real-time data storage and retrieval',
      'Engineered the system for low-latency inference under real-world deployment constraints',
    ],
    stack: ['YOLOv8', 'Random Forest', 'ESP32-CAM', 'MongoDB'],
  },
]

export const experience = [
  {
    role: 'Graduate Service Assistant (Teaching Assistant)',
    org: 'Arizona State University',
    date: '08/2025 – 12/2025',
    bullets: [
      'Supported Applied Data Science II and Applied Econometrics; guided students on data analysis and statistical modeling',
      'Evaluated assignments ensuring correctness in data processing and model outputs',
      'Provided guidance on data pipelines, regression models, and analytical workflows',
    ],
  },
  {
    role: 'Database Intern',
    org: 'RINL — Vizag Steel Plant',
    date: '01/2024 – 06/2024',
    bullets: [
      'Worked on database management and data processing for warehouse operations',
      'Assisted in data integration and ensured consistency across systems',
    ],
  },
]

export const publications = [
  {
    title: 'Cognitive Assistance System for Dementia Patients',
    venue: 'IEEE Xplore',
    doi: '10.1109/ICETSIS61505.2024.10459484',
    url: 'https://doi.org/10.1109/ICETSIS61505.2024.10459484',
  },
]

export const certifications = [
  { name: 'AWS Certified Solutions Architect – Associate', issuer: 'AWS' },
  { name: 'Artificial Intelligence Analyst', issuer: 'IBM' },
  { name: 'Applied Machine Learning', issuer: 'Boston IT Solutions' },
  { name: 'MATLAB for Data Processing', issuer: 'MathWorks' },
]
