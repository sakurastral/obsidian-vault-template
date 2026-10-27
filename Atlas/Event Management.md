---
title: Event Management
banner: "[[default-cover.png]]"
created: 2026-04-25T18:52:56+08:00
modified: 2026-09-06T15:23:14+08:00
aliases:
description:
categories:
  - "[[Vault Management]]"
status: "[[Path]]"
parent:
related:
references:
sort-order: 3
tags:
---

```base
filters:
  and:
    - file.folder == "Calendar"
views:
  - type: list
    name: List
  - type: calendar-note-month
    name: View
    order:
      - file.name
      - calendar-event-title
    startProperty: note.calendar-event-start
    endProperty: note.calendar-event-end
    titleProperty: note.calendar-event-title
    typeProperty: note.calendar-event-type

```
