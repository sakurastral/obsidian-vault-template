<%*
const file = tp.file.find_tfile(tp.file.path(true));
await app.fileManager.processFrontMatter(file, (frontmatter) => {
  if (!frontmatter["Task：Status"]) {  return; }
  if (frontmatter["Task：Status"] == "[[3 - Archived]]") { new Notice(`This is already archived.`); return; }  
  if (frontmatter["Task：Status"] == "[[2 - Completed]]" || frontmatter["Task：Status"] == "[[2 - Cancelled]]") {
    if (frontmatter["Task：Done"] !== null || frontmatter["Task：Cancelled"] !== null) {
	  frontmatter["Task：Status"] = "[[3 - Archived]]";
      frontmatter["Task：Archived"] = tp.date.now("YYYY-MM-DDTHH:mm:ssZ");
	} else {
      new Notice(`Missing task complete or cancel time`)
    }
  } else {
    new Notice(`Task is not finished yet`)
  }
});
-%>
<%*
	tp.hooks.on_all_templates_executed(async() => {
	  const title = tp.file.title
	   if (frontmatter["Task：Status"] == "[[3 - Archived]]") {
	     await tp.file.move("/Task/Archived/" + title)
	   }
	});
-%>