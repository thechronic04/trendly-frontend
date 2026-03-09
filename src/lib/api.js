/**
 * Trendly.Ai Frontend API Service
 * Handles communication with the production FastAPI backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiClient {
    constructor() {
        this.token = localStorage.getItem('access_token');
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('access_token', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('access_token');
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
            ...options.headers,
        };

        try {
            const response = await fetch(url, { ...options, headers });

            if (response.status === 401) {
                // Handle unauthorized (expired token)
                this.clearToken();
                window.dispatchEvent(new Event('auth-expired'));
            }

            if (!response.ok) {
                const error = await response.json().catch(() => ({ detail: 'Network error' }));
                throw new Error(error.detail || 'An unexpected error occurred');
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    }

    // Auth Module
    async login(email, password) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (response.access_token) {
            this.setToken(response.access_token);
        }
        return response;
    }

    // Discovery Module
    async getTrendingProducts() {
        return await this.request('/discovery/trending');
    }

    async getProductAnalytics(productId) {
        return await this.request(`/discovery/products/${productId}`);
    }

    // Tracker Module
    async trackEvent(type, productId, metadata = {}) {
        return await this.request('/tracker/event', {
            method: 'POST',
            body: JSON.stringify({
                event_type: type,
                product_id: productId,
                session_id: localStorage.getItem('session_id') || 'guest_session',
                metadata
            }),
        });
    }

    // Recommendation Module
    async getRecommendations() {
        return await this.request('/ai/recommend');
    }
}

export const api = new ApiClient();
