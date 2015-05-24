var customRenderMarkdown = function (string) {
  var initialResult = marked(string);

  return initialResult.replace(/<code>\$(.*?)\$<\/code>/g, function(x,y) { 
    return katex.renderToString(y); 
  });
};
