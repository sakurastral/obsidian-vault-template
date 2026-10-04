<%*
let title = tp.file.title;

if (title.startsWith("Untitled")) {
    const customTitle = await tp.file.include(
        tp.file.find_tfile("Change Note Name")
    );
}

tp.hooks.on_all_templates_executed(async () => {
    const file = tp.config.target_file;

    if (!file) return;

    await tp.app.fileManager.processFrontMatter(file, (frontmatter) => {
        const cover = frontmatter.cover;

        if (
            cover == null ||
            (typeof cover === "string" && cover.trim() === "")
        ) {
            frontmatter.cover = "[[default-note-cover.png]]";
        }
    });
});
-%>