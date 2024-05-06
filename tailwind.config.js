/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.html", "./src/**/*.ts"],
    darkMode: "class",
    theme: {
        extend: {
            backgroundImage: {
                first_landing_page_card:
                    "url('/assets/card1_wave_coloured.jpg')",
                second_landing_page_card:
                    "url('/assets/card2_wave_coloured.jpg')",
                third_landing_page_card:
                    "url('/assets/card3_wave_coloured.jpg')",
                fourth_landing_page_card:
                    "url('/assets/card4_wave_coloured.jpg')",
            },
            colors: {
                ang: {
                    gradient_from:
                        "hsl(var(--color-gradient_from) / <alpha-value>)",

                    gradient_to:
                        "hsl(var(--color-gradient_to) / <alpha-value>)",

                    main_bg: "hsl(var(--color-main_bg) / <alpha-value>)",

                    text_main: "hsl(var(--color-text-blue) / <alpha-value>)",

                    text_white: "hsl(var(--color-text_white) / <alpha-value>)",

                    border_main:
                        "hsl(var(--color-border_main) / <alpha-value>)",

                    main_btn: "hsl(var(--color-btn_bg) / <alpha-value>)",
                },
            },
            boxShadow: {
                inner_sh: "inset 0 0 12px gray",
                dark_sh: "inset 0 0 6px #71717a",
            },
        },
    },
    plugins: [],
};
