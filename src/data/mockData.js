// Mock data for the entire KishanGhar application

export const weatherData = {
  location: 'Dhaka, Bangladesh',
  temperature: 32,
  feelsLike: 36,
  humidity: 78,
  windSpeed: 12,
  condition: 'Partly Cloudy',
  conditionBn: 'আংশিক মেঘলা',
  icon: '⛅',
  forecast: [
    { day: 'Mon', temp: 33, icon: '☀️' },
    { day: 'Tue', temp: 31, icon: '🌧️' },
    { day: 'Wed', temp: 29, icon: '🌧️' },
    { day: 'Thu', temp: 30, icon: '⛅' },
    { day: 'Fri', temp: 32, icon: '☀️' },
  ],
};

export const tasks = [
  { id: 1, title: 'Water rice paddy - Section A', titleBn: 'ধান ক্ষেতে পানি দিন - সেকশন A', done: true, priority: 'high' },
  { id: 2, title: 'Apply fertilizer to wheat field', titleBn: 'গম ক্ষেতে সার দিন', done: false, priority: 'medium' },
  { id: 3, title: 'Check cattle vaccination schedule', titleBn: 'গবাদি পশুর টিকার সময়সূচী পরীক্ষা করুন', done: false, priority: 'high' },
  { id: 4, title: 'Harvest vegetables from greenhouse', titleBn: 'গ্রিনহাউস থেকে সবজি তুলুন', done: false, priority: 'low' },
  { id: 5, title: 'Clean poultry house', titleBn: 'মুরগির ঘর পরিষ্কার করুন', done: true, priority: 'medium' },
];

export const crops = [
  { id: 1, name: 'Rice (Boro)', nameBn: 'ধান (বোরো)', status: 'growing', health: 'good', area: '2.5 acres', planted: '2025-01-15', harvest: '2025-05-20', progress: 72, icon: '🌾' },
  { id: 2, name: 'Wheat', nameBn: 'গম', status: 'harvesting', health: 'excellent', area: '1.8 acres', planted: '2024-11-10', harvest: '2025-03-15', progress: 95, icon: '🌾' },
  { id: 3, name: 'Potato', nameBn: 'আলু', status: 'growing', health: 'warning', area: '1.2 acres', planted: '2024-12-01', harvest: '2025-03-01', progress: 60, icon: '🥔' },
  { id: 4, name: 'Tomato', nameBn: 'টমেটো', status: 'planted', health: 'good', area: '0.8 acres', planted: '2025-02-01', harvest: '2025-05-01', progress: 35, icon: '🍅' },
  { id: 5, name: 'Mustard', nameBn: 'সরিষা', status: 'harvested', health: 'excellent', area: '1.5 acres', planted: '2024-10-15', harvest: '2025-02-01', progress: 100, icon: '🌻' },
  { id: 6, name: 'Jute', nameBn: 'পাট', status: 'planned', health: 'good', area: '3.0 acres', planted: '2025-04-01', harvest: '2025-08-01', progress: 10, icon: '🌿' },
];

export const livestock = [
  { id: 1, name: 'Lakshmi', nameBn: 'লক্ষ্মী', type: 'cow', breed: 'Red Chittagong', breedBn: 'লাল চট্টগ্রামী', age: '4 years', weight: '350 kg', health: 'healthy', vaccination: 'vaccinated', lastCheckup: '2025-02-10', milk: '12L/day', emoji: '🐄' },
  { id: 2, name: 'Sultan', nameBn: 'সুলতান', type: 'cow', breed: 'Sahiwal Cross', breedBn: 'সাহিওয়াল ক্রস', age: '3 years', weight: '420 kg', health: 'healthy', vaccination: 'vaccinated', lastCheckup: '2025-02-08', milk: '15L/day', emoji: '🐄' },
  { id: 3, name: 'Bhola', nameBn: 'ভোলা', type: 'cow', breed: 'Pabna', breedBn: 'পাবনা', age: '2 years', weight: '280 kg', health: 'sick', vaccination: 'pending', lastCheckup: '2025-02-15', milk: '8L/day', emoji: '🐄' },
  { id: 4, name: 'Meena', nameBn: 'মীনা', type: 'goat', breed: 'Black Bengal', breedBn: 'ব্ল্যাক বেঙ্গল', age: '1.5 years', weight: '25 kg', health: 'healthy', vaccination: 'vaccinated', lastCheckup: '2025-01-20', emoji: '🐐' },
  { id: 5, name: 'Pinky', nameBn: 'পিংকি', type: 'goat', breed: 'Jamunapari', breedBn: 'যমুনাপারি', age: '2 years', weight: '35 kg', health: 'healthy', vaccination: 'vaccinated', lastCheckup: '2025-02-01', emoji: '🐐' },
  { id: 6, name: 'Raja', nameBn: 'রাজা', type: 'goat', breed: 'Black Bengal', breedBn: 'ব্ল্যাক বেঙ্গল', age: '8 months', weight: '15 kg', health: 'sick', vaccination: 'pending', lastCheckup: '2025-02-12', emoji: '🐐' },
  { id: 7, name: 'Batch-A', nameBn: 'ব্যাচ-A', type: 'chicken', breed: 'Sonali', breedBn: 'সোনালী', age: '6 months', weight: '1.8 kg', health: 'healthy', vaccination: 'vaccinated', count: 50, eggs: '35/day', emoji: '🐔' },
  { id: 8, name: 'Batch-B', nameBn: 'ব্যাচ-B', type: 'chicken', breed: 'Rhode Island Red', breedBn: 'রোড আইল্যান্ড রেড', age: '4 months', weight: '1.5 kg', health: 'healthy', vaccination: 'pending', count: 30, eggs: '20/day', emoji: '🐔' },
  { id: 9, name: 'Duck Flock', nameBn: 'হাঁসের পাল', type: 'duck', breed: 'Khaki Campbell', breedBn: 'খাকি ক্যাম্পবেল', age: '8 months', weight: '2.2 kg', health: 'healthy', vaccination: 'vaccinated', count: 25, eggs: '18/day', emoji: '🦆' },
  { id: 10, name: 'Muscovy Group', nameBn: 'রাজহাঁস দল', type: 'duck', breed: 'Muscovy', breedBn: 'মাসকোভি', age: '1 year', weight: '3.5 kg', health: 'healthy', vaccination: 'vaccinated', count: 15, eggs: '10/day', emoji: '🦆' },
];

export const aiInsights = [
  {
    id: 1,
    title: 'Pest Alert: Rice Stem Borer',
    titleBn: 'পোকা সতর্কতা: ধানের মাজরা পোকা',
    description: 'Based on current weather patterns, there is a 73% chance of rice stem borer infestation in your Boro paddy. Consider applying Cartap Hydrochloride 4G.',
    descriptionBn: 'বর্তমান আবহাওয়া অনুযায়ী, আপনার বোরো ধানে ৭৩% মাজরা পোকার সম্ভাবনা। কার্টাপ হাইড্রোক্লোরাইড 4G প্রয়োগ করুন।',
    type: 'warning',
    icon: '🐛',
  },
  {
    id: 2,
    title: 'Optimal Harvest Window',
    titleBn: 'সর্বোত্তম ফসল কাটার সময়',
    description: 'Your wheat field will reach optimal maturity in 5-7 days. Plan harvesting between March 12-14 for best grain quality.',
    descriptionBn: 'আপনার গম ক্ষেত ৫-৭ দিনে সর্বোত্তম পরিপক্বতায় পৌঁছাবে। সেরা দানার মানের জন্য মার্চ ১২-১৪ তারিখে ফসল কাটুন।',
    type: 'success',
    icon: '✅',
  },
  {
    id: 3,
    title: 'Market Price Rising',
    titleBn: 'বাজার মূল্য বাড়ছে',
    description: 'Potato prices expected to increase by 15% in the next 2 weeks. Consider holding your stock for better returns.',
    descriptionBn: 'আগামী ২ সপ্তাহে আলুর দাম ১৫% বাড়তে পারে। ভালো লাভের জন্য মজুদ রাখার কথা ভাবুন।',
    type: 'info',
    icon: '📈',
  },
];

export const alerts = [
  { id: 1, title: 'Heavy Rain Warning', titleBn: 'ভারী বৃষ্টির সতর্কতা', message: 'Expected heavy rainfall tomorrow. Secure your crops.', messageBn: 'আগামীকাল ভারী বৃষ্টি প্রত্যাশিত। ফসল সুরক্ষিত করুন।', type: 'warning', time: '2 hours ago', timeBn: '২ ঘন্টা আগে' },
  { id: 2, title: 'Vaccination Due', titleBn: 'টিকা দেওয়ার সময়', message: 'Cow "Bhola" vaccination is overdue by 3 days.', messageBn: 'গরু "ভোলা" এর টিকা ৩ দিন বাকি।', type: 'danger', time: '5 hours ago', timeBn: '৫ ঘন্টা আগে' },
  { id: 3, title: 'Price Alert', titleBn: 'দাম সতর্কতা', message: 'Rice price increased by ৳5/kg in local market.', messageBn: 'স্থানীয় বাজারে চালের দাম ৳৫/কেজি বেড়েছে।', type: 'info', time: '1 day ago', timeBn: '১ দিন আগে' },
];

export const incomeData = [
  { month: 'Jul', income: 45000, expense: 22000 },
  { month: 'Aug', income: 52000, expense: 25000 },
  { month: 'Sep', income: 48000, expense: 28000 },
  { month: 'Oct', income: 61000, expense: 30000 },
  { month: 'Nov', income: 55000, expense: 24000 },
  { month: 'Dec', income: 67000, expense: 32000 },
  { month: 'Jan', income: 72000, expense: 35000 },
  { month: 'Feb', income: 58000, expense: 27000 },
];

export const cropDetectionResult = {
  disease: 'Brown Spot (বাদামী দাগ রোগ)',
  diseaseBn: 'বাদামী দাগ রোগ',
  confidence: 96,
  severity: 'Medium',
  severityBn: 'মাঝারি',
  affectedArea: '~30% of leaf surface',
  affectedAreaBn: '~৩০% পাতার পৃষ্ঠ',
  treatment: [
    'Apply Mancozeb 75% WP at 2g/L water as foliar spray',
    'Use Propiconazole 25% EC at 1ml/L for severe cases',
    'Improve drainage to reduce humidity around plants',
    'Remove and destroy heavily infected leaves',
  ],
  treatmentBn: [
    'ম্যানকোজেব ৭৫% WP ২ গ্রাম/লি. পানিতে মিশিয়ে পাতায় স্প্রে করুন',
    'গুরুতর ক্ষেত্রে প্রোপিকোনাজোল ২৫% EC ১ মিলি/লি. ব্যবহার করুন',
    'গাছের চারপাশে আর্দ্রতা কমাতে নিষ্কাশন উন্নত করুন',
    'মারাত্মকভাবে সংক্রমিত পাতা ছিঁড়ে ধ্বংস করুন',
  ],
  prevention: [
    'Use disease-resistant rice varieties',
    'Maintain proper spacing between plants',
    'Apply balanced fertilization (avoid excess nitrogen)',
    'Practice crop rotation',
  ],
  preventionBn: [
    'রোগ-প্রতিরোধী ধানের জাত ব্যবহার করুন',
    'গাছের মধ্যে সঠিক দূরত্ব বজায় রাখুন',
    'সুষম সার প্রয়োগ করুন (অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন)',
    'শস্য পর্যায় অনুসরণ করুন',
  ],
};

export const animalDetectionResult = {
  disease: 'Foot and Mouth Disease (FMD)',
  diseaseBn: 'ক্ষুরা রোগ',
  confidence: 89,
  severity: 'High',
  severityBn: 'উচ্চ',
  urgency: 'Immediate veterinary attention recommended',
  urgencyBn: 'তাৎক্ষণিক পশুচিকিৎসকের পরামর্শ প্রয়োজন',
  symptoms: ['Blisters on mouth and feet', 'Excessive drooling', 'Lameness', 'Reduced appetite'],
  symptomsBn: ['মুখ ও পায়ে ফোসকা', 'অতিরিক্ত লালা', 'খোঁড়ানো', 'ক্ষুধা কমে যাওয়া'],
  treatment: [
    'Isolate the affected animal immediately',
    'Clean wounds with potassium permanganate solution',
    'Apply antiseptic ointment on blisters',
    'Provide soft, palatable feed',
    'Consult veterinarian for antiviral treatment',
  ],
  treatmentBn: [
    'আক্রান্ত পশুকে অবিলম্বে আলাদা করুন',
    'পটাশিয়াম পারম্যাঙ্গানেট দ্রবণ দিয়ে ক্ষত পরিষ্কার করুন',
    'ফোসকায় অ্যান্টিসেপটিক মলম লাগান',
    'নরম, সুস্বাদু খাবার দিন',
    'অ্যান্টিভাইরাল চিকিৎসার জন্য পশুচিকিৎসকের পরামর্শ নিন',
  ],
};

export const chatSuggestions = [
  { text: 'My cow has fever', textBn: 'আমার গরুর জ্বর হয়েছে' },
  { text: 'Rice leaf has spots', textBn: 'ধানের পাতায় দাগ পড়েছে' },
  { text: 'What fertilizer should I use?', textBn: 'কোন সার ব্যবহার করব?' },
  { text: 'When to harvest wheat?', textBn: 'গম কখন কাটব?' },
  { text: 'Best time to plant jute', textBn: 'পাট লাগানোর সেরা সময়' },
  { text: 'How to prevent bird flu?', textBn: 'বার্ড ফ্লু কিভাবে প্রতিরোধ করব?' },
];

export const chatResponses = {
  'My cow has fever': {
    response: "Based on the symptoms you've described, here are some immediate steps you can take:\n\n1. **Monitor Temperature**: Normal cattle temperature is 101-102.5°F. If above 104°F, this is concerning.\n\n2. **Keep Hydrated**: Ensure fresh, clean water is available at all times.\n\n3. **Isolate**: Separate the sick cow from the herd to prevent potential spread.\n\n4. **Check for Other Symptoms**: Look for nasal discharge, coughing, reduced appetite, or swelling.\n\n5. **Consult a Vet**: If fever persists more than 24 hours, please consult a veterinarian immediately.\n\n**Common Causes**: Tick fever, pneumonia, mastitis, or viral infections.",
    responseBn: "আপনার বর্ণিত লক্ষণ অনুযায়ী, কিছু তাৎক্ষণিক পদক্ষেপ:\n\n১. **তাপমাত্রা পরীক্ষা**: গরুর স্বাভাবিক তাপমাত্রা ১০১-১০২.৫°F। ১০৪°F এর বেশি হলে চিন্তার বিষয়।\n\n২. **পানি দিন**: সবসময় পরিষ্কার পানি পাওয়া যায় তা নিশ্চিত করুন।\n\n৩. **আলাদা করুন**: সংক্রমণ ছড়ানো রোধে অসুস্থ গরুকে আলাদা করুন।\n\n৪. **অন্যান্য লক্ষণ পরীক্ষা**: নাক দিয়ে পানি পড়া, কাশি, ক্ষুধা কমে যাওয়া পরীক্ষা করুন।\n\n৫. **ডাক্তার দেখান**: ২৪ ঘন্টার বেশি জ্বর থাকলে অবিলম্বে পশুচিকিৎসকের পরামর্শ নিন।",
  },
  'Rice leaf has spots': {
    response: "Spots on rice leaves can indicate several diseases. Here's what to look for:\n\n1. **Brown Spot**: Oval brown lesions with gray centers. Apply Mancozeb fungicide.\n\n2. **Blast Disease**: Diamond-shaped spots with gray-white centers. Use Tricyclazole.\n\n3. **Bacterial Leaf Blight**: Yellow-orange streaks from leaf tip. Drain excess water.\n\n**Immediate Steps**:\n- Take clear photos of affected leaves\n- Check if spots are spreading to other plants\n- Reduce nitrogen fertilizer application\n- Improve field drainage\n\nFor accurate diagnosis, use our **Crop Disease Detection** feature to upload a photo.",
    responseBn: "ধানের পাতায় দাগ বিভিন্ন রোগের লক্ষণ হতে পারে:\n\n১. **বাদামী দাগ রোগ**: ধূসর কেন্দ্রসহ বাদামী দাগ। ম্যানকোজেব ছত্রাকনাশক প্রয়োগ করুন।\n\n২. **ব্লাস্ট রোগ**: হীরক আকৃতির দাগ। ট্রাইসাইক্লাজোল ব্যবহার করুন।\n\n৩. **ব্যাকটেরিয়াল লিফ ব্লাইট**: পাতার ডগা থেকে হলুদ-কমলা দাগ। অতিরিক্ত পানি নিষ্কাশন করুন।\n\n**তাৎক্ষণিক পদক্ষেপ**:\n- আক্রান্ত পাতার ছবি তুলুন\n- অন্য গাছে ছড়াচ্ছে কিনা দেখুন\n- নাইট্রোজেন সার কমান\n\nসঠিক নির্ণয়ের জন্য **ফসল রোগ নির্ণয়** ফিচার ব্যবহার করুন।",
  },
  'What fertilizer should I use?': {
    response: "Fertilizer recommendations depend on your crop and soil type. Here are general guidelines:\n\n**For Rice (Boro)**:\n- Urea: 260 kg/hectare (split into 3 applications)\n- TSP: 100 kg/hectare (during final land preparation)\n- MoP: 120 kg/hectare (split into 2 applications)\n\n**For Wheat**:\n- Urea: 180 kg/hectare\n- TSP: 140 kg/hectare\n- MoP: 50 kg/hectare\n\n**For Vegetables**:\n- Well-decomposed compost: 10 tons/hectare\n- Urea: 150-200 kg/hectare\n- TSP: 100-150 kg/hectare\n\n💡 **Tip**: Get a soil test done for precise recommendations. Apply fertilizer during early morning or late afternoon for best absorption.",
    responseBn: "সার সুপারিশ ফসল ও মাটির ধরনের উপর নির্ভর করে:\n\n**ধানের জন্য (বোরো)**:\n- ইউরিয়া: ২৬০ কেজি/হেক্টর\n- টিএসপি: ১০০ কেজি/হেক্টর\n- এমওপি: ১২০ কেজি/হেক্টর\n\n**গমের জন্য**:\n- ইউরিয়া: ১৮০ কেজি/হেক্টর\n- টিএসপি: ১৪০ কেজি/হেক্টর\n\n**সবজির জন্য**:\n- পচা কম্পোস্ট: ১০ টন/হেক্টর\n- ইউরিয়া: ১৫০-২০০ কেজি/হেক্টর\n\n💡 **টিপ**: সঠিক সুপারিশের জন্য মাটি পরীক্ষা করুন।",
  },
  default: {
    response: "Thank you for your question! Here are some general farming tips:\n\n1. **Soil Health**: Regular soil testing helps optimize fertilizer use\n2. **Water Management**: Efficient irrigation saves costs and improves yield\n3. **Pest Control**: Integrated Pest Management (IPM) is most effective\n4. **Record Keeping**: Track all inputs and outputs for better planning\n\nFor specific advice, please try our specialized features:\n- 🌾 Crop Disease Detection\n- 🐄 Animal Health Check\n- 📊 Market Insights\n\nYou can also book a consultation with a certified expert through our Vet Connect service.",
    responseBn: "আপনার প্রশ্নের জন্য ধন্যবাদ! কিছু সাধারণ কৃষি পরামর্শ:\n\n১. **মাটির স্বাস্থ্য**: নিয়মিত মাটি পরীক্ষা সার ব্যবহার অপ্টিমাইজ করে\n২. **পানি ব্যবস্থাপনা**: দক্ষ সেচ খরচ বাঁচায় ও ফলন বাড়ায়\n৩. **পোকা নিয়ন্ত্রণ**: সমন্বিত বালাই ব্যবস্থাপনা (IPM) সবচেয়ে কার্যকর\n\nবিশেষ পরামর্শের জন্য আমাদের ফিচারগুলি ব্যবহার করুন:\n- 🌾 ফসল রোগ নির্ণয়\n- 🐄 পশু স্বাস্থ্য পরীক্ষা\n- 📊 বাজার তথ্য",
  },
};

export const testimonials = [
  {
    name: 'Rafiq Ahmed',
    nameBn: 'রফিক আহমেদ',
    role: 'Rice Farmer, Rangpur',
    roleBn: 'ধান চাষী, রংপুর',
    text: 'KishanGhar helped me detect leaf blast early and saved 40% of my crop. The AI recommendations were spot-on!',
    textBn: 'কিষাণঘর আমাকে তাড়াতাড়ি ব্লাস্ট রোগ শনাক্ত করতে সাহায্য করেছে এবং আমার ৪০% ফসল বাঁচিয়েছে।',
    rating: 5,
    avatar: '👨‍🌾',
  },
  {
    name: 'Fatema Begum',
    nameBn: 'ফাতেমা বেগম',
    role: 'Dairy Farmer, Bogra',
    roleBn: 'দুগ্ধ খামারি, বগুড়া',
    text: 'The livestock management feature is a lifesaver. I never miss a vaccination now, and my cattle are healthier than ever.',
    textBn: 'পশুপালন ফিচারটি অসাধারণ। এখন কোনো টিকা মিস হয় না, এবং আমার গবাদি পশু আগের চেয়ে সুস্থ।',
    rating: 5,
    avatar: '👩‍🌾',
  },
  {
    name: 'Kamal Hossain',
    nameBn: 'কামাল হোসেন',
    role: 'Mixed Farmer, Jessore',
    roleBn: 'মিশ্র চাষী, যশোর',
    text: 'Market price alerts helped me sell my potatoes at the right time. I earned 20% more this season!',
    textBn: 'বাজার মূল্য সতর্কতা আমাকে সঠিক সময়ে আলু বিক্রি করতে সাহায্য করেছে। এই মৌসুমে ২০% বেশি আয় করেছি!',
    rating: 5,
    avatar: '👨‍🌾',
  },
];

export const faqData = [
  {
    question: 'Is KishanGhar free to use?',
    questionBn: 'কিষাণঘর কি বিনামূল্যে ব্যবহার করা যায়?',
    answer: 'Yes! KishanGhar offers a free tier with access to basic features including crop tracking, weather alerts, and community support. Premium features like AI disease detection and vet consultations are available with our Pro plan.',
    answerBn: 'হ্যাঁ! কিষাণঘর একটি বিনামূল্যে ব্যবহার করা যায় যেখানে ফসল ট্র্যাকিং, আবহাওয়া সতর্কতা, এবং কমিউনিটি সহায়তা রয়েছে। AI রোগ নির্ণয় এবং ভেট পরামর্শের মতো প্রিমিয়াম ফিচারগুলি প্রো প্ল্যানে পাওয়া যায়।',
  },
  {
    question: 'How accurate is the AI disease detection?',
    questionBn: 'AI রোগ নির্ণয় কতটা নির্ভুল?',
    answer: 'Our AI models achieve 90-97% accuracy across common crop and livestock diseases. However, we always recommend consulting with agricultural experts for critical decisions. AI results should be used as a guide, not a replacement for professional advice.',
    answerBn: 'আমাদের AI মডেলগুলি সাধারণ ফসল ও পশুর রোগে ৯০-৯৭% নির্ভুলতা অর্জন করে। তবে, গুরুত্বপূর্ণ সিদ্ধান্তের জন্য কৃষি বিশেষজ্ঞদের পরামর্শ নেওয়ার পরামর্শ দিই।',
  },
  {
    question: 'Can I use KishanGhar in Bangla?',
    questionBn: 'কিষাণঘর কি বাংলায় ব্যবহার করা যায়?',
    answer: 'Absolutely! KishanGhar fully supports both Bangla and English. You can switch between languages anytime using the language toggle in the navigation bar.',
    answerBn: 'অবশ্যই! কিষাণঘর সম্পূর্ণভাবে বাংলা এবং ইংরেজি উভয়ই সমর্থন করে। আপনি যেকোনো সময় নেভিগেশন বারে ভাষা টগল ব্যবহার করে ভাষা পরিবর্তন করতে পারেন।',
  },
  {
    question: 'Do I need internet to use the app?',
    questionBn: 'অ্যাপ ব্যবহার করতে কি ইন্টারনেট দরকার?',
    answer: 'Basic features like viewing your farm data and task lists work offline. AI features, weather updates, and marketplace require an internet connection. We are working on expanding offline capabilities.',
    answerBn: 'ফার্ম ডেটা এবং কাজের তালিকা দেখার মতো মৌলিক ফিচারগুলি অফলাইনে কাজ করে। AI ফিচার, আবহাওয়া আপডেট এবং বাজারের জন্য ইন্টারনেট সংযোগ প্রয়োজন।',
  },
];

export const stats = [
  { value: '10,000+', valueBn: '১০,০০০+', label: 'Active Farmers', labelBn: 'সক্রিয় কৃষক' },
  { value: '50,000+', valueBn: '৫০,০০০+', label: 'Crops Analyzed', labelBn: 'ফসল বিশ্লেষিত' },
  { value: '95%', valueBn: '৯৫%', label: 'Detection Accuracy', labelBn: 'নির্ণয় নির্ভুলতা' },
  { value: '24/7', valueBn: '২৪/৭', label: 'AI Support', labelBn: 'AI সহায়তা' },
];
