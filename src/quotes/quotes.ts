export type QuoteItem = {
  id: string;
  author: string; // English name
  gender: "female" | "male" | "other";
  quote_en: string;
  wikipedia: string;
  tags: string[];
};

export const QUOTES: QuoteItem[] = [
  {
    id: "michael-jordan-01",
    author: "Michael Jordan",
    gender: "male",
    quote_en: "I've failed over and over and over again in my life. And that is why I succeed.",
    wikipedia: "https://en.wikipedia.org/wiki/Michael_Jordan",
    tags: ["sports", "grit"]
  },
  {
    id: "serena-williams-01",
    author: "Serena Williams",
    gender: "female",
    quote_en: "I really think a champion is defined not by their wins but by how they can recover when they fall.",
    wikipedia: "https://en.wikipedia.org/wiki/Serena_Williams",
    tags: ["sports", "resilience"]
  },
  {
    id: "lionel-messi-01",
    author: "Lionel Messi",
    gender: "male",
    quote_en: "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
    wikipedia: "https://en.wikipedia.org/wiki/Lionel_Messi",
    tags: ["sports", "discipline"]
  },
  {
    id: "cristiano-ronaldo-01",
    author: "Cristiano Ronaldo",
    gender: "male",
    quote_en: "Talent without working hard is nothing.",
    wikipedia: "https://en.wikipedia.org/wiki/Cristiano_Ronaldo",
    tags: ["sports", "work-ethic"]
  },
  {
    id: "mia-hamm-01",
    author: "Mia Hamm",
    gender: "female",
    quote_en: "I am building a fire, and every day I train, I add more fuel.",
    wikipedia: "https://en.wikipedia.org/wiki/Mia_Hamm",
    tags: ["sports", "discipline"]
  },
  {
    id: "jackie-robinson-01",
    author: "Jackie Robinson",
    gender: "male",
    quote_en: "A life is not important except in the impact it has on other lives.",
    wikipedia: "https://en.wikipedia.org/wiki/Jackie_Robinson",
    tags: ["sports", "character"]
  },
  {
    id: "simone-biles-01",
    author: "Simone Biles",
    gender: "female",
    quote_en: "I'd rather regret the risks that didn't work out than the chances I didn't take at all.",
    wikipedia: "https://en.wikipedia.org/wiki/Simone_Biles",
    tags: ["sports", "courage"]
  },
  {
    id: "muhammad-ali-01",
    author: "Muhammad Ali",
    gender: "male",
    quote_en: "He who is not courageous enough to take risks will accomplish nothing in life.",
    wikipedia: "https://en.wikipedia.org/wiki/Muhammad_Ali",
    tags: ["sports", "courage"]
  },
  {
    id: "billie-jean-king-01",
    author: "Billie Jean King",
    gender: "female",
    quote_en: "Champions keep playing until they get it right.",
    wikipedia: "https://en.wikipedia.org/wiki/Billie_Jean_King",
    tags: ["sports", "perseverance"]
  },
  {
    id: "pele-01",
    author: "Pelé",
    gender: "male",
    quote_en: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and love of what you are doing.",
    wikipedia: "https://en.wikipedia.org/wiki/Pel%C3%A9",
    tags: ["sports", "work-ethic"]
  },
  {
    id: "sachin-tendulkar-01",
    author: "Sachin Tendulkar",
    gender: "male",
    quote_en: "People throw stones at you and you convert them into milestones.",
    wikipedia: "https://en.wikipedia.org/wiki/Sachin_Tendulkar",
    tags: ["sports", "resilience"]
  },
  {
    id: "usain-bolt-01",
    author: "Usain Bolt",
    gender: "male",
    quote_en: "Dream big, work hard, stay focused, and surround yourself with good people.",
    wikipedia: "https://en.wikipedia.org/wiki/Usain_Bolt",
    tags: ["sports", "discipline"]
  },
  {
    id: "kobe-bryant-01",
    author: "Kobe Bryant",
    gender: "male",
    quote_en: "The moment you give up is the moment you let someone else win.",
    wikipedia: "https://en.wikipedia.org/wiki/Kobe_Bryant",
    tags: ["sports", "grit"]
  },
  {
    id: "naomi-osaka-01",
    author: "Naomi Osaka",
    gender: "female",
    quote_en: "If you don't try, you can't win.",
    wikipedia: "https://en.wikipedia.org/wiki/Naomi_Osaka",
    tags: ["sports", "courage"]
  },
  {
    id: "roger-federer-01",
    author: "Roger Federer",
    gender: "male",
    quote_en: "You have to believe in the long-term plan you have, but you need the short-term goals to motivate and inspire you.",
    wikipedia: "https://en.wikipedia.org/wiki/Roger_Federer",
    tags: ["sports", "goals"]
  },
  {
    id: "rafael-nadal-01",
    author: "Rafael Nadal",
    gender: "male",
    quote_en: "Enduring means accepting. Accepting things as they are and not as you would wish them to be.",
    wikipedia: "https://en.wikipedia.org/wiki/Rafael_Nadal",
    tags: ["sports", "resilience"]
  },
  {
    id: "venus-williams-01",
    author: "Venus Williams",
    gender: "female",
    quote_en: "You have to believe in yourself when no one else does.",
    wikipedia: "https://en.wikipedia.org/wiki/Venus_Williams",
    tags: ["sports", "confidence"]
  },
  {
    id: "alex-morgan-01",
    author: "Alex Morgan",
    gender: "female",
    quote_en: "Dream big, because dreams do happen.",
    wikipedia: "https://en.wikipedia.org/wiki/Alex_Morgan",
    tags: ["sports", "dreams"]
  },
  {
    id: "megan-rapinoe-01",
    author: "Megan Rapinoe",
    gender: "female",
    quote_en: "Be honest about what you believe in, and fight for it.",
    wikipedia: "https://en.wikipedia.org/wiki/Megan_Rapinoe",
    tags: ["sports", "courage"]
  },
  {
    id: "abby-wambach-01",
    author: "Abby Wambach",
    gender: "female",
    quote_en: "Failure is not something to be ashamed of; it is something to be powered by.",
    wikipedia: "https://en.wikipedia.org/wiki/Abby_Wambach",
    tags: ["sports", "resilience"]
  },
  {
    id: "lebron-james-01",
    author: "LeBron James",
    gender: "male",
    quote_en: "You can't be afraid to fail. It's the only way you succeed.",
    wikipedia: "https://en.wikipedia.org/wiki/LeBron_James",
    tags: ["sports", "courage"]
  },
  {
    id: "stephen-curry-01",
    author: "Stephen Curry",
    gender: "male",
    quote_en: "Success is not an accident. Success is actually a choice.",
    wikipedia: "https://en.wikipedia.org/wiki/Stephen_Curry",
    tags: ["sports", "choice"]
  },
  {
    id: "magic-johnson-01",
    author: "Magic Johnson",
    gender: "male",
    quote_en: "All kids need is a little help, a little hope, and somebody who believes in them.",
    wikipedia: "https://en.wikipedia.org/wiki/Magic_Johnson",
    tags: ["sports", "hope"]
  },
  {
    id: "larry-bird-01",
    author: "Larry Bird",
    gender: "male",
    quote_en: "I've got a theory that if you give 100 percent all of the time, somehow things will work out in the end.",
    wikipedia: "https://en.wikipedia.org/wiki/Larry_Bird",
    tags: ["sports", "effort"]
  },
  {
    id: "shaquille-oneal-01",
    author: "Shaquille O'Neal",
    gender: "male",
    quote_en: "Excellence is not a singular act, but a habit. You are what you repeatedly do.",
    wikipedia: "https://en.wikipedia.org/wiki/Shaquille_O%27Neal",
    tags: ["sports", "habits"]
  },
  {
    id: "tom-brady-01",
    author: "Tom Brady",
    gender: "male",
    quote_en: "You have to believe in your process. You have to believe in the things you are doing to help the team win.",
    wikipedia: "https://en.wikipedia.org/wiki/Tom_Brady",
    tags: ["sports", "teamwork"]
  },
  {
    id: "wayne-gretzky-01",
    author: "Wayne Gretzky",
    gender: "male",
    quote_en: "You miss 100 percent of the shots you don't take.",
    wikipedia: "https://en.wikipedia.org/wiki/Wayne_Gretzky",
    tags: ["sports", "courage"]
  },
  {
    id: "michael-phelps-01",
    author: "Michael Phelps",
    gender: "male",
    quote_en: "You can't put a limit on anything. The more you dream, the farther you get.",
    wikipedia: "https://en.wikipedia.org/wiki/Michael_Phelps",
    tags: ["sports", "dreams"]
  },
  {
    id: "lindsey-vonn-01",
    author: "Lindsey Vonn",
    gender: "female",
    quote_en: "It's amazing. Life changes very quickly, in a very positive way, if you let it.",
    wikipedia: "https://en.wikipedia.org/wiki/Lindsey_Vonn",
    tags: ["sports", "mindset"]
  },
  {
    id: "allyson-felix-01",
    author: "Allyson Felix",
    gender: "female",
    quote_en: "My speed is a gift, but my work ethic is what makes it count.",
    wikipedia: "https://en.wikipedia.org/wiki/Allyson_Felix",
    tags: ["sports", "work-ethic"]
  },
  {
    id: "suni-lee-01",
    author: "Suni Lee",
    gender: "female",
    quote_en: "Don't ever give up on your dreams, no matter how hard it gets.",
    wikipedia: "https://en.wikipedia.org/wiki/Suni_Lee",
    tags: ["sports", "dreams"]
  },
  {
    id: "cathy-freeman-01",
    author: "Cathy Freeman",
    gender: "female",
    quote_en: "You got to try and reach for the stars or try and achieve the unreachable.",
    wikipedia: "https://en.wikipedia.org/wiki/Cathy_Freeman",
    tags: ["sports", "ambition"]
  },
  {
    id: "martina-navratilova-01",
    author: "Martina Navratilova",
    gender: "female",
    quote_en: "The moment of victory is much too short to live for that and nothing else.",
    wikipedia: "https://en.wikipedia.org/wiki/Martina_Navratilova",
    tags: ["sports", "purpose"]
  },
  {
    id: "althea-gibson-01",
    author: "Althea Gibson",
    gender: "female",
    quote_en: "No matter what accomplishments you make, somebody helped you.",
    wikipedia: "https://en.wikipedia.org/wiki/Althea_Gibson",
    tags: ["sports", "gratitude"]
  },
  {
    id: "jesse-owens-01",
    author: "Jesse Owens",
    gender: "male",
    quote_en: "We all have dreams. But in order to make dreams come into reality, it takes determination, dedication, self-discipline, and effort.",
    wikipedia: "https://en.wikipedia.org/wiki/Jesse_Owens",
    tags: ["sports", "discipline"]
  },
  {
    id: "wilma-rudolph-01",
    author: "Wilma Rudolph",
    gender: "female",
    quote_en: "Never underestimate the power of dreams and the influence of the human spirit.",
    wikipedia: "https://en.wikipedia.org/wiki/Wilma_Rudolph",
    tags: ["sports", "resilience"]
  },
  {
    id: "danica-patrick-01",
    author: "Danica Patrick",
    gender: "female",
    quote_en: "Take chances, make mistakes. That's how you grow.",
    wikipedia: "https://en.wikipedia.org/wiki/Danica_Patrick",
    tags: ["sports", "growth"]
  },
  {
    id: "eliud-kipchoge-01",
    author: "Eliud Kipchoge",
    gender: "male",
    quote_en: "No human is limited.",
    wikipedia: "https://en.wikipedia.org/wiki/Eliud_Kipchoge",
    tags: ["sports", "mindset"]
  },
  {
    id: "bethany-hamilton-01",
    author: "Bethany Hamilton",
    gender: "female",
    quote_en: "Courage doesn't mean you don't get afraid. Courage means you don't let fear stop you.",
    wikipedia: "https://en.wikipedia.org/wiki/Bethany_Hamilton",
    tags: ["sports", "courage"]
  },
  {
    id: "derek-jeter-01",
    author: "Derek Jeter",
    gender: "male",
    quote_en: "There may be people that have more talent than you, but there's no excuse for anyone to work harder than you do.",
    wikipedia: "https://en.wikipedia.org/wiki/Derek_Jeter",
    tags: ["sports", "work-ethic"]
  },
  {
    id: "ronda-rousey-01",
    author: "Ronda Rousey",
    gender: "female",
    quote_en: "Success is the result of hard work, busting your tail every day for years without cutting corners.",
    wikipedia: "https://en.wikipedia.org/wiki/Ronda_Rousey",
    tags: ["sports", "work-ethic"]
  },
  {
    id: "tony-hawk-01",
    author: "Tony Hawk",
    gender: "male",
    quote_en: "Life is a lot like skateboarding.",
    wikipedia: "https://en.wikipedia.org/wiki/Tony_Hawk",
    tags: ["sports", "learning"]
  },
  {
    id: "abe-lincoln-01",
    author: "Abraham Lincoln",
    gender: "male",
    quote_en: "I walk slowly, but I never walk backward.",
    wikipedia: "https://en.wikipedia.org/wiki/Abraham_Lincoln",
    tags: ["history", "perseverance"]
  },
  {
    id: "marie-curie-01",
    author: "Marie Curie",
    gender: "female",
    quote_en: "Nothing in life is to be feared, it is only to be understood.",
    wikipedia: "https://en.wikipedia.org/wiki/Marie_Curie",
    tags: ["science", "curiosity"]
  },
  {
    id: "albert-einstein-01",
    author: "Albert Einstein",
    gender: "male",
    quote_en: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    wikipedia: "https://en.wikipedia.org/wiki/Albert_Einstein",
    tags: ["science", "mindset"]
  },
  {
    id: "maya-angelou-01",
    author: "Maya Angelou",
    gender: "female",
    quote_en: "You will face many defeats in life, but never let yourself be defeated.",
    wikipedia: "https://en.wikipedia.org/wiki/Maya_Angelou",
    tags: ["literature", "resilience"]
  },
  {
    id: "nelson-mandela-01",
    author: "Nelson Mandela",
    gender: "male",
    quote_en: "It always seems impossible until it's done.",
    wikipedia: "https://en.wikipedia.org/wiki/Nelson_Mandela",
    tags: ["leadership", "grit"]
  },
  {
    id: "helen-keller-01",
    author: "Helen Keller",
    gender: "female",
    quote_en: "Alone we can do so little; together we can do so much.",
    wikipedia: "https://en.wikipedia.org/wiki/Helen_Keller",
    tags: ["leadership", "community"]
  },
  {
    id: "stephen-hawking-01",
    author: "Stephen Hawking",
    gender: "male",
    quote_en: "However difficult life may seem, there is always something you can do and succeed at.",
    wikipedia: "https://en.wikipedia.org/wiki/Stephen_Hawking",
    tags: ["science", "resilience"]
  },
  {
    id: "malala-01",
    author: "Malala Yousafzai",
    gender: "female",
    quote_en: "Let us pick up our books and our pens. They are our most powerful weapons.",
    wikipedia: "https://en.wikipedia.org/wiki/Malala_Yousafzai",
    tags: ["education", "courage"]
  },
  {
    id: "oprah-01",
    author: "Oprah Winfrey",
    gender: "female",
    quote_en: "The biggest adventure you can take is to live the life of your dreams.",
    wikipedia: "https://en.wikipedia.org/wiki/Oprah_Winfrey",
    tags: ["leadership", "mindset"]
  },
  {
    id: "yitzhak-rabin-01",
    author: "Yitzhak Rabin",
    gender: "male",
    quote_en: "You don't make peace with friends. You make it with enemies.",
    wikipedia: "https://en.wikipedia.org/wiki/Yitzhak_Rabin",
    tags: ["leadership", "history"]
  },
  {
    id: "rosa-parks-01",
    author: "Rosa Parks",
    gender: "female",
    quote_en: "I have learned over the years that when one's mind is made up, this diminishes fear.",
    wikipedia: "https://en.wikipedia.org/wiki/Rosa_Parks",
    tags: ["courage", "history"]
  },
  {
    id: "greta-thunberg-01",
    author: "Greta Thunberg",
    gender: "female",
    quote_en: "No one is too small to make a difference.",
    wikipedia: "https://en.wikipedia.org/wiki/Greta_Thunberg",
    tags: ["environment", "leadership"]
  },
  {
    id: "ada-lovelace-01",
    author: "Ada Lovelace",
    gender: "female",
    quote_en: "The more I study, the more insatiable do I feel my genius for it to be.",
    wikipedia: "https://en.wikipedia.org/wiki/Ada_Lovelace",
    tags: ["science", "curiosity"]
  },
  {
    id: "katherine-johnson-01",
    author: "Katherine Johnson",
    gender: "female",
    quote_en: "We will always have STEM with us. Some things will drop out of the public eye and go away, but there will always be science, engineering, and technology.",
    wikipedia: "https://en.wikipedia.org/wiki/Katherine_Johnson",
    tags: ["science", "learning"]
  },
  {
    id: "jane-goodall-01",
    author: "Jane Goodall",
    gender: "female",
    quote_en: "What you do makes a difference, and you have to decide what kind of difference you want to make.",
    wikipedia: "https://en.wikipedia.org/wiki/Jane_Goodall",
    tags: ["science", "purpose"]
  },
  {
    id: "mae-jemison-01",
    author: "Mae Jemison",
    gender: "female",
    quote_en: "Never be limited by other people's limited imaginations.",
    wikipedia: "https://en.wikipedia.org/wiki/Mae_Jemison",
    tags: ["science", "imagination"]
  },
  {
    id: "sally-ride-01",
    author: "Sally Ride",
    gender: "female",
    quote_en: "The stars don't look bigger, but they do look brighter.",
    wikipedia: "https://en.wikipedia.org/wiki/Sally_Ride",
    tags: ["science", "wonder"]
  },
  {
    id: "neil-armstrong-01",
    author: "Neil Armstrong",
    gender: "male",
    quote_en: "That's one small step for a man, one giant leap for mankind.",
    wikipedia: "https://en.wikipedia.org/wiki/Neil_Armstrong",
    tags: ["science", "exploration"]
  },
  {
    id: "yuri-gagarin-01",
    author: "Yuri Gagarin",
    gender: "male",
    quote_en: "I see Earth. It is so beautiful.",
    wikipedia: "https://en.wikipedia.org/wiki/Yuri_Gagarin",
    tags: ["science", "wonder"]
  },
  {
    id: "thomas-edison-01",
    author: "Thomas Edison",
    gender: "male",
    quote_en: "I have not failed. I've just found 10,000 ways that won't work.",
    wikipedia: "https://en.wikipedia.org/wiki/Thomas_Edison",
    tags: ["invention", "resilience"]
  },
  {
    id: "alexander-graham-bell-01",
    author: "Alexander Graham Bell",
    gender: "male",
    quote_en: "Before anything else, preparation is the key to success.",
    wikipedia: "https://en.wikipedia.org/wiki/Alexander_Graham_Bell",
    tags: ["invention", "preparation"]
  },
  {
    id: "steve-jobs-01",
    author: "Steve Jobs",
    gender: "male",
    quote_en: "The only way to do great work is to love what you do.",
    wikipedia: "https://en.wikipedia.org/wiki/Steve_Jobs",
    tags: ["technology", "purpose"]
  },
  {
    id: "bill-gates-01",
    author: "Bill Gates",
    gender: "male",
    quote_en: "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
    wikipedia: "https://en.wikipedia.org/wiki/Bill_Gates",
    tags: ["technology", "learning"]
  },
  {
    id: "elon-musk-01",
    author: "Elon Musk",
    gender: "male",
    quote_en: "When something is important enough, you do it even if the odds are not in your favor.",
    wikipedia: "https://en.wikipedia.org/wiki/Elon_Musk",
    tags: ["technology", "persistence"]
  },
  {
    id: "walt-disney-01",
    author: "Walt Disney",
    gender: "male",
    quote_en: "All our dreams can come true, if we have the courage to pursue them.",
    wikipedia: "https://en.wikipedia.org/wiki/Walt_Disney",
    tags: ["creativity", "courage"]
  },
  {
    id: "george-lucas-01",
    author: "George Lucas",
    gender: "male",
    quote_en: "Dreams are extremely important. You can't do it unless you imagine it.",
    wikipedia: "https://en.wikipedia.org/wiki/George_Lucas",
    tags: ["creativity", "imagination"]
  },
  {
    id: "j-k-rowling-01",
    author: "J. K. Rowling",
    gender: "female",
    quote_en: "It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all.",
    wikipedia: "https://en.wikipedia.org/wiki/J._K._Rowling",
    tags: ["literature", "failure"]
  },
  {
    id: "dr-seuss-01",
    author: "Dr. Seuss",
    gender: "male",
    quote_en: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    wikipedia: "https://en.wikipedia.org/wiki/Dr._Seuss",
    tags: ["literature", "learning"]
  },
  {
    id: "mark-twain-01",
    author: "Mark Twain",
    gender: "male",
    quote_en: "The secret of getting ahead is getting started.",
    wikipedia: "https://en.wikipedia.org/wiki/Mark_Twain",
    tags: ["literature", "action"]
  },
  {
    id: "roald-dahl-01",
    author: "Roald Dahl",
    gender: "male",
    quote_en: "Those who don't believe in magic will never find it.",
    wikipedia: "https://en.wikipedia.org/wiki/Roald_Dahl",
    tags: ["literature", "wonder"]
  },
  {
    id: "anne-frank-01",
    author: "Anne Frank",
    gender: "female",
    quote_en: "How wonderful it is that nobody need wait a single moment before starting to improve the world.",
    wikipedia: "https://en.wikipedia.org/wiki/Anne_Frank",
    tags: ["history", "hope"]
  },
  {
    id: "victor-frankl-01",
    author: "Viktor Frankl",
    gender: "male",
    quote_en: "When we are no longer able to change a situation, we are challenged to change ourselves.",
    wikipedia: "https://en.wikipedia.org/wiki/Viktor_Frankl",
    tags: ["history", "resilience"]
  },
  {
    id: "martin-luther-king-jr-01",
    author: "Martin Luther King Jr.",
    gender: "male",
    quote_en: "Faith is taking the first step even when you don't see the whole staircase.",
    wikipedia: "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.",
    tags: ["leadership", "courage"]
  },
  {
    id: "eleanor-roosevelt-01",
    author: "Eleanor Roosevelt",
    gender: "female",
    quote_en: "You must do the thing you think you cannot do.",
    wikipedia: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt",
    tags: ["leadership", "courage"]
  },
  {
    id: "winston-churchill-01",
    author: "Winston Churchill",
    gender: "male",
    quote_en: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    wikipedia: "https://en.wikipedia.org/wiki/Winston_Churchill",
    tags: ["leadership", "resilience"]
  },
  {
    id: "mahatma-gandhi-01",
    author: "Mahatma Gandhi",
    gender: "male",
    quote_en: "The future depends on what you do today.",
    wikipedia: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
    tags: ["leadership", "action"]
  },
  {
    id: "mother-teresa-01",
    author: "Mother Teresa",
    gender: "female",
    quote_en: "Not all of us can do great things. But we can do small things with great love.",
    wikipedia: "https://en.wikipedia.org/wiki/Mother_Teresa",
    tags: ["service", "kindness"]
  },
  {
    id: "desmond-tutu-01",
    author: "Desmond Tutu",
    gender: "male",
    quote_en: "Do your little bit of good where you are; it's those little bits of good put together that overwhelm the world.",
    wikipedia: "https://en.wikipedia.org/wiki/Desmond_Tutu",
    tags: ["service", "kindness"]
  },
  {
    id: "barack-obama-01",
    author: "Barack Obama",
    gender: "male",
    quote_en: "Change will not come if we wait for some other person or some other time.",
    wikipedia: "https://en.wikipedia.org/wiki/Barack_Obama",
    tags: ["leadership", "action"]
  },
  {
    id: "michelle-obama-01",
    author: "Michelle Obama",
    gender: "female",
    quote_en: "Success isn't about how much money you make; it's about the difference you make in people's lives.",
    wikipedia: "https://en.wikipedia.org/wiki/Michelle_Obama",
    tags: ["leadership", "purpose"]
  },
  {
    id: "ruth-bader-ginsburg-01",
    author: "Ruth Bader Ginsburg",
    gender: "female",
    quote_en: "Fight for the things that you care about, but do it in a way that will lead others to join you.",
    wikipedia: "https://en.wikipedia.org/wiki/Ruth_Bader_Ginsburg",
    tags: ["leadership", "courage"]
  },
  {
    id: "amelia-earhart-01",
    author: "Amelia Earhart",
    gender: "female",
    quote_en: "The most difficult thing is the decision to act; the rest is merely tenacity.",
    wikipedia: "https://en.wikipedia.org/wiki/Amelia_Earhart",
    tags: ["exploration", "courage"]
  },
  {
    id: "frida-kahlo-01",
    author: "Frida Kahlo",
    gender: "female",
    quote_en: "At the end of the day, we can endure much more than we think we can.",
    wikipedia: "https://en.wikipedia.org/wiki/Frida_Kahlo",
    tags: ["art", "resilience"]
  },
  {
    id: "pablo-picasso-01",
    author: "Pablo Picasso",
    gender: "male",
    quote_en: "Every child is an artist. The problem is how to remain an artist once we grow up.",
    wikipedia: "https://en.wikipedia.org/wiki/Pablo_Picasso",
    tags: ["art", "creativity"]
  },
  {
    id: "leonardo-da-vinci-01",
    author: "Leonardo da Vinci",
    gender: "male",
    quote_en: "Learning never exhausts the mind.",
    wikipedia: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci",
    tags: ["art", "learning"]
  },
  {
    id: "vincent-van-gogh-01",
    author: "Vincent van Gogh",
    gender: "male",
    quote_en: "Great things are done by a series of small things brought together.",
    wikipedia: "https://en.wikipedia.org/wiki/Vincent_van_Gogh",
    tags: ["art", "persistence"]
  },
  {
    id: "louis-pasteur-01",
    author: "Louis Pasteur",
    gender: "male",
    quote_en: "Chance favors the prepared mind.",
    wikipedia: "https://en.wikipedia.org/wiki/Louis_Pasteur",
    tags: ["science", "preparation"]
  },
  {
    id: "charles-darwin-01",
    author: "Charles Darwin",
    gender: "male",
    quote_en: "It is not the strongest of the species that survives, but the one most responsive to change.",
    wikipedia: "https://en.wikipedia.org/wiki/Charles_Darwin",
    tags: ["science", "change"]
  },
  {
    id: "richard-feynman-01",
    author: "Richard Feynman",
    gender: "male",
    quote_en: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.",
    wikipedia: "https://en.wikipedia.org/wiki/Richard_Feynman",
    tags: ["science", "curiosity"]
  },
  {
    id: "carl-sagan-01",
    author: "Carl Sagan",
    gender: "male",
    quote_en: "Somewhere, something incredible is waiting to be known.",
    wikipedia: "https://en.wikipedia.org/wiki/Carl_Sagan",
    tags: ["science", "wonder"]
  },
  {
    id: "rachel-carson-01",
    author: "Rachel Carson",
    gender: "female",
    quote_en: "Those who contemplate the beauty of the earth find reserves of strength that will endure as long as life lasts.",
    wikipedia: "https://en.wikipedia.org/wiki/Rachel_Carson",
    tags: ["environment", "wonder"]
  },
  {
    id: "david-attenborough-01",
    author: "David Attenborough",
    gender: "male",
    quote_en: "The natural world is the greatest source of excitement, the greatest source of visual beauty, and the greatest source of intellectual interest.",
    wikipedia: "https://en.wikipedia.org/wiki/David_Attenborough",
    tags: ["environment", "curiosity"]
  },
  {
    id: "temple-grandin-01",
    author: "Temple Grandin",
    gender: "female",
    quote_en: "The world needs all kinds of minds.",
    wikipedia: "https://en.wikipedia.org/wiki/Temple_Grandin",
    tags: ["science", "difference"]
  },
  {
    id: "simon-sinek-01",
    author: "Simon Sinek",
    gender: "male",
    quote_en: "Dream big. Start small. But most of all, start.",
    wikipedia: "https://en.wikipedia.org/wiki/Simon_Sinek",
    tags: ["leadership", "action"]
  },
  {
    id: "angela-duckworth-01",
    author: "Angela Duckworth",
    gender: "female",
    quote_en: "Grit is passion and perseverance for very long-term goals.",
    wikipedia: "https://en.wikipedia.org/wiki/Angela_Duckworth",
    tags: ["learning", "grit"]
  },
  {
    id: "carol-dweck-01",
    author: "Carol Dweck",
    gender: "female",
    quote_en: "Becoming is better than being.",
    wikipedia: "https://en.wikipedia.org/wiki/Carol_Dweck",
    tags: ["learning", "growth-mindset"]
  },
  {
    id: "misty-copeland-01",
    author: "Misty Copeland",
    gender: "female",
    quote_en: "Start unknown, finish unforgettable.",
    wikipedia: "https://en.wikipedia.org/wiki/Misty_Copeland",
    tags: ["art", "persistence"]
  },
  {
    id: "yo-yo-ma-01",
    author: "Yo-Yo Ma",
    gender: "male",
    quote_en: "Passion is one great force that unleashes creativity.",
    wikipedia: "https://en.wikipedia.org/wiki/Yo-Yo_Ma",
    tags: ["music", "creativity"]
  },
  {
    id: "lin-manuel-miranda-01",
    author: "Lin-Manuel Miranda",
    gender: "male",
    quote_en: "You are perfectly cast in your life. I can't imagine anyone but you in the role. Go play.",
    wikipedia: "https://en.wikipedia.org/wiki/Lin-Manuel_Miranda",
    tags: ["art", "confidence"]
  },
  {
    id: "misty-may-treanor-01",
    author: "Misty May-Treanor",
    gender: "female",
    quote_en: "If you want to achieve greatness, stop asking for permission.",
    wikipedia: "https://en.wikipedia.org/wiki/Misty_May-Treanor",
    tags: ["sports", "confidence"]
  },
  {
    id: "apj-abdul-kalam-01",
    author: "A. P. J. Abdul Kalam",
    gender: "male",
    quote_en: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
    wikipedia: "https://en.wikipedia.org/wiki/A._P._J._Abdul_Kalam",
    tags: ["science", "dreams"]
  },
  {
    id: "mary-kom-01",
    author: "Mary Kom",
    gender: "female",
    quote_en: "Don't give up as there is always a next time.",
    wikipedia: "https://en.wikipedia.org/wiki/Mary_Kom",
    tags: ["sports", "resilience"]
  }
];
