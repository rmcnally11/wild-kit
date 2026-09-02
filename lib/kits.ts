export type Season = "summer" | "spring" | "fall" | "rain" | "anytime";
export type KitStatus = "open" | "next";

export type Kit = {
  id: string;
  name: string;
  listing: string;
  season: Season;
  seasonLabel: string;
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
    id: "lemonade",
    name: "Lemonade Stand",
    listing: "Lemonade Stand by Wild Kit",
    season: "summer",
    seasonLabel: "Apr–Aug",
    hours: "A warm afternoon. Done by dinner.",
    line: "Design. Print. Open the stand.",
    saturday:
      "Wild Kit turns Saturday energy into a real project. Kids design the logo, build the menu, and set the prices. Parents handle the account and send the poster to print. Then you go outside and open the stand. No ads. Parent-owned account. Made for families to use together.",
    need: ["A table or a box", "A pitcher and cups", "Lemons or a mix", "A marker", "A chair"],
    kid: "You’re the boss of this stand. Make the sign. Set the price. Open.",
    parent: "Kids invent the logo and the prices. You hit print. Then you go outside.",
    done: "You opened. That’s the whole point.",
    status: "open",
  },
  {
    id: "fort",
    name: "Blanket Fort",
    listing: "Blanket Fort by Wild Kit",
    season: "rain",
    seasonLabel: "Rain day",
    hours: "After lunch until lights out",
    line: "Pillows, a trail through the house, lights out.",
    saturday:
      "When the house is full of raccoons and it is raining, make a fort. Pack from the house. Walk a four-stop trail. Write what you heard. Lights out ends the day.",
    need: ["Pillows and blankets", "A flashlight or phone light", "Water and a snack", "A book", "One stuffed friend"],
    kid: "Pack the bag. Walk the trail. Write the log.",
    parent: "Move the breakable stuff. Stay nearby. Do not turn it into a party.",
    done: "Lights out is checked. The fort can stay until morning.",
    status: "next",
  },
  {
    id: "bake",
    name: "Bake Sale",
    listing: "Bake Sale by Wild Kit",
    season: "fall",
    seasonLabel: "Sep–Nov",
    hours: "Bake in the morning. Table after lunch.",
    line: "One tray. Prices the kid chose. A sign on the table.",
    saturday:
      "One kind of thing, not a bakery. The kid names it, prices it, and draws the sign. A grown-up has the oven. Print the price cards. Open on the driveway or the church steps.",
    need: ["What you already bake", "A tray", "Paper for prices", "A table", "A grown-up on the oven"],
    kid: "Name it. Set the price. Make the sign.",
    parent: "The oven. The print. The yes on every recipe.",
    done: "The tray is empty or the sun is gone.",
    status: "next",
  },
  {
    id: "wash",
    name: "Car Wash",
    listing: "Car Wash by Wild Kit",
    season: "spring",
    seasonLabel: "Spring / warm",
    hours: "Late morning",
    line: "Hose, buckets, tickets. Then you go outside.",
    saturday:
      "A wash on the drive. Price a car and a bike. Tickets on index cards. The kid invents the name of the wash. A parent runs the tap.",
    need: ["A hose or two buckets", "Soap that is allowed on the drive", "Rags", "Index cards", "A chair"],
    kid: "Make the prices. Take the tickets. Wash what you can reach.",
    parent: "The hose at the tap. Cars in park.",
    done: "The buckets are empty and the drive is not a pond.",
    status: "next",
  },
  {
    id: "birdhouse",
    name: "Birdhouse",
    listing: "Birdhouse by Wild Kit",
    season: "spring",
    seasonLabel: "Spring",
    hours: "One Saturday, then you wait",
    line: "Build it. Paint the mark. Hang it. Watch.",
    saturday:
      "A house from a kit you already have, or a milk carton if that is what is in the garage. The kid paints the name and the mark. A grown-up hangs it. The app gets quiet on purpose.",
    need: ["A box or a simple kit", "Paint", "A string or a nail", "A grown-up for the hang", "A window to watch"],
    kid: "Paint the mark. Name the house.",
    parent: "The nail. The height. The yes on the tree.",
    done: "It is hanging. You go back inside.",
    status: "next",
  },
  {
    id: "garden",
    name: "Garden Box",
    listing: "Garden Box by Wild Kit",
    season: "spring",
    seasonLabel: "Mar–Apr",
    hours: "Twenty minutes today, a minute each morning",
    line: "Dirt, a seed, a mark on the sill.",
    saturday:
      "Plant one thing you can see from the kitchen. The kid names the farm and paints the pot. Water days on the calendar. Measure with a pencil, not an app.",
    need: ["A pot or a cup with holes", "Dirt", "A seed or a bean", "Water", "A pencil"],
    kid: "Plant it. Name it. Water on the days you marked.",
    parent: "The dirt on the table. A saucer under the pot.",
    done: "Today: it is planted. The week: it got water when it said so.",
    status: "next",
  },
  {
    id: "paper",
    name: "Neighborhood Newspaper",
    listing: "Neighborhood Newspaper by Wild Kit",
    season: "anytime",
    seasonLabel: "Anytime",
    hours: "One afternoon",
    line: "One page. Interview the house. Tape it to the fridge.",
    saturday:
      "A one-page paper. The kid invents the masthead. Interview someone in the house. Print it or write it by hand. Circulation is the fridge.",
    need: ["Paper", "A pencil", "A person to interview", "The window", "A printer if you want copies"],
    kid: "Ask the questions. Draw the header. Set the name.",
    parent: "The printer. Spelling only if they ask.",
    done: "One copy on the fridge.",
    status: "next",
  },
  {
    id: "parade",
    name: "Pet Parade",
    listing: "Pet Parade by Wild Kit",
    season: "anytime",
    seasonLabel: "Weekend",
    line: "A route, a number, a prize that is a ribbon.",
    hours: "After lunch, one loop of the block or the yard",
    saturday:
      "Every pet that already lives here. The kid makes numbers and a finish-line sign. A parent walks the route. No strangers. No new animals.",
    need: ["A pet that is yours", "Paper numbers", "A ribbon", "A short route", "A grown-up on the leash"],
    kid: "Make the numbers. Draw the sign. Call the winner.",
    parent: "The leash. The route. The yes.",
    done: "Everyone is home. The ribbon is on someone.",
    status: "next",
  },
  {
    id: "map",
    name: "Treasure Map",
    listing: "Treasure Map by Wild Kit",
    season: "anytime",
    seasonLabel: "Anytime",
    hours: "Draw after breakfast. Hunt after lunch.",
    line: "A map of this house. A prize you already own.",
    saturday:
      "The kid draws the map and hides one thing. A parent checks the hide is kind. Then the house hunts. Print the map if you want it to last.",
    need: ["Paper", "A marker", "One prize from the house", "A place to hide it", "Shoes if you go to the yard"],
    kid: "Draw the map. Hide the prize. Clue the house.",
    parent: "The hide is safe. No attic beams.",
    done: "Someone found it. The map goes on the fridge.",
    status: "next",
  },
  {
    id: "garage",
    name: "Garage Sale",
    listing: "Garage Sale by Wild Kit",
    season: "fall",
    seasonLabel: "Sat morning",
    hours: "Morning to noon",
    line: "Price tags, a cash box, a sold pile.",
    saturday:
      "Things the house is done with. The kid writes the prices and the name of the sale. A grown-up says yes on every item. Print the tags. Sold goes in a box.",
    need: ["A table", "Things you are really done with", "Tape and paper", "A jar for cash", "A grown-up yes on every item"],
    kid: "Tags. The name on the sign. Talk to the sidewalk.",
    parent: "The yes and the no.",
    done: "Leftovers go back in or get bagged.",
    status: "next",
  },
  {
    id: "puppet",
    name: "Puppet Theater",
    listing: "Puppet Theater by Wild Kit",
    season: "rain",
    seasonLabel: "Indoor",
    hours: "Make after lunch. Show after dinner.",
    line: "A sheet, a story, tickets you tear.",
    saturday:
      "A doorway and a sheet. The kid invents the show and the tickets. A parent sits in a chair and watches. Phones in a bowl unless they are the spotlight.",
    need: ["A sheet", "Socks or paper puppets", "Paper tickets", "A snack for intermission", "Chairs"],
    kid: "Write the show. Make tickets. Perform.",
    parent: "Sit in a chair. Do not direct unless asked.",
    done: "Bows. Tickets in the trash.",
    status: "next",
  },
  {
    id: "olympics",
    name: "Backyard Olympics",
    listing: "Backyard Olympics by Wild Kit",
    season: "summer",
    seasonLabel: "Summer",
    hours: "An hour in the yard",
    line: "Three events. A paper medal. A closing cheer.",
    saturday:
      "The kid invents three events you can do with what is already outside. A parent is the finish line, not the coach. Print the medals. Then put the phone down.",
    need: ["The yard or the hall", "A ball or a stick of chalk", "Paper medals", "Water", "A grown-up finish line"],
    kid: "Name the games. Make the medals. Cheer.",
    parent: "The finish line. No throwing at lamps.",
    done: "A winner on the fridge. Everyone got water.",
    status: "next",
  },
];

export function kitById(id: string) {
  return KITS.find((kit) => kit.id === id);
}

export const OPEN_KITS = KITS.filter((kit) => kit.status === "open");
