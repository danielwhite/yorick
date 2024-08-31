import { Text } from "@chakra-ui/react";
import { haveEquipped, myPath } from "kolmafia";
import { $effect, $item, $path, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";

const SpringShoes = () => {
  const springShoes = $item`spring shoes`;
  const everythingLooksGreen = $effect`Everything Looks Green`;

  const haveShoes = haveUnrestricted(springShoes);
  const haveELG = have(everythingLooksGreen);
  const pathCheck =
    myPath() !== $path`Community Service` && myPath() !== $path`WereProfessor`;
  const haveShoesEquipped = haveEquipped(springShoes);

  useNag(
    () => ({
      priority: NagPriority.MID,
      node: (
        <Tile
          header="Spring Shoes"
          imageUrl="/images/itemimages/springshoes.gif"
          hide={!haveShoes || !pathCheck || haveELG}
          linkedContent={springShoes}
        >
          <Line>
            <Text as="span" color="green.500" fontWeight="bold">
              Free-run away from your problems with the{" "}
              <Text as="b">Spring Away</Text> skill!
            </Text>
          </Line>
          {!haveShoesEquipped && (
            <Line>
              <Text as="span" color="red.500">
                Equip the spring shoes first.
              </Text>
            </Line>
          )}
        </Tile>
      ),
    }),
    [haveELG, haveShoes, haveShoesEquipped, pathCheck, springShoes],
  );

  return (
    <Tile
      header="Spring Shoes"
      imageUrl="/images/itemimages/springshoes.gif"
      hide={!haveUnrestricted(springShoes)}
    >
      <Line>All day banish, doesn't end combat.</Line>
      {!haveShoesEquipped && (
        <Line>
          <Text as="span" color="red">
            Equip the spring shoes first.
          </Text>
        </Line>
      )}
    </Tile>
  );
};

export default SpringShoes;