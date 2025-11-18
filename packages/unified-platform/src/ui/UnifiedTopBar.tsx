/**
 * NOVA ENGINE - Unified Top Bar (Space Theme)
 * User profile, notifications, search with complete redesign
 */

import React, { useState } from 'react';
import { UnifiedPlatformCore } from '../core/UnifiedPlatformCore';

interface UnifiedTopBarProps {
  platform: UnifiedPlatformCore;
  isLoggedIn: boolean;
  currentUser: any;
  currentMode: string;
}

export const UnifiedTopBar: React.FC<UnifiedTopBarProps> = ({
  platform,
  isLoggedIn,
  currentUser,
  currentMode,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    platform.logout();
  };

  const notifications = [
    {
      id: '1',
      text: 'Friend request from SpeedDemon',
      time: '5m ago',
      type: 'friend',
    },
    {
      id: '2',
      text: 'Achievement unlocked: Master Builder',
      time: '1h ago',
      type: 'achievement',
    },
    {
      id: '3',
      text: 'New game update available',
      time: '2h ago',
      type: 'update',
    },
  ];

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'hub':
        return '🏠';
      case 'editor':
        return '✏️';
      case 'launcher':
        return '🎮';
      case 'multiplayer':
        return '🌐';
      case 'social':
        return '👥';
      case 'settings':
        return '⚙️';
      default:
        return '🎮';
    }
  };

  return (
    <div className="unified-topbar-redesigned">
      {/* Left Section - Branding & Mode */}
      <div className="topbar-left">
        <div className="nova-branding-topbar">
          <h1 className="logo-nova">NOVA</h1>
          <span className="logo-engine">ENGINE</span>
        </div>
        <div className="mode-indicator-new">
          <span className="mode-icon">{getModeIcon(currentMode)}</span>
          <span className="mode-name">
            {currentMode.charAt(0).toUpperCase() + currentMode.slice(1)}
          </span>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="topbar-center">
        <div className="search-bar-new">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search games, players, achievements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right Section - User & Actions */}
      <div className="topbar-right">
        {isLoggedIn ? (
          <>
            {/* Quick Actions */}
            <button className="topbar-action-btn" title="Home">
              🏠
            </button>

            {/* Notifications */}
            <div className="notification-container">
              <button
                className="notification-btn-new"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔
                <span className="notification-badge">3</span>
              </button>

              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="dropdown-header">
                    <h4>Notifications</h4>
                    <button className="mark-read-btn">Mark all read</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`notification-item ${notif.type}`}
                      >
                        <div className="notif-content">
                          <p>{notif.text}</p>
                          <span className="notif-time">{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-footer">
                    <button>View All Notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="user-menu-container">
              <button
                className="user-profile-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="user-avatar">😎</span>
                <span className="user-name">
                  {currentUser?.username || 'User'}
                </span>
                <span className="user-level">Lvl 45</span>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="dropdown-header-user">
                    <div className="user-info-full">
                      <span className="user-avatar-large">😎</span>
                      <div>
                        <p className="user-name-large">
                          {currentUser?.username || 'User'}
                        </p>
                        <p className="user-status">Level 45 • Diamond III</p>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-menu">
                    <button
                      className="menu-item"
                      onClick={() => platform.switchMode('social')}
                    >
                      <span>👤</span> View Profile
                    </button>
                    <button
                      className="menu-item"
                      onClick={() => platform.switchMode('settings')}
                    >
                      <span>⚙️</span> Settings
                    </button>
                    <button className="menu-item">
                      <span>🏆</span> Achievements
                    </button>
                    <button className="menu-item">
                      <span>📊</span> Statistics
                    </button>
                    <div className="menu-divider"></div>
                    <button
                      className="menu-item logout-item"
                      onClick={handleLogout}
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            className="login-btn-topbar"
            onClick={() => platform.emit('showLogin')}
          >
            Login
          </button>
        )}
      </div>

      <style>{`
        .unified-topbar-redesigned {
          height: 70px;
          background: linear-gradient(135deg, rgba(26,0,51,0.95) 0%, rgba(58,12,88,0.95) 100%);
          border-bottom: 2px solid rgba(123, 47, 247, 0.3);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          color: white;
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 100;
        }

        /* Left Section */
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nova-branding-topbar {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .logo-nova {
          margin: 0;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: 4px;
          background: linear-gradient(135deg, #ff6ec4 0%, #7b2ff7 50%, #4cc9f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { filter: drop-shadow(0 0 5px rgba(123, 47, 247, 0.5)); }
          to { filter: drop-shadow(0 0 10px rgba(255, 110, 196, 0.7)); }
        }

        .logo-engine {
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 2px;
          color: #a0a0ff;
        }

        .mode-indicator-new {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(123, 47, 247, 0.2);
          border: 1px solid rgba(123, 47, 247, 0.4);
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .mode-icon {
          font-size: 18px;
        }

        /* Center Section */
        .topbar-center {
          flex: 1;
          display: flex;
          justify-content: center;
          max-width: 600px;
          margin: 0 30px;
        }

        .search-bar-new {
          display: flex;
          align-items: center;
          background: rgba(26, 0, 51, 0.6);
          border: 2px solid rgba(123, 47, 247, 0.3);
          border-radius: 25px;
          padding: 10px 20px;
          width: 100%;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .search-bar-new:focus-within {
          border-color: rgba(123, 47, 247, 0.8);
          box-shadow: 0 0 20px rgba(123, 47, 247, 0.3);
        }

        .search-icon {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
        }

        .search-bar-new input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          flex: 1;
          font-size: 15px;
        }

        .search-bar-new input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .clear-search {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 16px;
          padding: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Right Section */
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .topbar-action-btn {
          width: 40px;
          height: 40px;
          background: rgba(123, 47, 247, 0.2);
          border: 1px solid rgba(123, 47, 247, 0.3);
          border-radius: 50%;
          color: white;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .topbar-action-btn:hover {
          background: rgba(123, 47, 247, 0.4);
          transform: scale(1.1);
        }

        /* Notifications */
        .notification-container {
          position: relative;
        }

        .notification-btn-new {
          position: relative;
          width: 40px;
          height: 40px;
          background: rgba(123, 47, 247, 0.2);
          border: 1px solid rgba(123, 47, 247, 0.3);
          border-radius: 50%;
          color: white;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .notification-btn-new:hover {
          background: rgba(123, 47, 247, 0.4);
          transform: scale(1.1);
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 10px;
          border: 2px solid rgba(26, 0, 51, 0.95);
        }

        .notifications-dropdown {
          position: absolute;
          top: 55px;
          right: 0;
          width: 360px;
          background: linear-gradient(135deg, rgba(26,0,51,0.98) 0%, rgba(58,12,88,0.98) 100%);
          border: 2px solid rgba(123, 47, 247, 0.5);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          animation: slideDown 0.3s ease;
          z-index: 1000;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(123, 47, 247, 0.3);
        }

        .dropdown-header h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
        }

        .mark-read-btn {
          background: transparent;
          border: none;
          color: #7b2ff7;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
        }

        .notifications-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .notification-item {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(123, 47, 247, 0.2);
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .notification-item:hover {
          background: rgba(123, 47, 247, 0.1);
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notif-content p {
          margin: 0 0 5px 0;
          font-size: 14px;
        }

        .notif-time {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        .dropdown-footer {
          padding: 12px 20px;
          border-top: 1px solid rgba(123, 47, 247, 0.3);
        }

        .dropdown-footer button {
          width: 100%;
          padding: 10px;
          background: rgba(123, 47, 247, 0.2);
          border: 1px solid rgba(123, 47, 247, 0.4);
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s ease;
        }

        .dropdown-footer button:hover {
          background: rgba(123, 47, 247, 0.3);
        }

        /* User Menu */
        .user-menu-container {
          position: relative;
        }

        .user-profile-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(123, 47, 247, 0.2);
          border: 1px solid rgba(123, 47, 247, 0.4);
          border-radius: 25px;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .user-profile-btn:hover {
          background: rgba(123, 47, 247, 0.3);
        }

        .user-avatar {
          font-size: 24px;
        }

        .user-name {
          font-weight: 600;
          font-size: 15px;
        }

        .user-level {
          padding: 2px 8px;
          background: linear-gradient(135deg, #7b2ff7 0%, #ff6ec4 100%);
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
        }

        .user-dropdown {
          position: absolute;
          top: 55px;
          right: 0;
          width: 280px;
          background: linear-gradient(135deg, rgba(26,0,51,0.98) 0%, rgba(58,12,88,0.98) 100%);
          border: 2px solid rgba(123, 47, 247, 0.5);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          animation: slideDown 0.3s ease;
          z-index: 1000;
        }

        .dropdown-header-user {
          padding: 20px;
          border-bottom: 1px solid rgba(123, 47, 247, 0.3);
        }

        .user-info-full {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-avatar-large {
          font-size: 48px;
        }

        .user-name-large {
          margin: 0 0 5px 0;
          font-size: 18px;
          font-weight: 700;
        }

        .user-status {
          margin: 0;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
        }

        .dropdown-menu {
          padding: 8px;
        }

        .menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-size: 15px;
          text-align: left;
          transition: background 0.2s ease;
        }

        .menu-item:hover {
          background: rgba(123, 47, 247, 0.2);
        }

        .menu-item span {
          font-size: 18px;
        }

        .menu-divider {
          height: 1px;
          background: rgba(123, 47, 247, 0.2);
          margin: 8px 0;
        }

        .logout-item {
          color: #ef4444;
        }

        .logout-item:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .login-btn-topbar {
          padding: 10px 24px;
          background: linear-gradient(135deg, #7b2ff7 0%, #ff6ec4 100%);
          border: none;
          border-radius: 20px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .login-btn-topbar:hover {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .topbar-center {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
