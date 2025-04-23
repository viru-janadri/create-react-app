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
  DatePicker,
  Card,
  CardContent,
  CardHeader
} from "@filament/react";
import {
  PersonPortraitCircle,
  Laptop,
  Clock,
  QuestionmarkCircleOutline,
  Search,
  Filter,
  Cross,
  Calendar,
  GenderMale,
  GenderFemale,
  DocumentSettings,
  ArrowLeft,
  PersonPortrait
} from "@filament-icons/dls4-react";
import { separatorHorizontal, iconSmall } from "@filament-theme/atomics";
import * as styles from "../styles";


interface SearchPatientPageProps {
  onSelectPatient: (id: number, name: string) => void;
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
  status?: 'stable' | 'critical' | 'improving' | 'unknown';
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
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Mock patient data for the search results 
  const mockPatients: Patient[] = [
    { id: 1, firstName: 'Test', lastName: 'Patient', gender: 'M', age: '35', birthdate: '01/15/1990', patientCode: '3342', bed: '101', status: 'stable' },
    { id: 2, firstName: 'Care', lastName: 'Patient 1', gender: 'M', age: '35', birthdate: '03/11/1990', patientCode: '20000001', bed: '102', status: 'critical' },
    { id: 3, firstName: 'Jim', lastName: 'Patient 2', gender: 'M', age: '32', birthdate: '07/05/1993', patientCode: '20000002', bed: '103', status: 'improving'},
    { id: 4, firstName: 'Joe', lastName: 'Patient 3', gender: 'M', age: '36', birthdate: '07/05/1989', patientCode: '20000003', bed: '104', status: 'stable' },
    { id: 5, firstName: 'Rose', lastName: 'Patient 4', gender: 'F', age: '33', birthdate: '03/05/1992', patientCode: '20000004', bed: '105', status: 'critical', },
    { id: 6, firstName: 'Ellen', lastName: 'Patient 5', gender: 'F', age: '38', birthdate: '03/09/1987', patientCode: '20000005', bed: '106', status: 'improving' },
    { id: 7, firstName: 'Bill', lastName: 'Patient 6', gender: 'M', age: '58', birthdate: '03/11/1967', patientCode: '20000006', bed: '107', status: 'stable' },
    { id: 8, firstName: 'Mark', lastName: 'Patient 7', gender: 'M', age: '58', birthdate: '03/12/1967', patientCode: '20000007', bed: '108', status: 'unknown' },
    { id: 9, firstName: 'Aaron', lastName: 'Patient 8', gender: 'M', age: '65', birthdate: '01/12/1960', patientCode: '20000008', bed: '109', status: 'stable' },
    { id: 10, firstName: 'Samantha', lastName: 'Patient 9', gender: 'F', age: '42', birthdate: '05/22/1983', patientCode: '20000009', bed: '110', status: 'improving' },
    { id: 11, firstName: 'Jessica', lastName: 'Patient 10', gender: 'F', age: '29', birthdate: '09/15/1996', patientCode: '20000010', bed: '111', status: 'stable' },
    { id: 12, firstName: 'Michael', lastName: 'Patient 11', gender: 'M', age: '51', birthdate: '11/30/1974', patientCode: '20000011', bed: '112', status: 'critical' },
    { id: 13, firstName: 'Daniel', lastName: 'Patient 12', gender: 'M', age: '47', birthdate: '04/18/1978', patientCode: '20000012', bed: '113', status: 'improving' },
    { id: 14, firstName: 'Emily', lastName: 'Patient 13', gender: 'F', age: '31', birthdate: '06/25/1994', patientCode: '20000013', bed: '114', status: 'stable' },
    { id: 15, firstName: 'David', lastName: 'Patient 14', gender: 'M', age: '62', birthdate: '08/07/1963', patientCode: '20000014', bed: '115', status: 'critical' },
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

    
    return matchesFirstName && matchesLastName && matchesBirthdate && 
           matchesSex && matchesPatientCode });

  // Handle patient selection
  const handlePatientRowClick = (patient: Patient) => {
    setSelectedPatient(patient);
    // Add a small delay to show selection before navigation
    setTimeout(() => {
      onSelectPatient(patient.id, patient.lastName);
    }, 100);
  };

  // Handle clear button click
  const handleClearFilters = () => {
    setFirstName('');
    setLastName('');
    setBirthdate(null);
    setSex('');
    setPatientCode('');
    setSelectedPatient(null);
  };

  // Get gender icon based on gender
  const getGenderIcon = (gender: string) => {
    return gender === 'M' ? 
      <GenderMale className={iconSmall} style={{ color: 'var(--color-primary)' }} /> : 
      <GenderFemale className={iconSmall} style={{ color: 'var(--color-secondary)' }} />;
  };

  // Current date and time for the header
  const now = new Date();
  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  return (
    <div className={styles.searchContainer} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Patient Info Banner - Modified for search page */}
      <div className={styles.patientInfoBanner} style={{ 
        width: '100%', 
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <FlexBox alignItems="center" gap={16} style={{ width: '98%', justifyContent: 'space-between' }}>
           
            <Button 
              variant="primary"
              isDisabled={true}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: '0.6' }}
            >
              Choose Patient...
            </Button>
          
          
          <FlexBox alignItems="center" gap={36} style={{ flexWrap: 'wrap' }}>
            <FlexBox alignItems="center" gap={8}>
              <PersonPortraitCircle />
              <Label>ADM</Label>
            </FlexBox>
            
            <FlexBox alignItems="center" gap={8}>
              <Laptop />
              <Label>ICU CENTRAL</Label>
            </FlexBox>
            
            <FlexBox alignItems="center" gap={8}>
              <Clock />
              <FlexBox flexDirection="column">
                <Label>{formattedTime}</Label>
                <Label>{formattedDate}</Label>
              </FlexBox>
            </FlexBox>
            
            <QuestionmarkCircleOutline />
          </FlexBox>
        </FlexBox>
      </div>
      <hr className={separatorHorizontal} style={{ margin: '0.5rem 0' }} />

      {/* Main content - Use flex layout with column direction */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        flex: 1,
        overflowY: 'hidden'
      }}>
        <FlexBox flexDirection="column" gap={8} style={{ height: '100%' }}>
          <FlexBox alignItems="center" gap={8}>
            <H3>Patient Search</H3>
          </FlexBox>
          
          {/* Advanced Search Filters - In a Card for better appearance */}
          <Card style={{ width: '100%', marginBottom: '16px' }}>
            <CardHeader>
              <FlexBox alignItems="center" gap={8}>
                <Filter className={iconSmall} />
                <Label style={{ fontWeight: 'bold' }}>Search Filters</Label>
              </FlexBox>
            </CardHeader>
            <CardContent>
              <FlexBox flexDirection="column" gap={16}>
                {/* First Row: First Name, Last Name */}
                <FlexBox gap={16} style={{ width: '100%' }}>
                  <FlexBox flexDirection="column" style={{ width: '48%' }}>
                    <FlexBox alignItems="center" gap={4} style={{ marginBottom: '4px' }}>
                      <PersonPortrait />
                      <Label htmlFor="firstName">First name</Label>
                    </FlexBox>
                    <TextBox 
                      id="firstName"
                      value={firstName}
                      onChange={setFirstName}
                      placeholder="Enter first name"
                      style={{ width: '100%' }}
                    />
                  </FlexBox>
                  
                  <FlexBox flexDirection="column" style={{ width: '48%' }}>
                    <FlexBox alignItems="center" gap={4} style={{ marginBottom: '4px' }}>
                      <PersonPortrait />
                      <Label htmlFor="lastName">Last name</Label>
                    </FlexBox>
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
                    <FlexBox alignItems="center" gap={4} style={{ marginBottom: '4px' }}>
                      <Calendar className={iconSmall} style={{ color: 'var(--color-primary)' }} />
                      <Label htmlFor="birthdate">Birth date</Label>
                    </FlexBox>
                    <DatePicker
                      id="birthdate"
                      value={birthdate}
                      onChange={setBirthdate}
                      aria-label="Select birth date"
                      style={{ width: '100%' }}
                    />
                  </FlexBox>
                  
                  <FlexBox flexDirection="column" style={{ width: '15%' }}>
                    <FlexBox alignItems="center" gap={4} style={{ marginBottom: '4px' }}>
                      <GenderMale className={iconSmall} style={{ color: 'var(--color-primary)' }} />
                      <Label htmlFor="sex">Sex</Label>
                    </FlexBox>
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
                    <FlexBox alignItems="center" gap={4} style={{ marginBottom: '4px' }}>
                      <DocumentSettings className={iconSmall} style={{ color: 'var(--color-primary)' }} />
                      <Label htmlFor="patientCode">Patient code</Label>
                    </FlexBox>
                    <TextBox 
                      id="patientCode"
                      value={patientCode}
                      onChange={setPatientCode}
                      placeholder="Enter patient code"
                      style={{ width: '100%' }}
                    />
                  </FlexBox>
                </FlexBox>
                
                {/* Third Row */}
                <FlexBox gap={16} style={{ width: '100%' }}>
                  <FlexBox flexDirection="column" style={{ width: '48%' }}>
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
                      <FlexBox alignItems="center" gap={8}>
                        <Search className={iconSmall} />
                        SEARCH
                      </FlexBox>
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
                      <FlexBox alignItems="center" gap={8}>
                        <Cross className={iconSmall} />
                        CLEAR
                      </FlexBox>
                    </Button>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            </CardContent>
          </Card>

          {/* Search Results Card - Flexible height with scrolling */}
          <Card style={{ 
            width: '100%', 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            overflowY: 'hidden'
          }}>
            <CardHeader>
              <FlexBox alignItems="center" justifyContent="space-between">
                <FlexBox alignItems="center" gap={8}>
                  <Label style={{ fontWeight: 'bold' }}>Search Results</Label>
                  <Label variant="descriptor">{filteredPatients.length} patients found</Label>
                </FlexBox>
                <FlexBox gap={8}>
                  <Label variant="descriptor">Click on a patient to view details</Label>
                </FlexBox>
              </FlexBox>
            </CardHeader>
            <hr className={separatorHorizontal} />
            
            {/* Results Header */}
            <FlexBox 
              style={{ 
                padding: '0.75rem 0.5rem',
                fontWeight: 'bold',
                borderBottom: '1px solid var(--color-neutral-30)',
                backgroundColor: 'var(--color-background-primary)'
              }}
            >
              <div style={{ width: '3%' }}></div>
              <div style={{ width: '18%', paddingLeft: '0.5rem' }}>Family Name</div>
              <div style={{ width: '17%' }}>Given Name</div>
              <div style={{ width: '7%' }}>Sex</div>
              <div style={{ width: '15%' }}>Birthdate</div>
              <div style={{ width: '15%' }}>Patient Code</div>
            </FlexBox>
            
            {/* Results Rows - With scrollbar */}
            <div style={{ 
              flex: 1, 
              overflowY: 'auto',
              backgroundColor: 'var(--color-background-primary)'
            }}>
              {filteredPatients.map((patient) => (
                // Using a div instead of FlexBox for better click handling
                <div 
                  key={patient.id}
                  style={{ 
                    display: 'flex',
                    padding: '0.75rem 0.5rem',
                    borderBottom: '1px solid var(--color-neutral-20)',
                    cursor: 'pointer',
                    backgroundColor: patient.id === selectedPatient?.id ? 
                      'var(--color-accent-10)' : 'var(--color-background-secondary)',
                    transition: 'background-color 0.2s',
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
                  <div style={{ width: '3%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  </div>
                  <div style={{ width: '18%', paddingLeft: '0.5rem', fontWeight: 'bold' }}>{patient.lastName}</div>
                  <div style={{ width: '17%' }}>{patient.firstName}</div>
                  <div style={{ width: '7%', display: 'flex', alignItems: 'center' }}>
                    {getGenderIcon(patient.gender)}
                  </div>
                  <div style={{ width: '15%' }}>{patient.birthdate}</div>
                  <div style={{ width: '15%' }}>{patient.patientCode}</div>
                  <div style={{ width: '12%' }}>
                  </div>
                </div>
              ))}
              
              {filteredPatients.length === 0 && (
                <FlexBox 
                  alignItems="center" 
                  justifyContent="center" 
                  flexDirection="column"
                  gap={16}
                  style={{ 
                    padding: '2rem', 
                    backgroundColor: 'var(--color-background-secondary)',
                    height: '100%'
                  }}
                >
                  <Text>No patients found matching the search criteria.</Text>
                  <Text>Try adjusting your search filters</Text>
                </FlexBox>
              )}
            </div>
          </Card>
        </FlexBox>
      </div>
    </div>
  );
};

export default SearchPatientPage;