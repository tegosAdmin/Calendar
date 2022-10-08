import React from 'react'
import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"
import { DATA_EVENTS, createEventId } from './data-events'
import { DATA_KEYS } from './data-keys'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

interface DemoAppState {
  weekendsVisible: boolean
  slotDurationVisible: string
  currentEvents: EventApi[]
}

export default class DemoApp extends React.Component<{}, DemoAppState> {

  state: DemoAppState = {
    weekendsVisible: true,
    slotDurationVisible: "00:30",
    currentEvents: []
  }
  

  render() {
    return (
      <div className='demo-app'>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            週末表示
          </label>
          <br/>
          <label >表示間隔:</label>

<select name="interval" id="interval-select" onChange={(e) => this.handleIntervalChange(e)}>
    <option value="00:05">00:05</option>
    <option value="00:10">00:10</option>
    <option value="00:15">00:15</option>
    <option value="00:10">00:20</option>
    <option value="00:30" selected>00:30</option>
    <option value="01:00">01:00</option>
</select>          
        </div>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, resourceTimelinePlugin]}
            headerToolbar={{
              right: 'prev,next today',
              center: 'title',
              left: 'dayGridMonth,resourceTimelineWeek,resourceTimelineDay'
            }}

            buttonText={{
              today: '今月',
              month: '月',
              week: '週',
              day: '日',
            }}
            initialView='dayGridMonth'
            views= {{
              resourceTimelineDay: {
                slotDuration: this.state.slotDurationVisible, //'00:30',
                slotLabelInterval: '01:00',
                //titleFormat: { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short'}
                // titleFormat :{dateStyle:'full',}
                titleFormat: function (date) {
                  const weekNum = date.date.marker.getDay();
                  const week = ['日', '月', '火', '水', '木', '金', '土'][weekNum];
                  return `${date.date.year}年 ${date.date.month + 1}月 ${date.date.day}日 (${week})`
                }                

              },
              resourceTimelineWeek: {
                slotDuration: { days: 1 }
                // slotDuration: '03:00',
                // slotLabelInterval: '24:00'
              },
            }}
            // businessHours={{
            //   daysOfWeek: [ 1, 2, 3, 4, 5 ], // 月,火,水,木,金   0:日曜          
            //   startTime: '09:00', // a start time (9am in this example)
            //   endTime: '18:00', // an end time (6pm in this example)
            // }}
            locale={'ja'}
            firstDay={1}        // 月曜始まり
            nowIndicator={true} //　現在時刻のボーダーが表示
            
            editable={true}     // イベントを編集
            selectable={true}
            //dayMaxEvents={true} // DayGridビューで、日付の高さを固定
            weekends={this.state.weekendsVisible}
            select={this.handleDateSelect}
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            resourceAreaHeaderContent=''   // ヘッダのタイトル
            resources={DATA_KEYS} 
            resourceAreaColumns={ [
              {
                group: true,
                field: 'room',
                headerContent: '部屋'
              },
              {
                field: 'title',
                headerContent: '鍵'
              },
              {
                field: 'comment',
                headerContent: '備考'
              }
            ]}

            // resourceAreaColumns={ [
            //  {
            //     field: 'title',
            //     headerContent: '鍵',
            //     cellContent(hookProps) {
            //       return hookProps.resource?.title + '<br> aaa'
            //     },
            //   },
            // ]}

            // resourceAreaColumns={ [{
          //   cellContent: function(arg) {
          //     return '<b>' + arg.resource?.title + '</b><br>aaa';
          //   },}]}
          //eventContent={(arg: EventContentArg) => <h1>{arg.event.title}</h1>}
          eventContent={(arg: EventContentArg) =>
            <Tippy content={arg.event.title} interactive={true} interactiveBorder={20} delay={100}>
              <h2>{arg.event.title}</h2>
            </Tippy>
          }
          initialEvents= {DATA_EVENTS}
            />
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }
  handleIntervalChange = (e:any) => {
    this.setState({
      slotDurationVisible: e.target.value
    })
  }
  handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('追加するタイトルを入力してください')
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        resourceId: selectInfo.resource?.id,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`削除しますか？ '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events      
    })
  }
  // actions
  // handleMouseEnter = (Info:mouseEnterInfo) => {
  //   if (clickInfo.event.extendedProps.description) {
  //     tooltipInstance = new Tooltip(clickInfo.el, {
  //       title: info.event.extendedProps.description,
  //       html: true,
  //       placement: "top",
  //       trigger: "hover",
  //       container: "body"
  //     });

  //     tooltipInstance.show();
  //   }
  // };


}


