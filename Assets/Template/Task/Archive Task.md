<%*
const file = tp.file.find_tfile(tp.file.path(true));
let shouldMove = false;
await app.fileManager.processFrontMatter(file, (frontmatter) => {
  if (!frontmatter["Task：Status"]) {  return; }
  if (frontmatter["Task：Status"] == "[[Archived]]") { new Notice(`This is already archived.`); return; }  
  if (frontmatter["Task：Status"] == "[[Completed]]" || frontmatter["Task：Status"] == "[[Cancelled]]") {
    if (frontmatter["Task：Done"] !== null || frontmatter["Task：Cancelled"] !== null) {
	  frontmatter["Task：Status"] = "[[Archived]]";
      frontmatter["Task：Archived"] = tp.date.now("YYYY-MM-DDTHH:mm:ssZ");
	  shouldMove = true;
	} else {
      new Notice(`Missing task complete or cancel time`)
    }
  } else {
    new Notice(`Task is not finished yet`)
  }
});
-%>
<%*
if (shouldMove) {
  const title = tp.file.title;
  const newPath = `/Task/Archived/${title}`;
  
  setTimeout(async () => {
    await tp.file.move(newPath);
    new Notice("Task archived and moved.");
  }, 200);
}
-%>