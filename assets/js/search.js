// Search functionality using Lunr.js
(function() {
  'use strict';

  let searchIndex;
  let documents;
  let currentLanguage;
  let selectedResultIndex = -1;
  let searchReady = false;

  // 1. Initialize Lunr
  async function initSearch() {
    try {
      // Show loading state
      const loadingEl = document.getElementById('search-loading');
      const initialEl = document.getElementById('search-initial');
      if (loadingEl) loadingEl.hidden = false;
      if (initialEl) initialEl.hidden = true;

      // Load search index
      const response = await fetch('/search-index.json');
      documents = await response.json();

      // Build Lunr index
      searchIndex = lunr(function() {
        this.ref('id');
        this.field('title', { boost: 10 });    // Title matches most important
        this.field('description', { boost: 5 });
        this.field('categories', { boost: 3 });
        this.field('content');

        documents.forEach((doc) => {
          this.add(doc);
        });
      });

      searchReady = true;
      if (loadingEl) loadingEl.hidden = true;
      console.log('Search index loaded:', documents.length, 'posts');

      // Show initial state with recent posts
      showRecentPosts();
    } catch (error) {
      console.error('Failed to initialize search:', error);
      searchReady = false;
    }
  }

  // 2. Show recent posts (initial state)
  function showRecentPosts() {
    const recentPostsEl = document.getElementById('search-recent-posts');
    const initialEl = document.getElementById('search-initial');

    if (!recentPostsEl || !initialEl || !documents) return;

    // Filter by current language and get 5 most recent
    const recentPosts = documents
      .filter(doc => doc.language === currentLanguage)
      .slice(0, 5);

    if (recentPosts.length > 0) {
      recentPostsEl.innerHTML = recentPosts.map((doc, index) => `
        <a href="${doc.url}" class="search-result" data-index="${index}">
          <div class="search-result-header">
            <h3 class="search-result-title">${doc.title}</h3>
          </div>
          <div class="search-result-meta">
            <span class="search-result-categories">${doc.categories.join(', ')}</span>
            <span class="search-result-date">${formatDate(doc.date)}</span>
          </div>
        </a>
      `).join('');

      initialEl.hidden = false;
    }
  }

  // 3. Search function
  function performSearch(query, languageFilter) {
    if (!searchReady || query.length < 2) return [];

    try {
      // Use wildcard search for partial matching
      const searchQuery = query.split(' ')
        .map(term => term.length >= 2 ? `${term}* ${term}` : term)
        .join(' ');

      const results = searchIndex.search(searchQuery);

      // Get full document data
      let matchedDocs = results.map(result => {
        return documents.find(doc => doc.id === result.ref);
      });

      // Filter by language if needed
      if (languageFilter === 'current') {
        matchedDocs = matchedDocs.filter(doc =>
          doc.language === currentLanguage
        );
      }

      return matchedDocs.slice(0, 8); // Max 8 results
    } catch (e) {
      console.error('Search error:', e);
      return [];
    }
  }

  // 4. Display results
  function displayResults(results, query) {
    const container = document.getElementById('search-results');
    const emptyState = document.getElementById('search-empty');
    const initialState = document.getElementById('search-initial');
    const resultCount = document.getElementById('search-result-count');

    if (!container || !emptyState || !initialState) return;

    // Hide initial state when searching
    initialState.hidden = true;

    if (results.length === 0) {
      container.innerHTML = '';
      emptyState.hidden = false;
      if (resultCount) resultCount.hidden = true;
      const queryTextEl = document.getElementById('search-query-text');
      if (queryTextEl) queryTextEl.textContent = query;

      // Track search with no results
      trackSearch(query, 0);
      return;
    }

    emptyState.hidden = true;

    // Show result count
    if (resultCount) {
      resultCount.textContent = `Found ${results.length} result${results.length !== 1 ? 's' : ''}`;
      resultCount.hidden = false;
    }

    container.innerHTML = results.map((doc, index) => `
      <a href="${doc.url}" class="search-result" data-index="${index}">
        <div class="search-result-header">
          <h3 class="search-result-title">${highlightText(doc.title, query)}</h3>
          <span class="search-result-language">${doc.language.toUpperCase()}</span>
        </div>
        <p class="search-result-description">${highlightText(doc.description || doc.content, query)}</p>
        <div class="search-result-meta">
          <span class="search-result-categories">${doc.categories.join(', ')}</span>
          <span class="search-result-date">${formatDate(doc.date)}</span>
        </div>
      </a>
    `).join('');

    // Reset selection
    selectedResultIndex = -1;

    // Track successful search
    trackSearch(query, results.length);
  }

  // 5. Highlight matched terms
  function highlightText(text, query) {
    if (!text) return '';

    const words = query.toLowerCase().split(/\s+/);
    let highlighted = text;

    words.forEach(word => {
      if (word.length < 2) return;
      const regex = new RegExp(`(${escapeRegex(word)}\\w*)`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });

    return highlighted;
  }

  // Helper: Escape special regex characters
  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 6. Open search modal
  function openSearch() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');

    if (!modal || !input) return;

    modal.hidden = false;
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    setTimeout(() => input.focus(), 100);

    // Detect current page language
    currentLanguage = document.documentElement.lang;

    // Update filter label
    const filterLabel = document.querySelector('[data-lang-label]');
    if (filterLabel) {
      filterLabel.textContent = currentLanguage === 'en' ? 'English only' : 'Français seulement';
    }

    // Show recent posts if search is ready and input is empty
    if (searchReady && input.value === '') {
      showRecentPosts();
    }
  }

  // 7. Close search modal
  function closeSearch() {
    const modal = document.getElementById('search-modal');
    if (!modal) return;

    modal.hidden = true;
    document.body.style.overflow = '';

    // Clear search
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const emptyState = document.getElementById('search-empty');
    const initialState = document.getElementById('search-initial');
    const resultCount = document.getElementById('search-result-count');
    const clearBtn = document.getElementById('search-clear');

    if (input) input.value = '';
    if (results) results.innerHTML = '';
    if (emptyState) emptyState.hidden = true;
    if (initialState) initialState.hidden = false;
    if (resultCount) resultCount.hidden = true;
    if (clearBtn) clearBtn.hidden = true;
  }

  // 8. Clear search input
  function clearSearch() {
    const input = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear');
    const results = document.getElementById('search-results');
    const emptyState = document.getElementById('search-empty');
    const initialState = document.getElementById('search-initial');
    const resultCount = document.getElementById('search-result-count');

    if (input) {
      input.value = '';
      input.focus();
    }
    if (clearBtn) clearBtn.hidden = true;
    if (results) results.innerHTML = '';
    if (emptyState) emptyState.hidden = true;
    if (resultCount) resultCount.hidden = true;

    // Show recent posts again
    if (initialState) {
      showRecentPosts();
    }
  }

  // Expose functions globally
  window.openSearch = openSearch;
  window.closeSearch = closeSearch;
  window.clearSearch = clearSearch;

  // 9. Input debouncing
  let searchTimeout;
  function handleSearchInput(e) {
    const query = e.target.value;
    const clearBtn = document.getElementById('search-clear');

    // Show/hide clear button
    if (clearBtn) {
      clearBtn.hidden = query.length === 0;
    }

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (query.length === 0) {
        // Show recent posts when query is cleared
        const results = document.getElementById('search-results');
        const emptyState = document.getElementById('search-empty');
        const resultCount = document.getElementById('search-result-count');

        if (results) results.innerHTML = '';
        if (emptyState) emptyState.hidden = true;
        if (resultCount) resultCount.hidden = true;
        showRecentPosts();
        return;
      }

      if (!searchReady) {
        console.log('Search not ready yet');
        return;
      }

      const languageFilter = document.querySelector('input[name="language"]:checked');
      const results = performSearch(query, languageFilter ? languageFilter.value : 'current');
      displayResults(results, query);
    }, 150); // 150ms debounce
  }

  // 10. Keyboard navigation
  function handleKeyDown(e) {
    const results = document.querySelectorAll('.search-result');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedResultIndex = Math.min(selectedResultIndex + 1, results.length - 1);
      updateSelection(results);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedResultIndex = Math.max(selectedResultIndex - 1, -1);
      updateSelection(results);
    } else if (e.key === 'Enter' && selectedResultIndex >= 0) {
      e.preventDefault();
      results[selectedResultIndex].click();
    }
  }

  function updateSelection(results) {
    results.forEach((result, index) => {
      if (index === selectedResultIndex) {
        result.classList.add('selected');
        result.scrollIntoView({ block: 'nearest' });
      } else {
        result.classList.remove('selected');
      }
    });
  }

  // 11. Global keyboard handlers
  function handleGlobalKeyDown(e) {
    const modal = document.getElementById('search-modal');
    if (!modal) return;

    // Open with "/" key
    if (e.key === '/' && modal.hidden) {
      e.preventDefault();
      openSearch();
      return;
    }

    // Close with Escape key (when modal is open)
    if (e.key === 'Escape' && !modal.hidden) {
      e.preventDefault();
      closeSearch();
      return;
    }
  }

  // 12. Search analytics
  function trackSearch(query, resultCount) {
    // Track with Google Analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'search', {
        search_term: query,
        results: resultCount
      });
    }

    // Track with Google Analytics (legacy) if available
    if (typeof ga !== 'undefined') {
      ga('send', 'event', 'Search', 'query', query, resultCount);
    }

    // Console log for debugging
    console.log('Search tracked:', { query, resultCount });
  }

  // 13. Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    initSearch();

    // Global keyboard shortcuts
    document.addEventListener('keydown', handleGlobalKeyDown);

    // Search input handlers
    const input = document.getElementById('search-input');
    if (input) {
      input.addEventListener('input', handleSearchInput);
      input.addEventListener('keydown', handleKeyDown);
    }

    // Language filter change
    document.querySelectorAll('input[name="language"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const input = document.getElementById('search-input');
        const query = input ? input.value : '';

        if (query.length === 0) {
          // Refresh recent posts for new language
          showRecentPosts();
        } else if (query.length >= 2 && searchReady) {
          const languageFilter = document.querySelector('input[name="language"]:checked');
          const results = performSearch(query, languageFilter ? languageFilter.value : 'current');
          displayResults(results, query);
        }
      });
    });
  });

  // Helper: Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
})();
