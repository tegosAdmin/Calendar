import { EventInput } from '@fullcalendar/react'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const DATA_EVENTS: EventInput[] = [
  { id: createEventId(),
    resourceId: 'b',
    start: todayStr + 'T02:00:00',
    end: todayStr + 'T07:00:00',
    title: 'event 1',
  },
  { id: createEventId(),
    resourceId: 'c',
    start: todayStr + 'T05:00:00',
    end: todayStr + 'T22:00:00',
    title: 'event 2'
  },
  { id: createEventId(),
    resourceId: 'd1',
    start: todayStr,
    end: todayStr,
    title: 'event 3'
  },
  { id: createEventId(),
    resourceId: 'e',
    start: todayStr + 'T03:00:00',
    end: todayStr + 'T08:00:00',
    title: 'event 4'
  },
  { id: createEventId(),
    resourceId: 'f',
    start: todayStr + 'T00:30:00',
    end: todayStr + 'T02:30:00',
    title: 'event 5'
  }
]

export function createEventId() {
  return String(eventGuid++)
}
