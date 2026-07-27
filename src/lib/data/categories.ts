import type { Difficulty } from "@/lib/types";

export interface Category {
  id: string;
  name: string;
  emoji: string;
  group: string;
  gradient: string; // tailwind gradient classes
  difficulty: Difficulty;
  words: string[];
}

export const CATEGORY_GROUPS = [
  "Entertainment",
  "Tollywood",
  "Cricket",
  "Sports",
  "Food",
  "Festivals",
  "Places",
  "Mythology",
  "History",
  "Technology",
  "Brands",
  "General India",
] as const;

export const CATEGORIES: Category[] = [
  /* ---------------- Entertainment ---------------- */
  {
    id: "bollywood-movies",
    name: "Bollywood Movies",
    emoji: "🎬",
    group: "Entertainment",
    gradient: "from-rose to-primary",
    difficulty: "easy",
    words: [
      "Sholay", "Dilwale Dulhania Le Jayenge", "3 Idiots", "Lagaan", "Dangal",
      "Kabhi Khushi Kabhie Gham", "Zindagi Na Milegi Dobara", "Gully Boy",
      "Andhadhun", "Queen", "Barfi", "PK", "Chennai Express", "Bajrangi Bhaijaan",
      "Kuch Kuch Hota Hai", "Om Shanti Om", "Rockstar", "Dil Chahta Hai",
      "Swades", "Rang De Basanti", "Munna Bhai MBBS", "Pathaan", "Jawan", "Animal",
    ],
  },
  {
    id: "bollywood-actors",
    name: "Bollywood Stars",
    emoji: "⭐",
    group: "Entertainment",
    gradient: "from-saffron to-rose",
    difficulty: "easy",
    words: [
      "Shah Rukh Khan", "Amitabh Bachchan", "Deepika Padukone", "Salman Khan",
      "Aamir Khan", "Alia Bhatt", "Ranbir Kapoor", "Priyanka Chopra",
      "Hrithik Roshan", "Katrina Kaif", "Akshay Kumar", "Ranveer Singh",
      "Madhuri Dixit", "Kajol", "Ajay Devgn", "Kareena Kapoor",
      "Shahid Kapoor", "Anushka Sharma", "Vicky Kaushal", "Kiara Advani",
    ],
  },
  {
    id: "south-cinema",
    name: "South Indian Cinema",
    emoji: "🌟",
    group: "Entertainment",
    gradient: "from-gold to-saffron",
    difficulty: "medium",
    words: [
      "Baahubali", "RRR", "Pushpa", "KGF", "Kantara", "Vikram", "Master",
      "Rajinikanth", "Kamal Haasan", "Allu Arjun", "Prabhas", "Yash",
      "Vijay", "Mahesh Babu", "Jr NTR", "Ram Charan", "Suriya",
      "Ponniyin Selvan", "Drishyam", "96", "Jai Bhim", "Mohanlal", "Mammootty", "Dulquer Salmaan",
    ],
  },
  {
    id: "famous-songs",
    name: "Iconic Songs",
    emoji: "🎵",
    group: "Entertainment",
    gradient: "from-primary to-peacock",
    difficulty: "medium",
    words: [
      "Jai Ho", "Chaiyya Chaiyya", "Kal Ho Naa Ho", "Tum Hi Ho", "Naatu Naatu",
      "Kajra Re", "Munni Badnaam", "Gallan Goodiyan", "Channa Mereya",
      "Tujhe Dekha Toh", "Badtameez Dil", "Kesariya", "Apna Time Aayega",
      "Zinda", "Malhari", "Ghungroo", "London Thumakda", "Nagada Sang Dhol",
      "Senorita", "Kun Faya Kun",
    ],
  },
  {
    id: "tv-shows",
    name: "Indian TV & OTT",
    emoji: "📺",
    group: "Entertainment",
    gradient: "from-peacock to-primary",
    difficulty: "medium",
    words: [
      "Taarak Mehta Ka Ooltah Chashmah", "Kaun Banega Crorepati", "Bigg Boss",
      "Sacred Games", "Mirzapur", "The Family Man", "Panchayat", "Kota Factory",
      "Scam 1992", "Indian Idol", "Shark Tank India", "CID", "Balika Vadhu",
      "Anupamaa", "Aspirants", "Farzi", "Ramayan", "Mahabharat",
      "Shaktimaan", "Malgudi Days",
    ],
  },
  {
    id: "movie-characters",
    name: "Movie Characters",
    emoji: "🎭",
    group: "Entertainment",
    gradient: "from-rose to-gold",
    difficulty: "medium",
    words: [
      "Gabbar Singh", "Mogambo", "Munna Bhai", "Circuit", "Baahubali",
      "Kattappa", "Chulbul Pandey", "Rancho", "Raj Malhotra", "Poo",
      "Bhallaladeva", "Rocky Bhai", "Pushpa Raj", "Kabir Singh", "Geet",
      "Bunny", "Naina", "Simran", "Don", "Vijay Dinanath Chauhan",
    ],
  },

  /* ---------------- Tollywood ---------------- */
  {
    id: "tollywood-movies",
    name: "Tollywood Movies",
    emoji: "🎥",
    group: "Tollywood",
    gradient: "from-gold to-rose",
    difficulty: "easy",
    words: [
      "Baahubali", "RRR", "Pushpa", "Magadheera", "Arjun Reddy", "Rangasthalam",
      "Ala Vaikunthapurramuloo", "Eega", "Pokiri", "Athadu", "Mahanati",
      "Sita Ramam", "Jathi Ratnalu", "Salaar", "Devara", "Hi Nanna",
      "Bommarillu", "Attarintiki Daredi", "Srimanthudu", "Bheemla Nayak",
      "Sarileru Neekevvaru", "Geetha Govindam", "Fidaa", "Mayabazar",
    ],
  },
  {
    id: "tollywood-heroes",
    name: "Tollywood Heroes",
    emoji: "🦸",
    group: "Tollywood",
    gradient: "from-saffron to-gold",
    difficulty: "easy",
    words: [
      "Chiranjeevi", "Pawan Kalyan", "Mahesh Babu", "Prabhas", "Allu Arjun",
      "Jr NTR", "Ram Charan", "Nagarjuna", "Venkatesh", "Balakrishna",
      "Ravi Teja", "Nani", "Vijay Deverakonda", "Naga Chaitanya",
      "Ram Pothineni", "Nithiin", "NT Rama Rao", "Akkineni Nageswara Rao",
      "Krishna", "Sai Dharam Tej",
    ],
  },
  {
    id: "tollywood-heroines",
    name: "Tollywood Heroines",
    emoji: "💃",
    group: "Tollywood",
    gradient: "from-rose to-primary",
    difficulty: "medium",
    words: [
      "Samantha", "Anushka Shetty", "Rashmika Mandanna", "Pooja Hegde",
      "Kajal Aggarwal", "Keerthy Suresh", "Sai Pallavi", "Tamannaah",
      "Savitri", "Sridevi", "Vijayashanti", "Nayanthara", "Shruti Haasan",
      "Genelia", "Ileana D'Cruz", "Rakul Preet Singh", "Krithi Shetty",
      "Mrunal Thakur", "Anupama Parameswaran", "Jayasudha",
    ],
  },
  {
    id: "tollywood-songs",
    name: "Tollywood Songs",
    emoji: "🎶",
    group: "Tollywood",
    gradient: "from-primary to-gold",
    difficulty: "medium",
    words: [
      "Naatu Naatu", "Butta Bomma", "Oo Antava", "Srivalli", "Saami Saami",
      "Samajavaragamana", "Ramuloo Ramulaa", "Inkem Inkem Inkem Kaavaale",
      "Vachinde", "Seeti Maar", "Pakka Local", "Ringa Ringa", "Mind Block",
      "Bullettu Bandi", "Top Lesi Poddi", "Aa Ante Amalapuram", "Kevvu Keka",
      "Nee Kannu Neeli Samudram", "Kurchi Madathapetti", "Chuttamalle",
    ],
  },
  {
    id: "tollywood-directors",
    name: "Directors & Composers",
    emoji: "🎬",
    group: "Tollywood",
    gradient: "from-peacock to-gold",
    difficulty: "hard",
    words: [
      "SS Rajamouli", "Trivikram Srinivas", "Sukumar", "Puri Jagannadh",
      "Koratala Siva", "Harish Shankar", "Anil Ravipudi", "Vamshi Paidipally",
      "Nag Ashwin", "Sandeep Reddy Vanga", "Ram Gopal Varma", "K Viswanath",
      "K Raghavendra Rao", "Dasari Narayana Rao", "Prashanth Neel",
      "Devi Sri Prasad", "MM Keeravani", "Thaman S", "Mickey J Meyer",
      "Anirudh Ravichander",
    ],
  },

  /* ---------------- Cricket ---------------- */
  {
    id: "cricket-legends",
    name: "Cricket Legends",
    emoji: "🏏",
    group: "Cricket",
    gradient: "from-mint to-peacock",
    difficulty: "easy",
    words: [
      "Sachin Tendulkar", "MS Dhoni", "Virat Kohli", "Kapil Dev", "Rohit Sharma",
      "Sourav Ganguly", "Rahul Dravid", "Yuvraj Singh", "Anil Kumble",
      "Virender Sehwag", "Jasprit Bumrah", "Hardik Pandya", "Ravindra Jadeja",
      "Sunil Gavaskar", "VVS Laxman", "Harbhajan Singh", "Zaheer Khan",
      "Shubman Gill", "KL Rahul", "Rishabh Pant", "Smriti Mandhana", "Mithali Raj",
    ],
  },
  {
    id: "ipl",
    name: "IPL Fever",
    emoji: "🏆",
    group: "Cricket",
    gradient: "from-saffron to-gold",
    difficulty: "easy",
    words: [
      "Mumbai Indians", "Chennai Super Kings", "Royal Challengers Bengaluru",
      "Kolkata Knight Riders", "Sunrisers Hyderabad", "Rajasthan Royals",
      "Delhi Capitals", "Punjab Kings", "Gujarat Titans", "Lucknow Super Giants",
      "Orange Cap", "Purple Cap", "Super Over", "Strategic Timeout",
      "Wankhede Stadium", "Chepauk", "Eden Gardens", "Chinnaswamy Stadium",
      "Auction", "Hat-trick",
    ],
  },
  {
    id: "cricket-moments",
    name: "Cricket Moments",
    emoji: "🎯",
    group: "Cricket",
    gradient: "from-peacock to-mint",
    difficulty: "hard",
    words: [
      "2011 World Cup Final", "Dhoni's Helicopter Shot", "Yuvraj's Six Sixes",
      "Sachin's 100th Century", "2007 T20 World Cup", "Kohli's Chase Masterclass",
      "Gabba 2021", "NatWest Final 2002", "Sehwag's Triple Century",
      "Kumble's 10 Wickets", "Miandad's Last Ball Six", "Slower Ball",
      "Reverse Swing", "Doosra", "Nightwatchman", "Duckworth Lewis",
      "Powerplay", "Third Umpire", "Leg Glance", "Cover Drive",
    ],
  },

  /* ---------------- Sports ---------------- */
  {
    id: "indian-sports",
    name: "Indian Sports Icons",
    emoji: "🥇",
    group: "Sports",
    gradient: "from-gold to-mint",
    difficulty: "medium",
    words: [
      "Neeraj Chopra", "PV Sindhu", "Saina Nehwal", "Mary Kom", "Milkha Singh",
      "PT Usha", "Abhinav Bindra", "Sania Mirza", "Viswanathan Anand",
      "Gukesh D", "Major Dhyan Chand", "Sunil Chhetri", "Bajrang Punia",
      "Mirabai Chanu", "Pro Kabaddi", "Kho Kho", "Hockey India",
      "Lakshya Sen", "Praggnanandhaa", "Leander Paes",
    ],
  },

  /* ---------------- Food ---------------- */
  {
    id: "street-food",
    name: "Street Food",
    emoji: "🥘",
    group: "Food",
    gradient: "from-saffron to-rose",
    difficulty: "easy",
    words: [
      "Pani Puri", "Vada Pav", "Pav Bhaji", "Bhel Puri", "Samosa", "Kachori",
      "Chole Bhature", "Momos", "Dahi Puri", "Aloo Tikki", "Sev Puri",
      "Frankie", "Kathi Roll", "Dabeli", "Misal Pav", "Jhal Muri",
      "Litti Chokha", "Pakora", "Bread Pakoda", "Egg Roll",
    ],
  },
  {
    id: "south-food",
    name: "South Indian Food",
    emoji: "🍛",
    group: "Food",
    gradient: "from-mint to-gold",
    difficulty: "easy",
    words: [
      "Masala Dosa", "Idli", "Vada", "Uttapam", "Pongal", "Upma", "Bisi Bele Bath",
      "Hyderabadi Biryani", "Rasam", "Sambar", "Appam", "Puttu",
      "Chettinad Chicken", "Filter Coffee", "Pesarattu", "Neer Dosa",
      "Avial", "Kerala Parotta", "Curd Rice", "Rava Kesari",
    ],
  },
  {
    id: "sweets",
    name: "Indian Sweets",
    emoji: "🍮",
    group: "Food",
    gradient: "from-rose to-saffron",
    difficulty: "easy",
    words: [
      "Gulab Jamun", "Rasgulla", "Jalebi", "Ladoo", "Barfi", "Kaju Katli",
      "Rasmalai", "Kheer", "Gajar Ka Halwa", "Mysore Pak", "Soan Papdi",
      "Peda", "Modak", "Sandesh", "Kulfi", "Malpua", "Ghevar",
      "Basundi", "Payasam", "Balushahi",
    ],
  },

  /* ---------------- Festivals ---------------- */
  {
    id: "festivals",
    name: "Festivals of India",
    emoji: "🪔",
    group: "Festivals",
    gradient: "from-saffron to-primary",
    difficulty: "easy",
    words: [
      "Diwali", "Holi", "Pongal", "Onam", "Ugadi", "Ganesh Chaturthi",
      "Durga Puja", "Navratri", "Raksha Bandhan", "Eid", "Christmas",
      "Baisakhi", "Lohri", "Makar Sankranti", "Janmashtami", "Karva Chauth",
      "Chhath Puja", "Ram Navami", "Maha Shivaratri", "Gudi Padwa",
    ],
  },

  /* ---------------- Places ---------------- */
  {
    id: "monuments",
    name: "Monuments & Wonders",
    emoji: "🕌",
    group: "Places",
    gradient: "from-primary to-rose",
    difficulty: "easy",
    words: [
      "Taj Mahal", "Red Fort", "Qutub Minar", "Gateway of India", "India Gate",
      "Hawa Mahal", "Charminar", "Mysore Palace", "Golden Temple",
      "Konark Sun Temple", "Ajanta Caves", "Ellora Caves", "Hampi",
      "Meenakshi Temple", "Victoria Memorial", "Amer Fort", "Sanchi Stupa",
      "Statue of Unity", "Lotus Temple", "Khajuraho",
    ],
  },
  {
    id: "tourist-places",
    name: "Tourist Places",
    emoji: "🏔️",
    group: "Places",
    gradient: "from-peacock to-mint",
    difficulty: "easy",
    words: [
      "Goa", "Manali", "Ooty", "Munnar", "Shimla", "Darjeeling", "Ladakh",
      "Rishikesh", "Varanasi", "Jaipur", "Udaipur", "Kodaikanal", "Coorg",
      "Andaman Islands", "Rann of Kutch", "Kashmir", "Pondicherry",
      "Mahabalipuram", "Khajjiar", "Araku Valley",
    ],
  },
  {
    id: "states-capitals",
    name: "States & Cities",
    emoji: "🗺️",
    group: "Places",
    gradient: "from-mint to-primary",
    difficulty: "easy",
    words: [
      "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
      "Kerala", "Rajasthan", "Punjab", "Gujarat", "Tamil Nadu", "Telangana",
      "Uttar Pradesh", "West Bengal", "Assam", "Sikkim", "Ahmedabad",
      "Lucknow", "Chandigarh", "Bhopal",
    ],
  },

  /* ---------------- Mythology ---------------- */
  {
    id: "ramayana",
    name: "Ramayana",
    emoji: "🏹",
    group: "Mythology",
    gradient: "from-gold to-saffron",
    difficulty: "medium",
    words: [
      "Rama", "Sita", "Lakshmana", "Hanuman", "Ravana", "Bharata",
      "Ayodhya", "Lanka", "Vanvas", "Swayamvar", "Pushpaka Vimana",
      "Sanjeevani", "Jatayu", "Sugriva", "Vibhishana", "Kumbhakarna",
      "Shabari", "Ram Setu", "Panchavati", "Agni Pariksha",
    ],
  },
  {
    id: "mahabharata",
    name: "Mahabharata",
    emoji: "⚔️",
    group: "Mythology",
    gradient: "from-primary to-gold",
    difficulty: "medium",
    words: [
      "Arjuna", "Krishna", "Bhima", "Yudhishthira", "Draupadi", "Karna",
      "Duryodhana", "Bhishma", "Dronacharya", "Abhimanyu", "Kurukshetra",
      "Bhagavad Gita", "Chakravyuha", "Hastinapura", "Gandiva",
      "Sudarshan Chakra", "Shakuni", "Eklavya", "Ashwatthama", "Draupadi Swayamvar",
    ],
  },
  {
    id: "gods",
    name: "Gods & Goddesses",
    emoji: "🕉️",
    group: "Mythology",
    gradient: "from-saffron to-gold",
    difficulty: "easy",
    words: [
      "Ganesha", "Shiva", "Vishnu", "Brahma", "Lakshmi", "Saraswati",
      "Durga", "Kali", "Hanuman", "Krishna", "Murugan", "Ayyappa",
      "Venkateswara", "Jagannath", "Kamadhenu", "Indra", "Surya",
      "Varuna", "Agni", "Nataraja",
    ],
  },

  /* ---------------- History ---------------- */
  {
    id: "freedom-fighters",
    name: "Freedom Fighters",
    emoji: "🇮🇳",
    group: "History",
    gradient: "from-saffron to-mint",
    difficulty: "easy",
    words: [
      "Mahatma Gandhi", "Bhagat Singh", "Subhas Chandra Bose", "Jawaharlal Nehru",
      "Sardar Patel", "Rani Lakshmibai", "Chandra Shekhar Azad", "Bal Gangadhar Tilak",
      "Lala Lajpat Rai", "Sarojini Naidu", "Mangal Pandey", "Ashfaqulla Khan",
      "Dandi March", "Quit India Movement", "Jallianwala Bagh", "Swadeshi Movement",
      "Azad Hind Fauj", "Salt Satyagraha", "Non-Cooperation Movement", "Purna Swaraj",
    ],
  },
  {
    id: "kings-dynasties",
    name: "Kings & Dynasties",
    emoji: "👑",
    group: "History",
    gradient: "from-gold to-rose",
    difficulty: "hard",
    words: [
      "Chhatrapati Shivaji", "Ashoka", "Akbar", "Maharana Pratap", "Tipu Sultan",
      "Chandragupta Maurya", "Prithviraj Chauhan", "Krishnadevaraya",
      "Rani Padmini", "Raja Raja Chola", "Samudragupta", "Harshavardhana",
      "Mughal Empire", "Maratha Empire", "Vijayanagara Empire", "Chola Dynasty",
      "Gupta Empire", "Battle of Panipat", "Battle of Haldighati", "Peshwa Bajirao",
    ],
  },

  /* ---------------- Technology ---------------- */
  {
    id: "startups",
    name: "Startups & Tech",
    emoji: "🚀",
    group: "Technology",
    gradient: "from-peacock to-primary",
    difficulty: "medium",
    words: [
      "Flipkart", "Zomato", "Swiggy", "Paytm", "PhonePe", "Ola", "BYJU'S",
      "Zerodha", "CRED", "Dream11", "Nykaa", "Meesho", "Razorpay", "Unacademy",
      "UPI", "Aadhaar", "JioMart", "BigBasket", "MakeMyTrip", "boAt",
    ],
  },
  {
    id: "isro-science",
    name: "ISRO & Science",
    emoji: "🛰️",
    group: "Technology",
    gradient: "from-primary to-mint",
    difficulty: "medium",
    words: [
      "Chandrayaan-3", "Mangalyaan", "ISRO", "APJ Abdul Kalam", "CV Raman",
      "Homi Bhabha", "Vikram Sarabhai", "Gaganyaan", "Aditya-L1", "PSLV",
      "GSLV", "Satish Dhawan Space Centre", "Aryabhata", "DRDO", "Agni Missile",
      "BrahMos", "Param Supercomputer", "Srinivasa Ramanujan", "Jagadish Chandra Bose", "Tejas",
    ],
  },

  /* ---------------- Brands ---------------- */
  {
    id: "brands",
    name: "Iconic Brands",
    emoji: "🏢",
    group: "Brands",
    gradient: "from-rose to-peacock",
    difficulty: "easy",
    words: [
      "Amul", "Tata", "Reliance", "Infosys", "Mahindra", "Haldiram's", "Parle-G",
      "Britannia", "Bajaj", "Godrej", "Titan", "Royal Enfield", "Asian Paints",
      "Dabur", "Patanjali", "MDH", "Fevicol", "Maggi", "Thums Up", "Lijjat Papad",
    ],
  },

  /* ---------------- General India ---------------- */
  {
    id: "culture",
    name: "Indian Culture",
    emoji: "🎨",
    group: "General India",
    gradient: "from-saffron to-peacock",
    difficulty: "medium",
    words: [
      "Bharatanatyam", "Kathak", "Kathakali", "Kuchipudi", "Yoga", "Ayurveda",
      "Mehendi", "Rangoli", "Sari", "Kurta", "Tabla", "Sitar", "Veena",
      "Carnatic Music", "Madhubani Painting", "Warli Art", "Namaste",
      "Bindi", "Bangles", "Turban",
    ],
  },
  {
    id: "famous-personalities",
    name: "Famous Personalities",
    emoji: "🌟",
    group: "General India",
    gradient: "from-gold to-primary",
    difficulty: "medium",
    words: [
      "APJ Abdul Kalam", "Ratan Tata", "Mukesh Ambani", "Narayana Murthy",
      "Lata Mangeshkar", "AR Rahman", "Amitabh Bachchan", "Mother Teresa",
      "Rabindranath Tagore", "Swami Vivekananda", "Dr BR Ambedkar",
      "Kiran Bedi", "Sundar Pichai", "Satya Nadella", "Verghese Kurien",
      "MS Subbulakshmi", "Zakir Hussain", "Ruskin Bond", "RK Laxman", "Premchand",
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoriesByGroup(): Record<string, Category[]> {
  const map: Record<string, Category[]> = {};
  for (const c of CATEGORIES) {
    (map[c.group] ??= []).push(c);
  }
  return map;
}
