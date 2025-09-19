---
layout: page
title: Dark Mode Demo
language: en
---

# Dark Mode Implementation Demo

This page demonstrates the dark mode system implementation with various UI elements. Use the theme toggle in the footer to test the functionality.

## Features

### Theme Modes
- **Auto**: Follows your system preference
- **Light**: Forces light theme
- **Dark**: Forces dark theme

### Keyboard Shortcut
Press `Ctrl+Shift+D` (or `Cmd+Shift+D` on Mac) to quickly cycle through themes.

---

## Typography Examples

### Headings Hierarchy

# H1: Main Page Title
## H2: Section Headers  
### H3: Subsection Headers
#### H4: Detailed Sections
##### H5: Small Sections
###### H6: Minor Sections

### Text Elements

This is a **paragraph** with different text styles. Here's some *italic text* and some **bold text**. You can also have ***bold italic text*** for emphasis.

Here's a `code snippet` within regular text, and a [link to the homepage]({{ site.baseurl }}/{{ page.language }}/home) to test link styling.

> This is a blockquote to demonstrate how quoted content appears in both light and dark themes. It should maintain good readability and contrast.

### Lists

**Unordered List:**
- Theme auto-detection
- Manual theme switching
- Persistent theme preference
- Smooth transitions
- Keyboard shortcuts

**Ordered List:**
1. System preference detection
2. Local storage management  
3. CSS custom property updates
4. UI state synchronization
5. Accessibility features

---

## Code Examples

### Inline Code
Use `localStorage.getItem('theme')` to retrieve the stored theme preference.

### Code Blocks

```javascript
// Theme switcher initialization
class ThemeSwitcher {
  constructor() {
    this.themes = {
      AUTO: 'auto',
      LIGHT: 'light', 
      DARK: 'dark'
    };
    this.init();
  }
  
  setTheme(theme) {
    this.currentTheme = theme;
    this.applyTheme(theme);
  }
}
```

```scss
// CSS custom properties for theming
:root {
  --color-bg-primary: #ffffff;
  --color-text-primary: rgba(0, 0, 0, 0.84);
}

[data-theme="dark"] {
  --color-bg-primary: #1a1a1a;
  --color-text-primary: #f9f9f9;
}
```

```html
<!-- Theme toggle button -->
<button data-theme-toggle aria-label="Toggle theme">
  <span data-theme-icon>🌓</span>
  <span data-theme-text>Auto</span>
</button>
```

---

## Interactive Elements

### Tables

| Feature | Light Mode | Dark Mode | Auto Mode |
|---------|------------|-----------|-----------|
| Background | White | Dark Gray | System |
| Text Color | Dark | Light | System |
| Borders | Light Gray | Dark Gray | System |
| Accents | Brand Color | Bright Brand | System |

### Forms (if implemented)

<div style="max-width: 400px;">
<form>
  <div style="margin-bottom: 1rem;">
    <label for="demo-email" style="display: block; margin-bottom: 0.5rem;">Email:</label>
    <input type="email" id="demo-email" placeholder="your@email.com" style="width: 100%; padding: 0.5rem;">
  </div>
  
  <div style="margin-bottom: 1rem;">
    <label for="demo-message" style="display: block; margin-bottom: 0.5rem;">Message:</label>
    <textarea id="demo-message" rows="4" placeholder="Your message..." style="width: 100%; padding: 0.5rem;"></textarea>
  </div>
  
  <button type="button" style="padding: 0.5rem 1rem; background: var(--color-accent, #cd9023); color: white; border: none; border-radius: 4px;">Send Message</button>
</form>
</div>

---

## Testing Instructions

### Manual Testing
1. **Theme Toggle**: Click the theme toggle in the footer to cycle through modes
2. **System Preference**: Change your OS theme setting and reload with "Auto" mode selected
3. **Persistence**: Refresh the page - your theme choice should be remembered
4. **Keyboard**: Use `Ctrl+Shift+D` to quickly switch themes

### Accessibility Testing
- **Contrast**: Verify text remains readable in both themes
- **Focus States**: Tab through elements to check focus indicators
- **Screen Readers**: Ensure the toggle button has proper ARIA labels

### Browser Testing
Test in these browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

### Visual Elements to Check

**Light Mode:**
- White/light backgrounds
- Dark text for good contrast
- Subtle shadows and borders
- Brand color accents

**Dark Mode:**
- Dark backgrounds (#1a1a1a, #282828)
- Light text (#f9f9f9, #d6d6d6) 
- Darker borders and shadows
- Adjusted accent colors for better visibility

---

## Implementation Status

### ✅ Completed Features
- [x] System preference detection
- [x] Manual theme toggle
- [x] Theme persistence
- [x] CSS custom property foundation
- [x] Toggle UI in footer
- [x] Keyboard shortcut support
- [x] ARIA accessibility

### 🔄 CSS Updates Needed
- [ ] Update existing SCSS files to use CSS custom properties
- [ ] Implement dark mode color schemes
- [ ] Add transition animations
- [ ] Style form elements for both themes
- [ ] Update syntax highlighting for dark mode

### 🎯 Testing Checklist
- [ ] Toggle functionality
- [ ] System preference respect
- [ ] Theme persistence across pages
- [ ] Keyboard shortcuts work
- [ ] Accessibility compliance
- [ ] Cross-browser compatibility

---

## Technical Details

### Local Storage Structure
```json
{
  "theme": "auto|light|dark"
}
```

### CSS Classes Added
- `.theme-light` on `<html>` element
- `.theme-dark` on `<html>` element  
- `[data-theme="light|dark"]` attribute on `<html>` element

### JavaScript Events
- `themeChanged` custom event fired on theme changes
- Event detail includes current theme and resolved theme

### Browser API Usage
- `window.matchMedia('(prefers-color-scheme: dark)')` for system preference
- `localStorage` for theme persistence
- `document.documentElement.classList` for CSS class management

---

**Note**: This page demonstrates the dark mode system structure. The actual dark mode styling will take effect once you implement the CSS updates described in the guide.

<script>
// Demo-specific JavaScript for this page
document.addEventListener('DOMContentLoaded', function() {
  // Add visual feedback when theme changes
  window.addEventListener('themeChanged', function(e) {
    const indicator = document.createElement('div');
    indicator.textContent = `Theme changed to: ${e.detail.resolved}`;
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-accent, #cd9023);
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      z-index: 1000;
      font-size: 14px;
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
      indicator.remove();
    }, 2000);
  });
  
  // Display current theme info
  function updateThemeInfo() {
    const current = window.themeSwitcher?.getTheme() || 'unknown';
    const resolved = document.documentElement.getAttribute('data-theme') || 'unknown';
    
    const info = document.getElementById('theme-info');
    if (info) {
      info.textContent = `Current: ${current}, Resolved: ${resolved}`;
    }
  }
  
  // Update info on load and theme changes
  updateThemeInfo();
  window.addEventListener('themeChanged', updateThemeInfo);
});
</script>

<div style="margin-top: 2rem; padding: 1rem; border: 1px solid var(--color-border, #e6e6e6); border-radius: 4px; background: var(--color-bg-secondary, #f9f9f9);">
  <strong>Current Theme Status:</strong> <span id="theme-info">Loading...</span>
</div>