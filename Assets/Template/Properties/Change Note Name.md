<%*
const originalTitle = tp.file.title;

let titleContent = originalTitle;
let originalPrefix = "";
let author = "";
let detectedFormat = "prefix";

const prefixFolderPath = "Nexus/Title Prefix";

// ─────────────────────────────
// 解析目前標題
// ─────────────────────────────

let match = originalTitle.match(/^剪藏《(.+?)》作者：(.+)$/);

if (match) {
    detectedFormat = "clip-author";
    titleContent = match[1].trim();
    author = match[2].trim();
} else if ((match = originalTitle.match(/^剪藏《(.+?)》$/))) {
    detectedFormat = "clip";
    titleContent = match[1].trim();
} else if ((match = originalTitle.match(/^(【.*?】)(.*)$/))) {
    detectedFormat = "prefix";
    originalPrefix = match[1];
    titleContent = match[2].trim();
} else if (originalTitle.includes("｜")) {
    detectedFormat = "prefix";

    const parts = originalTitle.split("｜");

    originalPrefix = parts[0] + "｜";
    titleContent = parts.slice(1).join("｜").trim();
}

// ─────────────────────────────
// 取得 Prefix 選項
// ─────────────────────────────

const folder = app.vault.getAbstractFileByPath(prefixFolderPath);

let prefixes = [];

if (folder?.children) {
    prefixes = folder.children
        .filter(f => f instanceof tp.obsidian.TFile)
        .map(f => f.basename)
        .sort((a, b) => a.localeCompare(b));
}

if (
    originalPrefix &&
    !prefixes.includes(originalPrefix)
) {
    prefixes.unshift(originalPrefix);
}

// ─────────────────────────────
// 標題設定流程
// ─────────────────────────────

let finalTitle = null;

while (true) {
    let prefix = originalPrefix;
    let format = detectedFormat;

    // ─────────────────────────
    // 選擇格式
    // ─────────────────────────

    const formatOptions = [
        {
            label: "一般標題",
            value: "prefix"
        },
        {
            label: "剪藏《標題》",
            value: "clip"
        },
        {
            label: "剪藏《標題》作者：作者",
            value: "clip-author"
        }
    ];

    // 把目前格式放第一個
    formatOptions.sort((a, b) => {
        if (a.value === detectedFormat) return -1;
        if (b.value === detectedFormat) return 1;
        return 0;
    });

    const selectedFormat = await tp.system.suggester(
        formatOptions.map(item => item.label),
        formatOptions.map(item => item.value),
        false,
        "選擇標題格式",
        undefined,
        detectedFormat
    );

    // Esc / Cancel
    if (selectedFormat === null) {
        return;
    }

    format = selectedFormat;

    // ─────────────────────────
    // 選擇 Prefix
    // ─────────────────────────

    if (format === "prefix") {
        const noPrefixLabel = "（無前綴）";

        const selectedPrefix = await tp.system.suggester(
            [noPrefixLabel, ...prefixes],
            ["", ...prefixes],
            false,
            "選擇標題前綴",
            undefined,
            originalPrefix
        );

        if (selectedPrefix === null) {
            return;
        }

        prefix = selectedPrefix;
    }

    // ─────────────────────────
    // 輸入標題
    // ─────────────────────────

    const inputTitle = await tp.system.prompt(
        "修改筆記標題",
        titleContent,
        false,
        false,
        true
    );

    if (inputTitle === null) {
        return;
    }

    if (!inputTitle.trim()) {
        continue;
    }

    const newTitleContent = inputTitle.trim();

    // ─────────────────────────
    // 輸入作者
    // ─────────────────────────

    let newAuthor = author;

    if (format === "clip-author") {
        const inputAuthor = await tp.system.prompt(
            "作者",
            author,
            false,
            false,
            true
        );

        if (inputAuthor === null) {
            return;
        }

        if (!inputAuthor.trim()) {
            continue;
        }

        newAuthor = inputAuthor.trim();
    }

    // ─────────────────────────
    // 組合標題
    // ─────────────────────────

    let previewTitle;

    switch (format) {
        case "clip":
            previewTitle = `剪藏《${newTitleContent}》`;
            break;

        case "clip-author":
            previewTitle =
                `剪藏《${newTitleContent}》作者：${newAuthor}`;
            break;

        default:
            previewTitle = `${prefix}${newTitleContent}`;
            break;
    }

    previewTitle =
        tp.obsidian.stripHeadingForLink(previewTitle);

    previewTitle =
        tp.obsidian.stripHeading(previewTitle);

    // ─────────────────────────
    // 最後確認
    // ─────────────────────────

    const action = await tp.system.suggester(
        [
            `✓ 套用：${previewTitle}`,
            "↻ 重新設定",
            "✕ 取消"
        ],
        [
            "apply",
            "retry",
            "cancel"
        ],
        false,
        "確認新的筆記標題"
    );

    if (action === null || action === "cancel") {
        return;
    }

    if (action === "retry") {
        // 保留剛才輸入的內容，重新開始
        titleContent = newTitleContent;
        author = newAuthor;
        originalPrefix = prefix;
        detectedFormat = format;

        continue;
    }

    finalTitle = previewTitle;
    break;
}

// ─────────────────────────────
// 避免撞名
// ─────────────────────────────

let counter = 1;
const baseTitle = finalTitle;
const folderPath = tp.file.folder(true);

while (
    await tp.file.exists(
        `${folderPath}/${finalTitle}.md`
    ) &&
    finalTitle !== originalTitle
) {
    finalTitle = `${baseTitle}_${counter}`;
    counter++;
}

// ─────────────────────────────
// Rename
// ─────────────────────────────

if (finalTitle !== originalTitle) {
    await tp.file.rename(finalTitle);
}
-%>

<%*
tp.hooks.on_all_templates_executed(async () => {
    const file = tp.file.find_tfile(
        tp.file.path(true)
    );

    if (file) {
        await app.workspace.activeLeaf.openFile(file);

        await app.commands.executeCommandById(
            "obsidian-linter:lint-file"
        );
    }
});
-%>