// src/data/languageCourseContent.js

const languageCourseContent = {
    cpp: {
      breadcrumb: 'Catalog > Programming Languages > Practice C++',
      title: 'Practice C++',
      icon: '/icons/cpp.png',
      description: 'Solve C++ Practice problems online with the Practice C++ path on CodeChef...',
      stats: {
        rating: 4.5,
        reviews: 15227,
        problems: 206,
        level: 'Beginner level',
        learners: '91.3k',
      },
      problemsList: [
        {
          sectionTitle: 'Output & Basic math operators',
          sectionDescription: 'Practice problems related to output on multiple lines — 0/21 Solved',
          problems: [
            'Code Output - MCQ',
            'Print Coding, Chef!',
            'Identify Correct Syntax',
            'Print difference of 10 and 3',
            'Correct Syntax for Header',
            'Print String num',
          ],
        }
      ],
      testimonial: {
        text: '"It was a very nice experience for me... I am literally very happy. Thanks for this."',
        name: 'MUSKAN KUMARI',
        role: 'Student',
        rating: 5.0
      },
      roadmap: {
        title: 'C++ with Beginner DSA roadmap ⚡',
        tracks: [
          { title: 'Learn C++', courses: 2 },
          { title: 'Beginner DSA in C++', courses: 4 }
        ]
      },
      prerequisite: {
        icon: '/icons/cpp.png',
        title: 'Learn C++',
        rating: '4.7 (21996)',
        meta: '87.3k learners · 41 lessons'
      }
    },
  
    python: {
      breadcrumb: 'Catalog > Programming Languages > Practice Python',
      title: 'Practice Python',
      icon: '/icons/python.png',
      description: 'Solve Python coding problems online...',
      stats: {
        rating: 4.6,
        reviews: 19830,
        problems: 192,
        level: 'Beginner level',
        learners: '120k',
      },
      problemsList: [
        {
          sectionTitle: 'Basic Python I/O & Conditions',
          sectionDescription: 'Get started with printing, variables, and basic conditions.',
          problems: [
            'Print Hello World',
            'Sum Two Numbers',
            'Check Odd or Even',
            'If Condition Practice',
            'Print Multiline String',
            'Simple Input/Output',
          ],
        }
      ],
      testimonial: {
        text: '"This practice path really helped me boost my Python basics. I can now solve real challenges!"',
        name: 'RAHUL SHARMA',
        role: 'Student',
        rating: 4.8
      },
      roadmap: {
        title: 'Python DSA Beginner roadmap',
        tracks: [
          { title: 'Learn Python', courses: 3 },
          { title: 'Beginner Python DSA', courses: 5 }
        ]
      },
      prerequisite: {
        icon: '/icons/python.png',
        title: 'Learn Python',
        rating: '4.6 (18900)',
        meta: '98k learners · 37 lessons'
      }
    },
    java: {
        title: 'Practice Java',
        slug: 'java',
        icon: '/icons/java.png',
        description: 'Complete your Java coding practice with our online Java practice course on CodeChef. Solve over 180 Java problems across topics.',
        breadcrumb: 'Catalog > Programming Languages > Practice Java',
        stats: {
          rating: 4.6,
          reviews: 14000,
          problems: 181,
          level: 'Beginner level',
          learners: '78.2k'
        },
        problemsList: [
          {
            sectionTitle: 'Intro to Java & Output',
            sectionDescription: 'Practice problems on printing text, using basic operators and syntax in Java — 0/25 Solved',
            problems: [
              'Print Hello World',
              'System.out.println vs print',
              'Java Escape Sequences',
              'Basic Arithmetic in Java',
              'Concatenate Strings in Java'
            ]
          }
        ],
        prerequisite: {
          title: 'Learn Java',
          icon: '/icons/java.png',
          rating: '4.6 (19000)',
          meta: '84.1k learners · 36 lessons'
        },
        roadmap: {
          title: 'Java + DSA Beginner Roadmap 🚀',
          tracks: [
            { title: 'Java Basics', courses: 2 },
            { title: 'DSA in Java', courses: 3 }
          ]
        },
        testimonial: {
          text: 'Loved the structured challenges. Java made simple!',
          name: 'RAHUL SINGH',
          role: 'Student',
          rating: '4.9'
        }
    }, 
    c: {
      title: 'Practice C',
      slug: 'c',
      icon: '/icons/c.png',
      description: 'Improve your C programming skills with over 200 coding practice problems. Solve these beginner problems hands-on.',
      breadcrumb: 'Catalog > Programming Languages > Practice C',
      stats: {
        rating: 4.4,
        reviews: 13200,
        problems: 222,
        level: 'Beginner level',
        learners: '63.4k'
      },
      problemsList: [
        {
          sectionTitle: 'C Output & Basics',
          sectionDescription: 'Practice simple output, scanf usage, basic math operations — 0/30 Solved',
          problems: [
            'Print Hello in C',
            'Use printf and puts',
            'Add two integers',
            'Find average of numbers',
            'Correct syntax for scanf'
          ]
        }
      ],
      prerequisite: {
        title: 'Learn C Programming',
        icon: '/icons/c.png',
        rating: '4.5 (16440)',
        meta: '61.9k learners · 33 lessons'
      },
      roadmap: {
        title: 'C Programming with DSA Path 🧠',
        tracks: [
          { title: 'Intro to C', courses: 1 },
          { title: 'Beginner DSA in C', courses: 3 }
        ]
      },
      testimonial: {
        text: 'The C practice sets helped reinforce all fundamentals.',
        name: 'ANITA DAS',
        role: 'Student',
        rating: '4.8'
      }
    },
    javascript: {
      title: 'Practice JavaScript',
      slug: 'javascript',
      icon: '/icons/js.png',
      description: 'Practice JavaScript online with our curated beginner coding problems. Test your JS logic and DOM manipulation.',
      breadcrumb: 'Catalog > Programming Languages > Practice JavaScript',
      stats: {
        rating: 4.7,
        reviews: 17800,
        problems: 169,
        level: 'Beginner level',
        learners: '86.7k'
      },
      problemsList: [
        {
          sectionTitle: 'JS Basics & Console',
          sectionDescription: 'Write basic JS code for output, variables, string operations — 0/20 Solved',
          problems: [
            'Console.log Practice',
            'Declare Variables in JS',
            'String Interpolation',
            'Simple Math in JS',
            'Fix Undefined Output'
          ]
        }
      ],
      prerequisite: {
        title: 'Learn JavaScript',
        icon: '/icons/js.png',
        rating: '4.8 (23000)',
        meta: '90.1k learners · 38 lessons'
      },
      roadmap: {
        title: 'JS with DOM + Projects 🚀',
        tracks: [
          { title: 'JavaScript Basics', courses: 2 },
          { title: 'DOM & Projects', courses: 3 }
        ]
      },
      testimonial: {
        text: 'JS finally clicked thanks to the hands-on challenges!',
        name: 'VIJAY KUMAR',
        role: 'Frontend Intern',
        rating: '5.0'
      }
    },
    php: {
        title: 'Practice PHP',
        slug: 'php',
        icon: '/icons/php.png',
        description: 'Enhance your PHP skills with our hands-on practice course. Master PHP syntax and real-world exercises.',
        breadcrumb: 'Catalog > Programming Languages > Practice PHP',
        stats: {
          rating: 4.5,
          reviews: 10234,
          problems: 199,
          level: 'Beginner level',
          learners: '57.2k'
        },
        problemsList: [
          {
            sectionTitle: 'PHP Basics & Output',
            sectionDescription: 'Solve beginner PHP problems related to echo, variables, and basic arithmetic — 0/24 Solved',
            problems: [
              'Print Hello PHP',
              'Using echo and print',
              'PHP Variables Practice',
              'Basic Arithmetic in PHP',
              'Correct use of semicolons'
            ]
          }
        ],
        prerequisite: {
          title: 'Learn PHP',
          icon: '/icons/php.png',
          rating: '4.4 (11200)',
          meta: '45.6k learners · 28 lessons'
        },
        roadmap: {
          title: 'Web Backend with PHP 🛠️',
          tracks: [
            { title: 'PHP Basics', courses: 1 },
            { title: 'PHP + MySQL', courses: 2 }
          ]
        },
        testimonial: {
          text: 'Simple and clear approach to PHP fundamentals!',
          name: 'REENA SINGH',
          role: 'Web Developer',
          rating: '4.7'
        }
      },
    'html-css': {
      title: 'Projects using HTML / CSS',
      slug: 'html-css',
      icon: '/icons/html.png',
      description: 'Practice HTML and CSS with our on-site editor. Code 7 guided projects and solve layout-based MCQs.',
      breadcrumb: 'Catalog > Web Development > Projects using HTML / CSS',
      stats: {
        rating: 4.8,
        reviews: 16542,
        problems: 183,
        level: 'Beginner level',
        learners: '73.5k'
      },
      problemsList: [
        {
          sectionTitle: 'HTML Tags & Styling',
          sectionDescription: 'Work on layout structures and basic style tags in HTML/CSS — 0/18 Solved',
          problems: [
            'Create a basic webpage',
            'Add headings and paragraphs',
            'Style with CSS classes',
            'Build a navigation bar',
            'Center text using Flexbox'
          ]
        }
      ],
      prerequisite: {
        title: 'Learn HTML & CSS',
        icon: '/icons/html.png',
        rating: '4.9 (21000)',
        meta: '91.8k learners · 35 lessons'
      },
      roadmap: {
        title: 'Frontend Developer Journey 🖥️',
        tracks: [
          { title: 'HTML/CSS Basics', courses: 2 },
          { title: 'Responsive Layouts', courses: 2 }
        ]
      },
      testimonial: {
        text: 'I loved creating live projects as I learned HTML & CSS!',
        name: 'ARJUN MEHTA',
        role: 'Student',
        rating: '4.9'
      }
    },  
    sql: {
      title: 'SQL Practice Queries',
      slug: 'sql',
      icon: '/icons/sql.png',
      description: 'Practice SQL queries like SELECT, WHERE, JOIN, GROUP BY and Subqueries. Solve MCQs and query challenges.',
      breadcrumb: 'Catalog > Databases > SQL Practice Queries',
      stats: {
        rating: 4.6,
        reviews: 18765,
        problems: 93,
        level: 'Intermediate level',
        learners: '68.4k'
      },
      problemsList: [
        {
          sectionTitle: 'Basic SELECT & Filtering',
          sectionDescription: 'Practice SELECT, WHERE, ORDER BY and LIMIT — 0/19 Solved',
          problems: [
            'Simple SELECT query',
            'Filter with WHERE clause',
            'Sort results with ORDER BY',
            'LIMIT number of rows',
            'Combine WHERE and ORDER BY'
          ]
        }
      ],
      prerequisite: {
        title: 'Learn SQL Basics',
        icon: '/icons/sql.png',
        rating: '4.7 (19500)',
        meta: '76.3k learners · 25 lessons'
      },
      roadmap: {
        title: 'Database Mastery Path 📊',
        tracks: [
          { title: 'SQL Fundamentals', courses: 2 },
          { title: 'Advanced SQL & Joins', courses: 2 }
        ]
      },
      testimonial: {
        text: 'SQL exercises helped me crack interviews with ease.',
        name: 'NEHA AGARWAL',
        role: 'Data Analyst',
        rating: '5.0'
      }
    }
};
    
  export default languageCourseContent;
  