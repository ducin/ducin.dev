const testimonials = require('../data/testimonials.json');

const testimonialTpl = ({content, author, role, city, date}) =>
`<blockquote>
    <span class="language">(
        <a class="en" title="translated to English">en</a> |
        <a class="pl" title="original in Polish">pl</a>
    )</span>
    <span class="content pl hidden"><p>${content.pl.replace(/\r\n/g, '</p>\r\n<p>')}</p></span>
    <span class="content en"><p>${content.en.replace(/\r\n/g, '</p>\r\n<p>')}</p></span>
    <span class="author">
        ${author}, ${role} (${city}, ${date})
    </span>
</blockquote>`;

let testimonialsHTML = testimonials.map(testimonialTpl).join('\n');
console.log(testimonialsHTML);
