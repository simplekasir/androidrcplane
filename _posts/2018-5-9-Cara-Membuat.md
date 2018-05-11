---
layout: post
title: Cara Pembuatan
categories: Cara_Pembuatan
--- 
{% capture imageurlbase %}{{site.baseurl}}/images/post/{{page.path | remove_first: "_posts/" | remove_first : ".md"}}/{% endcapture %} 
  

Ada tiga tahap pembuatan
1. [Install Aplikasi Android RC Plane](#stepinstall)
2. [Membuat Booster](../Booster)
3. [Membuat Receiver](../Receiver)



<div style="margin-bottom:80px;" id="stepinstall"></div>
## Install Aplikasi Android Rc Plane

Aplikasi Android Rc Plane dapat diunduh secara gratis di google play : 
<a class="but" target="_blank" href="https://play.google.com/store/apps/details?id=com.ttsberita.arduinoairplaneremote">Download</a>

## Cara Kerja
<div style="text-align:center">
    <img alt="signal transfer" src="{{ imageurlbase }}/signal_transfer.png" />
</div>
 
Jadi prinsip kerjanya, Aplikasi android akan mengirim perintah melalui bluetooth ke booster, selanjutnya booster atau repeater akan meneruskan dengan signal yang lebih kuat (tergantung modulnya) ke pesawatnya.


## Pemilihan Module Radio
Di sini saya menggunakan module NRF24lO1 + PA yang diklaim mampu mencapai jarak 1100 meter

<div style="text-align:center">
    <img alt="signal transfer" src="{{ imageurlbase }}/nrf24l01.png" />
</div>
 
