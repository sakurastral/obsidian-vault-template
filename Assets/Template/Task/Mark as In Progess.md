<%*  
const file = tp.file.find_tfile(tp.file.path(true));  
await app.fileManager.processFrontMatter(file, (frontmatter) => {  
  if (!frontmatter["Task：Status"]) {  new Notice(`This is not a Task`); return; }  
  if (frontmatter["Task：Status"] == "[[3 - Archived]]") { new Notice(`This is already archived.`); return; }  
  frontmatter["Task：Status"] = "[[1 - In Progress]]";  
  frontmatter["Task：Cancelled"] = null;  
  frontmatter["Task：Done"] = null;  
  frontmatter["Task：Archived"] = null;  
});  
-%>