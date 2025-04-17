import React, { useState } from 'react';
import {
  FlexBox,
  H3,
  Label,
  H1,
  Item,
  Text,
  TabContext,
  Tabs,
  TabPanels,
  Button
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
  QuestionmarkCircleOutline
} from "@filament-icons/dls4-react";
import { iconSmall, separatorHorizontal } from "@filament-theme/atomics";
import * as styles from "../styles";

// Define interfaces for props
interface PatientDetailViewProps {
  patientId: number;
  patientName: string;
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
    alarms: [
      { time: '09:55', device: 'MON', type: 'info', description: 'End: ECG Sensor Warning' },
      { time: '09:55', device: 'MON', type: 'error', description: 'End: Arterial Blood Pressure too high' },
      { time: '09:55', device: 'MON', type: 'error', description: 'Arterial Blood Pressure too high' },
      { time: '09:55', device: 'MON', type: 'info', description: 'ECG Sensor Warning' },
      { time: '09:55', device: 'MON', type: 'info', description: 'End: ECG Sensor Warning' },
      { time: '09:55', device: 'MON', type: 'error', description: 'End: Arterial Blood Pressure too high' }
    ]
  };

  // Track current filter states
  const [currentRange, setCurrentRange] = useState('1hour');
  const [currentEventType, setCurrentEventType] = useState('all');
  const [currentDeviceType, setCurrentDeviceType] = useState('all');

  return (
    <>
      {/* Patient Info Banner */}
      <div className={styles.patientInfoBanner}>
        <FlexBox alignItems="center" gap={16}>
          <H3>PATIENT {patientData.id}</H3>
          <FlexBox alignItems="center" gap={8}>
            {patientData.gender === 'Male' ? 
              <span className={styles.iconWrapper}><GenderMale className={iconSmall} /></span> : 
              <span className={styles.iconWrapper}><GenderFemale className={iconSmall} /></span>
            }
            <FlexBox flexDirection="column">
              <Label>Age: {patientData.age}  Day: {patientData.days}</Label>
              <Label>ID: {patientData.id}</Label>
            </FlexBox>
          </FlexBox>
          <FlexBox alignItems="center" gap={8}>
            <span className={styles.iconWrapper}><Bed className={iconSmall} /></span>
            <Label>ICU {patientData.icuBed}</Label>
          </FlexBox>
          <span className={styles.iconWrapper}><InformationCircleOutline className={iconSmall} /></span>
          <FlexBox alignItems="center" gap={8}>
            <span className={styles.iconWrapper}><PersonPortraitCircle className={iconSmall} /></span>
            <Label>ADM</Label>
          </FlexBox>
          <FlexBox alignItems="center" gap={8}>
            <span className={styles.iconWrapper}><Laptop className={iconSmall} /></span>
            <Label>ICU CENTRAL</Label>
          </FlexBox>
          <FlexBox alignItems="center" gap={8}>
            <span className={styles.iconWrapper}><Clock className={iconSmall} /></span>
            <FlexBox flexDirection="column">
              <Label>{patientData.time}</Label>
              <Label>{patientData.date}</Label>
            </FlexBox>
          </FlexBox>
          <span className={styles.iconWrapper}><QuestionmarkCircleOutline className={iconSmall} /></span>
        </FlexBox>
      </div>

      {/* Patient Detail Body */}
      <div className={styles.patientDetailColumns}>
        {/* Left Column - Patient Vitals */}
        <div className={styles.patientDetailLeftColumn}>
          <FlexBox alignItems="center" justifyContent="space-between" className={styles.patientDetailHeader}>
            <FlexBox alignItems="center" gap={8}>
              <H3>{patientData.id}</H3>
              <FlexBox alignItems="center" gap={4}>
                <Label>Patient {patientData.id}</Label>
                <Label variant="descriptor">{patientData.gender} {patientData.age.split(' ')[0]}y</Label>
                <Label variant="descriptor">MRN: {patientData.mrn}</Label>
              </FlexBox>
            </FlexBox>
          </FlexBox>

          {/* AGW Section */}
          <div className={styles.deviceSection}>
            <FlexBox alignItems="center" gap={8} className={styles.sectionHeading}>
              <span className={styles.iconWrapper}><ContrastLiquid32 className={iconSmall} /></span>
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
              <span className={styles.iconWrapper}><Ecg className={iconSmall} /></span>
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
              <span className={styles.iconWrapper}><Bed className={iconSmall} /></span>
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
            <span className={styles.iconWrapper}><MoreHorizontal className={iconSmall} /></span>
            <Label>More devices</Label>
          </FlexBox>
        </div>

        {/* Right Column - Alarms & Charts */}
        <div className={styles.patientDetailRightColumn}>
          <FlexBox justifyContent="space-between" alignItems="center" className={styles.rightColumnHeader}>
            {/* Main Tabs for Alarm and Events, Vital Signs, Charts */}
            <TabContext>
              <Tabs isFullWidth>
                <Item key="alarms">Alarm and events</Item>
                <Item key="vitals">Vital Signs</Item>
                <Item key="charts">Charts</Item>
              </Tabs>
              <TabPanels>
                {/* Alarm and Events Panel */}
                <Item key="alarms">
                  <div className={styles.filterSection}>
                    {/* Range Filter Tabs */}
                    <FlexBox alignItems="center" gap={8}>
                      <Label>Range:</Label>
                      <TabContext>
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

                    {/* Event Type Filter Tabs */}
                    <FlexBox alignItems="center" gap={8} style={{ marginTop: '12px' }}>
                      <Label>Event:</Label>
                      <TabContext>
                        <Tabs>
                          <Item key="all">all</Item>
                          <Item key="info">
                            <span className={styles.iconWrapper}><InformationCircleOutline className={iconSmall} /></span>
                          </Item>
                          <Item key="warning">
                            <span className={styles.iconWrapper}><AlarmBellClock className={iconSmall} style={{ color: '#00A3E0' }} /></span>
                          </Item>
                          <Item key="caution">
                            <span className={styles.iconWrapper}><AlarmBellClock className={iconSmall} style={{ color: '#F5BE00' }} /></span>
                          </Item>
                          <Item key="error">
                            <span className={styles.iconWrapper}><AlarmBellClock className={iconSmall} style={{ color: '#D8312C' }} /></span>
                          </Item>
                        </Tabs>
                      </TabContext>
                    </FlexBox>

                    {/* Device Filter Tabs */}
                    <FlexBox alignItems="center" gap={8} style={{ marginTop: '12px' }}>
                      <Label>Devices:</Label>
                      <TabContext>
                        <Tabs>
                          <Item key="all">all</Item>
                          <Item key="agw">
                            <span className={styles.iconWrapper}><ContrastLiquid32 className={iconSmall} /></span>
                          </Item>
                          <Item key="carescape">
                            <span className={styles.iconWrapper}><Ecg className={iconSmall} /></span>
                          </Item>
                          <Item key="evita">
                            <span className={styles.iconWrapper}><Bed className={iconSmall} /></span>
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
                        <div className={styles.deviceColumn}>{alarm.device}</div>
                        <div 
                          className={styles.descriptionColumn}
                          style={{ 
                            color: alarm.type === 'error' ? '#D8312C' : '#00A3E0'
                          }}
                        >
                          {alarm.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </Item>

                {/* Vital Signs Panel */}
                <Item key="vitals">
                  <Text marginY="1rem">Vital signs information would display here.</Text>
                </Item>

                {/* Charts Panel */}
                <Item key="charts">
                  <Text marginY="1rem">Patient charts would display here.</Text>
                </Item>
              </TabPanels>
            </TabContext>
            
            <Button variant="quiet" aria-label="Print">
              <span className={styles.iconWrapper}><Print className={iconSmall} /></span>
            </Button>
          </FlexBox>
        </div>
      </div>
    </>
  );
};

export default PatientDetailView;