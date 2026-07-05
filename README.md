# Three Minutes Away Books

This repo now contains only the permanent root activity platform for printed QR-code URLs.

Public URL format:

```text
/?book=BOOKCODE&page=PAGENUMBER
```

Examples:

```text
/?book=oops&page=7
/?book=birds&page=12
```

Important:
- There is no root landing page beyond the app itself.
- The only HTML entry file is `index.html`.
- `index.html` is the app entry for the books subdomain.
- Images should be external URLs inside the page data files.

## Remaining structure

```text
index.html
assets/
  css/
    common.css
    quiz.css
    game1.css
    game2.css
    game3.css
    match.css
  js/
    core/
      loader.js
      router.js
      utils.js
    templates/
      quiz/render.js
      game1/render.js
      game2/render.js
      game3/render.js
      match/render.js
  data/
    _starter-templates/
    oops/
    birds/
    kings/
```

## What each part does

- `index.html`
  The one master runtime page for every QR code URL.

- `assets/js/core/router.js`
  Reads `book` and `page` from the URL, loads the matching page data file, then loads the correct activity renderer.

- `assets/js/core/loader.js`
  Loads page data scripts, renderer scripts, and activity CSS files.

- `assets/js/core/utils.js`
  Shared helper functions used by every activity type.

- `assets/js/templates/{type}/render.js`
  The actual UI and logic for one activity type.
  Example: quiz behavior lives in `templates/quiz/render.js`.

- `assets/css/{type}.css`
  Visual styling for one activity type.
  A CSS file is auto-loaded when that activity type is used.

- `assets/data/{book}/page-{number}.js`
  One printed book page = one data file.
  This is where you will spend most of your time.

- `assets/data/_starter-templates/`
  Copy-paste starter files for authoring content.
  These are not render engines.

## How to create a new quiz page

Example:
Create `/?book=oops&page=7`

1. Copy:
   `assets/data/_starter-templates/quiz-template.js`

2. Save the copy as:
   `assets/data/oops/page-7.js`

3. Edit these top-level fields:
   - `book: "oops"`
   - `page: 7`
   - `title`
   - `type: "quiz"`

4. Edit `payload`:
   - `activityTitle`
   - `completion.title`
   - `completion.message`
   - `questions`

5. For each question, fill:
   - `image`
   - `imageAlt`
   - `question`
   - `correct`
   - `options`

6. Use the final URL:

```text
/?book=oops&page=7
```

You do not need to edit the router or renderer for a normal new quiz page.

## How to create a new page with another existing activity type

Example:
Create a `game3` page for `oops` page 8.

1. Copy:
   `assets/data/_starter-templates/game3-template.js`

2. Save it as:
   `assets/data/oops/page-8.js`

3. Set:
   - `book: "oops"`
   - `page: 8`
   - `type: "game3"`

4. Fill the `payload` fields for that activity.

5. Open:

```text
/?book=oops&page=8
```

Again, you do not need to change the renderer when you are only creating a new page using an existing activity type.

## How to create a brand-new activity type

Example:
You want a new type called `quiz2`.

1. Create a renderer:
   `assets/js/templates/quiz2/render.js`

2. In that file, register the renderer as:

```js
window.BookPlatform.templates.quiz2 = function renderQuiz2(context) {
  const { mount, pageData, platform } = context;
  mount.innerHTML = "";
  // Build the activity UI here.
};
```

3. Create its CSS file:
   `assets/css/quiz2.css`

4. Create an authoring starter file:
   `assets/data/_starter-templates/quiz2-template.js`

5. In that starter file, use:
   `type: "quiz2"`

6. Create actual page files such as:
   `assets/data/oops/page-9.js`

7. In that page file, set:
   `type: "quiz2"`

8. Open:

```text
/?book=oops&page=9
```

Notes:
- You do not need to edit `index.html` for a new activity type now.
- The router will load `templates/quiz2/render.js`.
- The loader will also try to load `css/quiz2.css`.

## Rules to follow when adding content

- Keep book codes lowercase in URLs and page files.
- Keep one file per printed page.
- Do not create separate HTML files per page.
- Put all page content inside the page data file.
- Use external image URLs directly in `image`.
- If you later want audio, use external audio URLs in the page payload as well.

## Sample page files already present

- `assets/data/oops/page-1.js`
- `assets/data/oops/page-2.js`
- `assets/data/oops/page-3.js`
- `assets/data/birds/page-1.js`
- `assets/data/birds/page-2.js`

## Hosting note

For GitHub Pages with your custom domain, the important live entry path remains:

```text
https://books.threeminutesaway.com/?book=oops&page=1
```
