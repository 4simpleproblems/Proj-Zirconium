// navbar-loading.js
document.addEventListener('DOMContentLoaded', function () {
    let loggedIn = false;
    let currentTheme = 'light'; // 'light' or 'dark'
    const navbarHeight = '65px';
    const logoBaseUrl = 'https://raw.githubusercontent.com/4simpleproblems/Proj-Vanadium/main/images/';

    /**
     * Sets the application theme.
     * @param {string} theme - The theme to set ('light' or 'dark').
     */
    function setTheme(theme) {
        currentTheme = theme;
        document.body.className = theme + '-mode';
        updateNavbarContent(); // Re-render navbar to update logo and button states
    }

    /**
     * Creates the initial navbar element and injects it into the DOM.
     */
    function createNavbar() {
        const navbar = document.createElement('nav');
        navbar.id = 'navbar';
        navbar.className = 'fixed top-0 left-0 right-0 z-50';
        navbar.style.height = navbarHeight;
        navbar.style.opacity = '0';
        document.body.prepend(navbar);
        setTheme(currentTheme); // Set initial theme

        document.body.style.marginTop = navbarHeight;

        setTimeout(() => {
            navbar.style.opacity = '1';
        }, 10);

        document.addEventListener('click', function(event) {
            const menu = document.getElementById('account-menu');
            const button = document.getElementById('account-button');
            if (menu && button && !menu.contains(event.target) && !button.contains(event.target)) {
                menu.classList.remove('menu-visible');
                menu.classList.add('menu-hidden');
            }
        });
    }

    /**
     * Attaches necessary event listeners after the navbar content is updated.
     */
    function attachEventListeners() {
        if (loggedIn) {
            const accountButton = document.getElementById('account-button');
            if (accountButton) {
                accountButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const menu = document.getElementById('account-menu');
                    menu.classList.toggle('menu-hidden');
                    menu.classList.toggle('menu-visible');
                });
            }
            
            document.getElementById('logout-btn')?.addEventListener('click', toggleLoginState);
            document.getElementById('theme-light-btn')?.addEventListener('click', () => setTheme('light'));
            document.getElementById('theme-dark-btn')?.addEventListener('click', () => setTheme('dark'));

        } else {
            document.getElementById('login-btn')?.addEventListener('click', toggleLoginState);
        }
    }

    /**
     * Updates the navbar's inner HTML based on the current login and theme state.
     */
    function updateNavbarContent() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const logoUrl = currentTheme === 'light' ? `${logoBaseUrl}logo-dark.png` : `${logoBaseUrl}logo.png`;
        const navTabs = `
            <div class="flex items-center space-x-2 sm:space-x-6 text-sm secondary-font">
                <a href="#" class="nav-link">Dashboard</a>
                <a href="#" class="nav-link">Soundboard</a>
                <a href="#" class="nav-link">Games</a>
                <a href="#" class="nav-link">Others</a>
            </div>
        `;

        if (loggedIn) {
            navbar.innerHTML = `
                <div class="navbar-container h-full flex items-center justify-between px-4 sm:px-8">
                    <div class="flex items-center space-x-4 sm:space-x-8">
                        <div class="flex items-center space-x-3">
                            <img src="${logoUrl}" alt="4SP Logo" class="h-8 w-8 object-contain">
                            <div class="flex flex-col">
                                <span class="text-lg leading-tight primary-font">4SP V5</span>
                                <span class="text-xs leading-tight secondary-font">Student Multi-Tool Platform</span>
                            </div>
                        </div>
                        <div class="hidden md:flex">${navTabs}</div>
                    </div>
                    <div class="relative">
                        <button id="account-button" class="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center font-bold text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition-colors">S</button>
                        <div id="account-menu" class="account-menu menu-hidden absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 z-50">
                            <div class="px-4 py-3 border-b">
                                <p class="text-sm font-semibold truncate">student@school.edu</p>
                                <p class="text-xs secondary-font">StudentUsername</p>
                            </div>
                            <a href="#" class="menu-item text-sm">Dashboard</a>
                            <a href="#" class="menu-item text-sm">Settings</a>
                            <div class="border-t mt-1 pt-1">
                                <div class="px-4 py-2 text-xs secondary-font">Theme</div>
                                <div class="px-4 flex justify-around theme-switcher">
                                    <button id="theme-light-btn" class="text-sm ${currentTheme === 'light' ? 'active' : ''}">Light</button>
                                    <button id="theme-dark-btn" class="text-sm ${currentTheme === 'dark' ? 'active' : ''}">Dark</button>
                                </div>
                            </div>
                            <div class="border-t mt-1 pt-1">
                                <button id="logout-btn" class="menu-item text-sm">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            navbar.innerHTML = `
                <div class="navbar-container h-full flex items-center justify-between px-4 sm:px-8">
                     <div class="flex items-center space-x-4 sm:space-x-8">
                        <div class="flex items-center space-x-3">
                            <img src="${logoUrl}" alt="4SP Logo" class="h-8 w-8 object-contain">
                             <div class="flex flex-col">
                                <span class="text-lg leading-tight primary-font">4SP V5</span>
                                <span class="text-xs secondary-font">Student Multi-Tool Platform</span>
                            </div>
                        </div>
                        <div class="hidden md:flex">${navTabs}</div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button id="login-btn" class="btn-primary text-sm">Login</button>
                    </div>
                </div>
            `;
        }
        attachEventListeners();
    }

    function toggleLoginState() {
        loggedIn = !loggedIn;
        updateNavbarContent();
    }

    document.addEventListener('keydown', function (e) {
        if (e.shiftKey && e.key === 'L') {
            e.preventDefault();
            toggleLoginState();
        }
    });

    createNavbar();
});
