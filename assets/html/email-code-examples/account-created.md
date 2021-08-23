<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">

    <style type="text/css">
        @media only screen {
            html {
                background: #fff;
                min-height: 100%;
            }
        }

        body, table, tr, td, th, div, h1, p, img {
            Margin: 0;
            margin: 0;
            padding: 0;
        }

        body {
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            min-width: 100%;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            width: 100%;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
        }

        td, th {
            border-collapse: collapse;
        }

        h1, p, a, span, img {
            color: #333;
            font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            font-size: 14px;
            font-weight: 400;
            -moz-hyphens: auto;
            -webkit-hyphens: auto;
            hyphens: auto;
            line-height: 1.57143;
            word-wrap: break-word;
        }

        h1 {
            font-size: 28px;
            font-weight: 500;
            line-height: 1.21429;
        }

        h1:not(:last-child),
        p:not(:last-child) {
            Margin: 0 0 32px;
            margin: 0 0 32px;
        }

        a {
            color: #2199e8;
            display: inline-block;
            text-decoration: none;
        }

        strong {
            font-weight: 600;
        }

        img {
            border: none;
            display: block;
            outline: 0;
            text-align: center;
        }

        hr {
            border: none;
            border-bottom: 1px solid #d0d0d0;
        }

        .preheader {
            display: none;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            mso-hide: all;
            opacity: 0;
            overflow: hidden;
            visibility: hidden;
        }

        .body {
            background: #fff;
            height: 100%;
        }

        .body > tr > td {
            text-align: center;
        }

        .container,
        .column {
            Margin: 0 auto;
            margin: 0 auto;
            width: 544px;
        }

        .column td,
        .column th {
            text-align: left;
            vertical-align: top;
        }

        .column--md-9 {
            width: 75%;
        }

        .column--md-3 {
            width: 25%;
        }

        .expander {
            padding: 0 !important;
            visibility: hidden;
            width: 0;
        }

        .spacer--16 td {
            font-size: 16px;
            height: 16px;
            line-height: 16px;
        }

        .spacer--24 td {
            font-size: 24px;
            height: 24px;
            line-height: 24px;
        }

        .spacer--32 td {
            font-size: 32px;
            height: 32px;
            line-height: 32px;
        }

        .spacer--40 td {
            font-size: 40px;
            height: 40px;
            line-height: 40px;
        }

        .delimiter th {
            vertical-align: middle;
        }

        .delimiter__image,
        .delimiter__image-block {
            width: 48px;
        }

        .logo td {
            padding: 24px 0;
        }

        .logo a {
            color: #333;
            display: block;
            text-align: center;
        }

        .logo img {
            color: #333;
            text-decoration: none;
            margin: 0 auto;
        }

        .logo span {
            color: #333;
            font-size: 36px;
            font-weight: 600;
        }

        h2 {
            Margin: 0 0 4px;
            color: #333;
            font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            font-size: 21px;
            font-weight: 500;
            -moz-hyphens: auto;
            -webkit-hyphens: auto;
            hyphens: auto;
            line-height: 1.57143;
            margin: 0 0 4px;
            word-wrap: break-word;
        }

        .details {
            border-top: 1px solid #e5e5e5;
        }

        .details > tr > th {
            padding-top: 16px;
        }

        .details__content {
            width: auto;
        }

        .details__content tr:not(:last-child) th {
            padding-bottom: 8px;
        }

        .details__content th:first-child {
            padding-right: 30px;
        }

        .sigh-in {
            border: 1px solid #999;
            border-radius: 4px;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #777;
            display: inline-block;
            font-weight: 600;
            padding: 4px 15px;
            text-align: center;
            white-space: nowrap;
        }

        .store p {
            Margin: 0;
            margin: 0;
        }

        .store a {
            color: #777;
            font-size: 12px;
        }

        .store-button a {
            border: 1px solid #999;
            border-radius: 4px;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #777;
            padding: 3px 15px;
            text-align: center;
            white-space: nowrap;
            width: 100%;
        }

        .powered-by div {
            background-color: #fafafa;
            border-radius: 4px;
            padding: 23px 15px;
        }

        .powered-by p {
            text-align: center;
        }

        @media only screen and (max-width: 599px) {
            img {
                height: auto !important;
                width: auto !important;
            }

            .container {
                width: 100% !important;
            }

            .column {
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                height: auto !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
            }

            .column--xs-12 {
                display: inline-block !important;
                width: 100% !important;
            }

            .details__content th {
                width: 100% !important;
                display: block !important;
            }

            .details__first-column {
                padding-bottom: 0 !important;
            }

            .store th {
                padding-bottom: 16px !important;
            }

            .store p {
                text-align: center !important;
            }

            .store-button a {
                margin-left: auto !important;
                margin-right: auto !important;
            }
        }
    </style>
</head>

<body>
    <span class="preheader"></span>

    <table class="body">
        <tr>
            <td>
                <table class="spacer spacer--16">
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                </table>

                <table class="container">
                    <tr>
                        <td>
                            <table class="row">
                                <tr>
                                    <th class="column">
                                        <table class="logo">
                                            <tr>
                                                <th>
                                                    <a href="{{store.path}}" target="_blank">
                                                        {{#if store.logo.url}}
                                                            <img src="{{store.logo.url}}" alt="{{store.logo.title}}">
                                                        {{else}}
                                                            <span>{{store.logo.title}}</span>
                                                        {{/if}}
                                                    </a>
                                                </th>

                                                <th class="expander"></th>
                                            </tr>
                                        </table>
                                    </th>
                                </tr>
                            </table>

                            <table class="row">
                                <tr>
                                    <th class="column">
                                        <table>
                                            <tr>
                                                <th>
                                                    <table class="delimiter">
                                                        <tr>
                                                            <th>
                                                                <hr>
                                                            </th>

                                                            <th class="delimiter__image-block">
                                                                <img src="{{store.cdn_path}}/img/emails/cart.png" alt="Cart image" class="delimiter__image">
                                                            </th>

                                                            <th>
                                                                <hr>
                                                            </th>
                                                        </tr>
                                                    </table>
                                                </th>

                                                <th class="expander"></th>
                                            </tr>
                                        </table>
                                    </th>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <table class="spacer spacer--40">
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                </table>

                <table class="container">
                    <tr>
                        <td>
                            <table class="row">
                                <tr>
                                    <th class="column">
                                        <table>
                                            <tr>
                                                <th>
                                                    <h1>{{lang 'subject' store=store.name}}</h1>

                                                    <p>
                                                        {{lang 'hello' name=customer.first_name}}
                                                        <br />
                                                        {{lang 'message' store=store.name}}
                                                    </p>
                                                </th>

                                                <th class="expander"></th>
                                            </tr>
                                        </table>
                                    </th>
                                </tr>
                            </table>

                            <table class="spacer spacer--32">
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                            </table>

                           
                            <table class="spacer spacer--16">
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                            </table>

                            <table class="row">
                                <tr>
                                    <th class="column">
                                        <table>
                                            <tr>
                                                <th>
                                                    <a href="{{store.path}}" style = "background-color:blue; color:white" class="sigh-in">{{lang 'sign_in'}}</a>
                                                </th>

                                                <th class="expander"></th>
                                            </tr>
                                        </table>
                                    </th>
                                </tr>
                            </table>

                            <table class="spacer spacer--32">
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                            </table>

                            <table class="row">
                                <tr>
                                    <th class="column">
                                        <table>
                                            <tr>
                                                <th>
                                                    <p>{{lang 'help'}}</p>
                                                    <p>{{lang 'thanks'}}</p>
                                                    <p>{{lang 'goodbye'store=store.name}}</p>
                                                </th>

                                                <th class="expander"></th>
                                            </tr>
                                        </table>
                                    </th>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>



    <!-- prevent Gmail on iOS font size manipulation -->
    <div style="display:none;white-space:nowrap;font:15px courier;line-height:0">
        {{#for 1 30}}
            &nbsp;
        {{/for}}
    </div>
</body>

</html>

