const flags = {
  fr: 'https://flagcdn.com/20x15/fr.png',
  en: 'https://flagcdn.com/20x15/gb.png',
  es: 'https://flagcdn.com/20x15/es.png'
};

async function loadLanguage(lang) {
  const res = await fetch(`lang/${lang}.json`);
  const t = await res.json();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (t[el.dataset.i18n]) el.textContent = t[el.dataset.i18n];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key]) el.innerHTML = t[key];
  });

  localStorage.setItem('siteLang', lang);

  const currentLangLabel = document.getElementById('currentLang');
  if (currentLangLabel) currentLangLabel.textContent = lang.toUpperCase();

  const currentLangFlag = document.getElementById('currentLangFlag');
  if (currentLangFlag) currentLangFlag.src = flags[lang] || '';
}