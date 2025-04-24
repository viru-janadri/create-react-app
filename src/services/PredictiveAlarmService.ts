export type PredictionLevel = 'low' | 'medium' | 'high';

export interface Prediction {
  id: string;
  patientId: number;
  patientName: string;
  vitalSign: string;
  currentValue: string;
  message: string;
  confidence: number; // 0-100
  timeToAlarm: string;
  recommendation: string;
  level: PredictionLevel;
  timestamp: string;
}

// Simple mock data for the prototype
const mockPredictions: Prediction[] = [
  {
    id: 'pred-001',
    patientId: 1,
    patientName: 'Anderson',
    vitalSign: 'HR & BP',
    currentValue: 'HR: 84, BP: 135/82',
    message: 'Trending toward hypertensive episode',
    confidence: 78,
    timeToAlarm: '~3 hours',
    recommendation: 'Consider BP check in next 30 min',
    level: 'medium',
    timestamp: new Date().toLocaleTimeString()
  },
  {
    id: 'pred-002',
    patientId: 3,
    patientName: 'Rodriguez',
    vitalSign: 'SpO2',
    currentValue: 'SpO2: 94%',
    message: 'Gradual O2 saturation decline detected',
    confidence: 92,
    timeToAlarm: '~1 hour',
    recommendation: 'Increase O2 flow rate by 1L/min',
    level: 'high',
    timestamp: new Date().toLocaleTimeString()
  },
  {
    id: 'pred-003',
    patientId: 7,
    patientName: 'Kim',
    vitalSign: 'RR',
    currentValue: 'RR: 20 brpm',
    message: 'Subtle respiration pattern change',
    confidence: 65,
    timeToAlarm: '~5 hours',
    recommendation: 'Monitor closely, no action needed yet',
    level: 'low',
    timestamp: new Date().toLocaleTimeString()
  }
];

export const PredictiveAlarmService = {
  // Get predictions for all patients
  getAllPredictions: () => {
    return mockPredictions;
  },
  
  // Get predictions for a specific patient
  getPatientPredictions: (patientId: number) => {
    return mockPredictions.filter(pred => pred.patientId === patientId);
  }
};