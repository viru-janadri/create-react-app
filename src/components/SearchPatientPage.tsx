import React, { useState, ChangeEvent } from 'react';
import {
  FlexBox,
  Button,
  Label,
  Text,
  TextArea,
  H3,
  Item,
  SearchBox,
} from "@filament/react";
import {
  PersonPortraitCircle,
  Laptop,
  Clock,
  QuestionmarkCircleOutline,
  Search,
  Filter
} from "@filament-icons/dls4-react";
import { iconSmall, separatorHorizontal } from "@filament-theme/atomics";
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
  bed: string;
};

const SearchPatientPage: React.FC<SearchPatientPageProps> = ({ 
  onSelectPatient,
  onCancel
}) => {
  // State for search filters
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Mock patient data for the search results
  const mockPatients: Patient[] = [
    { id: 1, firstName: 'John', lastName: 'Anderson', gender: 'Male', age: '62', bed: '101' },
    { id: 2, firstName: 'Maria', lastName: 'Patel', gender: 'Female', age: '45', bed: '102' },
    { id: 3, firstName: 'David', lastName: 'Rodriguez', gender: 'Male', age: '37', bed: '103' },
    { id: 4, firstName: 'Sarah', lastName: 'Smith', gender: 'Female', age: '54', bed: '104' },
    { id: 5, firstName: 'Robert', lastName: 'Johnson', gender: 'Male', age: '70', bed: '105' },
    { id: 6, firstName: 'Li', lastName: 'Wu', gender: 'Female', age: '29', bed: '106' },
    { id: 7, firstName: 'James', lastName: 'Brown', gender: 'Male', age: '42', bed: '107' },
    { id: 8, firstName: 'Ana', lastName: 'Garcia', gender: 'Female', age: '51', bed: '108' },
    { id: 9, firstName: 'Michael', lastName: 'Taylor', gender: 'Male', age: '63', bed: '109' },
    { id: 10, firstName: 'Min', lastName: 'Kim', gender: 'Female', age: '36', bed: '110' },
    { id: 11, firstName: 'Thomas', lastName: 'Williams', gender: 'Male', age: '58', bed: '111' },
    { id: 12, firstName: 'Fiona', lastName: 'Murphy', gender: 'Female', age: '44', bed: '112' },
  ];

  // Filter patients based on search criteria from text fields
  const filteredPatients = mockPatients.filter(patient => {
    const matchesFirstName = firstName === '' || 
      patient.firstName.toLowerCase().includes(firstName.toLowerCase());
    const matchesLastName = lastName === '' || 
      patient.lastName.toLowerCase().includes(lastName.toLowerCase());
    return matchesFirstName && matchesLastName;
  });

  // Functions for SearchBox component
  const fetchPatientsByName = (search: string) => {
    if (!search) return [];
    return mockPatients.filter(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
  };

  const [searchText, setSearchText] = useState('');
  const searchResults = fetchPatientsByName(searchText);

  // Handle search selection
  const handlePatientSelection = (patient: Patient) => {
    setSelectedPatient(patient);
    // Also update the filter fields to match the selected patient
    setFirstName(patient.firstName);
    setLastName(patient.lastName);
  };

  // Handle the final selection to navigate to patient details
  const handleSelectPatient = () => {
    if (selectedPatient) {
      onSelectPatient(selectedPatient.id, selectedPatient.lastName);
    }
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
                <Label>{formattedTime}</Label>
                <Label>{formattedDate}</Label>
              </FlexBox>
            </FlexBox>
            
            {/* Group 7 - Question mark */}
            <QuestionmarkCircleOutline />
          </FlexBox>
        </FlexBox>
      </div>
      <hr className={separatorHorizontal} style={{ margin: '0.5rem 0' }} />

      {/* Search Form */}
      <div style={{ padding: '1rem' }}>
        <FlexBox flexDirection="column" gap={16}>
          <H3>Patient Search</H3>
          
          {/* SearchBox Integration */}
          <FlexBox 
            style={{ 
              backgroundColor: 'var(--color-background-secondary)',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid var(--color-neutral-20)'
            }} 
            flexDirection="column" 
            gap={16}
          >
            <FlexBox alignItems="center" gap={8}>
              <Search className={iconSmall} />
              <Label style={{ fontWeight: 'bold' }}>Quick Search</Label>
            </FlexBox>
            
            <FlexBox style={{ width: '100%' }}>
              <SearchBox<Patient>
                items={searchResults}
                aria-label="Search patients"
                placeholder="Search by patient name"
                onInputChange={setSearchText}
                onSelectionChange={(key) => {
                  const patient = mockPatients.find(p => p.id === Number(key));
                  if (patient) handlePatientSelection(patient);
                }}
                style={{ width: '100%' }}
              >
                {(patient) => (
                  <Item key={patient.id}>
                    {patient.firstName} {patient.lastName} ({patient.gender}, {patient.age}, Bed {patient.bed})
                  </Item>
                )}
              </SearchBox>
            </FlexBox>
            
            {selectedPatient && (
              <FlexBox 
                style={{ 
                  backgroundColor: 'var(--color-background-primary)',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-neutral-20)'
                }}
                justifyContent="space-between"
                alignItems="center"
              >
                <FlexBox flexDirection="column">
                  <Label style={{ fontWeight: 'bold' }}>Selected Patient:</Label>
                  <Text>{selectedPatient.firstName} {selectedPatient.lastName} ({selectedPatient.gender}, {selectedPatient.age})</Text>
                  <Text>Bed: {selectedPatient.bed}</Text>
                </FlexBox>
                <Button 
                  variant="primary" 
                  onPress={handleSelectPatient}
                >
                  View Patient Details
                </Button>
              </FlexBox>
            )}
          </FlexBox>
          
          {/* Advanced Search Filters */}
          <FlexBox 
            style={{ 
              backgroundColor: 'var(--color-background-secondary)',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid var(--color-neutral-20)'
            }} 
            flexDirection="column" 
            gap={16}
          >
            <FlexBox alignItems="center" gap={8}>
              <Filter className={iconSmall} />
              <Label style={{ fontWeight: 'bold' }}>Advanced Filters</Label>
            </FlexBox>
            
            <FlexBox gap={16} style={{ flexWrap: 'wrap' }}>
              <FlexBox flexDirection="column" gap={4} style={{ minWidth: '200px' }}>
                <Label htmlFor="firstName">First Name</Label>
                <TextArea 
                  id="firstName"
                  value={firstName}
                  onChange={(value: string) => setFirstName(value)}
                  placeholder="Enter first name"
                />
              </FlexBox>
              
              <FlexBox flexDirection="column" gap={4} style={{ minWidth: '200px' }}>
                <Label htmlFor="lastName">Last Name</Label>
                <TextArea 
                  id="lastName"
                  value={lastName}
                  onChange={(value: string) => setLastName(value)}
                  placeholder="Enter last name"
                />
              </FlexBox>
            </FlexBox>
          </FlexBox>

          {/* Search Results */}
          <div 
            style={{ 
              backgroundColor: 'var(--color-background-secondary)',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid var(--color-neutral-20)'
            }}
          >
            <FlexBox flexDirection="column" gap={8}>
              <H3>Results ({filteredPatients.length})</H3>
              
              {filteredPatients.length > 0 ? (
                <div style={{ marginTop: '0.5rem' }}>
                  {/* Results Header */}
                  <FlexBox 
                    style={{ 
                      borderBottom: '1px solid var(--color-neutral-20)',
                      padding: '0.5rem 0',
                      fontWeight: 'bold'
                    }}
                  >
                    <div style={{ width: '15%' }}>ID</div>
                    <div style={{ width: '25%' }}>Last Name</div>
                    <div style={{ width: '25%' }}>First Name</div>
                    <div style={{ width: '15%' }}>Gender</div>
                    <div style={{ width: '10%' }}>Age</div>
                    <div style={{ width: '10%' }}>Bed</div>
                  </FlexBox>
                  
                  {/* Results Rows */}
                  {filteredPatients.map(patient => (
                    <FlexBox 
                      key={patient.id}
                      style={{ 
                        padding: '0.5rem 0',
                        borderBottom: '1px solid var(--color-neutral-10)',
                        cursor: 'pointer',
                        backgroundColor: selectedPatient?.id === patient.id ? 
                          'var(--color-neutral-20)' : undefined
                      }}
                      className={styles.resultRow}
                      onClick={() => handlePatientSelection(patient)}
                    >
                      <div style={{ width: '15%' }}>{patient.id}</div>
                      <div style={{ width: '25%' }}>{patient.lastName}</div>
                      <div style={{ width: '25%' }}>{patient.firstName}</div>
                      <div style={{ width: '15%' }}>{patient.gender}</div>
                      <div style={{ width: '10%' }}>{patient.age}</div>
                      <div style={{ width: '10%' }}>{patient.bed}</div>
                    </FlexBox>
                  ))}
                </div>
              ) : (
                <Text marginY="1rem">No patients found matching the search criteria.</Text>
              )}
            </FlexBox>
          </div>
          
          {/* Action Buttons */}
          {selectedPatient && (
            <FlexBox justifyContent="flex-end" gap={8}>
              <Button 
                variant="quiet" 
                onPress={onCancel}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onPress={handleSelectPatient}
              >
                Select Patient
              </Button>
            </FlexBox>
          )}
        </FlexBox>
      </div>
    </>
  );
};

export default SearchPatientPage;