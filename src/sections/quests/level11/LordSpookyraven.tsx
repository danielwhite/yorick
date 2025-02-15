import {
  canAdventure,
  canEquip,
  getProperty,
  haveEquipped,
  inHardcore,
  Location,
  myLocation,
  myMeat,
  myPath,
  numericModifier,
} from "kolmafia";
import { $effect, $item, $location, $path, get, have, questStep } from "libram";
import { FC } from "react";

import Line from "../../../components/Line";
import MainLink from "../../../components/MainLink";
import QuestTile from "../../../components/QuestTile";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";
import { inventoryLink, parentPlaceLink } from "../../../util/links";
import { questFinished, Step } from "../../../util/quest";
import { commaOr, plural } from "../../../util/text";

const CELLAR_LINK = "/place.php?whichplace=manor4";

const LordSpookyraven: FC = () => {
  const step = questStep("questL11Manor");

  const isPathBoris = myPath() === $path`Avatar of Boris`;
  const isPathActuallyEdTheUndying =
    myPath() === $path`Actually Ed the Undying`;
  const isPathNuclearAutumn = myPath() === $path`Nuclear Autumn`;
  const isPathVampire = myPath() === $path`Dark Gyffte`;
  const isInHardcore = inHardcore();
  const isInBadMoon =
    getProperty("moonTuned") === "true" &&
    getProperty("charpanemode") === "badmoon";

  const canEquipAnyWeapon = canEquip($item`seal-clubbing club`);
  const useFastRoute =
    canEquipAnyWeapon &&
    !(isPathNuclearAutumn && isInHardcore) &&
    !isPathBoris &&
    !isInBadMoon;

  const hauntedBallroomAvailable = canAdventure(
    $location`The Haunted Ballroom`,
  );
  const hauntedBallroomNoncombatNotDone =
    !$location`The Haunted Ballroom`.noncombatQueue.includes(
      "We'll All Be Flat",
    );
  const delayRemaining = 5 - $location`The Haunted Ballroom`.turnsSpent;

  const haveSpectacles = have($item`Lord Spookyraven's spectacles`);
  const haveSpectaclesEquipped = haveEquipped(
    $item`Lord Spookyraven's spectacles`,
  );
  const recipeWillBeAutoread =
    haveSpectacles && useFastRoute && get("autoCraft");
  const recipeWasAutoreadWithGlasses =
    get("spookyravenRecipeUsed") === "with_glasses";
  const recipeWasAutoread =
    recipeWasAutoreadWithGlasses ||
    get("spookyravenRecipeUsed") === "no_glasses";

  const haveWineBomb = have($item`wine bomb`);
  const haveUnstableFulminate = have($item`unstable fulminate`);
  const haveUnstableFulminateEquipped = haveEquipped($item`unstable fulminate`);
  const haveChateauDeVinegar = have($item`bottle of Chateau de Vinegar`);
  const haveBlastingSoda = have($item`blasting soda`);

  const currentMl = numericModifier("Monster Level");
  const mlNeeded = 82 - currentMl;

  const searchables = {
    "The Haunted Kitchen": $item`loosening powder`,
    "The Haunted Conservatory": $item`powdered castoreum`,
    "The Haunted Bathroom": $item`drain dissolver`,
    "The Haunted Gallery": $item`triple-distilled turpentine`,
    "The Haunted Laboratory": $item`detartrated anhydrous sublicalc`,
    "The Haunted Storage Room": $item`triatomaceous dust`,
  };

  const missingSearchables = Object.entries(searchables).filter(
    ([, item]) => !have(item),
  );

  const inBoilerRoom = myLocation() === $location`The Haunted Boiler Room`;

  useNag(
    () => ({
      id: "lord-spookyraven-quest-nag",
      priority: NagPriority.HIGH,
      node: step < Step.FINISHED &&
        inBoilerRoom &&
        haveUnstableFulminate &&
        !haveUnstableFulminateEquipped && (
          <Tile
            header="Make a wine bomb"
            imageUrl="/images/itemimages/wine2.gif"
          >
            <Line
              href={inventoryLink($item`unstable fulminate`)}
              color="red.500"
            >
              Equip unstable fulminate.
            </Line>
          </Tile>
        ),
    }),
    [haveUnstableFulminate, haveUnstableFulminateEquipped, inBoilerRoom, step],
  );

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header={
        missingSearchables.length === 0 || haveWineBomb || step === 3
          ? "Fight Lord Spookyraven"
          : "Find Lord Spookyraven"
      }
      id="lord-spookyraven-quest"
      imageUrl="/images/adventureimages/lordspooky.gif"
      minLevel={11}
      disabled={!hauntedBallroomAvailable}
    >
      {hauntedBallroomNoncombatNotDone ? (
        questFinished("questL11Black") ? (
          <>
            <Line href="/place.php?whichplace=manor2">
              Run -combat in the Haunted Ballroom.
            </Line>
            {delayRemaining > 0 && (
              <Line>Delay for {plural(delayRemaining, "turn")}.</Line>
            )}
          </>
        ) : delayRemaining > 0 ? (
          <Line>
            Pre-burn {plural(delayRemaining, "turn")} of delay in the Haunted
            Ballroom.
          </Line>
        ) : (
          <Line>All delay burned. Find your dad's diary.</Line>
        )
      ) : useFastRoute && !haveSpectacles && !recipeWasAutoread ? (
        <Line href={parentPlaceLink($location`The Haunted Bedroom`)}>
          Acquire Lord Spookyraven's spectacles from the Haunted Bedroom.
        </Line>
      ) : !recipeWasAutoread &&
        !have($item`recipe: mortar-dissolving solution`) ? (
        recipeWillBeAutoread ? (
          <Line href={CELLAR_LINK}>
            Click on the suspicious masonry in the basement.
          </Line>
        ) : useFastRoute && !haveSpectaclesEquipped ? (
          <Line command="equip Lord Spookyraven's spectacles">
            Equip Lord Spookyraven's Spectacles, click on the suspicious masonry
            in the basement, then read the recipe.
          </Line>
        ) : (
          <Line href={CELLAR_LINK}>
            Click on the suspicious masonry in the basement, then read the
            recipe.
          </Line>
        )
      ) : useFastRoute && haveWineBomb ? (
        <Line href={CELLAR_LINK}>Fight Lord Spookyraven.</Line>
      ) : useFastRoute && haveUnstableFulminate ? (
        <>
          <Line href={CELLAR_LINK}>
            Adventure in the haunted boiler room with +{mlNeeded} ML.
          </Line>
          <Line href={CELLAR_LINK}>
            ~{Math.ceil(50.1 / (10 + Math.floor(Math.max(currentMl, 0) / 2)))}{" "}
            total boiler fights to charge fulminate.
          </Line>
        </>
      ) : useFastRoute && !recipeWasAutoreadWithGlasses ? (
        <Line
          command={
            haveSpectacles ? "equip Lord Spookyraven's spectacles" : undefined
          }
        >
          Need to {!haveSpectacles ? "acquire and " : ""}equip Lord
          Spookyraven's spectacles and read the recipe before you can use the
          quick route.
        </Line>
      ) : useFastRoute ? (
        <>
          {!haveChateauDeVinegar && (
            <Line href={CELLAR_LINK}>
              Find bottle of Chateau de Vinegar from possessed wine rack in the
              Haunted Wine Cellar.
            </Line>
          )}
          {!haveBlastingSoda && (
            <Line href={CELLAR_LINK}>
              Find blasting soda from the cabinet in the Haunted Laundry Room.
            </Line>
          )}
          {haveChateauDeVinegar && haveBlastingSoda && (
            <Line href="/craft.php?mode=cook">Cook unstable fulminate.</Line>
          )}
        </>
      ) : missingSearchables.length > 0 ? (
        <Line>
          Go search in the Haunted{" "}
          {commaOr(
            missingSearchables.map(([location]) => (
              <MainLink
                key={location}
                href={parentPlaceLink(Location.get(location))}
              >
                location.replace("The Haunted ", "")
              </MainLink>
            )),
          )}
          .
        </Line>
      ) : isPathActuallyEdTheUndying ? (
        <Line href={CELLAR_LINK}>Talk to Lord Spookyraven.</Line>
      ) : isPathVampire ? (
        <Line href={CELLAR_LINK}>Fight the path-specific boss.</Line>
      ) : (
        <>
          <Line href={CELLAR_LINK}>Fight Lord Spookyraven.</Line>
          {!have($effect`Red Door Syndrome`) &&
            myMeat() > 1000 &&
            !haveUnrestricted($item`can of black paint`) && (
              <Line href="/shop.php?whichshop=blackmarket">
                A can of black paint can help with fighting him.
                {myMeat() < 20000 && " Bit pricy. (1k meat)"}
              </Line>
            )}
        </>
      )}
    </QuestTile>
  );
};

export default LordSpookyraven;
