/**
 * Theme Switcher for Jekyll Site
 * Respects system preferences while providing manual control
 */

class ThemeSwitcher {
  constructor() {
    this.themes = {
      AUTO: 'auto',
      LIGHT: 'light',
      DARK: 'dark'
    };
    
    this.currentTheme = this.getStoredTheme();
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    this.init();
  }

  init() {
    // Apply initial theme
    this.applyTheme(this.currentTheme);
    
    // Listen for system preference changes
    this.mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === this.themes.AUTO) {
        this.applyTheme(this.themes.AUTO);
      }
    });
    
    // Update toggle UI
    this.updateToggleUI();
  }

  getStoredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored && Object.values(this.themes).includes(stored)) {
      return stored;
    }
    return this.themes.AUTO; // Default to auto
  }

  setStoredTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  getSystemTheme() {
    return this.mediaQuery.matches ? this.themes.DARK : this.themes.LIGHT;
  }

  getResolvedTheme() {
    if (this.currentTheme === this.themes.AUTO) {
      return this.getSystemTheme();
    }
    return this.currentTheme;
  }

  applyTheme(theme) {
    const resolvedTheme = theme === this.themes.AUTO ? this.getSystemTheme() : theme;
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-light', 'theme-dark');
    
    // Add new theme class
    root.classList.add(`theme-${resolvedTheme}`);
    
    // Set data attribute for CSS targeting
    root.setAttribute('data-theme', resolvedTheme);
    
    // Update meta theme-color for browser UI
    this.updateThemeColor(resolvedTheme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: theme, resolved: resolvedTheme }
    }));
  }

  updateThemeColor(resolvedTheme) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      // You can customize these colors based on your design
      const colors = {
        light: '#ffffff',
        dark: '#1a1a1a'
      };
      metaThemeColor.setAttribute('content', colors[resolvedTheme]);
    }
  }

  setTheme(theme) {
    if (!Object.values(this.themes).includes(theme)) {
      console.error(`Invalid theme: ${theme}`);
      return;
    }
    
    this.currentTheme = theme;
    this.setStoredTheme(theme);
    this.applyTheme(theme);
    this.updateToggleUI();
  }

  cycleTheme() {
    const themeOrder = [this.themes.AUTO, this.themes.LIGHT, this.themes.DARK];
    const currentIndex = themeOrder.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const nextTheme = themeOrder[nextIndex];
    
    this.setTheme(nextTheme);
  }

  updateToggleUI() {
    const toggleButton = document.querySelector('[data-theme-toggle]');
    const toggleText = document.querySelector('[data-theme-text]');
    
    if (!toggleButton) return;

    const resolvedTheme = this.getResolvedTheme();
    const isAuto = this.currentTheme === this.themes.AUTO;
    
    // Update button state
    toggleButton.setAttribute('data-current-theme', this.currentTheme);
    toggleButton.setAttribute('data-resolved-theme', resolvedTheme);
    toggleButton.setAttribute('aria-pressed', resolvedTheme === this.themes.DARK);
    
    // Update text content
    if (toggleText) {
      const labels = {
        [this.themes.AUTO]: `Auto${isAuto ? ` (${resolvedTheme})` : ''}`,
        [this.themes.LIGHT]: 'Light',
        [this.themes.DARK]: 'Dark'
      };
      toggleText.textContent = labels[this.currentTheme];
    }
    
    // Update icon (if present)
    const icon = toggleButton.querySelector('[data-theme-icon]');
    if (icon) {
      const icons = {
        auto: '🌓',
        light: '☀️',
        dark: '🌙'
      };
      icon.textContent = icons[this.currentTheme];
    }
  }

  // Public API
  getTheme() {
    return this.currentTheme;
  }

  getResolvedThemeValue() {
    return this.getResolvedTheme();
  }

  isSystemDark() {
    return this.mediaQuery.matches;
  }
}

// Initialize theme switcher when DOM is ready
let themeSwitcher;

function initThemeSwitcher() {
  if (typeof window !== 'undefined') {
    themeSwitcher = new ThemeSwitcher();
    
    // Make it globally available
    window.themeSwitcher = themeSwitcher;
    
    // Auto-attach to toggle buttons
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-theme-toggle]');
      if (toggle) {
        e.preventDefault();
        themeSwitcher.cycleTheme();
      }
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Shift + D to toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        themeSwitcher.cycleTheme();
      }
    });
  }
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeSwitcher);
} else {
  initThemeSwitcher();
}

// Prevent flash of unstyled content by applying theme as early as possible
(function() {
  const getStoredTheme = () => {
    const stored = localStorage.getItem('theme');
    return stored || 'auto';
  };
  
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  
  const theme = getStoredTheme();
  const resolvedTheme = theme === 'auto' ? getSystemTheme() : theme;
  
  document.documentElement.classList.add(`theme-${resolvedTheme}`);
  document.documentElement.setAttribute('data-theme', resolvedTheme);
})();