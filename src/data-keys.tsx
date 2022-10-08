import { EventInput } from '@fullcalendar/react'


export const DATA_KEYS: EventInput[] = [
  { id: 'a', title: 'カギ A' },
  { id: 'b', title: 'カギ B', eventColor: 'green' },
  { id: 'c', title: 'カギ C', eventColor: 'orange' },
  { id: 'd', title: 'カギ D', children: [
    { id: 'd1', title: '子カギ D1' },
    { id: 'd2', title: '子カギ D2' }
  ] },
  { id: 'e', title: 'カギ E' },
  { id: 'f', title: 'カギ F', eventColor: 'red' },
]

