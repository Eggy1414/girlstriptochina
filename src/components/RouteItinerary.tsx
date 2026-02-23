import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface DayData {
  day: number;
  date: string;
  title: string;
  city: string;
  cityEmoji: string;
  focus?: string;
  content: React.ReactNode;
}

const Section = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <h4 className="font-bold text-foreground flex items-center gap-2 mb-1">
      <span>{emoji}</span> {title}
    </h4>
    <div className="pl-7 text-foreground/80 text-sm space-y-1">{children}</div>
  </div>
);

const Tip = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs bg-accent/30 rounded-lg px-3 py-2 mt-2 text-foreground/90">💡 {children}</p>
);

const BookingLink = ({ label, url }: { label: string; url: string }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block text-xs underline text-foreground/70 hover:text-foreground mt-1">
    🔗 {label}
  </a>
);

const DAYS: DayData[] = [
  {
    day: 1, date: "6.22", title: "Flight Sydney → Chongqing", city: "Flight", cityEmoji: "✈️",
    content: <p className="text-foreground/70 text-sm">Depart Sydney for Chongqing.</p>
  },
  {
    day: 2, date: "6.23", title: "The Cyberpunk Skyline", city: "Chongqing", cityEmoji: "🏙️",
    focus: "Iconic Landmarks & Vertical Architecture",
    content: (
      <>
        <Section emoji="🏢" title="Afternoon: Jiefangbei CBD & Kuixing Mansion">
          <p>Explore the "Times Square" of Chongqing, then walk 5 mins to Kuixing Mansion to witness the "1st Floor vs. 22nd Floor" magic.</p>
          <p><strong>Snack:</strong> Hao You Lai Hot & Sour Rice Noodles (八一路酸辣粉).</p>
          <p className="text-xs text-foreground/60">📸 Photo Reference: Kuixing Mansion's Gravity-Defying Bridge</p>
        </Section>
        <Section emoji="🌿" title="Late Afternoon: Daijia Lane Cliffside Walk">
          <p>A quieter, elevated path overlooking the Jialing River. Best spot for coffee with a view.</p>
        </Section>
        <Section emoji="🏮" title="Evening: Hongya Cave (The 'Spirited Away' Building)">
          <p>View the lights from the Qiansimen Bridge for the best panoramic shot.</p>
          <p><strong>Dinner:</strong> Tian Bang Bang Hotpot (Local residential style).</p>
          <p className="text-xs text-foreground/60">📸 Photo Reference: Hongya Cave Night View</p>
        </Section>
      </>
    )
  },
  {
    day: 3, date: "6.24", title: "River Romance & Giant Pandas", city: "Chongqing", cityEmoji: "🏙️",
    focus: "Nature, Art, and Local Heritage",
    content: (
      <>
        <Section emoji="🐼" title="Morning: Chongqing Zoo (Panda House)">
          <p>See the celebrity pandas Yu Ke & Yu Ai. Arrive before 9:00 AM for feeding time.</p>
          <p className="text-xs text-foreground/60">📸 Photo Reference: Yu Ke Yu Ai Pandas</p>
        </Section>
        <Section emoji="🎬" title="Afternoon: Testbed 2 Art Park & Liziba Monorail">
          <p>Visit the "I Belonged to You" filming location (Testbed 2) and watch the train pass through a building (Liziba).</p>
        </Section>
        <Section emoji="🌅" title="Sunset: Longmenhao Old Street & Xiaohao Lane">
          <p>Renovated historical area on the south bank. Perfect for a sunset walk.</p>
        </Section>
        <Section emoji="🚡" title="Evening: Yangtze River Cable Car">
          <Tip>Take it from the South Bank (Shangxin Street) back to the City Center to skip the massive tourist queues.</Tip>
          <p className="text-xs text-foreground/60">📸 Photo Reference: Yangtze River Cable Car Night</p>
        </Section>
      </>
    )
  },
  {
    day: 4, date: "6.25", title: "Old World Charm & Modern Vibes", city: "Chongqing", cityEmoji: "🏙️",
    focus: "Traditional Alleys & Trendy Shopping",
    content: (
      <>
        <Section emoji="🪨" title="Morning: Shancheng Alley (Mountain City Lane)">
          <p>The only lane named after the city's nickname. Authentic stone paths and local "Old Chongqing" vibes.</p>
          <p className="text-xs text-foreground/60">📸 Photo Reference: Shancheng Alley Chongqing</p>
        </Section>
        <Section emoji="🏘️" title="Midday: Ciqikou Ancient Town">
          <p>Souvenir shopping and tasting Chen Mahua (Fried Dough Twists).</p>
        </Section>
        <Section emoji="🛍️" title="Late Afternoon: Guanyinqiao Pedestrian Street">
          <p>Experience the "Real" modern Chongqing. Great for people-watching and a final trendy dinner before departure.</p>
        </Section>
        <div className="mt-4 p-3 rounded-lg bg-accent/20 text-sm">
          <span className="font-bold">🚄 Train Chongqing → Zhangjiajie</span>
        </div>
      </>
    )
  },
  {
    day: 5, date: "6.26", title: "Glass Bridge & Canyon Thrills", city: "Zhangjiajie", cityEmoji: "🏔️",
    focus: "High-altitude adrenaline and natural deep-breaths",
    content: (
      <>
        <Section emoji="🏨" title="Arrival">
          <p>Drop luggage at your hotel in Wulingyuan District.</p>
        </Section>
        <Section emoji="🌉" title="Zhangjiajie Grand Canyon">
          <p>Head to Zhangjiajie Grand Canyon via Didi.</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Walk the famous Glass Bridge.</li>
            <li><strong>Optional Thrills:</strong> Zipline and Glass Slide (highly recommended by Cathy).</li>
            <li>Finish with a 30-40 min canyon walk leading to a scenic boat ride back to the exit.</li>
          </ul>
          <p className="mt-1"><strong>Estimated Time:</strong> 5.5 hours.</p>
          <BookingLink label="Trip.com Grand Canyon & Glass Bridge" url="https://www.trip.com" />
        </Section>
      </>
    )
  },
  {
    day: 6, date: "6.27", title: "The Avatar Mountains (National Forest Park)", city: "Zhangjiajie", cityEmoji: "🏔️",
    focus: "The classic 'Pillar Mountains' day",
    content: (
      <>
        <Section emoji="🌲" title="Full Day: National Forest Park">
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Morning:</strong> Enter via Wulingyuan Sign Gate (avoid the very first bus to skip peak rush).</li>
            <li><strong>Upward:</strong> Take the Bailong Elevator (tallest outdoor elevator in the world).</li>
            <li><strong>Topside:</strong> Explore viewing platforms (Hallelujah Mountains). Use internal park buses.</li>
            <li><strong>Downward:</strong> End with a scenic Cable Car descent.</li>
          </ul>
          <Tip>If you're worried about complex routes, consider booking a 1-day guide or an all-inclusive ticket at the door.</Tip>
          <BookingLink label="Klook Forest Park Tickets" url="https://www.klook.com" />
        </Section>
      </>
    )
  },
  {
    day: 7, date: "6.28", title: "Tianmen Mountain & Stairway to Heaven", city: "Zhangjiajie", cityEmoji: "🏔️",
    focus: "The grand finale in Zhangjiajie Town",
    content: (
      <>
        <Section emoji="⛰️" title="Tianmen Mountain">
          <p><strong>Logistics:</strong> Check out and take your luggage to the city (40 mins from Wulingyuan). The cable car station is near the train station.</p>
          <p>Conquer the 999 steps to the "Heaven's Gate."</p>
          <Tip>You MUST book Option A or B tickets in advance on Trip.com. Option C (bus only) is a backup but less scenic.</Tip>
        </Section>
        <div className="mt-4 p-3 rounded-lg bg-accent/20 text-sm">
          <span className="font-bold">🚄 6.28 – 6.29 Train Zhangjiajie → Beijing</span>
        </div>
      </>
    )
  },
  {
    day: 8, date: "6.29", title: "The Imperial Essentials", city: "Beijing", cityEmoji: "🏯",
    focus: "Combining the best for a grand finale",
    content: (
      <>
        <Section emoji="🛕" title="Morning: Lama Temple & Jingshan Park">
          <p><strong>Lama Temple (雍和宫):</strong> Beijing's most famous Tibetan Buddhist temple. See the world's largest sandalwood Buddha.</p>
          <p><strong>Jingshan Park (景山公园):</strong> A quick 15-minute climb for the iconic 360-degree view of the Forbidden City.</p>
        </Section>
        <Section emoji="🏞️" title="Afternoon: The Summer Palace (颐和园)">
          <p>Explore vast royal gardens and take a boat ride on Kunming Lake. Perfect place to relax.</p>
          <BookingLink label="Summer Palace (Trip.com)" url="https://www.trip.com" />
        </Section>
        <Section emoji="🍽️" title="Evening: Farewell Dinner">
          <p><strong>Peking Duck:</strong> Indulge in a final authentic feast (Recommended: Siji Minfu or Da Dong).</p>
        </Section>
      </>
    )
  },
  {
    day: 9, date: "6.30", title: "Universal Studios Beijing 🎬", city: "Beijing", cityEmoji: "🏯",
    focus: "Movie Magic → Harry Potter Style",
    content: (
      <>
        <Section emoji="🎢" title="All Day: Universal Studios Beijing (北京环球度假区)">
          <p>Immerse yourself in the Wizarding World of Harry Potter, Jurassic World Adventure, and the Transformers Metrobase.</p>
          <Tip>Download the "Universal Beijing Resort" App to track live wait times.</Tip>
          <p><strong>Evening:</strong> Enjoy dinner and the neon lights at CityWalk before heading back.</p>
          <BookingLink label="Universal Beijing Resort Official" url="https://www.universalbeijingresort.com" />
        </Section>
      </>
    )
  },
  {
    day: 10, date: "7.1", title: "The Great Wall (Adrenaline & History)", city: "Beijing", cityEmoji: "🏯",
    focus: "Most scenic section with a thrilling descent",
    content: (
      <>
        <Section emoji="🧱" title="Full Day: Mutianyu Great Wall (慕田峪长城)">
          <ul className="list-disc pl-4 space-y-1">
            <li>Take the Cable Car up to avoid the exhausting stairs.</li>
            <li>Walk the ancient ramparts for incredible photography.</li>
            <li><strong>Highlight:</strong> Take the Toboggan (Slide down) — a high-speed slide from the Wall to the base.</li>
          </ul>
          <p className="mt-1"><strong>Evening:</strong> Return to the city. If you have energy, grab dinner in the Houhai (后海) lake area.</p>
          <BookingLink label="Mutianyu Great Wall (Trip.com)" url="https://www.trip.com" />
        </Section>
      </>
    )
  },
  {
    day: 11, date: "7.2", title: "Bund Sunset & Luxury Scents", city: "Shanghai", cityEmoji: "🌃",
    focus: "Iconic Views and High-end Shopping",
    content: (
      <>
        <div className="mb-4 p-3 rounded-lg bg-accent/20 text-sm">
          <span className="font-bold">🚄 Train Beijing → Shanghai</span>
        </div>
        <Section emoji="🏨" title="Afternoon: Arrive & Check In">
          <p>Arrive via High-speed Rail. Check into your hotel (preferably near People's Square or Jing'an Temple).</p>
        </Section>
        <Section emoji="🛍️" title="Late Afternoon: IFC Mall (Lujiazui)">
          <p><strong>Must Visit:</strong> To Summer (观夏) for premium Chinese perfumes; Ah Ma Shou Zuo (阿嬷手作) for the best milk tea (order via WeChat mini-program 1 hour in advance!).</p>
        </Section>
        <Section emoji="🌆" title="Evening: The Bund & River Cruise">
          <Tip>Skip the ferry. Take the Standard Cruise (RMB 120-150). Best 50-minute loop for photos.</Tip>
          <p><strong>Walk:</strong> Stroll from the Bund to Peace Hotel to see the "Old Shanghai" neon.</p>
        </Section>
      </>
    )
  },
  {
    day: 12, date: "7.3", title: "Cyberpunk & Ancient Lights", city: "Shanghai", cityEmoji: "🌃",
    focus: "Modern Architecture & Traditional Nightscape",
    content: (
      <>
        <Section emoji="🏙️" title="Morning: Shanghai Tower or SWFC">
          <p>World's highest observation deck or the "Bottle Opener" — pick your view.</p>
        </Section>
        <Section emoji="🌿" title="Afternoon: 1000 Trees (天安千树)">
          <p>A stunning piece of architecture that looks like a hanging garden.</p>
        </Section>
        <Section emoji="🏯" title="Late Afternoon: Yuyuan Garden & Bazaar">
          <Tip>Visit the garden itself before 4:30 PM, but stay for the Bazaar lights which turn on around 6:00 PM (stunning for photos).</Tip>
          <p><strong>Optional:</strong> An evening acrobatics show (ERA 2) if you want a cultural spectacle.</p>
        </Section>
      </>
    )
  },
  {
    day: 13, date: "7.4", title: '"City Walk" & Bakery Run', city: "Shanghai", cityEmoji: "🌃",
    focus: "French Concession Vibe (The most Instagrammable day)",
    content: (
      <>
        <Section emoji="🥐" title="Morning: Apoli Itabakery (Anfu Rd)">
          <Tip>Arrive by 9:30 AM to secure their viral croissants/pastries.</Tip>
        </Section>
        <Section emoji="🚶" title="Midday: Anfu Road & Wukang Road">
          <p>Walk the French Concession. Explore vintage stores, independent cafes, and the iconic Wukang Mansion.</p>
        </Section>
        <Section emoji="🏘️" title="Afternoon: Xintiandi">
          <p>A mix of traditional "Shikumen" houses and luxury boutiques. Great for people-watching.</p>
        </Section>
      </>
    )
  },
  {
    day: 14, date: "7.5", title: "Suzhou Hanfu Day Trip 👘", city: "Shanghai", cityEmoji: "🌃",
    focus: "Traditional Gardens & Photoshoots",
    content: (
      <>
        <Section emoji="🚄" title="Morning: High-speed Train to Suzhou">
          <p>Approx. 25 mins. Arrive before 9:30 AM.</p>
        </Section>
        <Section emoji="👘" title="The Experience: Hanfu Rental">
          <p>Rent a Hanfu near Pingjiang Road (approx. RMB 150-350).</p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Humble Administrator's Garden</strong> (Book 3 days early!).</li>
            <li><strong>Suzhou Museum</strong> (Architectural masterpiece by I.M. Pei — book 7 days early!).</li>
          </ul>
        </Section>
        <Section emoji="🌃" title="Evening">
          <p>Return to Shanghai.</p>
        </Section>
      </>
    )
  },
  {
    day: 15, date: "7.6", title: "Retail Therapy (The Big Malls)", city: "Shanghai", cityEmoji: "🌃",
    focus: "Major Shopping Arteries",
    content: (
      <>
        <Section emoji="🍽️" title="Lunch: No. 3 Warehouse (三号仓库)">
          <p>Trendy industrial-style fusion food.</p>
        </Section>
        <Section emoji="🛍️" title="Afternoon: Nanjing Road Pedestrian Street">
          <p>Visit the World's Largest Starbucks Reserve Roastery near West Nanjing Rd.</p>
        </Section>
        <Section emoji="👗" title="Late Afternoon">
          <p>Revisit your favorite area for final fashion picks.</p>
        </Section>
      </>
    )
  },
  {
    day: 16, date: "7.7", title: "Disneyland or Deep Relaxation", city: "Shanghai", cityEmoji: "🌃",
    focus: "Choose your own adventure",
    content: (
      <>
        <Section emoji="🏰" title="Option A: Shanghai Disneyland">
          <p>Requires a full day + high energy.</p>
        </Section>
        <Section emoji="☕" title="Option B: Total Chill">
          <p>Visit Tianzi Fang for souvenirs, then find a hidden café in the Jing'an district.</p>
        </Section>
      </>
    )
  },
  {
    day: 17, date: "7.8", title: 'The "Glow-up" & Farewell', city: "Shanghai", cityEmoji: "🌃",
    focus: "Recovery and Pampering",
    content: (
      <>
        <Section emoji="🛍️" title="Morning: TX Huaihai">
          <p>Last-minute shopping at the youth trendy culture mall.</p>
        </Section>
        <Section emoji="💆" title="Afternoon: Beauty Treatment">
          <p>Find a reputable facial or head spa in the city center.</p>
        </Section>
        <Section emoji="♨️" title='Evening: "Shui Guo" Spa (Water Therapy)'>
          <p>Visit a massive spa like New Star or Gokurakuyu. Soak in the baths, get a massage, and eat free fruit/snacks to end your trip fully relaxed.</p>
        </Section>
      </>
    )
  },
  {
    day: 18, date: "7.9", title: "Departure", city: "Return", cityEmoji: "🏠",
    content: (
      <Section emoji="🚄" title="Travel: Maglev Train to Pudong Airport (PVG)">
        <p>300km/h experience! ✈️ Fly home to Sydney.</p>
      </Section>
    )
  },
];

const CITY_COLORS: Record<string, string> = {
  "Flight": "border-l-foreground/30",
  "Chongqing": "border-l-foreground/60",
  "Zhangjiajie": "border-l-foreground/40",
  "Beijing": "border-l-foreground/50",
  "Shanghai": "border-l-foreground/70",
  "Return": "border-l-foreground/30",
};

const RouteItinerary = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">🗺️ Full Route Itinerary</h2>
      <Accordion type="multiple" className="space-y-2">
        {DAYS.map((day) => (
          <AccordionItem
            key={day.day}
            value={`day-${day.day}`}
            className={`border rounded-xl bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden border-l-4 ${CITY_COLORS[day.city] || ""}`}
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/20">
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl">{day.cityEmoji}</span>
                <div>
                  <p className="text-xs text-muted-foreground font-sans">Day {day.day} · {day.date}</p>
                  <p className="font-bold text-foreground text-sm">{day.title}</p>
                  {day.focus && <p className="text-xs text-muted-foreground mt-0.5">{day.focus}</p>}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {day.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RouteItinerary;
