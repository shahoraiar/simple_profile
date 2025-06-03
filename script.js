
    // Sidebar toggle
    document.getElementById('easy-isp-title').addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('d-none');

      const mainContent = document.getElementById('main-content');
      if (sidebar.classList.contains('d-none')) {
          // Sidebar is hidden, main content should expand
          mainContent.classList.remove('col-md-10');
          mainContent.classList.add('col-md-12');
      } else {
          // Sidebar is visible, main content should contract
          mainContent.classList.remove('col-md-12');
          mainContent.classList.add('col-md-10');
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
        const currentIsMobileView = window.innerWidth < 768;
        const sidebar = document.getElementById('sidebar'); // Get sidebar element
        const mainContent = document.getElementById('main-content'); // Get mainContent element

        // Check if we transitioned from desktop/tablet to mobile view
        if (currentIsMobileView && !isMobileView) {
            // Check if the sidebar is currently visible
            if (sidebar && !sidebar.classList.contains('d-none')) {
                // Hide the sidebar
                sidebar.classList.add('d-none');

                // Expand main content
                if (mainContent) {
                    mainContent.classList.remove('col-md-10');
                    mainContent.classList.add('col-md-12');
                }
            }
        }
        // Update the view state for the next resize event
        isMobileView = currentIsMobileView;
    });
