/**
 * ============================================================================
 * SUMMARY DASHBOARD COMPONENT
 * ============================================================================
 * 
 * Displays a summary dashboard with:
 * - Total steps (with progress bar)
 * - Total workout duration (with progress bar)
 * - Average heart rate (with visual indicator)
 * - Weekly activity chart (bar chart visualization)
 * 
 * Design Notes:
 * - Card-based layout for clear visual separation
 * - Uses icons and colors to represent each metric
 * - Includes simple bar chart for weekly trends
 * ============================================================================
 */

import React, { useMemo } from 'react';
import './SummaryDashboard.css';

/**
 * Summary Dashboard Component
 * 
 * @param {Object} props
 * @param {Array} props.records - Array of health records to calculate statistics
 */
function SummaryDashboard({ records }) {
  // =========================================================================
  // CALCULATE STATISTICS
  // =========================================================================
  
  /**
   * Memoized calculation of dashboard statistics
   * Recalculates only when records change
   */
  const stats = useMemo(() => {
    if (!records || records.length === 0) {
      return {
        totalSteps: 0,
        totalWorkout: 0,
        avgHeartRate: 0,
        recordCount: 0,
        avgDailySteps: 0,
        weeklyData: []
      };
    }
    
    // Calculate totals and averages
    const totalSteps = records.reduce((sum, r) => sum + Number(r.steps), 0);
    const totalWorkout = records.reduce((sum, r) => sum + Number(r.workoutDuration), 0);
    const avgHeartRate = Math.round(
      records.reduce((sum, r) => sum + Number(r.heartRate), 0) / records.length
    );
    const avgDailySteps = Math.round(totalSteps / records.length);
    
    // Prepare weekly data for chart (last 7 days)
    const weeklyData = getWeeklyData(records);
    
    return {
      totalSteps,
      totalWorkout,
      avgHeartRate,
      recordCount: records.length,
      avgDailySteps,
      weeklyData
    };
  }, [records]);

  // =========================================================================
  // RENDER
  // =========================================================================
  
  return (
    <section className="summary-dashboard" aria-label="Health Summary Dashboard">
      <h2 className="section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
        Health Summary
      </h2>
      
      {/* Statistics Cards Grid */}
      <div className="stats-grid">
        {/* Total Steps Card */}
        <div className="stat-card stat-card-steps">
          <div className="stat-icon steps-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Steps</span>
            <span className="stat-value">{formatNumber(stats.totalSteps)}</span>
            <span className="stat-sublabel">Avg: {formatNumber(stats.avgDailySteps)}/day</span>
          </div>
          <div className="stat-progress">
            <div 
              className="progress-bar steps-progress"
              style={{ width: `${Math.min((stats.avgDailySteps / 10000) * 100, 100)}%` }}
              role="progressbar"
              aria-valuenow={stats.avgDailySteps}
              aria-valuemin="0"
              aria-valuemax="10000"
            />
          </div>
          <span className="progress-label">Goal: 10,000 steps/day</span>
        </div>
        
        {/* Total Workout Duration Card */}
        <div className="stat-card stat-card-workout">
          <div className="stat-icon workout-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Workout</span>
            <span className="stat-value">{formatDuration(stats.totalWorkout)}</span>
            <span className="stat-sublabel">{stats.recordCount} workout sessions</span>
          </div>
          <div className="stat-progress">
            <div 
              className="progress-bar workout-progress"
              style={{ width: `${Math.min((stats.totalWorkout / (records.length * 60)) * 100, 100)}%` }}
              role="progressbar"
            />
          </div>
          <span className="progress-label">Goal: 60 min/day</span>
        </div>
        
        {/* Average Heart Rate Card */}
        <div className="stat-card stat-card-heart">
          <div className="stat-icon heart-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Avg Heart Rate</span>
            <span className="stat-value">{stats.avgHeartRate} <small>bpm</small></span>
            <span className="stat-sublabel">{getHeartRateStatus(stats.avgHeartRate)}</span>
          </div>
          <div className="heart-rate-indicator">
            <div className="heart-zones">
              <span className={`zone ${stats.avgHeartRate < 60 ? 'active' : ''}`}>Rest</span>
              <span className={`zone ${stats.avgHeartRate >= 60 && stats.avgHeartRate < 100 ? 'active' : ''}`}>Normal</span>
              <span className={`zone ${stats.avgHeartRate >= 100 ? 'active' : ''}`}>Elevated</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weekly Activity Chart */}
      <div className="weekly-chart-container">
        <h3 className="chart-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          Weekly Activity
        </h3>
        <div className="weekly-chart">
          {stats.weeklyData.map((day, index) => (
            <div key={index} className="chart-bar-container">
              <div className="chart-bar-wrapper">
                <div 
                  className="chart-bar"
                  style={{ height: `${day.percentage}%` }}
                  title={`${day.steps.toLocaleString()} steps`}
                >
                  <span className="bar-value">{formatNumber(day.steps)}</span>
                </div>
              </div>
              <span className="chart-label">{day.day}</span>
            </div>
          ))}
        </div>
        {stats.weeklyData.length === 0 && (
          <p className="no-data-message">No data available for the past week</p>
        )}
      </div>
    </section>
  );
}

// =========================================================================
// HELPER FUNCTIONS
// =========================================================================

/**
 * Formats a number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
function formatNumber(num) {
  return num.toLocaleString();
}

/**
 * Formats duration in minutes to hours and minutes
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} min`;
}

/**
 * Returns a status description based on heart rate
 * @param {number} heartRate - Average heart rate
 * @returns {string} Status description
 */
function getHeartRateStatus(heartRate) {
  if (heartRate === 0) return 'No data';
  if (heartRate < 60) return 'Resting';
  if (heartRate < 100) return 'Normal range';
  return 'Elevated';
}

/**
 * Prepares weekly data for the bar chart
 * @param {Array} records - Health records
 * @returns {Array} Weekly data with day labels and percentages
 */
function getWeeklyData(records) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const weekData = [];
  
  // Get last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Find record for this date
    const record = records.find(r => r.date === dateStr);
    const steps = record ? Number(record.steps) : 0;
    
    weekData.push({
      day: days[date.getDay()],
      date: dateStr,
      steps: steps,
      percentage: Math.min((steps / 10000) * 100, 100) // Cap at 100%
    });
  }
  
  return weekData;
}

export default SummaryDashboard;
