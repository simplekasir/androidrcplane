---
layout: post
title: Receiver
categories: Cara_Pembuatan
---  
Rangkaian ELektronik untuk receiver ini lebih sederhana, pada dasarnya rangkaiannya sama dengan booster tanpa bluetooth.

Berikut ini skemanya

<div style="text-align:center">
<img alt="schematic nrf24l01" src="{{ site.baseurl }}/images/post/2018-5-10-Receiver/nrf_schematic.png" /> 
</div> 

Selanjutnya kita tinggal menghubungkan ke servo dan motor 
Receiver yang akan kita buat ini bisa terhubung dengan 6 servo

Daftar pin yang digunakan untuk servo dan motor

<table   width="400">
    <tr>
        <th>Servo/Motor</th>
        <th>Pin Arduino</th>
    </tr>
    <tr style="background:#ccc">
        <td>THROTTLE</td>
        <td>D2</td>
    </tr>
    <tr style="background:#ccc">
        <td>RUDDER</td>
        <td>D3</td>
    </tr>
    <tr style="background:#ccc">
        <td>ELEVATOR</td>
        <td>D4</td>
    </tr>
    <tr style="background:#ccc">
        <td>AILERON</td>
        <td>D5</td>
    </tr>
    <tr style="background:#ccc">
        <td>L ELEVON</td>
        <td>D6</td>
    </tr>
    <tr style="background:#ccc">
        <td>R ELEVON</td>
        <td>D7</td>
    </tr>

</table>


Namun dalam pesawat jenis simple delta, hanya menggunakan 2 servo dan 1 untuk motor. Sehingga rangkaiannya menjadi seperti ini 

<table   width="400">
    <tr>
        <th>Servo/Motor</th>
        <th>Pin Arduino</th>
    </tr>
    <tr style="background:#ccc">
        <td>THROTTLE</td>
        <td>D2</td>
    </tr> 
    <tr style="background:#ccc">
        <td>L ELEVON</td>
        <td>D6</td>
    </tr>
    <tr style="background:#ccc">
        <td>R ELEVON</td>
        <td>D7</td>
    </tr>

</table>

Jika digambar, rangkaian kabelnya akan tampak seperti ini:
<div style="text-align:center">
<img alt="schematic nrf24l01" src="{{ site.baseurl }}/images/post/2018-5-10-Receiver/receiver_schematic.png" /> 
</div> 

## Arduino Sketch 


```c++

#include <Servo.h> 
#include <RF24.h> 

#define INDEX_THROTTLE 0
#define INDEX_RUDDER   1
#define INDEX_ELEVATOR 2
#define INDEX_AILERON  3
#define INDEX_LELEVON  4
#define INDEX_RELEVON  5

#define CHANNEL_COUNT 6 

const byte address[6] = "00001";
RF24 radio(10, 9); // CE, CSN ini pin remote 

Servo servos[CHANNEL_COUNT];
byte datareceive[CHANNEL_COUNT]; 

struct TimeWait
{
    unsigned long mytime=0;
    boolean waitUntil(unsigned long waittime,boolean autoreset)
    {
        unsigned long currenttime = millis();
        if((currenttime - mytime) > waittime)
        {
            if(autoreset)
            mytime = currenttime;
            return true;
        }
        return false; 
    }

    boolean waitUntil(unsigned long waittime)
    {
        return waitUntil(waittime,true);
    }
    void resetoTimeNow()
    {
        mytime = millis();
    }
};


TimeWait autodown;

void setup() {
  Serial.begin(9600);

  /**setup servo**/
  servos[INDEX_THROTTLE].attach(2,1000,2000);
  servos[INDEX_RUDDER].attach(3);
  servos[INDEX_ELEVATOR].attach(4);
  servos[INDEX_AILERON].attach(5);
  servos[INDEX_LELEVON].attach(6);
  servos[INDEX_RELEVON].attach(7); 

  
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MAX);
  radio.setDataRate(RF24_250KBPS); 
  radio.setChannel(8);
  radio.startListening();

}
 

void sendDataToServo()
{
    for(int i=0;i<CHANNEL_COUNT;i++)
    {
        servos[i].write(datareceive[i]);
    }    
}

void loop() 
{
  if (radio.available())
  {  
     radio.read(datareceive, CHANNEL_COUNT);
     for(int i=0;i<CHANNEL_COUNT;i++){
              
              Serial.print(datareceive[i]); 
              Serial.print(" "); 
              
     }
     sendDataToServo();
     autodown.resetoTimeNow();
    Serial.println();
  }

   if(autodown.waitUntil(2000))
    {
      /*auto shutdown brushless motor when remote lose connected after 2000 miliseconds*/
      servos[INDEX_THROTTLE].write(0);
    } 
    
}

```