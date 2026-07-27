<%*  
const file = tp.file.find_tfile(tp.file.path(true));  
await app.fileManager.processFrontMatter(file, (frontmatter) => {  
  if (!frontmatter["task-status"]) {  new Notice(`This is not a Task`); return; }  
  if (frontmatter["task-status"] == "[[Archived]]") { new Notice(`This is already archived.`); return; }  
  frontmatter["task-status"] = "[[In Progress]]";  
  frontmatter["task-cancelled"] = null;  
  frontmatter["task-done"] = null;  
  frontmatter["task-archived"] = null;  
});  
-%>