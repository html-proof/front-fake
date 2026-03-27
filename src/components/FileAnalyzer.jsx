import { useState, useRef } from 'react';
import { analyzeFile } from '../utils/api';
import './FileAnalyzer.css';

const ACCEPTED = '.pdf,.docx,.txt,.png,.jpg,.jpeg,.csv';
const FORMATS = ['PDF', 'DOCX', 'TXT', 'PNG', 'JPG', 'CSV'];

export default function FileAnalyzer({ onResult }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef(null);

    const handleFile = (f) => {
        setFile(f);
        setStatus(`Selected: ${f.name}`);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files[0];
        if (f) handleFile(f);
    };

    const handleAnalyze = async () => {
        if (!file) {
            setStatus('Please select a file first.');
            return;
        }
        setLoading(true);
        setStatus('Uploading and analyzing file...');
        try {
            const result = await analyzeFile(file);
            onResult({ ...result, source: result.file_name || file.name }, result.text || file.name);
            setStatus('File analysis complete!');
        } catch (err) {
            setStatus(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="file-card" id="file-analyzer">
            <div className="card-header">
                <div className="card-title-group">
                    <div className="card-icon file-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M11 2H5C4.44772 2 4 2.44772 4 3V17C4 17.5523 4.44772 18 5 18H15C15.5523 18 16 17.5523 16 17V7L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M11 2V7H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="7" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="7" y1="15" x2="10" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="card-title">Upload Document</h2>
                        <p className="card-subtitle">Upload a job posting file for analysis</p>
                    </div>
                </div>
            </div>

            <div className="format-tags">
                {FORMATS.map((f) => (
                    <span key={f} className="format-tag">{f}</span>
                ))}
            </div>

            <div
                className={`drop-zone ${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                role="button"
                tabIndex={0}
                id="file-drop-zone"
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={ACCEPTED}
                    onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
                    hidden
                />

                {file ? (
                    <div className="file-preview">
                        <div className="file-preview-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13 2H6C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V8L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M13 2V8H19" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <div className="file-preview-info">
                            <span className="file-preview-name">{file.name}</span>
                            <span className="file-preview-size">{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                    </div>
                ) : (
                    <div className="drop-zone-content">
                        <div className="drop-zone-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M16 20V8M16 8L12 12M16 8L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 22V24C6 25.1046 6.89543 26 8 26H24C25.1046 26 26 25.1046 26 24V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className="drop-zone-text">
                            <strong>Click to upload</strong> or drag and drop
                        </p>
                        <p className="drop-zone-hint">Maximum file size: 10MB</p>
                    </div>
                )}
            </div>

            <div className="card-actions">
                <button
                    type="button"
                    className="btn-primary"
                    id="analyze-file-btn"
                    onClick={handleAnalyze}
                    disabled={loading || !file}
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
                            Analyze File
                        </>
                    )}
                </button>
                {file && (
                    <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => { setFile(null); setStatus(''); if (inputRef.current) inputRef.current.value = ''; }}
                    >
                        Remove File
                    </button>
                )}
            </div>

            {status && <p className="status-message" role="status">{status}</p>}
        </section>
    );
}
