
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
                mainContent.classList.remove('col-md-10');
                mainContent.classList.add('col-md-12');
            } else {
                // Sidebar is visible
                mainContent.classList.remove('col-md-12');
                mainContent.classList.add('col-md-10');
            }
        }
    });

    // Settings dropdown toggle
    const dropdownTrigger = document.getElementById('settings-dropdown-trigger');
    const dropdownMenu = document.getElementById('settings-dropdown-menu');
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
      if (!dropdownTrigger.contains(e.target)) {
        dropdownMenu.style.display = 'none';
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

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
      }
    }, 1000);

    let isMobileView = window.innerWidth < 768; // 768px is a common 'md' breakpoint

    window.addEventListener('resize', () => {
        const mdBreakpoint = 768;
        const newIsMobileView = window.innerWidth < mdBreakpoint;
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');
        const body = document.body;

        // Check if the view mode has actually changed (mobile <-> desktop)
        if (newIsMobileView !== isMobileView) {
            if (newIsMobileView) {
                // Transitioning TO MOBILE view
                // 1. Ensure mobile overlay is initially closed
                sidebar.classList.remove('sidebar-mobile-visible');
                body.classList.remove('sidebar-overlay-active');

                // Ensure mainContent is not constrained by desktop sidebar column class
                 mainContent.classList.remove('col-md-10');
                 mainContent.classList.add('col-md-12');

            } else {
                // Transitioning TO DESKTOP view
                // 1. Ensure mobile overlay elements are removed/hidden
                sidebar.classList.remove('sidebar-mobile-visible');
                body.classList.remove('sidebar-overlay-active');

                // 2. Restore desktop layout based on the sidebar's d-none state
                if (sidebar.classList.contains('d-none')) {
                    // Sidebar should be hidden on desktop
                    mainContent.classList.remove('col-md-10');
                    mainContent.classList.add('col-md-12');
                } else {
                    // Sidebar should be visible on desktop
                    mainContent.classList.remove('col-md-12');
                    mainContent.classList.add('col-md-10');
                }
            }
        }

        // Update the view state for the next resize event
        isMobileView = newIsMobileView;
    });
