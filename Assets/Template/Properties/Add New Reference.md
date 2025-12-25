<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm('create-reference-link');
const data = result.getData();
const site = data.site ? data.site + " - " : "";
const author = data.author ? data.author + " - " : "";
const linkName = data.pagetitle;
const linkUrl = data.url;

const combine = "[" + site + author + linkName + "](" + linkUrl + ")"

const file = tp.file.find_tfile(tp.file.path(true));
await app.fileManager.processFrontMatter(file, (frontmatter) => {
  // From Gemini
  if (!frontmatter["references"]) {  
    frontmatter["references"] = [];  // Ensure 'tags' property exists and is an array
  } else if (!Array.isArray(frontmatter["references"])) {  
    frontmatter["references"] = [frontmatter["references"]];  // Handle cases where 'tags' might not be an array (e.g., a single string)  
  }
  if (linkUrl && linkName) { frontmatter["references"].push(combine); }
});
-%>