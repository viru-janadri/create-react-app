import React, { useState } from 'react';
import {
  FlexBox,
  Button,
  Label,
  Text,
  TextBox,
  H3,
  Item,
  Dropdown,
  DatePicker
} from "@filament/react";
import {
  PersonPortraitCircle,
  Laptop,
  Clock,
  QuestionmarkCircleOutline,
} from "@filament-icons/dls4-react";
import { separatorHorizontal } from "@filament-theme/atomics";
import * as styles from "../styles";

interface SearchPatientPageProps {
  onSelectPatient: (id: number, name: string) => void;
  onCancel: () => void;
}

// Define Patient type
type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  birthdate: string;
  patientCode: string;
  bed: string;
  location?: string;
};

const SearchPatientPage: React.FC<SearchPatientPageProps> = ({ 
  onSelectPatient,
  onCancel
}) => {
  // State for search filters
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [sex, setSex] = useState<string>('');
  const [patientCode, setPatientCode] = useState('');
  const [location, setLocation] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Mock patient data for the search results
  const mockPatients: Patient[] = [
    { id: 1, firstName: 'Test', lastName: 'Patient', gender: 'M', age: '35', birthdate: '', patientCode: '3342', bed: '101' },
    { id: 2, firstName: 'Care', lastName: 'Patient 1', gender: 'M', age: '35', birthdate: '03/11/1990', patientCode: '20000001', bed: '102' },
    { id: 3, firstName: 'Jim', lastName: 'Patient 2', gender: 'M', age: '32', birthdate: '07/05/1993', patientCode: '20000002', bed: '103' },
    { id: 4, firstName: 'Joe', lastName: 'Patient 3', gender: 'M', age: '36', birthdate: '07/05/1989', patientCode: '20000003', bed: '104' },
    { id: 5, firstName: 'Rose', lastName: 'Patient 4', gender: 'F', age: '33', birthdate: '03/05/1992', patientCode: '20000004', bed: '105' },
    { id: 6, firstName: 'Ellen', lastName: 'Patient 5', gender: 'F', age: '38', birthdate: '03/09/1987', patientCode: '20000005', bed: '106' },
    { id: 7, firstName: 'Bill', lastName: 'Patient 6', gender: 'M', age: '58', birthdate: '03/11/1967', patientCode: '20000006', bed: '107' },
    { id: 8, firstName: 'Mark', lastName: 'Patient 7', gender: 'M', age: '58', birthdate: '03/12/1967', patientCode: '20000007', bed: '108' },
    { id: 9, firstName: 'Aaron', lastName: 'Patient 8', gender: 'M', age: '65', birthdate: '01/12/1960', patientCode: '20000008', bed: '109' },
  ];

  // Filter patients based on search criteria
  const filteredPatients = mockPatients.filter(patient => {
    const matchesFirstName = firstName === '' || 
      patient.firstName.toLowerCase().includes(firstName.toLowerCase());
    const matchesLastName = lastName === '' || 
      patient.lastName.toLowerCase().includes(lastName.toLowerCase());
    
    // Handle Date objects for birthdate filtering
    const matchesBirthdate = !birthdate || 
      (patient.birthdate && new Date(patient.birthdate).toDateString() === birthdate.toDateString());
      
    const matchesSex = sex === '' || 
      patient.gender === sex;
    const matchesPatientCode = patientCode === '' || 
      patient.patientCode.includes(patientCode);
    const matchesLocation = location === '' || 
      (patient.location && patient.location.toLowerCase().includes(location.toLowerCase()));
    
    return matchesFirstName && matchesLastName && matchesBirthdate && 
           matchesSex && matchesPatientCode && matchesLocation;
  });

  // Handle patient selection from row click
  const handlePatientRowClick = (patient: Patient) => {
    setSelectedPatient(patient);
    // Navigate directly to patient details
    onSelectPatient(patient.id, patient.lastName);
  };

  // Handle clear button click
  const handleClearFilters = () => {
    setFirstName('');
    setLastName('');
    setBirthdate(null);
    setSex('');
    setPatientCode('');
    setLocation('');
    setSelectedPatient(null);
  };

  // Current date and time for the header
  const now = new Date();
  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  return (
    <>
      {/* Patient Info Banner - Modified for search page */}
      <div className={styles.patientInfoBanner} style={{ 
        width: '100%', 
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <FlexBox alignItems="center" gap={16} style={{ width: '98%', justifyContent: 'space-between' }}>
          <Button 
            variant="quiet" 
            onPress={onCancel}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Dashboard
          </Button>
          
          <FlexBox alignItems="center" gap={36} style={{ flexWrap: 'wrap' }}>
            <FlexBox alignItems="center" gap={8}>
              <PersonPortraitCircle />
              <Label>ADM</Label>
            </FlexBox>
            
            <FlexBox alignItems="center" gap={8}>
              <Laptop  />
              <Label>ICU CENTRAL</Label>
            </FlexBox>
            
            <FlexBox alignItems="center" gap={8}>
              <Clock  />
              <FlexBox flexDirection="column">
                <Label>{formattedTime}</Label>
                <Label>{formattedDate}</Label>
              </FlexBox>
            </FlexBox>
            
            <QuestionmarkCircleOutline  />
          </FlexBox>
        </FlexBox>
      </div>
      <hr className={separatorHorizontal} style={{ margin: '0.5rem 0' }} />

      {/* Enhanced Search Form */}
      <div style={{ padding: '1rem' }}>
        <FlexBox flexDirection="column" gap={16}>
          <H3>Patient Search</H3>
          
          {/* Advanced Search Filters - Redesigned to match screenshot */}
          <FlexBox 
            style={{ 
              backgroundColor: 'var(--color-background-secondary)',
              padding: '1.5rem',
              borderRadius: '4px',
              border: '1px solid var(--color-neutral-20)'
            }} 
            flexDirection="column" 
            gap={16}
          >
            {/* First Row: First Name, Last Name */}
            <FlexBox gap={16} style={{ width: '100%' }}>
              <FlexBox flexDirection="column" style={{ width: '48%' }}>
                <Label htmlFor="firstName" style={{ marginBottom: '4px' }}>First name</Label>
                <TextBox 
                  id="firstName"
                  value={firstName}
                  onChange={setFirstName}
                  placeholder="Enter first name"
                  style={{ width: '100%' }}
                />
              </FlexBox>
              
              <FlexBox flexDirection="column" style={{ width: '48%' }}>
                <Label htmlFor="lastName" style={{ marginBottom: '4px' }}>Last name</Label>
                <TextBox 
                  id="lastName"
                  value={lastName}
                  onChange={setLastName}
                  placeholder="Enter last name"
                  style={{ width: '100%' }}
                />
              </FlexBox>
            </FlexBox>
            
            {/* Second Row: Birth date, Sex, Patient code */}
            <FlexBox gap={16} style={{ width: '100%' }}>
              <FlexBox flexDirection="column" style={{ width: '31%' }}>
                <Label htmlFor="birthdate" style={{ marginBottom: '4px' }}>Birth date</Label>
                <DatePicker
                  id="birthdate"
                  value={birthdate}
                  onChange={setBirthdate}
                  aria-label="Select birth date"
                  style={{ width: '100%' }}
                />
              </FlexBox>
              
              <FlexBox flexDirection="column" style={{ width: '15%' }}>
                <Label htmlFor="sex" style={{ marginBottom: '4px' }}>Sex</Label>
                <Dropdown 
                  id="sex"
                  selectedKey={sex}
                  onSelectionChange={(key) => setSex(String(key))}
                  aria-label="Select sex"
                  style={{ width: '100%' }}
                >
                  <Item key="">All</Item>
                  <Item key="M">M</Item>
                  <Item key="F">F</Item>
                </Dropdown>
              </FlexBox>
              
              <FlexBox flexDirection="column" style={{ width: '48%' }}>
                <Label htmlFor="patientCode" style={{ marginBottom: '4px' }}>Patient code</Label>
                <TextBox 
                  id="patientCode"
                  value={patientCode}
                  onChange={setPatientCode}
                  placeholder="Enter patient code"
                  style={{ width: '100%' }}
                />
              </FlexBox>
            </FlexBox>
            
            {/* Third Row: Location */}
            <FlexBox gap={16} style={{ width: '100%' }}>
              <FlexBox flexDirection="column" style={{ width: '48%' }}>
                <Label htmlFor="location" style={{ marginBottom: '4px' }}>Location</Label>
                <Dropdown 
                  id="location"
                  selectedKey={location}
                  onSelectionChange={(key) => setLocation(String(key))}
                  aria-label="Select location"
                  style={{ width: '100%' }}
                >
                  <Item key="">All Locations</Item>
                  <Item key="ICU">ICU</Item>
                  <Item key="ER">ER</Item>
                  <Item key="Ward A">Ward A</Item>
                  <Item key="Ward B">Ward B</Item>
                </Dropdown>
              </FlexBox>
              
              {/* Empty space for alignment */}
              <div style={{ width: '20%' }}></div>
              
              {/* Action Buttons */}
              <FlexBox justifyContent="flex-end" alignItems="flex-end" gap={8} style={{ width: '31%' }}>
                <Button 
                  variant="primary" 
                  style={{ 
                    width: '100%', 
                    height: '36px',
                    margin: 0,
                  }}
                  onPress={() => console.log('Search with filters')}
                >
                  SEARCH
                </Button>
                <Button 
                  variant="quiet" 
                  style={{ 
                    width: '100%', 
                    height: '36px',
                    margin: 0,
                  }}
                  onPress={handleClearFilters}
                >
                  CLEAR
                </Button>
              </FlexBox>
            </FlexBox>
          </FlexBox>

          {/* Search Results Table - Updated to match screenshot */}
          <div 
            style={{ 
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: '4px',
              border: '1px solid var(--color-neutral-20)',
              marginTop: '1rem'
            }}
          >
            {/* Results Header */}
            <FlexBox 
              style={{ 
                padding: '0.5rem',
                fontWeight: 'bold',
                borderBottom: '1px solid var(--color-neutral-20)'
              }}
            >
              <div style={{ width: '23%', paddingLeft: '0.5rem' }}>Family Name</div>
              <div style={{ width: '22%' }}>Given Name</div>
              <div style={{ width: '10%' }}>Sex</div>
              <div style={{ width: '20%' }}>Birthdate</div>
              <div style={{ width: '25%' }}>Patient Code</div>
            </FlexBox>
            
            {/* Results Rows */}
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {filteredPatients.map((patient) => (
                <FlexBox 
                  key={patient.id}
                  style={{ 
                    padding: '0.5rem',
                    borderBottom: '1px solid var(--color-neutral-10)',
                    cursor: 'pointer',
                    backgroundColor: patient.id === selectedPatient?.id ? 
                      'var(--color-neutral-20)' : 'white',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => handlePatientRowClick(patient)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePatientRowClick(patient);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select patient ${patient.firstName} ${patient.lastName}`}
                >
                  <div style={{ width: '23%', paddingLeft: '0.5rem' }}>{patient.lastName}</div>
                  <div style={{ width: '22%' }}>{patient.firstName}</div>
                  <div style={{ width: '10%' }}>{patient.gender}</div>
                  <div style={{ width: '20%' }}>{patient.birthdate}</div>
                  <div style={{ width: '25%' }}>{patient.patientCode}</div>
                </FlexBox>
              ))}
            </div>
            
            {filteredPatients.length === 0 && (
              <Text style={{ padding: '1rem', textAlign: 'center' }}>
                No patients found matching the search criteria.
              </Text>
            )}
          </div>
        </FlexBox>
      </div>
    </>
  );
};

export default SearchPatientPage;