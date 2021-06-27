import LRU from 'lru-cache'


// To be used everywhere, not as a middleware
export const cacheContext = {
  cache: new LRU({
    max: parseInt(process.env.CACHE_MAX_SIZE),
    maxAge: parseInt(process.env.CACHE_MAX_AGE_IN_S) * 1000,
  })
}

// To be used as a wrapper of (req, res) => {} functions, as a middleware
const cacheMiddleware = handler => (req, res) => {
  req.cache = cacheContext.cache
 
  return handler(req, res)
}
 
export default cacheMiddleware