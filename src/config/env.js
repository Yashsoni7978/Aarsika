// Environment detection helper (fail open).
// Production is indexable unless explicitly flagged non-production.
// Rule: block indexing ONLY if:
// VERCEL_ENV === "preview" OR APP_ENV === "staging" OR NODE_ENV !== "production"

function getSeoMode() {
  const vercelEnv = process.env.VERCEL_ENV;
  const appEnv = process.env.APP_ENV;
  const nodeEnv = process.env.NODE_ENV;

  if (vercelEnv === 'preview') {
    return { isIndexable: false, reason: 'VERCEL_ENV is preview' };
  }
  if (appEnv === 'staging') {
    return { isIndexable: false, reason: 'APP_ENV is staging' };
  }
  if (nodeEnv && nodeEnv !== 'production') {
    return { isIndexable: false, reason: `NODE_ENV is ${nodeEnv}` };
  }

  // Fail open: Production is indexable
  return { isIndexable: true, reason: 'production' };
}

function logSeoMode() {
  const mode = getSeoMode();
  console.log(`SEO mode: ${mode.isIndexable ? 'indexable' : 'blocked'} (${mode.reason})`);
}

module.exports = {
  getSeoMode,
  logSeoMode,
};
