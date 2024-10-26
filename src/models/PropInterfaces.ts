export interface Link {
    linkText: string,
    pathName: string
}

export interface SocialLink {
    href: string,
    icon: string,
    alt: string
}

export interface Service {
    image: string,
    alt: string,
    heading: string,
    text: string,
    pathName: string
}

export interface FaqItem {
    id:number,
    question: string,
    answer: string
}

export interface Image {
    image: string,
    alt: string
}

export interface Quote {
    text: string,
    author: string
}

export interface Skill {
    image: string,
    alt: string,
    text: string
}