/**
 * Main App Component
 * 
 * This is the root component of the Health & Fitness Dashboard application.
 * It manages the state for all health records and provides CRUD operations.
 * 
 * State Management:
 * - records: Array of health record objects
 * - editingRecord: Currently selected record for editing (null if adding new)
 * 
 * Features:
 * 1. Add new health records
 * 2. Edit existing health records
 * 3. Delete health records
 * 4. View all health records
 * 5. Display summary dashboard with statistics
 */

import React, { useState } from 'react';
import './App.css';
import HealthRecordForm from './components/HealthRecordForm';
import HealthRecordsList from './components/HealthRecordsList';
import DashboardSummary from './components/DashboardSummary';

function App() {
  // State to store all health records
  const [records, setRecords] = useState([
    // Sample data for demonstration
    {
      id: 1,
      date: '2026-01-10',
      steps: 8500,
      workoutDuration: 45,
      heartRate: 72
    },
    {
      id: 2,
      date: '2026-01-11',
      steps: 10200,
      workoutDuration: 60,
      heartRate: 75
    },
    {
      id: 3,
      date: '2026-01-12',
      steps: 7800,
      workoutDuration: 30,
      heartRate: 70
    }
  ]);

  // State to track which record is being edited (null means adding new record)
  const [editingRecord, setEditingRecord] = useState(null);

  /**
   * Handler to add a new health record
   * @param {Object} newRecord - The new record data (date, steps, workoutDuration, heartRate)
   */
  const handleAddRecord = (newRecord) => {
    const recordWithId = {
      ...newRecord,
      id: Date.now() // Generate unique ID using timestamp
    };
    setRecords([...records, recordWithId]);
  };

  /**
   * Handler to update an existing health record
   * @param {Object} updatedRecord - The updated record data
   */
  const handleUpdateRecord = (updatedRecord) => {
    setRecords(records.map(record => 
      record.id === updatedRecord.id ? updatedRecord : record
    ));
    setEditingRecord(null); // Clear editing state after update
  };

  /**
   * Handler to delete a health record
   * @param {number} id - The ID of the record to delete
   */
  const handleDeleteRecord = (id) => {
    if (window.confirm('Are you sure you want to delete this health record?')) {
      setRecords(records.filter(record => record.id !== id));
      // Clear editing state if the deleted record was being edited
      if (editingRecord && editingRecord.id === id) {
        setEditingRecord(null);
      }
    }
  };

  /**
   * Handler to set a record for editing
   * @param {Object} record - The record to edit
   */
  const handleEditRecord = (record) => {
    setEditingRecord(record);
    // Scroll to form for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handler to cancel editing and return to add mode
   */
  const handleCancelEdit = () => {
    setEditingRecord(null);
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="icon">💚</span>
            Health & Fitness Dashboard
          </h1>
          <p className="app-subtitle">Track your daily health and exercise activities</p>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="app-container">
        {/* Left Column: Form and Summary */}
        <div className="left-column">
          {/* Health Record Form (Add/Edit) */}
          <section className="section">
            <HealthRecordForm
              onAddRecord={handleAddRecord}
              onUpdateRecord={handleUpdateRecord}
              editingRecord={editingRecord}
              onCancelEdit={handleCancelEdit}
            />
          </section>

          {/* Dashboard Summary */}
          <section className="section">
            <DashboardSummary records={records} />
          </section>
        </div>

        {/* Right Column: Records List */}
        <div className="right-column">
          <section className="section">
            <HealthRecordsList
              records={records}
              onEditRecord={handleEditRecord}
              onDeleteRecord={handleDeleteRecord}
            />
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 Health & Fitness Dashboard | Stay Active, Stay Healthy! 🏃‍♂️</p>
      </footer>
    </div>
  );
}

export default App;
