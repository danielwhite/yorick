import { Familiar, myFamiliar, myHash } from "kolmafia";
import { have } from "libram";
import { FC } from "react";

import AsyncButton, { AsyncButtonProps } from "./AsyncButton";

interface FamiliarButtonsProps extends AsyncButtonProps {
  linkedContent: Familiar;
}

const FamiliarButtons: FC<FamiliarButtonsProps> = ({
  linkedContent,
  ...props
}) => {
  const linkID = linkedContent.id;

  const haveOut = myFamiliar() === linkedContent;

  if (!have(linkedContent) || haveOut) return null;

  return (
    <AsyncButton
      href={`/familiar.ph?&action=newfam&newfam=${linkID}&pwd=${myHash()}`}
      {...props}
    >
      take
    </AsyncButton>
  );
};

export default FamiliarButtons;
