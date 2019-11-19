module Types exposing (..)


type alias Headers =
    { name : String, value : String }


type alias PostDataField =
    { mimeType : String
    , text : String
    }


type alias ContentField =
    { mimeType : String
    , size : Int
    }


type alias TimingsField =
    { blocked : Float
    , dns : Float
    , ssl : Float
    , connect : Float
    , send : Float
    , wait : Float
    , receive : Float
    }


type alias RequestField =
    { bodySize : Int
    , cookies : List String
    , headers : List Headers
    , headersSize : Int
    , httpVersion : String
    , method : String
    , postData : PostDataField
    , queryString : List String
    , url : String
    }


type alias ResponseField =
    { bodySize : Int
    , content : ContentField
    , headers : List Headers
    , headersSize : Int
    , httpVersion : String
    , redirectURL : String
    , status : Int
    , statusText : String
    }


type alias Request =
    { request : RequestField
    , response : ResponseField
    , serverIPAddress : String
    , startedDateTime : String
    , time : Float
    , timings : TimingsField
    , connection : Maybe String
    }


type alias PreFlightRequest =
    { request : RequestField
    , response : ResponseField
    , serverIPAddress : String
    , startedDateTime : String
    , time : Float
    , timings : TimingsField
    }


type Status
    = RequestList
    | RequestDetails


type alias Model =
    { request : List Request, preFlightRequest : List PreFlightRequest, status : Status }
