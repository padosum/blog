import { Button, StyledOcticon } from "@primer/components";
import { CheckIcon, CopyIcon } from "@primer/octicons-react";
import copy from "copy-to-clipboard";
import React from "react";

function ClipboardCopy({ value }) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Button
      px={2}
      aria-label="Copy to clipboard"
      onClick={() => {
        copy(value);
        setCopied(true);
      }}
      backgroundColor="bg.primary"
      sx={{
        ":hover": {
          backgroundColor: "bg.alt",
        },
      }}
    >
      {copied ? (
        <StyledOcticon icon={CheckIcon} color="text.link" />
      ) : (
        <StyledOcticon icon={CopyIcon} color="text.placeholder" />
      )}
    </Button>
  );
}

export default ClipboardCopy;
