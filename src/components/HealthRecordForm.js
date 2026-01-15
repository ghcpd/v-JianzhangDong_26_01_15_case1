/**
 * HealthRecordForm Component
 * 
 * Purpose: Form component for adding new health records or editing existing ones
 * 
 * Props:
 * - onAddRecord: Function to handle adding a new record
 * - onUpdateRecord: Function to handle updating an existing record
 * - editingRecord: Record object being edited (null if adding new)
 * - onCancelEdit: Function to cancel editing mode
 * 
 * Features:
 * 1. Dual mode: Add new record or edit existing record
 * 2. Form validation for all required fields
 * 3. Visual feedback for editing mode
 * 4. Clear form after submission
 * 5. Cancel button when editing
 * 
 * Form Fields:
 * - Date: Date input (required)
 * - Steps: Number input (required, min: 0)
 * - Workout Duration: Number input in minutes (required, min: 0)
 * - Heart Rate: Number input in BPM (required, min: 40, max: 200)
 */

import React, { useState, useEffect } from 'react';
import './HealthRecordForm.css';

function HealthRecordForm({ onAddRecord, onUpdateRecord, editingRecord, onCancelEdit }) {
  // Form state
  const [formData, setFormData] = useState({
    date: '',
    steps: '',
    workoutDuration: '',
    heartRate: ''
  });

  // Load editing record data into form when editingRecord changes
  useEffect(() => {
    if (editingRecord) {
      setFormData({
        date: editingRecord.date,
        steps: editingRecord.steps,
        workoutDuration: editingRecord.workoutDuration,
        heartRate: editingRecord.heartRate
      });
    } else {
      // Reset form when not editing
      setFormData({
        date: '',
        steps: '',
        workoutDuration: '',
        heartRate: ''
      });
    }
  }, [editingRecord]);

  /**
   * Handle input changes
   * @param {Event} e - Change event from input field
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!formData.date || !formData.steps || !formData.workoutDuration || !formData.heartRate) {
      alert('Please fill in all fields');
      return;
    }

    // Convert string values to numbers
    const recordData = {
      date: formData.date,
      steps: parseInt(formData.steps, 10),
      workoutDuration: parseInt(formData.workoutDuration, 10),
      heartRate: parseInt(formData.heartRate, 10)
    };

    // Validate numeric ranges
    if (recordData.steps < 0) {
      alert('Steps cannot be negative');
      return;
    }
    if (recordData.workoutDuration < 0) {
      alert('Workout duration cannot be negative');
      return;
    }
    if (recordData.heartRate < 40 || recordData.heartRate > 200) {
      alert('Heart rate must be between 40 and 200 BPM');
      return;
    }

    // Call appropriate handler based on mode
    if (editingRecord) {
      onUpdateRecord({ ...recordData, id: editingRecord.id });
    } else {
      onAddRecord(recordData);
    }

    // Reset form after submission
    setFormData({
      date: '',
      steps: '',
      workoutDuration: '',
      heartRate: ''
    });
  };

  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    onCancelEdit();
    setFormData({
      date: '',
      steps: '',
      workoutDuration: '',
      heartRate: ''
    });
  };

  return (
    <div className="health-record-form">
      {/* Form Header */}
      <div className="form-header">
        <h2 className="form-title">
          {editingRecord ? '✏️ Edit Health Record' : '➕ Add Health Record'}
        </h2>
        <p className="form-description">
          {editingRecord 
            ? 'Update your health record details below' 
            : 'Record your daily health and fitness metrics'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form">
        {/* Date Field */}
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            📅 Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
            required
            max={new Date().toISOString().split('T')[0]} // Cannot select future dates
          />
        </div>

        {/* Steps Field */}
        <div className="form-group">
          <label htmlFor="steps" className="form-label">
            👟 Steps
          </label>
          <input
            type="number"
            id="steps"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., 10000"
            min="0"
            required
          />
          <span className="form-hint">Number of steps walked today</span>
        </div>

        {/* Workout Duration Field */}
        <div className="form-group">
          <label htmlFor="workoutDuration" className="form-label">
            ⏱️ Workout Duration (minutes)
          </label>
          <input
            type="number"
            id="workoutDuration"
            name="workoutDuration"
            value={formData.workoutDuration}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., 45"
            min="0"
            required
          />
          <span className="form-hint">Total exercise time in minutes</span>
        </div>

        {/* Heart Rate Field */}
        <div className="form-group">
          <label htmlFor="heartRate" className="form-label">
            ❤️ Average Heart Rate (BPM)
          </label>
          <input
            type="number"
            id="heartRate"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., 72"
            min="40"
            max="200"
            required
          />
          <span className="form-hint">Heart rate in beats per minute (40-200)</span>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingRecord ? '💾 Update Record' : '➕ Add Record'}
          </button>
          {editingRecord && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              ❌ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default HealthRecordForm;
