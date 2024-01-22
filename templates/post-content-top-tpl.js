const postContentTopTpl = ({
  publishedFormattedDate,
  readingTime,
  coverImage
}) => {
  const coverImagePart = coverImage ? `
<p class="image-caption">
  <a href="${coverImage.URL}">${coverImage.title}</a> by <a href="${coverImage.authorURL}">${coverImage.author}</a>
</p>` : ''

  return `
${coverImagePart}
<p><em>
  ${publishedFormattedDate} • 📚 ${readingTime} read
</em></p>
`
}

module.exports = {
  postContentTopTpl
}
