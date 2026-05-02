---
calendar-event-title:
calendar-event-start:
calendar-event-end:
calendar-event-type:
categories:
  - "[[Journal]]"
status: "[[Tree]]"
---
<%* if (tp.file.title.includes("Untitled")) { %>
![[Event Information Board.base#Basic|no-toolbar]]

![[Event Information Board.base#Title|no-toolbar]]
<%* } %>
<%* let title = tp.file.title -%>
<%* 
	if( !title ) { title = "" }  

	let values = {
		title: tp.frontmatter["calendar-event-title"] ?? "",
		type: tp.frontmatter["calendar-event-type"]?.replace("[[", "").replace("]]", "") ?? "",
		start: tp.frontmatter["calendar-event-start"] ?? "",
		end: tp.frontmatter["calendar-event-end"] ?? "",
	}
	const modalForm = app.plugins.plugins.modalforms.api;  
	const formResult = await modalForm.openForm('edit-calendar-event', { values });  
	const data = formResult.getData();  
	let content = data.title ?? "";  
	let scope = data.type? "[["+data.type+"]]" : "";  
	let start = data.start ?? "";
	let end = (data.end || data.end !== "") ? data.end : (data.start ?? "");
	let end2 = (start !== end && data.end !== "") ? "～" + end : "";
	
	title = start + end2 + "《" + content + "》"; 
	title = tp.obsidian.stripHeading(title);  
	title = tp.obsidian.stripHeadingForLink(title); 
	if(formResult.status === "ok"){
	  await tp.file.rename(title); 
	}
_%>
<%* 
const file = tp.file.find_tfile(tp.file.path(true));  
const add = await app.fileManager.processFrontMatter(file, (frontmatter) => {  
	if(formResult.status === "ok"){
	    frontmatter["calendar-event-type"] = scope;
		frontmatter["calendar-event-title"] = content;
		frontmatter["calendar-event-start"] = start;
		frontmatter["calendar-event-end"] = end;
	}
});  
-%>
<%*
	tp.hooks.on_all_templates_executed(async() => {
	  const file = tp.file.find_tfile(tp.file.path(true));
	  await app.workspace.activeLeaf.openFile(file);
	  await app.commands.executeCommandById("obsidian-linter:lint-file"); 
	});
-%>