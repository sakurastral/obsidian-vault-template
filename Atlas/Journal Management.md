---
cover:
title: Journal Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2025-12-16T08:38:43+08:00
modified: 2026-04-06T16:41:57+08:00
status:
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
  weekday: date(file.basename).format("dd")
properties:
  note.tags:
    displayName: Tags
  formula.date:
    displayName: Date
  formula.weekday:
    displayName: Week day
views:
  - type: table
    name: Current
    filters:
      and:
        - file.folder.contains(now().date().format("YYYY"))
    order:
      - formula.date
      - formula.weekday
      - tags
    sort:
      - property: file.basename
        direction: DESC
    columnSize:
      formula.date: 123
      formula.weekday: 29
      note.tags: 155
  - type: table
    name: Past
    filters:
      and:
        - '!file.folder.contains(now().date().format("YYYY"))'
    order:
      - formula.date
      - formula.weekday
      - tags
    sort:
      - property: file.basename
        direction: DESC
    columnSize:
      formula.date: 123
      formula.weekday: 29
      note.tags: 155
  - type: table
    name: View
    order:
      - file.name
      - journal
```