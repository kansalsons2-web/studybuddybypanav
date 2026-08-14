export type Quote = { text: string; author: string; tag: QuoteTag };
export type QuoteTag = "Grit" | "Focus" | "Discipline" | "Belief" | "Comeback" | "Legends";

export const OWNER_NAME = "Panav Kansal";

export const QUOTES: Quote[] = [
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier", tag: "Discipline" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", tag: "Belief" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln", tag: "Discipline" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", tag: "Grit" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes", tag: "Belief" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke", tag: "Grit" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar", tag: "Focus" },
  { text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.", author: "A. P. J. Abdul Kalam", tag: "Legends" },
  { text: "If you want to shine like a sun, first burn like a sun.", author: "A. P. J. Abdul Kalam", tag: "Grit" },
  { text: "Excellence is a continuous process and not an accident.", author: "A. P. J. Abdul Kalam", tag: "Discipline" },
  { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda", tag: "Legends" },
  { text: "Take up one idea. Make that one idea your life. This is the way to success.", author: "Swami Vivekananda", tag: "Focus" },
  { text: "Amateurs sit and wait for inspiration; the rest of us just get up and go to work.", author: "Stephen King", tag: "Discipline" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Arnold Schwarzenegger", tag: "Grit" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", tag: "Comeback" },
  { text: "Your only limit is the one you set yourself.", author: "Unknown", tag: "Belief" },
  { text: "Motivation gets you started. Habit keeps you going.", author: "Jim Ryun", tag: "Discipline" },
  { text: "There is no substitute for hard work.", author: "Thomas Edison", tag: "Grit" },
  { text: "Study while others are sleeping; work while others are loafing.", author: "William A. Ward", tag: "Discipline" },
  { text: "Little by little, one travels far.", author: "J. R. R. Tolkien", tag: "Focus" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson", tag: "Grit" },
  { text: "Do not pray for an easy life; pray for the strength to endure a difficult one.", author: "Bruce Lee", tag: "Grit" },
  { text: "I fear not the man who practiced 10,000 kicks once, but the man who practiced one kick 10,000 times.", author: "Bruce Lee", tag: "Focus" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin", tag: "Grit" },
  { text: "Nothing will work unless you do.", author: "Maya Angelou", tag: "Discipline" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", tag: "Focus" },
  { text: "Perseverance is not a long race; it is many short races one after another.", author: "Walter Elliot", tag: "Grit" },
  { text: "Failure is the opportunity to begin again, more intelligently.", author: "Henry Ford", tag: "Comeback" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", tag: "Belief" },
  { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius", tag: "Comeback" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", tag: "Focus" },
  { text: "Champions keep playing until they get it right.", author: "Billie Jean King", tag: "Comeback" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", tag: "Belief" },
  { text: "I've failed over and over again in my life. And that is why I succeed.", author: "Michael Jordan", tag: "Comeback" },
  { text: "Some people want it to happen, some wish it would happen, others make it happen.", author: "Michael Jordan", tag: "Grit" },
  { text: "The harder the battle, the sweeter the victory.", author: "Les Brown", tag: "Grit" },
  { text: "Shoot for the moon. Even if you miss, you'll land among the stars.", author: "Les Brown", tag: "Belief" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali", tag: "Focus" },
  { text: "I hated every minute of training, but I said: suffer now and live the rest of your life as a champion.", author: "Muhammad Ali", tag: "Grit" },
  { text: "Great things never came from comfort zones.", author: "Unknown", tag: "Grit" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb", tag: "Focus" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle", tag: "Discipline" },
  { text: "We are what we repeatedly do.", author: "Will Durant", tag: "Discipline" },
  { text: "Concentrate all your thoughts upon the work at hand.", author: "Alexander Graham Bell", tag: "Focus" },
  { text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison", tag: "Grit" },
  { text: "You can't cross the sea merely by standing and staring at the water.", author: "Rabindranath Tagore", tag: "Belief" },
  { text: "Setting goals is the first step in turning the invisible into the visible.", author: "Tony Robbins", tag: "Focus" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", tag: "Belief" },
  { text: "Nothing in the world can take the place of persistence.", author: "Calvin Coolidge", tag: "Grit" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi", tag: "Discipline" },
  { text: "Strength does not come from winning. Your struggles develop your strengths.", author: "Arnold Schwarzenegger", tag: "Comeback" },
  { text: "A river cuts through rock not because of its power, but its persistence.", author: "James N. Watkins", tag: "Grit" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown", tag: "Discipline" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "George Lorimer", tag: "Discipline" },
  { text: "Winners are not people who never fail, but people who never quit.", author: "Unknown", tag: "Comeback" },
  { text: "Rank is earned in the hours nobody sees.", author: "Unknown", tag: "Grit" },
  { text: "One chapter a day keeps the panic away.", author: "Unknown", tag: "Focus" },
  { text: "Revision is where marks are made, not where time is wasted.", author: "Unknown", tag: "Focus" },
  { text: "Consistency is more powerful than intensity.", author: "Unknown", tag: "Discipline" },
  { text: "The mind is everything. What you think you become.", author: "Buddha", tag: "Belief" },
];

export const QUOTE_TAGS: QuoteTag[] = ["Grit", "Focus", "Discipline", "Belief", "Comeback", "Legends"];

/** Deterministic quote of the day so it stays stable across renders/reloads. */
export function quoteOfTheDay(date = new Date()): Quote {
  const seed = Number(
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(
      date.getDate(),
    ).padStart(2, "0")}`,
  );
  return QUOTES[seed % QUOTES.length]!;
}

export function randomQuote(exclude?: string): Quote {
  const pool = exclude ? QUOTES.filter((q) => q.text !== exclude) : QUOTES;
  return pool[Math.floor(Math.random() * pool.length)]!;
}
