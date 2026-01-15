/**
 * ============================================================================
 * HEALTH RECORDS LIST COMPONENT
 * ============================================================================
 * 
 * Displays all health records in a chronological list/table format.
 * 
 * Features:
 * - Responsive table/card layout
 * - Date formatting
 * - Visual indicators for metrics
 * - Edit and delete action buttons
 * - Empty state handling
 * 
 * Design Notes:
 * - Table layout on desktop, card layout on mobile
 * - Color-coded metrics for quick scanning
 * - Hover effects for interactivity
 * ============================================================================
 */

import React from 'react';
import './HealthRecordsList.css';

/**
 * Health Records List Component
 * 
 * @param {Object} props
 * @param {Array} props.records - Array of health records to display
 * @param {Function} props.onEdit - Callback when edit button is clicked
 * @param {Function} props.onDelete - Callback when delete button is clicked
 */
function HealthRecordsList({ records, onEdit, onDelete }) {
  // =========================================================================
  // RENDER
  // =========================================================================
  
  return (
    <section className="records-section" aria-label="Health Records List">
      {/* Section Header */}
      <div className="records-header">
        <h2 className="section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Health Records
        </h2>
        <span className="record-count">
          {records.length} {records.length === 1 ? 'record' : 'records'}
        </span>
      </div>
      
      {/* Records Content */}
      {records.length === 0 ? (
        // Empty State
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="15" y2="16" />
            </svg>
          </div>
          <h3 className="empty-title">No Health Records Yet</h3>
          <p className="empty-description">
            Start tracking your health journey by adding your first daily record.
          </p>
        </div>
      ) : (
        // Records Table
        <div className="records-table-container">
          <table className="records-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Steps</th>
                <th>Workout</th>
                <th>Heart Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <RecordRow
                  key={record.id}
                  record={record}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
          
          {/* Mobile Card View */}
          <div className="records-cards">
            {records.map((record) => (
              <RecordCard
                key={record.id}
                record={record}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Record Row Component - Table row for desktop view
 * 
 * @param {Object} props
 * @param {Object} props.record - The health record data
 * @param {Function} props.onEdit - Edit callback
 * @param {Function} props.onDelete - Delete callback
 */
function RecordRow({ record, onEdit, onDelete }) {
  return (
    <tr className="record-row">
      {/* Date Column */}
      <td className="cell-date">
        <div className="date-display">
          <span className="date-day">{formatDay(record.date)}</span>
          <span className="date-full">{formatDate(record.date)}</span>
        </div>
      </td>
      
      {/* Steps Column */}
      <td className="cell-steps">
        <div className="metric-display">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
          </svg>
          <span className="metric-value">{Number(record.steps).toLocaleString()}</span>
          <span className="metric-label">steps</span>
        </div>
        <div className="mini-progress">
          <div 
            className="mini-progress-bar steps-bar"
            style={{ width: `${Math.min((record.steps / 10000) * 100, 100)}%` }}
          />
        </div>
      </td>
      
      {/* Workout Duration Column */}
      <td className="cell-workout">
        <div className="metric-display">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="metric-value">{record.workoutDuration}</span>
          <span className="metric-label">min</span>
        </div>
      </td>
      
      {/* Heart Rate Column */}
      <td className="cell-heart">
        <div className="metric-display heart-display">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="metric-value">{record.heartRate}</span>
          <span className="metric-label">bpm</span>
        </div>
      </td>
      
      {/* Actions Column */}
      <td className="cell-actions">
        <div className="action-buttons">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(record)}
            aria-label={`Edit record from ${formatDate(record.date)}`}
            title="Edit record"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(record.id)}
            aria-label={`Delete record from ${formatDate(record.date)}`}
            title="Delete record"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

/**
 * Record Card Component - Card view for mobile devices
 * 
 * @param {Object} props
 * @param {Object} props.record - The health record data
 * @param {Function} props.onEdit - Edit callback
 * @param {Function} props.onDelete - Delete callback
 */
function RecordCard({ record, onEdit, onDelete }) {
  return (
    <div className="record-card">
      {/* Card Header with Date */}
      <div className="card-header">
        <div className="card-date">
          <span className="date-day">{formatDay(record.date)}</span>
          <span className="date-full">{formatDate(record.date)}</span>
        </div>
        <div className="card-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(record)}
            aria-label={`Edit record from ${formatDate(record.date)}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(record.id)}
            aria-label={`Delete record from ${formatDate(record.date)}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Card Metrics */}
      <div className="card-metrics">
        <div className="card-metric steps-metric">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
          </svg>
          <div className="metric-info">
            <span className="metric-value">{Number(record.steps).toLocaleString()}</span>
            <span className="metric-label">steps</span>
          </div>
        </div>
        
        <div className="card-metric workout-metric">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <div className="metric-info">
            <span className="metric-value">{record.workoutDuration}</span>
            <span className="metric-label">minutes</span>
          </div>
        </div>
        
        <div className="card-metric heart-metric">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <div className="metric-info">
            <span className="metric-value">{record.heartRate}</span>
            <span className="metric-label">bpm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// HELPER FUNCTIONS
// =========================================================================

/**
 * Formats a date string to a readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date (e.g., "Jan 15, 2026")
 */
function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Returns the day of week from a date string
 * @param {string} dateStr - ISO date string
 * @returns {string} Day of week (e.g., "Monday")
 */
function formatDay(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export default HealthRecordsList;
