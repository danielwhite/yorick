import { ListItem, OrderedList, UnorderedList } from "@chakra-ui/react";
import { $item, get } from "libram";

import AdviceTooltip from "../../../components/AdviceTooltip";
import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";

const cleaverChoiceAdventures = [
  {
    choice: 1467,
    name: "Aunts not Ants",
    option1: "150 moxie substats",
    option2: "250 muscle substats",
    option3: "30 turns of Ashamed (+10 substats/fight, -20% Mus/Mys/Mox)",
  },
  {
    choice: 1468,
    name: "Bath Time",
    option1: "150 muscle substats, gob of wet hair",
    option2:
      "30 turns of Wholesomely Resolved (15 DR, +2 spooky/stench/sleaze res)",
    option3: "30 turns of Kinda Damp (+3 hot res, +50% init)",
  },
  {
    choice: 1469,
    name: "Beware of Aligator",
    option1: "30 turns of Yapping Pal (+20 ML)",
    option2: "Dad's Brandy (size 1 awesome booze)",
    option3: "1500 meat",
  },
  {
    choice: 1470,
    name: "Delicious Sprouts",
    option1: "250 mysticality substats",
    option2: "guilty sprout (size 1 food, red rocket for big stats)",
    option3: "250 muscle substats",
  },
  {
    choice: 1471,
    name: "Hypnotic Master",
    option1: "mother's necklace (+3 adv per day, never fumble, 5 free rests)",
    option2: "250 muscle substats",
    option3: "30 turns of of 2-5 random effects",
  },
  {
    choice: 1472,
    name: "Lost and Found",
    option1: "savings bond (potion, 30 turns of +50% meat)",
    option2: "3 turns of beaten up, 100 muscle substats, 250 meat",
    option3: "250 mysticality substats",
  },
  {
    choice: 1473,
    name: "Poetic Justice",
    option1: "250 moxie substats",
    option2: "125 mysticality substats",
    option3: "5 turns of beaten up, 5 adventures",
  },
  {
    choice: 1474,
    name: "Summer Days",
    option1: "trampled ticket stub (potion, 30 turns of 5% -com)",
    option2:
      "fire-roasted lake trout (size 1 good food, 50 turns of +3 cold res, +15 hot damage)",
    option3: "250 moxie substats",
  },
  {
    choice: 1475,
    name: "Teacher's Pet",
    option1: "30 turns of Teacher's Pet (+2 sleaze res, 50 DA, 5 DR)",
    option2: "teacher's pen (acc, +3 substats/fight, +2 fam exp)",
    option3: "125 muscle substats",
  },
];

const JuneCleaver = () => {
  const cleaver = $item`June cleaver`;
  const fightsLeft = get(`_juneCleaverFightsLeft`);
  const cleaverQueue = get(`juneCleaverQueue`)
    .split(`,`)
    .map((value) => parseInt(value));
  const skipsRemaining = 5 - get(`_juneCleaverSkips`);

  const availableChoices = cleaverChoiceAdventures
    .filter((entry) => !cleaverQueue.includes(entry.choice))
    .map(({ option1, option2, option3, name, choice }) => {
      return (
        <ListItem key={choice}>
          <AdviceTooltip
            text={
              <>
                <Line fontWeight="bold">Choices:</Line>
                <OrderedList>
                  <ListItem key={`${choice}_1`}>{option1}</ListItem>
                  <ListItem key={`${choice}_2`}>{option2}</ListItem>
                  <ListItem key={`${choice}_3`}>{option3}</ListItem>
                </OrderedList>
              </>
            }
            label={name}
          />
        </ListItem>
      );
    });

  // TODO: Add nag for have NC now.

  if (!haveUnrestricted(cleaver)) return null;

  return (
    <Tile linkedContent={cleaver}>
      <Line>
        {fightsLeft} {fightsLeft === 1 ? "combat" : "combats"} until the next
        June cleaver NC.
      </Line>
      {skipsRemaining > 0 && (
        <Line>
          You can skip {skipsRemaining} more cleaver{" "}
          {skipsRemaining > 1 ? "NCs" : "NC"} today.
        </Line>
      )}
      <Line>Possible upcoming NCs:</Line>
      <UnorderedList>{availableChoices}</UnorderedList>
    </Tile>
  );
};

export default JuneCleaver;
