const postContentTopTpl = ({
  publishedFormattedDate,
  readingTime,
  coverImage
}) => {
    return `
<p class="image-caption">
  <a href="${coverImage.URL}">${coverImage.title}</a> by <a href="${coverImage.authorURL}">${coverImage.author}</a>
</p>

<p><em>
  ${publishedFormattedDate} • 📚 ${readingTime} read
</em></p>
`
}

module.exports = {
  postContentTopTpl
}
