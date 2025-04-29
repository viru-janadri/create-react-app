import React from "react";
import {
  FlexBox,
  Label,
  ProgressLinear,
  type ProgressLinearProps,
} from "@filament/react";

// Define the alarm type
export type AlarmType = "cyan" | "red";

interface AlarmProgressBarProps {
  alarms: Array<{ id: string; type: AlarmType }>;
  onClickProgress: () => void;
}

export const AlarmProgressBar: React.FC<AlarmProgressBarProps> = ({
  alarms,
  onClickProgress,
}) => {
  // Check if there's any red alarm
  const hasRedAlarm = alarms.some((alarm) => alarm.type === "red");

  // Calculate progress percentage - maximum of 5 alarms
  const MAX_ALARMS = 5;
  const progressValue = (alarms.length / MAX_ALARMS) * 100;

  return (
    <div style={{ padding: "0 8px", marginTop: "4px", marginBottom: "8px" }}>
      {/* Progress text */}
      <FlexBox justifyContent="space-between" style={{ marginBottom: "4px" }}>
        <Label variant="descriptor" style={{ fontSize: "0.75rem" }}>
          Alarms: {alarms.length}
        </Label>
        {alarms.length > 0 && (
          <Label
            variant="descriptor"
            style={{
              fontSize: "0.75rem",
              color: hasRedAlarm ? "#D8312C" : "#00A3E0",
              fontWeight: "bold",
            }}
          >
            Click to view
          </Label>
        )}
      </FlexBox>

      {/* Wrapper div to handle click events */}
      <div
        onClick={alarms.length > 0 ? onClickProgress : undefined}
        style={{
          cursor: alarms.length > 0 ? "pointer" : "default",
        }}
        role={alarms.length > 0 ? "button" : undefined}
        aria-label={alarms.length > 0 ? "View alarms" : undefined}
        tabIndex={alarms.length > 0 ? 0 : undefined}
      >
        {/* Use the Filament React ProgressLinear component */}
        <ProgressLinear
          value={progressValue}
          // Use danger signal for red alarms, default for cyan
          signal={hasRedAlarm ? "danger" : undefined}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Alarm Progress Bar"
        />
      </div>
    </div>
  );
};

export default AlarmProgressBar;
