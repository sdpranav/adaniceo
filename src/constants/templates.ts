
import ceoClubLogo from '../assets/ceo club.webp'
import dhanvarshaLogo from '../assets/dhanvarsha.webp'
import kawachLogo from '../assets/kawach.webp'
import goldLogo from '../assets/gold.webp'
import ring1 from '../assets/ring.webp'
import ring5 from '../assets/ring5.webp'
import ring3 from '../assets/ring3.webp'
import ring4 from '../assets/ring4.webp'
import ring6 from '../assets/ring6.webp'
import vijayathLogo from '../assets/vijaypath.webp'

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

export const DANANDHAR_TEMPLATE: Template = {
    id: 'vijaypath',
    name: 'Vijaypath',
    logoSrc: vijayathLogo,
    frameSrc: ring6,
    headline: 'VIJAYPATH',
    description: 'Vijaypath is an employee conference that honours the remarkable achievements of our field teams and empowers them to lead the path ahead.',
    subtitle: 'PROUD VIJAYPATH MEMBER',
    theme: {
        background: '#120804',
        cardGradientFrom: '#2D1005',
        cardGradientTo: '#1C0A04',
        cardBorder: '#1C0A04',
        textGradientFrom: '#FFF0E0',
        textGradientTo: '#FFD080',
        accentGlow: 'rgba(240, 120, 30, 0.3)',
        buttonColor: '#E07018',
        buttonHoverColor: '#B85510',
        buttonBorder: '#E07018',
        buttonBorderHover: '#F09030',
    }
};

export const TEMPLATES: Template[] = [
    {
        id: 'ambuja-club', // Naming it Ambuja Club for now as a placeholder
        name: 'Dhanvarsha Club',
        logoSrc: dhanvarshaLogo,
        frameSrc: ring5,
        headline: 'ADANI CEMENT DHANVARSHA MEMBER',
        description: 'Dhanversha is an industry first initiative that recognises and rewards channel partners, influencers and employees for their hard work and impact.',
        subtitle: 'PROUD BENEFICIARY OF DHANVARSHA',
        theme: {
            background: '#0E0812',
            cardGradientFrom: '#2A1038',
            cardGradientTo: '#1B0A26',
            cardBorder: '#1B0A26',
            textGradientFrom: '#F3EEF6',
            textGradientTo: '#E2D0EC',
            accentGlow: 'rgba(135, 54, 147, 0.25)',
            buttonColor: '#7a2886',
            buttonHoverColor: '#60156a',
            buttonBorder: '#7a2886',
            buttonBorderHover: '#9c50a5',
        }
    },
    {
        id: 'ceo-club',
        name: 'CEO Club',
        logoSrc: ceoClubLogo,
        frameSrc: ring1,
        headline: 'ADANI CEMENT CEO CLUB MEMBER',
        description: 'An exclusive circle for our top-performing dealers, who consistently deliver results.',
        subtitle: 'Proud Member of CEO Club',
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
        id: 'kawach-club',
        name: 'Kawach Club',
        logoSrc: kawachLogo,
        frameSrc: ring3,
        headline: 'ADANI AMBUJA KAWACH',
        description: 'A proud seller of Ambuja Kawach Cement which protects our homes with denser concrete & resists water from seeping in.',
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
        description: 'A proud seller of ACC Gold Water Shield Cement which protects our homes from seepage with its water-resistant property.',
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
    },
    DANANDHAR_TEMPLATE,
];
