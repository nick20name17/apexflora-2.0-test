/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        fontSize: {
            DEFAULT: '1rem',
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.75rem',
            '4xl': '2rem',
            '5xl': '3rem'
        },
        borderRadius: {
            DEFAULT: '0.625rem',
            none: '0',
            xs: '0.25rem',
            sm: '0.375rem',
            md: '0.5rem',
            lg: '0.75rem',
            xl: '1rem',
            '2xl': '1.25rem',
            full: '9999px'
        },
        backdropBlur: {
            0: '0',
            none: '0',
            xs: '4px',
            md: '10px',
            lg: '20px'
        },
        colors: {
            'home-backgroud': 'hsl(var(--home-backgroud))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            card: {
                DEFAULT: 'hsl(var(--card))',
                foreground: 'hsl(var(--card-foreground))'
            },
            popover: {
                DEFAULT: 'hsl(var(--popover))',
                foreground: 'hsl(var(--popover-foreground))'
            },
            highlight: {
                DEFAULT: 'hsl(var(--highlight))',
                foreground: 'hsl(var(--highlight-foreground))'
            },
            primary: {
                DEFAULT: 'hsl(var(--primary))',
                foreground: 'hsl(var(--primary-foreground))'
            },
            secondary: {
                DEFAULT: 'hsl(var(--secondary))',
                foreground: 'hsl(var(--secondary-foreground))'
            },
            muted: {
                DEFAULT: 'hsl(var(--muted))',
                foreground: 'hsl(var(--muted-foreground))'
            },
            accent: {
                DEFAULT: 'hsl(var(--accent))',
                foreground: 'hsl(var(--accent-foreground))'
            },
            destructive: {
                DEFAULT: 'hsl(var(--destructive))',
                foreground: 'hsl(var(--destructive-foreground))'
            },
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            chart: {
                1: 'hsl(var(--chart-1))',
                2: 'hsl(var(--chart-2))',
                3: 'hsl(var(--chart-3))',
                4: 'hsl(var(--chart-4))',
                5: 'hsl(var(--chart-5))'
            },
            sidebar: {
                DEFAULT: 'hsl(var(--sidebar-background))',
                foreground: 'hsl(var(--sidebar-foreground))',
                primary: 'hsl(var(--sidebar-primary))',
                'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                accent: 'hsl(var(--sidebar-accent))',
                'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                border: 'hsl(var(--sidebar-border))',
                ring: 'hsl(var(--sidebar-ring))'
            },
            transparent: 'transparent',
            white: 'hsl(0, 0%, 100%)',
            black: 'hsl(0, 0%, 0%)'
        },
        extend: {
            backgroundImage: {
                flower: "url('/img/home/contact-bg.jpg')"
            },
            boxShadow: {
                md: '0 4px 15px 0 #0E0E6633'
            },
            spacing: {
                0: '0',
                0.5: '0.125rem',
                1: '0.25rem',
                1.5: '0.375rem',
                2: '0.5rem',
                2.5: '0.625rem',
                3: '0.75rem',
                3.5: '0.875rem',
                4: '1rem',
                5: '1.25rem',
                6: '1.5rem',
                7: '1.875rem',
                8: '2rem',
                9: '2.25rem',
                10: '2.5rem',
                11: '2.75rem',
                12: '3rem',
                14: '3.5rem',
                15: '3.75rem',
                16: '4rem',
                18: '4.5rem',
                20: '5rem',
                30: '7.5rem'
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    '2xl': '1360px'
                }
            },
            fontFamily: {
                sans: ['Stolzl', 'sans-serif'],
                book: ['Book', 'sans-serif']
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                'pop-in': {
                    '0%': { opacity: '0', transform: 'scale(0)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'pop-in': 'pop-in 0.2s ease-out'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
}
