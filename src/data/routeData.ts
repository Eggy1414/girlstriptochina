import { generateId } from "./tripData";

export interface RouteActivity {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export interface RouteDay {
  id: string;
  day: number;
  date: string;
  title: string;
  city: string;
  cityEmoji: string;
  focus?: string;
  activities: RouteActivity[];
}

export const INITIAL_ROUTE_DAYS: RouteDay[] = [
  {
    id: "rd1", day: 1, date: "6.22", title: "Flight Sydney → Chongqing", city: "Flight", cityEmoji: "✈️",
    activities: [
      { id: "ra1", emoji: "✈️", title: "Depart Sydney", description: "Depart Sydney for Chongqing." },
    ]
  },
  {
    id: "rd2", day: 2, date: "6.23", title: "The Cyberpunk Skyline", city: "Chongqing", cityEmoji: "🏙️",
    focus: "Iconic Landmarks & Vertical Architecture",
    activities: [
      { id: "ra2", emoji: "🏙️", title: "Arrives Chongqing", description: "Land in Chongqing and settle in." },
      { id: "ra3", emoji: "🏢", title: "Afternoon: Jiefangbei CBD & Kuixing Mansion", description: "Explore the \"Times Square\" of Chongqing, then walk 5 mins to Kuixing Mansion to witness the \"1st Floor vs. 22nd Floor\" magic.\n\nSnack: Hao You Lai Hot & Sour Rice Noodles (八一路酸辣粉).\n📸 Kuixing Mansion's Gravity-Defying Bridge" },
      { id: "ra4", emoji: "🌿", title: "Late Afternoon: Daijia Lane Cliffside Walk", description: "A quieter, elevated path overlooking the Jialing River. Best spot for coffee with a view." },
      { id: "ra5", emoji: "🏮", title: "Evening: Hongya Cave (The 'Spirited Away' Building)", description: "View the lights from the Qiansimen Bridge for the best panoramic shot.\n\nDinner: Tian Bang Bang Hotpot (Local residential style).\n📸 Hongya Cave Night View" },
    ]
  },
  {
    id: "rd3", day: 3, date: "6.24", title: "River Romance & Giant Pandas", city: "Chongqing", cityEmoji: "🏙️",
    focus: "Nature, Art, and Local Heritage",
    activities: [
      { id: "ra6", emoji: "🐼", title: "Morning: Chongqing Zoo (Panda House)", description: "See the celebrity pandas Yu Ke & Yu Ai. Arrive before 9:00 AM for feeding time.\n📸 Yu Ke Yu Ai Pandas" },
      { id: "ra7", emoji: "🎬", title: "Afternoon: Testbed 2 Art Park & Liziba Monorail", description: "Visit the \"I Belonged to You\" filming location (Testbed 2) and watch the train pass through a building (Liziba)." },
      { id: "ra8", emoji: "🌅", title: "Sunset: Longmenhao Old Street & Xiaohao Lane", description: "Renovated historical area on the south bank. Perfect for a sunset walk." },
      { id: "ra9", emoji: "🚡", title: "Evening: Yangtze River Cable Car", description: "💡 Take it from the South Bank (Shangxin Street) back to the City Center to skip the massive tourist queues.\n📸 Yangtze River Cable Car Night" },
    ]
  },
  {
    id: "rd4", day: 4, date: "6.25", title: "Old World Charm & Modern Vibes", city: "Chongqing", cityEmoji: "🏙️",
    focus: "Traditional Alleys & Trendy Shopping",
    activities: [
      { id: "ra10", emoji: "🪨", title: "Morning: Shancheng Alley (Mountain City Lane)", description: "The only lane named after the city's nickname. Authentic stone paths and local \"Old Chongqing\" vibes.\n📸 Shancheng Alley Chongqing" },
      { id: "ra11", emoji: "🏘️", title: "Midday: Ciqikou Ancient Town", description: "Souvenir shopping and tasting Chen Mahua (Fried Dough Twists)." },
      { id: "ra12", emoji: "🛍️", title: "Late Afternoon: Guanyinqiao Pedestrian Street", description: "Experience the \"Real\" modern Chongqing. Great for people-watching and a final trendy dinner before departure." },
      { id: "ra13", emoji: "🚄", title: "Train Chongqing → Zhangjiajie", description: "Depart Chongqing for Zhangjiajie." },
    ]
  },
  {
    id: "rd5", day: 5, date: "6.26", title: "Glass Bridge & Canyon Thrills", city: "Zhangjiajie", cityEmoji: "🏔️",
    focus: "High-altitude adrenaline and natural deep-breaths",
    activities: [
      { id: "ra14", emoji: "🏨", title: "Arrival", description: "Drop luggage at your hotel in Wulingyuan District." },
      { id: "ra15", emoji: "🌉", title: "Zhangjiajie Grand Canyon", description: "Head to Zhangjiajie Grand Canyon via Didi.\n• Walk the famous Glass Bridge.\n• Optional Thrills: Zipline and Glass Slide (highly recommended by Cathy).\n• Finish with a 30-40 min canyon walk leading to a scenic boat ride back to the exit.\n\nEstimated Time: 5.5 hours." },
    ]
  },
  {
    id: "rd6", day: 6, date: "6.27", title: "The Avatar Mountains (National Forest Park)", city: "Zhangjiajie", cityEmoji: "🏔️",
    focus: "The classic 'Pillar Mountains' day",
    activities: [
      { id: "ra16", emoji: "🌲", title: "Full Day: National Forest Park", description: "• Morning: Enter via Wulingyuan Sign Gate (avoid the very first bus to skip peak rush).\n• Upward: Take the Bailong Elevator (tallest outdoor elevator in the world).\n• Topside: Explore viewing platforms (Hallelujah Mountains). Use internal park buses.\n• Downward: End with a scenic Cable Car descent.\n\n💡 If worried about complex routes, consider booking a 1-day guide." },
    ]
  },
  {
    id: "rd7", day: 7, date: "6.28", title: "Tianmen Mountain & Stairway to Heaven", city: "Zhangjiajie", cityEmoji: "🏔️",
    focus: "The grand finale in Zhangjiajie Town",
    activities: [
      { id: "ra17", emoji: "⛰️", title: "Tianmen Mountain", description: "Logistics: Check out and take your luggage to the city (40 mins from Wulingyuan). The cable car station is near the train station.\n\nConquer the 999 steps to the \"Heaven's Gate.\"\n\n💡 You MUST book Option A or B tickets in advance on Trip.com." },
      { id: "ra18", emoji: "🚄", title: "6.28 – 6.29 Train Zhangjiajie → Beijing", description: "Overnight train to Beijing." },
    ]
  },
  {
    id: "rd8", day: 8, date: "6.29", title: "The Imperial Essentials", city: "Beijing", cityEmoji: "🏯",
    focus: "Combining the best for a grand finale",
    activities: [
      { id: "ra19", emoji: "🛕", title: "Morning: Lama Temple & Jingshan Park", description: "Lama Temple (雍和宫): Beijing's most famous Tibetan Buddhist temple. See the world's largest sandalwood Buddha.\n\nJingshan Park (景山公园): A quick 15-minute climb for the iconic 360-degree view of the Forbidden City." },
      { id: "ra20", emoji: "🏞️", title: "Afternoon: The Summer Palace (颐和园)", description: "Explore vast royal gardens and take a boat ride on Kunming Lake. Perfect place to relax." },
      { id: "ra21", emoji: "🍽️", title: "Evening: Farewell Dinner", description: "Peking Duck: Indulge in a final authentic feast (Recommended: Siji Minfu or Da Dong)." },
    ]
  },
  {
    id: "rd9", day: 9, date: "6.30", title: "Universal Studios Beijing 🎬", city: "Beijing", cityEmoji: "🏯",
    focus: "Movie Magic → Harry Potter Style",
    activities: [
      { id: "ra22", emoji: "🎢", title: "All Day: Universal Studios Beijing (北京环球度假区)", description: "Immerse yourself in the Wizarding World of Harry Potter, Jurassic World Adventure, and the Transformers Metrobase.\n\n💡 Download the \"Universal Beijing Resort\" App to track live wait times.\n\nEvening: Enjoy dinner and the neon lights at CityWalk before heading back." },
    ]
  },
  {
    id: "rd10", day: 10, date: "7.1", title: "The Great Wall (Adrenaline & History)", city: "Beijing", cityEmoji: "🏯",
    focus: "Most scenic section with a thrilling descent",
    activities: [
      { id: "ra23", emoji: "🧱", title: "Full Day: Mutianyu Great Wall (慕田峪长城)", description: "• Take the Cable Car up to avoid the exhausting stairs.\n• Walk the ancient ramparts for incredible photography.\n• Highlight: Take the Toboggan (Slide down) — a high-speed slide from the Wall to the base.\n\nEvening: Return to the city. If you have energy, grab dinner in the Houhai (后海) lake area." },
    ]
  },
  {
    id: "rd11", day: 11, date: "7.2", title: "Bund Sunset & Luxury Scents", city: "Shanghai", cityEmoji: "🌃",
    focus: "Iconic Views and High-end Shopping",
    activities: [
      { id: "ra24", emoji: "🚄", title: "Train Beijing → Shanghai", description: "High-speed rail to Shanghai." },
      { id: "ra25", emoji: "🏨", title: "Afternoon: Arrive & Check In", description: "Check into your hotel (preferably near People's Square or Jing'an Temple)." },
      { id: "ra26", emoji: "🛍️", title: "Late Afternoon: IFC Mall (Lujiazui)", description: "Must Visit: To Summer (观夏) for premium Chinese perfumes; Ah Ma Shou Zuo (阿嬷手作) for the best milk tea (order via WeChat mini-program 1 hour in advance!)." },
      { id: "ra27", emoji: "🌆", title: "Evening: The Bund & River Cruise", description: "💡 Skip the ferry. Take the Standard Cruise (RMB 120-150). Best 50-minute loop for photos.\n\nWalk: Stroll from the Bund to Peace Hotel to see the \"Old Shanghai\" neon." },
    ]
  },
  {
    id: "rd12", day: 12, date: "7.3", title: "Cyberpunk & Ancient Lights", city: "Shanghai", cityEmoji: "🌃",
    focus: "Modern Architecture & Traditional Nightscape",
    activities: [
      { id: "ra28", emoji: "🏙️", title: "Morning: Shanghai Tower or SWFC", description: "World's highest observation deck or the \"Bottle Opener\" — pick your view." },
      { id: "ra29", emoji: "🌿", title: "Afternoon: 1000 Trees (天安千树)", description: "A stunning piece of architecture that looks like a hanging garden." },
      { id: "ra30", emoji: "🏯", title: "Late Afternoon: Yuyuan Garden & Bazaar", description: "💡 Visit the garden itself before 4:30 PM, but stay for the Bazaar lights which turn on around 6:00 PM (stunning for photos).\n\nOptional: An evening acrobatics show (ERA 2) if you want a cultural spectacle." },
    ]
  },
  {
    id: "rd13", day: 13, date: "7.4", title: "\"City Walk\" & Bakery Run", city: "Shanghai", cityEmoji: "🌃",
    focus: "French Concession Vibe (The most Instagrammable day)",
    activities: [
      { id: "ra31", emoji: "🥐", title: "Morning: Apoli Itabakery (Anfu Rd)", description: "💡 Arrive by 9:30 AM to secure their viral croissants/pastries." },
      { id: "ra32", emoji: "🚶", title: "Midday: Anfu Road & Wukang Road", description: "Walk the French Concession. Explore vintage stores, independent cafes, and the iconic Wukang Mansion." },
      { id: "ra33", emoji: "🏘️", title: "Afternoon: Xintiandi", description: "A mix of traditional \"Shikumen\" houses and luxury boutiques. Great for people-watching." },
    ]
  },
  {
    id: "rd14", day: 14, date: "7.5", title: "Suzhou Hanfu Day Trip 👘", city: "Shanghai", cityEmoji: "🌃",
    focus: "Traditional Gardens & Photoshoots",
    activities: [
      { id: "ra34", emoji: "🚄", title: "Morning: High-speed Train to Suzhou", description: "Approx. 25 mins. Arrive before 9:30 AM." },
      { id: "ra35", emoji: "👘", title: "The Experience: Hanfu Rental", description: "Rent a Hanfu near Pingjiang Road (approx. RMB 150-350).\n• Humble Administrator's Garden (Book 3 days early!).\n• Suzhou Museum (Architectural masterpiece by I.M. Pei — book 7 days early!)." },
      { id: "ra36", emoji: "🌃", title: "Evening", description: "Return to Shanghai." },
    ]
  },
  {
    id: "rd15", day: 15, date: "7.6", title: "Retail Therapy (The Big Malls)", city: "Shanghai", cityEmoji: "🌃",
    focus: "Major Shopping Arteries",
    activities: [
      { id: "ra37", emoji: "🍽️", title: "Lunch: No. 3 Warehouse (三号仓库)", description: "Trendy industrial-style fusion food." },
      { id: "ra38", emoji: "🛍️", title: "Afternoon: Nanjing Road Pedestrian Street", description: "Visit the World's Largest Starbucks Reserve Roastery near West Nanjing Rd." },
      { id: "ra39", emoji: "👗", title: "Late Afternoon", description: "Revisit your favorite area for final fashion picks." },
    ]
  },
  {
    id: "rd16", day: 16, date: "7.7", title: "Disneyland or Deep Relaxation", city: "Shanghai", cityEmoji: "🌃",
    focus: "Choose your own adventure",
    activities: [
      { id: "ra40", emoji: "🏰", title: "Option A: Shanghai Disneyland", description: "Requires a full day + high energy." },
      { id: "ra41", emoji: "☕", title: "Option B: Total Chill", description: "Visit Tianzi Fang for souvenirs, then find a hidden café in the Jing'an district." },
    ]
  },
  {
    id: "rd17", day: 17, date: "7.8", title: "The \"Glow-up\" & Farewell", city: "Shanghai", cityEmoji: "🌃",
    focus: "Recovery and Pampering",
    activities: [
      { id: "ra42", emoji: "🛍️", title: "Morning: TX Huaihai", description: "Last-minute shopping at the youth trendy culture mall." },
      { id: "ra43", emoji: "💆", title: "Afternoon: Beauty Treatment", description: "Find a reputable facial or head spa in the city center." },
      { id: "ra44", emoji: "♨️", title: "Evening: \"Shui Guo\" Spa (Water Therapy)", description: "Visit a massive spa like New Star or Gokurakuyu. Soak in the baths, get a massage, and eat free fruit/snacks to end your trip fully relaxed." },
    ]
  },
  {
    id: "rd18", day: 18, date: "7.9", title: "Departure", city: "Return", cityEmoji: "🏠",
    activities: [
      { id: "ra45", emoji: "🚄", title: "Travel: Maglev Train to Pudong Airport (PVG)", description: "300km/h experience! ✈️ Fly home to Sydney." },
    ]
  },
];
