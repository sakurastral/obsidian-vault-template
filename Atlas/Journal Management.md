---
cover: "[[default-atlas-cover.png]]"
title: Journal Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
description:
created: 2025-12-16T08:38:43+08:00
modified: 2026-06-13T16:38:40+08:00
status:
parent:
related:
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
  weekday: date(file.basename).format("ddd")
properties:
  formula.date:
    displayName: Date
  formula.weekday:
    displayName: Day
views:
  - type: table
    name: Current
    filters:
      and:
        - file.basename.contains(now().date().format("YYYY"))
    order:
      - formula.date
      - formula.weekday
      - description
    sort:
      - property: file.basename
        direction: DESC
  - type: table
    name: Past
    filters:
      and:
        - '!file.basename.contains(now().date().format("YYYY"))'
    order:
      - formula.date
      - formula.weekday
      - description
    sort:
      - property: file.basename
        direction: DESC
  - type: table
    name: All
    order:
      - formula.date
      - formula.weekday
      - description

```

