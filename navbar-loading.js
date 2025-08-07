// navbar-loading.js
document.addEventListener('DOMContentLoaded', function () {
    let loggedIn = false;
    const navbarHeight = '65px';

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
        updateNavbarContent();

        // Push down the main content to make space for the navbar
        document.body.style.marginTop = navbarHeight;

        // Fade in the navbar for a smooth appearance
        setTimeout(() => {
            navbar.style.opacity = '1';
        }, 10);

        // Add a global click listener to close the account menu when clicking outside
        document.addEventListener('click', function(event) {
            const menu = document.getElementById('account-menu');
            const button = document.getElementById('account-button');
            // If the menu exists and the click is outside both the menu and the button, hide it.
            if (menu && button && !menu.contains(event.target) && !button.contains(event.target)) {
                menu.classList.remove('menu-visible');
                menu.classList.add('menu-hidden');
            }
        });
    }

    /**
     * Attaches necessary event listeners after the navbar content is updated.
     * This needs to be re-run every time the innerHTML of the navbar changes.
     */
    function attachEventListeners() {
        if (loggedIn) {
            const accountButton = document.getElementById('account-button');
            const logoutButton = document.getElementById('logout-btn');
            
            if (accountButton) {
                accountButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent the document click listener from firing and closing the menu immediately
                    const menu = document.getElementById('account-menu');
                    menu.classList.toggle('menu-hidden');
                    menu.classList.toggle('menu-visible');
                });
            }
            if (logoutButton) {
                logoutButton.addEventListener('click', toggleLoginState);
            }
        } else {
            const loginButton = document.getElementById('login-btn');
            if (loginButton) {
                loginButton.addEventListener('click', toggleLoginState);
            }
        }
    }

    /**
     * Updates the navbar's inner HTML based on the current login state.
     */
    function updateNavbarContent() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        // Define the navigation tabs to be used in both states
        const navTabs = `
            <div class="flex items-center space-x-2 sm:space-x-6 text-sm text-gray-400">
                <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white transition-colors">Dashboard</a>
                <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white transition-colors">Soundboard</a>
                <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white transition-colors">Games</a>
                <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white transition-colors">Others</a>
            </div>
        `;

        // Logged-in view with account menu
        if (loggedIn) {
            navbar.innerHTML = `
                <div class="navbar-container h-full flex items-center justify-between px-4 sm:px-8">
                    <div class="flex items-center space-x-4 sm:space-x-8">
                        <div class="flex items-center space-x-3">
                            <svg width="24" height="24" viewBox="0 0 75 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.592 0L74.634 64.498H0.55L37.592 0Z" fill="white"></path></svg>
                            <div class="flex flex-col">
                                <span class="font-semibold text-lg leading-tight text-white" style="font-family: 'Impact', sans-serif;">4SP V5</span>
                                <span class="text-xs text-gray-400 leading-tight">Student Multi-Tool Platform</span>
                            </div>
                        </div>
                        <div class="hidden md:flex">${navTabs}</div>
                    </div>
                    <div class="relative">
                        <button id="account-button" class="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center font-bold text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition-colors">
                           S
                        </button>
                        <div id="account-menu" class="account-menu menu-hidden absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg border border-gray-700 py-1 z-50">
                            <div class="px-4 py-3 border-b border-gray-700">
                                <p class="text-sm font-semibold text-white truncate">student@school.edu</p>
                                <p class="text-xs text-gray-400">StudentUsername</p>
                            </div>
                            <div class="px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                                Joined on Jan 01, 2026
                            </div>
                            <a href="#" class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Dashboard</a>
                            <a href="#" class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Settings</a>
                            <div class="border-t border-gray-700 mt-1 pt-1">
                                <button id="logout-btn" class="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Logged-out view with login button
            navbar.innerHTML = `
                <div class="navbar-container h-full flex items-center justify-between px-4 sm:px-8">
                     <div class="flex items-center space-x-4 sm:space-x-8">
                        <div class="flex items-center space-x-3">
                            <svg width="24" height="24" viewBox="0 0 75 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.592 0L74.634 64.498H0.55L37.592 0Z" fill="white"></path></svg>
                             <div class="flex flex-col">
                                <span class="font-semibold text-lg leading-tight text-white" style="font-family: 'Impact', sans-serif;">4SP V5</span>
                                <span class="text-xs text-gray-400 leading-tight">Student Multi-Tool Platform</span>
                            </div>
                        </div>
                        <div class="hidden md:flex">${navTabs}</div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button id="login-btn" class="text-sm bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-md transition-colors">Login</button>
                    </div>
                </div>
            `;
        }
        // Re-attach event listeners every time the DOM is updated
        attachEventListeners();
    }

    /**
     * Toggles the login state and triggers a UI update.
     */
    function toggleLoginState() {
        loggedIn = !loggedIn;
        updateNavbarContent();
    }

    // Add keyboard shortcut (Shift + L) to toggle login state
    document.addEventListener('keydown', function (e) {
        if (e.shiftKey && e.key === 'L') {
            e.preventDefault(); // Prevent default browser action, if any
            toggleLoginState();
        }
    });

    // Initialize the navbar on page load
    createNavbar();
});
