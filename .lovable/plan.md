

# Add Detailed Chongqing 3-Day Itinerary

Replace the current placeholder Chongqing activities with the detailed 3-day essential map provided.

## Changes

### 1. Update `src/data/tripData.ts` — INITIAL_DAYS (Chongqing section)

Replace the 3 Chongqing days (Jun 23-25) with the full itinerary:

**Day 2 (Jun 23) — "The Cyberpunk Skyline"**
- Arrive & check in (Morning, rest)
- Jiefangbei CBD & Kuixing Mansion (Afternoon, activity) — "Times Square of Chongqing, witness the 1F vs 22F magic"
- Hao You Lai Suan La Fen at Bayi Lu (Afternoon, food) — "Famous hot & sour rice noodles"
- Daijia Lane Cliffside Walk (Late Afternoon, activity) — "Elevated path overlooking Jialing River, great coffee spot"
- Hongya Cave night view from Qiansimen Bridge (Evening, photo) — "Best panoramic shot of the Spirited Away building"
- Tian Bang Bang Hotpot (Evening, food) — "Local residential-style hotpot"

**Day 3 (Jun 24) — "River Romance & Giant Pandas"**
- Chongqing Zoo Panda House (Morning, activity) — "See Yu Ke & Yu Ai pandas, arrive before 9AM for feeding"
- Testbed 2 Art Park (Afternoon, activity) — "I Belonged to You filming location"
- Liziba Monorail (Afternoon, photo) — "Watch the train pass through a building!"
- Longmenhao Old Street & Xiaohao Lane (Sunset, activity) — "Renovated south bank historical area, perfect sunset walk"
- Yangtze River Cable Car (Evening, activity) — "Take from South Bank (Shangxin Street) to skip queues"

**Day 4 (Jun 25) — "Old World Charm & Modern Vibes"**
- Shancheng Alley / Mountain City Lane (Morning, activity) — "Authentic stone paths, Old Chongqing vibes"
- Ciqikou Ancient Town (Midday, shopping) — "Souvenirs & Chen Mahua fried dough twists"
- Guanyinqiao Pedestrian Street (Late Afternoon, activity) — "The real modern Chongqing, people-watching & trendy dinner"
- Travel to Zhangjiajie (Evening, transport)

### 2. Update `src/data/tripData.ts` — ATTRACTIONS array

Add new Chongqing attractions that aren't already listed:
- Kuixing Mansion — "1F vs 22F gravity-defying bridge, cyberpunk vibes"
- Daijia Lane Cliffside Walk — "Quiet elevated path with Jialing River views"
- Chongqing Zoo Panda House — "Home of celebrity pandas Yu Ke & Yu Ai"
- Testbed 2 Art Park — "Film location turned art district"
- Liziba Monorail Station — "Train passes through a residential building"
- Shancheng Alley — "Mountain City Lane, authentic Old Chongqing stone paths"
- Guanyinqiao Pedestrian Street — "Modern Chongqing shopping & dining"

### 3. Update `src/data/tripData.ts` — PHOTO_SPOTS array

Add new Chongqing photo spots:
- Kuixing Mansion Bridge — "Gravity-defying bridge between buildings"
- Liziba Monorail Through Building — "Train emerging from apartment block"
- Yangtze River Cable Car at Night — "Crossing the river with city lights"
- Shancheng Alley Stone Steps — "Atmospheric old lane with stone paths"

### Technical Notes
- All text in English (no Chinese characters), using pinyin for place names where needed
- Activity IDs will be regenerated to avoid conflicts (a2-a6 range will be expanded)
- Subsequent day activity IDs (a7+) will be renumbered to accommodate the new entries
- Only `src/data/tripData.ts` needs modification; Timeline component renders dynamically from data
