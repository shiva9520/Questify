import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { RefreshCcw, Palette } from "lucide-react";
import { Button } from "./ui/Button";

export function Topbar({ onRefresh, loading, user, onLogout }) {
  const { theme, setTheme, themes } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeThemeObj = themes.find((t) => t.id === theme) || themes[0];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const selectTheme = (themeId) => {
    setTheme(themeId);
    setDropdownOpen(false);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* <p className="eyebrow">
          <span className="eyebrow-badge">PRO</span> Questify
        </p> */}
        <h1>Questify</h1>
        <p className="topbar-subtitle">
          Discover, upload, and organize technical interview or quiz questions in real-time.
        </p>
      </div>

      <div className="topbar-right">
        {user && (
          <div className="user-profile-badge">
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="username-text">{user.username}</span>
            <Button
              variant="secondary"
              onClick={onLogout}
              className="logout-btn"
              title="Logout"
            >
              Logout
            </Button>
          </div>
        )}

        {/* Theme Selector Dropdown */}
        <div className="theme-selector-container">

          <Button
            variant="secondary"
            onClick={toggleDropdown}
            icon={<Palette size={18} />}
            title="Choose Theme"
            aria-expanded={dropdownOpen}
            className="theme-dropdown-trigger"
          >
            {activeThemeObj.name}
          </Button>

          {dropdownOpen && (
            <>
              <div className="theme-dropdown-overlay" onClick={() => setDropdownOpen(false)} />
              <div className="theme-dropdown-menu" role="menu">
                <div className="theme-dropdown-header">Select Theme</div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => selectTheme(t.id)}
                    className={`theme-dropdown-item ${t.id === theme ? "active" : ""}`}
                    role="menuitem"
                  >
                    <span className={`theme-dot dot-${t.id}`} />
                    <span className="theme-item-name">{t.name}</span>
                    {t.id === theme && <span className="theme-active-check">✓</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Refresh button */}
        <Button
          variant="primary"
          onClick={onRefresh}
          disabled={loading}
          icon={<RefreshCcw size={18} className={loading ? "spin" : ""} />}
          title="Refresh Question Library"
          className="refresh-btn"
        >
          Refresh
        </Button>
      </div>
    </header>
  );
}
