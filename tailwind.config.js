/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./index.html",
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: 'inherit',
                        a: {
                            color: 'inherit',
                            textDecoration: 'underline',
                            '&:hover': {
                                color: 'inherit',
                            },
                        },
                        code: {
                            backgroundColor: '#f3f4f6',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.875em',
                            fontWeight: '400',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        pre: {
                            backgroundColor: '#1f2937',
                            color: '#f9fafb',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            overflow: 'auto',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            padding: '0',
                            color: 'inherit',
                        },
                        blockquote: {
                            borderLeftColor: '#6b7280',
                            backgroundColor: '#f9fafb',
                            padding: '0.5rem 1rem',
                            borderRadius: '0 0.25rem 0.25rem 0',
                        },
                        h1: {
                            fontSize: '2rem',
                            fontWeight: '700',
                            marginTop: '2rem',
                            marginBottom: '1rem',
                        },
                        h2: {
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            marginTop: '1.5rem',
                            marginBottom: '0.75rem',
                        },
                        h3: {
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            marginTop: '1.25rem',
                            marginBottom: '0.5rem',
                        },
                        table: {
                            width: '100%',
                            borderCollapse: 'collapse',
                        },
                        th: {
                            backgroundColor: '#f3f4f6',
                            padding: '0.5rem',
                            textAlign: 'left',
                            borderBottom: '2px solid #d1d5db',
                        },
                        td: {
                            padding: '0.5rem',
                            borderBottom: '1px solid #e5e7eb',
                        },
                    },
                },
            },
        },
    },
    plugins: [],
}
