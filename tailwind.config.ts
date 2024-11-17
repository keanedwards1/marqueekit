import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';
import type { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: ({ theme }: PluginAPI) => ({
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          }
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.blue[400]'),
            '--tw-prose-links-hover': theme('colors.blue[300]'),
            '--tw-prose-underline': theme('colors.blue[400]/40'),
            '--tw-prose-underline-hover': theme('colors.blue[400]'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.blue[400]'),
            '--tw-prose-bullets': theme('colors.blue[400]'),
            '--tw-prose-hr': theme('colors.gray[700]'),
            '--tw-prose-quote-borders': theme('colors.blue[500]/50'),
            '--tw-prose-captions': theme('colors.gray[400]'),
            '--tw-prose-pre-code': theme('colors.gray[300]'),
            '--tw-prose-pre-bg': 'transparent',
            '--tw-prose-th-borders': theme('colors.gray[700]'),
            '--tw-prose-td-borders': theme('colors.gray[800]'),

            // Fix for inline code
            'code': {
              color: theme('colors.blue[300]'),
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '0.25rem',
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              '&::before': { content: '""' },
              '&::after': { content: '""' },
            },
            // Fix for code blocks
            'pre': {
              backgroundColor: 'transparent',
              padding: '0',
              margin: '0',
              color: 'inherit',
              'code': {
                backgroundColor: 'transparent',
                padding: '0',
                color: 'inherit',
                fontSize: 'inherit',
              }
            },
            
            // Other styles remain the same
            'ul > li > ul, ol > li > ol': {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            'ul > li > ul': {
              listStyleType: 'circle',
            },
            'ul > li > ul > li > ul': {
              listStyleType: 'square',
            },
            
            'h1, h2, h3, h4': {
              marginBottom: '0.5em',
              marginTop: '1.5em',
            },
            'h1:first-child, h2:first-child, h3:first-child, h4:first-child': {
              marginTop: '0',
            },
            'blockquote p': {
              marginTop: '1em',
              marginBottom: '1em',
            },
            'blockquote': {
              marginTop: '2em',
              marginBottom: '2em',
            },
            'p': {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;