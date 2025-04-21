import {
  Brightness,
  Moon,
  PhilipsWordMark,
} from "@filament-icons/dls4-react";
import {
  backgroundPrimary,
} from "@filament-theme/atomics";
import { base } from "@filament-theme/base";
import {
  Button,
  Dropdown,
  FlexBox,
  H1,
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

// Sample patient names
const PATIENT_NAMES = [
  "Anderson", "Patel", "Rodriguez", "Smith",
  "Johnson", "Wu", "Brown", "Garcia",
  "Taylor", "Kim", "Williams", "Murphy"
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { minWidth900 } = useBreakpoints();
  
  // State to track selected patient for detail view
  const [selectedPatient, setSelectedPatient] = useState<{id: number, name: string} | null>(null);

  // Handler for opening patient detail view
  const handlePatientSelect = (id: number, name: string) => {
    setSelectedPatient({ id, name });
  };

  // Handler for going back to patient grid
  const handleBackToGrid = () => {
    setSelectedPatient(null);
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
                  {/* Only show back button in detail view */}
                  {selectedPatient && (
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
          {selectedPatient ? (
            /* Render patient detail view */
            <PatientDetailView 
              patientId={selectedPatient.id} 
              patientName={selectedPatient.name} 
            />
          ) : (
            /* Render patient grid */
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
          )}
        </main>
      </Portal>
    </div>
  );
}