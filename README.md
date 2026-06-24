# Pal Akbari - Premium Glassmorphic Portfolio Website

A stunning, professional, and interactive single-page portfolio website designed for **Pal Akbari**, a Full Stack Java Developer. This website showcases education, tech skills, featured projects (e.g., PalAcademy Student Management System), and provides an interactive contact channel.

## ✨ Core Features

*   **Premium Visual Design**: Dark-mode default slate aesthetic with fluid glowing backdrop blobs and modern grid architecture.
*   **Theme Toggle**: Fully operational toggle switch between Light Theme and Dark Theme with session state retention (using `localStorage`).
*   **Dynamic Subtitle**: Smooth typewriter animation showcasing multiple roles (e.g., "Full Stack Developer", "Java Developer").
*   **Animated Skills Directory**: Categorized progress grids that animate bar widths on scroll via the JavaScript `IntersectionObserver` API.
*   **Project Modals**: Responsive detail view modal illustrating the architectural flow of backend JPA mapping and frontend configuration.
*   **Timeline Roadmap**: A pipeline display tracking BCA (Darshan University), MCA (LJ University), and schooling.
*   **Interactive Contact Portal**: A glassmorphic form with inline validation, sending state spinner, and database-simulated persistence in `localStorage`.
*   **Vector Icons**: Clean, scalable SVGs loaded dynamically using the **Lucide Icons** engine.

## 📂 File Architecture

```text
portfolio/
│
├── index.html          # Semantic HTML5 layout with section configurations
├── style.css           # Custom CSS variables, responsive design, and animations
├── script.js           # Typewriter effects, intersection observers, and form logic
│
└── assets/             # Media and graphic assets
    ├── developer_avatar.jpg     # Professional developer illustration
    └── project_palacademy.jpg   # High-fidelity dashboard project mockup
```

## 🚀 Running Locally

Since this is built with lightweight vanilla technologies (HTML5, CSS3, JS ES6), there are no complex compilation scripts. You can run it instantly using any of these approaches:

### Option 1: Double-Click
Simply open `index.html` directly in any modern web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Live Server (Recommended)
If using VS Code, install the **Live Server** extension, right-click `index.html`, and select **Open with Live Server**. This serves the site locally at `http://127.0.0.1:5500`.

### Option 3: Python HTTP Server
Open your terminal in the `portfolio/` directory and execute:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

## 🛠️ Customizing Content

All user data is neatly organized inside:
*   **Personal details, email, phone, location** can be updated directly in [index.html](file:///home/yash/Desktop/PAL/portfolio/index.html).
*   **Themes, colors, and gradients** are controlled via CSS variables in the `:root` selector of [style.css](file:///home/yash/Desktop/PAL/portfolio/style.css).
*   **Interactive lists, typewriter speeds, and mock submission storage** are managed in [script.js](file:///home/yash/Desktop/PAL/portfolio/script.js).
