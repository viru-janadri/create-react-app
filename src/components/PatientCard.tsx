import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  FlexBox,
  H3,
  Button,
  Label,
} from "@filament/react";
import {
  PlugIn,
  ContrastLiquid32,
  Ecg,
  MoreHorizontal,
  InformationCircleOutline,
  AccumulateAlerts,
  AlarmBellClock
} from "@filament-icons/dls4-react";
import { iconSmall, separatorHorizontal } from "@filament-theme/atomics";
import * as styles from "../styles";
import AlarmProgressBar, { AlarmType } from './AlarmProgressBar';

import { PredictiveAlarmService } from '../services/PredictiveAlarmService';


// Define devices
const DEVICES = [
  { name: 'AGW', icon: ContrastLiquid32, channels: ['P1', 'P2', 'P3', 'P4'] },
  { name: 'CARESCAPE', icon: Ecg, channels: ['HR ECG', 'NBP', 'SpO2', 'RR'] }
];

// Define alarm types
const CYAN_ALARMS = [
  'Battery Low',
  'ECG sensor warning',
  'Sensor disconnected',
  'Cuff needs calibration',
  'Check line position'
];

const RED_ALARMS = [
  'Pump disconnected',
  'RR Low',
  'HR High',
  'HR Low',
  'SpO2 Low',
  'NBP High'
];

const YELLOW_ALARMS = [
  'Near End Of Infusion',
  'End: Near End Of Infusion',
  
];

// Define normal readings
const NORMAL_READINGS = {
  'P1': 'Amiodarone 10 ng/mL/min',
  'P2': 'Noradrenaline 14 ng/mL/min',
  'P3': '',
  'P4': 'Frusemide 12 ng/mL/min',
  'HR ECG': '75 bpm',
  'NBP': '112/66 (89) mm Hg',
  'SpO2': '98%',
  'RR': '14 brpm'
};

interface Alarm {
  id: string;
  deviceIndex: number; // Index in DEVICES array
  channelIndex: number; // Index in device's channels array
  message: string;
  timestamp: string;
  type: AlarmType;
}

interface PatientCardProps {
  id: number;
  name: string;
  onHeaderClick?: () => void; // New prop for handling header clicks
}

const PatientCard: React.FC<PatientCardProps> = ({ id, name, onHeaderClick }) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [showAlarms, setShowAlarms] = useState(false);

  const predictions = PredictiveAlarmService.getPatientPredictions(id);
  const hasPrediction = predictions.length > 0;

  // Function to generate a random alarm
  const generateRandomAlarm = (): Alarm => {
    // Random device (AGW or CARESCAPE)
    const deviceIndex = Math.floor(Math.random() * DEVICES.length);
    const device = DEVICES[deviceIndex];
    
    // Random channel in that device
    const channelIndex = Math.floor(Math.random() * device.channels.length);
    
    // Random alarm type (70% chance of cyan, 30% chance of red)
    const type: AlarmType = Math.random() < 0.7 ? 'cyan' : 'red';
    
    // Get appropriate message based on type
    const messages = type === 'cyan' ? CYAN_ALARMS : RED_ALARMS;
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return {
      id: Math.random().toString(36).substring(2, 9),
      deviceIndex,
      channelIndex,
      message,
      timestamp: formattedTime,
      type
    };
  };

  // Randomly add alarms (simulation)
  useEffect(() => {
    // Add alarm every 5 seconds for testing
    const timer = setInterval(() => {
      if (alarms.length < 5) { // Continue adding alarms even when viewing details
        setAlarms(current => [...current, generateRandomAlarm()]);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [alarms]); // Remove showAlarms dependency

  // Handle clicking on the progress bar
  const handleProgressBarClick = () => {
    if (alarms.length > 0) {
      setShowAlarms(true);
    }
  };

  // Handle dismissing all alarms
  const handleDismissAlarms = () => {
    setShowAlarms(false);
    setAlarms([]);
  };

  // Check if there's any red alarm
  const hasRedAlarm = alarms.some(alarm => alarm.type === 'red');

  // Determine appropriate icon for the header
  const getHeaderIcon = () => {
    if (showAlarms) {
      return hasRedAlarm ? <AlarmBellClock className={iconSmall} /> : <AccumulateAlerts className={iconSmall} />;
    }
    return <PlugIn className={iconSmall} />;
  };

  // Get background color based on alarm status - apply to card but not header
  const getCardBackgroundColor = () => {
    if (!showAlarms) return undefined;
    return hasRedAlarm ? 'rgba(216, 49, 44, 0.1)' : 'rgba(0, 163, 224, 0.1)';
  };

  // Get label style based on device index
  const getLabelStyle = (deviceIndex: number) => {
    return {
      fontWeight: 'bold',
      width: deviceIndex === 0 ? '2.5rem' : '4.5rem', // Wider for CARESCAPE
      flexShrink: 0
    };
  };

  // Render device sections
  const renderDeviceSections = () => {
    return (
      <>
        {DEVICES.map((device, deviceIndex) => (
          <React.Fragment key={deviceIndex}>
            {deviceIndex > 0 && <hr className={separatorHorizontal} />}
            <FlexBox elementType="section" flexDirection="column" className={styles.section}>
              <FlexBox alignItems="center" gap={8} className={styles.sectionHeading}>
                <FlexBox style={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
                  <device.icon className={iconSmall} />
                </FlexBox>
                <Label variant="descriptor" className={styles.sectionTitle}>{device.name}</Label>
              </FlexBox>
              
              <FlexBox flexDirection="column" className={styles.medicationContainer} style={{ marginLeft: '24px' }}>
                {device.channels.map((channel, channelIndex) => {
                  // Find if there's an alarm for this channel
                  const alarm = showAlarms 
                    ? alarms.find(a => a.deviceIndex === deviceIndex && a.channelIndex === channelIndex)
                    : null;
                    
                  return (
                    <FlexBox key={channelIndex} className={styles.medicationLine} justifyContent="space-between">
                      <FlexBox alignItems="center">
                        {/* Icon column - aligned with device icon, not device name */}
                        <FlexBox style={{ width: '24px', marginLeft: '-24px' }}>
                          {alarm && (
                            alarm.type === 'red' 
                              ? <AlarmBellClock className={iconSmall} style={{ color: '#D8312C' }} />
                              : <InformationCircleOutline className={iconSmall} style={{ color: '#00A3E0' }} />
                          )}
                        </FlexBox>
                        <Label style={getLabelStyle(deviceIndex)}>{channel}:</Label>
                        <Label>{alarm ? alarm.message : NORMAL_READINGS[channel as keyof typeof NORMAL_READINGS]}</Label>
                      </FlexBox>
                      {alarm && (
                        <Label variant="descriptor" style={{ fontSize: '0.75rem' }}>{alarm.timestamp}</Label>
                      )}
                    </FlexBox>
                  );
                })}
              </FlexBox>
            </FlexBox>
          </React.Fragment>
        ))}
        
        {/* More devices section with horizontal separator */}
        <hr className={separatorHorizontal} />
        <FlexBox elementType="section" flexDirection="column" className={styles.section}>
          <FlexBox alignItems="center" gap={8} className={styles.sectionHeading}>
            <Button variant="quiet" className={styles.moreDevicesButton}>
              <FlexBox alignItems="center" gap={4}>
                <MoreHorizontal className={iconSmall} />
                More devices
              </FlexBox>
            </Button>
          </FlexBox>
        </FlexBox>
      </>
    );
  };

  return (
    <Card 
      className={styles.patientCard} 
      style={{ 
        backgroundColor: getCardBackgroundColor()
      }}
    >
      {/* Patient header with name and icon - now clickable */}
      <div 
        onClick={onHeaderClick} 
        style={{ cursor: onHeaderClick ? 'pointer' : 'default' }}
      >
        <CardHeader className={styles.patientCardHeader}>
          <FlexBox justifyContent="space-between" alignItems="center">
            <H3 noGutter>Patient {id}, {name}</H3>
            <FlexBox gap={8}>
              {hasPrediction && (
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  backgroundColor: predictions[0].level === 'high' ? '#D8312C' : 
                                  predictions[0].level === 'medium' ? '#F5BE00' : 
                                  '#00A3E0',
                  boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)'
                }} />
              )}
              <Button variant="primary" isIconOnly aria-label="Status">
                {getHeaderIcon()}
              </Button>
            </FlexBox>
          </FlexBox>
        </CardHeader>
      </div>
      
      {/* Progress bar instead of horizontal separator */}
      <AlarmProgressBar 
        alarms={alarms.map(alarm => ({ id: alarm.id, type: alarm.type }))} 
        onClickProgress={handleProgressBarClick}
      />

      {/* Content container */}
      <div className={styles.sectionContainer}>
        {/* Device sections */}
        {renderDeviceSections()}
        
        {/* Control buttons */}
        {showAlarms && (
          <FlexBox justifyContent="flex-end" style={{ marginTop: '0.5rem' }} >
            <Button 
              variant="quiet" 
              onPress={handleDismissAlarms}
              style={{ padding: '0.25rem' }}
            >
              Dismiss All Alarms
            </Button>
          </FlexBox>
        )}
      </div>

      {/* Pump information */}
      <div className={styles.sectionContainer}>
        <FlexBox alignItems="center" gap={4}>
          <InformationCircleOutline className={iconSmall} />
          <Label>Pump 2: Next EOI: 0h13m</Label>
        </FlexBox>
      </div>
    </Card>
  );
};

export default PatientCard;