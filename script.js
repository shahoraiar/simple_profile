document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar Toggle Functionality ---
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('main');
    const sidebarWidth = sidebar.offsetWidth + 'px'; // Get initial sidebar width

    if (sidebarToggleBtn && sidebar && mainContent) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-hidden');
            if (sidebar.classList.contains('sidebar-hidden')) {
                mainContent.style.marginLeft = '0';
            } else {
                mainContent.style.marginLeft = sidebarWidth;
            }
        });
    } else {
        console.error("Sidebar toggle elements not found.");
    }

    // --- Settings Dropdown Functionality ---
    const settingsTrigger = document.getElementById('settings-dropdown-trigger');
    const settingsMenu = document.getElementById('settings-dropdown-menu');

    if (settingsTrigger && settingsMenu) {
        settingsTrigger.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from immediately closing dropdown
            settingsMenu.style.display = settingsMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (event) => {
            if (!settingsTrigger.contains(event.target) && !settingsMenu.contains(event.target)) {
                settingsMenu.style.display = 'none';
            }
        });
    } else {
        console.error("Settings dropdown elements not found.");
    }

    // --- Dynamic Behavior for Balance Circles ---
    const holdDayCircle = document.getElementById('hold-day-circle');
    const hourCircle = document.getElementById('hour-circle');
    const minuteCircle = document.getElementById('minute-circle');
    const secondCircle = document.getElementById('second-circle');

    if (holdDayCircle && hourCircle && minuteCircle && secondCircle) {
        let seconds = 59;
        let minutes = 59;
        let hours = 23;
        let holdDays = parseInt(holdDayCircle.querySelector('p:last-child').textContent) || 15; // Get initial or default

        // Function to update circle content
        const updateCircleText = (circleElement, label, value) => {
            const labelElement = circleElement.querySelector('p:first-child');
            const valueElement = circleElement.querySelector('p:last-child');
            if (labelElement && valueElement) {
                // labelElement.textContent = label; // Label is static in HTML
                valueElement.textContent = value.toString().padStart(2, '0'); // Pad with 0 for single digits
            }
        };
        
        // Initial display
        updateCircleText(holdDayCircle, "Hold Day", holdDays);
        updateCircleText(hourCircle, "Hour", hours);
        updateCircleText(minuteCircle, "Minute", minutes);
        updateCircleText(secondCircle, "Second", seconds);


        // Update seconds every second
        setInterval(() => {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    if (hours < 0) {
                        hours = 23;
                        holdDays--; // Decrement hold days when hours cycle
                        if (holdDays < 0) {
                            holdDays = 15; // Reset hold days or handle as needed
                        }
                        updateCircleText(holdDayCircle, "Hold Day", holdDays);
                    }
                    updateCircleText(hourCircle, "Hour", hours);
                }
                updateCircleText(minuteCircle, "Minute", minutes);
            }
            updateCircleText(secondCircle, "Second", seconds);
        }, 1000);

    } else {
        console.error("Balance circle elements not found.");
    }
});
