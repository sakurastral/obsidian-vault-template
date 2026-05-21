<%*
let title = tp.file.title;
let prefix = "";

const prefixFolderPath = "Nexus/Title Prefix";

if (title.includes("【") || title.includes("】")) {
    const folder = app.vault.getAbstractFileByPath(prefixFolderPath);
    if (folder && folder.children && folder.children.length > 0) {
        const files = folder.children
            .filter(f => f instanceof tp.obsidian.TFile)
            .sort((a, b) => a.name.localeCompare(b.name));
        prefix = files[0].basename; 
    } else {
        prefix = "NOTE｜";
    }
    title = title.replace(/【.*?】/g, "").trim();
} else if (title.includes("｜")) {
    let parts = title.split("｜");
    prefix = parts[0] + "｜";
    title = parts.slice(1).join("｜").trim();
} else {
    prefix = "";
    title = title;
}

let values = {
    prefix, 
    title,
}

const modalForm = app.plugins.plugins.modalforms.api;
const formResult = await modalForm.openForm('edit-note-title', { values });
const data = formResult.getData();

if (data && data.title) {
    title = (data.prefix ?? "") + data.title;
}

title = tp.obsidian.stripHeadingForLink(title);
title = tp.obsidian.stripHeading(title);

let counter = 1;
let baseTitle = title;
while (await tp.file.exists(`${tp.file.folder(true)}/${title}.md`) && title !== tp.file.title) {
    title = `${baseTitle}_${counter}`;
    counter++;
}

await tp.file.rename(title);  
-%>
<%*
    tp.hooks.on_all_templates_executed(async() => {
      const file = tp.file.find_tfile(tp.file.path(true));
      await app.workspace.activeLeaf.openFile(file);
      await app.commands.executeCommandById("obsidian-linter:lint-file"); 
    });
-%>