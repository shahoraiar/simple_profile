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

    // --- Initialize Sidebar State ---
    const initializeSidebarState = () => {
        if (sidebar && mainContent) { // Ensure elements exist
            if (window.innerWidth <= 768) {
                sidebar.classList.add('sidebar-hidden');
                mainContent.style.marginLeft = '0px';
            } else {
                // Only remove sidebar-hidden if it was not explicitly closed by user toggle
                // The toggle button's state is the source of truth for user interaction.
                // If user hid it on large screen, resizing to small then large should keep it hidden.
                // However, the requirement is to show it if > 768px, unless toggle overrides.
                // For simplicity matching req: if > 768, ensure it's shown unless toggle has hidden it.
                // The problem implies initializeSidebarState can override toggle state on resize.
                sidebar.classList.remove('sidebar-hidden');
                mainContent.style.marginLeft = sidebarWidth;
            }
        }
    };

    // Call on load
    initializeSidebarState();

    // Call on resize
    window.addEventListener('resize', initializeSidebarState);

    // --- Data Table and Pagination ---
    const tableBody = document.getElementById('data-table-body');
    const prevButton = document.getElementById('prev-page-btn');
    const nextButton = document.getElementById('next-page-btn');
    const currentPageSpan = document.getElementById('current-page-span');

    if (tableBody && prevButton && nextButton && currentPageSpan) {
        const sampleData = [];
        for (let i = 1; i <= 35; i++) { // Create 35 sample items
            sampleData.push({
                id: i,
                name: `Item ${i}`,
                value: Math.floor(Math.random() * 1000),
                status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)]
            });
        }

        let currentPage = 1;
        const rowsPerPage = 10;

        function renderTable() {
            if (!tableBody || !prevButton || !nextButton || !currentPageSpan) {
                console.error("Table rendering elements missing in renderTable scope.");
                return;
            }

            // 1. Clear Existing Rows
            tableBody.innerHTML = '';

            // 2. Calculate Data Slice
            const start = (currentPage - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const paginatedData = sampleData.slice(start, end);

            // 3. Populate Table Rows
            paginatedData.forEach(item => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = item.id;
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = item.name;
                row.appendChild(nameCell);

                const valueCell = document.createElement('td');
                valueCell.textContent = item.value;
                row.appendChild(valueCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = item.status;
                row.appendChild(statusCell);

                tableBody.appendChild(row);
            });

            // 4. Update Pagination Button States
            const totalPages = Math.ceil(sampleData.length / rowsPerPage);
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;

            // 5. Update Current Page Display
            currentPageSpan.textContent = `Page: ${currentPage} of ${totalPages}`;
            
            // console.log('renderTable called for page:', currentPage, 'Total items:', sampleData.length, 'Total pages:', totalPages);
        }

        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });

        nextButton.addEventListener('click', () => {
            // Check if there's a next page
            const maxPage = Math.ceil(sampleData.length / rowsPerPage);
            if (currentPage < maxPage) {
                currentPage++;
                renderTable();
            }
        });

        // Initial render
        renderTable();
    } else {
        console.error("Data table or pagination elements not found.");
    }
});
