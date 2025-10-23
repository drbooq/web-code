export default {
content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
theme: {
extend: {
colors: {
brand: {
50: '#f3f8ff',
100: '#e6f1ff',
500: '#0f6ad2',
600: '#0b57ad'
},
accent: '#16a34a'
},
fontFamily: {
sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial']
}
}
},
plugins: [],
}