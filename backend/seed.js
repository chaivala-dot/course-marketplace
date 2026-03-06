/**
 * seed.js — Run once to populate Supabase with real Coursera-sourced courses
 * Usage: node seed.js
 */
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

const COURSES = [
    {
        "title": "MSc Computer Science",
        "category": "Development",
        "price": 74999,
        "description": "Specialize in programming, data, and AI with a curriculum integrating certifications from IBM, Google, and Meta. No bachelor's degree needed. Ranked 25th in the UK.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3hjcLZKs6WDLRtIanu0iDj/c807e7f73c9ca896139d8236cff732fb/HWU-35571__1_.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.9,
        "students": 12450,
        "instructor": "Heriot-Watt University",
        "duration": "20-96 months",
        "weekly_hours": "16-18 hrs/week",
        "skills": [
            "Programming",
            "Data Science",
            "AI",
            "Machine Learning",
            "Computer Vision"
        ],
        "highlights": [
            "IBM & Google certifications included",
            "No bachelor's degree needed",
            "UK Top 25 University",
            "Industry-aligned curriculum"
        ],
        "status": "published",
        "program_description": "Acquire the most in-demand programming, data and AI skills and secure your professional status as a computer scientist, with this prestigious master’s from Heriot-Watt University - a world-leader in computer science research and robotics."
    },
    {
        "title": "Master of Science in Computer Science",
        "category": "Development",
        "price": 131250,
        "description": "Master core CS skills in algorithms, data structures, and ML. Explore electives in AI, robotics, and big data. No application or bachelor's degree needed.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1X771IxZ2TuOUa13p6dbmA/4ece73165e665107dc37c8532e418351/CU-Boulder-campus-hero.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.8,
        "students": 18900,
        "instructor": "University of Colorado Boulder",
        "duration": "Finish in 24 months",
        "weekly_hours": "5-8 hrs/week per course",
        "skills": [
            "Algorithms",
            "Data Structures",
            "Machine Learning",
            "AI",
            "Robotics",
            "Big Data"
        ],
        "highlights": [
            "No application required",
            "Accredited by HLC",
            "Transparent pay-as-you-go tuition",
            "30 courses total"
        ],
        "status": "published",
        "program_description": "Choose the Master of Science in Computer Science (MS-CS) for a comprehensive and flexible foundation in tech. This program is designed for learners who want to build the core technical depth that underpins all computing careers, keeping the broadest range of doors open across the industry."
    },
    {
        "title": "Master of Science in Artificial Intelligence",
        "category": "Data Science",
        "price": 131250,
        "description": "Go beyond theory with a purpose-built Master's covering model building, hardware deployment, and AI ethics. The only English-language AI degree on Coursera.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5y8x5poDFIB5OGNWgtLSJM/11ee3816b8972f5cd8cdf170088bc248/flatirons__1_.jpeg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.9,
        "students": 9741,
        "instructor": "University of Colorado Boulder",
        "duration": "12-24 months",
        "weekly_hours": "5-8 hrs/week",
        "skills": [
            "Deep Learning",
            "Neural Networks",
            "Computer Vision",
            "NLP",
            "AI Ethics",
            "Robotics"
        ],
        "highlights": [
            "Only English AI Master's on Coursera",
            "No application needed",
            "Hardware deployment track",
            "Mathematics & probability focus"
        ],
        "status": "published",
        "program_description": "Immerse yourself in the theory, tools, and application of artificial intelligence with the only English-language AI degree available on Coursera. The Master of Science in Artificial Intelligence (MS-AI) is designed for learners who want to specialize deeply in AI and machine learning, positioning themselves at the forefront of technological innovation."
    },
    {
        "title": "Master of Computer Science in Data Science",
        "category": "Data Science",
        "price": 165200,
        "description": "Build specialized knowledge of in-demand computer or data science skills. Top-5 CS school (US News 2025). Covers AI, ML, big data, and full-stack understanding.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3KdKswaCqGVxcSUmhvxd8o/b599c89b58c3791dc78ea23390732374/UI-220613-MH-009-siebel-center-computer-science_2_compressed.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.8,
        "students": 22300,
        "instructor": "University of Illinois Urbana-Champaign",
        "duration": "12-36 months",
        "weekly_hours": "10-12 hrs/week",
        "skills": [
            "Machine Learning",
            "NLP",
            "Computer Vision",
            "Big Data",
            "Data Engineering",
            "Business Analytics"
        ],
        "highlights": [
            "Forbes \"New Ivy\" school",
            "Top-5 CS school US News",
            "Optional Data Science track",
            "HLC Accredited"
        ],
        "status": "published",
        "program_description": "Position yourself at the forefront of innovation and advance your career with a Master of Computer Science from the University of Illinois Urbana-Champaign. Recognized by Forbes as a \"New Ivy\" and consistently ranked as a top-5 computer science school by U.S. News & World Report (2025), the University of Illinois offers a credential with unmatched prestige and global recognition."
    },
    {
        "title": "Master of Science in Management (iMSM)",
        "category": "Business",
        "price": 108900,
        "description": "Launch your management career with essential leadership skills and career-ready credentials. Earn your master's degree in just 12 months from a top US business school.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6cmiWcU0XycCnPnz75ITAH/86cfb0454f99ba8cd758c63ba5dc2690/iMSM_MSMangement_GiesBuilding.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.7,
        "students": 14500,
        "instructor": "University of Illinois Urbana-Champaign",
        "duration": "12-24 months",
        "weekly_hours": "10-15 hrs/week",
        "skills": [
            "Leadership",
            "Marketing Management",
            "Strategic Management",
            "Process Management",
            "Accounting",
            "Finance"
        ],
        "highlights": [
            "Complete in just 12 months",
            "Stackable into iMBA",
            "Pay-as-you-go model",
            "70% scholarship available"
        ],
        "status": "published",
        "program_description": "As an iMSM student, you will take a series of fundamental management classes covering subjects such as leadership and teams, marketing management, strategic management, and process management, as well as foundational classes in accounting and finance. You will then have the opportunity to customize your degree by taking elective courses focused on business value and project management, global business challenges, or business data management and communication."
    },
    {
        "title": "Master of Business Administration (iMBA)",
        "category": "Business",
        "price": 227400,
        "description": "Boost your career and design a journey that fits your goals with focus areas in analytics, marketing, innovation and entrepreneurship. Fraction of typical MBA cost.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/phdtZ838jtqiZ0OUP1Owr/69db523ca40841bc8b7ff3428608da99/imba_2.jpeg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.8,
        "students": 31200,
        "instructor": "University of Illinois Gies College of Business",
        "duration": "24-36 months",
        "weekly_hours": "10-15 hrs/week",
        "skills": [
            "Financial Management",
            "Digital Marketing",
            "Strategic Leadership",
            "Business Analytics",
            "Innovation",
            "Entrepreneurship"
        ],
        "highlights": [
            "Fraction of $200K+ typical MBA cost",
            "Focus areas: Analytics, Marketing, Innovation",
            "Fortune 500 alumni network",
            "AACSB accredited"
        ],
        "status": "published",
        "program_description": "With education from an Illinois MBA, you will be prepared for a variety of managerial and executive positions. Our graduates have gone on to work for Fortune 500 companies including Microsoft, Walmart, and MGM resorts. Whether your passion lies in the travel industry, engineering, or healthcare, the iMBA will set you up for success in roles across all industries and sectors."
    },
    {
        "title": "MBA in Business Analytics",
        "category": "Business",
        "price": 20000,
        "description": "Learn to lead in a data-driven world with India's No.1 private university. Blends cutting-edge AI & analytics. Hands-on experience with R, Python, SQL, and Tableau.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/2KjkhHW7nqZXcgc2XGgQVd/df58d5c462f71cb08ab1bbf347848dca/JGU--Bg-image-_Day_--Coursera.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.7,
        "students": 8600,
        "instructor": "O.P. Jindal Global University",
        "duration": "12-24 months",
        "weekly_hours": "14-16 hrs/week",
        "skills": [
            "R Studio",
            "Python",
            "SQL",
            "Tableau",
            "Business Analytics",
            "Machine Learning",
            "Time Series"
        ],
        "highlights": [
            "World's #1 online university (THE 2024)",
            "4 cohorts per year",
            "Fractal Analytics partnership",
            "12 credits from Professional Certs"
        ],
        "status": "published",
        "program_description": "This world class management programme blends cutting edge AI and analytics to help you lead and accelerate your career in just 12 months."
    },
    {
        "title": "Executive MBA",
        "category": "Business",
        "price": 45000,
        "description": "Shape your IIT Roorkee MBA with 55+ electives. Dual specialisations. Top 10 in India (NIRF 2025). Designed for working professionals with 4+ years of experience.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/7IxWLEmWIWrDIHZGihdRS9/b742d1aca3f9dca951e5df80b5a8a2f8/121004011141_iitroorkee.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.9,
        "students": 5890,
        "instructor": "IIT Roorkee",
        "duration": "24-60 months",
        "weekly_hours": "8-10 hrs/week",
        "skills": [
            "Leadership",
            "Finance",
            "Marketing",
            "Operations",
            "Strategy",
            "Entrepreneurship"
        ],
        "highlights": [
            "55+ elective courses",
            "Top 10 India (NIRF 2025)",
            "For professionals with 4+ years exp",
            "Real-world case studies & simulations"
        ],
        "status": "published",
        "program_description": "The Executive MBA by the Indian Institute of Technology, Roorkee offers you a unique programme with a highly flexible curriculum. You can choose from over 55 electives that help you customise your credential and enable you to specialise in disciplines suited to your aspirations."
    },
    {
        "title": "BSc Data Science",
        "category": "Data Science",
        "price": 146000,
        "description": "Launch your data science career with a world-class curriculum from the UK's top-ranked young university. Learn to analyze, model, and visualize data. 16 modules + research.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/bBITm62RYs0qgYzjaIbA0/5e09057a9f8fb1d4fea559472fe4ba61/University_Square_Student_Central-1.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.6,
        "students": 7210,
        "instructor": "University of Huddersfield",
        "duration": "36-72 months",
        "weekly_hours": "20-30 hrs/week",
        "skills": [
            "Data Analysis",
            "Data Visualization",
            "Statistical Modeling",
            "Python",
            "Machine Learning",
            "Research Methods"
        ],
        "highlights": [
            "UK's top ranked young university (THE 2024)",
            "16 modules total + research project",
            "Full undergraduate experience online",
            "Includes graduation ceremony"
        ],
        "status": "published",
        "program_description": "Get the data skills, the mathematical understanding and the analytical mindset needed for a successful computing career, with a Data Science BSc (Hons) from the UK’s top ranked young university (Times Higher Education Young University Rankings 2024)."
    },
    {
        "title": "Bachelor of Science in Computer Science",
        "category": "Development",
        "price": 110000,
        "description": "Build the foundation for a career in tech with core math, data, and programming skills. Specialise in cutting-edge topics such as ML, AI or UX. Accredited by University of London.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1ALNQGlCTAxM5UF811PGu6/40d065b0da029c430a3dd5c62a978912/UoL-Campus-Header.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.8,
        "students": 19430,
        "instructor": "University of London",
        "duration": "36-72 months",
        "weekly_hours": "14-28 hrs/week",
        "skills": [
            "Programming",
            "Data Science",
            "Machine Learning",
            "AI",
            "UX Design",
            "Web Development"
        ],
        "highlights": [
            "University of London accredited",
            "23 courses total",
            "Google IT Support credits accepted",
            "IBM AI Developer credits accepted"
        ],
        "status": "published",
        "program_description": "Whether you’re just beginning your technology journey, or returning to education to change or advance your career, the University of London’s online Computer Science degree will give you all the tools you need to thrive in this ever-changing field."
    },
    {
        "title": "BSc Computer Science (BITS Pilani)",
        "category": "Development",
        "price": 33000,
        "description": "Build the foundation for a career in tech. Learn coding, data, and problem-solving skills while earning degree level credentials from India's premier tech university, fully online.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/ThhOqGJGRGePlJlmBNBPM/b87dabf9fbdb504e7610bcf1a528f6a6/Auditorium_3.JPG?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.9,
        "students": 11200,
        "instructor": "BITS Pilani",
        "duration": "3-4 years",
        "weekly_hours": "Flexible",
        "skills": [
            "Full Stack Development",
            "Data Analytics",
            "Algorithms",
            "Systems Programming",
            "Databases",
            "Networking"
        ],
        "highlights": [
            "Institution of Eminence by UGC",
            "4 specialization tracks",
            "Industry projects throughout",
            "Optional 4th year Honours track"
        ],
        "status": "published",
        "program_description": null
    },
    {
        "title": "BSc Data Science & AI",
        "category": "Data Science",
        "price": 29000,
        "description": "Become an IITian from wherever you are. Build a career in AI and data science with IIT Guwahati. Access India's most powerful supercomputers PARAM-Kamrupa and PARAM-Ishan.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/4xOm8RG1NteSdBqh973gu6/c06540097c16c91b1238dab1d3888a9e/iitg8_2021.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.8,
        "students": 6700,
        "instructor": "IIT Guwahati",
        "duration": "Begin any time",
        "weekly_hours": "Flexible",
        "skills": [
            "Data Science",
            "AI",
            "Machine Learning",
            "Python",
            "Big Data",
            "Supercomputing"
        ],
        "highlights": [
            "Earn a degree from IIT Guwahati",
            "No JEE required",
            "Live sessions by IIT faculty",
            "PARAM supercomputer access"
        ],
        "status": "published",
        "program_description": null
    },
    {
        "title": "M.A. in International Relations & Strategy",
        "category": "Business",
        "price": 28000,
        "description": "Learn from former ambassadors, diplomats & policymakers. Gain expertise in geopolitics, diplomacy & security strategy. Only online Indian MA combining all three disciplines.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/4lfMstGPQqZ2iBbAiCs8pY/a4f41fd7a9d7226d6c90d237def0a99d/JGU--Bg-image-_Day_--950x535px-min_3.png?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.7,
        "students": 3420,
        "instructor": "O.P. Jindal Global University",
        "duration": "12-24 months",
        "weekly_hours": "12-15 hrs/week",
        "skills": [
            "Geopolitics",
            "Diplomacy",
            "International Law",
            "Security Studies",
            "Foreign Policy",
            "Strategic Analysis"
        ],
        "highlights": [
            "Faculty: former ambassadors & diplomats",
            "Only Indian online MA in this combination",
            "12 courses with core + elective options",
            "April & October intakes"
        ],
        "status": "published",
        "program_description": null
    },
    {
        "title": "MSc Management",
        "category": "Business",
        "price": 82400,
        "description": "Advance your career with a Management Master's from a globally AACSB-accredited business school — Times Higher Education Business School of the Year 2023. Flexible online study.",
        "thumbnail": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1IU3MjKcnuBr1bWljswOIV/ed57ac74086c125d601361bdd6fdcc18/University_Square_Student_Central.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75",
        "rating": 4.6,
        "students": 4900,
        "instructor": "University of Huddersfield",
        "duration": "24 months",
        "weekly_hours": "12-18 hrs/week",
        "skills": [
            "Decision Making",
            "Marketing",
            "Operations",
            "Finance",
            "Leadership",
            "Project Management"
        ],
        "highlights": [
            "AACSB accredited (top 6% globally)",
            "THE Business School of the Year 2023",
            "7 modules + research project",
            "Google & Project Mgmt cert credits accepted"
        ],
        "status": "published",
        "program_description": "Prepare for leadership in any industry, with a Management MSc from the University of Huddersfield’s Business School - the Times Higher Education Awards Business School of the Year 2023."
    }
];

async function seed() {
    console.log('🌱 Starting seed...')

    // Check existing titles first
    const { data: existing } = await supabase.from('courses').select('title')
    const existingTitles = new Set((existing || []).map(c => c.title))

    for (const course of COURSES) {
        const dbCourse = { ...course };

        if (existingTitles.has(course.title)) {
            console.log(`🔄 Updating existing: ${course.title}`)
            const { error } = await supabase
                .from('courses')
                .update(dbCourse)
                .eq('title', course.title)

            if (error) {
                console.error(`❌ Failed to update "${course.title}":`, error.message)
            } else {
                console.log(`✅ Updated: ${course.title}`)
            }
            continue
        }

        const { data, error } = await supabase
            .from('courses')
            .insert(dbCourse)
            .select()

        if (error) {
            console.error(`❌ Failed to insert "${course.title}":`, error.message)
        } else {
            console.log(`✅ Seeded: ${course.title}`)
        }
    }

    console.log('\n✅ Seed complete!')
}

seed();
