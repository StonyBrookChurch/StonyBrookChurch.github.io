import GhostContentAPI from '@tryghost/content-api';

const { GHOST_URL, GHOST_API_KEY } = import.meta.env;

// Create API instance with site credentials
export const ghostClient = new GhostContentAPI({
    url: GHOST_URL,
    key: GHOST_API_KEY,
    version: 'v5.0',
});