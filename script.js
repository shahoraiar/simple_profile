// Sidebar toggle
document.getElementById('easy-isp-title').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const body = document.body;
    const mdBreakpoint = 768; // Bootstrap's md breakpoint

    if (window.innerWidth < mdBreakpoint) {
        // Mobile View: Toggle overlay sidebar

        // Ensure d-none is removed if we are trying to show the mobile overlay,
        // as d-none would prevent transform-based visibility.
        // The CSS for mobile #sidebar already has display: block !important to help.
        if (sidebar.classList.contains('d-none')) {
            sidebar.classList.remove('d-none');
        }

        sidebar.classList.toggle('sidebar-mobile-visible');
        body.classList.toggle('sidebar-overlay-active');

        // Ensure desktop-specific classes are not active on mainContent
        // Main content on mobile is typically full width by default due to column stacking.
        // No direct column changes needed for mainContent when overlay is active.

    } else {
        // Desktop View: Toggle sidebar in normal flow, adjust main content

        // Ensure mobile overlay classes are removed
        if (sidebar.classList.contains('sidebar-mobile-visible')) {
            sidebar.classList.remove('sidebar-mobile-visible');
        }
        if (body.classList.contains('sidebar-overlay-active')) {
            body.classList.remove('sidebar-overlay-active');
        }

        // Toggle d-none for desktop visibility
        sidebar.classList.toggle('d-none');

        // Adjust mainContent width
        if (sidebar.classList.contains('d-none')) {
            // Sidebar is hidden
                mainContent.classList.remove('col-md-9');
            mainContent.classList.add('col-md-12');
        } else {
            // Sidebar is visible
            mainContent.classList.remove('col-md-12');
                mainContent.classList.add('col-md-9');
        }
    }
});

// Dropdown Menu Logic
const dropdownTrigger = document.getElementById('settings-dropdown-trigger');
const dropdownMenu = document.getElementById('settings-dropdown-menu');

const notificationIcon = document.getElementById('notification-icon');
const notificationMenu = document.getElementById('notification-dropdown-menu');
const notificationWrapper = document.getElementById('notification-wrapper');

// Settings dropdown toggle (modified to close notification menu)
if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent click from reaching document
      const isCurrentlyVisible = dropdownMenu.style.display === 'block';
      dropdownMenu.style.display = isCurrentlyVisible ? 'none' : 'block';
      // If opening settings menu, close notification menu
      if (!isCurrentlyVisible && notificationMenu && notificationMenu.style.display === 'block') {
        notificationMenu.style.display = 'none';
      }
    });
}

// Notification dropdown toggle (new)
if (notificationIcon && notificationMenu && notificationWrapper) {
  notificationIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click from reaching document
    const isCurrentlyVisible = notificationMenu.style.display === 'block';
    notificationMenu.style.display = isCurrentlyVisible ? 'none' : 'block';
    // If opening notification menu, close settings menu
    if (!isCurrentlyVisible && dropdownMenu && dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';
    }
  });
}

// Document click listener (modified to handle both menus)
document.addEventListener('click', (event) => {
  // Close settings menu if click is outside
  if (dropdownMenu && dropdownMenu.style.display === 'block' && dropdownTrigger && !dropdownTrigger.contains(event.target)) {
    dropdownMenu.style.display = 'none';
  }
  // Close notification menu if click is outside
  if (notificationMenu && notificationMenu.style.display === 'block' && notificationWrapper && !notificationWrapper.contains(event.target)) {
    notificationMenu.style.display = 'none';
  }
});


// Live countdown timer
let totalSeconds = (15 * 86400) + (10 * 3600) + (30 * 60) + 45;

setInterval(() => {
  if (totalSeconds > 0) {
    totalSeconds--;
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (document.getElementById('days')) { // Check if elements exist before updating
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
  }
}, 1000);

// Responsive adjustments for sidebar and main content
let isMobileView = window.innerWidth < 768; // 768px is a common 'md' breakpoint

window.addEventListener('resize', () => {
    const mdBreakpoint = 768;
    const newIsMobileView = window.innerWidth < mdBreakpoint;
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const body = document.body;

    if (!sidebar || !mainContent || !body) return; // Defensive check

    // Check if the view mode has actually changed (mobile <-> desktop)
    if (newIsMobileView !== isMobileView) {
        if (newIsMobileView) {
            // Transitioning TO MOBILE view
            sidebar.classList.remove('sidebar-mobile-visible');
            body.classList.remove('sidebar-overlay-active');
            mainContent.classList.remove('col-md-9');
            mainContent.classList.add('col-md-12'); // Mobile usually implies full width for main content if sidebar is overlay
            // No need to toggle d-none on sidebar for mobile, its visibility is handled by sidebar-mobile-visible and CSS transform
        } else {
            // Transitioning TO DESKTOP view
            sidebar.classList.remove('sidebar-mobile-visible');
            body.classList.remove('sidebar-overlay-active');
            // Restore desktop layout based on the sidebar's d-none state
            if (sidebar.classList.contains('d-none')) {
                mainContent.classList.remove('col-md-9');
                mainContent.classList.add('col-md-12');
            } else {
                mainContent.classList.remove('col-md-12');
                mainContent.classList.add('col-md-9');
            }
        }
    }
    isMobileView = newIsMobileView;
});

// Listener for body click to close mobile overlay sidebar
document.body.addEventListener('click', function(event) {
    const body = document.body;
    const sidebar = document.getElementById('sidebar');

    if (!sidebar) return; // Defensive check

    // Check if the sidebar overlay is active and the click was on the backdrop (event.target === body)
    if (body.classList.contains('sidebar-overlay-active') && event.target === body) {
        sidebar.classList.remove('sidebar-mobile-visible');
        body.classList.remove('sidebar-overlay-active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (any existing code in DOMContentLoaded should be preserved)

    const demuMenuTrigger = document.getElementById('demu-menu-trigger');
    const demuSubMenu = document.getElementById('demu-sub-menu');

    if (demuMenuTrigger && demuSubMenu) {
        demuMenuTrigger.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior

            const toggleIcon = this.querySelector('.toggle-icon');

            if (demuSubMenu.style.display === 'none' || demuSubMenu.style.display === '') {
                demuSubMenu.style.display = 'block'; // Or 'flex' if it's a flex container, but nav flex-column suggests block is fine
                if (toggleIcon) {
                    toggleIcon.textContent = '-';
                }
            } else {
                demuSubMenu.style.display = 'none';
                if (toggleIcon) {
                    toggleIcon.textContent = '+';
                }
            }
        });
    }

    // ... (any other existing code in DOMContentLoaded)

    const togglePasswordVisibility = document.getElementById('toggle-password-visibility');
    const passwordInput = document.getElementById('profile-password');
    const passwordToggleIcon = document.querySelector('#toggle-password-visibility .password-toggle-icon'); // More specific selector

    if (togglePasswordVisibility && passwordInput && passwordToggleIcon) {
        togglePasswordVisibility.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggleIcon.textContent = '🔒'; // Icon representing "password visible, click to hide"
            } else {
                passwordInput.type = 'password';
                passwordToggleIcon.textContent = '👁️'; // Icon representing "password hidden, click to show"
            }
        });
    }
});
