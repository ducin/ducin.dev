const footerTpl = () => `
<footer id="footer">
  <ul class="icons">
    <li><a target="_blank" href="/feed.xml" class="icon fa-rss" aria-label="RSS feed"><span class="label">RSS</span></a></li>
    <li><a target="_blank" href="https://twitter.com/tomasz_ducin" class="icon fa-twitter" aria-label="twitter link"><span class="label">Twitter</span></a></li>
    <li><a target="_blank" href="https://www.youtube.com/@DucinDev" class="icon fa-youtube-play" aria-label="youtube channel link"><span class="label">Videos</span></a></li>
    <!-- <li><a target="_blank" href="https://slides.com/ducin" class="icon fa-slideshare" aria-label="slides link"><span class="label">Slides</span></a></li> -->
    <li><a target="_blank" href="https://github.com/ducin" class="icon fa-github" aria-label="github link"><span class="label">Github</span></a></li>
    <!-- <li><a target="_blank" href="https://stackoverflow.com/users/769384/ducin" class="icon fa-stack-overflow" aria-label="stackoverflow link"><span class="label">Stack Overflow</span></a></li> -->
    <li><a target="_blank" href="https://www.linkedin.com/pub/tomasz-ducin/4b/34a/822" class="icon fa-linkedin" aria-label="linkedin link"><span class="label">LinkedIn</span></a></li>
    <li><a href="mailto:tomasz@ducin.dev" class="icon fa-envelope-o" aria-label="write me a message"><span class="label">Email</span></a></li>
  </ul>
  <ul class="copyright">
    <li>&copy; Ducin.DEV Consulting <span id="year">2024</span></li>
    <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
  </ul>
</footer>
`

module.exports = {
  footerTpl
}
