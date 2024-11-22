# Expo PDF Viewer

It generally works, but I would rather there being a single PDF renderer WebView that we pass data to. The usage I would
want would something like this

```typescript
const currentPage = 2;
const [pdfInfo, error] = usePdf('http://sample.com/example.pdf', currentPage);
pdfInfo.localImageUri; // has the image
pdfInfo.totalPages; // total number of pages
pdfInfo.width;
pdfInfo.height;
pdfInfo.scale;
pdfInfo.uri = 'http://sample.com/example.pdf';
pdfInfo.pageNumber = currentPage;
```

The default React Context would dynamically create a new WebView and show a warning saying it's a bad idea to do that
and to wrap it in a context that would provide a single WebView to handle this.

That's a future weekend project, but at least the hypothesis works in that PDFJS can run in a WebView and we can extract
an Image representing the result.
