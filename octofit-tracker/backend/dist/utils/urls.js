"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logApiConfig = exports.getFrontendUrl = exports.getBaseUrl = void 0;
/**
 * Get the base API URL based on environment
 * Supports GitHub Codespaces with CODESPACE_NAME environment variable
 */
const getBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return `http://localhost:8000`;
};
exports.getBaseUrl = getBaseUrl;
/**
 * Get the frontend URL based on environment
 * For Codespaces, uses the Codespace name with port 5173
 */
const getFrontendUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-5173.app.github.dev`;
    }
    return `http://localhost:5173`;
};
exports.getFrontendUrl = getFrontendUrl;
/**
 * Log API configuration for debugging
 */
const logApiConfig = () => {
    const baseUrl = (0, exports.getBaseUrl)();
    const frontendUrl = (0, exports.getFrontendUrl)();
    const codespaceName = process.env.CODESPACE_NAME || 'local';
    console.log(`\n🚀 API Configuration:`);
    console.log(`   Environment: ${codespaceName}`);
    console.log(`   API Base URL: ${baseUrl}`);
    console.log(`   Frontend URL: ${frontendUrl}`);
    console.log(`\n`);
};
exports.logApiConfig = logApiConfig;
