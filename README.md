# Personal Health & Fitness Tracking Dashboard

A lightweight, browser-only React single-page dashboard for daily health logging. Use it to capture steps, workout minutes, and average heart rate, and instantly see summaries and simple trend visuals. Designed with a calm green wellness theme and zero build steps: open and go.

## Features & Implementation
1. Add a Daily Health Record
   - Form in the "Add Daily Health Record" card captures date, steps, workout minutes, and average heart rate. State is stored client-side in React; new entries append to the records list.
2. Edit an Existing Health Record
   - Inline edit mode per row in the records table; swapping cells for inputs. Save updates state; cancel restores previous values.
3. Delete a Health Record
   - Row-level delete action removes the record from the in-memory list.
4. View Health Records List
   - Chronological table (sorted by date desc) showing all records. Hover states aid scanability.
5. Display Health Summary Dashboard
   - Summary tiles compute totals/averages (total steps, total workout minutes, avg heart rate) with progress bars. Trend sparks (simple bar sparklines) show recent steps and workout minutes trajectory.

## Tech & UI Notes
- Stack: React 18 via ESM CDN (no bundler), plain HTML/CSS/JS.
- Style: green wellness palette, soft cards, rounded corners, radial background accents. Fonts use Manrope for body and Space Grotesk for highlights.
- Responsiveness: auto-fit grids for summary cards and form fields; works down to mobile widths.

## How to Run (Windows, one click)
1. Ensure you have a modern browser (Edge/Chrome/Firefox) and an internet connection (for CDN React and Google Fonts).
2. Double-click `start.bat` from this folder, or run it in PowerShell/CMD:
   ```powershell
   .\start.bat
   ```
3. Your default browser opens the dashboard (served from the local file path). No installs or additional dependencies.

## Files
- `index.html` – All UI code (React components, styling, and logic).
- `start.bat` – Convenience launcher to open the dashboard in the default browser.
- `README.md` – This guide.

## Customization Tips
- Seed data: adjust `initialRecords` inside `index.html` if you want different sample rows.
- Palette: tweak CSS variables in `:root` for colors/radius/gaps.
- Data persistence: for quick demos it is in-memory; wire to localStorage or an API if you need storage.
