---
cover:
title: Vault Property Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2025-12-16T08:38:43+08:00
modified: 2026-04-06T16:41:57+08:00
process:
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