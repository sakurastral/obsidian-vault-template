---
cover:
title: Vault Property Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2025-12-16T08:38:43+08:00
modified: 2026-04-20T11:26:14+08:00
status:
parent:
references:
---

```base
filters:
  or:
    - file.folder.startsWith("Nexus")
    - file.folder.startsWith("Assets/Settings")
formulas:
  hasNoParent: parent.isEmpty()
views:
  - type: table
    name: All
    groupBy:
      property: formula.hasNoParent
      direction: DESC
    order:
      - categories
      - file.folder
      - file.name
      - parent
    sort:
      - property: categories
        direction: ASC
      - property: file.folder
        direction: ASC
    columnSize:
      note.categories: 144
      file.folder: 263
      file.name: 385

```

## Status

| 序   | 階段名稱           | 說明                         |
| --- | -------------- | -------------------------- |
| 01  | [[Seedling]]   | 初步構思、零散靈感或僅有標題的占位筆記        |
| 02  | [[Sapling]]    | 筆記內容正在被豐富或大量更新             |
| 03  | [[Tree]]       | 筆記內容詳實、邏輯自洽，已轉化為可隨時調用的可靠知識 |
| A   | [[Path]]       | 用於快速指引或導覽至特定筆記，如MOC類筆記     |
| B   | [[Wildflower]] | 節錄或來自外部的資料及筆記              |
