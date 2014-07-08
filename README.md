indoor-positioning
==================

A abordagem passou por criar um sistema com base em serviços em detrimento de um sistema monolítico.
Os serviços são processos standalone preparados para escalar. A comunicação entre eles é na maior parte feita por queues. Caso os serviços nodejs rodem em cluster o distribuição das mensagem será feita através de round robin.
O case 1 já está implementado e está apresentado mais em baixo. Neste momento o case 2 (Filas de caixa) esta em desenvolvimento.

![ScreenShot](https://raw.githubusercontent.com/Tlantic/indoor-positioning/master/resources/image003.png?token=792124__eyJzY29wZSI6IlJhd0Jsb2I6VGxhbnRpYy9pbmRvb3ItcG9zaXRpb25pbmcvbWFzdGVyL3Jlc291cmNlcy9pbWFnZTAwMy5wbmciLCJleHBpcmVzIjoxNDA1NDMxMTczfQ%3D%3D--d53af7cc8d21f9be1f36d03a84f33ce162ffd79e)

Case 1 - Entrada em Loja
 
Cenário
 
Notificar o utilizador, via pushnotification, quando o mesmo entra na loja e quando sai da loja.
 
Workflow
 
O processo LocationFeedService está a escuta (subscribe) das mensagens enviadas pelo feed da Movvo. Quando recebe uma mensagem envia para um Exchange que mediante o tipo (Area ou POI) envia para a queue correspondente. O processo LocationBusinessService recebe essa mensagem e valida se existe alguma regra de negócio definida para essa área e que cumpra todas as regras. Caso exista será enviada para o Exchange que mediante a ação vai colocar na quele correspondente. Por ultimo o processo MessengerService envia a mensagem (Push, Sms, email, etc).

![ScreenShot](https://raw.githubusercontent.com/Tlantic/indoor-positioning/master/resources/image004.png?token=792124__eyJzY29wZSI6IlJhd0Jsb2I6VGxhbnRpYy9pbmRvb3ItcG9zaXRpb25pbmcvbWFzdGVyL3Jlc291cmNlcy9pbWFnZTAwNC5wbmciLCJleHBpcmVzIjoxNDA1NDMyMjA5fQ%3D%3D--ffebcd664625c9a647bd02f7dd4bbce6f13b1708)