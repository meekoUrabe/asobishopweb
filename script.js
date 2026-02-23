/* ─── THEME: Apply saved preference before paint ─────────────────── */
(function () {
    if (localStorage.getItem('asobiTheme') === 'light') {
        document.documentElement.classList.add('light-mode');
    }
})();

document.addEventListener('DOMContentLoaded', function () {

    /* Transfer light-mode class from <html> to <body> */
    if (document.documentElement.classList.contains('light-mode')) {
        document.body.classList.add('light-mode');
        document.documentElement.classList.remove('light-mode');
    }

    /* ─── THEME TOGGLE ────────────────────────────────────────────── */
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle';
    themeBtn.setAttribute('aria-label', 'Toggle light/dark mode');
    themeBtn.innerHTML = `
        <svg class="icon-pokeball" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#1a1a2e" stroke-width="4"/>
            <path d="M2 50 Q2 2 50 2 Q98 2 98 50Z" fill="#E3000B"/>
            <path d="M2 50 Q2 98 50 98 Q98 98 98 50Z" fill="#f5f5f5"/>
            <rect x="2" y="46" width="96" height="8" fill="#1a1a2e"/>
            <circle cx="50" cy="50" r="12" fill="#f5f5f5" stroke="#1a1a2e" stroke-width="4"/>
            <circle cx="50" cy="50" r="5" fill="#1a1a2e"/>
        </svg>
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5" fill="currentColor"/>
            <line x1="12" y1="1"  x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1"  y1="12" x2="3"  y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
            <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
        </svg>
    `;
    document.body.appendChild(themeBtn);

    themeBtn.addEventListener('click', function () {
        const isLight = document.body.classList.toggle('light-mode');
        localStorage.setItem('asobiTheme', isLight ? 'light' : 'dark');
    });

    /* ─── SIDEBAR ─────────────────────────────────────────────────── */
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.id = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);

    const sidebar = document.createElement('aside');
    sidebar.id = 'sidebar';
    sidebar.innerHTML = `
        <div class="sidebar-banner">
            <div class="sidebar-brand">
                <img src="assets/Icons & Logos/asobi-logo.png" alt="Asobi" class="sidebar-logo-img">
                <div>
                    <div class="sidebar-brand-name">Asobi</div>
                    <div class="sidebar-brand-sub">Hobby Shop</div>
                </div>
            </div>
            <button id="sidebarClose" aria-label="Close sidebar"
                style="margin-left:auto;background:none;border:none;cursor:pointer;color:rgba(255, 255, 255, 0);font-size:1.4rem;line-height:1;padding:0.25rem 0.5rem;">
                &#10005;
            </button>
        </div>

        <div class="sidebar-body">
            <a href="products.html" class="sidebar-shop-cta">
                <span>
                    <svg width="64px" height="64px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g><path d="M838.4 819.2c0 14.08-11.52 25.6-25.6 25.6h-563.2c-14.08 0-25.6-11.52-25.6-25.6V243.2c0-14.08 11.52-25.6 25.6-25.6h563.2c14.08 0 25.6 11.52 25.6 25.6v576z" fill="#F7E6A3"></path><path d="M812.8 857.6h-563.2c-21.76 0-38.4-16.64-38.4-38.4V243.2c0-21.76 16.64-38.4 38.4-38.4h563.2c21.76 0 38.4 16.64 38.4 38.4v576c0 21.76-16.64 38.4-38.4 38.4z m-563.2-627.2c-7.68 0-12.8 5.12-12.8 12.8v576c0 7.68 5.12 12.8 12.8 12.8h563.2c7.68 0 12.8-5.12 12.8-12.8V243.2c0-7.68-5.12-12.8-12.8-12.8h-563.2z" fill="#231C1C"></path><path d="M224 512m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z" fill="#E42710"></path><path d="M838.4 512m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z" fill="#E42710"></path><path d="M761.6 691.2c0 14.08-11.52 25.6-25.6 25.6h-409.6c-14.08 0-25.6-11.52-25.6-25.6V358.4c0-14.08 11.52-25.6 25.6-25.6h409.6c14.08 0 25.6 11.52 25.6 25.6v332.8z" fill="#6FB0BE"></path><path d="M531.2 512m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z" fill="#E42710"></path><path d="M915.2 512h-768l51.2-230.4h665.6z" fill="#E42710"></path></g></svg>
                    Shop Now
                </span>
                <span class="cta-arrow">&#8594;</span>
            </a>

            <p class="sidebar-section-label">Navigate</p>
            <div class="sidebar-links">
                <a href="index.html#home"><span class="link-icon"></span> Home</a>
                <a href="index.html#contact"><span class="link-icon"></span> Contact</a>
                <a href="login.html"><span class="link-icon"></span> Login / Sign Up</a>
            </div>

            <p class="sidebar-section-label">Find Us</p>
            <div class="sidebar-info-card">
                <div class="sidebar-info-row">
                    <span>
                        <svg viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>facebook [#ffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z" id="facebook-[#ffffff]"> </path> </g> </g> </g> </g></svg>                    </span>
                    <a href="https://web.facebook.com/PoroHoloTCG" target="_blank">Facebook Page</a>
                </div>
                <div class="sidebar-info-row">
                    <span>
                        <svg fill="#ffffff" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="7935ec95c421cee6d86eb22ecd11f972"> <path style="display: inline; fill-rule: evenodd; clip-rule: evenodd;" d="M511.5,446.753V65.247H0.5v381.506H511.5L511.5,446.753 L511.5,446.753z M438.245,368.552v74.224H79.53v-70.247h0.615l1.816-0.605l134.664-108.435l40.74,34.519l36.176-31.78 L438.245,368.552L438.245,368.552L438.245,368.552z M438.245,355.428l-137.114-95.917l137.114-118.819V355.428L438.245,355.428 L438.245,355.428z M415.453,69.215L396.898,86.93l-8.811,8.569l-8.205,8.532l-8.514,7.944l-7.898,7.945l-7.6,7.33l-7.004,7.33 l-7.294,6.725l-6.688,6.725l-12.462,12.519l-11.867,11.298l-5.457,5.197l-4.871,5.188l-5.16,4.285l-4.574,4.266l-8.195,7.954 l-3.959,3.354l-3.344,3.371l-3.344,2.72l-2.748,3.074l-5.16,4.284l-2.123,1.509l-1.527,1.845l-1.816,0.912l-1.221,1.229 l-1.518,1.211L101.102,68.609L415.453,69.215L415.453,69.215L415.453,69.215z M208.727,256.764L79.53,360.001l0.298-212.893 L208.727,256.764L208.727,256.764L208.727,256.764z"> </path> </g> </g></svg>
                    </span>
                    <a href="mailto:zaarr06@gmail.com">zaarr06@gmail.com</a>
                </div>
                <div class="sidebar-info-row">
                    <span>
                        <svg viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>call [#ffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-103.000000, -7321.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M61.7302966,7173.99596 C61.2672966,7175.40296 59.4532966,7176.10496 58.1572966,7175.98796 C56.3872966,7175.82796 54.4612966,7174.88896 52.9992966,7173.85496 C50.8502966,7172.33496 48.8372966,7169.98396 47.6642966,7167.48896 C46.8352966,7165.72596 46.6492966,7163.55796 47.8822966,7161.95096 C48.3382966,7161.35696 48.8312966,7161.03996 49.5722966,7161.00296 C50.6002966,7160.95296 50.7442966,7161.54096 51.0972966,7162.45696 C51.3602966,7163.14196 51.7112966,7163.84096 51.9072966,7164.55096 C52.2742966,7165.87596 50.9912966,7165.93096 50.8292966,7167.01396 C50.7282966,7167.69696 51.5562966,7168.61296 51.9302966,7169.09996 C52.6632966,7170.05396 53.5442966,7170.87696 54.5382966,7171.50296 C55.1072966,7171.86196 56.0262966,7172.50896 56.6782966,7172.15196 C57.6822966,7171.60196 57.5872966,7169.90896 58.9912966,7170.48196 C59.7182966,7170.77796 60.4222966,7171.20496 61.1162966,7171.57896 C62.1892966,7172.15596 62.1392966,7172.75396 61.7302966,7173.99596 C61.4242966,7174.92396 62.0362966,7173.06796 61.7302966,7173.99596" id="call-[#ffffff]"> </path> </g> </g> </g> </g></svg>                    </span>
                    <span>+63 XXX XXX XXXX</span>
                </div>
                <div class="sidebar-info-row">
                    <span>
                        <svg height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.985 511.985" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#ED5564;" d="M423.045,111.903c-9.156-21.515-22.202-40.92-38.795-57.702 c-16.703-16.89-36.078-30.187-57.593-39.514C304.189,4.937,280.425,0,255.988,0c-24.421,0-48.202,4.938-70.67,14.687 c-21.515,9.328-40.89,22.625-57.592,39.514c-16.593,16.781-29.647,36.187-38.804,57.702c-9.46,22.234-14.265,45.592-14.265,69.419 c0,51.936,25.671,90.326,58.17,138.917c27.616,41.295,61.99,92.684,91.185,168.807c3.133,8.578,13.335,22.938,31.976,22.938 c18.546,0,28.779-13.469,31.904-21.438l0.047-0.109c29.297-77.014,63.795-128.809,91.514-170.416 c32.326-48.561,57.873-86.903,57.873-138.699C437.326,157.495,432.513,134.137,423.045,111.903z"></path> <path style="fill:#E6E9ED;" d="M74.658,181.401c0.023,51.905,25.687,90.263,58.17,138.839 c27.616,41.295,61.99,92.684,91.185,168.807c3.133,8.578,13.335,22.938,31.976,22.938c18.546,0,28.779-13.469,31.904-21.438 l0.047-0.109c29.297-77.014,63.795-128.809,91.514-170.416c32.311-48.529,57.842-86.872,57.873-138.621L74.658,181.401 L74.658,181.401z"></path> <path style="fill:#434A54;" d="M74.658,181.323c0,3.625,0.141,7.172,0.383,10.672h361.895c0.234-3.5,0.391-7.047,0.391-10.672 c0-3.562-0.125-7.125-0.344-10.656H74.994C74.783,174.198,74.658,177.76,74.658,181.323z"></path> <path style="fill:#1A1A2E;" d="M319.986,181.323c0,35.343-28.656,63.998-63.998,63.998c-35.343,0-63.998-28.655-63.998-63.998 s28.655-63.998,63.998-63.998C291.33,117.325,319.986,145.98,319.986,181.323z"></path> <path style="opacity:0.2;fill:#FFFFFF;enable-background:new ;" d="M255.988,117.325c-5.523,0-10.883,0.703-16,2.016 c27.601,7.109,47.998,32.171,47.998,61.982c0,29.827-20.397,54.889-47.998,61.982c5.117,1.312,10.477,2.016,16,2.016 c35.342,0,63.998-28.655,63.998-63.998S291.33,117.325,255.988,117.325z"></path> <path style="fill:#434A54;" d="M255.988,255.992c-41.171,0-74.662-33.499-74.662-74.67c0-41.17,33.491-74.654,74.662-74.654 c41.17,0,74.653,33.483,74.653,74.654S297.158,255.992,255.988,255.992z M255.988,127.996c-29.405,0-53.334,23.921-53.334,53.326 s23.929,53.342,53.334,53.342c29.404,0,53.342-23.937,53.342-53.342S285.392,127.996,255.988,127.996z"></path> <path style="fill:#CCD1D9;" d="M255.988,373.316c-5.891,0-10.664,4.781-10.664,10.672V510.25c3.188,1.094,6.734,1.734,10.664,1.734 c3.922,0,7.477-0.609,10.663-1.641V383.988C266.651,378.097,261.879,373.316,255.988,373.316z"></path> <path style="opacity:0.2;fill:#FFFFFF;enable-background:new ;" d="M423.045,111.903c-9.156-21.515-22.202-40.92-38.795-57.702 c-16.703-16.89-36.078-30.187-57.593-39.514C304.189,4.937,280.425,0,255.988,0c-3.57,0-7.125,0.125-10.664,0.328 c20.679,1.234,40.818,6.031,60.006,14.359c21.499,9.328,40.873,22.625,57.592,39.514c16.594,16.781,29.64,36.187,38.796,57.702 c9.468,22.234,14.265,45.592,14.265,69.419c0,51.795-25.53,90.138-57.873,138.699c-27.718,41.607-62.201,93.402-91.505,170.416 l-0.039,0.109c-2.452,6.25-9.296,15.906-21.093,19.75c3.148,1.062,6.648,1.688,10.516,1.688c18.546,0,28.779-13.469,31.904-21.438 l0.047-0.109c29.297-77.014,63.795-128.809,91.514-170.416c32.326-48.561,57.873-86.903,57.873-138.699 C437.326,157.495,432.513,134.137,423.045,111.903z"></path> </g></svg>
                    </span>
                    <a href="https://maps.app.goo.gl/LVs7NpkaBF5j3Svn8" target="_blank" rel="noopener">
                    1234 Asobi St., Tokyo, Japan
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(sidebar);

    /* Hamburger button */
    const hamburger = document.createElement('button');
    hamburger.id = 'sidebar-toggle';
    hamburger.setAttribute('aria-label', 'Toggle sidebar');
    hamburger.innerHTML = `<span class="bar"></span><span class="bar"></span><span class="bar"></span>`;
    document.body.appendChild(hamburger);

    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('open');
        hamburger.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    document.getElementById('sidebarClose').addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    sidebar.querySelectorAll('.sidebar-links a, .sidebar-shop-cta').forEach(function (a) {
        a.addEventListener('click', closeSidebar);
    });

    /* ─── CAROUSEL ────────────────────────────────────────────────── */
    var carousel = document.getElementById('featuredCarousel');
    var nextBtn  = document.getElementById('nextBtn');
    var prevBtn  = document.getElementById('prevBtn');

    if (carousel && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function () {
            carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', function () {
            carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
        });
    }

    /* ─── SMOOTH SCROLL ───────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ─── SCROLL REVEAL ───────────────────────────────────────────── */
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) e.target.classList.add('active');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

    /* ─── PARALLAX ────────────────────────────────────────────────── */
    window.addEventListener('scroll', function () {
        var scrolled = window.pageYOffset;
        var hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        }
    });

    /* ─── AUTH PAGE ───────────────────────────────────────────────── */
    var authSwitch = document.getElementById('authSwitch');
    var loginForm  = document.getElementById('loginForm');
    var signupForm = document.getElementById('signupForm');

    if (authSwitch && loginForm && signupForm) {
        var container = document.querySelector('.auth-container');
        var authCard  = container ? container.querySelector('.auth-card') : null;

        function setFixedHeight() {
            if (!authCard || !container) return;
            /* Temporarily make both faces static to measure their natural height */
            var h = Math.max(loginForm.scrollHeight + 64, signupForm.scrollHeight + 64);
            authCard.style.height  = h + 'px';
            container.style.height = h + 'px';
        }

        var labelLogin  = document.querySelector('.toggle-label:first-of-type');
        var labelSignup = document.querySelector('.toggle-label:last-of-type');

        function showLogin() {
            container.classList.remove('flip');  /* flip class still drives .auth-card via CSS child selector */
            authSwitch.checked = false;
            if (labelLogin)  labelLogin.classList.add('active');
            if (labelSignup) labelSignup.classList.remove('active');
            var err = signupForm.querySelector('.error');
            if (err) err.classList.add('hidden');
        }

        function showSignup() {
            container.classList.add('flip');
            authSwitch.checked = true;
            if (labelSignup) labelSignup.classList.add('active');
            if (labelLogin)  labelLogin.classList.remove('active');
            var err = signupForm.querySelector('.error');
            if (err) err.classList.add('hidden');
        }

        authSwitch.addEventListener('change', function () {
            authSwitch.checked ? showSignup() : showLogin();
        });

        var toSignup = document.getElementById('toSignup');
        var toLogin  = document.getElementById('toLogin');
        if (toSignup) toSignup.addEventListener('click', function (e) { e.preventDefault(); showSignup(); });
        if (toLogin)  toLogin.addEventListener('click',  function (e) { e.preventDefault(); showLogin();  });

        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Logged in! (placeholder)');
            loginForm.reset();
        });

        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var pwd     = signupForm.querySelector('input[name=password]').value;
            var confirm = signupForm.querySelector('input[name=confirm]').value;
            var errorEl = signupForm.querySelector('.error');
            if (pwd !== confirm) { errorEl.classList.remove('hidden'); return; }
            errorEl.classList.add('hidden');
            alert('Account created! (placeholder)');
            signupForm.reset();
        });

        /* Password visibility — login */
        document.querySelectorAll('#loginForm .show-password').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var input = btn.previousElementSibling;
                var show  = input.type === 'password';
                input.type = show ? 'text' : 'password';
                btn.classList.toggle('visible', show);
            });
        });

        /* Password visibility — signup (both fields toggled together) */
        var signupToggles = document.querySelectorAll('.show-signup-password');
        signupToggles.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var pwInput = document.getElementById('signupPassword');
                var cfInput = document.getElementById('signupConfirm');
                var show    = pwInput.type === 'password';
                pwInput.type = show ? 'text' : 'password';
                cfInput.type = show ? 'text' : 'password';
                signupToggles.forEach(function (b) { b.classList.toggle('visible', show); });
            });
        });

        showLogin();
        setFixedHeight();
        window.addEventListener('load', setFixedHeight);
    }

}); /* end DOMContentLoaded */
