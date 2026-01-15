/**
 * HealthRecordsList Component
 * 
 * Purpose: Display all health records in a table format with action buttons
 * 
 * Props:
 * - records: Array of health record objects
 * - onEditRecord: Function to handle editing a record
 * - onDeleteRecord: Function to handle deleting a record
 * 
 * Features:
 * 1. Display records in reverse chronological order (newest first)
 * 2. Show all record details in a responsive table
 * 3. Edit and Delete action buttons for each record
 * 4. Empty state message when no records exist
 * 5. Visual indicators for health metrics
 * 
 * Display Format:
 * - Date: Formatted as readable date
 * - Steps: Number with commas
 * - Workout Duration: Minutes with unit label
 * - Heart Rate: BPM with unit label
 * - Actions: Edit and Delete buttons
 */

import React from 'react';
import './HealthRecordsList.css';

function HealthRecordsList({ records, onEditRecord, onDeleteRecord }) {
  /**
   * Format date to readable string
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    };
    return date.toLocaleDateString('en-US', options);
  };

  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number string
   */
  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };

  /**
   * Get heart rate category and color
   * @param {number} heartRate - Heart rate in BPM
   * @returns {object} Category info with label and className
   */
  const getHeartRateCategory = (heartRate) => {
    if (heartRate < 60) return { label: 'Low', className: 'hr-low' };
    if (heartRate <= 100) return { label: 'Normal', className: 'hr-normal' };
    return { label: 'High', className: 'hr-high' };
  };

  // Sort records by date (newest first)
  const sortedRecords = [...records].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="health-records-list">
      {/* List Header */}
      <div className="list-header">
        <h2 className="list-title">📊 Health Records</h2>
        <p className="list-description">
          Total Records: <span className="record-count">{records.length}</span>
        </p>
      </div>

      {/* Records Table or Empty State */}
      {sortedRecords.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3 className="empty-title">No Health Records Yet</h3>
          <p className="empty-message">
            Start tracking your health by adding your first daily record!
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="records-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Steps</th>
                <th>Workout (min)</th>
                <th>Heart Rate (BPM)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.map((record) => {
                const hrCategory = getHeartRateCategory(record.heartRate);
                return (
                  <tr key={record.id} className="record-row">
                    <td className="date-cell">
                      <span className="date-text">{formatDate(record.date)}</span>
                    </td>
                    <td className="steps-cell">
                      <span className="metric-value">{formatNumber(record.steps)}</span>
                      <span className="metric-icon">👟</span>
                    </td>
                    <td className="workout-cell">
                      <span className="metric-value">{record.workoutDuration}</span>
                      <span className="metric-unit">min</span>
                      <span className="metric-icon">⏱️</span>
                    </td>
                    <td className="heartrate-cell">
                      <span className="metric-value">{record.heartRate}</span>
                      <span className="metric-unit">BPM</span>
                      <span className={`hr-badge ${hrCategory.className}`}>
                        {hrCategory.label}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        onClick={() => onEditRecord(record)}
                        className="action-btn edit-btn"
                        title="Edit record"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onDeleteRecord(record.id)}
                        className="action-btn delete-btn"
                        title="Delete record"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HealthRecordsList;
