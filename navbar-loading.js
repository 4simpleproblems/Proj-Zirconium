// navbar-loading.js
document.addEventListener('DOMContentLoaded', function () {
    let loggedIn = false;
    const navbarHeight = '65px';

    function createNavbar() {
        const navbar = document.createElement('nav');
        navbar.id = 'navbar';
        navbar.className = 'fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50';
        navbar.style.height = navbarHeight;
        navbar.style.opacity = '0';
        document.body.prepend(navbar);
        updateNavbarContent();

        // Push down main content
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            document.body.style.marginTop = navbarHeight;
        }

        setTimeout(() => {
            navbar.style.opacity = '1';
        }, 10);
    }

    function updateNavbarContent() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        if (loggedIn) {
            navbar.innerHTML = `
                <div class="navbar-container h-full flex items-center justify-between px-8">
                    <div class="flex items-center space-x-4">
                        <svg width="24" height="24" viewBox="0 0 75 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.592 0L74.634 64.498H0.55L37.592 0Z" fill="black"></path></svg>
                        <span class="font-semibold">Vercel Dashboard</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <span class="text-sm">Welcome, User!</span>
                        <button id="logout-btn" class="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md">Logout</button>
                    </div>
                </div>
            `;
        } else {
            navbar.innerHTML = `
                <div class="navbar-container h-full flex items-center justify-between px-8">
                    <div class="flex items-center space-x-4">
                         <svg width="24" height="24" viewBox="0 0 75 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.592 0L74.634 64.498H0.55L37.592 0Z" fill="black"></path></svg>
                        <span class="font-semibold">Vercel</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button id="login-btn" class="text-sm bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md">Login</button>
                    </div>
                </div>
            `;
        }
    }

    function toggleLoginState() {
        loggedIn = !loggedIn;
        updateNavbarContent();
    }

    // Keyboard shortcut to toggle login state
    document.addEventListener('keydown', function (e) {
        if (e.shiftKey && e.key === 'L') {
            toggleLoginState();
        }
    });

    createNavbar();
});
