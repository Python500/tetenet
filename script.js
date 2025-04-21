const tabsContainer = document.getElementById('tabs');
const frame = document.getElementById('browserFrame');
const urlInput = document.getElementById('urlInput');
let tabs = [];
let activeTab = -1;

function addTab(url = 'https://www.ghanaweb.com') {
  const id = tabs.length;
  tabs.push(url);
  activeTab = id;
  renderTabs();
  navigateTo(url);
}


function renderTabs() {
  tabsContainer.innerHTML = '';
  tabs.forEach((tabUrl, i) => {
    const tab = document.createElement('div');
    tab.className = 'tab' + (i === activeTab ? ' active' : '');
    
    const title = document.createElement('span');
    title.textContent = new URL(tabUrl).hostname;
    title.onclick = () => switchTab(i);

    const closeBtn = document.createElement('span');
    closeBtn.textContent = ' ❌';
    closeBtn.className = 'close-btn';
    closeBtn.onclick = (e) => {
      e.stopPropagation(); // prevent switching when closing
      closeTab(i);
    };

    tab.appendChild(title);
    tab.appendChild(closeBtn);
    tabsContainer.appendChild(tab);
  });
}

function closeTab(index) {
  tabs.splice(index, 1);
  if (activeTab === index) {
    activeTab = tabs.length - 1;
  } else if (activeTab > index) {
    activeTab--;
  }
  if (tabs.length === 0) {
    frame.src = 'about:blank';
    urlInput.value = '';
    activeTab = -1;
  } else {
    navigateTo(tabs[activeTab]);
  }
  renderTabs();
}



function switchTab(index) {
  activeTab = index;
  renderTabs();
  navigateTo(tabs[activeTab]);
}

function navigate() {
  const input = urlInput.value.trim();
  navigateTo(input);
}

function navigateTo(input) {
  let url = input.trim();

  // Check if input looks like a URL
  const isLikelyURL = url.includes('.') && !url.includes(' ');

  if (!isLikelyURL) {
    // Treat as search term
    url = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
  } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
    // Add https if missing
    url = 'https://' + url;
  }

  frame.src = url;
  urlInput.value = url;
  if (activeTab >= 0) tabs[activeTab] = url;
}

function goBack() {
  frame.contentWindow.history.back();
}

function goForward() {
  frame.contentWindow.history.forward();
}

function reloadPage() {
  frame.contentWindow.location.reload();
}

function openQuickLink(url) {
  addTab(url);
}

// Initialize first tab
addTab();
