
import adaniLogo from '../assets/ADANI-Cement.png'
import ambujaLogo from '../assets/ambuja logo.png'
import ring1 from '../assets/ring.png'
import ring2 from '../assets/ring2.png'

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
        logoSrc: adaniLogo,
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
        logoSrc: ambujaLogo,
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
    }
];
