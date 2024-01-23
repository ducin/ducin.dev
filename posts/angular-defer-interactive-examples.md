One of the Angular 17 awesome features shipped is the **defer block** which allows to **lazy load components, directives and pipes**, while configuring it on the **template level** via `@defer`.

If you already know the theory and want to **get your hands dirty** with `@defer`, here's an app you can see various usecases and combinations:

# [ducin.github.io/angular-defer](https://ducin.github.io/angular-defer)

<iframe type="text/html" class="youtube"
  src="https://www.youtube.com/embed/NPcpXuaZe30?autoplay=1&origin=https://ducin.dev"
  frameborder="0"></iframe>

See how does application runtime and user interaction trigger `@defer` and what certain bundles get loaded into the browser.

It includes:

- ⚡️ components, directives, pipes
- ⚡️ multiple triggers and their combinations
- ⚡️ practical usecases (🪗 accordion, 📦 npm package and many more)
- ⚡️ analyze with devtools
- ⚡️ explanations included

<iframe type="text/html" class="youtube"
  src="https://www.youtube.com/embed/Kj4IxRa5duI?autoplay=1&origin=https://ducin.dev"
  frameborder="0"></iframe>

Usecases implemented:
- ⚡️ when condition: `@defer (when isVisible) {...}`
- ⚡️ on idle: `@defer (on idle) {...}`
- ⚡️ on viewport: `@defer (on viewport) {...}`
- ⚡️ on interaction: `@defer (on interaction) {...}`
- ⚡️ on hover: `@defer (on hover) {...}`
- ⚡️ on immediate: `@defer (on immediate) {...}`
- ⚡️ on timer: `@defer (on timer(2000ms)) {...}`
- 🪗 accordion: `@defer (on hover(accordion); on timer(5s)) {...}` (**before** accordion section gets clicked)
- 👫 multiple deferrable
- 📦 npm package: `<link rel="modulepreload" href="chunk-BYHJVGJ4.js">`
- 🗃️ nested defer: `@defer (on timer(2s)) { @defer (on interaction) {...} }`
- ⏱️ prefetch: `@defer (on interaction; prefetch on idle) {...}`
- 🚚 loading vs placeholder: `placeholder (minimum 500ms) {...}` & `@loading (minimum 1s; after 10ms) {...}`
- 💥 defer error: `@error {...}`

So open your browser devtools `Network` tab and have a play with the interactive examples 💪
