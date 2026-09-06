---
title: Journal Management
cover: "[[default-journal-cover.png]]"
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
sort-order: 4
tags:
---

```base
filters:
  and:
    - file.folder.startsWith("Journal")
formulas:
  date: |-
    link(
    file, 
    date(file.basename).format("YYYY / MM / DD")
    )
  weekday: date(file.basename).format("ddd")
properties:
  formula.date:
    displayName: 日期
  formula.weekday:
    displayName: 星期
views:
  - type: table
    name: 今年
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
    name: 歷年
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
    name: 全部
    order:
      - formula.date
      - formula.weekday
      - description

```
