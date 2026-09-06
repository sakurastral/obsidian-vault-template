---
title: Template Management
cover: "[[default-atlas-cover.png]]"
created: 2025-12-16T08:38:43+08:00
modified: 2026-09-06T15:23:14+08:00
aliases:
description:
categories:
  - "[[Vault Management]]"
status:
parent:
related:
references:
sort-order: 8
tags:
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
  - type: table
    name: Cover Management
    filters:
      and:
        - file.ext == "md"
    order:
      - file.name
      - cover
    sort:
      - property: cover
        direction: ASC

```
