export interface Project {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    features?: string[];
}

export const projects: Project[] = [
    {
        title: "LeafDoctor",
        description:
            "LeafDoctor uses cutting-edge artificial intelligence to identify plant diseases instantly, provide tailored treatment recommendations, and help you maintain thriving plants and crops.",
        tags: ["Computer Vision", "Plant Health AI", "Agriculture"],
        link: "https://leaf-doctor-production.up.railway.app/",
        github: "https://github.com/olamiketech/Leaf-doctor",
    },
    {
        title: "AgroPredict AI",
        description:
            "AgroPredict AI uses real-time weather, soil, and satellite data to provide smallholder farmers with precise advice on when to plant, fertilize, irrigate, and harvest.",
        tags: ["Predictive Analytics", "PyTorch", "Sustainable Ag"],
        link: "https://agropredictai.com",
        github: "https://github.com/olamiketech/farming-advice-app",
        features: [
            "Location-based crop advisory",
            "Weather + soil + satellite data integration",
            "AI-generated farming advice",
            "Voice guidance",
        ],
    },
    {
        title: "ResumeMatch AI",
        description:
            "An AI-powered tool built with Streamlit and Python that compares resumes to job descriptions, scores compatibility, and offers actionable improvement tips using NLP and GPT-4.",
        tags: ["NLP", "Streamlit", "Python"],
        link: "https://resumematchai-production.up.railway.app/",
        github: "https://github.com/olamiketech/ResumeMatchAI",
    },
    {
        title: "ElectroGadget AI Chatbot",
        description: "AI-powered customer support chatbot for electronics retailers.",
        tags: ["NLP", "Chatbot", "Retail"],
        github: "https://github.com/olamiketech/ElectroGadget_AI_Chatbot",
    },
    {
        title: "E-commerce Analytics",
        description: "Sales forecasting and customer segmentation for e-commerce.",
        tags: ["Data Science", "Pandas", "Visualization"],
        github: "https://github.com/olamiketech/store_project",
    },
];
