$(document).ready(function(){

    // testimonials
    $('#main blockquote').each((idx,item) => {
        item = $(item);
        const
          contentPl = item.find('.content.pl'),
          contentEn = item.find('.content.en'),
          switchPl = item.find('.language .pl'),
          switchEn = item.find('.language .en'),
          displayPl = () => {
            contentEn.hide();
            contentPl.show();
          },
          displayEn = () => {
            contentPl.hide();
            contentEn.show();
          };
      
        switchPl.click(displayPl);
        switchEn.click(displayEn);
        displayEn();
      });
});
