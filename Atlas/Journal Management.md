---
cover:
title: Journal Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2025-12-16T08:38:43+08:00
modified: 2025-12-19T11:15:07+08:00
parent:
references:
---

```base
filters:
  and:
    - file.folder.startsWith("Project/Journal")
formulas:
  date: |-
    link(
    file, 
    date(file.basename).format("YYYY / MM / DD")
    )
properties:
  note.tags:
    displayName: Tags
  formula.date:
    displayName: 日期
views:
  - type: table
    name: Current
    filters:
      and:
        - file.folder.contains(now().date().format("YYYY"))
    order:
      - formula.date
      - tags
    sort:
      - property: file.basename
        direction: DESC
    columnSize:
      formula.date: 180
  - type: table
    name: Past
    filters:
      and:
        - '!file.folder.contains(now().date().format("YYYY"))'
    order:
      - formula.date
      - tags
    sort:
      - property: file.basename
        direction: DESC
    columnSize:
      formula.date: 180

```