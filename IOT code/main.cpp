#include "mbed.h"
#include "HCSR04.h"


Serial pc(USBTX,USBRX);
Serial blue(p9,p10);         // TX = P14  RX = P13
DigitalOut status(LED1);
DigitalOut statust(LED4);
AnalogIn lm35(p20);
HCSR04 rangeFinder(p14,p13);
AnalogIn ECG (p19);
Timer t;


float range;
char mander='1';
float temp=0;
float signalC=0;
float timeC=0;

//Variables de HR
AnalogIn sens(p15);
float sig=0;
int flag=0;
float t1 = 0;
float t2 = 0; 
int it = 0;
float dif;
int BPM;
float sum = 0;
int acum = 0;
float lastBPM=0;


int main() 
{
    pc.baud(115200);
    blue.baud(115200);
    pc.printf("Bluetooth iniciado\n\r");
    
    while (1) 
    {
        if (blue.readable()) 
        {mander= blue.getc();}
        
       // if(mander=='a')
         //   {status=1;mander='1';}
            
        if (mander=='s')
            {status=0;mander='1';}
            
        if(mander=='d')
            {blue.printf("El estado del bluetooth es %i |\r",status.read());mander='1';}
            
        if(mander=='t')
        {
            statust=1;
            wait(20);
            temp=(lm35.read()*3.3)/.01;
            blue.printf("t,%f|\r",temp);
            pc.printf("t,%f\n\r",temp);
            mander=1; 
            statust=0; 
        }
        
        if(mander=='a')
        {   wait(1);
            rangeFinder.startMeas();
            wait(0.1);
            rangeFinder.getMeas(range);
            blue.printf("a,%.0f|\r", 77-range*100);
            pc.printf("a,%.0f\n\r", 77-range*100);
            mander=1;  
        }
        
        if(mander=='e')
        {
            t.reset();
            t.start();
            while (mander=='e')
            {
                signalC=ECG.read()*3.3;
                timeC=t.read();
                blue.printf("e,%f,%f|\r",signalC,timeC);
                pc.printf("e,%f,%f\n\r",signalC,timeC);
                wait(.02);
                if(timeC >=8)
                    {mander=1;} 
            }
        }
        
        if(mander=='p')
        {
            t.start();
            while(mander=='p')
            {
                if(acum == 2)
                {
                    sum = sum / 2;  
                    blue.printf("p,%f|\r",sum);
                    pc.printf("p,%f\n\r",sum);
                    sum = 0;
                    acum = 0;
                    mander='1';  
                }
                sig=sens.read();
                if(sig>=1 && flag==0)
                {
                if(it == 1)
                {
                            t2 = t.read(); 
                            it = 0; 
                            if(BPM!=0){lastBPM=BPM;
                        }  
                        dif = t2 - t1;
                        BPM = 60 / dif;
                        flag = 1;
                        if(BPM < 250 || BPM-lastBPM < (3/5)*lastBPM)
                        { 
                            sum = sum + BPM;
                            acum++;
                        }
                    }
                    else
                    {
                        t1 = t.read();
                        flag = 1;
                        it++;
                    }    
                }
                
                if(sig < 0.5 && flag == 1)
                    {flag =  0; }
                
            }
        
        }
    }
}