module Ui exposing (..)

import Css exposing (..)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)



--      TAGS


tag : Color -> Color -> Html msg -> Html msg
tag bg fontColor children =
    span
        [ css
            [ padding2 (px 2) (px 14)
            , backgroundColor bg
            , color fontColor
            , borderRadius (px 20)
            , fontSize (px 10)
            , display inlineFlex
            , alignItems center
            ]
        ]
        [ children ]


sucess : Html msg -> Html msg
sucess children =
    tag (hex "E0F5F5") (hex "60B1AF") children


error : Html msg -> Html msg
error children =
    tag (hex "FDEEE8") (hex "D5A695") children


waiting : Html msg -> Html msg
waiting children =
    tag (hex "E5F0FE") (hex "7AA5DB") children


cancelled : Html msg -> Html msg
cancelled children =
    tag (hex "ECEEF0") (hex "999BA4") children



--    POST TYPE


postType : Color -> Html msg
postType bg =
    div
        [ css
            [ display inlineBlock
            , Css.width (px 5)
            , Css.height (px 5)
            , border (px 1)
            , borderColor (hex "FFF")
            , backgroundColor bg
            , borderRadius (pc 50)
            ]
        ]
        []


querySign : Html msg
querySign =
    postType (hex "16A085")


mutationSign : Html msg
mutationSign =
    postType (hex "E67E22")



--   HEADERS


mainTitle : Html msg -> Html msg
mainTitle children =
    h1
        [ css
            [ fontSize (px 18)
            ]
        ]
        [ children ]


subtitle : Html msg -> Html msg
subtitle children =
    h3
        [ css
            [ fontSize (px 11)
            ]
        ]
        [ children ]



-- TABLE


tableRoot : List (Html msg) -> Html msg
tableRoot children =
    div
        [ css [ marginTop (px 30) ]
        ]
        children


tableRow : List (Html msg) -> Html msg
tableRow children =
    div
        [ css
            [ displayFlex
            , alignItems center
            , marginBottom (px 10)
            ]
        ]
        children


tableColumn : Float -> List (Html msg) -> Html msg
tableColumn size children =
    div
        [ css [ Css.width (px size), Css.minWidth (px size) ]
        ]
        children



-- CONTAINER


container : List (Html msg) -> Html msg
container children =
    section
        [ css
            [ padding (px 30)
            ]
        ]
        children
