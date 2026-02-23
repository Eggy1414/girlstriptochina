export type CityKey = "flight" | "chongqing" | "trainToZhangjiajie" | "zhangjiajie" | "transit" | "beijing" | "flightToShanghai" | "shanghai" | "return";

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
  paidBy?: string;
  splitCount?: number;
  splitAmong?: string[];
}

export const PEOPLE = ["Lilin", "Vet", "Cathy", "Claire"] as const;

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
  checkedBy?: string[];
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
  trainToZhangjiajie: { name: "Train to Zhangjiajie", emoji: "🚄", colorClass: "text-city-transit", bgClass: "bg-city-transit", dates: "Jun 26" },
  zhangjiajie: { name: "Zhangjiajie", emoji: "🏔️", colorClass: "text-city-zhangjiajie", bgClass: "bg-city-zhangjiajie", dates: "Jun 26-29" },
  transit: { name: "Train to Beijing", emoji: "🚄", colorClass: "text-city-transit", bgClass: "bg-city-transit", dates: "Jun 29-30" },
  beijing: { name: "Beijing", emoji: "🏯", colorClass: "text-city-beijing", bgClass: "bg-city-beijing", dates: "Jun 30 - Jul 2" },
  flightToShanghai: { name: "Train to Shanghai", emoji: "🚄", colorClass: "text-city-transit", bgClass: "bg-city-transit", dates: "Jul 2" },
  shanghai: { name: "Shanghai", emoji: "🌃", colorClass: "text-city-shanghai", bgClass: "bg-city-shanghai", dates: "Jul 2-8" },
  return: { name: "Return to Sydney", emoji: "🏠", colorClass: "text-city-flight", bgClass: "bg-city-flight", dates: "Jul 8-9" },
};

export const ACCOMMODATIONS: Accommodation[] = [
  { city: "chongqing", name: "TBD", type: "hotel", address: "Near Jiefangbei", dates: "Jun 23-26", nights: 3, pricePerNight: 0, currency: "CNY", notes: "Homestay ¥550-1100/night, Hotel ¥1000-1500 for 2 rooms. Higher prices in summer, book in Apr/May" },
  { city: "zhangjiajie", name: "TBD", type: "hotel", address: "Wulingyuan, near park entrance", dates: "Jun 26-29", nights: 3, pricePerNight: 0, currency: "CNY", notes: "Not yet decided, need to compare prices" },
  { city: "beijing", name: "TBD", type: "homestay", address: "Dongcheng District", dates: "Jun 30 - Jul 2", nights: 3, pricePerNight: 0, currency: "CNY", notes: "Not yet decided, need to compare prices" },
  { city: "shanghai", name: "TBD", type: "homestay", address: "Jing'an District", dates: "Jul 2-8", nights: 6, pricePerNight: 0, currency: "CNY", notes: "Not yet decided, need to compare prices" },
];

export const INITIAL_DAYS: DayPlan[] = [
  { date: "2025-06-22", label: "Day 1 — Sydney ✈️ Chongqing: The Cyberpunk Skyline", city: "chongqing", activities: [
    { id: "a1", time: "Afternoon", title: "Jiefangbei CBD & Kuixing Mansion", notes: "Explore the Times Square of Chongqing, walk 5 mins to Kuixing Mansion to witness the 1F vs 22F magic", type: "activity" },
    { id: "a1b", time: "Afternoon", title: "Hao You Lai Hot & Sour Rice Noodles (Bayi Lu)", notes: "Famous hot & sour rice noodles snack stop", type: "food" },
    { id: "a1c", time: "Late Afternoon", title: "Daijia Lane Cliffside Walk", notes: "Quieter, elevated path overlooking the Jialing River. Best spot for coffee with a view", type: "activity" },
    { id: "a1d", time: "Evening", title: "Hongya Cave from Qiansimen Bridge", notes: "The Spirited Away building — view the lights from the bridge for best panoramic shot", type: "photo" },
    { id: "a1e", time: "Evening", title: "Tian Bang Bang Hotpot", notes: "Local residential-style hotpot dinner", type: "food" },
  ] },
  { date: "2025-06-23", label: "Day 2 — River Romance & Giant Pandas", city: "chongqing", activities: [
    { id: "a2", time: "Morning", title: "Chongqing Zoo Panda House", notes: "See Yu Ke & Yu Ai pandas, arrive before 9AM for feeding", type: "activity" },
    { id: "a3", time: "Afternoon", title: "Testbed 2 Art Park & Liziba Monorail", notes: "I Belonged to You filming location + watch the train pass through a building", type: "activity" },
    { id: "a4", time: "Sunset", title: "Longmenhao Old Street & Xiaohao Lane", notes: "Renovated south bank historical area, perfect sunset walk", type: "activity" },
    { id: "a5", time: "Evening", title: "Yangtze River Cable Car", notes: "Take from South Bank (Shangxin Street) to skip queues", type: "activity" },
  ] },
  { date: "2025-06-24", label: "Day 3 — Old World Charm & Modern Vibes", city: "chongqing", activities: [
    { id: "a6", time: "Morning", title: "Shancheng Alley (Mountain City Lane)", notes: "Authentic stone paths, Old Chongqing vibes", type: "activity" },
    { id: "a7", time: "Midday", title: "Ciqikou Ancient Town", notes: "Souvenirs & Chen Mahua fried dough twists", type: "shopping" },
    { id: "a8", time: "Late Afternoon", title: "Guanyinqiao Pedestrian Street", notes: "The real modern Chongqing, people-watching & trendy dinner", type: "activity" },
  ] },
];

export const ATTRACTIONS: Attraction[] = [
  { id: "at1", name: "Hongya Cave", city: "chongqing", emoji: "🏮", description: "Stunning stilted buildings lit up at night along the Jialing River", photoWorthy: true, tags: ["night view", "architecture"] },
  { id: "at2", name: "Ciqikou Old Town", city: "chongqing", emoji: "🏘️", description: "Ancient porcelain town with snacks, tea houses, and local crafts", photoWorthy: true, tags: ["culture", "food"] },
  { id: "at3", name: "Hot Pot Street", city: "chongqing", emoji: "🍲", description: "Try the legendary Chongqing spicy hot pot", photoWorthy: false, tags: ["food"] },
  { id: "at4", name: "Yangtze River Cable Car", city: "chongqing", emoji: "🚡", description: "Cross the Yangtze with stunning city views, take from South Bank to skip queues", photoWorthy: true, tags: ["night view", "scenic"] },
  { id: "at19", name: "Kuixing Mansion", city: "chongqing", emoji: "🏢", description: "1F vs 22F gravity-defying bridge, cyberpunk vibes", photoWorthy: true, tags: ["architecture", "cyberpunk"] },
  { id: "at20", name: "Daijia Lane Cliffside Walk", city: "chongqing", emoji: "🌿", description: "Quiet elevated path with Jialing River views, great coffee spot", photoWorthy: true, tags: ["scenic", "cafe"] },
  { id: "at21", name: "Chongqing Zoo Panda House", city: "chongqing", emoji: "🐼", description: "Home of celebrity pandas Yu Ke & Yu Ai, arrive before 9AM for feeding", photoWorthy: true, tags: ["nature", "animals"] },
  { id: "at22", name: "Testbed 2 Art Park", city: "chongqing", emoji: "🎬", description: "Film location turned art district, I Belonged to You filming spot", photoWorthy: true, tags: ["art", "culture"] },
  { id: "at23", name: "Liziba Monorail Station", city: "chongqing", emoji: "🚝", description: "Train passes through a residential building — only in Chongqing!", photoWorthy: true, tags: ["architecture", "unique"] },
  { id: "at24", name: "Shancheng Alley", city: "chongqing", emoji: "🪨", description: "Mountain City Lane, authentic Old Chongqing stone paths", photoWorthy: true, tags: ["culture", "history"] },
  { id: "at25", name: "Guanyinqiao Pedestrian Street", city: "chongqing", emoji: "🛍️", description: "Modern Chongqing shopping & dining, great for people-watching", photoWorthy: false, tags: ["shopping", "modern"] },
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
  { id: "ps13", name: "Kuixing Mansion Bridge", city: "chongqing", description: "Gravity-defying bridge between buildings, 1F meets 22F", tips: "Shoot from below for dramatic perspective", bestTime: "Afternoon" },
  { id: "ps14", name: "Liziba Monorail Through Building", city: "chongqing", description: "Train emerging from an apartment block", tips: "Wait at the platform for the train to arrive for best shot", bestTime: "Anytime" },
  { id: "ps15", name: "Yangtze River Cable Car at Night", city: "chongqing", description: "Crossing the river with city lights below", tips: "Take from South Bank (Shangxin Street) to skip queues", bestTime: "After dark" },
  { id: "ps16", name: "Shancheng Alley Stone Steps", city: "chongqing", description: "Atmospheric old lane with stone paths and local life", tips: "Morning light creates beautiful shadows on the steps", bestTime: "Morning" },
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
