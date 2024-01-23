const postContentTopTpl = ({
  publishedFormattedDate,
  readingTime,
  coverImage,
  githubURL
}) => {
  const coverImagePart = coverImage ? `
<p class="image-caption">
  <a href="${coverImage.URL}">${coverImage.title}</a> by <a href="${coverImage.authorURL}">${coverImage.author}</a>
</p>` : ''

  return `
${coverImagePart}
<p><em>
  ${publishedFormattedDate}
  • 📚 ${readingTime}
  • <a href="/blog">back to Blog</a>
  • <a href="${githubURL}">edit on Github</a>
</em></p>
`
}

module.exports = {
  postContentTopTpl
}
