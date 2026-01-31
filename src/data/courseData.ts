export interface LearningOutcome {
  id: string;
  text: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  lastUpdated?: string;
}

export interface WeekTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Week {
  id: string;
  weekNumber: number;
  title: string;
  dateRange: string;
  description?: string;
  learningOutcomes: LearningOutcome[];
  tasks: WeekTask[];
  notes?: string;
}

export interface Assessment {
  id: string;
  name: string;
  description: string;
  weight: string;
  alignedLOs: string[];
  date: string;
  time?: string;
  venue?: string;
  isExam: boolean;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  url: string;
  colorClass: string;
  learningOutcomes: string[];
  weeks: Week[];
  assessments: Assessment[];
}

export const courses: Course[] = [
  {
    id: 'programming',
    code: 'ITE1123',
    name: 'Fundamentals of Programming',
    url: 'https://online.codl.lk/course/view.php?id=1414',
    colorClass: 'course-card-programming',
    learningOutcomes: [
      'Explain the basic concepts of computer programming and program design',
      'Design Programs using flowcharts and pseudocodes',
      'Develop small-scale computer programs using IDE'
    ],
    weeks: [
      {
        id: 'prog-w1',
        weekNumber: 1,
        title: 'Introduction to Computer Programming',
        dateRange: '9 Feb - 15 Feb',
        description: 'Understanding basics of computer programming, programming paradigms, computational thinking, and algorithms.',
        learningOutcomes: [
          { id: 'prog-w1-lo1', text: 'Understand basics of computer programming' },
          { id: 'prog-w1-lo2', text: 'Compare different programming paradigms' },
          { id: 'prog-w1-lo3', text: 'Define computational thinking' },
          { id: 'prog-w1-lo4', text: 'Define key aspects of algorithms' }
        ],
        tasks: []
      },
      {
        id: 'prog-w2',
        weekNumber: 2,
        title: 'Use of Integrated Development Environments (IDEs)',
        dateRange: '16 Feb - 22 Feb',
        description: 'Python Programming - Setting up and using IDEs.',
        learningOutcomes: [
          { id: 'prog-w2-lo1', text: 'Set up Python locally' },
          { id: 'prog-w2-lo2', text: 'Explain the importance of use of an IDE' },
          { id: 'prog-w2-lo3', text: 'Use an IDE to write your first Python program' }
        ],
        tasks: []
      },
      {
        id: 'prog-w3',
        weekNumber: 3,
        title: 'Program Design',
        dateRange: '23 Feb - 1 March',
        description: 'Designing computer programs using analysis, requirements, and flowcharts.',
        learningOutcomes: [
          { id: 'prog-w3-lo1', text: 'Define the concepts of program analysis' },
          { id: 'prog-w3-lo2', text: 'Explain how to gather requirements' },
          { id: 'prog-w3-lo3', text: 'Compare different strategies for problem-solving' },
          { id: 'prog-w3-lo4', text: 'Draw flowcharts and write pseudocodes' }
        ],
        tasks: []
      },
      {
        id: 'prog-w4',
        weekNumber: 4,
        title: 'Variables and Data Types',
        dateRange: '2 March - 8 March',
        description: 'Basic elements of programming - Variables and Data types.',
        learningOutcomes: [
          { id: 'prog-w4-lo1', text: 'Define the necessity of variables in programming' },
          { id: 'prog-w4-lo2', text: 'Compare different data types' },
          { id: 'prog-w4-lo3', text: 'Apply variables and data types in computer programming' }
        ],
        tasks: []
      },
      {
        id: 'prog-w5',
        weekNumber: 5,
        title: 'Expressions and Operators',
        dateRange: '9 March - 15 March',
        description: 'Using expressions and operators in programming.',
        learningOutcomes: [
          { id: 'prog-w5-lo1', text: 'Compare statements and expressions' },
          { id: 'prog-w5-lo2', text: 'Apply different types of operators in Python programs' },
          { id: 'prog-w5-lo3', text: 'Define the importance of comments' }
        ],
        tasks: []
      },
      {
        id: 'prog-w6',
        weekNumber: 6,
        title: 'Conditional Statements',
        dateRange: '16 March - 22 March',
        description: 'Using conditional statements effectively.',
        learningOutcomes: [
          { id: 'prog-w6-lo1', text: 'Use if, elif, and else in Python programming' },
          { id: 'prog-w6-lo2', text: 'Apply logical operators with conditions' }
        ],
        tasks: []
      },
      {
        id: 'prog-w7',
        weekNumber: 7,
        title: 'Loops in Programming',
        dateRange: '23 March - 29 March',
        description: 'Repetition statements - for and while loops.',
        learningOutcomes: [
          { id: 'prog-w7-lo1', text: 'Use for and while loops in Python programming' },
          { id: 'prog-w7-lo2', text: 'Apply control statements such as break and continue with loops' }
        ],
        tasks: []
      },
      {
        id: 'prog-w8',
        weekNumber: 8,
        title: 'Lists, Tuples, Sets, and Dictionaries',
        dateRange: '30 March - 5 April',
        description: 'Data structures in programming.',
        learningOutcomes: [
          { id: 'prog-w8-lo1', text: 'Compare and contrast commonly used data structures' },
          { id: 'prog-w8-lo2', text: 'Use lists, tuples, sets, and dictionaries in Python' }
        ],
        tasks: []
      },
      {
        id: 'prog-w9',
        weekNumber: 9,
        title: 'Functions I',
        dateRange: '6 April - 12 April',
        description: 'Introduction to functions in programming.',
        learningOutcomes: [
          { id: 'prog-w9-lo1', text: 'Explain concepts of defining functions, arguments, calling functions' },
          { id: 'prog-w9-lo2', text: 'Use functions in Python programming' }
        ],
        tasks: []
      },
      {
        id: 'prog-w10',
        weekNumber: 10,
        title: 'Functions II (Advanced)',
        dateRange: '20 April - 26 April',
        description: 'Advanced function concepts - scope, modules, lambda, recursion.',
        learningOutcomes: [
          { id: 'prog-w10-lo1', text: 'Define the concepts of scope and module' },
          { id: 'prog-w10-lo2', text: 'Use Lambda and recursive functions in Python' }
        ],
        tasks: []
      },
      {
        id: 'prog-w11',
        weekNumber: 11,
        title: 'Strings in Programming',
        dateRange: '27 April - 3 May',
        description: 'Working with strings and keyboard inputs.',
        learningOutcomes: [
          { id: 'prog-w11-lo1', text: 'Apply String operations' },
          { id: 'prog-w11-lo2', text: 'Write a Python program using keyboard inputs' }
        ],
        tasks: []
      },
      {
        id: 'prog-w12',
        weekNumber: 12,
        title: 'File Handling',
        dateRange: '4 May - 10 May',
        description: 'Handling file inputs and outputs.',
        learningOutcomes: [
          { id: 'prog-w12-lo1', text: 'Read contents from files' },
          { id: 'prog-w12-lo2', text: 'Write contents to files' }
        ],
        tasks: []
      },
      {
        id: 'prog-w13',
        weekNumber: 13,
        title: 'Error Handling',
        dateRange: '18 May - 24 May',
        description: 'Identifying and handling common errors.',
        learningOutcomes: [
          { id: 'prog-w13-lo1', text: 'Identify common errors in programming' },
          { id: 'prog-w13-lo2', text: 'Handle errors using Python' }
        ],
        tasks: []
      },
      {
        id: 'prog-w14',
        weekNumber: 14,
        title: 'Programming Skills Development',
        dateRange: '25 May - 1 June',
        description: 'Revision and exercises including match-case statements.',
        learningOutcomes: [
          { id: 'prog-w14-lo1', text: 'Revise concepts from the lecture series' },
          { id: 'prog-w14-lo2', text: 'Apply additional programming elements like match-case statements' },
          { id: 'prog-w14-lo3', text: 'Develop programming skills via practicing' }
        ],
        tasks: []
      }
    ],
    assessments: [
      { id: 'prog-a1', name: 'Summative Assessment 1', description: 'Quiz', weight: '5%', alignedLOs: ['LO1'], date: 'End of Week 5', isExam: false },
      { id: 'prog-a2', name: 'Summative Assessment 2', description: 'Quiz', weight: '5%', alignedLOs: ['LO1', 'LO2'], date: 'End of Week 8', isExam: false },
      { id: 'prog-a3', name: 'Summative Assessment 3 (Practical Exam)', description: 'Proctored quiz', weight: '30%', alignedLOs: ['LO3'], date: '2026-05-17', time: '12:30 PM - 1:30 PM', venue: 'University of Moratuwa', isExam: true },
      { id: 'prog-a4', name: 'End Semester Exam', description: 'All sections', weight: '60%', alignedLOs: ['All'], date: '2026-07-11', time: '11:00 AM - 1:00 PM', venue: 'University of Moratuwa', isExam: true }
    ]
  },
  {
    id: 'systems',
    code: 'ITE1213',
    name: 'Computer Systems',
    url: 'https://online.codl.lk/course/view.php?id=1413',
    colorClass: 'course-card-systems',
    learningOutcomes: [
      'Demonstrate detailed knowledge of modern computer systems structure and function',
      'Apply fundamental principles of combinatorial digital logic',
      'Recognize computers as hierarchy of functional layers',
      'Identify the important role of an Operating System',
      'Recommend a computer system for a small organization'
    ],
    weeks: [
      { id: 'sys-w1', weekNumber: 1, title: 'Introduction to Computer Systems', dateRange: '9 Feb - 15 Feb', learningOutcomes: [{ id: 'sys-w1-lo1', text: 'Define a computer system and its components' }], tasks: [] },
      { id: 'sys-w2', weekNumber: 2, title: 'Data Representation', dateRange: '16 Feb - 22 Feb', learningOutcomes: [{ id: 'sys-w2-lo1', text: 'Understand binary and hexadecimal number systems' }], tasks: [] },
      { id: 'sys-w3', weekNumber: 3, title: 'Digital Logic Basics', dateRange: '23 Feb - 1 Mar', learningOutcomes: [{ id: 'sys-w3-lo1', text: 'Explain basic logic gates and Boolean algebra' }], tasks: [] },
      { id: 'sys-w4', weekNumber: 4, title: 'Combinatorial Circuits', dateRange: '2 Mar - 8 Mar', learningOutcomes: [{ id: 'sys-w4-lo1', text: 'Design simple combinatorial logic circuits' }], tasks: [] },
      { id: 'sys-w5', weekNumber: 5, title: 'Sequential Circuits', dateRange: '9 Mar - 15 Mar', learningOutcomes: [{ id: 'sys-w5-lo1', text: 'Explain the role of flip-flops and registers' }], tasks: [] },
      { id: 'sys-w6', weekNumber: 6, title: 'Processor Architecture', dateRange: '16 Mar - 22 Mar', learningOutcomes: [{ id: 'sys-w6-lo1', text: 'Describe the CPU fetch-decode-execute cycle' }], tasks: [] },
      { id: 'sys-w7', weekNumber: 7, title: 'Memory Hierarchy', dateRange: '23 Mar - 29 Mar', learningOutcomes: [{ id: 'sys-w7-lo1', text: 'Compare RAM, ROM, and Cache memory' }], tasks: [] },
      { id: 'sys-w8', weekNumber: 8, title: 'Input/Output Systems', dateRange: '30 Mar - 5 Apr', learningOutcomes: [{ id: 'sys-w8-lo1', text: 'Explain I/O interface and interrupt handling' }], tasks: [] },
      { id: 'sys-w9', weekNumber: 9, title: 'Storage Management', dateRange: '6 Apr - 12 Apr', learningOutcomes: [{ id: 'sys-w9-lo1', text: 'Understand secondary storage technologies' }], tasks: [] },
      { id: 'sys-w10', weekNumber: 10, title: 'Operating Systems', dateRange: '20 Apr - 26 Apr', learningOutcomes: [{ id: 'sys-w10-lo1', text: 'Understand the role of Operating Systems' }], tasks: [] },
      { id: 'sys-w11', weekNumber: 11, title: 'Digital World', dateRange: '27 Apr - 3 May', learningOutcomes: [{ id: 'sys-w11-lo1', text: 'Explore the impact of digital technology on society' }], tasks: [] },
      { id: 'sys-w12', weekNumber: 12, title: 'Working with Application Software', dateRange: '4 May - 10 May', learningOutcomes: [{ id: 'sys-w12-lo1', text: 'Understand the lifecycle of application software' }], tasks: [] },
      { id: 'sys-w13', weekNumber: 13, title: 'Open Source Tools', dateRange: '18 May - 24 May', learningOutcomes: [{ id: 'sys-w13-lo1', text: 'Identify the benefits of open-source software' }], tasks: [] },
      { id: 'sys-w14', weekNumber: 14, title: 'Modern Trends', dateRange: '25 May - 31 May', learningOutcomes: [{ id: 'sys-w14-lo1', text: 'Explore emerging trends in computer hardware' }], tasks: [] }
    ],
    assessments: [
      { id: 'sys-a1', name: 'Practical Exam', description: 'Proctored exam', weight: '30%', alignedLOs: ['LO1-LO5'], date: '2026-05-17', venue: 'University of Moratuwa', isExam: true },
      { id: 'sys-a2', name: 'Final Semester Exam', description: 'Written exam', weight: '70%', alignedLOs: ['All'], date: '2026-07-11', venue: 'University of Moratuwa', isExam: true }
    ]
  },
  {
    id: 'web',
    code: 'ITE1713',
    name: 'Web Design',
    url: 'https://online.codl.lk/course/view.php?id=1412',
    colorClass: 'course-card-web',
    learningOutcomes: [
      'Describe the way the web works with appropriate network terminology',
      'Apply HTML, CSS and JavaScript to construct interactive websites',
      'Develop responsive web designs that adapt to different devices',
      'Review various designs to identify strengths and weaknesses'
    ],
    weeks: [
      {
        id: 'web-w1',
        weekNumber: 1,
        title: 'Introduction to Web Design',
        dateRange: '9 Feb - 15 Feb',
        description: 'Overview of web designing, history of WWW, and fundamentals.',
        learningOutcomes: [
          { id: 'web-w1-lo1', text: 'Understand web designing and its importance' },
          { id: 'web-w1-lo2', text: 'Learn about application areas and communication concepts' },
          { id: 'web-w1-lo3', text: 'Set up development environment for web applications' }
        ],
        tasks: [
          { id: 'web-w1-t1', text: 'Read Week 1 Overview', completed: false },
          { id: 'web-w1-t2', text: 'Watch Introduction to Web Design video', completed: false },
          { id: 'web-w1-t3', text: 'Study Lesson 1', completed: false },
          { id: 'web-w1-t4', text: 'Watch Fundamentals and History of WWW', completed: false },
          { id: 'web-w1-t5', text: 'Engage with 1.1 Introduction to Networking and WWW', completed: false },
          { id: 'web-w1-t6', text: 'Engage with 1.2 Deep dive into Internet', completed: false },
          { id: 'web-w1-t7', text: 'Set up Development Environment', completed: false }
        ]
      },
      {
        id: 'web-w2',
        weekNumber: 2,
        title: 'Mark-up Languages and HTML/XHTML',
        dateRange: '16 Feb - 22 Feb',
        description: 'Features of markup languages and HTML basics.',
        learningOutcomes: [
          { id: 'web-w2-lo1', text: 'Learn features of markup languages' },
          { id: 'web-w2-lo2', text: 'Use HTML as a web markup language' }
        ],
        tasks: [
          { id: 'web-w2-t1', text: 'Read Week 2 Overview', completed: false },
          { id: 'web-w2-t2', text: 'Watch Introduction to Markup Languages video', completed: false },
          { id: 'web-w2-t3', text: 'Study Lesson 2', completed: false },
          { id: 'web-w2-t4', text: 'Watch Lecture 2 - Introduction to WWW and Web Development', completed: false },
          { id: 'web-w2-t5', text: 'Go through HTML examples', completed: false }
        ]
      },
      {
        id: 'web-w3',
        weekNumber: 3,
        title: 'Hypertext Mark-up Language (HTML)',
        dateRange: '23 Feb - 1 Mar',
        description: 'HTML webpage formatting elements.',
        learningOutcomes: [
          { id: 'web-w3-lo1', text: 'Learn basic webpage formatting elements in HTML' },
          { id: 'web-w3-lo2', text: 'Master HTML5 structure and tags' }
        ],
        tasks: [
          { id: 'web-w3-t1', text: 'Read Week 3 Overview', completed: false },
          { id: 'web-w3-t2', text: 'Watch Introduction to HTML video', completed: false },
          { id: 'web-w3-t3', text: 'Study Lesson 3', completed: false },
          { id: 'web-w3-t4', text: 'Complete First Web Page Assignment (Formative)', completed: false },
          { id: 'web-w3-t5', text: 'Engage with 3.1-3.4 interactive videos', completed: false }
        ]
      },
      {
        id: 'web-w4',
        weekNumber: 4,
        title: 'Use of Integrated Development Environment',
        dateRange: '2 Mar - 8 Mar',
        description: 'Using WYSIWYG IDE applications.',
        learningOutcomes: [
          { id: 'web-w4-lo1', text: 'Use a WYSIWYG integrated environment' },
          { id: 'web-w4-lo2', text: 'Familiarize with GUI widgets' }
        ],
        tasks: [
          { id: 'web-w4-t1', text: 'Read Week 4 Overview', completed: false },
          { id: 'web-w4-t2', text: 'Study Lesson 4', completed: false },
          { id: 'web-w4-t3', text: 'Watch Lecture 4 video', completed: false },
          { id: 'web-w4-t4', text: 'Complete Feedback Questionnaire', completed: false }
        ]
      },
      {
        id: 'web-w5',
        weekNumber: 5,
        title: 'Create Tabulated Formats',
        dateRange: '9 Mar - 15 Mar',
        description: 'Web tables, lists, and multimedia in HTML.',
        learningOutcomes: [
          { id: 'web-w5-lo1', text: 'Design web tables and list items using multimedia' },
          { id: 'web-w5-lo2', text: 'Structure pages proportionally' }
        ],
        tasks: [
          { id: 'web-w5-t1', text: 'Read Week 5 Overview', completed: false },
          { id: 'web-w5-t2', text: 'Study Lesson 5', completed: false },
          { id: 'web-w5-t3', text: 'Review Short Tags document', completed: false },
          { id: 'web-w5-t4', text: 'Complete Tutorial exercises', completed: false },
          { id: 'web-w5-t5', text: 'Engage with 5.1-5.2 interactive videos', completed: false }
        ]
      },
      {
        id: 'web-w6',
        weekNumber: 6,
        title: 'Web Forms and Interaction Elements',
        dateRange: '16 Mar - 22 Mar',
        description: 'Creating web forms for user interaction.',
        learningOutcomes: [
          { id: 'web-w6-lo1', text: 'Create web forms with interactive elements' },
          { id: 'web-w6-lo2', text: 'Understand form attributes for data processing' }
        ],
        tasks: [
          { id: 'web-w6-t1', text: 'Read Week 6 Overview', completed: false },
          { id: 'web-w6-t2', text: 'Study Lesson 6', completed: false },
          { id: 'web-w6-t3', text: 'Complete Formative Assessment', completed: false },
          { id: 'web-w6-t4', text: 'Watch Lesson 6 lecture', completed: false },
          { id: 'web-w6-t5', text: 'Engage with 6.1-6.2 interactive videos', completed: false },
          { id: 'web-w6-t6', text: 'Start Assignment 1 (Summative)', completed: false }
        ]
      },
      {
        id: 'web-w7',
        weekNumber: 7,
        title: 'Cascading Style Sheets (CSS)',
        dateRange: '23 Mar - 29 Mar',
        description: 'HTML element styles and stylesheets.',
        learningOutcomes: [
          { id: 'web-w7-lo1', text: 'Understand inline, internal, and external styles' },
          { id: 'web-w7-lo2', text: 'Control web styles centrally for consistency' }
        ],
        tasks: [
          { id: 'web-w7-t1', text: 'Read Week 7 Overview', completed: false },
          { id: 'web-w7-t2', text: 'Study Lesson 7', completed: false },
          { id: 'web-w7-t3', text: 'Complete Activity 7.1 upload', completed: false },
          { id: 'web-w7-t4', text: 'Complete Activity 7.2 upload', completed: false },
          { id: 'web-w7-t5', text: 'Complete Activity 7.3 upload', completed: false },
          { id: 'web-w7-t6', text: 'Watch Lesson 7 lecture', completed: false },
          { id: 'web-w7-t7', text: 'Watch 7.1-7.8 interactive videos', completed: false }
        ]
      },
      {
        id: 'web-w8',
        weekNumber: 8,
        title: 'CSS Advanced Topics',
        dateRange: '30 Mar - 5 Apr',
        description: 'Advanced CSS including Bootstrap framework.',
        learningOutcomes: [
          { id: 'web-w8-lo1', text: 'Master CSS background styling and navigation' },
          { id: 'web-w8-lo2', text: 'Understand CSS Box Model' },
          { id: 'web-w8-lo3', text: 'Learn Bootstrap framework basics' }
        ],
        tasks: [
          { id: 'web-w8-t1', text: 'Watch 8.1-8.8 interactive videos', completed: false }
        ]
      },
      {
        id: 'web-w9',
        weekNumber: 9,
        title: 'DHTML and Introduction to JavaScript',
        dateRange: '6 Apr - 12 Apr',
        description: 'Dynamic HTML and JavaScript basics.',
        learningOutcomes: [
          { id: 'web-w9-lo1', text: 'Apply dynamic behaviors to web interfaces' },
          { id: 'web-w9-lo2', text: 'Learn script-programming concept with JavaScript' }
        ],
        tasks: [
          { id: 'web-w9-t1', text: 'Read Week 9 Overview', completed: false },
          { id: 'web-w9-t2', text: 'Study Lesson 8', completed: false },
          { id: 'web-w9-t3', text: 'Watch Lesson 8 Part 1 & 2', completed: false },
          { id: 'web-w9-t4', text: 'Engage with 9.1-9.2 interactive videos', completed: false }
        ]
      },
      {
        id: 'web-w10',
        weekNumber: 10,
        title: 'JavaScript Programming Concepts',
        dateRange: '20 Apr - 26 Apr',
        description: 'JavaScript programming structures.',
        learningOutcomes: [
          { id: 'web-w10-lo1', text: 'Write code with conditional and selection statements' },
          { id: 'web-w10-lo2', text: 'Create functions with parameters' }
        ],
        tasks: [
          { id: 'web-w10-t1', text: 'Read Week 10 Overview', completed: false },
          { id: 'web-w10-t2', text: 'Study Lesson 9', completed: false },
          { id: 'web-w10-t3', text: 'Complete Activity 9.6-9.12 uploads', completed: false },
          { id: 'web-w10-t4', text: 'Watch Lesson 9 Parts 1-4', completed: false },
          { id: 'web-w10-t5', text: 'Engage with 10.1-10.2 interactive videos', completed: false }
        ]
      },
      {
        id: 'web-w11',
        weekNumber: 11,
        title: 'Asynchronous Programming Using JavaScript',
        dateRange: '27 Apr - 3 May',
        description: 'Control loops, arrays, and iterative structures.',
        learningOutcomes: [
          { id: 'web-w11-lo1', text: 'Apply loops with conditions and nesting' },
          { id: 'web-w11-lo2', text: 'Use Arrays in JavaScript' }
        ],
        tasks: [
          { id: 'web-w11-t1', text: 'Read Week 11 Overview', completed: false },
          { id: 'web-w11-t2', text: 'Study Lesson 10', completed: false },
          { id: 'web-w11-t3', text: 'Complete Activity 10.2-10.8 uploads', completed: false },
          { id: 'web-w11-t4', text: 'Watch Lesson 10 Parts 1-2', completed: false },
          { id: 'web-w11-t5', text: 'Engage with 11.1-11.3 interactive videos', completed: false }
        ]
      },
      {
        id: 'web-w12',
        weekNumber: 12,
        title: 'User Interaction and Time Controls',
        dateRange: '4 May - 10 May',
        description: 'Event handling, time synchronization, and jQuery.',
        learningOutcomes: [
          { id: 'web-w12-lo1', text: 'Handle form interactions and events' },
          { id: 'web-w12-lo2', text: 'Create time synchronization of elements' },
          { id: 'web-w12-lo3', text: 'Use jQuery for input validation' }
        ],
        tasks: [
          { id: 'web-w12-t1', text: 'Read Week 12 Overview', completed: false },
          { id: 'web-w12-t2', text: 'Study Lesson 11', completed: false },
          { id: 'web-w12-t3', text: 'Complete Activity 11.5-11.10 uploads', completed: false },
          { id: 'web-w12-t4', text: 'Watch Lesson 10 Parts 1-3', completed: false },
          { id: 'web-w12-t5', text: 'Engage with error handling and JSON videos', completed: false }
        ]
      },
      {
        id: 'web-w13',
        weekNumber: 13,
        title: 'JavaScript Libraries for DOM and SPA',
        dateRange: '18 May - 24 May',
        description: 'DOM integration libraries and single page applications.',
        learningOutcomes: [
          { id: 'web-w13-lo1', text: 'Integrate dynamic elements using DOM' },
          { id: 'web-w13-lo2', text: 'Work with AJAX and REST APIs' }
        ],
        tasks: [
          { id: 'web-w13-t1', text: 'Read Week 13 Overview', completed: false },
          { id: 'web-w13-t2', text: 'Study Lesson 13', completed: false },
          { id: 'web-w13-t3', text: 'Engage with 13.1-13.2 interactive videos', completed: false }
        ]
      },
      {
        id: 'web-w14',
        weekNumber: 14,
        title: 'Web Hosting and Maintenance',
        dateRange: '25 May - 31 May',
        description: 'Web server systems and maintenance.',
        learningOutcomes: [
          { id: 'web-w14-lo1', text: 'Understand web server systems and platforms' },
          { id: 'web-w14-lo2', text: 'Apply UI/UX Design Principles' },
          { id: 'web-w14-lo3', text: 'Design responsive web pages for different devices' }
        ],
        tasks: [
          { id: 'web-w14-t1', text: 'Read Week 14 Overview', completed: false },
          { id: 'web-w14-t2', text: 'Study Lesson 14', completed: false },
          { id: 'web-w14-t3', text: 'Engage with 14.1-14.3 interactive videos', completed: false }
        ]
      }
    ],
    assessments: [
      { id: 'web-a1', name: 'Assignment 1', description: 'HTML/CSS Project', weight: '10%', alignedLOs: ['LO2'], date: 'Week 6-8', isExam: false },
      { id: 'web-a2', name: 'Practical Exam', description: 'Proctored exam', weight: '30%', alignedLOs: ['LO2', 'LO3'], date: '2026-05-17', venue: 'University of Moratuwa', isExam: true },
      { id: 'web-a3', name: 'Final Semester Exam', description: 'Written exam', weight: '60%', alignedLOs: ['All'], date: '2026-07-11', venue: 'University of Moratuwa', isExam: true }
    ]
  },
  {
    id: 'math',
    code: 'ITE1813',
    name: 'Mathematics & Statistics for IT',
    url: 'https://online.codl.lk/course/view.php?id=1411',
    colorClass: 'course-card-math',
    learningOutcomes: [
      'Apply algebraic operations and properties to solve equations and inequalities',
      'Apply concepts from number systems, sets, functions, and combinatorics',
      'Use probability theory to analyze and make informed decisions',
      'Summarize data using introductory statistical methods'
    ],
    weeks: [
      { id: 'math-w1', weekNumber: 1, title: 'Course Familiarization and Number Systems', dateRange: '9 Feb - 15 Feb', learningOutcomes: [{ id: 'math-w1-lo1', text: 'Understand number systems fundamentals' }], tasks: [] },
      { id: 'math-w2', weekNumber: 2, title: 'Representing Numbers - Computer Arithmetic', dateRange: '16 Feb - 22 Feb', learningOutcomes: [{ id: 'math-w2-lo1', text: 'Master computer arithmetic representations' }], tasks: [] },
      { id: 'math-w3', weekNumber: 3, title: 'Sets and Set Operations', dateRange: '23 Feb - 1 Mar', learningOutcomes: [{ id: 'math-w3-lo1', text: 'Apply set theory and operations' }], tasks: [] },
      { id: 'math-w4', weekNumber: 4, title: 'Algebraic Operations', dateRange: '2 Mar - 8 Mar', learningOutcomes: [{ id: 'math-w4-lo1', text: 'Perform algebraic operations' }], tasks: [] },
      { id: 'math-w5', weekNumber: 5, title: 'Simplifying Algebraic Expressions', dateRange: '9 Mar - 15 Mar', learningOutcomes: [{ id: 'math-w5-lo1', text: 'Simplify algebraic expressions' }], tasks: [] },
      { id: 'math-w6', weekNumber: 6, title: 'Functions and Relations', dateRange: '16 Mar - 22 Mar', learningOutcomes: [{ id: 'math-w6-lo1', text: 'Understand functions and relations' }], tasks: [] },
      { id: 'math-w7', weekNumber: 7, title: 'Combinatorics: Permutations and Combinations', dateRange: '23 Mar - 29 Mar', learningOutcomes: [{ id: 'math-w7-lo1', text: 'Apply permutations and combinations' }], tasks: [] },
      { id: 'math-w8', weekNumber: 8, title: 'Basic Concepts: Sample Space, Events, Probabilities', dateRange: '30 Mar - 5 Apr', learningOutcomes: [{ id: 'math-w8-lo1', text: 'Understand probability fundamentals' }], tasks: [] },
      { id: 'math-w9', weekNumber: 9, title: 'Conditional Probability and Independence', dateRange: '6 Apr - 12 Apr', learningOutcomes: [{ id: 'math-w9-lo1', text: 'Apply conditional probability' }], tasks: [] },
      { id: 'math-w10', weekNumber: 10, title: 'Bayesian Inference and Applications', dateRange: '20 Apr - 26 Apr', learningOutcomes: [{ id: 'math-w10-lo1', text: 'Apply Bayesian inference' }], tasks: [] },
      { id: 'math-w11', weekNumber: 11, title: 'Types of Data and Representations', dateRange: '27 Apr - 3 May', learningOutcomes: [{ id: 'math-w11-lo1', text: 'Understand data types and representation' }], tasks: [] },
      { id: 'math-w12', weekNumber: 12, title: 'Descriptive Statistics: Central Tendency and Dispersion', dateRange: '4 May - 10 May', learningOutcomes: [{ id: 'math-w12-lo1', text: 'Calculate measures of central tendency and dispersion' }], tasks: [] },
      { id: 'math-w13', weekNumber: 13, title: 'Random Variables and Probability Distributions', dateRange: '18 May - 24 May', learningOutcomes: [{ id: 'math-w13-lo1', text: 'Work with probability distributions' }], tasks: [] },
      { id: 'math-w14', weekNumber: 14, title: 'Introduction to Hypothesis Testing', dateRange: '30 May - 5 Jun', learningOutcomes: [{ id: 'math-w14-lo1', text: 'Understand hypothesis testing basics' }], tasks: [] }
    ],
    assessments: [
      { id: 'math-a1', name: 'Assignment 1', description: 'Quiz', weight: '10%', alignedLOs: ['LO1', 'LO2'], date: 'Week 7', isExam: false },
      { id: 'math-a2', name: 'Assignment 2', description: 'Proctored Quiz', weight: '20%', alignedLOs: ['LO3', 'LO4'], date: '2026-05-17', time: '9:00 AM - 9:30 AM', venue: 'University of Moratuwa', isExam: true },
      { id: 'math-a3', name: 'Final Examination', description: 'Written exam', weight: '70%', alignedLOs: ['All'], date: '2026-07-12', time: '8:30 AM - 10:30 AM', venue: 'University of Moratuwa', isExam: true }
    ]
  },
  {
    id: 'communication',
    code: 'ITE1913',
    name: 'Communication Skills Development',
    url: 'https://online.codl.lk/course/view.php?id=1410',
    colorClass: 'course-card-communication',
    learningOutcomes: [
      'LO1: Develop effective written and verbal communication skills',
      'LO2: Apply professional communication in various contexts'
    ],
    weeks: [
      { id: 'comm-w1', weekNumber: 1, title: 'Getting to Know People', dateRange: '9 Feb - 15 Feb', learningOutcomes: [{ id: 'comm-w1-lo1', text: 'Practice introductions and greetings' }], tasks: [] },
      { id: 'comm-w2', weekNumber: 2, title: 'Writing Basics', dateRange: '16 Feb - 22 Feb', learningOutcomes: [{ id: 'comm-w2-lo1', text: 'Master basic writing skills' }], tasks: [] },
      { id: 'comm-w3', weekNumber: 3, title: 'Talking about the Past', dateRange: '23 Feb - 1 Mar', learningOutcomes: [{ id: 'comm-w3-lo1', text: 'Use past tense effectively' }], tasks: [] },
      { id: 'comm-w4', weekNumber: 4, title: 'The Future', dateRange: '2 Mar - 8 Mar', learningOutcomes: [{ id: 'comm-w4-lo1', text: 'Discuss future plans and predictions' }], tasks: [] },
      { id: 'comm-w5', weekNumber: 5, title: 'Asking and Giving Information', dateRange: '9 Mar - 15 Mar', learningOutcomes: [{ id: 'comm-w5-lo1', text: 'Master information exchange techniques' }], tasks: [] },
      { id: 'comm-w6', weekNumber: 6, title: 'Being Polite', dateRange: '16 Mar - 22 Mar', learningOutcomes: [{ id: 'comm-w6-lo1', text: 'Apply polite language in communication' }], tasks: [] },
      { id: 'comm-w7', weekNumber: 7, title: 'Speculations and Predicaments', dateRange: '23 Mar - 29 Mar', learningOutcomes: [{ id: 'comm-w7-lo1', text: 'Express speculation and handle predicaments' }], tasks: [] },
      { id: 'comm-w8', weekNumber: 8, title: 'Formal and Informal Communication', dateRange: '30 Mar - 5 Apr', learningOutcomes: [{ id: 'comm-w8-lo1', text: 'Distinguish formal and informal registers' }], tasks: [] },
      { id: 'comm-w9', weekNumber: 9, title: 'Job Seeking', dateRange: '6 Apr - 12 Apr', learningOutcomes: [{ id: 'comm-w9-lo1', text: 'Prepare job application materials' }], tasks: [] },
      { id: 'comm-w10', weekNumber: 10, title: 'Presentations', dateRange: '20 Apr - 26 Apr', learningOutcomes: [{ id: 'comm-w10-lo1', text: 'Develop presentation skills' }], tasks: [] },
      { id: 'comm-w11', weekNumber: 11, title: 'Delivering Speeches', dateRange: '27 Apr - 3 May', learningOutcomes: [{ id: 'comm-w11-lo1', text: 'Master speech delivery techniques' }], tasks: [] },
      { id: 'comm-w12', weekNumber: 12, title: 'Reporting I', dateRange: '4 May - 10 May', learningOutcomes: [{ id: 'comm-w12-lo1', text: 'Write basic reports' }], tasks: [] },
      { id: 'comm-w13', weekNumber: 13, title: 'Reporting II', dateRange: '18 May - 24 May', learningOutcomes: [{ id: 'comm-w13-lo1', text: 'Write advanced reports' }], tasks: [] },
      { id: 'comm-w14', weekNumber: 14, title: 'Handling Meetings', dateRange: '25 May - 31 May', learningOutcomes: [{ id: 'comm-w14-lo1', text: 'Participate effectively in meetings' }], tasks: [] }
    ],
    assessments: [
      { id: 'comm-a1', name: 'Summative Assessment 1', description: 'Grammar Quiz', weight: '5%', alignedLOs: ['LO1'], date: '2026-03-08', time: '7:00 PM - 9:00 PM', isExam: false },
      { id: 'comm-a2', name: 'Summative Assessment 2', description: 'Read, analyse and summarise', weight: '5%', alignedLOs: ['LO1'], date: '2026-03-22', time: '7:00 PM - 9:00 PM', isExam: false },
      { id: 'comm-a3', name: 'Summative Assessment 3', description: 'Dialogue quiz', weight: '5%', alignedLOs: ['LO2'], date: '2026-04-05', time: '7:00 PM - 9:00 PM', isExam: false },
      { id: 'comm-a4', name: 'Summative Assessment 4', description: 'Presentations quiz', weight: '5%', alignedLOs: ['LO2'], date: '2026-04-26', time: '7:00 PM - 9:00 PM', isExam: false },
      { id: 'comm-a5', name: 'Summative Assessment 5', description: 'Practical Exam', weight: '20%', alignedLOs: ['LO1', 'LO2'], date: '2026-05-17', time: '11:00 AM - 12:00 PM', venue: 'University of Moratuwa', isExam: true },
      { id: 'comm-a6', name: 'Final Exam', description: 'Written exam', weight: '60%', alignedLOs: ['LO1', 'LO2'], date: '2026-07-11', time: '8:30 AM - 10:30 AM', venue: 'University of Moratuwa', isExam: true }
    ]
  },
  {
    id: 'ict',
    code: 'ITE1923',
    name: 'ICT Skills & Applications',
    url: 'https://online.codl.lk/course/view.php?id=1409',
    colorClass: 'course-card-ict',
    learningOutcomes: [
      'LO1: Understand ICT applications fundamentals',
      'LO2: Master word processing skills',
      'LO3: Apply spreadsheet and presentation software',
      'LO4: Understand communication and networking',
      'LO5: Apply digital research and citizenship'
    ],
    weeks: [
      { id: 'ict-w1', weekNumber: 1, title: 'Introduction to ICT Applications', dateRange: '9 Feb - 15 Feb', learningOutcomes: [{ id: 'ict-w1-lo1', text: 'Understand ICT fundamentals' }], tasks: [] },
      { id: 'ict-w2', weekNumber: 2, title: 'Introduction to ICT Applications II', dateRange: '16 Feb - 22 Feb', learningOutcomes: [{ id: 'ict-w2-lo1', text: 'Explore advanced ICT concepts' }], tasks: [] },
      { id: 'ict-w3', weekNumber: 3, title: 'Word Processing I', dateRange: '23 Feb - 1 Mar', learningOutcomes: [{ id: 'ict-w3-lo1', text: 'Learn basic word processing' }], tasks: [] },
      { id: 'ict-w4', weekNumber: 4, title: 'Word Processing II', dateRange: '2 Mar - 8 Mar', learningOutcomes: [{ id: 'ict-w4-lo1', text: 'Apply intermediate word processing' }], tasks: [] },
      { id: 'ict-w5', weekNumber: 5, title: 'Word Processing III', dateRange: '9 Mar - 15 Mar', learningOutcomes: [{ id: 'ict-w5-lo1', text: 'Master advanced word processing' }], tasks: [] },
      { id: 'ict-w6', weekNumber: 6, title: 'Spreadsheets I', dateRange: '16 Mar - 22 Mar', learningOutcomes: [{ id: 'ict-w6-lo1', text: 'Learn basic spreadsheet skills' }], tasks: [] },
      { id: 'ict-w7', weekNumber: 7, title: 'Spreadsheets II', dateRange: '23 Mar - 29 Mar', learningOutcomes: [{ id: 'ict-w7-lo1', text: 'Apply intermediate spreadsheet formulas' }], tasks: [] },
      { id: 'ict-w8', weekNumber: 8, title: 'Spreadsheets III', dateRange: '30 Mar - 5 Apr', learningOutcomes: [{ id: 'ict-w8-lo1', text: 'Master advanced spreadsheet features' }], tasks: [] },
      { id: 'ict-w9', weekNumber: 9, title: 'Presentation Software I', dateRange: '6 Apr - 12 Apr', learningOutcomes: [{ id: 'ict-w9-lo1', text: 'Create basic presentations' }], tasks: [] },
      { id: 'ict-w10', weekNumber: 10, title: 'Presentation Software II', dateRange: '20 Apr - 26 Apr', learningOutcomes: [{ id: 'ict-w10-lo1', text: 'Design advanced presentations' }], tasks: [] },
      { id: 'ict-w11', weekNumber: 11, title: 'Communication & Networking I', dateRange: '27 Apr - 3 May', learningOutcomes: [{ id: 'ict-w11-lo1', text: 'Understand networking basics' }], tasks: [] },
      { id: 'ict-w12', weekNumber: 12, title: 'Communication & Networking II', dateRange: '4 May - 10 May', learningOutcomes: [{ id: 'ict-w12-lo1', text: 'Apply networking concepts' }], tasks: [] },
      { id: 'ict-w13', weekNumber: 13, title: 'Digital Research Skills', dateRange: '18 May - 24 May', learningOutcomes: [{ id: 'ict-w13-lo1', text: 'Develop digital research skills' }], tasks: [] },
      { id: 'ict-w14', weekNumber: 14, title: 'Digital Citizen', dateRange: '25 May - 31 May', learningOutcomes: [{ id: 'ict-w14-lo1', text: 'Understand digital citizenship' }], tasks: [] }
    ],
    assessments: [
      { id: 'ict-a1', name: 'Assignment 01', description: 'Individual written assignment', weight: '6%', alignedLOs: ['LO1', 'LO2'], date: 'End of Week 8', isExam: false },
      { id: 'ict-a2', name: 'Practical Exam', description: 'Hands-on practical exam', weight: '30%', alignedLOs: ['LO1', 'LO2', 'LO3'], date: '2026-05-17', time: '10:00 AM - 11:00 AM', venue: 'University of Moratuwa', isExam: true },
      { id: 'ict-a3', name: 'Assignment 02', description: 'Advanced analytical assignment', weight: '4%', alignedLOs: ['LO4', 'LO5'], date: 'End of Week 14', isExam: false },
      { id: 'ict-a4', name: 'Final Examination', description: 'Comprehensive written exam', weight: '60%', alignedLOs: ['All'], date: '2026-07-11', time: '1:30 PM - 3:30 PM', venue: 'University of Moratuwa', isExam: true }
    ]
  }
];

export const getCurrentWeekNumber = (): number => {
  const startDate = new Date('2026-02-09');
  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  return Math.max(1, Math.min(14, diffWeeks + 1));
};

export const getAllExams = () => {
  return courses.flatMap(course =>
    course.assessments
      .filter(a => a.isExam)
      .map(a => ({ ...a, courseCode: course.code, courseName: course.name, courseColor: course.colorClass }))
  );
};
