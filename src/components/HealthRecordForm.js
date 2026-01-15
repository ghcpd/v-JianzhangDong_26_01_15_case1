/**
 * ============================================================================
 * HEALTH RECORD FORM COMPONENT
 * ============================================================================
 * 
 * A modal form component for adding or editing health records.
 * 
 * Features:
 * - Date input with default to today
 * - Step count input with validation
 * - Workout duration input (minutes)
 * - Heart rate input with validation
 * - Form validation with error messages
 * - Submit and cancel actions
 * 
 * Design Notes:
 * - Modal overlay with centered form
 * - Smooth fade-in animation
 * - Clear visual hierarchy
 * - Accessible form controls with labels
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import './HealthRecordForm.css';

/**
 * Health Record Form Component
 * 
 * @param {Object} props
 * @param {Object} props.record - Existing record for editing (null for new record)
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {Function} props.onCancel - Callback when form is cancelled
 */
function HealthRecordForm({ record, onSubmit, onCancel }) {
  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  
  /**
   * Form data state - Contains all form field values
   */
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    steps: '',
    workoutDuration: '',
    heartRate: ''
  });
  
  /**
   * Form errors state - Contains validation error messages
   */
  const [errors, setErrors] = useState({});
  
  /**
   * Reference to the first input for focus management
   */
  const dateInputRef = useRef(null);

  // =========================================================================
  // EFFECTS
  // =========================================================================
  
  /**
   * Populate form with existing record data when editing
   */
  useEffect(() => {
    if (record) {
      setFormData({
        date: record.date || new Date().toISOString().split('T')[0],
        steps: record.steps?.toString() || '',
        workoutDuration: record.workoutDuration?.toString() || '',
        heartRate: record.heartRate?.toString() || ''
      });
      console.log('[HealthRecordForm] Loaded record for editing:', record.id);
    }
  }, [record]);
  
  /**
   * Focus on date input when form opens
   */
  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
    }
  }, []);

  // =========================================================================
  // FORM HANDLERS
  // =========================================================================
  
  /**
   * Handles changes to form inputs
   * Updates form data and clears related errors
   * 
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validates the form data
   * 
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Date validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    // Steps validation
    if (!formData.steps) {
      newErrors.steps = 'Step count is required';
    } else if (Number(formData.steps) < 0) {
      newErrors.steps = 'Steps cannot be negative';
    } else if (Number(formData.steps) > 100000) {
      newErrors.steps = 'Steps value seems too high';
    }
    
    // Workout duration validation
    if (!formData.workoutDuration) {
      newErrors.workoutDuration = 'Workout duration is required';
    } else if (Number(formData.workoutDuration) < 0) {
      newErrors.workoutDuration = 'Duration cannot be negative';
    } else if (Number(formData.workoutDuration) > 1440) {
      newErrors.workoutDuration = 'Duration cannot exceed 24 hours';
    }
    
    // Heart rate validation
    if (!formData.heartRate) {
      newErrors.heartRate = 'Heart rate is required';
    } else if (Number(formData.heartRate) < 30 || Number(formData.heartRate) > 220) {
      newErrors.heartRate = 'Heart rate should be between 30-220 bpm';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * Validates data and calls onSubmit callback
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submittedData = {
        ...(record && { id: record.id }),
        date: formData.date,
        steps: Number(formData.steps),
        workoutDuration: Number(formData.workoutDuration),
        heartRate: Number(formData.heartRate)
      };
      
      onSubmit(submittedData);
      console.log('[HealthRecordForm] Form submitted:', submittedData);
    } else {
      console.log('[HealthRecordForm] Form validation failed:', errors);
    }
  };

  /**
   * Handles clicking outside the modal to close it
   * 
   * @param {Event} e - Click event
   */
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('form-overlay')) {
      onCancel();
    }
  };

  /**
   * Handles escape key to close the modal
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  // =========================================================================
  // RENDER
  // =========================================================================
  
  return (
    <div className="form-overlay" onClick={handleOverlayClick}>
      <div className="form-modal" role="dialog" aria-labelledby="form-title">
        {/* Modal Header */}
        <div className="form-header">
          <h2 id="form-title" className="form-title">
            {record ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit Health Record
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Health Record
              </>
            )}
          </h2>
          <button 
            className="close-btn"
            onClick={onCancel}
            aria-label="Close form"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        {/* Form Body */}
        <form onSubmit={handleSubmit} className="form-body">
          {/* Date Input */}
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Date
            </label>
            <input
              ref={dateInputRef}
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`form-input ${errors.date ? 'input-error' : ''}`}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
          
          {/* Steps Input */}
          <div className="form-group">
            <label htmlFor="steps" className="form-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
              </svg>
              Step Count
            </label>
            <input
              type="number"
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              className={`form-input ${errors.steps ? 'input-error' : ''}`}
              placeholder="e.g., 8000"
              min="0"
              max="100000"
            />
            {errors.steps && <span className="error-message">{errors.steps}</span>}
            <span className="input-hint">Daily goal: 10,000 steps</span>
          </div>
          
          {/* Workout Duration Input */}
          <div className="form-group">
            <label htmlFor="workoutDuration" className="form-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Workout Duration (minutes)
            </label>
            <input
              type="number"
              id="workoutDuration"
              name="workoutDuration"
              value={formData.workoutDuration}
              onChange={handleChange}
              className={`form-input ${errors.workoutDuration ? 'input-error' : ''}`}
              placeholder="e.g., 45"
              min="0"
              max="1440"
            />
            {errors.workoutDuration && <span className="error-message">{errors.workoutDuration}</span>}
            <span className="input-hint">Recommended: 30-60 minutes daily</span>
          </div>
          
          {/* Heart Rate Input */}
          <div className="form-group">
            <label htmlFor="heartRate" className="form-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Average Heart Rate (bpm)
            </label>
            <input
              type="number"
              id="heartRate"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleChange}
              className={`form-input ${errors.heartRate ? 'input-error' : ''}`}
              placeholder="e.g., 75"
              min="30"
              max="220"
            />
            {errors.heartRate && <span className="error-message">{errors.heartRate}</span>}
            <span className="input-hint">Normal resting: 60-100 bpm</span>
          </div>
          
          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              {record ? 'Update Record' : 'Add Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HealthRecordForm;
