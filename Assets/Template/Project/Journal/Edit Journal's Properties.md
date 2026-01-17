<%*
const file = tp.file.find_tfile(tp.file.path(true));

let type = "";
let nholiday = [];
let makeup = [];
let event = [];
let work = [];

await app.fileManager.processFrontMatter(file, (frontmatter) => {
	type = frontmatter["Day：Type"] ? frontmatter["Day：Type"].toString().replaceAll('[','').replaceAll(']','') : type;
	nholiday = Array.isArray(frontmatter["Day：N-Holiday"]) ? frontmatter["Day：N-Holiday"].map((x)=>x.replaceAll('[','').replaceAll(']','')) : nholiday;
	event = Array.isArray(frontmatter["Day：Events"]) ? frontmatter["Day：Events"].map((x)=>x.replaceAll('[','').replaceAll(']','')) : event;
	makeup = Array.isArray(frontmatter["Day：Makeup"]) ? frontmatter["Day：Makeup"].map((x)=>x.replaceAll('[','').replaceAll(']','')) : makeup;
	work = Array.isArray(frontmatter["Day：Work"]) ? frontmatter["Day：Work"].map((x)=>x.replaceAll('[','').replaceAll(']','')) : work;
});

let values = {
  ...(type && { "day-type": type }),
  ...(nholiday != null && { "national-holidays": nholiday }),
  ...(makeup != null && { "makeup-type": makeup }),
  ...(event != null && { "events": event }),
  ...(work != null && { "work-status": work }),
}

const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm('edit-journal-properties', { values });
const data = result.getData();
if(result.status === "ok"){
	type = `[[${data["day-type"]}]]` ?? type
	nholiday = Array.isArray(data["national-holidays"])
	  ? data["national-holidays"].map(x => `[[${x}]]`)
	  : nholiday;
	makeup = Array.isArray(data["makeup-type"])
	  ? data["makeup-type"].map(x => `[[${x}]]`)
	  : makeup;
	event = Array.isArray(data["events"])
	  ? data["events"].map(x => `[[${x}]]`)
	  : event;
	work = Array.isArray(data["work-status"])
	  ? data["work-status"].map(x => `[[${x}]]`)
	  : work;
	  await app.fileManager.processFrontMatter(file, (frontmatter) => {
		frontmatter["Day：Type"] = type;
		frontmatter["Day：N-Holiday"] = nholiday;
		frontmatter["Day：Makeup"] = makeup;
		frontmatter["Day：Events"] = event;
		frontmatter["Day：Work"] = work;
	});
} else {
    if (file && tp.frontmatter["title"] === undefined) {
        await app.vault.trash(file, true);
        new Notice("Note creation cancelled, file deleted.");
    }
}
-%>