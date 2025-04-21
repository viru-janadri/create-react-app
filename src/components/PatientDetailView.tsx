import React, { useState } from 'react';
import {
  FlexBox,
  H3,
  Label,
  Item,
  Text,
  TabContext,
  Tabs,
  Button,
  H4
} from "@filament/react";
import {
  GenderMale,
  GenderFemale,
  InformationCircleOutline,
  PersonPortraitCircle,
  Bed,
  ContrastLiquid32,
  Ecg,
  Clock,
  AlarmBellClock,
  MoreHorizontal,
  Print,
  Laptop,
  QuestionmarkCircleOutline,
  Cross
} from "@filament-icons/dls4-react";
import { iconSmall, separatorHorizontal } from "@filament-theme/atomics";
import * as styles from "../styles";

// Define interfaces for props
interface PatientDetailViewProps {
  patientId: number;
  patientName: string;
}

// Define alarm interface with additional properties
interface Alarm {
  time: string;
  device: string;
  deviceType: 'agw' | 'carescape' | 'evita'; // Device type for icon selection
  type: 'info' | 'error' | 'warning';
  description: string;
  addressed: boolean; // Whether the alarm has been addressed
}

const PatientDetailView: React.FC<PatientDetailViewProps> = ({ 
  patientId, 
  patientName
}) => {
  // Mock data - in a real app, this would come from props or API
  const patientData = {
    id: patientId,
    name: patientName,
    gender: 'Male',
    age: '17 years',
    days: '0',
    mrn: '20000010',
    icuBed: '10',
    date: '23 NOV 2018',
    time: '4:30 AM',
    agwData: [
      { channel: 'P1', value: '15 mL/h', eoi: '00:01:06 EOI' },
      { channel: 'P2', value: '27 mL/h', eoi: '00:02:59 EOI' },
      { channel: 'P3', value: '37 mL/h', eoi: '00:03:31 EOI' },
      { channel: 'P4', value: '46 mcg/h, 0.92 mL/h, 50 mcg/mL', eoi: '00:04:35 EOI' },
      { channel: 'P5', value: '2 mmol/h, 0.2 mL/h, 10 mmol/mL', eoi: '00:37:38 EOI' },
      { channel: 'P6', value: '18 mmol/h, 1.8 mL/h, 10 mmol/mL', eoi: '00:01:40 EOI' }
    ],
    carescapeData: [
      { channel: 'HR ECG', value: '63 bpm' },
      { channel: 'Art', value: '128/73 (91) mm Hg' },
      { channel: 'NIBP', value: '123/75 (91) mm Hg' },
      { channel: 'SPO2 Art', value: '92 %' }
    ],
    evitaData: [
      { channel: 'RR', value: '20.68 bpm' },
      { channel: 'PEEP', value: '39 cm H2O' },
      { channel: 'Pl mean', value: '100 cm H2O' },
      { channel: 'VTe', value: '356.09 mL' },
      { channel: 'MVe', value: '4.52 L/min' }
    ],
    // Enhanced alarms with device type and addressed status
    alarms: [
      { time: '10:46', device: 'AGW', deviceType: 'agw', type: 'warning', description: 'End: P2: Near End Of Infusion', addressed: true },
      { time: '10:46', device: 'CARESCAPE', deviceType: 'carescape', type: 'error', description: 'End: Arterial Blood Pressure too high', addressed: true },
      { time: '10:46', device: 'CARESCAPE', deviceType: 'carescape', type: 'info', description: 'End: ECG Sensor Warning', addressed: true },
      { time: '10:46', device: 'AGW', deviceType: 'agw', type: 'warning', description: 'Near End Of Infusion', addressed: false },
      { time: '10:46', device: 'CARESCAPE', deviceType: 'carescape', type: 'error', description: 'Arterial Blood Pressure too high', addressed: false },
      { time: '10:46', device: 'CARESCAPE', deviceType: 'carescape', type: 'info', description: 'ECG Sensor Warning', addressed: false },
      { time: '10:46', device: 'CARESCAPE', deviceType: 'carescape', type: 'error', description: 'End: Arterial Blood Pressure too high', addressed: true },
      { time: '10:46', device: 'CARESCAPE', deviceType: 'carescape', type: 'info', description: 'End: ECG Sensor Warning', addressed: true },
      { time: '10:45', device: 'CARESCAPE', deviceType: 'carescape', type: 'error', description: 'Arterial Blood Pressure too high', addressed: false },
      { time: '10:45', device: 'CARESCAPE', deviceType: 'carescape', type: 'info', description: 'ECG Sensor Warning', addressed: false },
      { time: '10:45', device: 'CARESCAPE', deviceType: 'carescape', type: 'error', description: 'End: Arterial Blood Pressure too high', addressed: true },
      { time: '10:45', device: 'CARESCAPE', deviceType: 'carescape', type: 'info', description: 'End: ECG Sensor Warning', addressed: true },
      { time: '10:45', device: 'CARESCAPE', deviceType: 'carescape', type: 'error', description: 'Arterial Blood Pressure too high', addressed: false },
      { time: '10:45', device: 'CARESCAPE', deviceType: 'carescape', type: 'info', description: 'ECG Sensor Warning', addressed: false }
    ] as Alarm[]
  };

  // Track current filter states
  const [currentRange, setCurrentRange] = useState('1hour');
  const [currentEventType, setCurrentEventType] = useState('all');
  const [currentDeviceType, setCurrentDeviceType] = useState('all');
  
  // Selected tab state
  const [selectedTab, setSelectedTab] = useState('alarms');


  // Get device icon based on device type
  const getDeviceIcon = (deviceType: string, addressed: boolean) => {
    const iconStyle = { 
      color: 'currentColor', 
      display: 'block',
      position: 'relative' as const
    };

    // Select the appropriate icon based on device type
    let DeviceIcon;
    switch (deviceType) {
      case 'agw':
        DeviceIcon = ContrastLiquid32;
        break;
      case 'carescape':
        DeviceIcon = Ecg;
        break;
      case 'evita':
        DeviceIcon = Bed;
        break;
      default:
        DeviceIcon = InformationCircleOutline;
    }

    // If the alarm has been addressed, add an X overlay
    return (
      <div style={{ position: 'relative', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <DeviceIcon className={iconSmall} style={iconStyle} />
        {addressed && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#000' 
          }}>
            <Cross className={iconSmall} style={{ fontSize: '16px', color: deviceType === 'agw' ? '#F5BE00' : deviceType === 'carescape' ? (patientData.alarms.find(a => a.deviceType === deviceType)?.type === 'error' ? '#D8312C' : '#00A3E0') : '#000' }} />
          </div>
        )}
      </div>
    );
  };

  // Get color for alarm description
  const getAlarmColor = (type: string) => {
    switch (type) {
      case 'error':
        return '#D8312C'; // Red for errors
      case 'warning':
        return '#F5BE00'; // Yellow for warnings
      case 'info':
      default:
        return '#00A3E0'; // Blue for info
    }
  };

  return (
    <>
      {/* Improved Patient Info Banner - Full width with proper spacing */}
      <div className={styles.patientInfoBanner} style={{ 
        width: '100%', 
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <FlexBox alignItems="center" gap={16} style={{ width: '98%', justifyContent: 'space-between' }}>
          <H4>PATIENT {patientData.id}</H4>
          
          <FlexBox alignItems="center" gap={36} style={{ flexWrap: 'wrap' }}>
            {/* Group 1 - Gender, Age, ID */}
            <FlexBox alignItems="center" gap={8}>
              {patientData.gender === 'Male' ? 
                <GenderMale /> : 
                <GenderFemale />
              }
              <FlexBox flexDirection="column" style={{ minWidth: '165px' }}>
                <Label>Age: {patientData.age}  Day: {patientData.days}</Label>
                <Label>ID: {patientData.id}</Label>
              </FlexBox>
            </FlexBox>

            {/* Group 2 - ICU */}
            <FlexBox alignItems="center" gap={8}>
              <Bed />
              <Label>ICU {patientData.icuBed}</Label>
            </FlexBox>
            
            {/* Group 3 - Information circle */}
            <FlexBox alignItems="center" gap={8}>
              <InformationCircleOutline />
            </FlexBox>

            {/* Group 4 - ADM */}
            <FlexBox alignItems="center" gap={8}>
              <PersonPortraitCircle />
              <Label>ADM</Label>
            </FlexBox>
            
            {/* Group 5 - ICU CENTRAL */}
            <FlexBox alignItems="center" gap={8}>
              <Laptop />
              <Label>ICU CENTRAL</Label>
            </FlexBox>
            
            {/* Group 6 - Time and Date */}
            <FlexBox alignItems="center" gap={8}>
              <Clock />
              <FlexBox flexDirection="column">
                <Label>{patientData.time}</Label>
                <Label>{patientData.date}</Label>
              </FlexBox>
            </FlexBox>
            
            {/* Group 7 - Question mark */}
            <QuestionmarkCircleOutline />
          </FlexBox>
        </FlexBox>
      </div>
      <hr className={separatorHorizontal} style={{ margin: '0.5rem 0' }} />

      {/* Patient Detail Body - Two-column layout */}
      <div className={styles.patientDetailColumns}>
        {/* Left Column - Patient Vitals */}
        <div className={styles.patientDetailLeftColumn}>
          {/* Improved patient ID header with full width and separator */}
          <div style={{ width: '100%', marginBottom: '0.75rem' }}>
            <FlexBox 
              alignItems="center" 
              justifyContent="space-between" 
              style={{ 
                width: '100%', 
                padding: '0.5rem 0.75rem',
                backgroundColor: 'var(--color-background-primary)'
              }}
            >
              
              <FlexBox alignItems="center" gap={32}>
                <H3>{patientData.id}</H3>
                <FlexBox alignItems="center" gap={100}>
                  <Label>Patient {patientData.id}</Label>
                  <Label variant="descriptor">{patientData.gender} {patientData.age.split(' ')[0]}y</Label>
                  <Label variant="descriptor">MRN: {patientData.mrn}</Label>
                </FlexBox>
              </FlexBox>
            </FlexBox>
            {/* Horizontal separator below the header */}
            <hr className={separatorHorizontal} style={{ margin: '0.5rem 0' }} />
          </div>

          {/* AGW Section */}
          <div className={styles.deviceSection}>
            <FlexBox alignItems="center" gap={8} className={styles.sectionHeading}>
              <ContrastLiquid32 className={iconSmall} style={{ display: 'block', color: 'currentColor' }} />
              <Label variant="descriptor" className={styles.sectionTitle}>AGW - Carefusion</Label>
            </FlexBox>
            
            <div className={styles.deviceReadings}>
              {patientData.agwData.map((item, index) => (
                <FlexBox key={index} justifyContent="space-between" className={styles.readingLine}>
                  <FlexBox gap={8}>
                    <Label style={{ fontWeight: 'bold', width: '3rem' }}>{item.channel}:</Label>
                    <Label>{item.value}</Label>
                  </FlexBox>
                  <Label variant="descriptor">{item.eoi}</Label>
                </FlexBox>
              ))}
            </div>
          </div>

          <hr className={separatorHorizontal} />

          {/* Carescape Section */}
          <div className={styles.deviceSection}>
            <FlexBox alignItems="center" gap={8} className={styles.sectionHeading}>
              <Ecg className={iconSmall} style={{ display: 'block', color: 'currentColor' }} />
              <Label variant="descriptor" className={styles.sectionTitle}>Carescape B450 - GE</Label>
            </FlexBox>
            
            <div className={styles.deviceReadings}>
              {patientData.carescapeData.map((item, index) => (
                <FlexBox key={index} justifyContent="space-between" className={styles.readingLine}>
                  <FlexBox gap={8}>
                    <Label style={{ fontWeight: 'bold', width: '4.5rem' }}>{item.channel}:</Label>
                    <Label>{item.value}</Label>
                  </FlexBox>
                </FlexBox>
              ))}
            </div>
          </div>

          <hr className={separatorHorizontal} />

          {/* Evita Section */}
          <div className={styles.deviceSection}>
            <FlexBox alignItems="center" gap={8} className={styles.sectionHeading}>
              <Bed className={iconSmall} style={{ display: 'block', color: 'currentColor' }} />
              <Label variant="descriptor" className={styles.sectionTitle}>Evita 4 - Drager</Label>
            </FlexBox>
            
            <div className={styles.deviceReadings}>
              {patientData.evitaData.map((item, index) => (
                <FlexBox key={index} justifyContent="space-between" className={styles.readingLine}>
                  <FlexBox gap={8}>
                    <Label style={{ fontWeight: 'bold', width: '4.5rem' }}>{item.channel}:</Label>
                    <Label>{item.value}</Label>
                  </FlexBox>
                </FlexBox>
              ))}
            </div>
          </div>

          <hr className={separatorHorizontal} />

          {/* More Devices */}
          <FlexBox alignItems="center" gap={8} className={styles.moreDevices}>
            <MoreHorizontal className={iconSmall} style={{ display: 'block', color: 'currentColor' }} />
            <Label>More devices</Label>
          </FlexBox>
        </div>

        {/* Right Column - Alarms & Charts */}
        <div className={styles.patientDetailRightColumn}>
          <FlexBox justifyContent="space-between" alignItems="center" className={styles.rightColumnHeader}>
            {/* Main Tabs */}
            <TabContext defaultSelectedKey={selectedTab} onSelectionChange={(key) => setSelectedTab(String(key))}>
                <Tabs isFullWidth>
                  <Item key="alarms">Alarm and events</Item>
                  <Item key="vitals">Vital Signs</Item>
                  <Item key="charts">Charts</Item>
                </Tabs>
              </TabContext>
            
            <Button variant="quiet" aria-label="Print">
              <Print className={iconSmall} style={{ display: 'block', color: 'currentColor' }} />
            </Button>
          </FlexBox>

          {/* Tab Content based on selection */}
          {selectedTab === 'alarms' && (
            <>
              <div className={styles.filterSection}>
                {/* Range Filter */}
                <FlexBox alignItems="center" gap={8}>
                  <Label>Range:</Label>
                  <TabContext defaultSelectedKey={currentRange} onSelectionChange={(key) => setCurrentRange(String(key))}>
                      <Tabs>
                        <Item key="1hour">1 hour</Item>
                        <Item key="6hours">6 hours</Item>
                        <Item key="12hours">12 hours</Item>
                        <Item key="1day">1 day</Item>
                        <Item key="7days">7 days</Item>
                        <Item key="all">all</Item>
                      </Tabs>
                    </TabContext>
                </FlexBox>

                {/* Event Type Filter */}
                <FlexBox alignItems="center" gap={8} style={{ marginTop: '12px' }}>
                  <Label>Event:</Label>
                  <TabContext defaultSelectedKey={currentEventType} onSelectionChange={(key) => setCurrentEventType(String(key))}>
                    <Tabs>
                      <Item key="all">all</Item>
                      <Item key="info">
                        <InformationCircleOutline className={iconSmall} style={{ display: 'block', color: 'currentColor' }} />
                      </Item>
                      <Item key="warning">
                        <AlarmBellClock className={iconSmall} style={{ color: '#00A3E0', display: 'block' }} />
                      </Item>
                      <Item key="caution">
                        <AlarmBellClock className={iconSmall} style={{ color: '#F5BE00', display: 'block' }} />
                      </Item>
                      <Item key="error">
                        <AlarmBellClock className={iconSmall} style={{ color: '#D8312C', display: 'block' }} />
                      </Item>
                    </Tabs>
                  </TabContext>
                </FlexBox>

                {/* Device Filter */}
                <FlexBox alignItems="center" gap={8} style={{ marginTop: '12px' }}>
                  <Label>Devices:</Label>
                  <TabContext defaultSelectedKey={currentDeviceType} onSelectionChange={(key) => setCurrentDeviceType(String(key))}>
                    <Tabs>
                      <Item key="all">all</Item>
                      <Item key="agw">
                        <ContrastLiquid32 className={iconSmall} style={{ display: 'block', color: 'currentColor' }} />
                      </Item>
                      <Item key="carescape">
                        <Ecg className={iconSmall} style={{ display: 'block', color: 'currentColor' }} />
                      </Item>
                      <Item key="evita">
                        <Bed className={iconSmall} style={{ display: 'block', color: 'currentColor' }} />
                      </Item>
                    </Tabs>
                  </TabContext>
                </FlexBox>
              </div>

              {/* Alarms Table */}
              <div className={styles.alarmTable}>
                <div className={styles.tableHeader}>
                  <div className={styles.timeColumn}>Time</div>
                  <div className={styles.deviceColumn}>Device</div>
                  <div className={styles.descriptionColumn}>Description</div>
                </div>
                
                {patientData.alarms.map((alarm, index) => (
                  <div className={styles.tableRow} key={index}>
                    <div className={styles.timeColumn}>{alarm.time}</div>
                    <div className={styles.deviceColumn} style={{ display: 'flex', justifyContent: 'center' }}>
                      {getDeviceIcon(alarm.deviceType, alarm.addressed)}
                    </div>
                    <div 
                      className={styles.descriptionColumn}
                      style={{ 
                        color: getAlarmColor(alarm.type)
                      }}
                    >
                      {alarm.description}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {selectedTab === 'vitals' && (
            <Text marginY="1rem">Vital signs information would display here.</Text>
          )}

          {selectedTab === 'charts' && (
            <Text marginY="1rem">Patient charts would display here.</Text>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientDetailView;