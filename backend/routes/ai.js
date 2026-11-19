const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.use(protect);

// ─── High-Accuracy Agricultural & Veterinary Knowledge Base ─────
function getDomainExpertResponse(query, lang = 'bn') {
  const q = query.toLowerCase();

  // 1. Cow / Cattle Fever (গরুর জ্বর)
  if (q.includes('fever') || q.includes('জ্বর') || q.includes('hot') || q.includes('গরম') || (q.includes('cow') && q.includes('sick')) || (q.includes('গরু') && q.includes('অসুস্থ'))) {
    if (lang === 'bn') {
      return `🩺 **গরুর জ্বরের প্রাথমিক জরুরি চিকিৎসা ও করণীয়:**

১. **শরীরের তাপমাত্রা মাপুন:**
   • থার্মোমিটার দিয়ে পায়ুপথে তাপমাত্রা পরীক্ষা করুন। গরুর স্বাভাবিক তাপমাত্রা **১০১.৫°F থেকে ১০২.৫°F** (৩৮.৫° - ৩৯.২°C)। তাপমাত্রা **১০৩.৫°F বা তার বেশি** হলে নিশ্চিত জ্বর।

২. **জরুরি প্রাথমিক সেবা:**
   • গরুকে ছায়াযুক্ত, খোলামেলা ও বাতাস চলাচলযুক্ত স্থানে রাখুন।
   • মাথায় ও ঘাড়ে হালকা ঠান্ডা পানি ঢালুন অথবা ভেজা তোয়ালে দিয়ে শরীর মুছে দিন (স্পঞ্জিং)।
   • প্রচুর পরিমাণে পরিষ্কার ঠান্ডা পানি খেতে দিন। স্যালাইন বা গ্লুকোজ পানি দিলে দ্রুত শক্তি ফিরবে।

৩. **খাদ্য ব্যবস্থা:**
   • নরম ও সহজে হজম হয় এমন খাবার দিন—যেমন ভাতের নরম জাউ, নরম কচি কাঁচা ঘাস। শুকনো শক্ত খড় সাময়িক বন্ধ রাখুন।

৪. **ওষুধ ও চিকিৎসা:**
   • প্রাথমিক ব্যথানাশক/জ্বরের জন্য প্যারাসিটামল ভেটেরিনারি ট্যাবলেট (যেমন Napa Vet / Fast Bolus) পশু চিকিৎসকের পরামর্শে ওজন অনুযায়ী দিন।
   • **সতর্কতা:** জ্বর ক্ষুরা রোগ (FMD), অ্যানথ্রাক্স (তরকা) বা বাদলা রোগের লক্ষণ হতে পারে। ২৪ ঘণ্টার মধ্যে তাপমাত্রা স্বাভাবিক না হলে অবিলম্বে স্থানীয় উপজেলা প্রাণিসম্পদ কর্মকর্তার সাথে যোগাযোগ করুন অথবা **১৬১২৩** নম্বরে কল করুন।`;
    } else {
      return `🩺 **Emergency Care & Treatment for Cattle Fever:**

1. **Check Body Temperature:**
   • Normal cattle temperature is **101.5°F - 102.5°F** (38.5°C - 39.2°C). A reading above **103.5°F** indicates significant fever.

2. **Immediate First Aid:**
   • Relocate the animal to a cool, shaded, and well-ventilated shelter.
   • Pour cool water over the forehead and neck, or perform a cold water body sponge.
   • Provide ample fresh, cool drinking water enriched with oral rehydration salts (ORS/electrolytes).

3. **Feeding Care:**
   • Feed easily digestible, soft diet such as warm rice gruel, green tender fodder, and wheat bran mash. Avoid dry, fibrous straw.

4. **Medication & Veterinary Protocol:**
   • A veterinary paracetamol/analgesic bolus (e.g., Fast Vet / Napa Vet Bolus) may be administered per body weight guidelines under veterinary advice.
   • **Important:** High fever can indicate FMD, Tick-borne fever, or Pneumonia. If fever persists past 24 hours, contact your Upazila Livestock Officer immediately or dial **16123**.`;
    }
  }

  // 2. Rice Leaf Spots / Blast (ধানের রোগ / ব্লাস্ট / পাতায় দাগ)
  if (q.includes('rice') || q.includes('ধান') || q.includes('blast') || q.includes('ব্লাস্ট') || q.includes('spot') || q.includes('দাগ')) {
    if (lang === 'bn') {
      return `🌾 **ধানের পাতার দাগ ও ব্লাস্ট রোগের সমাধান:**

১. **রোগ শনাক্তকরণ:**
   • **ব্লাস্ট রোগ:** পাতায় চোখের মতো বা হীরক আকৃতির দাগ, মাঝে ছাইরঙা ও কিনারা বাদামি।
   • **বাদামি দাগ রোগ (Brown Spot):** পাতায় ছোট ছোট গোল বা ডিম্বাকার বাদামি দাগ।

২. **প্রতিকার ও স্প্রে ব্যবস্থা:**
   • ব্লাস্ট রোগের জন্য **ট্রাইসাইক্লাজল ৭৫ ডব্লিউপি** (যেমন ট্রুপার / দিফা) প্রতি লিটার পানিতে ০.৭৫ গ্রাম মিশিয়ে বিকেলের দিকে স্প্রে করুন।
   • বাদামি দাগের জন্য **ম্যানকোজেব** (যেমন ডাইথেন এম-৪৫) প্রতি লিটার পানিতে ২ গ্রাম হারে স্প্রে করুন।

৩. **ব্যবস্থাপনা:**
   • জমিতে পর্যাপ্ত পানি ধরে রাখুন, জমি শুকাতে দেবেন না।
   • ইউরিয়া সারের অতিরিক্ত প্রয়োগ বন্ধ রেখে প্রতি শতকে ৩০০-৪০০ গ্রাম পটাশ (MOP) উপরিপ্রয়োগ করুন।`;
    } else {
      return `🌾 **Rice Blast & Leaf Spot Disease Management:**

1. **Diagnosis:**
   • **Rice Blast:** Spindle/diamond-shaped lesions with grayish-white centers and brownish borders.
   • **Brown Spot:** Circular or oval dark brown spots scattered on leaf blades.

2. **Fungicide Application:**
   • For Blast: Spray **Tricyclazole 75 WP** (Trooper) @ 0.75g per liter of water during late afternoon.
   • For Brown Spot: Spray **Mancozeb** (Dithane M-45) @ 2g per liter of water.

3. **Field Management:**
   • Maintain 2-3 inches of standing water; do not allow field to dry out.
   • Suspend top-dressing of nitrogen (urea) and apply supplemental MOP (potash) to strengthen plant immunity.`;
    }
  }

  // 3. Fertilizer Calculation (সারের পরিমাণ ও ব্যবহার)
  if (q.includes('fertilizer') || q.includes('সার') || q.includes('urea') || q.includes('ইউরিয়া') || q.includes('tsp') || q.includes('টিএসপি') || q.includes('mop') || q.includes('পটাশ')) {
    if (lang === 'bn') {
      return `🌱 **ফসলভিত্তিক সুষম সার প্রয়োগের সঠিক মাত্রা (প্রতি শতকে):**

১. **বোরো ধান (প্রতি শতকে):**
   • ইউরিয়া: ১.১ - ১.২ কেজি (৩ কিস্তিতে: চারা রোপণের ১৫ দিন, ৩০ দিন ও কাইচথোড় আসার ৫ দিন আগে)।
   • টিএসপি / ডিএপি: ৪০০ - ৪৫০ গ্রাম (জমি তৈরির শেষ চাষে)।
   • এমওপি (পটাশ): ৫০০ - ৬০০ গ্রাম (অর্ধেক শেষ চাষে, বাকি অর্ধেক দ্বিতীয় কিস্তিতে)।
   • জিপসাম: ৪০০ গ্রাম এবং জিংক সালফেট: ৪০ গ্রাম (জমি তৈরিতে)।

২. **আলু ও শাকসবজি:**
   • জৈব সার/গোবর: ১৫-২০ কেজি প্রতি শতকে।
   • সুষম রাসায়নিক সার প্রয়োগের আগে মাটির আর্দ্রতা পরীক্ষা করে নিন।`;
    } else {
      return `🌱 **Recommended Fertilizer Dosage (Per Decimal / 40 sq meters):**

1. **Boro Rice Crop:**
   • **Urea:** 1.1 - 1.2 kg (split into 3 doses: 15 days, 30 days, and panicle initiation).
   • **TSP / DAP:** 400 - 450 grams (during final land preparation).
   • **MOP (Potash):** 500 - 600 grams (half at basal, half at 2nd top dressing).
   • **Gypsum:** 400 grams and Zinc Sulfate: 40 grams basal.

2. **Vegetables & Potatoes:**
   • Well-rotted cow dung / compost: 15-20 kg per decimal.
   • Always apply fertilizers when soil has adequate moisture.`;
    }
  }

  // 4. Mastitis / Udder Swelling (গরুর ওলান ফোলা)
  if (q.includes('mastitis') || q.includes('ওলান') || q.includes('স্তন') || q.includes('দুধ') || q.includes('milk')) {
    if (lang === 'bn') {
      return `🥛 **গরুর ওলান ফোলা (ম্যাসটাইটিস) রোগের জরুরি চিকিৎসা:**

১. **প্রাথমিক পদক্ষেপ:**
   • আক্রান্ত বাঁটের দূষিত দুধ প্রতি ২-৩ ঘণ্টা পর পর দোহন করে মাটিতে নিরাপদ স্থানে পুঁতে ফেলুন।
   • ফোলা ও জ্বালাপোড়া কমাতে বরফ বা ঠান্ডা পানির সেঁক দিন।

২. **চিকিৎসা:**
   • চিকিৎসকের পরামর্শে আক্রান্ত বাঁটে ইন্ট্রা-ম্যামারি অ্যান্টিবায়োটিক টিউব প্রয়োগ করুন।
   • ব্যথা কমানোর জন্য মেগ্লুমিন বা মেলোক্সিকাম ভেট ইনজেকশন দিতে হতে পারে।

৩. **পরিচ্ছন্নতা:**
   • মেঝে পরিষ্কার ও সম্পূর্ণ শুকনো রাখুন। দোহনের পর পভিসেপ বা ক্লোরহেক্সিডিন দ্রবণ দিয়ে বাঁট ডিপিং করুন।`;
    } else {
      return `🥛 **Bovine Mastitis (Udder Swelling) Emergency Care:**

1. **Immediate Actions:**
   • Frequently strip out the infected milk every 2-3 hours to relieve intramammary pressure.
   • Apply cold compresses to the swollen quarter during the acute stage to reduce heat and inflammation.

2. **Veterinary Treatment:**
   • Administer an intramammary antibiotic infusion tube prescribed by your local vet.
   • Anti-inflammatory injection (e.g. Meloxicam) may be required for severe swelling.

3. **Prevention:**
   • Disinfect teats with post-milking teat dip (iodine solution) and ensure dry, hygienic bedding.`;
    }
  }

  // 5. Pest / Insect Attack (পোকা দমন)
  if (q.includes('pest') || q.includes('insect') || q.includes('পোকা') || q.includes('মাজরা') || q.includes('লেদা') || q.includes('মাছি')) {
    if (lang === 'bn') {
      return `🐛 **ফসল সুরক্ষায় সমন্বিত বালাই ব্যবস্থাপনা (IPM):**

১. **ধানের মাজরা পোকা ও পাতা মোড়ানো পোকা:**
   • জমিতে ডালপালা পুঁতে পার্চিং (পাখি বসার ব্যবস্থা) করুন।
   • আলোর ফাঁদ ও সেক্স ফেরোমোন ফাঁদ ব্যবহার করুন।
   • আক্রমণ তীব্র হলে কার্বোফুরান (যেমন ফুরাডান ৫জি) অথবা কারটাপ (সানটাপ ৫০ এসপি) ১ গ্রাম/লিটার স্প্রে করুন।

২. **সবজির মাছি ও চোষক পোকা:**
   • হলুদ আঠালো ফাঁদ ব্যবহার করুন।
   • নিম তেলের স্প্রে (প্রতি লিটারে ৫ মিলি ও সামান্য ডিটারজেন্ট মিশিয়ে) স্প্রে করুন।`;
    } else {
      return `🐛 **Integrated Pest Management (IPM) Guide:**

1. **Stem Borer & Leaf Roller:**
   • Implement perching (placing bamboo branches in the paddy field for predatory birds).
   • Use light traps and pheromone traps at night.
   • For severe infestation, apply Cartap hydrochloride (Suntap 50 SP) @ 1g/L water.

2. **Sucking Insects & Fruit Flies:**
   • Set up yellow sticky traps across vegetable beds.
   • Spray natural neem seed kernel oil extract (5ml/L with mild soap emulsifier).`;
    }
  }

  // 6. Goat / Poultry health (ছাগল ও হাঁস-মুরগি)
  if (q.includes('goat') || q.includes('ছাগল') || q.includes('chicken') || q.includes('মুরগি') || q.includes('duck') || q.includes('হাঁস') || q.includes('ppr')) {
    if (lang === 'bn') {
      return `🐐 **ছাগল ও হাঁস-মুরগির স্বাস্থ্য ও রোগ প্রতিরোধ:**

১. **ছাগলের পিপিআর ও ঠান্ডা লাগা:**
   • ছাগলকে শুকনো ও মাচায় রাখুন, স্যাঁতসেঁতে মাটিতে রাখবেন না।
   • বাৎসরিক পিপিআর (PPR) টিকা নিশ্চিত করুন। পাতলা পায়খানা হলে স্যালাইন ও সালফা ড্রাগ দিন।

২. **হাঁস-মুরগির যত্ন:**
   • রানীক্ষেত (RDV) ও গামবোরো ভ্যাকসিন সময়মতো দিন।
   • পানিতে মাল্টিভিটামিন ও ইলেকট্রোলাইট মিশিয়ে রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করুন।`;
    } else {
      return `🐐 **Livestock & Poultry Health Care:**

1. **Goat Health & PPR Protection:**
   • House goats on elevated wooden/bamboo slats away from damp ground.
   • Administer annual PPR vaccine. Provide electrolytes and veterinary gut protectants for diarrhea.

2. **Poultry Care:**
   • Strictly follow Newcastle (Ranikhet) and Gumboro vaccination schedules.
   • Supplement drinking water with Vitamins A, D3, E, and minerals to maintain egg production.`;
    }
  }

  // Default contextual response
  if (lang === 'bn') {
    return `🌾 **কিষাণঘর কৃষি ও প্রাণিসম্পদ সহায়ক:**

আপনার প্রশ্নের প্রেক্ষিতে প্রাথমিক পরামর্শ:
১. **ফসল বিষয়ক হলে:** আক্রান্ত পাতার স্পষ্ট ছবি তুলে আমাদের **ফসলের রোগ নির্ণয় (Crop Detection)** ফিচারে দিন; AI তাৎক্ষণিক রোগ শনাক্ত করে চিকিৎসা জানিয়ে দেবে।
২. **পশু বিষয়ক হলে:** লক্ষণ, বয়স ও শরীরের তাপমাত্রা পর্যবেক্ষণ করুন এবং স্যালাইন/বিশুদ্ধ পানি সরবরাহ নিশ্চিত করুন।
৩. সরকারি সরাসরি কৃষি ও প্রাণিসম্পদ জরুরি সেবার জন্য যেকোনো মোবাইল থেকে টোল-ফ্রি **১৬১২৩** নম্বরে কল করতে পারেন।

*নির্দিষ্ট কোনো ফসল বা গবাদিপশু সম্পর্কে আরও জানতে নিচে প্রশ্নটি লিখুন।*`;
  } else {
    return `🌾 **KishanGhar Agricultural & Livestock Assistant:**

Expert guidance for your farming query:
1. **For Crops:** Take a close-up photo of the infected leaf and upload it to our **Crop Disease Detection** feature for instant diagnosis and chemical prescriptions.
2. **For Livestock:** Monitor body temperature, hydration, and feed intake. Provide fresh water with electrolytes.
3. For government-backed 24/7 agriculture support in Bangladesh, dial toll-free **16123** from any operator.

*Please feel free to ask specifically about your crop, disease symptoms, or fertilizer guidelines!*`;
  }
}

// ─── POST /api/ai/chat ─────────────────────────────────────────
router.post('/chat', async (req, res) => {
  const { message, language = 'bn' } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  const geminiKey = process.env.GEMINI_API_KEY;

  // Try live Gemini API if key is available and starts with standard AIzaSy
  if (geminiKey && geminiKey.startsWith('AIzaSy')) {
    try {
      const systemInstruction = `You are "KishanGhar AI Assistant", an expert agricultural and veterinary scientist in Bangladesh.
Provide practical, direct, medically sound answers in ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}.
Address the exact question asked (e.g. if asked about cow fever, talk specifically about cow fever, normal temperature 101.5-102.5F, cold water sponge, paracetamol, etc.).`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: systemInstruction },
                  { text: `Farmer question: ${message}` },
                ],
              },
            ],
          }),
        }
      );

      const json = await response.json();
      const botReply = json.candidates?.[0]?.content?.parts?.[0]?.text;

      if (botReply) {
        return res.json({ success: true, reply: botReply.trim() });
      }
    } catch (err) {
      console.warn('Gemini live call error, using domain expert system:', err.message);
    }
  }

  // Use the intelligent, precise agricultural & veterinary domain engine
  const reply = getDomainExpertResponse(message, language);
  return res.json({ success: true, reply });
});

module.exports = router;
