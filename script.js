document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('appGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    let appsData = [];

    // Load Apps from Global Data (data.js) or Firebase
    if (typeof db !== 'undefined' && db !== null) {
        // Fetch from Firebase
        console.log("Fetching apps from Firebase...");
        db.collection("apps").get().then((querySnapshot) => {
            appsData = [];
            querySnapshot.forEach((doc) => {
                appsData.push(doc.data());
            });
            
            if (appsData.length === 0 && window.appsData) {
                console.warn("Firebase collection is empty. Falling back to data.js");
                appsData = window.appsData;
            }
            renderApps(appsData);
        }).catch((error) => {
            console.error("Error fetching from Firebase: ", error);
            appsData = window.appsData || [];
            renderApps(appsData);
        });
    } else {
        // Fallback to data.js
        if (window.appsData) {
            appsData = window.appsData;
        } else {
            console.warn('appsData not found. Checking if data.js is loaded.');
            appsData = [];
        }
        renderApps(appsData);
    }

    // Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = appsData.filter(app =>
                app.name.toLowerCase().includes(query) ||
                app.tags.some(tag => tag.toLowerCase().includes(query))
            );
            renderApps(filtered);
        });
    }

    // Render Apps
    function renderApps(apps) {
        grid.innerHTML = '';
        if (apps.length === 0) {
            grid.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">No apps found.</p>';
            return;
        }

        apps.forEach((app, index) => {
            const card = document.createElement('div');
            card.className = 'app-card';
            card.style.animationDelay = `${index * 0.1}s`; // Staggered animation

            // Determine Badge
            let badge = '';
            if (app.tags.includes('New')) {
                badge = '<span class="tag-badge">NEW</span>';
            } else if (app.tags.includes('Popular')) {
                badge = '<span class="tag-badge popular">POPULAR</span>';
            }
            card.innerHTML = `
                <a href="details.html?id=${app.id}" style="text-decoration: none; display: block; color: inherit;">
                    <div class="app-banner-container">
                        <img src="${app.iconUrl}" alt="${app.name}" class="app-banner" onerror="this.src='https://via.placeholder.com/300x180/1a1a2e/ffffff?text=${encodeURIComponent(app.name)}'">
                        ${badge}
                    </div>
                    <div class="app-content-container" style="padding-bottom: 0.5rem;">
                        <h3 class="app-title-centered">${app.name}</h3>
                        <p class="app-subtitle-centered">${app.developer}</p>
                    </div>
                </a>
                <div class="app-content-container" style="padding-top: 0; flex: 1; justify-content: flex-end;">
                    <div class="action-buttons-row">
                        ${app.showStudyNow === true ? `<a href="${app.studyNowUrl}" class="btn btn-explore" target="_blank"><i class="fas fa-book-reader"></i> STUDY NOW</a>` : ''}
                        ${app.showDownload !== false ? `<a href="${app.downloadUrl}" class="btn btn-enroll" target="_blank"><i class="fas fa-cloud-download-alt"></i> DOWNLOAD</a>` : ''}
                    </div>
                </div>
            `;
            grid.appendChild(card);

            // Inject Native Ad Card every 3 apps (Mobile Only)
            if ((index + 1) % 3 === 0 && index !== apps.length - 1) {
                const adCard = document.createElement('div');
                adCard.className = 'ad-card ad-mobile-only';
                adCard.style.animationDelay = `${(index + 1) * 0.1}s`;
                adCard.innerHTML = `
                    <span class="premium-ad-label">Sponsored</span>
                    <ins class="adsbygoogle"
                         style="display:block"
                         data-ad-format="fluid"
                         data-ad-layout-key="-6t+ed+2i-1n-4w"
                         data-ad-client="ca-pub-6608561504651468"
                         data-ad-slot="1884895487"></ins>
                `;
                grid.appendChild(adCard);
                
                // Initialize AdSense unit safely after adding to DOM
                setTimeout(() => {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    } catch (e) {
                        console.error('AdSense injection error:', e);
                    }
                }, 100);
            }
        });

        // Native ads initialization skipped as we use custom image ad
    }

    // Filter Functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            if (filterValue === 'all') {
                renderApps(appsData);
            } else {
                const filtered = appsData.filter(app => app.tags.includes(filterValue));
                renderApps(filtered);
            }
        });
    });
});

