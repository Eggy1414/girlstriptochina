export type CityKey = "flight" | "chongqing" | "zhangjiajie" | "transit" | "beijing" | "shanghai" | "return";

export interface Activity {
  id: string;
  time: string;
  title: string;
  notes: string;
  type: "activity" | "food" | "transport" | "photo" | "shopping" | "rest";
}

export interface DayPlan {
  date: string; // e.g. "2025-06-22"
  label: string;
  city: CityKey;
  activities: Activity[];
}

export interface Expense {
  id: string;
  amount: number;
  currency: "CNY" | "AUD";
  category: "flights" | "hotels" | "food" | "transport" | "shopping" | "activities" | "shipping" | "other";
  city: CityKey;
  note: string;
  date: string;
}

export interface Attraction {
  id: string;
  name: string;
  city: CityKey;
  emoji: string;
  description: string;
  photoWorthy: boolean;
  tags: string[];
}

export interface PhotoSpot {
  id: string;
  name: string;
  city: CityKey;
  description: string;
  tips: string;
  bestTime: string;
}

export interface PoseIdea {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export interface PackingItem {
  id: string;
  item: string;
  category: "documents" | "clothing" | "toiletries" | "electronics" | "beauty" | "misc";
  checked: boolean;
}

export interface Accommodation {
  city: CityKey;
  name: string;
  type: "hotel" | "homestay" | "hostel";
  address: string;
  dates: string;
  nights: number;
  pricePerNight: number;
  currency: "CNY" | "AUD";
  notes: string;
}

export const CITY_CONFIG: Record<CityKey, { name: string; emoji: string; colorClass: string; bgClass: string; dates: string }> = {
  flight: { name: "Flight", emoji: "✈️", colorClass: "text-city-flight", bgClass: "bg-city-flight", dates: "Jun 22-23" },
  chongqing: { name: "Chongqing", emoji: "🏙️", colorClass: "text-city-chongqing", bgClass: "bg-city-chongqing", dates: "Jun 23-26" },
  zhangjiajie: { name: "Zhangjiajie", emoji: "🏔️", colorClass: "text-city-zhangjiajie", bgClass: "bg-city-zhangjiajie", dates: "Jun 26-29" },
  transit: { name: "Train to Beijing", emoji: "🚄", colorClass: "text-city-transit", bgClass: "bg-city-transit", dates: "Jun 29-30" },
  beijing: { name: "Beijing", emoji: "🏯", colorClass: "text-city-beijing", bgClass: "bg-city-beijing", dates: "Jun 30 - Jul 2" },
  shanghai: { name: "Shanghai", emoji: "🌃", colorClass: "text-city-shanghai", bgClass: "bg-city-shanghai", dates: "Jul 2-8" },
  return: { name: "Return to Sydney", emoji: "🏠", colorClass: "text-city-flight", bgClass: "bg-city-flight", dates: "Jul 8-9" },
};

export const ACCOMMODATIONS: Accommodation[] = [
  { city: "chongqing", name: "Chongqing Jiefangbei Homestay", type: "homestay", address: "Jiefangbei CBD, Yuzhong District", dates: "Jun 23-26", nights: 3, pricePerNight: 280, currency: "CNY", notes: "Near Hongya Cave & metro, river view room" },
  { city: "zhangjiajie", name: "Zhangjiajie Forest Park Hotel", type: "hotel", address: "Wulingyuan District, near park entrance", dates: "Jun 26-29", nights: 3, pricePerNight: 350, currency: "CNY", notes: "Walking distance to park entrance, breakfast included" },
  { city: "beijing", name: "Beijing Hutong Homestay", type: "homestay", address: "Nanluoguxiang, Dongcheng District", dates: "Jun 30 - Jul 2", nights: 3, pricePerNight: 320, currency: "CNY", notes: "Traditional courtyard house (四合院), near subway Line 6" },
  { city: "shanghai", name: "Shanghai French Concession Apartment", type: "homestay", address: "Jing'an District, near Nanjing West Road", dates: "Jul 2-8", nights: 6, pricePerNight: 400, currency: "CNY", notes: "Spacious 2-bedroom, laundry, great for group stay" },
];

export const INITIAL_DAYS: DayPlan[] = [
  { date: "2025-06-22", label: "Day 1 — Departure", city: "flight", activities: [{ id: "a1", time: "Evening", title: "Flight Sydney → Chongqing", notes: "Red eye flight — get some sleep!", type: "transport" }] },
  { date: "2025-06-23", label: "Day 2 — Arrive Chongqing", city: "chongqing", activities: [{ id: "a2", time: "Morning", title: "Arrive & check in", notes: "Rest after flight", type: "rest" }, { id: "a3", time: "Evening", title: "Hongya Cave Night View", notes: "Beautiful at night!", type: "activity" }] },
  { date: "2025-06-24", label: "Day 3 — Chongqing", city: "chongqing", activities: [{ id: "a4", time: "Morning", title: "Ciqikou Old Town", notes: "Street food & shopping", type: "activity" }, { id: "a5", time: "Afternoon", title: "Chongqing Hot Pot", notes: "Must try!", type: "food" }] },
  { date: "2025-06-25", label: "Day 4 — Chongqing", city: "chongqing", activities: [{ id: "a6", time: "All Day", title: "Explore & travel to Zhangjiajie", notes: "", type: "transport" }] },
  { date: "2025-06-26", label: "Day 5 — Zhangjiajie", city: "zhangjiajie", activities: [{ id: "a7", time: "All Day", title: "Zhangjiajie National Forest Park", notes: "Avatar Mountains!", type: "activity" }] },
  { date: "2025-06-27", label: "Day 6 — Zhangjiajie", city: "zhangjiajie", activities: [{ id: "a8", time: "Morning", title: "Tianmen Mountain", notes: "Glass skywalk!", type: "activity" }] },
  { date: "2025-06-28", label: "Day 7 — Zhangjiajie", city: "zhangjiajie", activities: [{ id: "a9", time: "All Day", title: "Glass Bridge & Grand Canyon", notes: "", type: "activity" }] },
  { date: "2025-06-29", label: "Day 8 — Transit", city: "transit", activities: [{ id: "a10", time: "All Day", title: "Train Zhangjiajie → Beijing", notes: "~10 hour journey", type: "transport" }] },
  { date: "2025-06-30", label: "Day 9 — Beijing", city: "beijing", activities: [{ id: "a11", time: "Morning", title: "Arrive Beijing", notes: "", type: "transport" }, { id: "a12", time: "Afternoon", title: "Forbidden City", notes: "Book tickets in advance!", type: "activity" }] },
  { date: "2025-07-01", label: "Day 10 — Beijing", city: "beijing", activities: [{ id: "a13", time: "All Day", title: "Great Wall (Mutianyu)", notes: "Arrive early for fewer crowds", type: "activity" }] },
  { date: "2025-07-02", label: "Day 11 — Beijing → Shanghai", city: "beijing", activities: [{ id: "a14", time: "Morning", title: "Temple of Heaven", notes: "", type: "activity" }, { id: "a15", time: "Afternoon", title: "Train/Flight to Shanghai", notes: "", type: "transport" }] },
  { date: "2025-07-03", label: "Day 12 — Shanghai", city: "shanghai", activities: [{ id: "a16", time: "Morning", title: "The Bund", notes: "Morning walk along the waterfront", type: "activity" }] },
  { date: "2025-07-04", label: "Day 13 — Shanghai", city: "shanghai", activities: [{ id: "a17", time: "All Day", title: "Yu Garden & Nanjing Road", notes: "", type: "activity" }] },
  { date: "2025-07-05", label: "Day 14 — Shanghai", city: "shanghai", activities: [{ id: "a18", time: "All Day", title: "Shanghai Disneyland", notes: "Book tickets early!", type: "activity" }] },
  { date: "2025-07-06", label: "Day 15 — Shanghai", city: "shanghai", activities: [{ id: "a19", time: "Afternoon", title: "Tianzifang", notes: "Art & cafes", type: "activity" }] },
  { date: "2025-07-07", label: "Day 16 — Shanghai", city: "shanghai", activities: [{ id: "a20", time: "All Day", title: "Free Day / Shopping", notes: "", type: "shopping" }] },
  { date: "2025-07-08", label: "Day 17 — Shanghai", city: "shanghai", activities: [{ id: "a21", time: "All Day", title: "Last day — explore & pack", notes: "Ship souvenirs if needed", type: "activity" }] },
  { date: "2025-07-09", label: "Day 18 — Return", city: "return", activities: [{ id: "a22", time: "Morning", title: "Flight Shanghai → Sydney", notes: "Check in luggage + shipping boxes", type: "transport" }] },
];

export const ATTRACTIONS: Attraction[] = [
  { id: "at1", name: "Hongya Cave", city: "chongqing", emoji: "🏮", description: "Stunning stilted buildings lit up at night along the Jialing River", photoWorthy: true, tags: ["night view", "architecture"] },
  { id: "at2", name: "Ciqikou Old Town", city: "chongqing", emoji: "🏘️", description: "Ancient porcelain town with snacks, tea houses, and local crafts", photoWorthy: true, tags: ["culture", "food"] },
  { id: "at3", name: "Hot Pot Street", city: "chongqing", emoji: "🍲", description: "Try the legendary Chongqing spicy hot pot", photoWorthy: false, tags: ["food"] },
  { id: "at4", name: "Yangtze River Cruise", city: "chongqing", emoji: "🚢", description: "Night cruise along the Yangtze with city skyline views", photoWorthy: true, tags: ["night view", "scenic"] },
  { id: "at5", name: "Zhangjiajie National Forest", city: "zhangjiajie", emoji: "🌲", description: "The real-life Avatar Mountains — towering sandstone pillars", photoWorthy: true, tags: ["nature", "hiking"] },
  { id: "at6", name: "Glass Bridge", city: "zhangjiajie", emoji: "🌉", description: "World's longest glass-bottom bridge over a canyon", photoWorthy: true, tags: ["adventure", "scenic"] },
  { id: "at7", name: "Tianmen Mountain", city: "zhangjiajie", emoji: "⛰️", description: "Cable car + glass skywalk + Heaven's Gate arch", photoWorthy: true, tags: ["adventure", "scenic"] },
  { id: "at8", name: "Baofeng Lake", city: "zhangjiajie", emoji: "🏞️", description: "Crystal clear lake surrounded by peaks — boat ride included", photoWorthy: true, tags: ["nature", "scenic"] },
  { id: "at9", name: "Great Wall (Mutianyu)", city: "beijing", emoji: "🧱", description: "Less crowded section with cable car and toboggan down", photoWorthy: true, tags: ["iconic", "hiking"] },
  { id: "at10", name: "Forbidden City", city: "beijing", emoji: "🏯", description: "Imperial palace complex — the heart of ancient China", photoWorthy: true, tags: ["history", "architecture"] },
  { id: "at11", name: "Temple of Heaven", city: "beijing", emoji: "🛕", description: "Iconic circular temple where emperors prayed for harvests", photoWorthy: true, tags: ["history", "architecture"] },
  { id: "at12", name: "Hutong Tour", city: "beijing", emoji: "🚲", description: "Explore traditional alleyways by rickshaw or on foot", photoWorthy: true, tags: ["culture", "local"] },
  { id: "at13", name: "The Bund", city: "shanghai", emoji: "🌆", description: "Iconic waterfront with colonial architecture & Pudong skyline", photoWorthy: true, tags: ["iconic", "night view"] },
  { id: "at14", name: "Yu Garden", city: "shanghai", emoji: "🏯", description: "Classical Chinese garden dating back to the Ming Dynasty", photoWorthy: true, tags: ["history", "architecture"] },
  { id: "at15", name: "Nanjing Road", city: "shanghai", emoji: "🛍️", description: "China's most famous shopping street", photoWorthy: false, tags: ["shopping"] },
  { id: "at16", name: "Shanghai Disneyland", city: "shanghai", emoji: "🏰", description: "Magical theme park with unique TRON ride and Pirates!", photoWorthy: true, tags: ["fun", "theme park"] },
  { id: "at17", name: "Tianzifang", city: "shanghai", emoji: "🎨", description: "Artsy lane with boutiques, galleries, and cafes", photoWorthy: true, tags: ["art", "cafes"] },
  { id: "at18", name: "Oriental Pearl Tower", city: "shanghai", emoji: "🗼", description: "Iconic TV tower with observation deck and glass floor", photoWorthy: true, tags: ["iconic", "scenic"] },
];

export const PHOTO_SPOTS: PhotoSpot[] = [
  { id: "ps1", name: "Hongya Cave Balcony", city: "chongqing", description: "Group photo with glowing stilted buildings behind you", tips: "Go at dusk for golden hour + lights", bestTime: "6-8 PM" },
  { id: "ps2", name: "Ciqikou Lantern Street", city: "chongqing", description: "Red lanterns lining the narrow streets", tips: "Look up! The lanterns frame shots beautifully", bestTime: "Afternoon" },
  { id: "ps3", name: "Avatar Hallelujah Mountain", city: "zhangjiajie", description: "The iconic floating mountain pillar from Avatar", tips: "Morning fog makes the best photos", bestTime: "Early morning" },
  { id: "ps4", name: "Glass Bridge Center", city: "zhangjiajie", description: "Looking straight down through the glass!", tips: "Wear fun expressions — scared faces are classic!", bestTime: "Morning" },
  { id: "ps5", name: "Tianmen Cave", city: "zhangjiajie", description: "Heaven's Gate natural arch with 999 steps", tips: "Stand on the steps for epic perspective shots", bestTime: "Midday" },
  { id: "ps6", name: "Great Wall Watchtower", city: "beijing", description: "Group shot with the wall stretching into the distance", tips: "Go early (7-8 AM) for empty wall shots", bestTime: "Early morning" },
  { id: "ps7", name: "Forbidden City Gate", city: "beijing", description: "Classic shot at the main gate with red walls", tips: "Wear contrasting colors against the red", bestTime: "Golden hour" },
  { id: "ps8", name: "Temple of Heaven Echo Wall", city: "beijing", description: "Circular temple as backdrop", tips: "Center yourselves for symmetry shots", bestTime: "Morning" },
  { id: "ps9", name: "The Bund Waterfront", city: "shanghai", description: "Pudong skyline with Oriental Pearl Tower behind", tips: "Night shots are stunning but sunrise is quieter", bestTime: "Sunset/Night" },
  { id: "ps10", name: "Nanjing Road Neon Signs", city: "shanghai", description: "Walking shot under colorful neon lights", tips: "Best after dark for vibrant colors", bestTime: "Night" },
  { id: "ps11", name: "Yu Garden Bridge", city: "shanghai", description: "Zigzag bridge with traditional buildings", tips: "Stand on the bridge for depth in photos", bestTime: "Morning" },
  { id: "ps12", name: "Disneyland Castle", city: "shanghai", description: "Classic princess pose in front of the castle", tips: "Magic hour lighting is perfection", bestTime: "Sunset" },
];

export const POSE_IDEAS: PoseIdea[] = [
  { id: "po1", name: "The Charlie's Angels", description: "Back to back in pairs, striking fierce poses", emoji: "💪" },
  { id: "po2", name: "Jump Shot", description: "All 4 jumping at the same time — classic travel photo", emoji: "🦘" },
  { id: "po3", name: "Walking Away", description: "Walk away from camera, arms linked, looking back over shoulder", emoji: "👯" },
  { id: "po4", name: "The Candid Laugh", description: "Someone says something funny — photographer captures the genuine laughter", emoji: "😂" },
  { id: "po5", name: "Matching Poses", description: "All 4 doing the exact same pose — mirror each other", emoji: "🪞" },
  { id: "po6", name: "The Food Shot", description: "All eating/holding the same food together", emoji: "🍜" },
  { id: "po7", name: "Silhouette Sunset", description: "Stand in a line at sunset for dramatic silhouette", emoji: "🌅" },
  { id: "po8", name: "The Tourist Classic", description: "One person 'holding' a famous landmark with fingers", emoji: "🤏" },
  { id: "po9", name: "Staircase Levels", description: "Stand on different steps for a staggered height photo", emoji: "📶" },
  { id: "po10", name: "The Reflection", description: "Find water/glass and capture both yourselves and your reflection", emoji: "🪩" },
];

export const INITIAL_PACKING: PackingItem[] = [
  { id: "p1", item: "Passport", category: "documents", checked: false },
  { id: "p2", item: "Flight tickets (printed)", category: "documents", checked: false },
  { id: "p3", item: "Hotel bookings", category: "documents", checked: false },
  { id: "p4", item: "Travel insurance docs", category: "documents", checked: false },
  { id: "p5", item: "Chinese Visa", category: "documents", checked: false },
  { id: "p6", item: "Phone charger & adapter", category: "electronics", checked: false },
  { id: "p7", item: "Portable battery pack", category: "electronics", checked: false },
  { id: "p8", item: "Camera / GoPro", category: "electronics", checked: false },
  { id: "p9", item: "Selfie stick / tripod", category: "electronics", checked: false },
  { id: "p10", item: "Comfortable walking shoes", category: "clothing", checked: false },
  { id: "p11", item: "Light jacket (for mountains)", category: "clothing", checked: false },
  { id: "p12", item: "Summer clothes", category: "clothing", checked: false },
  { id: "p13", item: "Sunglasses", category: "clothing", checked: false },
  { id: "p14", item: "Hat / cap", category: "clothing", checked: false },
  { id: "p15", item: "Sunscreen SPF 50+", category: "toiletries", checked: false },
  { id: "p16", item: "Insect repellent", category: "toiletries", checked: false },
  { id: "p17", item: "Mini first aid kit", category: "toiletries", checked: false },
  { id: "p18", item: "Skincare essentials", category: "beauty", checked: false },
  { id: "p19", item: "Makeup bag", category: "beauty", checked: false },
  { id: "p20", item: "Hair tools (mini)", category: "beauty", checked: false },
  { id: "p21", item: "VPN app (download before!)", category: "misc", checked: false },
  { id: "p22", item: "WeChat (set up before!)", category: "misc", checked: false },
  { id: "p23", item: "Snacks for flights", category: "misc", checked: false },
  { id: "p24", item: "Reusable water bottle", category: "misc", checked: false },
];

export const CATEGORY_EMOJI: Record<string, string> = {
  flights: "✈️", hotels: "🏨", food: "🍜", transport: "🚄", shopping: "🛍️", activities: "🎫", shipping: "📦", other: "📦",
  documents: "📄", clothing: "👗", toiletries: "🧴", electronics: "🔌", beauty: "💄", misc: "🎒",
};

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
