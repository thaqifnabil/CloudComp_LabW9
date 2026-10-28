'use client';

import { useState } from 'react';

const checklistPhases = [
  {
    phase: 'BEFORE ANYTHING GOES WRONG',
    steps: [
      {
        id: 1,
        title: '1. Keep the invoice.',
        detail: 'Save the original bill and a photo or PDF copy. The warranty normally starts on the invoice date.',
      },
      {
        id: 2,
        title: '2. Register the product.',
        detail: 'Many brands ask you to register on their website or app; some add extra warranty when you do.',
      },
      {
        id: 3,
        title: '3. Read the warranty card once.',
        detail: 'Note how long it lasts, what it covers, and what it excludes.',
      },
      {
        id: 4,
        title: '4. Record the condition.',
        detail: 'Take a few dated photos of the product once it is installed or unboxed.',
      },
    ],
  },
  {
    phase: 'WHEN THE FAULT APPEARS',
    steps: [
      {
        id: 5,
        title: '5. Record the fault.',
        detail: 'Take a clear photo or short video of the problem as soon as you see it, with the date visible if you can.',
      },
      {
        id: 6,
        title: '6. Raise the complaint in writing.',
        detail: "Use email, the brand's website or its app, not only a phone call, so there is a record.",
      },
      {
        id: 7,
        title: '7. Note every reference number.',
        detail: 'Write down the complaint or ticket number, the date and the name of anyone you speak to.',
      },
    ],
  },
  {
    phase: 'WHEN A TECHNICIAN VISITS',
    steps: [
      {
        id: 8,
        title: '8. Ask for the job sheet.',
        detail: 'Ask the technician for a copy of the visit report or job sheet before they leave.',
      },
      {
        id: 9,
        title: '9. Ask what was tested.',
        detail: 'Ask which test or instrument was used to reach the diagnosis.',
      },
      {
        id: 10,
        title: '10. Take your own photos.',
        detail: 'Photograph the product and anything the technician points to, during the visit.',
      },
    ],
  },
  {
    phase: 'IF THE CLAIM IS REFUSED',
    steps: [
      {
        id: 11,
        title: '11. Ask for the reason in writing.',
        detail: 'Request a written explanation that names the exact cause and the evidence for it.',
      },
      {
        id: 12,
        title: '12. Ask for the technical report.',
        detail: 'If the refusal rests on an inspection, ask for that inspection report.',
      },
      {
        id: 13,
        title: '13. Escalate inside the company.',
        detail: 'Most brands list a grievance or escalation contact on their website. Write to it, quoting your complaint number.',
      },
      {
        id: 14,
        title: '14. Keep it factual.',
        detail: 'Stick to dates, documents and photos. Calm, written records are what a consumer forum or regulator will look at.',
      },
      {
        id: 15,
        title: '15. Know your consumer helpline.',
        detail: 'Most countries run a free consumer helpline or online complaint portal that can guide you on the next step.',
      },
    ],
  },
];

export default function Home() {
  const [checkedSteps, setCheckedSteps] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  const toggleStep = (id) => {
    setCheckedSteps((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const totalChecked = Object.values(next).filter(Boolean).length;
      if (totalChecked === 15) {
        showToast('All 15 steps completed! You are claim ready.');
      }
      return next;
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 15) * 100);

  const handleDownload = () => {
    // Generate text checklist file for download
    let content = `CLAIM READY\nA free checklist for anyone about to file a warranty claim.\n\n`;
    content += `THE IDEA IN ONE LINE:\nA warranty claim is decided on records. Keep yours, and ask for theirs in writing.\n\n`;
    
    checklistPhases.forEach((grp) => {
      content += `=== ${grp.phase} ===\n`;
      grp.steps.forEach((s) => {
        const mark = checkedSteps[s.id] ? '[X]' : '[ ]';
        content += `${mark} ${s.title} ${s.detail}\n`;
      });
      content += `\n`;
    });

    content += `Claim Ready is a free, general guide. It is not legal advice. For your own case, check the warranty terms for your product and your country's consumer rules.\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'claim-ready-checklist.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Checklist downloaded successfully');
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'CLAIM READY',
          text: 'A free checklist for anyone about to file a warranty claim.',
          url: window.location.href,
        });
        showToast('Shared successfully');
        return;
      } catch (err) {
        // Fallback to clipboard if cancelled or unsupported
      }
    }
    
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard');
    }
  };

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="header-container">
          <a href="#" className="header-logo" id="header-logo">
            <span className="header-logo-icon">✓</span>
            <span>CLAIM READY</span>
          </a>

          <nav className="header-nav" id="header-nav">
            <a href="#checklist" className="nav-link" id="nav-link-steps">
              The 15 steps
            </a>
            <a href="#key-numbers" className="nav-link" id="nav-link-numbers">
              Key numbers
            </a>
          </nav>

          <div className="header-action">
            <button
              onClick={handleDownload}
              className="btn btn-primary btn-sm"
              id="header-download-btn"
            >
              Download
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="page-container">
        {/* Hero Section */}
        <section className="hero-section" id="hero">
          <h1 className="hero-title">CLAIM READY</h1>
          <p className="hero-subtitle">
            A free checklist for anyone about to file a warranty claim.
          </p>
          <div>
            <button
              onClick={handleDownload}
              className="btn btn-primary btn-md"
              id="hero-download-btn"
            >
              Download checklist
            </button>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="target-audience-card" id="who-this-is-for">
          <h2 className="target-audience-title">WHO THIS IS FOR</h2>
          <p className="target-audience-text">
            Anyone whose phone, TV, laptop or appliance stopped working while it is still under warranty, and who wants the claim to be decided on facts, in writing.
          </p>
        </section>

        {/* The Idea In One Line */}
        <section className="idea-card" id="idea">
          <div className="idea-header">THE IDEA IN ONE LINE</div>
          <p className="idea-content">
            A warranty claim is decided on records. Keep yours, and ask for theirs in writing.
          </p>
        </section>

        {/* Key Numbers (heading "KEY NUMBERS FOR THE PAGE" is hidden) */}
        <section className="numbers-section" id="key-numbers">
          <div className="numbers-grid">
            <div className="number-card" id="num-card-1">
              <div className="number-value">15</div>
              <div className="number-label">steps in the checklist.</div>
            </div>
            <div className="number-card" id="num-card-2">
              <div className="number-value">4</div>
              <div className="number-label">records to keep before anything goes wrong.</div>
            </div>
            <div className="number-card" id="num-card-3">
              <div className="number-value">1</div>
              <div className="number-label">rule: if it is not in writing, it did not happen.</div>
            </div>
          </div>
        </section>

        {/* Checklist Section */}
        <section className="checklist-section" id="checklist">
          <div className="section-head">
            <h2 className="checklist-title">Checklist</h2>
            <div className="progress-text">
              {completedCount} of 15 completed ({progressPercent}%)
            </div>
            <div className="checklist-progress-bar-container">
              <div
                className="checklist-progress-bar"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {checklistPhases.map((phaseGroup) => (
            <div className="phase-group" key={phaseGroup.phase}>
              <div className="phase-header">
                <h3 className="phase-title">{phaseGroup.phase}</h3>
                <span className="phase-badge">{phaseGroup.steps.length} steps</span>
              </div>
              <ul className="step-items">
                {phaseGroup.steps.map((step) => {
                  const isChecked = !!checkedSteps[step.id];
                  return (
                    <li
                      key={step.id}
                      className={`step-item ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleStep(step.id)}
                      id={`step-${step.id}`}
                    >
                      <div className="checkbox-container">
                        {isChecked && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <div className="step-content">
                        <p className="step-text">
                          <strong>{step.title}</strong>
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>

        {/* Call to Action (heading "CALL TO ACTION" is hidden) */}
        <section className="cta-section" id="cta">
          <div className="cta-actions">
            <div className="cta-item" id="cta-download">
              <div className="cta-text">
                Download the checklist and keep it with your invoices.
              </div>
              <button
                onClick={handleDownload}
                className="btn btn-primary btn-md"
                id="cta-download-btn"
              >
                Download
              </button>
            </div>

            <div className="cta-item" id="cta-share">
              <div className="cta-text">
                Share it with a friend who just bought something expensive.
              </div>
              <button
                onClick={handleShare}
                className="btn btn-secondary btn-md"
                id="cta-share-btn"
              >
                Share
              </button>
            </div>
          </div>
        </section>

        {/* Footer Note (heading "FOOTER NOTE" is hidden) */}
        <section className="footer-note-card" id="footer-note">
          <p className="footer-note-text">
            Claim Ready is a free, general guide. It is not legal advice. For your own case, check the warranty terms for your product and your country's consumer rules.
          </p>
        </section>
      </main>

      {/* Site Footer */}
      <footer className="site-footer">
        <div className="footer-brand">CLAIM READY</div>
        <p className="footer-copy">
          A free checklist for anyone about to file a warranty claim.
        </p>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast" role="alert">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
