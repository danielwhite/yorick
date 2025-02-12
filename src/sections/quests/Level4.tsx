import { $item, $location, have, questStep } from "libram";
import { FC } from "react";

import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step } from "../../util/quest";
import { plural } from "../../util/text";

const Level4: FC = () => {
  const step = questStep("questL04Bat");
  const bodyguards = $location`The Boss Bat's Lair`.turnsSpent;
  const beanstalk = questStep("questL10Garbage") >= 1;

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Explore the Bat Hole"
      imageUrl="/images/adventureimages/bossbat.gif"
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, "/place.php?whichplace=bathole"],
        [4, "/council.php"],
      ])}
      minLevel={4}
    >
      {step >= 0 && !have($item`enchanted bean`) && !beanstalk && (
        <Line>
          Get an enchanted bean from a beanbat for the level 10 quest.
        </Line>
      )}
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [
          Step.STARTED,
          <Line>
            Blow down {plural(3 - step, "bat hole wall")} by fighting Screambats
            or using sonars-in-a-biscuit.
          </Line>,
        ],
        [
          3,
          <Line>
            Face the fearsome Boss Bat in his lair!{" "}
            {bodyguards < 4
              ? `You must fight at least ${Math.max(0, 4 - bodyguards)} bodyguards to find him.`
              : bodyguards === 4
                ? "Appears in the next three turns."
                : bodyguards === 5
                  ? "Appears in the next two turns."
                  : "Appears next turn."}
          </Line>,
        ],
        [4, <Line>Return to the council with news of your defeated foe.</Line>],
      ])}
    </QuestTile>
  );
};

export default Level4;
