import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo-group">
                    <div className="logo-icon">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <rect x="2" y="2" width="24" height="24" rx="6" stroke="url(#logo-grad)" strokeWidth="2.5" />
                            <path d="M9 14.5L12.5 18L19 10" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <defs>
                                <linearGradient id="logo-grad" x1="2" y1="2" x2="26" y2="26">
                                    <stop stopColor="#06d6a0" />
                                    <stop offset="1" stopColor="#118ab2" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="logo-text">JobGuard<span className="logo-accent">AI</span></span>
                </div>

                <nav className="header-nav">
                    <div className="status-badge" id="api-status">
                        <span className="status-dot" />
                        <span>API Active</span>
                    </div>
                </nav>
            </div>
        </header>
    );
}
