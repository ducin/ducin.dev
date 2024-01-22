const { gtmTpl } = require('./gtm-tpl')
const { footerTpl } = require('./footer-tpl')
const { menuTpl } = require('./menu-tpl')

const pageTpl = ({
	head: { title, author, keywords, description, thumbnailURL, canonicalURL, shortcutIconURL },
	tags: { og, twitter },
	body: { topLink, topTitle, content, bottomContent },
	files: { css = [], js = [] } = [],
}) => {
	const jsFiles = new Set([
		'assets/js/jquery.min.js',
		'assets/js/jquery.scrollex.min.js',
		'assets/js/jquery.scrolly.min.js',
		'assets/js/jquery.translate.js',
		'assets/js/skel.min.js',
		'assets/js/util.js',
		'assets/js/main.js',
		// 'assets/js/page-talks.js',
	])
	js.forEach((file) => jsFiles.add(file))

	const cssFiles = new Set([
		'assets/css/main.css',
		'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
	])
	css.forEach((file) => cssFiles.add(file))

	return `<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title>${title}</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="author" content="${author}">
		<meta name="keywords" content="${keywords}">
		<meta name="description" content="${description}">
		<meta name="thumbnail" content="${thumbnailURL}" />
		<link rel="canonical" href="${canonicalURL}">
		<link rel="shortcut icon" href="${shortcutIconURL}">
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		${[...cssFiles].map((file) => `<link rel="stylesheet" href="${file}" />`).join('\n')}
		<style>
		  #main > header {
			background: url("${thumbnailURL}") !important
		  }
		</style>
		${Object.entries(twitter).map(([name, content]) => `<meta name="${name}" content="${content}" />`).join('\n')}
		${Object.entries(og).map(([name, content]) => `<meta property="${name}" content="${content}" />`).join('\n')}
	</head>
	<body>
	${gtmTpl()}
		<div id="page-wrapper">
			<header id="header">
				<h1><a href="/">${topLink}</a></h1>
				<nav id="nav">
					<ul>
						<li class="special">
							<a href="#menu" class="menuToggle"><span>Menu</span></a>
							<div id="menu">
								${menuTpl()}
							</div>
						</li>
					</ul>
				</nav>
			</header>
			<article id="main">
				<header>
					<h2>${topTitle}</h2>
				</header>
				<section class="wrapper style5">
					<div class="inner">
					${content}
					</div>
					${bottomContent ? `<hr />` + bottomContent : ''}
				</section>
			</article>
		${footerTpl()}
		</div>
		${[...jsFiles].map((file) => `<script src="${file}"></script>`).join('\n')}
	</body>
</html>
`
}

module.exports = {
  pageTpl
}
