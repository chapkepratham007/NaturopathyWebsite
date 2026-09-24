/**
 * Manohar Vasudha Foundation - Naturopathy & Yoga Course
 * Main JavaScript File with Scroll Animations & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. AUTOMATED SCROLL REVEAL ANIMATIONS
       ========================================== */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom').forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================
       2. DUAL LANGUAGE TOGGLE (ENGLISH / MARATHI)
       ========================================== */
    let currentLang = 'en';
    const langToggleBtn = document.getElementById('langToggleBtn');
    const currentLangLabel = document.getElementById('currentLangLabel');

    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'mr' : 'en';
        
        if (currentLangLabel) {
            currentLangLabel.textContent = currentLang === 'mr' ? 'View in English' : 'मराठी में देखें';
        }

        const translatableElements = document.querySelectorAll('[data-en][data-mr]');
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', toggleLanguage);
    }

    /* ==========================================
       3. MOBILE MENU TOGGLE
       ========================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    /* ==========================================
       4. HERO POSTER SWITCHER (ENG / MARATHI)
       ========================================== */
    const heroPosterImg = document.getElementById('heroPosterImg');
    const showEngPosterBtn = document.getElementById('showEngPosterBtn');
    const showMarPosterBtn = document.getElementById('showMarPosterBtn');
    const zoomPosterBtn = document.getElementById('zoomPosterBtn');

    if (heroPosterImg && showEngPosterBtn && showMarPosterBtn) {
        showEngPosterBtn.addEventListener('click', () => {
            heroPosterImg.src = 'assets/images/poster_english.jpg';
            showEngPosterBtn.className = 'px-3 py-1 bg-brand-700 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-brand-800 transition';
            showMarPosterBtn.className = 'px-3 py-1 bg-slate-200 text-slate-800 rounded-lg text-xs font-bold hover:bg-slate-300 transition';
        });

        showMarPosterBtn.addEventListener('click', () => {
            heroPosterImg.src = 'assets/images/poster_marathi.jpg';
            showMarPosterBtn.className = 'px-3 py-1 bg-brand-700 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-brand-800 transition';
            showEngPosterBtn.className = 'px-3 py-1 bg-slate-200 text-slate-800 rounded-lg text-xs font-bold hover:bg-slate-300 transition';
        });

        if (zoomPosterBtn) {
            zoomPosterBtn.addEventListener('click', () => {
                openPosterModal(heroPosterImg.src);
            });
        }
    }

    /* ==========================================
       5. INTERACTIVE ACUPRESSURE POINT EXPLORER
       ========================================== */
    const acuPointData = {
        li4: {
            code: "LI-4 (Large Intestine 4)",
            title: "Hoku Point (Union Valley)",
            icon: "fa-hand",
            location: "Located on the webbing between the thumb and index finger on the back of the hand.",
            benefits: "Provides instant relief from severe headaches, sinus congestion, toothaches, neck stiffness, stress, and boosts overall immunity.",
            method: "Apply steady, firm pressure with your opposite thumb for 1-2 minutes while breathing slowly. Repeat on both hands.",
            tip: "This is the 'King Point' for pain management in Naturopathy. In our 1-year course, students learn exact point positioning and pressure duration for instant patient relief."
        },
        pc6: {
            code: "PC-6 (Pericardium 6)",
            title: "Neiguan Point (Inner Gate)",
            icon: "fa-hand-back-fist",
            location: "Located three finger-breadths below the wrist crease on the inner forearm between the two tendons.",
            benefits: "Relieves nausea, motion sickness, acid reflux, heart palpitations, insomnia, and calms emotional anxiety.",
            method: "Press firmly with thumb using circular motions for 1 to 3 minutes while relaxing your shoulders.",
            tip: "An essential point for cardiac health and anxiety. Ayurvedic doctors use this point to regulate autonomic nervous system responses."
        },
        gv20: {
            code: "GV-20 (Governing Vessel 20)",
            title: "Baihui Point (Hundred Convergences)",
            icon: "fa-brain",
            location: "Located at the exact crown top of the head, inline with the tips of your ears.",
            benefits: "Enhances mental concentration, alleviates depression, regulates high blood pressure, and improves memory power.",
            method: "Gently tap or apply light downward pressure with your fingertips for 2 minutes while meditating.",
            tip: "Used extensively in Yoga Therapy and Meditation to activate the Crown Chakra (Sahasrara) and balance mental energies."
        },
        st36: {
            code: "ST-36 (Stomach 36)",
            title: "Zusanli Point (Leg Three Miles)",
            icon: "fa-person-walking",
            location: "Located four finger widths below the kneecap, one finger width outside the shinbone.",
            benefits: "Strengthens digestive power (Agni), reduces fatigue, aids IBS & constipation, and promotes overall longevity.",
            method: "Massage firmly with knuckles in a downward motion for 2 to 3 minutes every morning.",
            tip: "In traditional Eastern medicine, pressing ST-36 daily is believed to give enough stamina to walk 3 extra miles even when exhausted!"
        },
        k1: {
            code: "K-1 (Kidney 1)",
            title: "Yongquan Point (Gushing Spring)",
            icon: "fa-socks",
            location: "Located on the sole of the foot, in the depression formed when the foot is flexed.",
            benefits: "Grounds excess body heat, treats insomnia, reduces hot flashes, lowers high blood pressure, and revives energy.",
            method: "Press deeply with thumb or roll a wooden foot roller over the point for 3 minutes before sleeping.",
            tip: "Foot reflexology point taught in our Naturopathy practicals to restore kidney vitality and balance body temperature."
        }
    };

    const acuBtns = document.querySelectorAll('.acu-btn');
    const acuCode = document.getElementById('acuCode');
    const acuTitle = document.getElementById('acuTitle');
    const acuIcon = document.getElementById('acuIcon');
    const acuLocation = document.getElementById('acuLocation');
    const acuBenefits = document.getElementById('acuBenefits');
    const acuMethod = document.getElementById('acuMethod');
    const acuDoctorTip = document.getElementById('acuDoctorTip');

    acuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            acuBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const pointKey = btn.getAttribute('data-point');
            const data = acuPointData[pointKey];

            if (data && acuTitle) {
                acuCode.textContent = data.code;
                acuTitle.textContent = data.title;
                acuIcon.className = `fa-solid ${data.icon}`;
                acuLocation.textContent = data.location;
                acuBenefits.textContent = data.benefits;
                acuMethod.textContent = data.method;
                acuDoctorTip.textContent = `"${data.tip}"`;
            }
        });
    });

    /* ==========================================
       6. VIDEO MODAL PLAYER
       ========================================== */
    const videoModal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('videoIframe');
    const openVideoBtns = document.querySelectorAll('.open-video-btn');
    const closeVideoBtn = document.getElementById('closeVideoBtn');

    openVideoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoUrl = btn.getAttribute('data-video');
            if (videoIframe && videoModal) {
                videoIframe.src = videoUrl + "?autoplay=1";
                videoModal.classList.remove('hidden');
            }
        });
    });

    if (closeVideoBtn && videoModal) {
        closeVideoBtn.addEventListener('click', () => {
            videoIframe.src = "";
            videoModal.classList.add('hidden');
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoIframe.src = "";
                videoModal.classList.add('hidden');
            }
        });
    }

    /* ==========================================
       7. POSTER ZOOM MODAL
       ========================================== */
    const posterModal = document.getElementById('posterModal');
    const modalPosterImg = document.getElementById('modalPosterImg');
    const posterTriggers = document.querySelectorAll('.poster-modal-trigger');
    const closePosterBtn = document.getElementById('closePosterBtn');

    function openPosterModal(src) {
        if (modalPosterImg && posterModal) {
            modalPosterImg.src = src;
            posterModal.classList.remove('hidden');
        }
    }

    posterTriggers.forEach(trig => {
        trig.addEventListener('click', () => {
            const imgSrc = trig.getAttribute('data-img');
            openPosterModal(imgSrc);
        });
    });

    if (closePosterBtn && posterModal) {
        closePosterBtn.addEventListener('click', () => {
            posterModal.classList.add('hidden');
        });

        posterModal.addEventListener('click', (e) => {
            if (e.target === posterModal) {
                posterModal.classList.add('hidden');
            }
        });
    }

    /* ==========================================
       8. HEALTH BLOG ARTICLE READER MODAL
       ========================================== */
    const blogArticles = {
        1: {
            title: "5 Daily Acupressure Points Every Person Should Know",
            content: `
                <div class="space-y-4">
                    <p class="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Guide by Manohar Vasudha Foundation Doctor</p>
                    <h2 class="text-2xl font-bold text-slate-900">5 Daily Acupressure Points Every Person Should Know</h2>
                    <p>In our modern fast-paced lifestyle, chronic headaches, digestive sluggishness, and cervical spine stress have become alarmingly common. As an Ayurvedic physician with years of clinical practice, I always emphasize that the human body possesses an intricate self-healing mechanism through energy pathways (Nadis).</p>
                    <h4 class="font-bold text-slate-900 text-base">1. LI-4 (Hoku Point) for Instant Pain Relief</h4>
                    <p>Located between the thumb and index finger, pressing this point for 2 minutes stimulates endorphin release.</p>
                    <h4 class="font-bold text-slate-900 text-base">2. PC-6 (Neiguan) for Heart & Nausea</h4>
                    <p>Found 3 finger widths above the wrist crease, this point regulates cardiac rhythm and calms panic attacks.</p>
                </div>
            `
        },
        2: {
            title: "Panchmahabhuta: Healing Body with 5 Elements of Nature",
            content: `
                <div class="space-y-4">
                    <p class="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Naturopathy Science Series</p>
                    <h2 class="text-2xl font-bold text-slate-900">Panchmahabhuta: Healing Body with 5 Elements of Nature</h2>
                    <p>Naturopathy operates on the fundamental law that the human body is composed of Five Great Elements: Earth, Water, Sun, Air, and Space.</p>
                </div>
            `
        },
        3: {
            title: "Why Naturopathy & Yoga is the Fast-Growing Career in 2026",
            content: `
                <div class="space-y-4">
                    <p class="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Career Guidance</p>
                    <h2 class="text-2xl font-bold text-slate-900">Why Naturopathy & Yoga is the Fast-Growing Career in 2026</h2>
                    <p>With global healthcare shifting focus towards drugless therapies, certified Naturopathic Therapists are in unprecedented demand.</p>
                </div>
            `
        }
    };

    const blogModal = document.getElementById('blogModal');
    const blogContent = document.getElementById('blogContent');
    const readBlogBtns = document.querySelectorAll('.read-blog-btn');
    const closeBlogBtn = document.getElementById('closeBlogBtn');

    readBlogBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const blogId = btn.getAttribute('data-blog');
            const article = blogArticles[blogId];
            if (article && blogContent && blogModal) {
                blogContent.innerHTML = article.content;
                blogModal.classList.remove('hidden');
            }
        });
    });

    if (closeBlogBtn && blogModal) {
        closeBlogBtn.addEventListener('click', () => {
            blogModal.classList.add('hidden');
        });

        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) {
                blogModal.classList.add('hidden');
            }
        });
    }

    /* ==========================================
       9. ADMISSION FORM VALIDATION & RECEIPT
       ========================================== */
    const admissionForm = document.getElementById('admissionForm');
    const formErrorSummary = document.getElementById('formErrorSummary');
    const errorList = document.getElementById('errorList');
    const receiptModal = document.getElementById('receiptModal');
    const closeReceiptBtn = document.getElementById('closeReceiptBtn');

    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            document.querySelectorAll('.error-msg').forEach(el => el.classList.add('hidden'));
            if (formErrorSummary) formErrorSummary.classList.add('hidden');
            if (errorList) errorList.innerHTML = '';

            let isValid = true;
            const errors = [];

            const fullName = document.getElementById('fullName').value.trim();
            if (!fullName) {
                showError('fullName', 'Please enter your full name.');
                errors.push('Full Name is required');
                isValid = false;
            }

            const phone = document.getElementById('phone').value.trim();
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phone || !phoneRegex.test(phone)) {
                showError('phone', 'Enter a valid 10-digit mobile number.');
                errors.push('Valid 10-digit Mobile Number is required');
                isValid = false;
            }

            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                showError('email', 'Please enter a valid email address.');
                errors.push('Valid Email Address is required');
                isValid = false;
            }

            const dob = document.getElementById('dob').value;
            if (!dob) {
                showError('dob', 'Please select your Date of Birth.');
                errors.push('Date of Birth is required');
                isValid = false;
            }

            const qualification = document.getElementById('qualification').value;
            if (!qualification) {
                showError('qualification', 'Please select your qualification.');
                errors.push('Qualification is required');
                isValid = false;
            } else if (qualification === 'below_10th') {
                showError('qualification', 'Minimum entry requirement is S.S.C (10th) Pass.');
                errors.push('Mandatory Requirement: Must be S.S.C (10th) Passed.');
                isValid = false;
            }

            const sscPassedCheck = document.getElementById('sscPassedCheck').checked;
            if (!sscPassedCheck) {
                showError('sscPassedCheck', 'You must confirm S.S.C (10th) pass status.');
                errors.push('Confirmation of S.S.C Pass status is required.');
                isValid = false;
            }

            const batchPref = document.getElementById('batchPref').value;
            if (!batchPref) {
                showError('batchPref', 'Please select a preferred batch time.');
                errors.push('Batch timing selection is required.');
                isValid = false;
            }

            const city = document.getElementById('city').value.trim();
            if (!city) {
                showError('city', 'Please enter your city.');
                errors.push('City is required.');
                isValid = false;
            }

            const address = document.getElementById('address').value.trim();
            if (!address) {
                showError('address', 'Please enter your residential address.');
                errors.push('Address is required.');
                isValid = false;
            }

            if (!isValid) {
                if (formErrorSummary && errorList) {
                    errors.forEach(err => {
                        const li = document.createElement('li');
                        li.textContent = err;
                        errorList.appendChild(li);
                    });
                    formErrorSummary.classList.remove('hidden');
                    formErrorSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            const randomId = 'MVF-2026-' + Math.floor(1000 + Math.random() * 9000);
            const qualTextMap = {
                ssc: "S.S.C (10th Standard) Passed",
                hsc: "H.S.C (12th Standard) Passed",
                graduate: "Graduate Degree Holder",
                postgraduate: "Post Graduate / Diploma"
            };

            document.getElementById('recAppId').textContent = randomId;
            document.getElementById('recName').textContent = fullName;
            document.getElementById('recPhone').textContent = phone;
            document.getElementById('recEmail').textContent = email;
            document.getElementById('recQual').textContent = qualTextMap[qualification] || qualification;
            document.getElementById('recBatch').textContent = batchPref;

            const recWhatsappBtn = document.getElementById('recWhatsappBtn');
            if (recWhatsappBtn) {
                const waText = encodeURIComponent(`Hello Yogesh Mahangade Sir, I submitted my Admission Form!\nApplication ID: ${randomId}\nName: ${fullName}\nPhone: ${phone}\nQualification: ${qualTextMap[qualification]}\nBatch: ${batchPref}`);
                recWhatsappBtn.href = `https://wa.me/919987941559?text=${waText}`;
            }

            if (receiptModal) {
                receiptModal.classList.remove('hidden');
            }

            admissionForm.reset();
        });
    }

    function showError(fieldId, message) {
        const errEl = document.getElementById(`err-${fieldId}`);
        if (errEl) {
            errEl.textContent = message;
            errEl.classList.remove('hidden');
        }
    }

    if (closeReceiptBtn && receiptModal) {
        closeReceiptBtn.addEventListener('click', () => {
            receiptModal.classList.add('hidden');
        });
    }
});
