import AsyncStorage from '@react-native-async-storage/async-storage'
import {format} from 'date-fns'
import * as Notification from 'expo-notifications'
import { Alert } from 'react-native';

export interface  PlantsProps{
  
  id:string;
  name:string;
  about:string; 
  water_tips:string;
  photo:string;
  environments: [string],
  frequency: {
    times: number;
    repeat_every:string;
   };
   dateTimerNotification:Date;
   hour:string;
}

export interface  StoragePlantProps{
    [id:string]:{
        data:PlantsProps;
        notificationId:string;
    }
}

export async function savePlant(plant:PlantsProps):Promise<void> {
    try {

        const nextTime = new Date(plant.dateTimerNotification);
        const now = new Date();
        const {times, repeat_every} = plant.frequency;


        if(repeat_every === 'week'){

            const interval = Math.trunc(7/times); // se for 2.2 o resultado é 2
            nextTime.setDate(now.getDate()+interval);

        }else{
                nextTime.setDate(now.getDate()+1);
        }

        // para nao deixar valor negativo. " Math.abs"
        const seconds = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime())/1000) 
        );

       // Alert.alert(seconds.toString());
        const notificationId = await Notification.scheduleNotificationAsync({
            content:{
                title: 'Heeey 🌱',
                body:`Está na hora de cuidar da sua ${plant.name}`,
                sound:true,
                priority:Notification.AndroidNotificationPriority.HIGH,
                data:{
                    plant
                },
            },
            trigger:{
                seconds: seconds < 60 ? 60 : seconds,
                repeats:true
            }
        })

        console.log(notificationId);

        
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const oldPlant = data?(JSON.parse(data) as StoragePlantProps):{};

        const newPlant = {
            [plant.id]:{
                data:plant,
                notificationId

            }
        }

        await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({
            ...oldPlant,
            ...newPlant
        }))

    } catch (error) {
        throw new Error(error);
    }
    
}

export async function loadPlant():Promise<PlantsProps[]> {
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data?(JSON.parse(data) as StoragePlantProps):{};
        
        const plantsSorted = Object
        .keys(plants)
        .map((plant)=>{
            return {
                ...plants[plant].data,
                hour: format(new Date(plants[plant].data.dateTimerNotification),'HH:mm')
            }
        })
        .sort((a,b)=> 
            Math.floor(
                new Date(a.dateTimerNotification).getTime()/1000 -
                Math.floor(new Date(b.dateTimerNotification).getTime()/1000)
            )
        );

        return plantsSorted;
        

    } catch (error) {
        throw new Error(error);
    }
    
}

export async function removerPlant(id:string):Promise<void>{

    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) :{}; 

    await Notification.cancelScheduledNotificationAsync(plants[id].notificationId);

    delete plants[id]; 
    await AsyncStorage.setItem('@plantmanager:plants',JSON.stringify(plants));

}