/**
 * Reusable utility that derives a project's category from its title, description, and technologies.
 * @param {Object} project - The project object containing title, description, and tech_stack.
 * @returns {string} The derived category name.
 */
export const deriveCategory = (project) => {
  if (!project) return 'Full Stack Application';

  const techStack = (project.tech_stack || '').toLowerCase();
  const title = (project.title || '').toLowerCase();
  const description = (project.description || '').toLowerCase();

  // 1. Security check
  const securityKeywords = ['encryption', 'aes', 'cryptography', 'security', 'peks', 'sse', 'cybersecurity', 'auth', 'jwt', 'tls', 'ssl'];
  if (securityKeywords.some(kw => techStack.includes(kw) || title.includes(kw) || description.includes(kw))) {
    return 'Security';
  }

  // 2. AI Application check
  const aiKeywords = ['yolo', 'opencv', 'tensorflow', 'pytorch', 'gemini', 'granite', 'llm', 'ai', 'artificial intelligence', 'machine learning', 'deep learning', 'openai', 'neural'];
  if (aiKeywords.some(kw => techStack.includes(kw) || title.includes(kw) || description.includes(kw))) {
    return 'AI Application';
  }

  // 3. Healthcare Platform check
  const healthcareKeywords = ['health', 'medical', 'care', 'patient', 'clinical', 'disease', 'hospital', 'doctor', 'clinic', 'dentist'];
  if (healthcareKeywords.some(kw => title.includes(kw) || description.includes(kw) || techStack.includes(kw))) {
    return 'Healthcare Platform';
  }

  // 4. Developer Tool check
  const devToolKeywords = ['cms', 'tooling', 'automation', 'api', 'workflow', 'cli', 'vite', 'webpack', 'git', 'ci/cd', 'docker', 'compiler', 'library', 'npm', 'sdk', 'kubernetes'];
  if (devToolKeywords.some(kw => techStack.includes(kw) || title.includes(kw) || description.includes(kw))) {
    return 'Developer Tool';
  }

  // 5. Fallback category
  return 'Full Stack Application';
};
