/**
 * @file This file contains shared constants used throughout the application.
 * Separating constants helps in maintaining and updating them easily.
 */

// For IndexedDB
export const DB_NAME = 'NewsDashboardDB';
export const DB_VERSION = 1;
export const STORE_NAME = 'articles';

// For News API
export const NEWS_API_KEY = '0fdf3b81c9004d9581cbc6b2a6f3a503';
export const NEWS_API_URL = `https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&pageSize=50`;

// For Mock Authentication
export const MOCK_USERS = {
  'user@demo.com': { password: 'password', role: 'user', name: 'Abhinandan' },
  'admin@demo.com': { password: 'admin123', role: 'admin', name: 'Admin Abhinandan' },
};