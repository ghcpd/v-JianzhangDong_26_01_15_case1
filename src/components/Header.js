/**
 * ============================================================================
 * HEADER COMPONENT
 * ============================================================================
 * 
 * Displays the application header with:
 * - App logo/icon
 * - App title and subtitle
 * - Add new record button
 * 
 * Design Notes:
 * - Uses gradient background with primary green color
 * - Fixed positioning for persistent navigation
 * - Responsive padding and typography
 * ============================================================================
 */

import React from 'react';
import './Header.css';

/**
 * Header Component
 * 
 * @param {Object} props
 * @param {Function} props.onAddClick - Callback when add button is clicked
 */
function Header({ onAddClick }) {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo and Title Section */}
        <div className="header-brand">
          {/* Health Icon - SVG heart with pulse line */}
          <div className="header-icon">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {/* Heart shape */}
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              {/* Pulse line */}
              <polyline points="3 12 7 12 9 8 12 16 14 12 17 12" />
            </svg>
          </div>
          
          {/* Title and Subtitle */}
          <div className="header-text">
            <h1 className="header-title">Health & Fitness Dashboard</h1>
            <p className="header-subtitle">Track your daily wellness journey</p>
          </div>
        </div>
        
        {/* Add New Record Button */}
        <button 
          className="add-record-btn"
          onClick={onAddClick}
          aria-label="Add new health record"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Record</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
