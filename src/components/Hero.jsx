import './Hero.css';

export default function Hero() {
    return (
        <section className="hero" id="hero-section">
            <div className="hero-badge">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="#06d6a0" />
                </svg>
                <span>AI-Powered Detection Engine</span>
            </div>

            <h1 className="hero-title">
                Detect <span className="gradient-text">Fake Jobs</span>
                <br />Before They Trick You
            </h1>

            <p className="hero-description">
                Our deep learning model analyzes job postings in real-time, identifying scam patterns,
                suspicious language, and red flags that humans might miss. Paste text or upload a file to get started.
            </p>

            <div className="hero-stats">
                <div className="stat-item">
                    <span className="stat-value">BiLSTM</span>
                    <span className="stat-label">Neural Network</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                    <span className="stat-value">LIME</span>
                    <span className="stat-label">Explainable AI</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                    <span className="stat-value">Multi-Format</span>
                    <span className="stat-label">PDF, DOCX, Image</span>
                </div>
            </div>
        </section>
    );
}
