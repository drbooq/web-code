import HeartHealthContent from "./heartHealth";
import MentalHealthContent from "./mentalHealth";
import SexualWellnessContent from "./sexualWellness";
import ChildCareContent from "./childCare";
import ContraceptionContent from "./contraception";
import MarketFruitsContent from "./marketFruits";

const blogs = [
  {
    id: 1,
    image: "/images/blogs/heart-health.jpg",
    title: "5 Daily Habits Doctors Swear By for a Stronger Heart ❤️",
    excerpt: "A 2-minute routine that could add years to your life. Curious?",
    date: "Sep 28, 2025",
    author: "Dr. Anil Mehta",
    Content: HeartHealthContent,
  },
  {
    id: 2,
    image: "/images/blogs/mental-health.jpg",
    title: "3 Secrets to Beat Stress & Stay Calm Instantly 🧘",
    excerpt: "Science-backed mental health hacks you can try today ",
    date: "Sep 15, 2025",
    author: "Dr. Rahul Nair",
    Content: MentalHealthContent,
  },
  {
    id: 3,
    image: "/images/blogs/sexual-wellness.jpg",
    title: "The Secret Link Between Sexual Wellness & Happiness 💑",
    excerpt: "How intimacy shapes not just relationships, but overall health & confidence.",
    date: "Sep 10, 2025",
    author: "Dr. Neha Kapoor",
    Content: SexualWellnessContent,
  },
  {
    id: 4,
    image: "/images/blogs/child-health.jpg",
    title: "Child Nutrition & Pregnancy Care 👶",
    excerpt: "Why avoiding processed and oily foods in childhood builds lifelong health.",
    date: "Sep 12, 2025",
    author: "Dr. Kavita Reddy",
    Content: ChildCareContent,
  },
  {
    id: 5,
    image: "/images/blogs/contraception.jpg",
    title: "Contraception Myths Busted: What Couples Must Know 🛡️",
    excerpt: "Confused about pills, condoms, or IUDs? This guide makes it crystal clear.",
    date: "Sep 05, 2025",
    author: "Dr. Meera Gupta",
    Content: ContraceptionContent,
  },
  {
    id: 6,
    image: "/images/blogs/market-fruits.jpg",
    title: "The Hidden Truth About Shiny Market Fruits 🍎",
    excerpt: "Why some fruits look fresh for weeks — and what you must know to stay safe.",
    date: "Sep 07, 2025",
    author: "Dr. Sameer Khan",
    Content: MarketFruitsContent,
  },
];

export default blogs;
