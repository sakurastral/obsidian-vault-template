<%*
const file = tp.file.find_tfile(tp.file.path(true));
let shouldMove = false;
await app.fileManager.processFrontMatter(file, (frontmatter) => {
  if (!frontmatter["task-status"]) {  return; }
  if (frontmatter["task-status"] == "[[Archived]]") { new Notice(`This is already archived.`); return; }  
  if (frontmatter["task-status"] == "[[Completed]]" || frontmatter["task-status"] == "[[Cancelled]]") {
    if (frontmatter["task-done"] !== null || frontmatter["task-cancelled"] !== null) {
	  frontmatter["task-status"] = "[[Archived]]";
      frontmatter["task-archived"] = tp.date.now("YYYY-MM-DDTHH:mm:ssZ");
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