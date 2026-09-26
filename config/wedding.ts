/** Replace these demonstration details before sharing your invitation. */
export const weddingConfig = {
  couple: {
    bride: "Aarya",
    groom: "Deepal",
    brideFullName: "Aarya Sharma",
    groomFullName: "Deepal Mehta",
    introduction: "Two hearts, two families, one beautiful beginning.",
    note: "Some stories are written in the stars. Ours began with a little serendipity, grew with a thousand small moments, and led us here — to a lifetime of choosing each other.",
    portrait: "/images/couple.webp",
    portraitAlt:
      "Illustrated couple in rose and ivory wedding attire beneath a carved palace arch",
    portraitCaption: "A little serendipity. A lot of love.",
  },
  weddingDate: "2026-12-12T17:00:00+05:30",
  weddingEndDate: "2026-12-13T00:00:00+05:30",
  timeZone: "Asia/Kolkata",
  locale: "en-IN",
  opening: {
    artwork: "/illustrations/embossed-floral-cover.webp",
    eyebrow: "A celebration of love",
    title: "You’re invited",
    dedication: "A little invitation. A lifetime of love.",
    prompt: "Touch the seal to open",
    buttonLabel: "Open wedding invitation",
    openingMessage: "Your invitation is opening…",
    footer: "An invitation, sealed with love",
    revealAfterMs: 1050,
    openAfterMs: 2850,
    /** A short, interruptible drift into the first section after the names reveal. */
    guidedScroll: { enabled: true, pauseMs: 2700, durationSeconds: 7 },
  },
  experience: {
    motionLabels: {
      pause: "Pause motion",
      resume: "Resume motion",
      reduced: "Motion reduced",
    },
    smoothWheel: true,
    nature: {
      enabled: true,
      butterflies: true,
      birds: true,
      leaves: true,
      breeze: true,
    },
    chapterLabels: [
      "An invitation to forever",
      "Two hearts, one beginning",
      "A little love, a little celebration",
    ],
  },
  hero: {
    blessing: "॥ श्री गणेशाय नमः ॥",
    eyebrow: "With great joy",
    invitation: ["We invite you to celebrate", "the wedding of"],
    illustration: "/illustrations/palace.webp",
    scrollLabel: "A beautiful story awaits",
    sideLabel: "Together is a beautiful place to be",
  },
  brand: { caption: "A celebration of love", menuSignOff: "With love, always" },
  navigation: [
    { label: "Our story", href: "#story" },
    { label: "Celebrations", href: "#events" },
    { label: "The venue", href: "#venue" },
    { label: "Memories", href: "#gallery" },
  ],
  sections: {
    couple: {
      eyebrow: "Written in the stars",
      title: "A love, a lifetime in the making",
    },
    family: {
      eyebrow: "With love & blessings",
      title: "Together with our families",
    },
    story: { eyebrow: "Every little moment led to you", title: "Our story" },
    events: {
      eyebrow: "Five occasions. A thousand memories.",
      title: "Let the celebrations begin",
      description:
        "Come for the wedding. Stay for the laughter, the dancing, and the moments we’ll cherish forever.",
    },
    countdown: {
      eyebrow: "Every moment brings us closer",
      title: "Counting down to forever",
      complete: "Our forever has begun",
    },
    venue: {
      eyebrow: "A place as special as the promise",
      title: "Meet us in the City of Lakes",
      description:
        "Where the lake catches the golden light and every arch holds a little history. A beautiful setting for our next chapter.",
      imageCaption: "An illustrated glimpse of our palace-inspired celebration",
      imageLabel: "A little royal. A little magical.",
    },
    gallery: {
      eyebrow: "Little moments, endless love",
      title: "A glimpse of our world",
      description: "The people, the places, and the feeling of being home.",
    },
  },
  venue: {
    name: "The Leela Palace",
    address: "Lake Pichola, PO Box No. 125",
    city: "Udaipur, Rajasthan",
    postalCode: "313001",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Leela+Palace+Udaipur",
    image: "/images/lake-palace.webp",
    imageAlt:
      "Romantic illustration of a Rajasthani palace overlooking a tranquil lake",
    arrivalNote:
      "Please arrive by 4:30 PM for a warm welcome before the ceremony.",
  },
  events: [
    {
      id: "mehendi",
      name: "Mehendi",
      subtitle: "A little colour, a lot of love",
      date: "2026-12-10T15:00:00+05:30",
      venue: "The Garden Courtyard",
      description:
        "Henna on our hands, happiness in our hearts. An afternoon of music, stories, and sweet beginnings.",
      dressCode: "Florals & shades of green",
      icon: "flower",
      tone: "sage",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=The+Leela+Palace+Udaipur",
    },
    {
      id: "haldi",
      name: "Haldi",
      subtitle: "A little sunshine before forever",
      date: "2026-12-11T10:00:00+05:30",
      venue: "The Lotus Terrace",
      description:
        "A joyful morning of golden blessings, playful traditions, and a little turmeric-tinted mischief.",
      dressCode: "Sunshine yellows & ivory",
      icon: "sun",
      tone: "gold",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=The+Leela+Palace+Udaipur",
    },
    {
      id: "sangeet",
      name: "Sangeet",
      subtitle: "An evening to dance into",
      date: "2026-12-11T19:00:00+05:30",
      venue: "The Royal Ballroom",
      description:
        "Bring your best moves and your loudest cheers. Tonight, two families become one dance floor.",
      dressCode: "Festive Indian elegance",
      icon: "music",
      tone: "rose",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=The+Leela+Palace+Udaipur",
    },
    {
      id: "wedding",
      name: "The Wedding",
      subtitle: "Seven promises. One forever.",
      date: "2026-12-12T17:00:00+05:30",
      venue: "The Lakeside Mandap",
      description:
        "Under an open sky, surrounded by our favourite people, we begin our forever. Your blessings mean the world.",
      dressCode: "Traditional Indian attire",
      icon: "heart",
      tone: "rose",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=The+Leela+Palace+Udaipur",
    },
    {
      id: "reception",
      name: "Reception",
      subtitle: "The first evening of forever",
      date: "2026-12-12T20:00:00+05:30",
      venue: "The Palace Gardens",
      description:
        "Raise a glass, share a story, and join us for dinner beneath the stars. There’s so much to celebrate.",
      dressCode: "Evening finery",
      icon: "sparkles",
      tone: "sage",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=The+Leela+Palace+Udaipur",
    },
  ],
  story: [
    {
      year: "2019",
      title: "An unexpected hello",
      description:
        "A mutual friend, a chance meeting, and a conversation neither of us wanted to end.",
      icon: "flower",
    },
    {
      year: "2021",
      title: "Our favourite kind of ordinary",
      description:
        "Coffee dates became long walks. A beautiful friendship quietly became something more.",
      icon: "coffee",
    },
    {
      year: "2024",
      title: "The easiest yes",
      description:
        "One question, happy tears, and the beginning of a promise we had already made in our hearts.",
      icon: "heart",
    },
    {
      year: "2026",
      title: "And so, our forever begins",
      description:
        "With our families beside us and you in our celebration, we’re ready for our greatest adventure.",
      icon: "sparkles",
    },
  ],
  gallery: [
    {
      src: "/images/couple.webp",
      alt: "Illustrated couple sharing a quiet moment beneath a palace arch",
      caption: "In every lifetime, you",
      shape: "tall",
    },
    {
      src: "/images/hands.webp",
      alt: "Illustration of henna-adorned hands held together",
      caption: "A promise to hold on to",
      shape: "short",
    },
    {
      src: "/images/lake-palace.webp",
      alt: "Illustrated lakeside palace in the golden evening light",
      caption: "Where our next chapter begins",
      shape: "short",
    },
    {
      src: "/images/swans.webp",
      alt: "Two illustrated swans together on a lotus-covered lake",
      caption: "Always, together",
      shape: "tall",
    },
  ],
  family: {
    bride: {
      label: "The Sharma family",
      names: "Mrs. Sunita & Mr. Rajesh Sharma",
      relation: "With love, for their daughter",
    },
    groom: {
      label: "The Mehta family",
      names: "Mrs. Kavita & Mr. Vikram Mehta",
      relation: "With love, for their son",
    },
    blessing:
      "With the blessings of our elders and the love of our families, we invite you to witness the beginning of our forever.",
  },
  music: {
    enabled: true,
    src: "/audio/garden-waltz.wav",
    label: "A little music",
    title: "Garden Waltz — original ambient chimes",
    volume: 0.28,
  },
  sharing: {
    /** Set NEXT_PUBLIC_SITE_URL in production, or enter the published URL here. */
    url: "",
  },
  seo: {
    allowIndexing: true,
    description:
      "With great joy, we invite you to celebrate our wedding. Join us for a beautiful beginning in Udaipur.",
    titleSuffix: "Wedding Invitation",
    themeColor: "#faf6ed",
    ogImage: "/opengraph-image",
  },
  socialLinks: [] as { label: string; url: string }[],
  closing: {
    lines: ["Two souls. One heart.", "One beautiful beginning."],
    note: "Thank you for being a part of our journey.",
    signOff: "With all our love",
    illustration: "/images/swans.webp",
    footer: "Made with love, for the people we love.",
    hashtag: "#AaryaFoundHerDeepal",
  },
} as const;

export type WeddingEvent = (typeof weddingConfig.events)[number];
export type GalleryImage = (typeof weddingConfig.gallery)[number];
