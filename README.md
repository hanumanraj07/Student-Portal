# 🎓 Tactical Student Portal

A bold, high-contrast **Tactical Single Page Application (SPA)** built with **Vite**, **React Router v6**, and a **Brutalist Black/Red** design system. The app functions as a student management terminal with real-time filtration and persistent data logging.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Features & Pages](#-features--pages)
  - [Navbar](#-navbar)
  - [Home Page](#-home-page-)
  - [Students Page](#-students-page-)
  - [Add Student Page](#-add-student-page-)
  - [Counter Page](#-counter-page-)
- [State Management](#-state-management)
- [LocalStorage Persistence](#-localstorage-persistence)
- [Form Validation Rules](#-form-validation-rules)
- [Routing Summary](#-routing-summary)
- [CSS & Styling](#-css--styling)

---

## 🌐 Project Overview

Student Portal is a React-based web application that allows users to:

- View a summary of registered students on the Home dashboard
- Browse a list of student/user profiles fetched from a live REST API
- Add new students through a validated form that saves data to localStorage
- Interact with a simple counter component

The app uses **client-side routing** via React Router v6 — no full page reloads at any point.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI library (functional components only) |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing (`BrowserRouter`, `Routes`, `Route`, `NavLink`) |
| localStorage | Persistent student data storage |
| Vanilla CSS | All styling (no Tailwind, no MUI, no Bootstrap) |
| `useState` / `useEffect` | All state and side-effect management |
| JSONPlaceholder API | Mock REST API for student data on the Students page |

---

## 📁 Project Structure

```
d:\React-Test\
├── public\
│   └── vite.svg
├── src\
│   ├── App.jsx                  ← Root component: BrowserRouter + Routes
│   ├── main.jsx                 ← React DOM entry point
│   ├── index.css                ← Global styles for all pages & components
│   ├── components\
│   │   └── Navbar.jsx           ← Navigation bar (shown on every page)
│   └── pages\
│       ├── Home.jsx             ← Dashboard showing stored student count
│       ├── Students.jsx         ← Fetches & displays users from API
│       ├── AddStudent.jsx       ← Form to add students with validation
│       └── Counter.jsx          ← Simple increment/decrement counter
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Running

```bash
# Install dependencies (already done if scaffolded by Vite)
npm install

# Install React Router (already installed)
npm install react-router-dom

# Start the development server
npm run dev
```

The app will be available at: **http://localhost:5173**

### Build for Production

```bash
npm run build
```

---

## ✨ Features & Pages

---

### 🔗 Navbar

**Component:** `src/components/Navbar.jsx`

The Navbar is a **sticky top navigation bar** rendered on every page via `App.jsx`. It uses React Router's `NavLink` component which automatically applies an `active` CSS class to the currently matched route link.

**Features:**
- Brand logo/title: `🎓 Student Portal`
- 4 navigation links: Home, Students, Add Student, Counter
- Active link is visually highlighted with a **blue background + white text + shadow**
- Smooth hover transitions
- Fully sticky — stays at the top while scrolling

**Links:**

| Label | Route |
|---|---|
| Home | `/` |
| Students | `/students` |
| Add Student | `/add` |
| Counter | `/counter` |

**Key code pattern:**
```jsx
<NavLink to="/" end>Home</NavLink>
// `end` prop ensures "/" only matches exactly, not all sub-routes
```

---

### 🏠 Home Page (`/`)

**Component:** `src/pages/Home.jsx`  
**Hooks used:** `useState`, `useEffect`

The Home page acts as the **application dashboard**. On component mount, it reads the `"students"` key from `localStorage` and displays the total number of registered students.

**Features:**
- Displays the app title: **"Student Portal"**
- On mount (`useEffect`), reads and parses the student array from `localStorage`
- If no students exist → shows: **"No students added yet."**
- If students exist → shows: **"Total Students Registered: N"**
- Error-safe: wraps `JSON.parse` in a `try/catch` to prevent crashes on corrupt data
- Animated page entry (CSS `fadeIn`)

**Behavior:**
```
First visit  →  "No students added yet."
After adding →  "Total Students Registered: 1"  (auto-updated on next visit)
```

---

### 👥 Students Page (`/students`)

**Component:** `src/pages/Students.jsx`  
**Hooks used:** `useState`, `useEffect`

This page **fetches live data** from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users) and displays the first 6 users as profile cards.

**Features:**
- Data fetched with `fetch()` inside `useEffect` on component mount
- Shows **"⏳ Loading..."** while the request is in-flight
- Shows a styled **error message** if the network request fails (non-2xx or network error)
- Displays exactly the **first 6 users** from the API response (`data.slice(0, 6)`)

**Each Card Displays:**
| Field | API Property |
|---|---|
| Avatar (initial) | First letter of `name` |
| Full Name | `user.name` |
| Email | `user.email` |
| Phone | `user.phone` |

**Card Design:**
- White background with rounded corners
- Box shadow with hover lift effect (`transform: translateY(-4px)`)
- Blue gradient avatar circle
- Responsive grid layout (auto-fills based on screen width)

**API Endpoint:**
```
GET https://jsonplaceholder.typicode.com/users
```

---

### ➕ Add Student Page (`/add`)

**Component:** `src/pages/AddStudent.jsx`  
**Hooks used:** `useState`

A complete **data entry form** for registering new students. The form validates all fields before saving data to `localStorage`.

**Form Fields:**

| Field | Input Type | Validation Rule |
|---|---|---|
| Full Name | `text` | Cannot be empty |
| Email Address | `text` | Must contain `@` |
| Phone Number | `text` | Must be exactly 10 digits (`/^\d{10}$/`) |
| Gender | `radio` | Must select one (Male / Female) |
| Submit | `button` | Triggers validation |

**Validation Behavior:**
- Errors appear **below each field** in red as soon as Submit is clicked
- Each individual field's error clears as soon as the user starts typing in it
- If all validations fail, all 4 error messages show simultaneously
- Validation runs on **every submit attempt** — no partial saves

**On Successful Submit:**
1. A new student object is created:
   ```js
   { id: Date.now(), name, email, phone, gender }
   ```
2. The existing localStorage `"students"` array is read, the new student is **appended**, and the updated array is saved back
3. A **green success banner** is shown: `"✅ Student added successfully!"`
4. All form fields are **reset to empty**
5. **Bonus:** The newly added student's full details are displayed in a card below the form immediately after submit

**localStorage Format:**
```json
[
  { "id": 1708000000000, "name": "John Doe", "email": "john@example.com", "phone": "9876543210", "gender": "Male" },
  { "id": 1708000001000, "name": "Jane Smith", "email": "jane@example.com", "phone": "1234567890", "gender": "Female" }
]
```

---

### 🔢 Counter Page (`/counter`)

**Component:** `src/pages/Counter.jsx`  
**Hooks used:** `useState`

A clean, visual **interactive counter** component.

**Features:**
- Initial value: **0**
- Three control buttons:
  | Button | Action |
  |---|---|
  | `+ Increment` | Adds 1 to the counter |
  | `− Decrement` | Subtracts 1 (minimum value is 0, never goes negative) |
  | `↺ Reset` | Returns counter to 0 |
- **Color logic:**
  - Value = `0` → displayed in **red** (`#e74c3c`)
  - Value > `0` → displayed in **green** (`#27ae60`)
- Large display number (7rem font size) for clear visibility
- Smooth color transition animation
- The `aria-live="polite"` attribute is included for screen reader accessibility

**State logic for decrement (never goes below 0):**
```jsx
const decrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));
```

---

## 🗃 State Management

The app uses **only React's built-in hooks** — no Redux, no Context API, no Zustand.

| Hook | Used In | Purpose |
|---|---|---|
| `useState` | All pages | Local component state (form fields, counter value, fetched data, errors) |
| `useEffect` | Home, Students | Side effects: reading localStorage on mount, fetching API on mount |

---

## 💾 LocalStorage Persistence

Student data is stored in the browser's `localStorage` under the key `"students"`.

| Operation | Where |
|---|---|
| **Write** (append) | `AddStudent.jsx` — on valid form submit |
| **Read** | `Home.jsx` — on component mount via `useEffect` |

Data survives **page refreshes** and **browser restarts**. To clear student data, open DevTools → Application → Local Storage → delete the `"students"` key.

---

## ✅ Form Validation Rules

| Field | Rule | Error Message |
|---|---|---|
| Name | Must not be empty (after trim) | `"Name cannot be empty."` |
| Email | Must contain `@` character | `"Email must contain '@'."` |
| Phone | Must match `/^\d{10}$/` (exactly 10 digits) | `"Phone must be exactly 10 digits."` |
| Gender | Must select Male or Female | `"Please select a gender."` |

---

## 🗺 Routing Summary

All routing is handled by **React Router v6** — no `<a href>` links, no page refreshes.

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Dashboard with localStorage student count |
| `/students` | `Students` | API-fetched user cards |
| `/add` | `AddStudent` | Form to add a new student |
| `/counter` | `Counter` | Interactive increment/decrement counter |

Router setup in `App.jsx`:
```jsx
<BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/"         element={<Home />} />
    <Route path="/students" element={<Students />} />
    <Route path="/add"      element={<AddStudent />} />
    <Route path="/counter"  element={<Counter />} />
  </Routes>
</BrowserRouter>
```

---

## 🎨 Tactical UI System

All styles live in **`src/index.css`** — a system-wide stylesheet optimized for clarity and high-contrast performance.

**Design Highlights:**
- **Visual Identity:** "Tactical / Brutalist" — Sharp corners, grid layouts, and critical red accents.
- **Typography:** 'Poppins' (Headings) and 'JetBrains Mono' (Data Labels & Inputs).
- **Interface Effects:** Scanline CRT overlays (`body::after`), architectural corner brackets, and LED status indicators.
- **Interactive Features:** 
    - **Real-time Filter:** Search directory by keyword on the Students page.
    - **System Clock:** Live digital readout on the Dashboard.
    - **Calibration Gauge:** Visual feedback for counter increments.
    - **Terminal Form:** Two-column high-density data registration.

**Key CSS classes:**

| Class | Used For |
|---|---|
| `.navbar` | Top sticky navigation bar |
| `.navbar-links a.active` | Active route link highlight |
| `.cards-grid` | Responsive CSS Grid for student cards |
| `.card` | Individual student card with shadow |
| `.student-form` | Add Student form container |
| `.field-error` | Red validation error text |
| `.success-msg` | Green success banner |
| `.counter-display` | Large number display on Counter page |
| `.btn-counter` | Counter control buttons |
| `.added-student-card` | Bonus: newly added student details block |

---

## 📝 Notes

- The app **will not crash** under any condition — all localStorage operations and API calls are wrapped in `try/catch` or `.catch()` handlers
- All components are **functional components** — no class components used anywhere
- The `useEffect` on the Home page has an **empty dependency array `[]`** — it runs only once on mount, reading localStorage at that point only
