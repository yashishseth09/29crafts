document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // stop observing once revealed
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Interactive Spirit Curator
    const spiritData = {
        gin: {
            title: "Sculpting the Modern Gin Icon",
            subtitle: "Botanical Curation & Vapor Distillation",
            copy: "From selecting rare Himalayan juniper to designing custom copper stills that lock in delicate citrus oils, we design gins with rich mouthfeel and high mixology utility. We balance tradition with progressive botanical profiles.",
            specs: [
                { label: "Liquid Architecture", val: "Crisp pine, vapor-infused cardamom, soft lavender finishes." },
                { label: "The Vessel", val: "Heavy flint bottle, fluted sides, gold foil botanical decals." }
            ]
        },
        whisky: {
            title: "Engineering the Heritage Malt",
            subtitle: "Wood Science & Barrel Selection",
            copy: "Aged whisky is a marriage of distillate and wood. We consult on cask wood selection, char levels, finishing barrels (Oloroso Sherry, Port, Bourbon), and maturation climates to sculpt whiskies with rich natural color, complex tannin structures, and lineage.",
            specs: [
                { label: "Liquid Architecture", val: "Burnt caramel, peat smoke, dried plum, spiced oak finish." },
                { label: "The Vessel", val: "Short squat heavy-bottom decanter, wax-dipped cork, oak leaf neck label." }
            ]
        },
        nonalc: {
            title: "Designing Zero-Proof Elixirs",
            subtitle: "Molecular Distillation & Functional Herbs",
            copy: "Modern consumers demand premium options without the alcohol. We formulate functional, complex distillates that leverage adaptogens, cold-press botanicals, and delicate organic acids to replicate the throat burn and complexity of traditional spirits.",
            specs: [
                { label: "Liquid Architecture", val: "Ginger bite, bitter orange citrus, ashwagandha earthy undertones." },
                { label: "The Vessel", val: "Minimalist apothecary bottle, amber-toned glass, raw linen texture label." }
            ]
        }
    };

    const curatorMenu = document.getElementById('curatorMenu');
    const curatorScreen = document.getElementById('curatorScreen');
    const curatorContent = document.getElementById('curatorContent');

    if (curatorMenu && curatorContent) {
        const tabs = curatorMenu.querySelectorAll('.curator-tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetSpirit = tab.getAttribute('data-spirit');
                
                // If clicked tab is already active, do nothing
                if (tab.classList.contains('active')) return;
                
                // Deactivate current tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Activate clicked tab
                tab.classList.add('active');
                
                // Animate display screen out
                curatorContent.classList.add('fade-out');
                
                // Inject new content after fade-out transition completes
                setTimeout(() => {
                    const data = spiritData[targetSpirit];
                    
                    let specsHTML = '';
                    data.specs.forEach(spec => {
                        specsHTML += `
                            <div class="spec-item">
                                <span>${spec.label}</span>
                                ${spec.val}
                            </div>
                        `;
                    });

                    curatorContent.innerHTML = `
                        <h3>${data.title}</h3>
                        <p class="display-subtitle">${data.subtitle}</p>
                        <div class="curator-grid">
                            <div class="curator-copy text-muted">
                                <p>${data.copy}</p>
                            </div>
                            <div class="curator-specs">
                                ${specsHTML}
                            </div>
                        </div>
                    `;
                    
                    // Animate display screen back in
                    curatorContent.classList.remove('fade-out');
                }, 300);
            });
        });
    }

    // 5. Conversational Form Submission
    const parlourForm = document.getElementById('parlourForm');
    const statusMessage = document.getElementById('statusMessage');

    if (parlourForm && statusMessage) {
        parlourForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const clientIdentity = document.getElementById('clientIdentity').value;
            const projectCategory = document.getElementById('projectCategory').value;
            const targetMarket = document.getElementById('targetMarket').value;
            const clientEmail = document.getElementById('clientEmail').value;

            // Button loading visual
            const btn = parlourForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Initiating Consultation...';
            btn.disabled = true;

            // Mock submission delay
            setTimeout(() => {
                statusMessage.className = 'status-box success';
                statusMessage.textContent = `Thank you! Your request to curate a premium ${projectCategory} brand has been logged. We will contact you at ${clientEmail} within 24 hours to coordinate a private tasting and alignment.`;
                
                // Reset form
                parlourForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;

                // Scroll the success message into view if offscreen
                statusMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Hide success message after 7 seconds
                setTimeout(() => {
                    statusMessage.style.display = 'none';
                }, 7000);
            }, 1200);
        });
    }

    // 6. Active link highlight during scroll & Smooth scrolling offsets
    const navLinksList = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Subtract offset to trigger active class slightly before reaching the section
            if (window.scrollY >= sectionTop - 120) {
                currentSectionId = section.getAttribute('id') || '';
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active-link');
            const href = link.getAttribute('href');
            if (href === '#' && currentSectionId === '') {
                link.classList.add('active-link');
            } else if (href === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    });

    // Handle smooth scrolling custom offsets for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.classList.contains('scrolled') ? 65 : 85;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
