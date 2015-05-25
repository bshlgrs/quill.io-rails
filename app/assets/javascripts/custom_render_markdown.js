var customRenderMarkdown = function (string) {
  try {
    var initialResult = marked(string);  
  }
  catch (err) {
    initialResult = string;
  }

  return initialResult.replace(/<pre><code>\$(.*?)\$\n<\/code><\/pre>/g, function(match, string) {
    try {
      return katex.renderToString(string, { displayMode: true });
    }
    catch (err) {
      console.error("this thing is broken");
      console.error(err);
      return string;
    }
  }).replace(/<code>\$(.*?)\$<\/code>/g, function(match, string) { 
    try {
      return katex.renderToString(string, { displayMode: false });
    }
    catch (err) {
      console.error("this thing is broken");
      console.error(err);
      return string;
    }
  });
};
