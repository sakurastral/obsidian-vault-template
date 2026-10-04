<%*
const originalTitle = tp.file.title;
const prefixFolderPath = "Nexus/Title Prefix";
let titleContent = originalTitle;
let selectedPrefix = "";
let author = "";

// 前綴選項來自資料夾內的筆記檔名。
const folder = app.vault.getAbstractFileByPath(prefixFolderPath);
const prefixes = [...new Set((folder?.children ?? [])
    .filter(f => f instanceof tp.obsidian.TFile && f.extension === "md")
    .map(f => f.basename))]
    .sort((a, b) => a.localeCompare(b));

// 相容舊剪藏格式，重新套用時轉成 CLIP｜標題 by 作者。
const oldClip = originalTitle.match(/^剪藏《(.+?)》(?:作者：\s*(.*))?$/);
if (oldClip) {
    selectedPrefix = "CLIP｜";
    titleContent = oldClip[1].trim();
    author = (oldClip[2] ?? "").trim();
} else {
    const knownPrefix = [...prefixes].sort((a, b) => b.length - a.length)
        .find(prefix => originalTitle.startsWith(prefix));
    const legacyPrefix = originalTitle.match(/^(【.*?】|[^｜]+｜)/)?.[1];
    selectedPrefix = knownPrefix ?? legacyPrefix ?? "";
    titleContent = originalTitle.slice(selectedPrefix.length).trim();

    // 僅 CLIP 將最後一個「 by 」視為作者分隔符。
    if (selectedPrefix === "CLIP｜") {
        const separator = titleContent.lastIndexOf(" by ");
        if (separator > 0) {
            author = titleContent.slice(separator + 4).trim();
            titleContent = titleContent.slice(0, separator).trim();
        }
    }
}

while (true) {
    const options = ["", ...prefixes];
    // 目前的前綴優先顯示；不新增資料夾以外的選項。
    const currentIndex = options.indexOf(selectedPrefix);
    if (currentIndex > 0) options.unshift(...options.splice(currentIndex, 1));

    const prefix = await tp.system.suggester(
        options.map(value => value || "（無前綴）"),
        options, false, "選擇標題前綴"
    );
    if (prefix == null) return;
    selectedPrefix = prefix;

    const inputTitle = await tp.system.prompt(
        `標題內容（不含前綴${prefix === "CLIP｜" ? `；CLIP 作者於下一步填寫` : ""}）`,
        titleContent, false, false
    );
    if (inputTitle == null) return;
    titleContent = inputTitle.trim();
    if (!titleContent) {
        new tp.obsidian.Notice("標題內容不可空白，請重新設定。");
        continue;
    }

    if (prefix === "CLIP｜") {
        const inputAuthor = await tp.system.prompt(
            "作者（選填，留空即不加上 {by 作者} ）", author, false, false
        );
        if (inputAuthor == null) return;
        author = inputAuthor.trim();
    }

    const baseTitle = `${prefix}${titleContent}${prefix === "CLIP｜" && author ? ` by ${author}` : ""}`;
    // 避免路徑分隔符及跨平台不合法檔名；不默默刪除標題文字。
    if (/[\\/:*?"<>|\u0000-\u001f]/.test(baseTitle) || /[. ]$/.test(baseTitle) || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(baseTitle)) {
        new tp.obsidian.Notice('標題含有不適合檔名的字元或名稱，請修改後再試。可使用全形標點。');
        continue;
    }

    // 在確認前處理同資料夾的撞名，預覽即為實際套用名稱。
    const folderPath = tp.file.folder(true).replace(/^\/+|\/+$/g, "");
    const pathFor = name => `${folderPath ? `${folderPath}/` : ""}${name}.md`;
    let finalTitle = baseTitle;
    let counter = 1;
    while (finalTitle !== originalTitle && await tp.file.exists(pathFor(finalTitle))) {
        finalTitle = `${baseTitle}_${counter++}`;
    }

    const action = await tp.system.suggester(
        [`✓ 套用：${finalTitle}`, "↻ 重新設定", "✕ 取消"],
        ["apply", "retry", "cancel"], false, "確認新的筆記標題"
    );
    if (action == null || action === "cancel") return;
    if (action === "retry") continue;

    if (finalTitle !== originalTitle) await tp.file.rename(finalTitle);

    // 套用後保留原本的重新開啟與 Linter 流程。
    const file = tp.file.find_tfile(tp.file.path(true));
    tp.hooks.on_all_templates_executed(async () => {
        if (file && app.workspace.activeLeaf) {
            await app.workspace.activeLeaf.openFile(file);
            await app.commands.executeCommandById("obsidian-linter:lint-file");
        }
    });
    break;
}
-%>
