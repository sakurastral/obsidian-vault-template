---
cover:
title: Task Board
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2025-12-16T08:38:43+08:00
modified: 2026-04-16T10:39:18+08:00
status:
parent:
references:
---

```base
filters:
  or:
    - file.folder.startsWith("Task")
    - file.folder.startsWith("Project/Calendar")
formulas:
  task-content-with-link: link(file, note["Task：Content"])
  overdue: if(note["Task：Due"] < now(), "🚨", if(note["Task：Due"] - "3 day" <= today(), "⚠️", ""))
  Relative Due: if(Task：Due, "Deadline："+date(Task：Due).relative().toString(),"")
  Task in Short: if(Task：Content, "Task：" + Task：Content, if(note["calendar-event-title"], note["calendar-event-title"],"") )
  Calendar Event Start: if(note["calendar-event-start"], note["calendar-event-start"],if(note["Task：Scheduled(Start)"], note["Task：Scheduled(Start)"], Task：Due))
  Calendar Event End: if(note["calendar-event-end"], note["calendar-event-end"],if(note["Task：Scheduled(End)"], note["Task：Scheduled(End)"], Task：Due))
properties:
  note.Task：Status:
    displayName: Status
  note.Task：Due:
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
      - Task：Status
      - Task：Due
      - formula.overdue
      - formula.task-content-with-link
      - Task：Scheduled(Start)
      - Task：Scheduled(End)
    sort:
      - property: Task：Due
        direction: ASC
      - property: Task：Scheduled(End)
        direction: ASC
      - property: formula.related-category
        direction: DESC
      - property: tags
        direction: ASC
    columnSize:
      note.Task：Status: 121
      note.Task：Due: 200
      formula.overdue: 32
      formula.task-content-with-link: 266
      note.Task：Scheduled(Start): 199
    cardSize: 300
    calendarView: dayGridMonth
  - type: table
    name: Archived
    filters:
      and:
        - file.folder == "Task/Archived"
    order:
      - Task：Archived
      - formula.task-content-with-link
    columnSize:
      note.Task：Archived: 308
      formula.task-content-with-link: 400
  - type: calendar
    name: Calendar
    filters:
      and:
        - file.folder != "Task/Archived"
    order:
      - formula.Task in Short
      - formula.Relative Due
      - formula.Calendar Event Start
      - formula.Calendar Event End
    startDate: formula.Calendar Event Start
    endDate: formula.Calendar Event End

```
