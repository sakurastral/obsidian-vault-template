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
  weekday: date(file.basename).format("dd")
properties:
  note.tags:
    displayName: Tags
  formula.date:
    displayName: Date
  formula.weekday:
    displayName: Week day
  note.Day：Type:
    displayName: Type
  note.Day：N-Holiday:
    displayName: National Holiday
  note.Day：Makeup:
    displayName: Makeup Type
  note.Day：Events:
    displayName: Events
  note.Day：Work:
    displayName: Work Status
views:
  - type: table
    name: Current
    filters:
      and:
        - file.folder.contains(now().date().format("YYYY"))
    order:
      - formula.date
      - formula.weekday
      - Day：Type
      - Day：N-Holiday
      - Day：Makeup
      - Day：Events
      - Day：Work
      - tags
    sort:
      - property: file.basename
        direction: DESC
    columnSize:
      formula.date: 123
      formula.weekday: 29
      note.Day：N-Holiday: 158
      note.Day：Makeup: 141
      note.Day：Events: 134
      note.Day：Work: 121
      note.tags: 155
  - type: table
    name: Past
    filters:
      and:
        - '!file.folder.contains(now().date().format("YYYY"))'
    order:
      - formula.date
      - formula.weekday
      - Day：Type
      - Day：N-Holiday
      - Day：Makeup
      - Day：Events
      - Day：Work
      - tags
    sort:
      - property: file.basename
        direction: DESC
    columnSize:
      formula.date: 123
      formula.weekday: 29
      note.Day：N-Holiday: 158
      note.Day：Makeup: 141
      note.Day：Events: 134
      note.Day：Work: 121
      note.tags: 155
  - type: table
    name: View
    order:
      - file.name
      - journal

```