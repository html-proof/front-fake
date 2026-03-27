const DEFAULT_LOCAL_API = "http://127.0.0.1:5000";

function trimTrailingSlash(value) {
    return value.replace(/\/+$/, "");
}

function resolveApiBase() {
    const configured = import.meta.env.VITE_API_URL?.trim();
    if (configured) {
        return trimTrailingSlash(configured);
    }

    if (typeof window === "undefined") {
        return DEFAULT_LOCAL_API;
    }

    const { hostname, origin } = window.location;
    const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

    return isLocalHost ? DEFAULT_LOCAL_API : trimTrailingSlash(origin);
}

async function parseResponse(response) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        return response.json();
    }

    const text = await response.text();
    return text ? { error: text } : {};
}

function normalizeNetworkError(error) {
    if (error instanceof TypeError) {
        return new Error(
            `Unable to reach the backend API at ${API_BASE}. ` +
            `If the frontend and backend are deployed separately, set VITE_API_URL to your backend URL.`
        );
    }

    return error;
}

const API_BASE = resolveApiBase();

export async function analyzeText(text) {
    try {
        const response = await fetch(`${API_BASE}/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        const data = await parseResponse(response);
        if (!response.ok) throw new Error(data.error || "Text analysis failed.");
        return data;
    } catch (error) {
        throw normalizeNetworkError(error);
    }
}

export async function analyzeFile(file) {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE}/predict-file`, {
            method: "POST",
            body: formData,
        });

        const data = await parseResponse(response);
        if (!response.ok) throw new Error(data.error || "File analysis failed.");
        return data;
    } catch (error) {
        throw normalizeNetworkError(error);
    }
}

export async function submitFeedback(text, correctLabel) {
    try {
        const response = await fetch(`${API_BASE}/submit-feedback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text,
                correct_label: correctLabel,
                timestamp: new Date().toISOString()
            }),
        });

        return await parseResponse(response);
    } catch (error) {
        throw normalizeNetworkError(error);
    }
}

export { API_BASE };
