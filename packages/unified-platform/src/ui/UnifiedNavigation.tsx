/**
 * NOVA ENGINE - Unified Navigation (Space Theme Redesign)
 * Sidebar with mode switching
 */

import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UnifiedPlatformCore } from '../core/UnifiedPlatformCore';

interface UnifiedNavigationProps {
  platform: UnifiedPlatformCore;
  currentMode: string;
  onModeChange: (mode: string) => void;
}

export const UnifiedNavigation: React.FC<UnifiedNavigationProps> = ({
  platform: _platform,
  currentMode: _currentMode,
  onModeChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', path: '/' },
    { id: 'hub', label: 'Game Hub', icon: '🎯', path: '/hub' },
    { id: 'editor', label: 'Editor', icon: '✏️', path: '/editor' },
    { id: 'launcher', label: 'Launcher', icon: '🚀', path: '/launcher' },
    {
      id: 'multiplayer',
      label: 'Multiplayer',
      icon: '🌐',
      path: '/multiplayer',
    },
    { id: 'social', label: 'Social', icon: '👥', path: '/social' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  const handleNavigation = useCallback(
    (item: (typeof navItems)[0]) => {
      // Navigate using React Router
      navigate(item.path);
      // Also update platform state
      onModeChange(item.id);
    },
    [navigate, onModeChange]
  );

  // Determine active item from current route
  const getActiveItem = () => {
    if (location.pathname === '/') return 'home';
    const item = navItems.find(
      (item) => item.path !== '/' && location.pathname.startsWith(item.path)
    );
    return item?.id || 'home';
  };
  const activeItem = getActiveItem();

  return (
    <nav className="unified-navigation-redesigned">
      <div className="nav-header">
        <div className="nova-logo">
          <h2 className="logo-text-nav">NOVA</h2>
          <span className="logo-subtext-nav">ENGINE</span>
        </div>
      </div>

      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item-redesigned ${activeItem === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleNavigation(item);
            }}
            title={item.label}
            type="button"
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {activeItem === item.id && (
              <span className="active-indicator"></span>
            )}
          </button>
        ))}
      </div>

      <div className="nav-footer">
        <div className="user-info-nav">
          <div className="user-avatar-nav">😎</div>
          <div className="user-details-nav">
            <span className="user-name-nav">NovaPlayer</span>
            <span className="user-level-nav">Level 45</span>
          </div>
        </div>
      </div>

      <style>{`
        .unified-navigation-redesigned {
          width: 260px;
          min-width: 260px;
          background: linear-gradient(180deg, rgba(26,0,51,0.95) 0%, rgba(58,12,88,0.95) 100%);
          border-right: 2px solid rgba(123, 47, 247, 0.3);
          display: flex;
          flex-direction: column;
          padding: 0;
          backdrop-filter: blur(10px);
          position: relative;
          overflow-y: auto;
        }

        .nav-header {
          padding: 30px 20px;
          border-bottom: 2px solid rgba(123, 47, 247, 0.2);
          background: rgba(26, 0, 51, 0.5);
        }

        .nova-logo {
          text-align: center;
        }

        .logo-text-nav {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 6px;
          background: linear-gradient(135deg, #ff6ec4 0%, #7b2ff7 50%, #4cc9f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 4px 0;
        }

        .logo-subtext-nav {
          display: block;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 3px;
          color: #a0a0ff;
        }

        .nav-items {
          flex: 1;
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item-redesigned {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: transparent;
          border: none;
          border-radius: 14px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          font-size: 15px;
          font-weight: 600;
          width: 100%;
          overflow: hidden;
        }

        .nav-item-redesigned::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, rgba(123, 47, 247, 0.4) 0%, transparent 100%);
          transition: width 0.3s ease;
        }

        .nav-item-redesigned:hover::before {
          width: 100%;
        }

        .nav-item-redesigned:hover {
          color: white;
          background: rgba(123, 47, 247, 0.2);
          transform: translateX(4px);
        }

        .nav-item-redesigned.active {
          color: white;
          background: linear-gradient(135deg, rgba(123, 47, 247, 0.4) 0%, rgba(255, 110, 196, 0.4) 100%);
          border: 1px solid rgba(123, 47, 247, 0.6);
          box-shadow: 0 4px 15px rgba(123, 47, 247, 0.3);
        }

        .nav-icon {
          font-size: 22px;
          z-index: 1;
        }

        .nav-label {
          flex: 1;
          z-index: 1;
        }

        .active-indicator {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #ff6ec4 0%, #4cc9f0 100%);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        .nav-footer {
          padding: 20px;
          border-top: 2px solid rgba(123, 47, 247, 0.2);
          background: rgba(26, 0, 51, 0.5);
        }

        .user-info-nav {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(123, 47, 247, 0.1);
          border: 1px solid rgba(123, 47, 247, 0.3);
          border-radius: 12px;
        }

        .user-avatar-nav {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, rgba(123, 47, 247, 0.3) 0%, rgba(255, 110, 196, 0.3) 100%);
          border: 2px solid rgba(123, 47, 247, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .user-details-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 0;
        }

        .user-name-nav {
          font-size: 14px;
          font-weight: 700;
          color: white;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-level-nav {
          font-size: 12px;
          color: #4cc9f0;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .unified-navigation-redesigned {
            width: 80px;
            min-width: 80px;
          }

          .nav-label {
            display: none;
          }

          .logo-text-nav {
            font-size: 24px;
          }

          .logo-subtext-nav {
            display: none;
          }

          .user-details-nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};
