        // ===== FULL-WIDTH FIT TEXT =====
        function fitTextToViewport(selector) {
            const el = document.querySelector(selector);
            if (!el) return;
            const mobile = window.innerWidth <= 900;
            if (mobile && (selector === '#hero-massive' || selector === '.footer-massive')) return;
            el.style.fontSize = '';
            const targetWidth = document.documentElement.clientWidth;
            const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
            const currentWidth = el.scrollWidth;
            if (!currentWidth || !currentSize) return;
            const idealSize = currentSize * (targetWidth / currentWidth);
            el.style.fontSize = idealSize + 'px';
        }
        function fitAllText() {
            fitTextToViewport('#hero-massive');
            fitTextToViewport('.footer-massive');
        }
        window.addEventListener('load', fitAllText);
        window.addEventListener('resize', fitAllText);


        gsap.registerPlugin(ScrollTrigger);

        // ===== REDUCED MOTION =====
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ===== HERO APPEAR ANIMATION =====
        const navEl = document.querySelector('nav');
        const heroMassive = document.getElementById('hero-massive');
        const heroTypedLines = document.querySelectorAll('.hero-typed-line');

        if (!prefersReducedMotion) {
            const heroAppearTl = gsap.timeline();

            heroAppearTl
                .fromTo(navEl,
                    { y: -100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
                )
                .fromTo(heroMassive,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                    '-=0.5'
                )
                .fromTo(heroTypedLines,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.15 },
                    '-=0.6'
                );
        }

        // ===== CHECK MOBILE =====
        const isMobile = window.innerWidth <= 900;

        // ===== REDUCED MOTION: show reveals =====
        if (prefersReducedMotion) {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        }

        // ===== MOBILE TEXT MODIFICATION =====
        function updateMobileText() {
            const mobile = window.innerWidth <= 900;
            const heroEl = document.getElementById('hero-massive');
            const footerEl = document.querySelector('.footer-massive');
            if (heroEl) {
                if (mobile) {
                    heroEl.innerHTML = '<div class="hero-marquee-track"><span>Kalediosekop&nbsp;</span><span>Kalediosekop&nbsp;</span></div>';
                    heroEl.style.whiteSpace = 'nowrap';
                } else {
                    heroEl.innerHTML = 'Kalediosekop';
                    heroEl.style.whiteSpace = 'nowrap';
                }
            }
            if (footerEl) {
                if (mobile) {
                    footerEl.innerHTML = '<div class="footer-marquee-track"><span>Contact Me&nbsp;</span><span>Contact Me&nbsp;</span></div>';
                    footerEl.style.whiteSpace = 'nowrap';
                } else {
                    footerEl.innerHTML = 'Contact Me';
                    footerEl.style.whiteSpace = 'nowrap';
                }
            }
            if (mobile) {
                if (heroEl) { heroEl.style.marginLeft = ''; heroEl.style.width = ''; heroEl.style.textAlign = ''; heroEl.style.fontSize = ''; }
                if (footerEl) { footerEl.style.marginLeft = ''; footerEl.style.width = ''; footerEl.style.textAlign = ''; footerEl.style.fontSize = ''; }
            } else {
                if (heroEl) { heroEl.style.marginLeft = ''; heroEl.style.width = ''; heroEl.style.textAlign = ''; heroEl.style.fontSize = ''; }
                if (footerEl) { footerEl.style.marginLeft = ''; footerEl.style.width = ''; footerEl.style.textAlign = ''; }
            }
        }
        updateMobileText();
        window.addEventListener('resize', updateMobileText);

        // ===== WORKS HERO SCROLL =====
        const worksHero = document.querySelector('.works-hero');
        const worksTextLeft = document.querySelector('.works-text-left');
        const worksTextRight = document.querySelector('.works-text-right');
        const worksHeroImage = document.querySelector('.works-hero-image');

        if (worksHero && !isMobile && !prefersReducedMotion) {
            gsap.set(worksHeroImage, { width: 0, height: 0, xPercent: -50, yPercent: -50 });

            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: worksHero,
                    start: 'top top',
                    end: '+=300%',
                    pin: true,
                    scrub: 1,
                }
            });

            // Phase 1: Image grows to 4:5 at center, text splits apart
            heroTl.to(worksHeroImage, { width: '36vw', height: '45vw', ease: 'none' }, 0.05);
            heroTl.to(worksTextLeft, { x: '-40vw', ease: 'none' }, 0.05);
            heroTl.to(worksTextRight, { x: '40vw', ease: 'none' }, 0.05);

            // Phase 2: Image moves to right side, text fully exits
            heroTl.to(worksHeroImage, { top: '50%', left: '75%', width: '50vw', height: '100vh', ease: 'none' }, 0.25);
            heroTl.to(worksTextLeft, { x: '-70vw', ease: 'none' }, 0.25);
            heroTl.to(worksTextRight, { x: '70vw', ease: 'none' }, 0.25);
        }


        // ===== WORKS SLIDES SCROLL =====
        const worksGrid = document.querySelector('.works-grid');
        const workSlides = document.querySelectorAll('.works-slide');

        if (worksGrid && workSlides.length >= 1 && !isMobile && !prefersReducedMotion) {
            const transitions = workSlides.length - 1;
            const slideTl = gsap.timeline({
                scrollTrigger: {
                    trigger: worksGrid,
                    start: 'top top',
                    end: '+=' + ((transitions > 0 ? transitions : 1) * 200) + '%',
                    pin: true,
                    scrub: 1,
                }
            });

            for (let i = 1; i < workSlides.length; i++) {
                slideTl.fromTo(workSlides[i],
                    { y: '100%' },
                    { y: '0%', ease: 'none' },
                    i - 1
                );
            }
        }


        // ===== ABOUT SECTION SCROLL REVEALS =====
        const aboutLine1 = document.querySelector('.about-line-1');
        const aboutLine2 = document.querySelector('.about-line-2');
        const aboutProfile = document.querySelector('.about-profile');
        const aboutDetails = document.querySelector('.about-details');
        const aboutProfileWrap = document.querySelector('.about-profile-wrap');

        if (!prefersReducedMotion) {
            // About lines appear from bottom
            gsap.fromTo(aboutLine1,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                  scrollTrigger: { trigger: aboutLine1, start: 'top 90%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo(aboutLine2,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
                  scrollTrigger: { trigger: aboutLine2, start: 'top 90%', toggleActions: 'play none none reverse' }
                }
            );

            // Profile image slides in from bottom
            gsap.fromTo(aboutProfile,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: aboutProfileWrap,
                        start: 'top 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // About details children stagger reveal
            const aboutDetailItems = document.querySelectorAll('.about-details > *');
            gsap.fromTo(aboutDetailItems,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: aboutProfileWrap,
                        start: 'top 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Recent Work cards stagger reveal
            document.querySelectorAll('.recent-work-year-section').forEach(section => {
                const cards = section.querySelectorAll('.recent-work-card');
                gsap.fromTo(cards,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }




        // ===== SCROLL REVEAL =====
        const revealElements = document.querySelectorAll('.reveal:not(.work-card)');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        revealElements.forEach(el => revealObserver.observe(el));


        // ===== MOBILE MENU =====
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navPill = document.querySelector('.nav-pill');
        mobileMenuBtn.addEventListener('click', () => {
            navPill.classList.toggle('open');
        });


        // ===== ACTIVE NAV LINK ON SCROLL =====
        const navLinks = document.querySelectorAll('.nav-pill a');
        const navTargets = Array.from(navLinks).map(link => {
            const id = link.getAttribute('href').replace('#', '');
            return document.getElementById(id);
        }).filter(Boolean);
        window.addEventListener('scroll', () => {
            let current = '';
            navTargets.forEach(el => {
                if (scrollY >= el.offsetTop - 200) {
                    current = el.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });


        // ===== LET'S TALK CURSOR FOLLOWER =====
        const letsTalk = document.getElementById('lets-talk');
        const footer = document.querySelector('footer');
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        let rafId = null;
        let isInFooter = false;

        function animateFollower() {
            const dx = mouseX - currentX;
            const dy = mouseY - currentY;
            currentX += dx * 0.15;
            currentY += dy * 0.15;
            letsTalk.style.transform = `translate(${currentX - 50}px, ${currentY - 50}px)`;
            rafId = requestAnimationFrame(animateFollower);
        }

        footer.addEventListener('mouseenter', () => {
            isInFooter = true;
            letsTalk.classList.add('active');
            if (!rafId) rafId = requestAnimationFrame(animateFollower);
        });

        footer.addEventListener('mouseleave', () => {
            isInFooter = false;
            letsTalk.classList.remove('active');
        });

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (isInFooter && !rafId) {
                rafId = requestAnimationFrame(animateFollower);
            }
        });

        // Stop animation when hidden to save resources
        setInterval(() => {
            if (!isInFooter && rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }, 100);


        // ===== IMAGE POPUP =====
        // WhatsApp link decoder (obfuscates number from bots)
        function openWa(e) {
            e.preventDefault();
            const p = [98, 115, 111, 97, 101, 97, 110, 111]; // dummy
            // real decode: pieces assembled at runtime
            const _0x6e1f = ['eA==','eQ==','dHk=','L2E=','d3d3'];
            const n = [[54,50],[56,57,54],[56,50,56],[52,54,52],[54,48]];
            let num = '';
            n.forEach(g => { g.forEach(c => { num += String.fromCharCode(c); }); });
            window.open('https://wa.me/' + num, '_blank');
            return false;
        }

        function openImagePopup(src) {
            let popup = document.getElementById('image-popup');
            if (!popup) {
                popup = document.createElement('div');
                popup.id = 'image-popup';
                popup.className = 'image-popup';
                popup.innerHTML = '<div class="image-popup-zoom-wrap"><img id="popup-img" src="" alt=""></div><div class="image-popup-text">Scroll to zoom · Click image to reset · Click backdrop to close</div>';
                document.body.appendChild(popup);
                popup.addEventListener('click', function(e) {
                    if (e.target === popup) closeImagePopup();
                });

                const img = popup.querySelector('#popup-img');
                const wrap = popup.querySelector('.image-popup-zoom-wrap');
                const minScale = 1;
                const maxScale = 6;
                const step = 0.25;

                function resetZoom() {
                    img.classList.remove('zoomed');
                    img.style.transform = '';
                    img.style.transformOrigin = '';
                    img.dataset.scale = '1';
                    wrap.scrollTop = 0;
                    wrap.scrollLeft = 0;
                }

                img.dataset.scale = '1';

                // Scroll to zoom in/out, omnidirectional (zoom towards cursor)
                wrap.addEventListener('wheel', function(e) {
                    e.preventDefault();
                    let scale = parseFloat(img.dataset.scale);

                    const rect = img.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;

                    if (e.deltaY < 0) {
                        scale = Math.min(maxScale, scale + step);
                    } else {
                        scale = Math.max(minScale, scale - step);
                    }

                    if (scale > 1) {
                        img.classList.add('zoomed');
                        img.style.transform = 'scale(' + scale + ')';
                        img.style.transformOrigin = x + '% ' + y + '%';
                    } else {
                        resetZoom();
                    }
                    img.dataset.scale = scale;
                }, { passive: false });

                // Click image to exit zoom/reset
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (parseFloat(img.dataset.scale) > 1) {
                        resetZoom();
                    }
                });
            }
            const img = popup.querySelector('#popup-img');
            img.src = src;
            img.classList.remove('zoomed');
            img.style.transform = '';
            img.style.transformOrigin = '';
            img.dataset.scale = '1';
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeImagePopup() {
            const popup = document.getElementById('image-popup');
            if (popup) {
                popup.classList.remove('active');
                const img = popup.querySelector('#popup-img');
                if (img) {
                    img.classList.remove('zoomed');
                    img.style.transform = '';
                    img.style.transformOrigin = '';
                    img.dataset.scale = '1';
                }
                document.body.style.overflow = '';
            }
        }

        // ===== CASE STUDY POPUP =====
        function openCaseStudyPopup(slide) {
            if (!slide) return;

            const isFullCase = slide.dataset.fullcase === 'true';
            if (isFullCase) {
                renderFullCaseStudy(slide);
                return;
            }

            const project = slide.dataset.project;
            const title = slide.dataset.title;
            const desc = slide.dataset.desc;
            const tags = slide.dataset.tags.split(',').map(t => t.trim());
            const img = slide.dataset.img;

            let popup = document.getElementById('case-study-popup');
            if (!popup) {
                popup = document.createElement('div');
                popup.id = 'case-study-popup';
                popup.className = 'case-study-popup';
                document.body.appendChild(popup);
            }

            const tagsHtml = tags.map(t => `<span class="case-study-popup-tag">${t}</span>`).join('');

            popup.innerHTML = `
                <div class="case-study-popup-card" onclick="event.stopPropagation()">
                    <div class="case-study-popup-image">
                        <img src="${img}" alt="${project}">
                    </div>
                    <div class="case-study-popup-body">
                        <button class="case-study-popup-close" onclick="closeCaseStudyPopup()">✕</button>
                        <div class="case-study-popup-tags">${tagsHtml}</div>
                        <div class="case-study-popup-name">${project}</div>
                        <h3 class="case-study-popup-title">${title}</h3>
                        <p class="case-study-popup-desc">${desc}</p>
                    </div>
                </div>
            `;

            requestAnimationFrame(() => {
                popup.classList.add('active');
            });
            document.body.style.overflow = 'hidden';

            popup.addEventListener('click', function(e) {
                if (e.target === popup) closeCaseStudyPopup();
            });
        }

        function renderFullCaseStudy(slide) {
            const project = slide.dataset.project;
            const tags = slide.dataset.tags.split(',').map(t => t.trim());
            const img = slide.dataset.img;

            let popup = document.getElementById('case-study-popup');
            if (!popup) {
                popup = document.createElement('div');
                popup.id = 'case-study-popup';
                popup.className = 'case-study-popup';
                document.body.appendChild(popup);
            }
            popup.classList.add('case-study-popup--full');

            const tagsHtml = tags.map(t => `<span class="case-study-popup-tag">${t}</span>`).join('');
            const arrowSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;

            let projectLinkHtml, heroImageSrc, sectionsHtml;

            if (project === 'Common Store Co') {
                const basePath = "Asset/Home/Featured Work/FW - 1";
                projectLinkHtml = `<a href="https://thecommonstore.co" target="_blank" onclick="event.stopPropagation()">${project}</a>`;
                heroImageSrc = "Asset/Home/Featured Work/FW - 3.webp";
                sectionsHtml = `
                            <div class="case-study-popup-section" id="cs-bg">
                                <div class="case-study-popup-section-title">Background</div>
                                <div class="case-study-popup-section-text">
                                    <p>Common Store Co is an umbrella of several creatives brand. The brands are developed and curated to invoke feelings and reminisce about personal memories in everyday goods.</p>
                                    <p>Currently, the brand identity hasn't proven to be like that. By this statement, the brand itself needed a revamp both in identity and their website.</p>
                                </div>
                                <img src="${basePath}/1 - CSC Initial Web.webp" alt="Common Store Co Initial Website" style="width: 100%; border-radius: 4px;" onclick="event.stopPropagation(); openImagePopup('${basePath}/1 - CSC Initial Web.webp')">
                            </div>

                            <div class="case-study-popup-section" id="cs-role">
                                <div class="case-study-popup-section-title">Role &amp; Responsibility</div>
                                <div class="case-study-popup-section-text">
                                    <p>My role in this project as a Web Designer responsible for end-to-end UX and UI Designs, collaborating with Graphic Designer, Creative Director, and Developer. My deliverable includes:</p>
                                    <ul>
                                        <li>Analyze the current website and look for improvements.</li>
                                        <li>Create a more flowy content structure.</li>
                                        <li>Collect moodboards as references.</li>
                                        <li>Create a wireframe and sketches.</li>
                                        <li>Create UI Design and iterate.</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-findings">
                                <div class="case-study-popup-section-title">Findings</div>
                                <div class="case-study-popup-section-text">
                                    <p>In the current design, we found that it does not reflect the brand value. Here's more that we found:</p>
                                    <ul>
                                        <li>Plain design that didn't reflect a creative brand.</li>
                                        <li>The website looked like a list of brands.</li>
                                        <li>As a company profile, there are no values to present.</li>
                                        <li>There weren't any of the things that were memorable to look at.</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-design">
                                <div class="case-study-popup-section-title">Design Decisions</div>
                                <div class="case-study-popup-section-text">
                                    <p><strong>Inject the UI with the new Brand Guideline</strong></p>
                                    <p>The current website design does not reflect the values. We brainstormed together to create the website that feels warmer and more modern.</p>
                                    <p><strong>Restructuring website content</strong></p>
                                    <p>The website only has a hero and a list of brands that takes too long to scroll. People don't just want to see the brands and descriptions; they also want to know more about the values of each brand we have.</p>
                                    <p>We restructured the content to provide more explanation and use the Golden Circle as the framework, so users can better understand what Common Store Co offers.</p>
                                </div>
                                <div class="case-study-popup-process-grid">
                                    <img src="${basePath}/2 - Moodboards.webp" alt="Moodboards" onclick="event.stopPropagation(); openImagePopup('${basePath}/2 - Moodboards.webp')">
                                    <img src="${basePath}/3 - Content & IA.webp" alt="Content & IA" onclick="event.stopPropagation(); openImagePopup('${basePath}/3 - Content & IA.webp')">
                                    <img src="${basePath}/4 - Wireframe 1.webp" alt="Wireframe 1" onclick="event.stopPropagation(); openImagePopup('${basePath}/4 - Wireframe 1.webp')">
                                    <img src="${basePath}/4 - Wireframe 2.webp" alt="Wireframe 2" onclick="event.stopPropagation(); openImagePopup('${basePath}/4 - Wireframe 2.webp')">
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-outcome">
                                <div class="case-study-popup-section-title">Outcome</div>
                                <div class="case-study-popup-section-text">
                                    <p>The redesign of Common Store Co has greatly improved visually and has a better content structure. Since this is a hub of brands, it's important to have a great first impression as the foundation.</p>
                                </div>
                                <div class="case-study-popup-section-images single">
                                    <img src="${basePath}/5 - UI Design.webp" alt="UI Design" onclick="event.stopPropagation(); openImagePopup('${basePath}/5 - UI Design.webp')">
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-skills">
                                <div class="case-study-popup-section-title">Skills &amp; Tools</div>
                                <div class="case-study-popup-skills">
                                    <span class="case-study-popup-skill">UX Research</span>
                                    <span class="case-study-popup-skill">Heuristic Evaluation</span>
                                    <span class="case-study-popup-skill">Wireframing</span>
                                    <span class="case-study-popup-skill">UI Design</span>
                                    <span class="case-study-popup-skill">Responsive Website</span>
                                    <span class="case-study-popup-skill">Prototyping</span>
                                    <span class="case-study-popup-skill">Collaboration</span>
                                    <span class="case-study-popup-skill">Figma</span>
                                    <span class="case-study-popup-skill">AI Image Generation</span>
                                    <span class="case-study-popup-skill">Branding</span>
                                </div>
                            </div>`;
            } else if (project === 'Visitor Management System') {
                const vmsBasePath = "Asset/Home/Featured Work/FW - 3";
                projectLinkHtml = `<a href="https://etamu-dprd.bandungbaratkab.go.id/" target="_blank" onclick="event.stopPropagation()">${project}</a>`;
                heroImageSrc = "Asset/Home/Featured Work/FW - 1.webp";
                sectionsHtml = `
                            <div class="case-study-popup-section" id="cs-bg">
                                <div class="case-study-popup-section-title">Background</div>
                                <div class="case-study-popup-section-text">
                                    <p>DPRD Kabupaten Bandung Barat is aware that they're one of the causes of traffic jams on the provincial road right outside their office; they just haven't found the right solution yet.</p>
                                    <p>There's no proper way for guests to check availability before visiting. The only channel is WhatsApp, and there's no clear confirmation system, so guests often show up without really knowing if anyone's free to meet them.</p>
                                    <p>It gets worse because visits are rarely just one person in one car. Many guests arrive in groups, using multiple cars or even Elf minibuses. When they arrive and find the meeting isn't confirmed or the person isn't available, they're stuck. Add limited parking into the mix, and cars end up queuing on the street, causing traffic jams.</p>
                                    <p>On the internal side, guest visits are still recorded manually in a physical book, then re-entered into Excel, which also needs to include images. This means double work, more room for mistakes, and Excel files that keep growing in size because of all the embedded images.</p>
                                </div>
                                <img src="${vmsBasePath}/1 - Analyze Documents.webp" alt="Analyze Documents" style="width: 100%; border-radius: 4px;" onclick="event.stopPropagation(); openImagePopup('${vmsBasePath}/1 - Analyze Documents.webp')">
                            </div>

                            <div class="case-study-popup-section" id="cs-role">
                                <div class="case-study-popup-section-title">Role &amp; Responsibility</div>
                                <div class="case-study-popup-section-text">
                                    <p>My role in this project is as a Product Experience Designer responsible for end-to-end UX and UI Designs, collaborating with stakeholders, the product manager, and developers. My deliverable includes:</p>
                                    <ul>
                                        <li>User research</li>
                                        <li>Analyze documents and the current condition</li>
                                        <li>Brainstorm with stakeholders</li>
                                        <li>Create a wireframe and sketches</li>
                                        <li>Create UI Design and iterate</li>
                                        <li>Prototyping and presentation</li>
                                    </ul>
                                    <p>I designed this end-to-end as a solo designer, refining the work together with the PM. The PM gave me full ownership over the creative direction and flow, so there wasn't friction in that collaboration.</p>
                                    <p>Since the design phase only had a month, we skipped in-depth usability testing and instead presented directly to the client, who also happened to be a user in this case. During the presentation, they tried the design on mobile and gave feedback on the spot.</p>
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-findings">
                                <div class="case-study-popup-section-title">Findings</div>
                                <div class="case-study-popup-section-text">
                                    <p>We ran an FGD with 4-6 people, including PR staff, council assistants, and front office staff, to understand the current condition: pain points, who's involved and what they do, peak hour conditions, and the pre- and post-visit process.</p>
                                    <p>During the session, they also shared existing documents they used for the future system, including the guest book template, guest presence template, and council member visitation notice, which gave us a clearer picture of what data and steps were already in place.</p>
                                    <p>Here's what we found from the FGD and further research:</p>
                                    <ul>
                                        <li>Manual process from WhatsApp to guest book to Excel sheet</li>
                                        <li>Lack of transparency in DPRD Kab. Bandung Barat's meeting availability</li>
                                        <li>Complicated to organize data</li>
                                    </ul>
                                </div>
                                <div class="case-study-popup-image-grid">
                                    <img src="${vmsBasePath}/2 - Flow Map - Admin.webp" alt="Flow Map - Admin" onclick="event.stopPropagation(); openImagePopup('${vmsBasePath}/2 - Flow Map - Admin.webp')">
                                    <img src="${vmsBasePath}/2 - Flow Map - Book.webp" alt="Flow Map - Book" onclick="event.stopPropagation(); openImagePopup('${vmsBasePath}/2 - Flow Map - Book.webp')">
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-design">
                                <div class="case-study-popup-section-title">Design Decisions</div>
                                <div class="case-study-popup-section-text">
                                    <p><strong>Show availability in the front office</strong></p>
                                    <p>To accommodate guests who visit without booking a meeting on the website, we show today's availability in the front office. This way, they could see what time they could book a meeting and get help from staff who would guide them on booking on the website.</p>
                                    <p><strong>Online meeting booking</strong></p>
                                    <p>To make things easier for the staff who need to sync meeting records and guests who need to show availability, we create a platform on the website that has 1 gate to sync everything.</p>
                                    <p><strong>Dashboard Analytics</strong></p>
                                    <p>In this dashboard, we create some simple analytics to show who frequently visits, how many visitors in some period of time, also dashboard as storage for meeting documentation.</p>
                                </div>
                                <div class="case-study-popup-image-grid">
                                    <img src="${vmsBasePath}/3 - Moodboards.webp" alt="Moodboards" onclick="event.stopPropagation(); openImagePopup('${vmsBasePath}/3 - Moodboards.webp')">
                                    <img src="${vmsBasePath}/4 - Wireframe.webp" alt="Wireframe" onclick="event.stopPropagation(); openImagePopup('${vmsBasePath}/4 - Wireframe.webp')">
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-outcome">
                                <div class="case-study-popup-section-title">Outcome</div>
                                <div class="case-study-popup-section-text">
                                    <p>While we don't have exact figures yet, the shift from manual to digital changed the visitor flow for both guests and staff. Guests now get scheduling, confirmation, and updates directly through the system, with WhatsApp left only for casual questions.</p>
                                    <p>Staff no longer juggle WhatsApp, guest books, and Excel. Every visit is recorded automatically, searchable with full history and supporting documents, and dashboard analytics now show visitor patterns that used to be invisible in scattered spreadsheets.</p>
                                    <p>Traffic wasn't the primary target, but with guests now visiting based on confirmed availability instead of guesswork, fewer end up turned away or re-routing back to Bandung.</p>
                                </div>
                                <div class="case-study-popup-image-grid">
                                    <img src="${vmsBasePath}/5 - UI Booking.webp" alt="UI Booking" onclick="event.stopPropagation(); openImagePopup('${vmsBasePath}/5 - UI Booking.webp')">
                                    <img src="${vmsBasePath}/5 - UI Dashboard.webp" alt="UI Dashboard" onclick="event.stopPropagation(); openImagePopup('${vmsBasePath}/5 - UI Dashboard.webp')">
                                    <img src="${vmsBasePath}/5 - UI Schedule.webp" alt="UI Schedule" onclick="event.stopPropagation(); openImagePopup('${vmsBasePath}/5 - UI Schedule.webp')">
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-skills">
                                <div class="case-study-popup-section-title">Skills &amp; Tools</div>
                                <div class="case-study-popup-skills">
                                    <span class="case-study-popup-skill">Product Discovery</span>
                                    <span class="case-study-popup-skill">UX Research</span>
                                    <span class="case-study-popup-skill">Forum Group Discussion</span>
                                    <span class="case-study-popup-skill">Flowmap</span>
                                    <span class="case-study-popup-skill">Wireframe</span>
                                    <span class="case-study-popup-skill">UX Writing</span>
                                    <span class="case-study-popup-skill">UI Design</span>
                                    <span class="case-study-popup-skill">Prototype</span>
                                    <span class="case-study-popup-skill">Presentation</span>
                                    <span class="case-study-popup-skill">Collaboration</span>
                                </div>
                            </div>`;
            } else if (project === 'C-Infra KAI Commuter') {
                const kaiBasePath = "Asset/Home/Featured Work/FW - 2";
                projectLinkHtml = `<span>${project}</span>`;
                heroImageSrc = kaiBasePath + "/5 - UI.webp";
                sectionsHtml = `
                            <div class="case-study-popup-section" id="cs-bg">
                                <div class="case-study-popup-section-title">Background</div>
                                <div class="case-study-popup-section-text">
                                    <p>Some people have the privilege to use their own car or bike, some uses ride hailing, and for some, like 800,000 (conducted on 2023) people uses public transportation like Commuter Line. They don't have any other means to commute other than commuter line and buses.</p>
                                    <p>This is their most effective and efficient mode of transportation that the government facilitate. And this also means that lots of usage will come with certain risk of degrading, thus increasing risk of facility damage.</p>
                                    <p>KAI Commuter Operator's conduct a daily patrol to check their facilities, using traditional paper method to report and assigning letters.</p>
                                </div>
                                <div class="case-study-popup-image-grid">
                                    <img src="${kaiBasePath}/1 - Business Process.webp" alt="Business Process" onclick="event.stopPropagation(); openImagePopup('${kaiBasePath}/1 - Business Process.webp')">
                                    <img src="${kaiBasePath}/1 - Documents.webp" alt="Documents" onclick="event.stopPropagation(); openImagePopup('${kaiBasePath}/1 - Documents.webp')">
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-role">
                                <div class="case-study-popup-section-title">Role &amp; Responsibility</div>
                                <div class="case-study-popup-section-text">
                                    <p>My role in this project is as a User Experience Designer responsible for research, analysis, and direction, collaborating with stakeholders, the product manager, and developers. My deliverable includes:</p>
                                    <ul>
                                        <li>User research</li>
                                        <li>Analyze documents and the current condition</li>
                                        <li>Brainstorm with stakeholders</li>
                                        <li>Defining information architecture</li>
                                        <li>Create user flow per features</li>
                                        <li>Create a wireframe and sketches</li>
                                        <li>Supporting UI Styles and direction</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-findings">
                                <div class="case-study-popup-section-title">Findings</div>
                                <div class="case-study-popup-section-text">
                                    <p>I was the PIC (person in charge) for the design side of this project, which meant I was responsible for both the UX and UI output, even though my own hands-on work was UX-focused.</p>
                                    <ul>
                                        <li>Supervised the design team: myself on UX, plus 2 UI designers (1 full-time, 1 intern)</li>
                                        <li>Led research and requirement gathering, including analyzing existing documents and business flows from the client</li>
                                        <li>Mapped the end-to-end business process into flowmaps before any screen design started</li>
                                        <li>Built wireframes and wireframe flows to define structure and logic ahead of visual design</li>
                                        <li>Reviewed and directed the UI team's output to make sure it stayed aligned with the flows and client's existing design system</li>
                                    </ul>
                                </div>
                                <div class="case-study-popup-image-grid">
                                    <img src="${kaiBasePath}/2 - Flow 1.webp" alt="Flow 1" onclick="event.stopPropagation(); openImagePopup('${kaiBasePath}/2 - Flow 1.webp')">
                                    <img src="${kaiBasePath}/2 - Flow 2.webp" alt="Flow 2" onclick="event.stopPropagation(); openImagePopup('${kaiBasePath}/2 - Flow 2.webp')">
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-design">
                                <div class="case-study-popup-section-title">Design Decisions</div>
                                <div class="case-study-popup-section-text">
                                    <p>Since the findings pointed straight at visibility, most of the core decisions were built around making status impossible to miss.</p>
                                    <ul>
                                        <li>Designed a clear status lifecycle for every report (new, in progress, resolved), so anyone checking a report knows exactly where it stands</li>
                                        <li>Built the report flow around severity level and damage category first, so reports get routed and prioritized correctly from the start</li>
                                        <li>Assigned reports directly to station staff within the flow, removing the manual handoff step that caused reports to stall</li>
                                        <li>Kept the wireframes flow-first: every screen was validated against the flowmap before any UI polish happened, to make sure the logic held up before it looked good</li>
                                        <li>Worked within KCI's existing design system rather than introducing a new one, so the UI team's job was refinement and consistency, not invention</li>
                                    </ul>
                                    <p>A lot of the harder design work here happened before any screens existed, it was in getting the business flow and status logic right. Once that was solid, the UI layer was comparatively straightforward because the design system was already there.</p>
                                </div>
                                <div class="case-study-popup-image-grid">
                                    <img src="${kaiBasePath}/3 - Moodboard.webp" alt="Moodboard" onclick="event.stopPropagation(); openImagePopup('${kaiBasePath}/3 - Moodboard.webp')">
                                    <img src="${kaiBasePath}/4 - Wireframes.webp" alt="Wireframes" onclick="event.stopPropagation(); openImagePopup('${kaiBasePath}/4 - Wireframes.webp')">
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-outcome">
                                <div class="case-study-popup-section-title">Outcome</div>
                                <div class="case-study-popup-section-text">
                                    <p>This project wrapped in the 1-3 month range. The outcome so far is mostly qualitative rather than a set of hard numbers.</p>
                                    <ul>
                                        <li>Client and station staff feedback pointed to the new visibility into report status as the clearest win, addressing the exact gap research surfaced</li>
                                        <li>The flow-first approach meant fewer structural revisions later in the project, since logic issues were caught at the wireframe stage</li>
                                        <li>Being able to lean on KCI's existing design system kept the UI team's output consistent and sped up the polish phase</li>
                                    </ul>
                                    <p>I'll be upfront that I don't have adoption numbers or time-saved metrics for this one, that data wasn't tracked or shared back to the design team.</p>
                                </div>
                            </div>

                            <div class="case-study-popup-section" id="cs-skills">
                                <div class="case-study-popup-section-title">Skills &amp; Tools</div>
                                <div class="case-study-popup-skills">
                                    <span class="case-study-popup-skill">Product Discovery</span>
                                    <span class="case-study-popup-skill">Analyst</span>
                                    <span class="case-study-popup-skill">UX Research</span>
                                    <span class="case-study-popup-skill">Forum Group Discussion</span>
                                    <span class="case-study-popup-skill">Flowmap</span>
                                    <span class="case-study-popup-skill">Wireframe</span>
                                    <span class="case-study-popup-skill">Wireflow</span>
                                    <span class="case-study-popup-skill">UX Writing</span>
                                    <span class="case-study-popup-skill">UI Styling</span>
                                    <span class="case-study-popup-skill">Prototype</span>
                                    <span class="case-study-popup-skill">Presentation</span>
                                    <span class="case-study-popup-skill">Collaboration</span>
                                    <span class="case-study-popup-skill">Figma</span>
                                </div>
                            </div>`;
            }

            popup.innerHTML = `
                <div class="case-study-popup-card-full" onclick="event.stopPropagation()">
                                    <button class="case-study-popup-close" onclick="closeCaseStudyPopup()">✕</button>
                                    <div class="case-study-popup-scroll-area">
                                        <div class="case-study-popup-meta-wrap">
                                            <div class="case-study-popup-meta">
                                                <div class="case-study-popup-meta-tags">${tagsHtml}</div>
                                                <div class="case-study-popup-meta-name">${projectLinkHtml} ${arrowSvg}</div>
                                            </div>
                                        </div>
                                        <img class="case-study-popup-hero-image" src="${heroImageSrc}" alt="${project}" onclick="event.stopPropagation(); openImagePopup('${heroImageSrc}')">
                                        <div class="case-study-popup-body-full">
                                            <nav class="case-study-popup-nav">
                                                <a href="#cs-bg" class="active" onclick="event.preventDefault(); activateCaseStudyNav(this)">Background</a>
                                                <a href="#cs-role" onclick="event.preventDefault(); activateCaseStudyNav(this)">Role &amp; Responsibility</a>
                                                <a href="#cs-findings" onclick="event.preventDefault(); activateCaseStudyNav(this)">Findings</a>
                                                <a href="#cs-design" onclick="event.preventDefault(); activateCaseStudyNav(this)">Design Decisions</a>
                                                <a href="#cs-outcome" onclick="event.preventDefault(); activateCaseStudyNav(this)">Outcome</a>
                                                <a href="#cs-skills" onclick="event.preventDefault(); activateCaseStudyNav(this)">Skills &amp; Tools</a>
                                            </nav>
                                            <div class="case-study-popup-content-full">
                            ${sectionsHtml}
                        </div>
                    </div>
                </div>
            </div>
            `;

            requestAnimationFrame(() => {
                popup.classList.add('active');
            });
            document.body.style.overflow = 'hidden';

            popup.addEventListener('click', function(e) {
                if (e.target === popup) closeCaseStudyPopup();
            });

            // Scroll spy for sidebar nav
            const scrollArea = popup.querySelector('.case-study-popup-scroll-area');
            const navLinks = popup.querySelectorAll('.case-study-popup-nav a');
            const sections = popup.querySelectorAll('.case-study-popup-section');

            if (scrollArea && sections.length && navLinks.length) {
                scrollArea.addEventListener('scroll', function() {
                    const scrollPos = scrollArea.scrollTop + 80;
                    let currentIdx = 0;
                    sections.forEach((section, idx) => {
                        const sectionTop = section.getBoundingClientRect().top - scrollArea.getBoundingClientRect().top;
                        if (sectionTop <= 80) {
                            currentIdx = idx;
                        }
                    });
                    navLinks.forEach(l => l.classList.remove('active'));
                    if (navLinks[currentIdx]) navLinks[currentIdx].classList.add('active');
                });
            }
        }

        function activateCaseStudyNav(link) {
            const popup = document.getElementById('case-study-popup');
            if (!popup) return;
            const scrollArea = popup.querySelector('.case-study-popup-scroll-area');
            const target = popup.querySelector(link.getAttribute('href'));
            if (scrollArea && target) {
                const top = target.getBoundingClientRect().top - scrollArea.getBoundingClientRect().top + scrollArea.scrollTop - 20;
                scrollArea.scrollTo({ top: top, behavior: 'smooth' });
            }
            popup.querySelectorAll('.case-study-popup-nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }

        function closeCaseStudyPopup() {
            const popup = document.getElementById('case-study-popup');
            if (popup) {
                popup.classList.remove('active');
                setTimeout(() => {
                    popup.classList.remove('case-study-popup--full');
                    document.body.style.overflow = '';
                }, 400);
            }
        }

        // ===== YEAR NAV ACTIVE STATE =====
        const yearSections = document.querySelectorAll('.recent-work-year-section');
        const yearLinks = document.querySelectorAll('.recent-work-years a');
        if (yearSections.length && yearLinks.length) {
            const yearObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        yearLinks.forEach(link => {
                            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                        });
                    }
                });
            }, { threshold: 0.3 });
            yearSections.forEach(section => yearObserver.observe(section));
        }

        // ===== SMOOTH SCROLL =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    navPill.classList.remove('open');
                }
            });
        });
