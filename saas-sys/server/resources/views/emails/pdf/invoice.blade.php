<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Invoice</title>
      <style>
          .clearfix:after {
              content: "";
              display: table;
              clear: both;
          }

          a {
              color: #5D6975;
              text-decoration: underline;
          }

          body {
              position: relative;
              width: 21cm;
              height: 29.7cm;
              margin: 0 auto;
              color: #001028;
              background: #FFFFFF;
              font-family: Arial, sans-serif;
              font-size: 12px;
              font-family: Arial;
          }

          header {
              padding: 10px 0;
              margin-bottom: 30px;
          }

          #logo {
              text-align: center;
              margin-bottom: 10px;
          }

          #logo img {
              width: 90px;
          }

          h1 {
              border-top: 1px solid  #5D6975;
              border-bottom: 1px solid  #5D6975;
              color: #5D6975;
              font-size: 2.4em;
              line-height: 1.4em;
              font-weight: normal;
              text-align: center;
              margin: 0 0 20px 0;
              background: url(dimension.png);
          }

          #project {
              float: left;
          }

          #project span {
              color: #5D6975;
              text-align: right;
              width: 52px;
              margin-right: 10px;
              display: inline-block;
              font-size: 0.8em;
          }

          #company {
              float: right;
              text-align: right;
          }

          #project div,
          #company div {
              white-space: nowrap;
          }

          table {
              width: 100%;
              border-collapse: collapse;
              border-spacing: 0;
              margin-bottom: 20px;
          }

          table tr:nth-child(2n-1) td {
              background: #F5F5F5;
          }

          table th,
          table td {
              text-align: center;
          }

          table th {
              padding: 5px 20px;
              color: #5D6975;
              border-bottom: 1px solid #C1CED9;
              white-space: nowrap;
              font-weight: normal;
          }

          table .service,
          table .desc {
              text-align: left;
          }

          table td {
              padding: 20px;
              text-align: right;
          }

          table td.service,
          table td.desc {
              vertical-align: top;
          }

          table td.unit,
          table td.qty,
          table td.total {
              font-size: 1.2em;
          }

          table td.grand {
              border-top: 1px solid #5D6975;;
          }

          #notices .notice {
              color: #5D6975;
              font-size: 1.2em;
          }

          footer {
              color: #5D6975;
              width: 100%;
              height: 30px;
              position: absolute;
              bottom: 0;
              border-top: 1px solid #C1CED9;
              padding: 8px 0;
              text-align: center;
          }
      </style>
  </head>
  <body>
    <header class="clearfix">
      <div id="logo">
        <img style="width: 100px; height: 80px" src="{{$setting->logo??'https://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75'}}">
      </div>
      <h1>INVOICE</h1>
      <div id="company" class="clearfix">
          <div> {{$purchase->user->organization->name??''}}</div>
          <div>{{$purchase->user->organization->address??''}}</div>
          <div>{{$purchase->user->organization->email??''}}</div>
          <div>{{$purchase->user->organization->contact_person_mobile??''}}</div>
      </div>
      <div id="project">
          <div><span>CLIENT</span> {{$purchase->user->name??''}}</div>
        <div><span>EMAIL</span> <a href="mailto:{{$purchase->user->email??''}}">{{$purchase->user->email??''}}</a></div>
        <div><span>MOBILE</span> {{$purchase->user->mobile??''}}</a></div>
        <div><span>DATE</span> {{date('F j, Y', strtotime('today'))}}</div>
      </div>
    </header>

    <main>
      <table>
        <thead>
          <tr>
            <th class="service">NAME</th>
            <th class="desc">DESCRIPTION</th>
            <th style="min-width: 15%">PRICE</th>
            <th style="min-width: 15%">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td class="desc">{{$purchase->subscriptionPlan->name??''}}</td>
              <td class="desc">{{$purchase->subscriptionPlan->details??''}}</td>
              <td class="qty">{{$purchase->actual_price??''}} {{$setting->currency??'BDT'}}</td>
            <td class="total">{{$purchase->actual_price??''}}  {{$setting->currency??'BDT'}}</td>
          </tr>
         @if(isset($purchase->coupon))
          <tr>
            <td colspan="3">COUPON: {{$purchase->coupon->code}}</td>
            <td class="total">{{$purchase->sell_price - $purchase->actual_price}}  {{$setting->currency??'BDT'}}</td>
          </tr>
         @endif
          <tr>
            <td colspan="3" class="grand total">GRAND TOTAL</td>
            <td class="grand total">{{$purchase->sell_price }}  {{$setting->currency??'BDT'}}</td>
          </tr>
        </tbody>
      </table>
      <div id="notices">
        <div></div>
        <div class="notice"></div>
      </div>
    </main>
    <footer>
      Invoice was created on a computer and is valid without the signature and seal.
    </footer>
  </body>
</html>
