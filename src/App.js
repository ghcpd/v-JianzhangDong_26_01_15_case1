/**
 * ============================================================================
 * HEALTH & FITNESS TRACKING DASHBOARD - Main Application Component
 * ============================================================================
 * 
 * A comprehensive personal health tracking dashboard that allows users to:
 * 1. Add daily health records (date, steps, workout duration, heart rate)
 * 2. Edit existing health records
 * 3. Delete health records
 * 4. View all records in a chronological list
 * 5. View summary dashboard with statistics and visualizations
 * 
 * @author Health Dashboard Team
 * @version 1.0.0
 * ============================================================================
 */

import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// Import child components
import Header from './components/Header';
import SummaryDashboard from './components/SummaryDashboard';
import HealthRecordForm from './components/HealthRecordForm';
import HealthRecordsList from './components/HealthRecordsList';

/**
 * Main App Component
 * Manages the global state for health records and orchestrates all features
 */
function App() {
  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  
  /**
   * Health records state - Array of health record objects
   * Each record contains: { id, date, steps, workoutDuration, heartRate }
   */
  const [records, setRecords] = useState([]);
  
  /**
   * Form visibility state - Controls whether the add/edit form is shown
   */
  const [showForm, setShowForm] = useState(false);
  
  /**
   * Edit mode state - Stores the record being edited (null when adding new)
   */
  const [editingRecord, setEditingRecord] = useState(null);

  // =========================================================================
  // DATA PERSISTENCE (localStorage)
  // =========================================================================
  
  /**
   * Load records from localStorage on initial mount
   * This ensures data persists across browser sessions
   */
  useEffect(() => {
    const savedRecords = localStorage.getItem('healthRecords');
    if (savedRecords) {
      try {
        const parsedRecords = JSON.parse(savedRecords);
        setRecords(parsedRecords);
        console.log('[App] Loaded records from localStorage:', parsedRecords.length);
      } catch (error) {
        console.error('[App] Error parsing localStorage data:', error);
      }
    } else {
      // Load sample data for demonstration
      const sampleData = generateSampleData();
      setRecords(sampleData);
      console.log('[App] Loaded sample data for demonstration');
    }
  }, []);

  /**
   * Save records to localStorage whenever records state changes
   */
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem('healthRecords', JSON.stringify(records));
      console.log('[App] Saved records to localStorage:', records.length);
    }
  }, [records]);

  // =========================================================================
  // FEATURE 1: ADD A DAILY HEALTH RECORD
  // =========================================================================
  
  /**
   * Adds a new health record to the records array
   * Generates a unique ID and adds the record with timestamp
   * 
   * @param {Object} recordData - The new record data (date, steps, workoutDuration, heartRate)
   */
  const handleAddRecord = useCallback((recordData) => {
    const newRecord = {
      id: Date.now(), // Unique identifier using timestamp
      ...recordData,
      createdAt: new Date().toISOString()
    };
    
    setRecords(prevRecords => {
      // Sort records by date (newest first)
      const updatedRecords = [...prevRecords, newRecord].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      return updatedRecords;
    });
    
    setShowForm(false);
    console.log('[App] Added new record:', newRecord);
  }, []);

  // =========================================================================
  // FEATURE 2: EDIT AN EXISTING HEALTH RECORD
  // =========================================================================
  
  /**
   * Updates an existing health record with new data
   * 
   * @param {Object} updatedRecord - The updated record data with id
   */
  const handleEditRecord = useCallback((updatedRecord) => {
    setRecords(prevRecords => {
      const updatedRecords = prevRecords.map(record =>
        record.id === updatedRecord.id
          ? { ...record, ...updatedRecord, updatedAt: new Date().toISOString() }
          : record
      ).sort((a, b) => new Date(b.date) - new Date(a.date));
      return updatedRecords;
    });
    
    setEditingRecord(null);
    setShowForm(false);
    console.log('[App] Updated record:', updatedRecord);
  }, []);

  /**
   * Opens the form in edit mode with the selected record
   * 
   * @param {Object} record - The record to edit
   */
  const handleStartEdit = useCallback((record) => {
    setEditingRecord(record);
    setShowForm(true);
    console.log('[App] Started editing record:', record.id);
  }, []);

  // =========================================================================
  // FEATURE 3: DELETE A HEALTH RECORD
  // =========================================================================
  
  /**
   * Removes a health record from the records array
   * Shows confirmation before deletion
   * 
   * @param {number} recordId - The ID of the record to delete
   */
  const handleDeleteRecord = useCallback((recordId) => {
    if (window.confirm('Are you sure you want to delete this health record?')) {
      setRecords(prevRecords => 
        prevRecords.filter(record => record.id !== recordId)
      );
      console.log('[App] Deleted record:', recordId);
    }
  }, []);

  // =========================================================================
  // FORM CONTROL HANDLERS
  // =========================================================================
  
  /**
   * Opens the form for adding a new record
   */
  const handleOpenAddForm = useCallback(() => {
    setEditingRecord(null);
    setShowForm(true);
  }, []);

  /**
   * Closes the form and resets edit state
   */
  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingRecord(null);
  }, []);

  // =========================================================================
  // RENDER
  // =========================================================================
  
  return (
    <div className="app">
      {/* Header with app title and branding */}
      <Header onAddClick={handleOpenAddForm} />
      
      <main className="main-content">
        {/* FEATURE 5: Summary Dashboard with statistics and charts */}
        <SummaryDashboard records={records} />
        
        {/* FEATURE 1 & 2: Add/Edit Form (conditional render) */}
        {showForm && (
          <HealthRecordForm
            record={editingRecord}
            onSubmit={editingRecord ? handleEditRecord : handleAddRecord}
            onCancel={handleCloseForm}
          />
        )}
        
        {/* FEATURE 4: Health Records List with edit/delete actions */}
        <HealthRecordsList
          records={records}
          onEdit={handleStartEdit}
          onDelete={handleDeleteRecord}
        />
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Health & Fitness Dashboard | Track Your Wellness Journey</p>
      </footer>
    </div>
  );
}

// =========================================================================
// HELPER FUNCTIONS
// =========================================================================

/**
 * Generates sample data for demonstration purposes
 * Creates records for the past 7 days with realistic values
 * 
 * @returns {Array} Array of sample health records
 */
function generateSampleData() {
  const sampleData = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    sampleData.push({
      id: Date.now() - i * 86400000,
      date: date.toISOString().split('T')[0],
      steps: Math.floor(Math.random() * 8000) + 4000, // 4000-12000 steps
      workoutDuration: Math.floor(Math.random() * 60) + 15, // 15-75 minutes
      heartRate: Math.floor(Math.random() * 30) + 65, // 65-95 bpm
      createdAt: date.toISOString()
    });
  }
  
  return sampleData;
}

export default App;
