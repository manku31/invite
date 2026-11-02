/** Wedding details for Vipul & Priya. All displayed times use India Standard Time. */
const weddingMap =
  "https://maps.app.goo.gl/7ArPgKcF4HhBkJ3M7?utm_source=chatgpt.com";
const pawaMap =
  "https://www.google.com/maps/search/?api=1&query=Pawa%2C+Pali%2C+Rajasthan+306708";

export const weddingConfig = {
  couple: {
    groom: "Vipul",
    bride: "Priya",
    groomFullName: "Vipul Sharma",
    brideFullName: "Priya Sharma",
    introduction: "Two hearts. Two families. One beautiful beginning.",
    note: "With the blessings of Lord Shiva, Shri Krishna, our elders and our families.",
    portrait: "/images/couple.webp",
    portraitAlt:
      "Rajasthani wedding illustration of a couple in rose and ivory beneath a carved palace arch",
    portraitCaption: "From 6 November 2024 to forever, with God's blessings.",
  },
  monogram: "V ♥ P",
  identity: "Vipul ♥ Priya",
  homeLocation: "Pawa, Pali, Rajasthan",
  homeAddress: "Pawa, Pali, Rajasthan – 306708",
  // No ceremony time has been supplied: count down to the start of the wedding day in IST.
  weddingDate: "2026-11-26T00:00:00+05:30",
  weddingEndDate: "2026-11-27T00:00:00+05:30",
  calendarDate: "20261126",
  calendarEndDate: "20261127",
  timeZone: "Asia/Kolkata",
  locale: "en-IN",
  opening: {
    artwork: "/illustrations/embossed-floral-cover.webp",
    eyebrow: "॥ श्री गणेशाय नमः ॥",
    title: "Vipul ♥ Priya",
    dedication: "With love & blessings",
    prompt: "Touch the seal to open",
    buttonLabel: "Open wedding invitation",
    openingMessage: "Your invitation is opening…",
    footer: "Sharma Family Welcomes You",
    revealAfterMs: 1050,
    openAfterMs: 2850,
    guidedScroll: { enabled: true, pauseMs: 3700, durationSeconds: 7 },
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
      butterflies: false,
      birds: false,
      leaves: true,
      breeze: true,
    },
    chapterLabels: [
      "With the blessings of our elders",
      "A journey of love, faith & family",
      "Two families. One beautiful beginning.",
    ],
  },
  hero: {
    blessing: "॥ श्री गणेशाय नमः ॥",
    eyebrow: "With the blessings of our elders and the love of our families,",
    invitation: ["we cordially invite you to celebrate", "the wedding of"],
    illustration: "/illustrations/palace.webp",
    scrollLabel: "Our beautiful beginning",
    sideLabel: "With love & blessings · Vipul ♥ Priya",
  },
  brand: {
    caption: "Sharma Family Welcomes You",
    menuSignOff: "With love & blessings",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#story" },
    { label: "Celebrations", href: "#events" },
    { label: "Venue", href: "#venue" },
    { label: "Memories", href: "#gallery" },
  ],
  sections: {
    couple: {
      eyebrow: "With the blessings of our elders",
      title: "Two hearts, one beautiful beginning",
    },
    family: {
      eyebrow: "Couple & family",
      title: "With the blessings of our elders",
    },
    story: { eyebrow: "Every little moment led to you", title: "Our Story" },
    events: {
      eyebrow: "Four celebrations. A lifetime of memories.",
      title: "Let the celebrations begin",
      description: "With the blessings of our families, we begin our forever.",
    },
    countdown: {
      eyebrow: "26 November 2026",
      title: "Counting Down to Forever",
      description: "The wait for our beautiful beginning has begun.",
      complete: "Our forever has begun",
    },
    venue: {
      eyebrow: "A beautiful place for a beautiful beginning",
      title: "Together in Rajasthan",
      description:
        "With our families beside us and your blessings in our hearts, we invite you to celebrate this special day with us.",
      imageCaption:
        "A miniature-art celebration of Rajasthan’s timeless beauty",
      imageLabel: "Traditions, family & a little magic",
    },
    gallery: {
      eyebrow: "Love, faith & family",
      title: "Moments to Remember",
      description:
        "An illustrated celebration of the places, traditions and blessings we hold close.",
    },
  },
  venue: {
    name: "Pawa",
    address: "Pawa, Pali, Rajasthan – 306708",
    city: "Pawa, Pali, Rajasthan",
    postalCode: "306708",
    ceremonyLocation: "Desuri, Pali, Rajasthan",
    mapUrl: weddingMap,
    image: "/images/celebration.webp",
    imageAlt:
      "Rajasthani miniature-art illustration of a family wedding celebration in a palace courtyard",
    arrivalNote:
      "Morning — Baraat from Pawa. Wedding ceremony in Desuri, Pali, Rajasthan.",
  },
  events: [
    {
      id: "mayra",
      name: "Mayra",
      subtitle: "A Celebration of Love, Family & Blessings",
      date: "2026-11-25T11:00:00+05:30",
      timeLabel: "11:00 AM onwards",
      venue: "Residence",
      location: "Pawa, Pali, Rajasthan",
      description: "",
      icon: "flower",
      tone: "sage",
      mapUrl: pawaMap,
    },
    {
      id: "haldi",
      name: "Haldi",
      subtitle: "A Little Sunshine Before Forever",
      date: "2026-11-25T17:00:00+05:30",
      timeLabel: "5:00 PM onwards",
      venue: "Residence",
      location: "Pawa, Pali, Rajasthan",
      description: "",
      icon: "sun",
      tone: "gold",
      mapUrl: pawaMap,
    },
    {
      id: "bandoli",
      name: "Bandoli",
      subtitle: "Music, Traditions & Family Celebrations",
      date: "2026-11-25T21:00:00+05:30",
      timeLabel: "9:00 PM onwards",
      venue: "Residence",
      location: "Pawa, Pali, Rajasthan",
      description: "",
      icon: "music",
      tone: "rose",
      mapUrl: pawaMap,
    },
    {
      id: "wedding",
      name: "Wedding",
      subtitle: "Seven Vows. One Forever.",
      date: "2026-11-26T00:00:00+05:30",
      timeLabel: "Thursday · Morning — Baraat from Pawa",
      venue: "Wedding Ceremony",
      location: "Desuri, Pali, Rajasthan",
      description: "With the blessings of our families, we begin our forever.",
      icon: "heart",
      tone: "rose",
      mapUrl: weddingMap,
    },
  ],
  story: [
    {
      year: "06 November 2024",
      title: "A Journey Blessed by the Divine",
      description:
        "It all began on 6 November 2024. With the blessings of Mahadev and the grace of the divine, two lives began a beautiful journey toward each other.",
      icon: "mahadev",
      motifLabel: "Mahadev",
    },
    {
      year: "2024–2025",
      title: "A Bond Across the Miles",
      description:
        "Though distance kept us apart, the blessings of Shri Krishna gave us faith, patience and strength. Every conversation brought us closer and every moment made our bond stronger.",
      icon: "krishna",
      motifLabel: "Shri Krishna",
    },
    {
      year: "2025–2026",
      title: "Love, Faith & Family",
      description:
        "Through every step of our journey, the love and blessings of our families remained our greatest strength. With faith in God and love in our hearts, we continued towards a future together.",
      icon: "family",
      motifLabel: "Family & elders",
    },
    {
      year: "26 November 2026",
      title: "Together, With God's Blessings",
      description:
        "With the blessings of Lord Shiva, Shri Krishna, our elders and both our families, the long wait finally comes to an end.\n\nThe distance becomes a memory,\nthe journey becomes a blessing,\nand two families come together as one.",
      icon: "wedding",
      motifLabel: "Mangal Vivah",
    },
  ],
  storySignOff: "From 6 November 2024 to forever, with God's blessings.",
  gallery: [
    {
      src: "/images/couple.webp",
      alt: "Illustrated wedding couple beneath a Rajasthani palace arch",
      caption: "In every lifetime, you",
      shape: "tall",
    },
    {
      src: "/images/mahadev.webp",
      alt: "Mahadev-inspired miniature artwork with a Shiva lingam, trishul and flowers",
      caption: "With Mahadev’s blessings",
      shape: "short",
    },
    {
      src: "/images/hands.webp",
      alt: "Illustration of henna-adorned hands held together",
      caption: "A promise to hold on to",
      shape: "tall",
    },
    {
      src: "/images/haldi.webp",
      alt: "Brass haldi bowl, marigolds and traditional wedding details in a Rajasthani courtyard",
      caption: "A little sunshine before forever",
      shape: "short",
    },
    {
      src: "/images/celebration.webp",
      alt: "Illustrated families welcoming a baraat beside a floral wedding mandap in Rajasthan",
      caption: "Two families come together",
      shape: "tall",
    },
    {
      src: "/images/swans.webp",
      alt: "Two illustrated swans on a lotus-covered lake beside a Rajasthani pavilion",
      caption: "Always, together",
      shape: "short",
    },
  ],
  family: {
    groom: {
      father: "S/o Shri Kaluram Narayanlalji Sharma",
      mother: "& Smt. Vimla Kaluram Sharma",
      community: "Gomtiwal Brahmin",
      location: "Pawa, Pali, Rajasthan",
    },
    bride: {
      father: "D/o Shri Ramlalji Nenmalji Sharma",
      mother: "& Smt. Chanda Ramlalji Sharma",
      community: "Gomtiwal Brahmin",
      location: "Desuri, Pali, Rajasthan",
    },
    blessing:
      "With the blessings of our elders and the love of our families, we cordially invite you to celebrate our wedding.",
    welcome: "Sharma Family Welcomes You",
  },
  contact: {
    title: "For Any Assistance",
    numbers: [
      { display: "+91 99698 10685", href: "tel:+919969810685" },
      { display: "+91 90016 50630", href: "tel:+919001650630" },
    ],
  },
  music: {
    enabled: true,
    src: "/audio/rajasthani-blessings.wav",
    label: "A Little Music",
    title: "Rajasthani Blessings — original shehnai-inspired instrumental",
    volume: 0.2,
  },
  sharing: { url: "" },
  seo: {
    allowIndexing: true,
    description:
      "Join Vipul Sharma & Priya Sharma and the Sharma family for their wedding celebrations on 25–26 November 2026 in Pawa and Desuri, Pali, Rajasthan.",
    titleSuffix: "Wedding Invitation",
    themeColor: "#faf6ed",
    ogImage: "/opengraph-image",
  },
  socialLinks: [] as { label: string; url: string }[],
  closing: {
    lines: ["Two Souls. One Heart.", "One Beautiful Beginning."],
    note: "Thank you for being a part of our journey.",
    signOff: "With love & blessings",
    illustration: "/images/peacock.webp",
    footer: "Sharma Family Welcomes You",
  },
} as const;

export type WeddingEvent = (typeof weddingConfig.events)[number];
export type GalleryImage = (typeof weddingConfig.gallery)[number];
