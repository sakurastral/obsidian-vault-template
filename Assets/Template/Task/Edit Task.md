<%* let title = tp.file.title _%>
<%*   
	let content = tp.frontmatter["Task：Content"] ?? "";  
	let status = tp.frontmatter["Task：Status"]?.replace(/[\[\]]/g, "") ?? "[[Backlog]]".replace(/[\[\]]/g, "");  
	let priority = tp.frontmatter["Task：Priority"] ?? undefined;  
	let start = tp.frontmatter["Task：Scheduled(Start)"] ?? "";  
	let end = tp.frontmatter["Task：Scheduled(End)"] ?? "";  
    let due = tp.frontmatter["Task：Due"] ?? tp.date.now("YYYY-MM-DDT17:00");
	
	let values = {
		content, 
		due, 
		status,
		...priority,
		start,
		end,
	}
	
	const modalForm = app.plugins.plugins.modalforms.api;  
	const formResult = await modalForm.openForm('add-new-task', { values });  
	
	if (formResult.status !== "ok") {
		return; // Stop script execution
	}
	const data = formResult.getData();  
	if(formResult.status === "ok"){    
		content = data.content;  
		due = data.due;  
		status = "[[" + data.status + "]]";  
		priority = data.priority ?? undefined;  
		start = data.start ?? "";  
		end = data.end ?? "";  
	}  
	const file = tp.file.find_tfile(tp.file.path(true));  
	const add = await app.fileManager.processFrontMatter(file, (frontmatter) => {  
		if(formResult.status === "ok"){  
		    frontmatter["Task：Content"] = content;  
		    frontmatter["Task：Status"] =  status;  
		    if (priority) { frontmatter["Task：Priority"] = priority;  }
		    frontmatter["Task：Scheduled(Start)"] = start;  
		    frontmatter["Task：Scheduled(End)"] = end;  
		    frontmatter["Task：Due"] =  due;  
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