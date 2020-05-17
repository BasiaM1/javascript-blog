'use strict'; {
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector ', articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optiArticleAuthorSelector = '.post-author';

  //ARTICLE LINKS
  const generateTitleLinks = function (customSelector = '') {
    console.log('function is runnning');

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    // let html = '';

    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element and get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';
      console.log(linkHTML);
      /* insert link into titleList */
      // html = html + linkHTML;
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      // console.log(html);
    }
    // titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();

  //TAGS in ARTICLES
  const generateTags = function () {

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      console.log('taglist', tagsList);

      /* make html variable with empty string */
      // let htmlTag = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        const linkTag =
          '<li><a href="#tag-' +
          tag + '">' + tag + '&nbsp' + '</a></li>';

        /* add generated code to html variable */
        // htmlTag = htmlTag + linkTag;
        // console.log(htmlTag);
        tagsList.insertAdjacentHTML('beforeend', linkTag);
      }
      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */
      // tagsList.innerHTML = htmlTag;
      /* END LOOP: for every article: */
    }
  };
  generateTags();

  const tagClickHandler = function (event) {

    /* prevent default action for this event */
    event.preventDefault();
    console.log('Tag was clicked!');
    console.log(event);

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag', tag);

    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"');
    console.log('tagLinks', tagLinks);

    /* START LOOP: for each active tag link */
    for (let tagLink of tagLinks) {

      /* remove class active */
      tagLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]'); //????
    console.log('hrefTagsLinks', hrefTagLinks);

    /* START LOOP: for each found tag link */
    for (let hrefTagLink of hrefTagLinks) {

      /* add class active */
      hrefTagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function () {

    /* find all links to tags */
    const allTagLinks = document.querySelectorAll('a[href^="#tag-"');

    /* START LOOP: for each link */
    for (let allTagLink of allTagLinks) {

      /* add tagClickHandler as event listener for that link */
      allTagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  };
  addClickListenersToTags();

  //AUTHORS in ARTICLES
  const generateAuthors = function () {

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find author wrapper */
      const authorWrapper = article.querySelector(optiArticleAuthorSelector);
      console.log('author wrapper', authorWrapper);

      /* make html variable with empty string */
      // let htmlAuthor = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log('articleAuthor:' + articleAuthor);

      /* generate HTML of the link */
      const linkAuthor =
        '<a href="#author-' +
        articleAuthor + '"> by ' + articleAuthor + '</a>';
      console.log('linkauthor:' + linkAuthor);

      /* add generated code to html variable */
      authorWrapper.insertAdjacentHTML('beforeend', linkAuthor);
    }
  };
  generateAuthors();

  const authorClickHandler = function (event) {

    /* prevent default action for this event */
    event.preventDefault();
    console.log('Author was clicked!');
    console.log(event);

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href', href);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log('author', author);

    /* find all author links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author"');
    console.log('authorLinks', authorLinks);

    /* START LOOP: for each active tag link */
    for (let authorLink of authorLinks) {

      /* remove class active */
      authorLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]'); //????
    console.log('hrefAuthorLinks', hrefAuthorLinks);

    /* START LOOP: for each found tag link */
    for (let hrefAuthorLink of hrefAuthorLinks) {

      /* add class active */
      hrefAuthorLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function () {

    /* find all links to authors */
    const authorLinks = document.querySelectorAll('.post-author a');

    /* START LOOP: for each link */
    for (let authorLink of authorLinks) {

      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
}
