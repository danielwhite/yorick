import TileSection from "../components/TileSection";

import BeatenUp from "./misc/BeatenUp";
import Cartography from "./resources/2020/Cartography";
import CommerceGhost from "./resources/2020/CommerceGhost";
import Melodramedary from "./resources/2020/Melodramedary";
import PowerfulGlove from "./resources/2020/PowerfulGlove";
import BackupCamera from "./resources/2021/BackupCamera";
import ColdMedicineCabinet from "./resources/2021/ColdMedicineCabinet";
import DaylightShavingsHelmet from "./resources/2021/DaylightShavingsHelmet";
import EmotionChip from "./resources/2021/EmotionChip";
import IndustrialFireExtinguisher from "./resources/2021/IndustrialFireExtinguisher";
import UndergroundFireworksShop from "./resources/2021/UndergroundFireworksShop";
import Autumnaton from "./resources/2022/Autumnaton";
import CombatLoversLocket from "./resources/2022/CombatLoversLocket";
import Cookbookbat from "./resources/2022/Cookbookbat";
import CosmicBowlingBall from "./resources/2022/CosmicBowlingBall";
import CursedMagnifyingGlass from "./resources/2022/CursedMagnifyingGlass";
import DesignerSweatpants from "./resources/2022/DesignerSweatpants";
import GreyGoose from "./resources/2022/GreyGoose";
import JuneCleaver from "./resources/2022/JuneCleaver";
import JurassicParka from "./resources/2022/JurassicParka";
import MayDayPackage from "./resources/2022/MaydaySupplyPackage";
import ModelTrainSet from "./resources/2022/ModelTrainSet";
import TinyStillsuit from "./resources/2022/TinyStillsuit";
import UnbreakableUmbrella from "./resources/2022/UnbreakableUmbrella";
import MrStore2002 from "./resources/2023/2002Catalog";
import BurningLeaves from "./resources/2023/AGuidetoBurningLeaves";
import AugustScepter from "./resources/2023/AugustScepter";
import BookOfFacts from "./resources/2023/BookOfFacts";
import CandyCaneSwordCane from "./resources/2023/CandyCaneSwordCane";
import CinchoDeMayo from "./resources/2023/CinchoDeMayo";
import ClosedCircuitPayPhone from "./resources/2023/ClosedCircuitPayPhone";
import CursedMonkeysPaw from "./resources/2023/CursedMonkeyPaw";
import JillOfAllTrades from "./resources/2023/JillOfAllTrades";
import PatrioticEagle from "./resources/2023/PatrioticEagle";
import RockGarden from "./resources/2023/RockGarden";
import SITCertificate from "./resources/2023/SITCourseCertificate";
import AprilingBandHelmet from "./resources/2024/AprilingBandHelmet";
import BatWings from "./resources/2024/BatWings";
import ChestMimic from "./resources/2024/ChestMimic";
import EverfullDartHolster from "./resources/2024/EverfullDartHolster";
import MayamCalendar from "./resources/2024/MayamCalendar";
import MiniKiwi from "./resources/2024/MiniKiwi";
import PhotoBooth from "./resources/2024/PhotoBooth";
import RomanCandelabra from "./resources/2024/RomanCandelabra";
import SeptEmberCenser from "./resources/2024/SeptEmberCenser";
import SpringShoes from "./resources/2024/SpringShoes";
import TearawayPants from "./resources/2024/TearawayPants";
import ActiveBanishes from "./resources/ActiveBanishes";
import Copies from "./resources/Copies";
import Faxes from "./resources/Faxes";
import FreeFights from "./resources/FreeFights";
import FreeKills from "./resources/FreeKills";
import FreeRuns from "./resources/FreeRuns";
import LuckyAdventures from "./resources/LuckyAdventures";
import NoncombatForces from "./resources/NoncombatForces";
import AvantGuard from "./resources/path/AvantGuard";
import Numberology from "./resources/skill/Numberology";
import TranscendentOlfaction from "./resources/skill/TranscendentOlfaction";

// TODO: Organize by functionality, not release.
const ResourceSection = () => (
  <TileSection
    name="Resources"
    tiles={[
      ActiveBanishes,
      FreeFights,
      FreeKills,
      FreeRuns,
      Faxes,
      Copies,
      NoncombatForces,
      TranscendentOlfaction,
      Numberology,
      LuckyAdventures,

      /* 2020 */
      PowerfulGlove,
      Melodramedary,
      Cartography,
      CommerceGhost,

      /* 2021 */
      BackupCamera,
      EmotionChip,
      UndergroundFireworksShop,
      IndustrialFireExtinguisher,
      DaylightShavingsHelmet,
      ColdMedicineCabinet,

      /* 2022 */
      CursedMagnifyingGlass,
      CosmicBowlingBall,
      CombatLoversLocket,
      GreyGoose,
      UnbreakableUmbrella,
      MayDayPackage,
      JuneCleaver,
      DesignerSweatpants,
      TinyStillsuit,
      JurassicParka,
      Autumnaton,
      Cookbookbat,
      ModelTrainSet,

      /* 2023 */
      RockGarden,
      SITCertificate,
      ClosedCircuitPayPhone,
      CursedMonkeysPaw,
      CinchoDeMayo,
      MrStore2002,
      PatrioticEagle,
      AugustScepter,
      BookOfFacts,
      JillOfAllTrades,
      BurningLeaves,
      CandyCaneSwordCane,

      /* 2024 */
      ChestMimic,
      SpringShoes,
      EverfullDartHolster,
      AprilingBandHelmet,
      MayamCalendar,
      MiniKiwi,
      RomanCandelabra,
      TearawayPants,
      SeptEmberCenser,
      BatWings,
      PhotoBooth,

      /* Nags only */
      BeatenUp,
      AvantGuard,
    ]}
  />
);

export default ResourceSection;
