export type Recipe = {
  id: string;
  name: string;
  tag: string;
  why: string;
  price: number;
  makes: string;
  time: string;
  kid: string;
  grownup: string;
  stuff: string[];
  steps: string[];
  secret: string;
};

export const RECIPES: Recipe[] = [
  {
    id: "house",
    name: "House pitcher",
    tag: "The one to know",
    why: "Real lemons. No powder. This is the stand.",
    price: 2,
    makes: "About 8 cups",
    time: "20 minutes",
    kid: "Roll the lemons, juice them, stir, taste.",
    grownup: "The knife. Hot water if the sugar is stubborn.",
    stuff: [
      "6 lemons",
      "1 cup sugar",
      "6 cups cold water",
      "A pinch of salt",
      "Ice",
    ],
    steps: [
      "Roll each lemon on the counter. They give up more juice.",
      "Cut and juice. Fish out the seeds. Keep a little zest if you want it brighter.",
      "Stir the sugar into 1 cup warm water until it disappears.",
      "Add the lemon juice, the rest of the cold water, and the pinch of salt.",
      "Taste. More lemon if it is candy. More sugar if it makes you squint. Ice last.",
    ],
    secret: "The salt is not a joke. It makes the lemon taste like lemon.",
  },
  {
    id: "pink",
    name: "Pink porch",
    tag: "The pretty one",
    why: "Strawberries mashed in. Pink without a bottle of dye.",
    price: 2.5,
    makes: "About 8 cups",
    time: "25 minutes",
    kid: "Wash the berries. Mash them with a fork. Taste for sweetness.",
    grownup: "Hull the strawberries. Knife stays with you.",
    stuff: [
      "1 house pitcher",
      "1 cup strawberries",
      "A spoon of extra sugar if the berries are shy",
    ],
    steps: [
      "Make the house pitcher first.",
      "Mash the strawberries in a bowl until they look like jam.",
      "Stir them into the pitcher. Let it sit ten minutes.",
      "Pour through a strainer if you do not want seeds in the cups.",
    ],
    secret: "A few whole slices on top of the ice and it looks like you meant it.",
  },
  {
    id: "mint",
    name: "Yard mint",
    tag: "The garden one",
    why: "Tastes like you walked outside and came back with something.",
    price: 2.5,
    makes: "About 8 cups",
    time: "20 minutes",
    kid: "Pick the mint. Clap the leaves. Drop them in.",
    grownup: "Rinse the mint. No mower clippings.",
    stuff: [
      "1 house pitcher",
      "A small handful of mint",
    ],
    steps: [
      "Make the house pitcher.",
      "Clap the mint between your hands. That wakes it up.",
      "Drop it in. Do not chop it to dust or it turns grassy.",
      "Sit ten minutes. Fish the leaves out if they get tired.",
    ],
    secret: "One mint leaf in each cup is the whole trick.",
  },
  {
    id: "honey",
    name: "Honey sun",
    tag: "The golden one",
    why: "Honey instead of a full cup of sugar. Softer. A little fancy.",
    price: 2.5,
    makes: "About 8 cups",
    time: "20 minutes",
    kid: "Juice. Stir. Taste. Name it if you want.",
    grownup: "Warm a little water so the honey lets go.",
    stuff: [
      "6 lemons",
      "1/2 cup honey",
      "6 cups water",
      "Ice",
    ],
    steps: [
      "Warm 1 cup of water. Not boiling. Stir in the honey until it is gone.",
      "Juice the lemons into that.",
      "Add the rest of the cold water. Taste.",
      "Ice in the cups, not the whole pitcher, or you water it down.",
    ],
    secret: "A thin slice of lemon on the rim and people think you have a restaurant.",
  },
  {
    id: "fizz",
    name: "Fizz cup",
    tag: "The wow pour",
    why: "Sparkle in the cup, not the pitcher. It stays loud.",
    price: 2.5,
    makes: "One cup at a time",
    time: "The pour",
    kid: "The pour. Half and half. Watch it wake up.",
    grownup: "Buy the sparkling water. Keep it cold.",
    stuff: [
      "House pitcher, already cold",
      "A bottle of plain sparkling water",
    ],
    steps: [
      "Do not mix the bubbles into the pitcher. They die in there.",
      "Fill the cup halfway with lemonade.",
      "Top it with sparkling water. Slow so it does not foam over.",
      "Hand it over while it is still singing.",
    ],
    secret: "Charge fifty cents more. They can hear why.",
  },
  {
    id: "vanilla",
    name: "Vanilla secret",
    tag: "The diner trick",
    why: "Half a teaspoon and it tastes like somebody's grandmother was involved.",
    price: 2.25,
    makes: "About 8 cups",
    time: "20 minutes",
    kid: "The drop of vanilla. Stir. Do the taste test with the house pitcher.",
    grownup: "Watch the vanilla. A little is a secret. A lot is a candle.",
    stuff: [
      "1 house pitcher",
      "1/2 teaspoon vanilla",
    ],
    steps: [
      "Make the house pitcher.",
      "Stir in half a teaspoon of vanilla.",
      "Taste next to a plain cup. That is the whole point of today.",
    ],
    secret: "Tell the block it is the secret recipe. It is. You just said it out loud.",
  },
];

export function recipeById(id: string) {
  return RECIPES.find((recipe) => recipe.id === id) ?? null;
}
