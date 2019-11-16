import './main.css';
import { Elm } from './Main.elm';
import * as serviceWorker from './serviceWorker';

const app =  Elm.Main.init({
  node: document.getElementById('root')
});


if (process.env.NODE_ENV !== 'development') {
  chrome.devtools.network.onRequestFinished.addListener(function(request) {
    if (
      request.request.method === "POST" &&
      request.request.postData.mimeType === "application/json"
    ) {
      const text = JSON.parse(request.request.postData.text);
      if (text.hasOwnProperty("query")) {
        request.hasOwnProperty('connection')
          ? app.ports.onRequestFinished.send(request)
          : app.ports.onPreFlightRequestFinished.send(request)

      }
    }
  });
}

const fakeRequest  = {
  "startedDateTime": "2019-11-16T20:14:42.617Z",
  "time": 0.8479999960400164,
  "request": {
  "method": "POST",
    "url": "https://next.avantstay.rocks/backoffice/graphql",
    "httpVersion": "http/1.1",
    "headers": [
    {
      "name": "User-Agent",
      "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
    },
    {
      "name": "Referer",
      "value": "https://dashboard.avantstay.rocks/properties/d7c780dc-bf6c-11e9-bdc9-ab3ca5026a7a/stats?dateRange=prev-7-days&granularity=daily"
    },
    {
      "name": "Origin",
      "value": "https://dashboard.avantstay.rocks"
    },
    {
      "name": "Authorization",
      "value": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImRiMDJhYjMwZTBiNzViOGVjZDRmODE2YmI5ZTE5NzhmNjI4NDk4OTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjExNzc3NzA2OTg5LTQ2N2ViOWI3aDg5cXU2ZmIzMXUwdjFhYTk4NHRmbGpvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjExNzc3NzA2OTg5LTQ2N2ViOWI3aDg5cXU2ZmIzMXUwdjFhYTk4NHRmbGpvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEwMDMxNTcxNDkxOTAzNDU0MTg4IiwiaGQiOiJhdmFudHN0YXkuY29tIiwiZW1haWwiOiJtZHVhcnRlQGF2YW50c3RheS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjN1d3RKZUdQcURMcVhfOTRKOUVpcEEiLCJuYW1lIjoiTWFnZGllbCBEdWFydGUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FBdUU3bUJWeFNvalNRMEVLQk9qZkt5SzRjX3g0ZUc4OEtNTmJOQU1rZU09czk2LWMiLCJnaXZlbl9uYW1lIjoiTWFnZGllbCIsImZhbWlseV9uYW1lIjoiRHVhcnRlIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1NzM5MzE5OTYsImV4cCI6MTU3MzkzNTU5NiwianRpIjoiYjAyZWNiOGRmZTBkMWNhZTczYTM1ZDZiNWFjZDA0ODg0YTY5OTVkNSJ9.ENNsbA4BduJ-lphuLlEBleSmvJAsPZE4-8Ut7P9F6z-xJbAtDxqR66yeF3GJqIz3Cp9WkimK_QicD7ngJLDEkcmZRQ1MU2doez5RFWkAw4UbwzxZdXRNtKXpvGEAdPecfXyoVHmCe17Ui29k74DR2EBahtoAXnt1ykS7hDrWRmVwS5dU5ITAEag5Hua_K0XtcAtaKDCZet5JuqAJXDM7mH4EI9j3HndVUDkzWC9mYKcyx9XeFP6JaoyQQlQ52NBm72wLcGHiQ3Wpj-PQIscvlbGTj_h1Qbxog86KvN65CAyW4jT_-w0lFgAPg2oEpaIkGYu3ZMDD9VYgHdctEAFdUw"
    },
    {
      "name": "Content-Type",
      "value": "application/json"
    }
  ],
    "queryString": [],
    "cookies": [],
    "headersSize": -1,
    "bodySize": 5828,
    "postData": {
    "mimeType": "application/json",
      "text": "{\"query\":\"query homeIndicators($fromDate: LocalDate!, $toDate: LocalDate!, $fromComparativePeriod: LocalDate!, $toComparativePeriod: LocalDate!, $homeId: UUID!, $granularity: Granularity) {\\n  homes: homes(homeIds: [$homeId], pagination: {size: 1000, page: 1}) {\\n    results {\\n      ...HomeProfile\\n      indicators(granularity: $granularity) {\\n        customerExperience {\\n          airbnbSuperhostRating\\n          airbnbFiveStarReviewsToSuperhost\\n          airbnbSuperhostPeriod {\\n            start\\n            end\\n          }\\n          nps\\n        }\\n        finance {\\n          revpau(from: $fromDate, to: $toDate) {\\n            period\\n            weekdays\\n            weekends\\n          }\\n          adr(from: $fromDate, to: $toDate) {\\n            period\\n            weekdays\\n            weekends\\n          }\\n          bookingVolume(from: $fromDate, to: $toDate) {\\n            ...DetailedIndicator\\n            annualizedValue\\n          }\\n          realizedRevenue(from: $fromDate, to: $toDate) {\\n            ...DetailedIndicator\\n            annualizedValue\\n          }\\n          outstandingPayments(from: $fromDate, to: $toDate) {\\n            ...SimplifiedIndicator\\n          }\\n          averageDiscount(from: $fromDate, to: $toDate) {\\n            ...SimplifiedIndicator\\n          }\\n          discounts(from: $fromDate, to: $toDate) {\\n            ...SimplifiedIndicator\\n          }\\n          securityDeposits(from: $fromDate, to: $toDate) {\\n            ...SimplifiedIndicator\\n          }\\n          petDeposits(from: $fromDate, to: $toDate) {\\n            ...SimplifiedIndicator\\n          }\\n        }\\n        sales {\\n          averageBookingLength(from: $fromDate, to: $toDate) {\\n            ...DetailedIndicator\\n          }\\n          medianBookingLeadTime(from: $fromDate, to: $toDate) {\\n            ...DetailedIndicator\\n          }\\n          occupancyRate(from: $fromDate, to: $toDate) {\\n            ...DetailedIndicator\\n          }\\n          weekendOccupancyRate(from: $fromDate, to: $toDate) {\\n            ...DetailedIndicator\\n          }\\n          averageGroupSize(from: $fromDate, to: $toDate) {\\n            ...SimplifiedIndicator\\n          }\\n          cancelledBookings(from: $fromDate, to: $toDate) {\\n            ...SimplifiedIndicator\\n          }\\n          returningGuests(from: $fromDate, to: $toDate) {\\n            ...SimplifiedIndicator\\n          }\\n          channelDistribution(from: $fromDate, to: $toDate) {\\n            channelName\\n            percentage\\n          }\\n          bookings(from: $fromDate, to: $toDate) {\\n            ...SimplifiedIndicator\\n          }\\n        }\\n      }\\n      comparativeIndicators: indicators(granularity: $granularity) {\\n        finance {\\n          bookingVolume(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...DetailedIndicator\\n            annualizedValue\\n          }\\n          realizedRevenue(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...DetailedIndicator\\n            annualizedValue\\n          }\\n          outstandingPayments(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...SimplifiedIndicator\\n          }\\n          averageDiscount(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...SimplifiedIndicator\\n          }\\n          discounts(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...SimplifiedIndicator\\n          }\\n          securityDeposits(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...SimplifiedIndicator\\n          }\\n          petDeposits(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...SimplifiedIndicator\\n          }\\n        }\\n        sales {\\n          averageBookingLength(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...DetailedIndicator\\n          }\\n          medianBookingLeadTime(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...DetailedIndicator\\n          }\\n          occupancyRate(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...DetailedIndicator\\n          }\\n          weekendOccupancyRate(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...DetailedIndicator\\n          }\\n          averageGroupSize(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...SimplifiedIndicator\\n          }\\n          cancelledBookings(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...SimplifiedIndicator\\n          }\\n          returningGuests(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...SimplifiedIndicator\\n          }\\n          channelDistribution(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            channelName\\n            percentage\\n          }\\n          bookings(from: $fromComparativePeriod, to: $toComparativePeriod) {\\n            ...SimplifiedIndicator\\n          }\\n        }\\n      }\\n    }\\n  }\\n}\\n\\nfragment HomeProfile on Home {\\n  id\\n  name\\n  active\\n  details {\\n    maintenanceStatus\\n    onBoardingStatus\\n    liveSince\\n    liveUntil\\n    riskLevel\\n  }\\n  thumbnail {\\n    url\\n  }\\n  liveStatus\\n  createdAt\\n  region {\\n    id\\n    name\\n  }\\n}\\n\\nfragment DetailedIndicator on Indicator {\\n  granularity\\n  aggregation\\n  mostRecentValue\\n  aggregatedValue\\n  period {\\n    start\\n    end\\n  }\\n  variation\\n  values {\\n    value\\n    date\\n  }\\n}\\n\\nfragment SimplifiedIndicator on Indicator {\\n  mostRecentValue\\n  aggregatedValue\\n  variation\\n}\\n\",\"variables\":{\"dateRange\":\"today\",\"granularity\":\"DAILY\",\"homeId\":\"d7c780dc-bf6c-11e9-bdc9-ab3ca5026a7a\",\"fromDate\":\"2019-11-16\",\"toDate\":\"2019-11-16\",\"fromComparativePeriod\":\"2018-11-16\",\"toComparativePeriod\":\"2018-11-16\"}}"
  }
},
  "response": {
  "status": 400,
    "statusText": "Service Worker Fallback Required",
    "httpVersion": "http/1.1",
    "headers": [],
    "cookies": [],
    "content": {
    "size": 0,
      "mimeType": "x-unknown"
  },
  "redirectURL": "",
    "headersSize": -1,
    "bodySize": 0,
    "_transferSize": 0
},
  "cache": {},
  "timings": {
  "blocked": -1,
    "dns": -1,
    "ssl": -1,
    "connect": -1,
    "send": 0,
    "wait": 0.8479999960400164,
    "receive": 0,
    "_blocked_queueing": -1
},
  "serverIPAddress": "",
  "_initiator": {
  "type": "script",
    "stack": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "377",
        "url": "https://dashboard.avantstay.rocks/main.d6a88268.js?__WB_REVISION__=df7dd4ed26faf74aa03a",
        "lineNumber": 129,
        "columnNumber": 50577
      },
      {
        "functionName": "",
        "scriptId": "377",
        "url": "https://dashboard.avantstay.rocks/main.d6a88268.js?__WB_REVISION__=df7dd4ed26faf74aa03a",
        "lineNumber": 33,
        "columnNumber": 68157
      },
      {
        "functionName": "",
        "scriptId": "403",
        "url": "https://dashboard.avantstay.rocks/20.814da2ffefd75d42db33.js",
        "lineNumber": 0,
        "columnNumber": 19288
      },
      {
        "functionName": "ha",
        "scriptId": "377",
        "url": "https://dashboard.avantstay.rocks/main.d6a88268.js?__WB_REVISION__=df7dd4ed26faf74aa03a",
        "lineNumber": 60,
        "columnNumber": 75253
      },
      {
        "functionName": "",
        "scriptId": "377",
        "url": "https://dashboard.avantstay.rocks/main.d6a88268.js?__WB_REVISION__=df7dd4ed26faf74aa03a",
        "lineNumber": 60,
        "columnNumber": 85192
      },
      {
        "functionName": "l",
        "scriptId": "377",
        "url": "https://dashboard.avantstay.rocks/main.d6a88268.js?__WB_REVISION__=df7dd4ed26faf74aa03a",
        "lineNumber": 69,
        "columnNumber": 346
      },
      {
        "functionName": "f",
        "scriptId": "377",
        "url": "https://dashboard.avantstay.rocks/main.d6a88268.js?__WB_REVISION__=df7dd4ed26faf74aa03a",
        "lineNumber": 69,
        "columnNumber": 973
      },
      {
        "functionName": "",
        "scriptId": "377",
        "url": "https://dashboard.avantstay.rocks/main.d6a88268.js?__WB_REVISION__=df7dd4ed26faf74aa03a",
        "lineNumber": 69,
        "columnNumber": 2645
      }
    ],
      "parentId": {
      "id": "90",
        "debuggerId": "(96BE72EB4CDCC3D7F57AAD3A22E8892E)"
    }
  }
},
  "_priority": "High",
  "_resourceType": "fetch",
  "_fromCache": "disk"
}

const fakeRequestOK = {
  "startedDateTime": "2019-11-16T20:14:42.696Z",
  "time": 972.4220000061905,
  "request": {
    "method": "POST",
    "url": "https://next.avantstay.rocks/backoffice/graphql",
    "httpVersion": "http/2.0",
    "headers": [
      {
        "name": ":method",
        "value": "POST"
      },
      {
        "name": ":authority",
        "value": "next.avantstay.rocks"
      },
      {
        "name": ":scheme",
        "value": "https"
      },
      {
        "name": ":path",
        "value": "/backoffice/graphql"
      },
      {
        "name": "content-length",
        "value": "472"
      },
      {
        "name": "pragma",
        "value": "no-cache"
      },
      {
        "name": "cache-control",
        "value": "no-cache"
      },
      {
        "name": "authorization",
        "value": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImRiMDJhYjMwZTBiNzViOGVjZDRmODE2YmI5ZTE5NzhmNjI4NDk4OTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjExNzc3NzA2OTg5LTQ2N2ViOWI3aDg5cXU2ZmIzMXUwdjFhYTk4NHRmbGpvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjExNzc3NzA2OTg5LTQ2N2ViOWI3aDg5cXU2ZmIzMXUwdjFhYTk4NHRmbGpvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEwMDMxNTcxNDkxOTAzNDU0MTg4IiwiaGQiOiJhdmFudHN0YXkuY29tIiwiZW1haWwiOiJtZHVhcnRlQGF2YW50c3RheS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjN1d3RKZUdQcURMcVhfOTRKOUVpcEEiLCJuYW1lIjoiTWFnZGllbCBEdWFydGUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FBdUU3bUJWeFNvalNRMEVLQk9qZkt5SzRjX3g0ZUc4OEtNTmJOQU1rZU09czk2LWMiLCJnaXZlbl9uYW1lIjoiTWFnZGllbCIsImZhbWlseV9uYW1lIjoiRHVhcnRlIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1NzM5MzE5OTYsImV4cCI6MTU3MzkzNTU5NiwianRpIjoiYjAyZWNiOGRmZTBkMWNhZTczYTM1ZDZiNWFjZDA0ODg0YTY5OTVkNSJ9.ENNsbA4BduJ-lphuLlEBleSmvJAsPZE4-8Ut7P9F6z-xJbAtDxqR66yeF3GJqIz3Cp9WkimK_QicD7ngJLDEkcmZRQ1MU2doez5RFWkAw4UbwzxZdXRNtKXpvGEAdPecfXyoVHmCe17Ui29k74DR2EBahtoAXnt1ykS7hDrWRmVwS5dU5ITAEag5Hua_K0XtcAtaKDCZet5JuqAJXDM7mH4EI9j3HndVUDkzWC9mYKcyx9XeFP6JaoyQQlQ52NBm72wLcGHiQ3Wpj-PQIscvlbGTj_h1Qbxog86KvN65CAyW4jT_-w0lFgAPg2oEpaIkGYu3ZMDD9VYgHdctEAFdUw"
      },
      {
        "name": "origin",
        "value": "https://dashboard.avantstay.rocks"
      },
      {
        "name": "user-agent",
        "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
      },
      {
        "name": "content-type",
        "value": "application/json"
      },
      {
        "name": "accept",
        "value": "*/*"
      },
      {
        "name": "sec-fetch-site",
        "value": "same-site"
      },
      {
        "name": "sec-fetch-mode",
        "value": "cors"
      },
      {
        "name": "referer",
        "value": "https://dashboard.avantstay.rocks/properties/d7c780dc-bf6c-11e9-bdc9-ab3ca5026a7a/stats?dateRange=today&granularity=daily"
      },
      {
        "name": "accept-encoding",
        "value": "gzip, deflate, br"
      },
      {
        "name": "accept-language",
        "value": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,it;q=0.6,fr;q=0.5,es;q=0.4"
      }
    ],
    "queryString": [],
    "cookies": [],
    "headersSize": -1,
    "bodySize": 472,
    "postData": {
      "mimeType": "application/json",
      "text": "{\"query\":\"query futureRevenueByHome($homeId: UUID!, $from: LocalDate!, $to: LocalDate!) {\\n  home(homeId: $homeId) {\\n    indicators(granularity: MONTHLY) {\\n      finance {\\n        futureRevenue(from: $from, to: $to) {\\n          date\\n          projected\\n          booked\\n          paid\\n        }\\n      }\\n    }\\n  }\\n}\\n\",\"variables\":{\"dateRange\":\"today\",\"granularity\":\"DAILY\",\"homeId\":\"d7c780dc-bf6c-11e9-bdc9-ab3ca5026a7a\",\"from\":\"2019-11-01\",\"to\":\"2020-11-30\"}}"
    }
  },
  "response": {
    "status": 200,
    "statusText": "",
    "httpVersion": "http/2.0",
    "headers": [
      {
        "name": "status",
        "value": "200"
      },
      {
        "name": "date",
        "value": "Sat, 16 Nov 2019 20:14:43 GMT"
      },
      {
        "name": "content-type",
        "value": "application/json"
      },
      {
        "name": "content-length",
        "value": "1081"
      },
      {
        "name": "server",
        "value": "nginx/1.14.1"
      },
      {
        "name": "access-control-expose-headers",
        "value": "*"
      },
      {
        "name": "vary",
        "value": "Origin,Access-Control-Request-Method"
      },
      {
        "name": "access-control-allow-credentials",
        "value": "true"
      },
      {
        "name": "access-control-allow-methods",
        "value": "HEAD, OPTIONS, PUT, GET, POST"
      },
      {
        "name": "access-control-allow-origin",
        "value": "https://dashboard.avantstay.rocks"
      },
      {
        "name": "access-control-max-age",
        "value": "86400"
      }
    ],
    "cookies": [],
    "content": {
      "size": 1081,
      "mimeType": "application/json"
    },
    "redirectURL": "",
    "headersSize": -1,
    "bodySize": -1,
    "_transferSize": 1371
  },
  "cache": {},
  "timings": {
    "blocked": 452.78700000028357,
    "dns": -1,
    "ssl": -1,
    "connect": -1,
    "send": 0.27600000000001046,
    "wait": 518.8070000009341,
    "receive": 0.5520000049727969,
    "_blocked_queueing": 6.642000000283588
  },
  "serverIPAddress": "54.241.183.90",
  "_initiator": {
    "type": "other"
  },
  "_priority": "High",
  "_resourceType": "fetch",
  "connection": "325667"
}


app.ports.onRequestFinished.send(fakeRequestOK)
app.ports.onPreFlightRequestFinished.send(fakeRequest)

// app.ports.onRequestFinished.send(fakeRequest)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
