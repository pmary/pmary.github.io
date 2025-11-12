/*
    The languages banner contains text in all available languages.
    This function is used to pick the language most likely preferred by the user.
    By default, the banner is hidden. The function makes it visible when needed.
  */(function () {
    const supportedLanguages = ['en','fr'];

    const hideGoogleTranslate = function(){
      const head = document.getElementsByTagName('head')[0];
      let tag = document.createElement('meta');
      tag.name = 'google';
      tag.content = 'notranslate';
      if (head) head.appendChild(tag);
    }

    const redirectToRightSubpath = function(preferenceLanguage) {
      let currentUrlSegments = window.location.href.split("/");
      const pageLanguage = currentUrlSegments[3];
      if (
        preferenceLanguage &&
        pageLanguage && 
        pageLanguage !== preferenceLanguage &&
        supportedLanguages.includes(pageLanguage)
      ) {
        currentUrlSegments[3] = preferenceLanguage;
        const newUrl = currentUrlSegments.join('/');
        console.log('preferenceLanguage', preferenceLanguage);
        console.log('pageLanguage', pageLanguage);
        console.log('newUrl', newUrl);
        location.href = newUrl;
      }
    }

    const pageLanguage = document.documentElement.lang;
    const agentLanguage = window.navigator.language.slice(0, 2);
    //const agentLanguage = 'fr';
    const banner = document.getElementById('languages-banner');
    let nodes;
    if (banner) nodes = banner.children;

    if (supportedLanguages.includes(agentLanguage)) hideGoogleTranslate();
    const preferenceLanguage = localStorage.getItem('preferenceLanguage');

    let languagesBannerViewCount = localStorage.getItem('languagesBannerViewCount');
    if (languagesBannerViewCount === null) {
      languagesBannerViewCount = 0;
    }
    else {
      languagesBannerViewCount = parseInt(languagesBannerViewCount);
    }
    
    /* Hide banner texts in other languages */
    if (nodes) {
      for (let node of nodes) {
        if (node.lang !== agentLanguage) {
          node.setAttribute('hidden', 'hidden'); /* Don't 'remove', because the array is a live array. */
        }
      }
    }

    /*
    Show the banner only if the page language is different from the agent language
    and the user has not set a language preference yet.
    Also limit the number of times the banner is shown to the user.
    */
    if (
      languagesBannerViewCount < 4 &&
      (
        pageLanguage != agentLanguage &&
        !preferenceLanguage &&
        supportedLanguages.includes(agentLanguage)
      ) ||
      (
        preferenceLanguage && 
        preferenceLanguage != pageLanguage && 
        preferenceLanguage == agentLanguage &&
        supportedLanguages.includes(agentLanguage)
      )
    ) {
      languagesBannerViewCount++;
      localStorage.setItem('languagesBannerViewCount', languagesBannerViewCount);

      if (banner) banner.removeAttribute('hidden');
    } else {
      //redirectToRightSubpath(preferenceLanguage);
    }
  })();
  /*
  Event handlers
  */
  function setLanguagesPreferenceCloseBannerAndRedirect(e, lang) {
    e.preventDefault();
    hideLanguagesBanner();
    savePreferredLanguage(lang);
    location.href = e.target.href;
  }

  function setLanguagesPreferenceAndCloseBanner(lang) {
    hideLanguagesBanner();
    savePreferredLanguage(lang);
  }

  /* Hide the banner by covering it with the rest of the page */
  function hideLanguagesBanner() {
    /* Hide the banner */
    const banner = document.getElementById('languages-banner');
    banner.hidden = true;
  }

  function savePreferredLanguage(lang){
    console.log('lang', lang);
    const pageLanguage = lang;
    console.log('pageLanguage', pageLanguage);
    localStorage.setItem('preferenceLanguage', pageLanguage);
  }