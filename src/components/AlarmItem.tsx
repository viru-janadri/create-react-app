import React from "react";
import { FlexBox, Label } from "@filament/react";
import { AlarmBellClock } from "@filament-icons/dls4-react";
import { iconSmall } from "@filament-theme/atomics";
import * as styles from "../styles";

interface AlarmItemProps {
  message: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
}
export const AlarmItem: React.FC<AlarmItemProps> = ({
  message,
  timestamp,
  severity,
}) => {
  // Get color based on severity
  const getSeverityColor = () => {
    switch (severity) {
      case "high":
        return "var(--color-error)";
      case "medium":
        return "var(--color-warning)";
      case "low":
      default:
        return "var(--color-success)";
    }
  };

  return (
    <FlexBox
      alignItems="center"
      gap={8}
      style={{
        padding: "0.5rem",
        borderLeft: `3px solid ${getSeverityColor()}`,
        backgroundColor: "var(--color-background-secondary)",
        marginBottom: "0.25rem",
        borderRadius: "0 2px 2px 0",
      }}
    >
      <AlarmBellClock
        className={iconSmall}
        style={{ color: getSeverityColor() }}
      />
      <FlexBox flexDirection="column" gap={2}>
        <Label style={{ fontWeight: "bold" }}>{message}</Label>
        <Label variant="descriptor" style={{ fontSize: "0.75rem" }}>
          {timestamp}
        </Label>
      </FlexBox>
    </FlexBox>
  );
};

export default AlarmItem;
