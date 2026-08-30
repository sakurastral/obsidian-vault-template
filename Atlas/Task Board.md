---
title: Task Board
cover: "[[default-task-cover.png]]"
created: 2025-12-16T08:38:43+08:00
modified: 2026-07-27T23:01:03+08:00
aliases:
description:
categories:
  - "[[Vault Management]]"
status:
parent:
related:
references:
tags:
---

```base
filters:
  or:
    - file.folder.startsWith("Task")
    - file.folder.startsWith("Calendar")
formulas:
  task-content-with-link: link(file, note["task-content"])
  overdue: if(note["task-due"] < now(), "🚨", if(note["task-due"] - "3 day" <= today(), "⚠️", ""))
  Relative Due: if(task-due, "Due："+date(task-due).relative().toString(),"")
  Task in Short: if(task-content, "Task：" + task-content, if(note["calendar-event-title"], note["calendar-event-title"],"") )
  Calendar Event Start: if(note["calendar-event-start"], note["calendar-event-start"],if(note["task-scheduled-start"], note["task-scheduled-start"], task-due))
  Calendar Event End: if(note["calendar-event-end"], note["calendar-event-end"],if(note["task-scheduled-end"], note["task-scheduled-end"], task-due))
properties:
  note.task-status:
    displayName: Status
  note.task-due:
    displayName: Due
  formula.task-content-with-link:
    displayName: Task
  formula.related-category:
    displayName: Related
  formula.overdue:
    displayName: Overdue Warning
views:
  - type: table
    name: Inbox
    filters:
      and:
        - file.folder == "Task/Inbox"
    order:
      - task-status
      - task-due
      - formula.overdue
      - formula.task-content-with-link
      - task-scheduled-start
      - task-scheduled-end
    sort:
      - property: task-due
        direction: ASC
      - property: task-scheduled-end
        direction: ASC
      - property: formula.related-category
        direction: DESC
      - property: tags
        direction: ASC
    columnSize:
      note.task-status: 121
      note.task-due: 200
      formula.overdue: 32
      formula.task-content-with-link: 266
      note.task-scheduled-start: 199
    cardSize: 300
    calendarView: dayGridMonth
  - type: table
    name: Archived
    filters:
      and:
        - file.folder == "Task/Archived"
    order:
      - task-archived
      - formula.task-content-with-link
    columnSize:
      note.task-archived: 308
      formula.task-content-with-link: 400

```
