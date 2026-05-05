---
cover: "[[notes-pexels-pnw-prod-8251114.jpg]]"
title: Notes Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2025-12-16T08:38:43+08:00
modified: 2026-04-29T15:15:17+08:00
status:
parent:
references:
---

```base
filters:
  and:
    - file.ext.containsAny("md", "base", "canvas")
    - '!file.folder.startsWith("Project/Journal")'
    - '!file.folder.startsWith("Task")'
    - '!file.folder.startsWith("Assets/Template")'
    - '!file.folder.startsWith("Nexus")'
    - '!file.folder.startsWith("Assets/Settings")'
views:
  - type: table
    name: All
    groupBy:
      property: file.ext
      direction: ASC
    order:
      - file.folder
      - file.name
      - categories
      - tags
    sort:
      - property: categories
        direction: DESC
      - property: file.folder
        direction: ASC
      - property: type
        direction: ASC
      - property: file.name
        direction: DESC
    columnSize:
      file.folder: 256
      file.name: 548
      file.ext: 43
      note.categories: 343
      note.tags: 481
      note.references: 529
  - type: table
    name: Inbox
    filters:
      and:
        - file.folder.startsWith("Inbox")
    order:
      - file.name
      - file.folder
      - categories
    sort:
      - property: file.folder
        direction: ASC

```
