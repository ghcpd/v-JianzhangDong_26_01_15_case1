# Health & Fitness Dashboard

A **Personal Health & Fitness Tracking Dashboard** built with React for daily health and exercise tracking. This application allows users to record daily activity metrics and review summaries and trends to better understand their physical activity patterns.

![Health Dashboard Preview](https://via.placeholder.com/800x400/2E7D32/FFFFFF?text=Health+%26+Fitness+Dashboard)

## 📋 Project Overview

### Real-World Use Case

This dashboard is designed for individuals who want to:
- Track their daily health metrics including steps, workout duration, and heart rate
- Monitor their progress toward fitness goals (e.g., 10,000 steps/day)
- Visualize weekly activity trends through charts and statistics
- Maintain a historical log of their health data for long-term analysis

### Target Users
- Fitness enthusiasts tracking daily activities
- Health-conscious individuals monitoring wellness metrics
- Anyone wanting to build healthy exercise habits

---

## ✨ Features

### 1. Add a Daily Health Record
**Description:** Add a new daily record with date, step count, workout duration (minutes), and average heart rate.

**Implementation:**
- Click the "Add Record" button in the header
- A modal form appears with input fields for:
  - **Date**: Date picker (defaults to today, cannot be future dates)
  - **Step Count**: Numeric input (validated 0-100,000)
  - **Workout Duration**: Minutes spent exercising (validated 0-1440 min)
  - **Heart Rate**: Average BPM during activity (validated 30-220 bpm)
- Form validation ensures all fields are filled with valid data
- Records are saved to localStorage for persistence

### 2. Edit an Existing Health Record
**Description:** Modify an existing record's details, including steps, workout duration, and heart rate.

**Implementation:**
- Each record in the list has an "Edit" button (pencil icon)
- Clicking edit opens the same form pre-filled with existing data
- Users can modify any field and save changes
- Updates are immediately reflected in the dashboard and list

### 3. Delete a Health Record
**Description:** Remove an existing daily health record from the list.

**Implementation:**
- Each record has a "Delete" button (trash icon)
- Clicking delete shows a confirmation dialog
- Upon confirmation, the record is removed from the list
- Dashboard statistics are recalculated automatically

### 4. View Health Records List
**Description:** Display all recorded health data in a chronological list or table format.

**Implementation:**
- Records displayed in a responsive table (desktop) or card layout (mobile)
- Sorted by date (newest first)
- Each record shows:
  - Day of week and formatted date
  - Step count with mini progress bar
  - Workout duration in minutes
  - Heart rate in BPM
  - Edit and Delete action buttons
- Empty state message when no records exist

### 5. Display Health Summary Dashboard
**Description:** Show a summary dashboard with total steps, total workout duration, and average heart rate, including simple visual indicators or charts.

**Implementation:**
- **Total Steps Card**: Shows cumulative steps with daily average and progress toward 10,000 step goal
- **Total Workout Card**: Shows total minutes exercised with session count
- **Average Heart Rate Card**: Displays average BPM with zone indicator (Rest/Normal/Elevated)
- **Weekly Activity Chart**: Bar chart showing step counts for the last 7 days
- All statistics update in real-time as records are added/edited/deleted

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 14.0 or higher)
  - Download from: https://nodejs.org/
  - Recommended: LTS (Long Term Support) version
- **npm** (included with Node.js)

### Quick Start (Windows)

1. **Clone or download** this project to your local machine

2. **Run the startup script:**
   ```
   Double-click: start.bat
   ```
   
   Or from command prompt:
   ```cmd
   cd path\to\health-fitness-dashboard
   start.bat
   ```

3. **Wait for the application to start:**
   - The script will automatically install dependencies if needed
   - The development server will start
   - Your default browser will open to `http://localhost:3000`

### Manual Setup

If you prefer manual setup or are not on Windows:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

---

## 📁 Project Structure

```
health-fitness-dashboard/
├── public/
│   └── index.html          # HTML template with Google Fonts
├── src/
│   ├── components/
│   │   ├── Header.js       # App header with branding and add button
│   │   ├── Header.css      # Header styles
│   │   ├── SummaryDashboard.js    # Statistics and charts component
│   │   ├── SummaryDashboard.css   # Dashboard styles
│   │   ├── HealthRecordForm.js    # Add/Edit form modal
│   │   ├── HealthRecordForm.css   # Form styles
│   │   ├── HealthRecordsList.js   # Records table/cards component
│   │   └── HealthRecordsList.css  # List styles
│   ├── App.js              # Main application component
│   ├── App.css             # App layout styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles and CSS variables
├── package.json            # Project dependencies and scripts
├── start.bat              # Windows startup script
└── README.md              # This documentation file
```

---

## 🎨 Design System

### Color Palette (Green Health Theme)

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Forest Green | `#2E7D32` | Primary brand, headers |
| Medium Green | `#43A047` | Secondary actions, icons |
| Light Green | `#66BB6A` | Tertiary elements |
| Pale Green | `#81C784` | Hover states |
| Background Green | `#E8F5E9` | Light backgrounds |
| Red (Accent) | `#E53935` | Heart rate, delete actions |

### Typography

- **Font Family:** Inter (Google Fonts)
- **Sizes:** 0.625rem (10px) to 2rem (32px)
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Spacing (8px base unit)

- Micro: 4px | Tight: 8px | Compact: 12px
- Standard: 16px | Comfortable: 20px | Generous: 24px
- Section: 32px | Large: 48px | Major: 64px

### Border Radius

- Small: 4px | Medium: 8px | Large: 12px
- XL: 16px | XXL: 20px | Circle: 50%

---

## 🔧 Technical Details

### Technologies Used

- **React 18.2.0** - UI library
- **Create React App** - Build tooling
- **CSS3** - Styling (no external CSS frameworks)
- **localStorage** - Data persistence

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Responsive Breakpoints

- **Desktop:** > 992px
- **Tablet:** 576px - 992px
- **Mobile:** < 576px

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Launches the test runner |
| `npm run eject` | Ejects from Create React App |

---

## 💡 Tips for Usage

1. **First Time Setup:** Sample data is loaded automatically for demonstration
2. **Data Persistence:** All records are saved to browser localStorage
3. **Goal Tracking:** Aim for 10,000 steps and 60 minutes of workout daily
4. **Heart Rate Zones:**
   - Rest: < 60 bpm
   - Normal: 60-100 bpm
   - Elevated: > 100 bpm

---

## 🐛 Troubleshooting

### "Node.js is not installed" error
- Download and install Node.js from https://nodejs.org/
- Restart your command prompt after installation

### Dependencies won't install
- Check your internet connection
- Try running `npm cache clean --force` then `npm install`

### Port 3000 is already in use
- Either stop the other application using port 3000
- Or set a different port: `set PORT=3001 && npm start`

### Browser doesn't open automatically
- Manually navigate to `http://localhost:3000`

---

## 📄 License

This project is created for demonstration purposes.

---

## 👤 Author

Health Dashboard Team - 2026

---

**Happy Tracking! 🏃‍♂️💪❤️**
