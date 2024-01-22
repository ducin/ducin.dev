const absoluteUrl = (path = '') =>
    `https://ducin.dev${path.length > 0 ? `/${path}` : ''}`

module.exports = {
    absoluteUrl
}
