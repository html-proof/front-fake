import { useState } from 'react';
import { analyzeText } from '../utils/api';
import { SAMPLE_JOB_REAL, SAMPLE_JOB_FAKE } from '../utils/samples';
import './TextAnalyzer.css';

export default function TextAnalyzer({ onResult }) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleAnalyze = async () => {
        if (!text.trim()) {
            setStatus('Please paste a job description first.');
            return;
        }
        setLoading(true);
        setStatus('Analyzing job posting...');
        try {
            const result = await analyzeText(text);
            onResult({ ...result, source: 'Text Input' }, text);
            setStatus('Analysis complete!');
        } catch (err) {
            setStatus(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="analyzer-card" id="text-analyzer">
            <div className="card-header">
                <div className="card-title-group">
                    <div className="card-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="6" y1="9.5" x2="14" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="6" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="card-title">Paste Job Text</h2>
                        <p className="card-subtitle">Paste any job posting to analyze for red flags</p>
                    </div>
                </div>
            </div>

            <div className="sample-buttons">
                <button
                    type="button"
                    className="sample-btn sample-real"
                    onClick={() => { setText(SAMPLE_JOB_REAL); setStatus('Sample real job loaded.'); }}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3.5 7L6 9.5L10.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Try Real Job
                </button>
                <button
                    type="button"
                    className="sample-btn sample-fake"
                    onClick={() => { setText(SAMPLE_JOB_FAKE); setStatus('Sample fake job loaded.'); }}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Try Fake Job
                </button>
            </div>

            <div className="textarea-wrapper">
                <textarea
                    id="job-text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="10"
                    placeholder="Paste a full job posting here — title, company, responsibilities, requirements..."
                    disabled={loading}
                />
                <div className="textarea-footer">
                    <span className="char-count">{text.length} characters</span>
                </div>
            </div>

            <div className="card-actions">
                <button
                    type="button"
                    className="btn-primary"
                    id="analyze-text-btn"
                    onClick={handleAnalyze}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Analyze Text
                        </>
                    )}
                </button>
                {text && (
                    <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => { setText(''); setStatus(''); }}
                    >
                        Clear
                    </button>
                )}
            </div>

            {status && <p className="status-message" role="status">{status}</p>}
        </section>
    );
}
