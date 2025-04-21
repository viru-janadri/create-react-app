import { globalStyle, style } from "@vanilla-extract/css";

// Global variables
const COLORS = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  neutral10: 'var(--color-neutral-10)',
  neutral20: 'var(--color-neutral-20)',
  neutral30: 'var(--color-neutral-30)',
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  borderLight: 'var(--color-neutral-20)',
  shadow: 'rgba(0, 0, 0, 0.1)',
  infoCyan: '#00A3E0',
  warningYellow: '#F5BE00',
  dangerRed: '#D8312C',
  lightBlue: '#F0F7FF',
};

const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};

const TYPOGRAPHY = {
  fontSizeSmall: '0.875rem',
  fontSizeNormal: '1rem',
  lineHeight: '1.4',
  fontWeightNormal: 'normal',
  fontWeightBold: 'bold',
};

// Layout
export const page = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto 1fr",
  gridTemplateAreas: `
    'header'
    'content'`,
  height: "100svh",
});

export const header = style({
  gridArea: "header",
  containerType: "inline-size",
});

export const content = style({
  gridArea: "content",
  padding: `${SPACING.xl} ${SPACING.lg}`,
  overflowY: "auto",
  backgroundColor: 'var(--color-background-primary)',
});

export const cardGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
  gap: SPACING.md,
  width: "100%"
});

// Patient Card
export const patientCard = style({
  display: 'flex',
  flexDirection: 'column',
  padding: SPACING.sm,
  width: '100%',
  border: `1px solid grey`,
  boxShadow: `0 2px 4px ${COLORS.shadow}`,
  borderRadius: '4px',
  backgroundColor: 'var(--color-background-secondary)',
});

export const patientCardHeader = style({
  padding: SPACING.sm,
  borderBottom: `1px solid ${COLORS.neutral10}`,
  marginBottom: SPACING.sm,
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: COLORS.neutral10,
  }
});

// Section styling
export const sectionContainer = style({
  padding: SPACING.sm,
  marginBottom: SPACING.sm,
});

export const section = style({
  marginBottom: SPACING.md,
});

export const sectionHeading = style({
  marginBottom: SPACING.sm,
  display: 'flex',
  alignItems: 'center',
  gap: SPACING.sm,
});

export const sectionTitle = style({
  fontWeight: TYPOGRAPHY.fontWeightBold,
  fontSize: TYPOGRAPHY.fontSizeSmall,
  color: COLORS.textSecondary,
});

// Information containers
export const medicationContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: SPACING.xs,
  marginLeft: SPACING.lg,
});

export const vitalSignsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: SPACING.xs,
  marginLeft: SPACING.lg,
});

// Information line items
export const medicationLine = style({
  display: 'flex',
  alignItems: 'center',
});

export const medicationLabel = style({
  width: '2.5rem',
  flexShrink: 0,
  fontWeight: TYPOGRAPHY.fontWeightBold,
});

export const vitalSignLine = style({
  fontSize: TYPOGRAPHY.fontSizeSmall,
  margin: `${SPACING.xs} 0`,
});

// Icon wrapper to ensure visibility
export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  color: 'currentColor',
});

// Controls
export const moreDevicesButton = style({
  padding: '0',
  margin: '0',
  justifyContent: 'flex-start',
});

// Patient Detail View Styles
export const patientInfoBanner = style({
  padding: SPACING.md,
  backgroundColor: COLORS.primary,
  color: 'white',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
});

export const patientDetailBody = style({
  flex: 1,
  padding: SPACING.md,
  overflowY: 'auto',
});

export const patientDetailColumns = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: SPACING.lg,
  padding: SPACING.md,
});

export const patientDetailLeftColumn = style({
  backgroundColor: 'var(--color-background-secondary)',
  border: `1px solid ${COLORS.neutral20}`,
  borderRadius: '4px',
  padding: SPACING.md,
  height: 'fit-content',
  maxHeight: 'calc(100vh - 160px)',
  overflowY: 'auto',
});

export const patientDetailRightColumn = style({
  backgroundColor: 'var(--color-background-secondary)',
  border: `1px solid ${COLORS.neutral20}`,
  borderRadius: '4px',
  padding: SPACING.md,
  height: 'fit-content',
  maxHeight: 'calc(100vh - 160px)',
  overflowY: 'auto',
});

export const patientDetailHeader = style({
  marginBottom: SPACING.md,
  padding: SPACING.sm,
  borderBottom: `1px solid ${COLORS.neutral20}`,
});

export const rightColumnHeader = style({
  marginBottom: SPACING.md,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const deviceSection = style({
  marginBottom: SPACING.md,
});

export const deviceReadings = style({
  marginLeft: SPACING.xl,
});

export const readingLine = style({
  padding: `${SPACING.xs} 0`,
});

export const moreDevices = style({
  marginTop: SPACING.sm,
  marginBottom: SPACING.sm,
  cursor: 'pointer',
});

export const filterSection = style({
  marginBottom: SPACING.lg,
  padding: SPACING.sm,
  backgroundColor: COLORS.lightBlue,
  borderRadius: '4px',
});

export const activeFilter = style({
  backgroundColor: COLORS.primary,
  color: 'white',
});

export const alarmTable = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const tableHeader = style({
  display: 'grid',
  gridTemplateColumns: '80px 80px 1fr',
  backgroundColor: COLORS.neutral10,
  padding: SPACING.sm,
  fontWeight: TYPOGRAPHY.fontWeightBold,
});

export const tableRow = style({
  display: 'grid',
  gridTemplateColumns: '80px 80px 1fr',
  padding: SPACING.sm,
  borderBottom: `1px solid ${COLORS.neutral10}`,
});

export const timeColumn = style({
  fontWeight: TYPOGRAPHY.fontWeightBold,
});

export const deviceColumn = style({
  
});

export const descriptionColumn = style({
  
});

// Global styles
globalStyle("body", {
  padding: 0,
  margin: 0,
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  fontSize: TYPOGRAPHY.fontSizeNormal,
  lineHeight: TYPOGRAPHY.lineHeight,
  color: COLORS.textPrimary,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: 0,
  fontWeight: TYPOGRAPHY.fontWeightBold,
});

globalStyle(".critical-value", {
  color: 'var(--color-error)',
  fontWeight: TYPOGRAPHY.fontWeightBold,
});

globalStyle(".warning-value", {
  color: 'var(--color-warning)',
  fontWeight: TYPOGRAPHY.fontWeightBold,
});

// Add these new styles to src/styles/app.css.ts

// Icon display fix
export const iconDisplay = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
});

// Patient Detail View Tab Structure
export const patientDetailTabContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginBottom: SPACING.md,
});

export const tabContentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: SPACING.md,
});

// Enhance alignment for filters
export const filterRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: SPACING.md,
  marginBottom: SPACING.sm,
});

export const filterLabel = style({
  minWidth: '60px',
});

export const filterTabsContainer = style({
  flex: 1,
});