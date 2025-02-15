import { InfoIcon, Text } from "@chakra-ui/icons";
import {
  ComponentWithAs,
  HStack,
  Icon,
  IconProps,
  Image,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";

import AdviceTip from "./AdviceTip";

interface AdviceTooltipIconProps {
  text: string;
  icon?: ComponentWithAs<"svg", IconProps>;
}
/**
 * A tooltip generated on an icon hoverover with a skull that states whatever text you want for the player.
 * @param props.text The text you want displayed in this tooltip.
 * @param props.icon (optional) Defaults to a filled-in ? info icon. Can be any icon within chakra-ui/icon.
 * @returns A FC Tooltip object where the displayed icon generates the tooltip on hoverover.
 */

const AdviceTooltipIcon: FC<AdviceTooltipIconProps> = ({ text, icon }) => {
  const toolTip = (
    <HStack px={2}>
      <Image
        src={"/images/itemimages/yorick.gif"}
        alt={"Yorick, the Skeleton"}
        boxSize="30px"
        fit="contain"
      />
      <VStack align="stretch" spacing={0.3}>
        <Text bg="gray.200" p={4} rounded="md" fontSize={12}>
          {text}
        </Text>
      </VStack>
    </HStack>
  );

  return (
    <AdviceTip label={toolTip}>
      <Icon as={icon ? icon : InfoIcon} color="gray.500" h={3.5} w={3.5} />
    </AdviceTip>
  );
};

export default AdviceTooltipIcon;
