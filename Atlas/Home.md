---
cover: "[[default-home-cover.png]]"
title: Home
aliases:
categories:
  - "[[Vault Management]]"
tags:
description:
created: 2024-09-30T14:29:33+08:00
modified: 2026-06-13T16:38:40+08:00
status:
parent:
related:
references:
---

```base
filters:
  and:
    - file.folder == "Atlas"
    - file.name != this.file.name
views:
  - type: cards
    name: View
    cardSize: 250
    image: note.cover
    imageAspectRatio: 0.45

```

```base
views:
  - type: table
    name: 最近新增
    sort:
      - property: created
        direction: DESC
    limit: 10

```
