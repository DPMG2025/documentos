// ===== Category Toggle =====
function toggleCategory(categoryId) {
  const category = document.getElementById(categoryId);
  if (!category) return;
  const isCollapsed = category.classList.toggle('collapsed');
  const header = category.querySelector('.category-header');
  if (header) {
    header.setAttribute('aria-expanded', !isCollapsed);
  }
  try {
    const state = JSON.parse(localStorage.getItem('categoryStates') || '{}');
    state[categoryId] = !isCollapsed;
    localStorage.setItem('categoryStates', JSON.stringify(state));
  } catch (e) {}
}

// ===== FAQ Toggle =====
function toggleFaq(element) {
  element.classList.toggle('active');
  element.setAttribute('aria-expanded', element.classList.contains('active'));
}

// ===== Search =====
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(element, term) {
  if (!term) {
    element.querySelectorAll('.search-highlight').forEach(span => {
      const parent = span.parentNode;
      parent.replaceChild(document.createTextNode(span.textContent), span);
      parent.normalize();
    });
    return;
  }
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
  const nodesToReplace = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentNode?.classList?.contains('search-highlight')) continue;
    if (node.textContent.toLowerCase().includes(term)) {
      nodesToReplace.push(node);
    }
  }
  nodesToReplace.forEach(node => {
    const parts = node.textContent.split(new RegExp('(' + escapeRegex(term) + ')', 'gi'));
    const fragment = document.createDocumentFragment();
    parts.forEach(part => {
      if (part.toLowerCase() === term) {
        const span = document.createElement('span');
        span.className = 'search-highlight';
        span.textContent = part;
        fragment.appendChild(span);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    });
    node.parentNode.replaceChild(fragment, node);
  });
}

function countVisible(parent, selector) {
  return Array.from(parent.querySelectorAll(selector)).filter(el =>
    el.style.display !== 'none'
  ).length;
}

// ===== Restore Category States =====
function restoreCategoryStates() {
  try {
    const state = JSON.parse(localStorage.getItem('categoryStates') || '{}');
    Object.keys(state).forEach(categoryId => {
      const category = document.getElementById(categoryId);
      if (category) {
        const header = category.querySelector('.category-header');
        if (state[categoryId]) {
          category.classList.remove('collapsed');
          if (header) header.setAttribute('aria-expanded', 'true');
        } else {
          category.classList.add('collapsed');
          if (header) header.setAttribute('aria-expanded', 'false');
        }
      }
    });
  } catch (e) {}
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
  restoreCategoryStates();

  const searchBox = document.getElementById('searchBox');
  const searchResultsInfo = document.getElementById('searchResultsInfo');
  const noResultsMessage = document.getElementById('noResultsMessage');
  const allDocumentItems = document.querySelectorAll('.document-item');
  const allFaqItems = document.querySelectorAll('.faq-item');

  if (searchBox) {
    searchBox.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      let docMatches = 0;
      let faqMatches = 0;

      // Search documents
      allDocumentItems.forEach(item => {
        const documentName = item.getAttribute('data-name');
        const nameEl = item.querySelector('.document-name');
        if (documentName.includes(searchTerm)) {
          item.style.display = 'flex';
          docMatches++;
          if (searchTerm) highlightText(nameEl, searchTerm);
        } else {
          item.style.display = 'none';
          highlightText(nameEl, '');
        }
      });

      // Search FAQ
      allFaqItems.forEach(item => {
        const questionEl = item.querySelector('.faq-question-text');
        const answerEl = item.querySelector('.faq-answer');
        const questionText = questionEl.textContent.toLowerCase();
        const answerText = answerEl.textContent.toLowerCase();

        if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
          item.style.display = 'block';
          faqMatches++;
          if (searchTerm) {
            highlightText(questionEl, searchTerm);
            highlightText(answerEl, searchTerm);
          }
        } else {
          item.style.display = 'none';
          highlightText(questionEl, '');
          highlightText(answerEl, '');
        }
      });

      // Show/hide empty categories
      document.querySelectorAll('.category').forEach(category => {
        const visibleItems = countVisible(category, '.document-item');
        category.style.display = searchTerm && visibleItems === 0 ? 'none' : 'block';
      });

      // Show/hide empty FAQ categories
      document.querySelectorAll('.faq-category').forEach(category => {
        const visibleItems = countVisible(category, '.faq-item');
        category.style.display = searchTerm && visibleItems === 0 ? 'none' : 'block';
      });

      // Update results counter
      if (searchTerm) {
        const total = docMatches + faqMatches;
        let msg = '';
        if (docMatches > 0 && faqMatches > 0) {
          msg = `${total} resultados encontrados (${docMatches} documentos e ${faqMatches} FAQ)`;
        } else if (docMatches > 0) {
          msg = `${docMatches} documento${docMatches !== 1 ? 's' : ''} encontrado${docMatches !== 1 ? 's' : ''}`;
        } else if (faqMatches > 0) {
          msg = `${faqMatches} pergunta${faqMatches !== 1 ? 's' : ''} encontrada${faqMatches !== 1 ? 's' : ''}`;
        }
        searchResultsInfo.textContent = msg;
        if (noResultsMessage) {
          noResultsMessage.style.display = total === 0 ? 'block' : 'none';
        }
      } else {
        searchResultsInfo.textContent = '';
        if (noResultsMessage) {
          noResultsMessage.style.display = 'none';
        }
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if (e.key === '/' && document.activeElement !== searchBox) {
        e.preventDefault();
        searchBox.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchBox) {
        searchBox.blur();
      }
    });
  }

  // Scroll-to-top FAB
  const fab = document.getElementById('fabScrollTop');
  if (fab) {
    const hero = document.querySelector('section');
    if (hero) {
      const observer = new IntersectionObserver(function(entries) {
        fab.style.opacity = entries[0].isIntersecting ? '0' : '1';
        fab.style.transform = entries[0].isIntersecting ? 'translateY(20px)' : 'translateY(0)';
      }, { threshold: 0 });
      observer.observe(hero);
    }
  }
});
