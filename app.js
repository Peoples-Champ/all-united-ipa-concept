(() => {
  const { physicians, healthPlans, regions, leaders } = window.ALL_UNITED_DATA;
  const main = document.getElementById("main-content");
  const nav = document.getElementById("primary-nav");
  const menuToggle = document.getElementById("menu-toggle");
  const toast = document.getElementById("toast");

  const icon = (name) => {
    const icons = {
      search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>',
      member: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle></svg>',
      provider: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-3.8 7-10V5l-7-3-7 3v6c0 6.2 7 10 7 10Z"></path><path d="M9 12h6M12 9v6"></path></svg>',
      contact: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"></path></svg>',
      heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"></path></svg>',
      location: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>',
      people: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"></path></svg>',
      link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"></path><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"></path></svg>',
      document: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6M8 13h8M8 17h6"></path></svg>',
      arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>',
      check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>',
      phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z"></path></svg>'
    };
    return icons[name] || icons.arrow;
  };

  const buttonLink = (label, href, variant = "") =>
    `<a class="button ${variant}" href="${href}">${label}${variant.includes("text") ? icon("arrow") : ""}</a>`;

  const pageHero = (eyebrow, title, copy, extra = "") => `
    <section class="page-hero">
      <div class="orb orb-a"></div><div class="orb orb-b"></div>
      <div class="container page-hero-inner">
        <div class="eyebrow eyebrow-light">${eyebrow}</div>
        <h1>${title}</h1>
        <p>${copy}</p>
        ${extra}
      </div>
    </section>`;

  const doctorCard = (doctor, compact = false) => `
    <article class="doctor-card ${compact ? "doctor-card-compact" : ""}">
      <div class="doctor-image-wrap">
        <img src="${doctor.image}" alt="Demonstration portrait for Dr. ${doctor.firstName}" loading="lazy">
        <span class="demo-badge">Demo profile</span>
        <span class="availability ${doctor.accepting ? "open" : "closed"}">${doctor.accepting ? "Accepting new patients" : "Call for availability"}</span>
      </div>
      <div class="doctor-card-content">
        <div class="doctor-specialty">${doctor.specialty}</div>
        <h3>${doctor.name}</h3>
        <div class="doctor-detail">${icon("location")} ${doctor.city}, ${doctor.state}</div>
        <div class="doctor-detail">${icon("contact")} ${doctor.languages.join(" • ")}</div>
        <div class="doctor-card-footer">
          <span>${doctor.plans.length} sample health plans</span>
          <a href="#/doctor/${doctor.id}">View profile ${icon("arrow")}</a>
        </div>
      </div>
    </article>`;

  const planGrid = (limit) => `
    <div class="plan-grid">
      ${healthPlans.slice(0, limit || healthPlans.length).map(plan => `
        <div class="plan-card" style="--plan-color:${plan.color}">
          <span class="plan-mark">${plan.short.charAt(0)}</span>
          <div><strong>${plan.short}</strong><small>${plan.name}</small></div>
        </div>`).join("")}
    </div>`;

  const resourceCard = (title, copy, iconName, href = "#/contact") => `
    <a class="resource-card" href="${href}">
      <span class="icon-tile">${icon(iconName)}</span>
      <div><h3>${title}</h3><p>${copy}</p></div>
      <span class="circle-arrow">${icon("arrow")}</span>
    </a>`;

  function homePage() {
    return `
      <section class="hero">
        <div class="hero-texture"></div>
        <div class="container hero-grid">
          <div class="hero-copy">
            <div class="eyebrow"><span></span>Physician-led care across Southern California</div>
            <h1>Better care.<br>Stronger connections.<br><em>All United.</em></h1>
            <p>Connecting patients with trusted physicians and coordinated care throughout the communities we call home.</p>
            <div class="hero-actions">
              ${buttonLink("Find a Doctor", "#/directory")}
              ${buttonLink("Member Resources", "#/members", "button-secondary")}
            </div>
            <div class="hero-proof">
              <div class="avatar-stack">
                ${physicians.slice(0,4).map(d => `<img src="${d.image}" alt="" aria-hidden="true">`).join("")}
              </div>
              <div><strong>Care, closer to home.</strong><span>Serving 50+ Southern California communities</span></div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-image">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=90" alt="Physician speaking warmly with a patient">
            </div>
            <div class="floating-card care-card">
              <span class="floating-icon">${icon("heart")}</span>
              <div><small>Our focus</small><strong>Connected, compassionate care</strong></div>
            </div>
            <div class="floating-card region-card">
              <span class="mini-map">${icon("location")}</span>
              <div><strong>Inland Southern California</strong><small>Local physicians. Regional reach.</small></div>
            </div>
            <div class="hero-dots"></div>
          </div>
        </div>
        <div class="hero-wave"></div>
      </section>

      <section class="quick-access section-tight">
        <div class="container">
          <div class="quick-grid">
            ${resourceCard("Find a Doctor", "Search by location, specialty, language, and health plan.", "search", "#/directory")}
            ${resourceCard("Member Resources", "Helpful information to make navigating care feel simpler.", "member", "#/members")}
            ${resourceCard("Provider Resources", "Tools and information for participating physicians.", "provider", "#/providers")}
            ${resourceCard("Contact All United", "Connect with the right member or provider resource.", "contact", "#/contact")}
          </div>
        </div>
      </section>

      <section class="trust-strip">
        <div class="container trust-grid">
          <div><strong>2016</strong><span>Founded</span></div>
          <div><strong>50+</strong><span>Communities served</span></div>
          <div><strong>11</strong><span>Health plan relationships</span></div>
          <div><strong>3</strong><span>Southern California counties</span></div>
        </div>
      </section>

      <section class="section why-section">
        <div class="container">
          <div class="section-heading center-heading">
            <div class="eyebrow">Why All United</div>
            <h2>Connected care starts with<br><span>strong relationships.</span></h2>
            <p>We bring patients, physicians, and health plans together around a shared goal: making quality care easier to find and easier to navigate.</p>
          </div>
          <div class="pillar-grid">
            <article><span class="pillar-number">01</span><div class="pillar-icon">${icon("link")}</div><h3>Connected care</h3><p>Helping physicians, health plans, and patients work together.</p></article>
            <article><span class="pillar-number">02</span><div class="pillar-icon">${icon("provider")}</div><h3>Local physicians</h3><p>Connecting members with doctors throughout their own communities.</p></article>
            <article><span class="pillar-number">03</span><div class="pillar-icon">${icon("heart")}</div><h3>Compassion</h3><p>Supporting a human, patient-centered approach to healthcare.</p></article>
            <article><span class="pillar-number">04</span><div class="pillar-icon">${icon("people")}</div><h3>Community</h3><p>Serving diverse neighborhoods throughout the Inland Empire and beyond.</p></article>
          </div>
        </div>
      </section>

      <section class="section care-section">
        <div class="container">
          <div class="section-heading split-heading">
            <div><div class="eyebrow">Find care</div><h2>Find a doctor who<br><span>fits your needs.</span></h2></div>
            <div><p>Search a growing physician network by the details that matter to you.</p>${buttonLink("Browse all doctors", "#/directory", "button-text")}</div>
          </div>
          <form class="home-search" id="home-search">
            <label><span>Doctor or specialty</span><input id="home-query" type="search" placeholder="Try “Family Medicine”"></label>
            <label><span>Location</span><select id="home-city"><option value="">City or region</option>${[...new Set(physicians.map(d=>d.city))].map(c=>`<option>${c}</option>`).join("")}</select></label>
            <label><span>Language</span><select id="home-language"><option value="">Any language</option>${[...new Set(physicians.flatMap(d=>d.languages))].sort().map(l=>`<option>${l}</option>`).join("")}</select></label>
            <button class="button" type="submit">${icon("search")} Search Doctors</button>
          </form>
          <div class="doctor-grid home-doctors">
            ${physicians.slice(0,3).map(d => doctorCard(d, true)).join("")}
          </div>
          <div class="directory-notice"><strong>Provider Directory Preview</strong> Sample profiles demonstrate future functionality and are not verified All United physicians.</div>
        </div>
      </section>

      <section class="section region-section">
        <div class="container region-grid">
          <div class="region-copy">
            <div class="eyebrow eyebrow-light">Our service area</div>
            <h2>Care across<br>Southern California.</h2>
            <p>All United Medical Group serves communities throughout San Bernardino County, Riverside County, and portions of Los Angeles County.</p>
            ${buttonLink("Explore our communities", "#/about", "button-white")}
          </div>
          <div class="region-map" aria-label="Stylized map of service regions">
            <div class="map-lines"></div>
            <span class="map-pin pin-1"><i></i><b>High Desert</b></span>
            <span class="map-pin pin-2"><i></i><b>San Bernardino</b></span>
            <span class="map-pin pin-3 active"><i></i><b>Riverside</b></span>
            <span class="map-pin pin-4"><i></i><b>Coachella Valley</b></span>
            <span class="map-pin pin-5"><i></i><b>Southwest Riverside</b></span>
            <div class="map-stat"><strong>50+</strong><span>communities across the region</span></div>
          </div>
        </div>
      </section>

      <section class="section plans-section">
        <div class="container">
          <div class="section-heading split-heading">
            <div><div class="eyebrow">Health plans</div><h2>Working with leading<br><span>health plans.</span></h2></div>
            <div><p>Explore health plan relationships currently listed by All United Medical Group IPA.</p>${buttonLink("Explore health plans", "#/health-plans", "button-text")}</div>
          </div>
          ${planGrid()}
          <p class="disclaimer">Health plan participation and provider availability may vary. Contact All United or your health plan to confirm current participation.</p>
        </div>
      </section>

      <section class="section member-section">
        <div class="container member-grid">
          <div class="member-visual">
            <img src="https://images.unsplash.com/photo-1576765608622-067973a79f53?auto=format&fit=crop&w=1200&q=88" alt="Doctor reviewing care information with an older adult">
            <div class="member-visual-card"><span>${icon("heart")}</span><strong>Healthcare should feel easier to navigate.</strong></div>
          </div>
          <div class="member-copy">
            <div class="eyebrow">For members</div>
            <h2>Helpful answers.<br><span>Clear next steps.</span></h2>
            <p>Whether you need to find care, understand a referral, or reach the right support team, start here.</p>
            <div class="check-list">
              <a href="#/directory">${icon("check")} Find a doctor in your community</a>
              <a href="#/members">${icon("check")} Learn about referrals and authorizations</a>
              <a href="#/members">${icon("check")} Access forms, FAQs, and member support</a>
            </div>
            ${buttonLink("Visit Member Resources", "#/members")}
          </div>
        </div>
      </section>

      <section class="provider-callout">
        <div class="provider-pattern"></div>
        <div class="container provider-callout-grid">
          <div>
            <div class="eyebrow eyebrow-light">For physicians</div>
            <h2>Grow with a connected<br>physician network.</h2>
            <p>Discover opportunities to connect with All United and serve patients throughout Southern California.</p>
          </div>
          <div class="provider-actions">
            ${buttonLink("Join Our Network", "#/providers", "button-white")}
            ${buttonLink("Provider Resources", "#/providers", "button-outline-light")}
          </div>
        </div>
      </section>

      <section class="section leadership-preview">
        <div class="container">
          <div class="section-heading center-heading">
            <div class="eyebrow">Our leadership</div>
            <h2>Committed to stronger<br><span>healthcare connections.</span></h2>
          </div>
          <div class="leader-grid">
            ${leaders.map((l,i)=>`<article class="leader-card"><div class="leader-avatar avatar-${i+1}">${l.initials}</div><h3>${l.name}</h3><p>${l.role}</p></article>`).join("")}
          </div>
          <div class="center-action">${buttonLink("Meet Our Leadership", "#/about", "button-secondary")}</div>
        </div>
      </section>

      <section class="closing-cta">
        <div class="closing-rings"></div>
        <div class="container closing-inner">
          <span class="closing-kicker">ALL UNITED MEDICAL GROUP IPA</span>
          <h2>Better care.<br>Stronger connections.<br><em>All United.</em></h2>
          <p>Whether you are looking for a physician, need member support, or want to become part of our growing network, we are here to help.</p>
          <div class="hero-actions">${buttonLink("Find a Doctor", "#/directory")}${buttonLink("Contact Us", "#/contact", "button-secondary")}</div>
        </div>
      </section>
    `;
  }

  function directoryPage() {
    return `
      ${pageHero("Find care", "Find a Doctor", "Search the All United network to find care that fits your needs.")}
      <section class="section directory-page">
        <div class="container">
          <div class="directory-alert"><span>Preview</span><div><strong>Provider Directory Concept</strong><p>All physician profiles and availability shown below are fictional demonstration data.</p></div></div>
          <div class="directory-toolbar">
            <div class="results-copy"><strong id="result-count">${physicians.length}</strong><span>sample physicians</span></div>
            <div class="view-toggle" role="group" aria-label="Directory display">
              <button class="active" data-view="grid">Grid</button><button data-view="map">Map</button>
            </div>
          </div>
          <div class="directory-layout">
            <aside class="filters" id="directory-filters">
              <div class="filter-heading"><h2>Filter your search</h2><button id="clear-filters">Clear</button></div>
              <label>Doctor name<input id="filter-name" type="search" placeholder="Search by name"></label>
              <label>City<select id="filter-city"><option value="">All cities</option>${[...new Set(physicians.map(d=>d.city))].sort().map(c=>`<option>${c}</option>`).join("")}</select></label>
              <label>Specialty<select id="filter-specialty"><option value="">All specialties</option>${[...new Set(physicians.map(d=>d.specialty))].map(s=>`<option>${s}</option>`).join("")}</select></label>
              <label>Language<select id="filter-language"><option value="">Any language</option>${[...new Set(physicians.flatMap(d=>d.languages))].sort().map(l=>`<option>${l}</option>`).join("")}</select></label>
              <label>Health plan<select id="filter-plan"><option value="">Any plan</option>${healthPlans.map(p=>`<option>${p.name.replace(" / Elevance","")}</option>`).join("")}</select></label>
              <label class="checkbox-label"><input id="filter-accepting" type="checkbox"><span>Accepting new patients</span></label>
            </aside>
            <div class="directory-results">
              <button class="mobile-filter-button" id="mobile-filter-button">Filters <span>＋</span></button>
              <div class="doctor-grid directory-grid" id="doctor-results">${physicians.map(d=>doctorCard(d)).join("")}</div>
              <div class="directory-map-view" id="directory-map-view">
                <div class="map-city city-redlands">Redlands<span>1</span></div>
                <div class="map-city city-rancho">Rancho Cucamonga<span>1</span></div>
                <div class="map-city city-riverside">Riverside<span>1</span></div>
                <div class="map-city city-moreno">Moreno Valley<span>1</span></div>
                <div class="map-city city-corona">Corona<span>1</span></div>
                <div class="map-city city-palm">Palm Desert<span>1</span></div>
                <p>Interactive geographic directory preview</p>
              </div>
              <div class="empty-state" id="empty-state"><span>${icon("search")}</span><h3>No sample profiles match</h3><p>Try clearing one or more filters.</p><button class="button" id="empty-clear">Clear filters</button></div>
            </div>
          </div>
        </div>
      </section>`;
  }

  function doctorPage(id) {
    const d = physicians.find(doc => doc.id === id) || physicians[0];
    return `
      <section class="profile-hero">
        <div class="container breadcrumb"><a href="#/directory">Find a Doctor</a><span>›</span><span>${d.name}</span></div>
        <div class="container profile-hero-grid">
          <div class="profile-image"><img src="${d.image}" alt="Demonstration portrait for Dr. ${d.firstName}"><span class="demo-badge">Demo profile</span></div>
          <div class="profile-intro">
            <div class="doctor-specialty">${d.specialty}</div>
            <h1>${d.name}</h1>
            <p class="profile-location">${icon("location")} ${d.city}, ${d.state}</p>
            <div class="profile-tags">${d.languages.map(l=>`<span>${l}</span>`).join("")}</div>
            <div class="profile-status ${d.accepting ? "open" : "closed"}"><i></i>${d.accepting ? "Accepting new patients" : "Call for current availability"}</div>
            <div class="profile-actions">${buttonLink("Contact Office", "#/contact")}${buttonLink("Back to Search", "#/directory", "button-secondary")}</div>
            <p class="profile-concept-note">This fictional profile demonstrates the proposed directory experience.</p>
          </div>
        </div>
      </section>
      <section class="section profile-content">
        <div class="container profile-layout">
          <div class="profile-main">
            <article class="content-card"><div class="eyebrow">About the doctor</div><h2>Care that begins with listening.</h2><p>${d.about}</p></article>
            <article class="quote-card"><span>“</span><blockquote>${d.philosophy}</blockquote><cite>Sample care philosophy</cite></article>
            <article class="content-card"><h2>Areas of interest</h2><div class="interest-grid">${d.interests.map(i=>`<div>${icon("check")}<span>${i}</span></div>`).join("")}</div></article>
            <article class="content-card"><h2>Sample health-plan display</h2><div class="profile-plans">${d.plans.map(p=>`<span>${p}</span>`).join("")}</div><p class="disclaimer">Demonstration only. Actual plan participation must be verified with All United and the applicable health plan.</p></article>
          </div>
          <aside class="profile-sidebar">
            <div class="sidebar-card"><h2>Office information</h2><div class="sidebar-row">${icon("location")}<div><strong>${d.city}, California</strong><span>Exact address to be supplied</span></div></div><div class="sidebar-row">${icon("phone")}<div><strong>Office phone</strong><span>Verified number to be supplied</span></div></div><div class="sidebar-row">${icon("document")}<div><strong>Office hours</strong><span>Verified hours to be supplied</span></div></div><div class="mini-location-map"><span>${icon("location")}</span><p>Map integration area</p></div></div>
            <div class="sidebar-card support-card"><span>${icon("contact")}</span><h2>Need help choosing care?</h2><p>Contact All United for help reaching the appropriate resource.</p><a href="#/contact">Contact us ${icon("arrow")}</a></div>
          </aside>
        </div>
      </section>`;
  }

  function membersPage() {
    const resources = [
      ["Find a Doctor","Search the physician-directory concept by location, specialty, language, and plan.","search","#/directory"],
      ["Urgent Care","A future finder can display nearby locations, hours, phone numbers, and plan details.","location","#/contact"],
      ["Health Plans","Review the health plan relationships currently listed by All United.","heart","#/health-plans"],
      ["Referrals & Authorizations","Learn where verified referral and authorization procedures will live.","link","#member-faq"],
      ["Forms & Documents","Access member forms and official resources once supplied by All United.","document","#/contact"],
      ["Member Support","Reach the appropriate All United resource for questions about your care.","contact","#/contact"]
    ];
    return `
      ${pageHero("Member resources", "We're here to help you<br>navigate your care.", "Find straightforward paths to care, information, and support.")}
      <section class="section">
        <div class="container">
          <div class="section-heading center-heading compact-heading"><div class="eyebrow">Start here</div><h2>What can we help you find?</h2><p>Choose a resource below to take the next step.</p></div>
          <div class="resource-grid">${resources.map(r=>resourceCard(...r)).join("")}</div>
        </div>
      </section>
      <section class="section soft-section" id="member-faq">
        <div class="container narrow">
          <div class="section-heading center-heading compact-heading"><div class="eyebrow">Common questions</div><h2>Simple answers, clearly explained.</h2></div>
          <div class="accordion">
            ${[
              ["What is a medical group or IPA?","A medical group or independent physician association helps coordinate relationships among physicians, health plans, and members. Your health plan can explain how your specific benefits and medical-group assignment work."],
              ["How do I confirm that a doctor accepts my plan?","Always confirm current participation with the physician's office, All United, or your health plan before scheduling care. Directory information can change."],
              ["Where will referral information appear?","Verified referral and authorization guidance can be added here after All United supplies its official member-facing procedures."],
              ["What should I do if I need urgent medical attention?","For a life-threatening emergency, call 911. A completed site can include an urgent-care finder for non-emergency needs, using verified network locations and hours."]
            ].map((q,i)=>`<article class="accordion-item"><button aria-expanded="${i===0}"><span>${q[0]}</span><i>＋</i></button><div class="accordion-panel" ${i===0?"":"hidden"}><p>${q[1]}</p></div></article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function healthPlansPage() {
    return `
      ${pageHero("Health plan relationships", "Health plans connected to<br>the All United network.", "Explore the health plans currently identified on All United's public website.")}
      <section class="section">
        <div class="container">
          <div class="plan-intro"><div><div class="eyebrow">Current public listing</div><h2>Eleven health-plan relationships.</h2></div><p>Selecting a plan could eventually filter the physician directory and surface verified participating providers.</p></div>
          ${planGrid()}
          <div class="info-callout"><span>${icon("contact")}</span><div><h3>Confirm before receiving care</h3><p>Health plan participation, physician availability, and member eligibility may change. Contact All United, the provider, or your health plan to confirm current information.</p></div></div>
        </div>
      </section>
      <section class="provider-callout small-callout"><div class="container provider-callout-grid"><div><div class="eyebrow eyebrow-light">Find participating care</div><h2>Start with the doctor directory.</h2><p>Use the concept filters to see how plan-to-provider discovery can work.</p></div><div class="provider-actions">${buttonLink("Search Doctors", "#/directory", "button-white")}</div></div></section>`;
  }

  function providersPage() {
    return `
      ${pageHero("For physicians and practices", "Partner with All United.", "A strong physician network begins with strong partnerships.", `<div class="page-hero-actions">${buttonLink("Explore Network Participation", "#provider-interest", "button-white")}${buttonLink("Provider Resources", "#provider-tools", "button-outline-light")}</div>`)}
      <section class="section">
        <div class="container provider-value-grid">
          <div class="provider-value-copy"><div class="eyebrow">Why connect</div><h2>Built around stronger<br><span>healthcare relationships.</span></h2><p>All United's public story emphasizes traditional healthcare values, compassion, community, and coordinated care. This concept creates a clearer home for that message.</p></div>
          <div class="value-cards">
            <article><span>${icon("people")}</span><h3>Regional reach</h3><p>Connect across communities throughout Riverside, San Bernardino, and portions of Los Angeles County.</p></article>
            <article><span>${icon("link")}</span><h3>Plan relationships</h3><p>Present current health-plan relationships clearly for physicians and practice teams.</p></article>
            <article><span>${icon("contact")}</span><h3>Provider relations</h3><p>Create a direct, organized path to network and provider-support information.</p></article>
            <article><span>${icon("document")}</span><h3>Central resources</h3><p>Give practices one place for verified forms, portal links, claims, and authorization guidance.</p></article>
          </div>
        </div>
      </section>
      <section class="section soft-section" id="provider-tools">
        <div class="container">
          <div class="section-heading center-heading compact-heading"><div class="eyebrow">Provider resources</div><h2>Everything practices need,<br>organized in one place.</h2></div>
          <div class="resource-grid three-col">
            ${resourceCard("Provider Portal","Secure portal access link and support information.","provider","#/contact")}
            ${resourceCard("Claims & Authorizations","Official procedures, criteria, contacts, and forms.","document","#/contact")}
            ${resourceCard("Provider Relations","Connect directly with the All United provider-relations team.","contact","#/contact")}
          </div>
        </div>
      </section>
      <section class="section" id="provider-interest"><div class="container form-panel"><div><div class="eyebrow">Join our network</div><h2>Start a conversation.</h2><p>This demonstration form shows how physician and practice interest can be routed to provider relations. It does not submit personal information.</p></div>${conceptForm("provider")}</div></section>`;
  }

  function aboutPage() {
    return `
      ${pageHero("About All United", "United around better care.", "A regional physician network grounded in relationships, compassion, community, and coordinated care.")}
      <section class="section story-section"><div class="container story-grid"><div class="story-visual"><div class="story-year"><strong>2016</strong><span>Founded in Southern California</span></div><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=88" alt="A diverse professional team collaborating"></div><div class="story-copy"><div class="eyebrow">Our story</div><h2>Traditional values.<br><span>A more connected future.</span></h2><p>All United Medical Group IPA was founded in 2016 with the stated goal of providing quality care to every member and bringing traditional healthcare values into the current era.</p><p>Through relationships with partner clinics, physicians, health plans, and the communities it serves, All United seeks to make compassionate, coordinated care more accessible across the region.</p><div class="story-principles"><span>${icon("heart")} Compassion</span><span>${icon("people")} Community</span><span>${icon("link")} Connection</span></div></div></div></section>
      <section class="section mission-section"><div class="container"><div class="mission-grid"><article><span>Our mission</span><h2>Health aligned with the values of the communities we serve.</h2><p>Bring people and healthcare partners together in pursuit of compassionate, quality care.</p></article><article><span>Our vision</span><h2>Healthier lives through awareness, initiative, and support.</h2><p>Encourage individuals to care for their own health and contribute to the wellbeing of others.</p></article></div></div></section>
      <section class="section regions-list-section"><div class="container"><div class="section-heading split-heading"><div><div class="eyebrow">Our communities</div><h2>A broad regional<br><span>footprint.</span></h2></div><p>All locations below come from All United's current public service-area listing and do not imply provider availability in every city.</p></div><div class="region-list">${regions.map((r,i)=>`<article><button aria-expanded="${i===0}"><span><b>0${i+1}</b>${r.name}</span><i>＋</i></button><div class="region-cities" ${i===0?"":"hidden"}>${r.cities.map(c=>`<span>${c}</span>`).join("")}</div></article>`).join("")}</div></div></section>
      <section class="section leadership-full"><div class="container"><div class="section-heading center-heading"><div class="eyebrow">Leadership</div><h2>People behind the network.</h2><p>Leadership titles shown below are based on All United's public website. Biographies and headshots can be added once verified.</p></div><div class="leader-grid">${leaders.map((l,i)=>`<article class="leader-card full"><div class="leader-avatar avatar-${i+1}">${l.initials}</div><div><h3>${l.name}</h3><p>${l.role}</p><span>Biography to be supplied</span></div></article>`).join("")}</div></div></section>`;
  }

  function contactPage() {
    return `
      ${pageHero("Contact All United", "Connect with the right team.", "Choose the type of help you need and send a demonstration inquiry.")}
      <section class="section contact-section">
        <div class="container contact-layout">
          <div class="contact-info">
            <div class="eyebrow">Contact information</div><h2>We're here to help.</h2><p>This concept creates clear paths for member, provider, and business inquiries while keeping verified contact information easy to find.</p>
            <div class="contact-method"><span>${icon("location")}</span><div><small>Office</small><strong>301 S. La Cadena Dr.<br>Colton, CA 92324</strong></div></div>
            <div class="contact-method"><span>${icon("contact")}</span><div><small>Provider Relations</small><strong>Stephanie Serrano</strong><a href="mailto:sserrano@allunitedipa.com">sserrano@allunitedipa.com</a></div></div>
            <div class="verification-note"><strong>Details still needed</strong><p>Main phone, member-services number, general email, and office hours will be added when All United verifies them.</p></div>
          </div>
          <div class="contact-form-card"><div class="eyebrow">Send an inquiry</div><h2>How can we help?</h2>${conceptForm("contact")}</div>
        </div>
      </section>
      <section class="location-panel"><div class="container location-panel-inner"><div class="location-pin">${icon("location")}</div><div><strong>All United Medical Group IPA</strong><span>Colton, California</span></div><a href="https://www.google.com/maps/search/?api=1&query=301+S+La+Cadena+Dr+Colton+CA+92324" target="_blank" rel="noopener">Open in Maps ${icon("arrow")}</a></div></section>`;
  }

  function legalPage() {
    return `${pageHero("Website information", "Policies and accessibility", "A production website would include approved legal, privacy, accessibility, and nondiscrimination language.")}<section class="section"><div class="container narrow legal-copy"><div class="directory-alert"><span>Concept</span><div><strong>Approval required</strong><p>The final policies must be reviewed and supplied or approved by All United before publication.</p></div></div><h2>Privacy</h2><p>This demonstration does not collect or transmit form submissions. A production privacy policy should explain the information collected, its purpose, retention, sharing, security practices, and member rights.</p><h2>Accessibility</h2><p>The concept uses semantic structure, keyboard focus styles, readable typography, contrast-conscious colors, and reduced-motion support. A production site should be tested against the organization's chosen accessibility standard.</p><h2>Nondiscrimination</h2><p>All United should supply its official nondiscrimination notice, language-assistance information, and applicable contact methods.</p><h2>Medical information</h2><p>Website information should not replace professional medical advice. For a life-threatening emergency, call 911.</p></div></section>`;
  }

  function conceptForm(type) {
    return `<form class="concept-form" data-concept-form>
      <div class="form-row"><label>First name<input required type="text" placeholder="First name"></label><label>Last name<input required type="text" placeholder="Last name"></label></div>
      <label>Email address<input required type="email" placeholder="name@example.com"></label>
      <label>${type==="provider"?"Practice or organization":"How can we help?"}<select required><option value="">Select one</option>${type==="provider"?"<option>Primary care practice</option><option>Specialty practice</option><option>Facility or partner</option>":"<option>Member support</option><option>Provider relations</option><option>Health plan or business inquiry</option><option>General question</option>"}</select></label>
      <label>Message<textarea rows="4" placeholder="Tell us briefly what you need"></textarea></label>
      <button class="button" type="submit">Send Demonstration Inquiry</button>
      <p class="form-disclaimer">Concept form only. Information entered here is not transmitted or stored.</p>
    </form>`;
  }

  function bindDirectory() {
    const results = document.getElementById("doctor-results");
    if (!results) return;
    const inputs = {
      name: document.getElementById("filter-name"),
      city: document.getElementById("filter-city"),
      specialty: document.getElementById("filter-specialty"),
      language: document.getElementById("filter-language"),
      plan: document.getElementById("filter-plan"),
      accepting: document.getElementById("filter-accepting")
    };
    const apply = () => {
      const filtered = physicians.filter(d =>
        (!inputs.name.value || d.name.toLowerCase().includes(inputs.name.value.toLowerCase())) &&
        (!inputs.city.value || d.city === inputs.city.value) &&
        (!inputs.specialty.value || d.specialty === inputs.specialty.value) &&
        (!inputs.language.value || d.languages.includes(inputs.language.value)) &&
        (!inputs.plan.value || d.plans.some(p => p.includes(inputs.plan.value) || inputs.plan.value.includes(p))) &&
        (!inputs.accepting.checked || d.accepting)
      );
      results.innerHTML = filtered.map(d=>doctorCard(d)).join("");
      document.getElementById("result-count").textContent = filtered.length;
      document.getElementById("empty-state").classList.toggle("show", filtered.length === 0);
      results.hidden = filtered.length === 0;
    };
    Object.values(inputs).forEach(el => el.addEventListener(el.type === "search" ? "input" : "change", apply));
    const clear = () => { Object.values(inputs).forEach(el => el.type === "checkbox" ? el.checked=false : el.value=""); apply(); };
    document.getElementById("clear-filters").addEventListener("click", clear);
    document.getElementById("empty-clear").addEventListener("click", clear);
    document.getElementById("mobile-filter-button").addEventListener("click", () => document.getElementById("directory-filters").classList.toggle("show"));
    document.querySelectorAll("[data-view]").forEach(btn => btn.addEventListener("click", () => {
      document.querySelectorAll("[data-view]").forEach(b=>b.classList.remove("active")); btn.classList.add("active");
      const map = btn.dataset.view === "map"; results.style.display = map ? "none" : ""; document.getElementById("directory-map-view").classList.toggle("show", map);
    }));
  }

  function bindPageEvents() {
    const homeSearch = document.getElementById("home-search");
    if (homeSearch) homeSearch.addEventListener("submit", e => {
      e.preventDefault();
      const values = { query: document.getElementById("home-query").value, city: document.getElementById("home-city").value, language: document.getElementById("home-language").value };
      sessionStorage.setItem("directoryPrefill", JSON.stringify(values));
      location.hash = "#/directory";
    });
    bindDirectory();
    const prefill = sessionStorage.getItem("directoryPrefill");
    if (prefill && document.getElementById("filter-name")) {
      const values = JSON.parse(prefill); sessionStorage.removeItem("directoryPrefill");
      document.getElementById("filter-name").value = values.query || "";
      document.getElementById("filter-city").value = values.city || "";
      document.getElementById("filter-language").value = values.language || "";
      document.getElementById("filter-name").dispatchEvent(new Event("input"));
    }
    document.querySelectorAll(".accordion-item button, .region-list article button").forEach(btn => btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling; const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open)); panel.hidden = open;
    }));
    document.querySelectorAll("[data-concept-form]").forEach(form => form.addEventListener("submit", e => {
      e.preventDefault(); form.reset(); showToast("Concept form complete — no information was transmitted.");
    }));
  }

  function showToast(message) {
    toast.textContent = message; toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"), 4200);
  }

  function route() {
    const raw = location.hash.replace(/^#\/?/, "") || "";
    const parts = raw.split("/");
    let template;
    switch(parts[0]) {
      case "directory": template = directoryPage(); break;
      case "doctor": template = doctorPage(parts[1]); break;
      case "members": template = membersPage(); break;
      case "health-plans": template = healthPlansPage(); break;
      case "providers": template = providersPage(); break;
      case "about": template = aboutPage(); break;
      case "contact": template = contactPage(); break;
      case "legal": template = legalPage(); break;
      default: template = homePage();
    }
    main.innerHTML = template;
    nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false");
    window.scrollTo({top:0, behavior:"instant"});
    document.querySelectorAll(".primary-nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#/${parts[0]}`));
    bindPageEvents();
    main.focus({preventScroll:true});
  }

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  window.addEventListener("hashchange", route);
  window.addEventListener("scroll", () => document.getElementById("site-header").classList.toggle("scrolled", window.scrollY > 12));
  document.getElementById("year").textContent = new Date().getFullYear();
  route();
})();