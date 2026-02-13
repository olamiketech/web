export interface ExperienceItem {
    id: number;
    title: string;
    company: string;
    period: string;
    description: string;
}

export const experiences: ExperienceItem[] = [
    {
        id: 1,
        title: "AI/ML Engineer",
        company: "Freelance",
        period: "2019 - Present",
        description: "Delivering end-to-end AI products including computer-vision solutions for agriculture, healthcare, and retail sectors.",
    },
    {
        id: 2,
        title: "MSc Artificial Intelligence",
        company: "University of Stirling",
        period: "Graduated",
        description: "Specialized in Machine Learning, Computer Vision, and Data Science.",
    },
    {
        id: 3,
        title: "AWS Certified Solutions Architect – Associate",
        company: "Amazon Web Services",
        period: "2023",
        description: "Validated expertise in designing distributed systems on AWS.",
    },
];
