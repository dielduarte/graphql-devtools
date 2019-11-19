port module Main exposing (..)

import Browser
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Layouts exposing (..)
import Types exposing (..)



---- PORTALS ----


port onRequestFinished : (Request -> msg) -> Sub msg


port onPreFlightRequestFinished : (PreFlightRequest -> msg) -> Sub msg



---- MODEL ----


init : ( Model, Cmd Msg )
init =
    ( { request = [], preFlightRequest = [], status = RequestList }, Cmd.none )



---- UPDATE ----


type Msg
    = OnRequestFinished Request
    | OnPreFlightRequestFinished PreFlightRequest


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnRequestFinished newRequest ->
            ( { model | request = newRequest :: model.request }, Cmd.none )

        OnPreFlightRequestFinished newRequest ->
            ( { model | preFlightRequest = newRequest :: model.preFlightRequest }, Cmd.none )


getLayout : Model -> Html msg
getLayout model =
    case model.status of
        RequestList ->
            requests model

        RequestDetails ->
            requests model



---- VIEW ----


view : Model -> Html Msg
view model =
    let
        viewToRender =
            getLayout model
    in
    viewToRender



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ onRequestFinished OnRequestFinished
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
