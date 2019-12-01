import { Machine } from 'xstate'
import * as actions from './actions'

export default Machine({
  id: 'graphql-devtools',
  initial: 'idle',
  context: {
    requests: [],
    preFlightRequestsMap: {}
  },
  states: {
    idle: {
      on: {
        SET_KNOW_REQUESTS: 'idle',
        SET_REQUEST: {
          target: '',
          actions: ['parseRequest','mergeRequets']
        },
        OPEN_REQUEST_DETAILS: 'requestDetails'
        // OPEN_STATISTICS: 'requestStatistics'
      }
    },
    requestDetails: {
      on: {
        SET_REQUEST: {
          target: '',
          actions: ['parseRequest', 'mergeRequests']
        },
        // COPY_QUERY: 'requestDetails',
        // RE_RUN: 'requestDetails',
        // CLOSE_REQUEST_DETAILS: 'idle'
      }
    },
    // requestStatistics: {
    //   on: {
    //     SET_REQUEST: 'requestStatistics',
    //     START_RECORDING: 'recordingRequestsStatistics',
    //     CLOSE_REQUEST_STATISTICS: 'idle'
    //   }
    // },
    // recordingRequestsStatistics: {
    //   invoke: {
    //     src: 'onWindowRefresh',
    //     onDone: 'requestStatistics'
    //   },
    //   on: {
    //     SET_REQUEST: 'recordingRequestsStatistics',
    //     STOP_RECORDING: 'requestStatistics'
    //   }
    // }
  }
}, {
  actions
})


