
    // Sidebar toggle
    document.getElementById('easy-isp-title').addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('d-none');
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
