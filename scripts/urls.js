const absoluteUrl = (path = '') => {
    const baseURL = 'https://ducin.dev'
    if (path == '' || path == '/') {
        return baseURL;
    }
    const slashOrNot = path.startsWith('/') ? '' : '/'
    return `https://ducin.dev${path.length > 0 ? `${slashOrNot}${path}` : ''}`
}

module.exports = {
    absoluteUrl
}
