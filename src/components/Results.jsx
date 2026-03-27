import { useState } from 'react';
import { submitFeedback } from '../utils/api';
import './Results.css';

export default function Results({ result, originalText }) {
    const [feedbackSent, setFeedbackSent] = useState(false);

    if (!result) return null;

    const { prediction, confidence, incomplete_description, explanation, source } = result;

    const isFake = prediction?.toLowerCase().includes('fake');
    const isWarning = prediction?.toLowerCase().includes('suspicious');
    const isReal = prediction?.toLowerCase().includes('real');

    const handleFeedback = async (correctLabel) => {
        if (!originalText || feedbackSent) return;
        try {
            await submitFeedback(originalText, correctLabel);
            setFeedbackSent(true);
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusClass = () => {
        if (isFake) return 'is-fake';
        if (isWarning) return 'is-warning';
        if (isReal) return 'is-real';
        return 'neutral';
    };

    return (
        <section className={`results-panel ${getStatusClass()}`} id="results-section">
            <div className="results-header">
                <div className="status-badge-large">
                    <span className="badge-dot" />
                    {prediction}
                </div>
                <div className="result-meta">
                    <span className="meta-label">Source:</span>
                    <span className="meta-value">{source || 'Analysis'}</span>
                </div>
            </div>

            {/* ... Metrics Grid ... */}
            <div className="metrics-grid">
                <div className="metric-item">
                    <div className="metric-header">
                        <span className="metric-label">Confidence</span>
                        <span className="metric-value">{confidence}%</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${confidence}%` }} />
                    </div>
                </div>

                <div className="metric-item">
                    <div className="metric-header">
                        <span className="metric-label">Incomplete Description</span>
                        <span className={`metric-value ${incomplete_description ? 'text-warning' : 'text-safe'}`}>
                            {incomplete_description ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <p className="metric-hint">
                        {incomplete_description
                            ? 'Warning: The job posting lacks key details like location or responsibilities.'
                            : 'The posting contains standard job structure elements.'}
                    </p>
                </div>
            </div>

            <div className="explanation-section">
                <h3 className="section-title">Analysis Explanation</h3>
                <p className="section-subtitle">Key features and phrases that influenced the AI model:</p>
                <div className="explanation-tags">
                    {explanation && explanation.length > 0 && explanation[0] !== "Explanation unavailable" ? (
                        explanation.map((item, i) => (
                            <span key={i} className="explanation-tag">
                                {item}
                            </span>
                        ))
                    ) : (
                        <p className="no-explanation">Detailed feature explanation is currently unavailable for this prediction.</p>
                    )}
                </div>
            </div>

            {isFake && (
                <div className="warning-box">
                    <div className="warning-icon">⚠️</div>
                    <div className="warning-content">
                        <strong>Security Recommendation:</strong> This posting shows strong indicators of a fraudulent job offer. Do not share personal data, bank details, or pay any "security deposit".
                    </div>
                </div>
            )}

            <div className="feedback-section">
                <h4 className="feedback-title">Was this prediction accurate?</h4>
                {feedbackSent ? (
                    <p className="feedback-thanks">Thank you! This data will help improve our future training sets. ✅</p>
                ) : (
                    <div className="feedback-actions">
                        <button className="feedback-btn ok" onClick={() => setFeedbackSent(true)}>
                            Correct ✅
                        </button>
                        <button className="feedback-btn fail" onClick={() => handleFeedback(isFake ? 'Real Job' : 'Fake Job')}>
                            Incorrect Label ❌
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
