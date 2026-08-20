# 🧭 Planify: Academic Resource & Career Comeback Planning Portal

[![Built with Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](LICENSE)
[![Deployed on Render](https://img.shields.io/badge/Deploy-onRender-46E3B7?style=flat-square&logo=render&logoColor=black)](https://render.com)

> **A precision time-budgeting and working hours intelligence engine built for parents navigating career comebacks, upskilling, and intensive job search investments against academic school schedules.**

---

## 🎯 The "Why": Why Google Calendar Fails Career Comebacks

For non-working parents or career-returners orchestrating a comeback into the workforce, **time is the most non-renewable, precious capital**. Balancing household management, childcare logistics, school schedules, and dedicated job search/upskilling blocks is a delicate, high-stakes equilibrium.

### The Problem with Traditional Calendars (e.g., Google Calendar)
1. **No Compounding Cost Visibility**: Standard calendars show scheduled events as passive static blocks. When an unexpected chore or distraction derails a morning session, Google Calendar simply displays the passed event with zero awareness of how much usable time remains for the rest of the day, week, or month.
2. **Loss of Momentum**: A lost day feels isolated on traditional calendar views, hiding the cumulative deficit in weekly career investment.
3. **Academic Blindspots**: School calendars are riddled with asymmetrical schedules—early releases, teacher records days, grading period boundaries, fall/spring breaks, and federal holidays. Tracking which days yield **11.58 hours** of focus versus **5.0 hours** is manual and error-prone in generic apps.

### The Planify Solution
**Planify provides radical time transparency.** It dynamically calculates and displays **Future Available Working Hours** in real time. If 2 hours of your day slip by, the system immediately recalculates remaining capacity without double-counting elapsed time. This instant feedback loop preserves psychological momentum and treats your career comeback with executive-grade rigor.

---

## ⏰ Working Hours Architecture & Formulas

Working hours are mathematically derived from the official **Center Grove Community School Corporation 2026–2027 Academic Calendar** (`docs/Calendars.pdf`):

### 1. Regular School Days (180 Total Student Days)
On days when school is in session, your time budget is structured into **3 high-efficiency focus shifts**:
- **Shift 1 (Early Morning Focus):** `5:00 AM – 8:00 AM` (3h 00m = 180 min)
- **Shift 2 (Core School Hours):** `9:15 AM – 3:50 PM` (6h 35m = 395 min = 6.5833 hrs)
- **Shift 3 (Late Afternoon Wrap-Up):** `4:00 PM – 6:00 PM` (2h 00m = 120 min)
- **Total School Day Capacity:** **`11h 35m`** (695 min / **11.5833 hours**)

### 2. Weekends & Non-School Days
On weekends, federal holidays, school breaks (Fall, Thanksgiving, Winter, Spring), teacher work days, and summer recess:
- **Shift 1 (Early Morning Block):** `5:00 AM – 8:00 AM` (3h 00m = 180 min)
- **Shift 2 (Late Afternoon Block):** `4:00 PM – 6:00 PM` (2h 00m = 120 min)
- **Total Non-School Day Capacity:** **`5h 00m`** (300 min / **5.0 hours**)

---

## 🚀 Key Portal Features

### 1. ⚡ Dynamic Future Available Time Engine
- **Zero Past Contamination**: When any date or reference time cutoff is selected, the application calculates *only* the remaining available working minutes from that exact minute onward. Elapsed hours are tracked separately.
- **Interactive Scrubber & Presets**: Simulate any cutoff time (`5:00 AM`, `8:00 AM`, `9:15 AM`, `12:00 PM`, `3:50 PM`, `4:00 PM`, `6:00 PM`) or sync to live real-time system clock.

### 2. 📅 Comprehensive Tri-View System
- **Day View**: Hour-by-hour timeline (`4:00 AM – 7:00 PM`) with active pulse indicators, completed past shift shading, upcoming availability counters, and official event descriptions.
- **Month View**: 7-column calendar matrix displaying daily working hours badges (`11h 35m` in emerald green vs `5h 00m` in slate), holiday markers, and real-time monthly available hours aggregators.
- **Year View**: 12-month academic heatmap (July 2026 – June 2027) with Semester 1 (`89 days`) vs Semester 2 (`91 days`) metrics and total annual career investment potential.

### 3. 🏷️ Center Grove Calendar Key Integration
Accurately maps every milestone from `docs/Calendars.pdf`:
- 🟢 **Semester Boundaries & First/Last Days**: Aug 5 (First Student Day), Dec 18 (Sem 1 End), Jan 5 (Sem 2 Start), May 27 (Last Student Day).
- 🔵 **Teacher Professional Development (No Students)**: July 31, Aug 3–4, Jan 4, May 28.
- 🟡 **Holiday & School Breaks**: Labor Day, Fall Break (Oct 12–16), Thanksgiving (Nov 23–27), Winter Break (Dec 21–Jan 1), MLK Day, Presidents Day, Spring Break (Mar 22–Apr 2), Memorial Day.
- 🔴 **End of Grading Periods**: Q1 (Oct 2), Q2 (Dec 18), Q3 (Mar 10), Q4 (May 27).
- 🟣 **Special Ceremonies**: Aug 12 (Preschool First Day), June 6 (High School Graduation).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript (ESNext / Strict Type Checking)
- **Build Tool**: Vite 8.2 (Lightning-fast HMR & optimized production bundling)
- **Styling**: Modern Vanilla CSS Design System (Glassmorphism, custom color tokens, responsive grid)
- **Typography**: Plus Jakarta Sans & JetBrains Mono

---

## 💻 Getting Started & Local Development

### Prerequisites
- Node.js (v18.0.0 or later recommended)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/SrilakshmiSripathi/school-days-or-not-portal.git
cd school-days-or-not-portal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to interact with the live portal.

### 4. Build for Production
```bash
npm run build
```
This compiles the TypeScript code and generates an optimized production bundle in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🤖 Credits & Acknowledgments

- **Architected & Engineered with Gemini**: Special credit and recognition to **Google Gemini** for engineering this custom calendar and working hours intelligence engine. When generic tools like Google Calendar fail to compute dynamic future time availability, Gemini designed this precision tool to empower parents with clarity, momentum, and career acceleration.
- **Calendar Data Source**: Center Grove Community School Corporation Academic Calendar 2026–2027 (`docs/Calendars.pdf`).

---

## 📄 Disclaimer & License

### Disclaimer
> [!NOTE]
> This application is an independent resource planning and time-budgeting tool developed for personal career planning and schedule optimization. While calendar milestones are mapped directly from the Center Grove Community School Corporation 2026–2027 published calendar, users should always cross-reference official district announcements for weather delays, emergency cancellations, or revised administrative dates.

### License
This project is open-source and licensed under the **[MIT License](LICENSE)**.

```
MIT License
Copyright (c) 2026 Srilakshmi Sripathi
```
