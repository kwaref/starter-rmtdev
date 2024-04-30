export type JobItem = {
    id: number;
    badgeLetters: string;
    title: string;
    company: string;
    daysAgo: number;
    relevanceScore: number;
};

export type ExpandedJobItem = JobItem & {
    description: string;
    qualifications: string[];
    reviews: string[];
    duration: string;
    salary: string;
    location: string;
    coverImgURL: string;
    companyURL: string;
};