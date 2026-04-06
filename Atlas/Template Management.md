---
cover:
title: Template Management
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
    - file.folder.startsWith("Assets/Template")
    - file.folder.startsWith("Assets/Scripts")
views:
  - type: table
    name: View
    groupBy:
      property: file.ext
      direction: DESC
    order:
      - file.folder
      - file.name
    sort:
      - property: file.path
        direction: ASC
    columnSize:
      file.folder: 234

```