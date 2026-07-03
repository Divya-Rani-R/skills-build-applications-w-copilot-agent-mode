/**
 * Get the base API URL based on environment
 * Supports GitHub Codespaces with CODESPACE_NAME environment variable
 */
export const getBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  return `http://localhost:8000`;
};

/**
 * Get the frontend URL based on environment
 * For Codespaces, uses the Codespace name with port 5173
 */
export const getFrontendUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-5173.app.github.dev`;
  }
  
  return `http://localhost:5173`;
};

/**
 * Log API configuration for debugging
 */
export const logApiConfig = (): void => {
  const baseUrl = getBaseUrl();
  const frontendUrl = getFrontendUrl();
  const codespaceName = process.env.CODESPACE_NAME || 'local';
  
  console.log(`\n🚀 API Configuration:`);
  console.log(`   Environment: ${codespaceName}`);
  console.log(`   API Base URL: ${baseUrl}`);
  console.log(`   Frontend URL: ${frontendUrl}`);
  console.log(`\n`);
};
