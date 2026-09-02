export type Weather = "outside" | "rainy" | "either";
export type KitStatus = "open" | "next";

export type Kit = {
  id: string;
  name: string;
  weather: Weather;
  weatherLabel: string;
  hours: string;
  line: string;
  saturday: string;
  need: string[];
  kid: string;
  parent: string;
  done: string;
  href?: string;
  status: KitStatus;
};

export const KITS: Kit[] = [
  {
    id: "stand",
    name: "My Stand",
    weather: "outside",
    weatherLabel: "Outside Saturday",
    hours: "A warm afternoon",
    line: "The lemonade table. Cups, a poster, a pitcher.",
    saturday:
      "Set a table at the end of the drive. Mix a pitcher. Tape the sign to a stake. Ring up cups. Mom or Dad can walk the file to the shop down the street if you want a real yard poster.",
    need: ["A table or a box", "A pitcher and cups", "Lemons or a mix", "Marker and paper", "A chair"],
    kid: "Names the stand, makes the logo, draws the poster, pours, and taps each cup.",
    parent: "The knife, the hot water, the email if the poster goes to a printer.",
    done: "The pitcher is empty or the sun is gone.",
    href: "/stand",
    status: "open",
  },
  {
    id: "camp",
    name: "Living Room Camp",
    weather: "rainy",
    weatherLabel: "Rainy day",
    hours: "After lunch until lights out",
    line: "Pillows, a trail through the house, lights out.",
    saturday:
      "Build a camp in the living room. Pack a bag from what is already in the house. Walk a four-stop trail. Write what you heard. Lights out is the end of the day, even if it is still afternoon.",
    need: ["Pillows and blankets", "A flashlight or phone light", "Water and a snack", "A book", "One stuffed friend"],
    kid: "Packs the bag, walks the trail, writes the log, calls lights out.",
    parent: "Moves the breakable stuff. Stays nearby. Does not turn it into a themed party.",
    done: "Lights out is checked. The fort can stay up until morning.",
    href: "/camp",
    status: "open",
  },
  {
    id: "kitchen",
    name: "Saturday Kitchen",
    weather: "either",
    weatherLabel: "Any day",
    hours: "One meal",
    line: "The kid runs dinner. A grown-up has the knife.",
    saturday:
      "Pick one meal. The kid writes the menu card, sets the table, and plates it. Nobody orders from a phone. Reservations are the chairs you already have.",
    need: ["What is in the fridge", "A pot or a pan", "Paper for the menu", "Plates", "A grown-up on the knife"],
    kid: "Picks the meal, writes the card, sets seats, serves.",
    parent: "Heat and sharp things. Taste if they ask.",
    done: "Dishes in the sink. Someone said thank you.",
    status: "next",
  },
  {
    id: "wash",
    name: "Driveway Wash",
    weather: "outside",
    weatherLabel: "Outside Saturday",
    hours: "Late morning",
    line: "Hose, buckets, tickets. Cars, bikes, or the dog.",
    saturday:
      "A wash stand in the drive. Price a car, a bike, and a pair of shoes. Tickets on index cards. The dog is optional and the dog decides.",
    need: ["A hose or two buckets", "Soap that is allowed on the drive", "Rags", "Index cards", "A chair"],
    kid: "Makes the prices, takes the tickets, does the washing they can reach.",
    parent: "The hose at the tap. Cars in park. No climbing on wet hoods.",
    done: "The buckets are empty and the drive is not a pond.",
    status: "next",
  },
  {
    id: "yardsale",
    name: "Yard Sale",
    weather: "outside",
    weatherLabel: "Outside Saturday",
    hours: "Morning to noon",
    line: "Price tags, a cash box, a sold pile.",
    saturday:
      "One table of things the house does not need. The kid writes the prices. Make-an-offer is allowed. Sold goes in a box, not back on the table.",
    need: ["A table", "Things you are really done with", "Tape and paper for tags", "A jar for cash", "A grown-up yes on every item"],
    kid: "Tags, talks to the sidewalk, makes change with help.",
    parent: "The yes and the no. Nothing that still belongs to someone else.",
    done: "Leftovers go back in or get bagged for the real donation run.",
    status: "next",
  },
  {
    id: "paper",
    name: "Block Paper",
    weather: "rainy",
    weatherLabel: "Rainy day",
    hours: "One afternoon",
    line: "One page. Interview the house. Tape it to the fridge.",
    saturday:
      "A one-page paper. Interview someone in the house. Draw the weather you can see from the window. Print it or write it by hand. Circulation is the fridge and maybe a neighbor.",
    need: ["Paper", "A pencil", "A person to interview", "The window", "A printer if you want copies"],
    kid: "Asks the questions, writes the page, draws the header.",
    parent: "The printer. Spelling only if they ask.",
    done: "One copy on the fridge. Extra copies if someone wants one.",
    status: "next",
  },
  {
    id: "farm",
    name: "Window Farm",
    weather: "either",
    weatherLabel: "Any day, then the week",
    hours: "Twenty minutes today, a minute each morning",
    line: "A pot, a seed, water days, a pencil mark on the sill.",
    saturday:
      "Plant one thing you can see from the kitchen. Mark the pot with the date. A water day on the calendar. Measure with a pencil on the sill, not an app.",
    need: ["A pot or a cup with holes", "Dirt", "A seed or a bean", "Water", "A pencil"],
    kid: "Plants, waters on the days you marked, marks the height.",
    parent: "The dirt on the table. A saucer under the pot.",
    done: "Today: it is planted. The week: it got water when it said so.",
    status: "next",
  },
  {
    id: "cards",
    name: "Card Route",
    weather: "either",
    weatherLabel: "Any day",
    hours: "Make after breakfast, walk after lunch",
    line: "Five cards. Walk them to real people.",
    saturday:
      "Make five cards. Not a stack for a drawer. The route is the mailbox, a neighbor, someone in the house, and two more the parent names. No kid Instagram. A hand-off on a porch is the post.",
    need: ["Paper or cards", "Markers", "Envelopes if you have them", "Shoes", "A parent for the walk"],
    kid: "Makes the cards, writes first names, walks the route.",
    parent: "Names the two extra stops. Walks along. No street address typed into a phone.",
    done: "Five cards left someone’s hands.",
    status: "next",
  },
  {
    id: "bike",
    name: "Bike Shop",
    weather: "outside",
    weatherLabel: "Outside Saturday",
    hours: "Saturday morning",
    line: "Air, chain, bell. A dollar if you want.",
    saturday:
      "A sidewalk shop. Air in the tires you can reach. Wipe the chain. Ring the bell. Charge a dollar for a neighbor bike if a parent is there. No one rides off without the brakes checked.",
    need: ["A bike", "A pump if you have one", "A rag", "A drop of oil if you have it", "A paper price"],
    kid: "The wipe, the bell, the price sign, the thank you.",
    parent: "The air needle and the brakes. The dollar jar.",
    done: "The bike rolls and the rag is dirty.",
    status: "next",
  },
  {
    id: "show",
    name: "Showtime",
    weather: "rainy",
    weatherLabel: "Rainy day",
    hours: "Rehearse after lunch, show after dinner",
    line: "Living room concert or play. Tickets, a set list.",
    saturday:
      "A show in the living room. Write a set list or a three-scene play. Tickets are torn paper. Intermission is cookies. Applause is required. Phones stay in a bowl unless they are the spotlight.",
    need: ["A room", "A set list", "Paper tickets", "A snack for intermission", "Chairs for the house"],
    kid: "Writes the show, makes tickets, performs.",
    parent: "Sits in a chair and watches. Does not direct unless asked.",
    done: "Bows. Tickets in the trash. Snack plates in the sink.",
    status: "next",
  },
  {
    id: "rocks",
    name: "Rock Shop",
    weather: "outside",
    weatherLabel: "Outside Saturday",
    hours: "Paint in the morning, stoop in the afternoon",
    line: "Paint rocks. Price them. A tray on the stoop.",
    saturday:
      "Find rocks that already live in the yard. Paint them. Price them for a quarter or a thank you. A tray on the stoop. Take-a-rock is allowed. No painting the neighbor’s landscaping.",
    need: ["Rocks from your own yard", "Paint that can go outside", "A tray", "Paper prices", "Newspaper under the paint"],
    kid: "Picks, paints, prices, sits the tray.",
    parent: "The paint clothes. The stoop yes.",
    done: "The tray is out or the rocks are drying for tomorrow.",
    status: "next",
  },
  {
    id: "repair",
    name: "Repair Bench",
    weather: "either",
    weatherLabel: "Any day",
    hours: "Until it works or you write why it does not",
    line: "One broken thing. The steps. Done when it works.",
    saturday:
      "Pick one thing that is actually broken — a book, a toy wheel, a loose knob. Write the steps. Try them. If it still does not work, write that down too. That counts.",
    need: ["One broken thing the house owns", "The tool that fits", "Paper for the steps", "A box for parts", "A grown-up for anything sharp or electric"],
    kid: "Names the problem, writes the steps, does the safe ones.",
    parent: "Electric, blades, and the last screw.",
    done: "It works, or the paper says what you tried.",
    status: "next",
  },
  {
    id: "cocoa",
    name: "Cocoa Hut",
    weather: "outside",
    weatherLabel: "Cold Saturday",
    hours: "The cold part of the afternoon",
    line: "Winter sister of the stand. Steam, cups, a window sign.",
    saturday:
      "Same bones as the lemonade stand, in a coat. Cocoa on the stove with a grown-up. A sign in the window or on the storm door. Marshmallows are inventory.",
    need: ["Milk or water", "Cocoa", "Mugs", "A window sign", "A grown-up on the stove"],
    kid: "The sign, the cups, the tap on the phone if you ring them up.",
    parent: "The stove. The door if it is too cold for the drive.",
    done: "The pot is washed. The sign comes in before dark.",
    status: "next",
  },
  {
    id: "derby",
    name: "Paper Derby",
    weather: "rainy",
    weatherLabel: "Rainy day",
    hours: "An hour in the hall",
    line: "Planes, heats, a paper trophy. The hallway is the runway.",
    saturday:
      "Fold three planes. Heats from the hallway. A grown-up is the finish line, not the coach. Write the scores. The trophy is paper and it goes on the fridge.",
    need: ["Printer paper", "A hallway", "A pencil for scores", "Tape for the finish", "A paper trophy"],
    kid: "Folds, flies, writes the bracket.",
    parent: "The finish line. No throwing at lamps.",
    done: "A winner on the fridge. Planes in the recycle if they are done.",
    status: "next",
  },
  {
    id: "library",
    name: "Porch Library",
    weather: "either",
    weatherLabel: "Any day, then the week",
    hours: "Set up today, check the card tomorrow",
    line: "A basket of books on the porch. Checkouts on an index card.",
    saturday:
      "A basket, not a painted box you have to build first. Books the house is done with. An index card: who took it, what it was. A parent walks the first one to the porch with you.",
    need: ["A basket", "Books you are done with", "Index cards", "A pen", "A dry spot on the porch"],
    kid: "Picks the books, writes the card, checks it the next day.",
    parent: "The yes on every book. The porch is yours.",
    done: "The basket is out. The card is clipped to it.",
    status: "next",
  },
];

export function kitById(id: string) {
  return KITS.find((kit) => kit.id === id);
}

export const OPEN_KITS = KITS.filter((kit) => kit.status === "open");
