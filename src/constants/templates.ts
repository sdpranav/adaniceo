
import ceoClubLogo from '../assets/ceo club.png'
import dhanvarshaLogo from '../assets/dhanvarsha.png'
import kawachLogo from '../assets/kawach.png'
import goldLogo from '../assets/gold.png'
import ring1 from '../assets/ring.png'
import ring2 from '../assets/ring2.png'
import ring3 from '../assets/ring3.png'
import ring4 from '../assets/ring4.png'

export interface ThemeColors {
    background: string;
    cardGradientFrom: string;
    cardGradientTo: string;
    cardBorder: string;
    textGradientFrom: string;
    textGradientTo: string;
    accentGlow: string;
    buttonColor: string;
    buttonHoverColor: string;
    buttonBorder: string;
    buttonBorderHover: string;
}

export interface Template {
    id: string;
    name: string;
    logoSrc: string;
    frameSrc: string;
    headline: string;
    description: string;
    subtitle: string;
    theme: ThemeColors;
}

export const TEMPLATES: Template[] = [
    {
        id: 'ceo-club',
        name: 'CEO Club',
        logoSrc: ceoClubLogo,
        frameSrc: ring1,
        headline: 'ADANI CEMENT CEO CLUB MEMBER',
        description: 'The Adani Cement CEO Club is an exclusive circle for our top-performing dealers, the ones who consistently deliver results and drive growth.',
        subtitle: 'PROUD MEMBER OF CEO CLUB',
        theme: {
            background: '#160C1D',
            cardGradientFrom: '#321A42',
            cardGradientTo: '#24132F',
            cardBorder: '#24132F',
            textGradientFrom: '#F1E9F6',
            textGradientTo: '#DECCEB',
            accentGlow: 'rgba(59, 130, 246, 0.2)', // Blue-500/20
            buttonColor: '#713B95',
            buttonHoverColor: '#623282',
            buttonBorder: '#713B95',
            buttonBorderHover: '#8349aa',
        }
    },
    {
        id: 'ambuja-club', // Naming it Ambuja Club for now as a placeholder
        name: 'Dhanvarsha Club',
        logoSrc: dhanvarshaLogo,
        frameSrc: ring2,
        headline: 'ADANI CEMENT DHANVARSHA CLUB MEMBER',
        description: 'The Adani Cement Dhanvarsha Club is the most inclusive recognition in the cement industry, rewarding our dealers for their outstanding contributions and motivating them to achieve new milestones.',
        subtitle: 'PROUD BENEFICIARY OF DHANVARSHA',
        theme: {
            background: '#1D140C',
            cardGradientFrom: '#422A1A',
            cardGradientTo: '#2F1E13',
            cardBorder: '#2F1E13',
            textGradientFrom: '#F6F1E9',
            textGradientTo: '#EBDECC',
            accentGlow: 'rgba(249, 115, 22, 0.2)', // Orange-500/20
            buttonColor: '#ea580c',
            buttonHoverColor: '#c2410c',
            buttonBorder: '#ea580c',
            buttonBorderHover: '#f97316',
        }
    },
    {
        id: 'kawach-club',
        name: 'Kawach Club',
        logoSrc: kawachLogo,
        frameSrc: ring3,
        headline: 'ADANI AMBUJA KAWACH',
        description: 'A proud seller of Ambuja Kawach Cement, as it protects our homes with strength & resists water from seeping in.',
        subtitle: 'PROUD SELLER OF AMBUJA KAWACH',
        theme: {
            background: '#0C1520',
            cardGradientFrom: '#1A3A52',
            cardGradientTo: '#132838',
            cardBorder: '#132838',
            textGradientFrom: '#E9F3F6',
            textGradientTo: '#CCE5EB',
            accentGlow: 'rgba(59, 130, 246, 0.3)',
            buttonColor: '#2563eb',
            buttonHoverColor: '#1d4ed8',
            buttonBorder: '#2563eb',
            buttonBorderHover: '#3b82f6',
        }
    },
    {
        id: 'gold-club',
        name: 'Gold Club',
        logoSrc: goldLogo,
        frameSrc: ring4,
        headline: 'ADANI ACC GOLD WATER SHIELD',
        description: 'A proud seller of ACC Gold Water Shield Cement, as it protects our homes & stops seepage, due it its density & water-resistant feature.',
        subtitle: 'PROUD SELLER OF ACC GOLD WATER SHIELD',
        theme: {
            background: '#1C0C0C',
            cardGradientFrom: '#4A1A1A',
            cardGradientTo: '#2F1313',
            cardBorder: '#2F1313',
            textGradientFrom: '#F6E9E9',
            textGradientTo: '#EBCCCC',
            accentGlow: 'rgba(239, 68, 68, 0.3)',
            buttonColor: '#dc2626',
            buttonHoverColor: '#b91c1c',
            buttonBorder: '#dc2626',
            buttonBorderHover: '#ef4444',
        }
    }
];
