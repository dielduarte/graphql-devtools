module Layouts exposing (..)

import Css exposing (marginTop, px)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Types exposing (..)
import Ui exposing (..)
import Request exposing (..)

requests : Model -> Html msg
requests model =
    let
        tableRows =
            List.map
                (\request ->
                    tableRow
                        [ tableColumn 300 [ text (getRequestName request.request.postData.text) ]
                        , tableColumn 100 [ sucess (text (String.fromInt request.response.status)) ]
                        ]
                )
                model.request
    in
    container
        [ mainTitle (text "Requests")
        , tableRoot
            [ tableRow
                [ tableColumn 300 [ subtitle (text "Name") ]
                , tableColumn 100 [ subtitle (text "Status") ]
                ]
            , div [ css [ marginTop (px 18) ] ] tableRows
            ]
        ]
