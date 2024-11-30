const { z } = require("zod");

const Post = z.object({
  sourceFile: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  keywords: z.array(z.string()),
  description: z.string(),
  publishedDate: z.string(),
  coverImage: z.object({
    URL: z.string(),
    title: z.string(),
    authorURL: z.string(),
    author: z.string(),
  }).optional(),
  coverImageFilename: z.string(),
  status: z.enum(["PUBLISHED", "DRAFT", "IGNORED"]),
});

const loadPosts = () => {
  const posts = require('../data/posts.json')
  return posts
  .filter(({ status }) => !status.includes("IGNORED"))
  .map(raw => {
    const parsed = Post.parse(raw)
    const githubURL = `https://github.com/ducin/ducin.dev/blob/gh-pages/posts/${raw.sourceFile}.md`

    return {
      ...parsed,
      githubURL
    }
  })
}

module.exports = {
  loadPosts
}
