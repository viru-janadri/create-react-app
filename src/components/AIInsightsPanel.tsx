import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  H3,
  FlexBox,
  Label,
  Button,
} from "@filament/react";
import { InformationCircleOutline } from "@filament-icons/dls4-react";
import { AiBoxLabel } from "@filament-icons/react";

import { iconSmall } from "@filament-theme/atomics";
import {
  Prediction,
  PredictiveAlarmService,
} from "../services/PredictiveAlarmService";

interface AIInsightsPanelProps {
  onClose: () => void;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  onClose,
}) => {
  // Get all predictions from the service
  const predictions = PredictiveAlarmService.getAllPredictions();

  // Get color based on prediction level
  const getLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "#D8312C";
      case "medium":
        return "#F5BE00";
      case "low":
      default:
        return "#00A3E0";
    }
  };

  return (
    <Card
      style={{
        position: "absolute",
        top: "80px",
        left: "90px",
        width: "500px",
        zIndex: 100,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardHeader>
        <FlexBox justifyContent="space-between" alignItems="center">
          <FlexBox alignItems="center" gap={8}>
            <AiBoxLabel className={iconSmall} />
            <H3>AI Predictive Insights</H3>
          </FlexBox>
          <Button variant="quiet" onPress={onClose} aria-label="Close">
            ✕
          </Button>
        </FlexBox>
      </CardHeader>
      <CardContent>
        <Label variant="descriptor" style={{ marginBottom: "16px" }}>
          Showing early warning predictions before conventional alarms would
          trigger
        </Label>

        {predictions.length === 0 ? (
          <FlexBox alignItems="center" gap={8} style={{ padding: "16px" }}>
            <InformationCircleOutline className={iconSmall} />
            <Label>No current predictions available</Label>
          </FlexBox>
        ) : (
          predictions.map((prediction) => (
            <FlexBox
              key={prediction.id}
              flexDirection="column"
              style={{
                padding: "12px",
                marginBottom: "8px",
                borderLeft: `3px solid ${getLevelColor(prediction.level)}`,
                backgroundColor: "var(--color-background-secondary)",
                borderRadius: "0 2px 2px 0",
              }}
            >
              <FlexBox justifyContent="space-between" alignItems="center">
                <Label style={{ fontWeight: "bold" }}>
                  Patient {prediction.patientId}: {prediction.patientName}
                </Label>
                <Label
                  variant="descriptor"
                  style={{
                    backgroundColor: getLevelColor(prediction.level),
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                  }}
                >
                  {prediction.confidence}% confidence
                </Label>
              </FlexBox>

              <FlexBox
                flexDirection="column"
                gap={4}
                style={{ marginTop: "8px" }}
              >
                <Label>{prediction.message}</Label>
                <Label variant="descriptor">
                  Current: {prediction.currentValue} • Time to alarm:{" "}
                  {prediction.timeToAlarm}
                </Label>
                <Label style={{ fontWeight: "bold", marginTop: "4px" }}>
                  Recommendation: {prediction.recommendation}
                </Label>
              </FlexBox>
            </FlexBox>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
