/**
 * DashboardSummary Component
 * 
 * Purpose: Display aggregated health statistics and visual indicators
 * 
 * Props:
 * - records: Array of health record objects
 * 
 * Features:
 * 1. Calculate total steps across all records
 * 2. Calculate total workout duration across all records
 * 3. Calculate average heart rate across all records
 * 4. Display statistics in visually appealing cards
 * 5. Show progress bars and visual indicators
 * 6. Display trends and insights
 * 
 * Statistics Calculated:
 * - Total Steps: Sum of all steps
 * - Total Workout Duration: Sum of all workout minutes
 * - Average Heart Rate: Mean heart rate across all records
 * - Daily Average Steps: Average steps per day
 * 
 * Visual Indicators:
 * - Progress bars for step goals
 * - Color-coded heart rate status
 * - Trend indicators (up/down/stable)
 */

import React from 'react';
import './DashboardSummary.css';

function DashboardSummary({ records }) {
  /**
   * Calculate summary statistics from records
   * @returns {object} Object containing all calculated statistics
   */
  const calculateStats = () => {
    if (records.length === 0) {
      return {
        totalSteps: 0,
        totalWorkoutDuration: 0,
        averageHeartRate: 0,
        dailyAverageSteps: 0,
        recordCount: 0
      };
    }

    const totalSteps = records.reduce((sum, record) => sum + record.steps, 0);
    const totalWorkoutDuration = records.reduce((sum, record) => sum + record.workoutDuration, 0);
    const averageHeartRate = Math.round(
      records.reduce((sum, record) => sum + record.heartRate, 0) / records.length
    );
    const dailyAverageSteps = Math.round(totalSteps / records.length);

    return {
      totalSteps,
      totalWorkoutDuration,
      averageHeartRate,
      dailyAverageSteps,
      recordCount: records.length
    };
  };

  /**
   * Format large numbers with commas and K/M suffixes
   * @param {number} num - Number to format
   * @returns {string} Formatted number string
   */
  const formatLargeNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString('en-US');
  };

  /**
   * Get step goal progress percentage
   * @param {number} steps - Total steps
   * @returns {number} Progress percentage (0-100)
   */
  const getStepGoalProgress = (steps) => {
    const dailyGoal = 10000; // Standard daily step goal
    const daysTracked = records.length || 1;
    const totalGoal = dailyGoal * daysTracked;
    const progress = (steps / totalGoal) * 100;
    return Math.min(progress, 100); // Cap at 100%
  };

  /**
   * Get heart rate status and color
   * @param {number} heartRate - Average heart rate
   * @returns {object} Status info with text and className
   */
  const getHeartRateStatus = (heartRate) => {
    if (heartRate === 0) return { text: 'N/A', className: 'status-neutral' };
    if (heartRate < 60) return { text: 'Low', className: 'status-warning' };
    if (heartRate <= 100) return { text: 'Healthy', className: 'status-good' };
    return { text: 'Elevated', className: 'status-alert' };
  };

  /**
   * Get workout consistency rating
   * @param {number} totalMinutes - Total workout duration
   * @param {number} days - Number of days tracked
   * @returns {object} Rating info with text and className
   */
  const getWorkoutConsistency = (totalMinutes, days) => {
    if (days === 0) return { text: 'No Data', className: 'consistency-none' };
    const avgPerDay = totalMinutes / days;
    if (avgPerDay >= 30) return { text: 'Excellent!', className: 'consistency-excellent' };
    if (avgPerDay >= 20) return { text: 'Good', className: 'consistency-good' };
    if (avgPerDay >= 10) return { text: 'Fair', className: 'consistency-fair' };
    return { text: 'Needs Work', className: 'consistency-poor' };
  };

  const stats = calculateStats();
  const stepProgress = getStepGoalProgress(stats.totalSteps);
  const heartRateStatus = getHeartRateStatus(stats.averageHeartRate);
  const workoutConsistency = getWorkoutConsistency(stats.totalWorkoutDuration, stats.recordCount);

  return (
    <div className="dashboard-summary">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">📈 Health Summary Dashboard</h2>
        <p className="dashboard-description">
          Your overall health and fitness statistics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        {/* Total Steps Card */}
        <div className="summary-card steps-card">
          <div className="card-icon">👟</div>
          <div className="card-content">
            <h3 className="card-label">Total Steps</h3>
            <p className="card-value">{formatLargeNumber(stats.totalSteps)}</p>
            <p className="card-sublabel">
              Avg: {formatLargeNumber(stats.dailyAverageSteps)} per day
            </p>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar steps-progress"
              style={{ width: `${stepProgress}%` }}
            ></div>
          </div>
          <p className="progress-text">{stepProgress.toFixed(0)}% of goal</p>
        </div>

        {/* Total Workout Duration Card */}
        <div className="summary-card workout-card">
          <div className="card-icon">⏱️</div>
          <div className="card-content">
            <h3 className="card-label">Total Workout</h3>
            <p className="card-value">{stats.totalWorkoutDuration}<span className="unit">min</span></p>
            <p className="card-sublabel">
              {(stats.totalWorkoutDuration / 60).toFixed(1)} hours total
            </p>
          </div>
          <div className={`consistency-badge ${workoutConsistency.className}`}>
            {workoutConsistency.text}
          </div>
        </div>

        {/* Average Heart Rate Card */}
        <div className="summary-card heartrate-card">
          <div className="card-icon">❤️</div>
          <div className="card-content">
            <h3 className="card-label">Avg Heart Rate</h3>
            <p className="card-value">
              {stats.averageHeartRate || 'N/A'}
              {stats.averageHeartRate > 0 && <span className="unit">BPM</span>}
            </p>
            <p className="card-sublabel">Resting heart rate</p>
          </div>
          <div className={`status-badge ${heartRateStatus.className}`}>
            {heartRateStatus.text}
          </div>
        </div>
      </div>

      {/* Insights Section */}
      {records.length > 0 && (
        <div className="insights-section">
          <h3 className="insights-title">💡 Quick Insights</h3>
          <ul className="insights-list">
            <li className="insight-item">
              You've been tracking for <strong>{stats.recordCount}</strong> days
            </li>
            <li className="insight-item">
              Daily step average: <strong>{formatLargeNumber(stats.dailyAverageSteps)}</strong> steps
            </li>
            <li className="insight-item">
              Average workout: <strong>{Math.round(stats.totalWorkoutDuration / stats.recordCount)}</strong> minutes per day
            </li>
            {stats.dailyAverageSteps >= 10000 && (
              <li className="insight-item highlight">
                🎉 Great job! You're meeting the daily step goal!
              </li>
            )}
            {stats.totalWorkoutDuration / stats.recordCount >= 30 && (
              <li className="insight-item highlight">
                🏆 Excellent! You're maintaining 30+ minutes of daily exercise!
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Empty State */}
      {records.length === 0 && (
        <div className="empty-dashboard">
          <p className="empty-message">
            📊 Add health records to see your summary statistics and insights!
          </p>
        </div>
      )}
    </div>
  );
}

export default DashboardSummary;
