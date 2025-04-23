import {
  Brightness,
  Moon,
  PhilipsWordMark,
  PersonPortraitCircle,
  Laptop,
  Clock,
  QuestionmarkCircleOutline,
} from "@filament-icons/dls4-react";
import {
  backgroundPrimary,
  separatorHorizontal
} from "@filament-theme/atomics";
import { base } from "@filament-theme/base";
import {
  Button,
  Dropdown,
  FlexBox,
  H1,
  Label,
  Item,
  NavigationBar,
  NavigationBarTitle,
  Portal,
} from "@filament/react";
import clsx from "clsx";

import { accentOrangeDark } from "@filament/theme/styles/accent/orange-dark";
import { accentOrangeLight } from "@filament/theme/styles/accent/orange-light";
import { colorBlueDark } from "@filament/theme/styles/color/blue-dark";
import { colorBlueLight } from "@filament/theme/styles/color/blue-light";
import { colorGrayDark } from "@filament/theme/styles/color/gray-dark";
import { sizeRegular } from "@filament/theme/styles/size/regular";

import { useEffect, useMemo, useState } from "react";
import * as styles from "./styles";
import PatientCard from "./components/PatientCard";
import PatientDetailView from "./components/PatientDetailView";
import SearchPatientPage from "./components/SearchPatientPage";

function useMediaQuery(query: string) {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = useState(mediaQuery.matches);

  useEffect(() => {
    const onChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [mediaQuery]);

  return match;
}

function useBreakpoints() {
  const minWidth900 = useMediaQuery("(min-width: 900px)");
  const minWidth1060 = useMediaQuery("(min-width: 1060px)");
  const minWidth1200 = useMediaQuery("(min-width: 1200px)");

  return { minWidth900, minWidth1060, minWidth1200 };
}

// Enum for application views
enum AppView {
  DASHBOARD = 'dashboard',
  PATIENT_DETAIL = 'patient_detail',
  SEARCH_PATIENT = 'search_patient'
}

// Sample patient names
const PATIENT_NAMES = [
  "Anderson", "Patel", "Rodriguez", "Smith",
  "Johnson", "Wu", "Brown", "Garcia",
  "Taylor", "Kim", "Williams", "Murphy"
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { minWidth900 } = useBreakpoints();
  
  // State to track current view and selected patient
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [selectedPatient, setSelectedPatient] = useState<{id: number, name: string} | null>(null);

  // Handler for opening patient detail view
  const handlePatientSelect = (id: number, name: string) => {
    setSelectedPatient({ id, name });
    setCurrentView(AppView.PATIENT_DETAIL);
  };

  // Handler for going back to patient grid
  const handleBackToGrid = () => {
    setCurrentView(AppView.DASHBOARD);
    setSelectedPatient(null);
  };
  
  // Handler for opening search page
  const handleOpenSearch = () => {
    setCurrentView(AppView.SEARCH_PATIENT);
  };

  return (
    <div
      className={clsx(
        darkMode ? colorGrayDark : colorBlueLight,
        darkMode ? accentOrangeDark : accentOrangeLight,
        sizeRegular,
        base,
        styles.page
      )}
    >
      <Portal>
        {/* Common header - always rendered */}
        <header
          className={clsx(
            darkMode ? colorGrayDark : colorBlueDark,
            accentOrangeDark,
            styles.header
          )}
        >
          <NavigationBar variant="primary">
            {minWidth900 && (
              <NavigationBarTitle>
                <FlexBox alignItems="center" gap={8}>
                  {/* Show back button in detail view */}
                  {currentView === AppView.PATIENT_DETAIL && (
                    <Button 
                      variant="quiet" 
                      aria-label="Back to patient list"
                      onPress={handleBackToGrid}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                  )}
                  <PhilipsWordMark />
                  <H1>SMART PATIENT CENTRAL</H1>
                </FlexBox>
              </NavigationBarTitle>
            )}

            <FlexBox
              alignItems="center"
              justifyContent="flex-end"
              gap={4}
              style={{ marginLeft: "auto" }}
            >
              <Button
                variant="quiet"
                aria-label="Theming mode toggle"
                onPress={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Moon /> : <Brightness />}
              </Button>
              
              <Button 
                variant="quiet" 
                onPress={() => {
                  console.log("About button clicked");
                }}
              >
                About
              </Button>
              <Dropdown variant="input-quiet" defaultSelectedKey="john">
                <Item key="john">Doe, John</Item>
              </Dropdown>
            </FlexBox>
          </NavigationBar>
        </header>
                
        <main className={clsx(backgroundPrimary, styles.content)}>
          {currentView === AppView.SEARCH_PATIENT ? (
            /* Render search patient page */
            <SearchPatientPage 
              onSelectPatient={handlePatientSelect}
            />
          ) : currentView === AppView.PATIENT_DETAIL && selectedPatient ? (
            /* Render patient detail view */
            <PatientDetailView 
              patientId={selectedPatient.id} 
              patientName={selectedPatient.name} 
            />
          ) : (
            /* Render patient grid with search button banner */
            <>
              {/* Patient Info Banner with Search Button */}
              <div className={styles.patientInfoBanner} style={{ 
                width: '100%', 
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <FlexBox alignItems="center" gap={16} style={{ width: '98%', justifyContent: 'space-between' }}>
                  <Button 
                    variant="primary"
                    onPress={handleOpenSearch}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    Choose Patient...
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
                        <Label>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Label>
                        <Label>{new Date().toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</Label>
                      </FlexBox>
                    </FlexBox>
                    
                    {/* Group 7 - Question mark */}
                    <QuestionmarkCircleOutline />
                  </FlexBox>
                </FlexBox>
              </div>
              <hr className={separatorHorizontal} style={{ margin: '0.5rem 0' }} />

              {/* Patient Grid */}
              <div className={styles.cardGrid}>
                {PATIENT_NAMES.map((name, i) => (
                  <PatientCard 
                    key={i} 
                    id={i + 1} 
                    name={name}
                    onHeaderClick={() => handlePatientSelect(i + 1, name)}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </Portal>
    </div>
  );
}