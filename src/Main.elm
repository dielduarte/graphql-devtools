port module Main exposing (..)

import Browser
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Ui exposing (..)
import Types exposing (..)


---- PORTALS ----
port onRequestFinished : (Request -> msg) -> Sub msg
port onPreFlightRequestFinished : (PreFlightRequest -> msg) -> Sub msg

---- MODEL ----

type Status = RequestList | RequestDetails

type alias Model =
    { request: List Request, preFlightRequest: List PreFlightRequest, status: Status }


init : ( Model, Cmd Msg )
init =
    ( { request = [], preFlightRequest = [], status =  RequestList }, Cmd.none )



---- UPDATE ----


type Msg
  = OnRequestFinished Request
  | OnPreFlightRequestFinished PreFlightRequest


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnRequestFinished newRequest ->
            ({ model | request =  newRequest :: model.request }, Cmd.none)
        OnPreFlightRequestFinished newRequest ->
            ({ model | preFlightRequest =  newRequest :: model.preFlightRequest }, Cmd.none)


---- VIEW ----


view : Model -> Html Msg
view model =
    div []
        [ sucess  (text "200")
        , cancelled  (text "400")
        , error  (text "500")
        , waiting  (text "...")
        , mutationSign
        , querySign
        , mainTitle (text "Requests")
        , subtitle (text "Status")
        ]

-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch [
      onRequestFinished OnRequestFinished
    , onPreFlightRequestFinished OnPreFlightRequestFinished
    ]

---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view >> toUnstyled
        , init = \_ -> init
        , update = update
        , subscriptions = subscriptions
        }
