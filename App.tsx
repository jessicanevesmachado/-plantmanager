import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import  Routes from './src/routes'
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications'

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'
import { PlantsProps } from './src/libs/storage';

export default function App() {
  const[fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(()=>{

    // toda vez que receber notificao entra aqui
   /* const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
         const data = notification.request.content.data.plant as PlantsProps;
         console.log('recebi notificacao');
         console.log(data);
      }
    ) 
    return ()=> subscription.remove();*/

    // lista todas as notificacoes agendada
    /* async function notifications() {

      await Notifications.cancelAllScheduledNotificationsAsync(); // cancela todas as nitificacoes

      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log("NOTIFICACOES AGENDADAS ###########")
      console.log(data); 
    }

    notifications(); 
 */
   


  },[])

  if(!fontsLoaded)
    return (<AppLoading></AppLoading> )

  return (
         <Routes/>
  );
}

