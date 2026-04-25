<%*
const file = tp.file.find_tfile(tp.file.path(true));
await app.fileManager.processFrontMatter(file, (frontmatter) => {
  if (!frontmatter["Task：Status"]) {  new Notice(`This is not a Task`); return; }
  if (frontmatter["Task：Status"] == "[[Archived]]") { new Notice(`This is already archived.`); return; }  
  frontmatter["Task：Status"] = "[[Completed]]";
  frontmatter["Task：Done"] = tp.date.now("YYYY-MM-DDTHH:mm:ssZ");
  frontmatter["Task：Cancelled"] = null;
  frontmatter["Task：Archived"] = null;
});
-%>