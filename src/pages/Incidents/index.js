import React, { useState, useEffect } from 'react';
import {Feather} from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { Text, View, Image, TouchableOpacity, FlatList, Linking } from 'react-native';

import styles from './styles';
import icon from '../../assets/icon.png';

export default function Incidents() {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const msg = "Seu IPTV está proximo do vencimento, realize o pagamento para não ficar sem o serviço!"

  async function findContacts(){
    
    const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        if (data.length > 0) {
          //console.log(data);
          const valores = data.filter((obj) => { return obj.name.includes('IPTV') && obj.phoneNumbers});
          valores.sort()
          setContacts(valores);
          setTotal(contacts.length);
        }
      }
  }

  function sendWhatSapp(phone){
    Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
    if (supported) {
      return Linking.openURL(
        `whatsapp://send?phone=${phone}&text=${msg}`
      );
    } else {
      return Linking.openURL(
        `https://api.whatsapp.com/send?phone=${phone}&text=${msg}`
      );
    }
  })
  }

  renderItem = ({item: contact}) => {
    return(
    <TouchableOpacity style={styles.button} onPress={() => sendWhatSapp(contact.phoneNumbers[0].number)}>
    <Text style={styles.textContact}>{contact.name}</Text>  
    <View style={styles.viewNumber}>              
      <Text style={styles.textContact}>{contact.phoneNumbers[0].number}</Text>
      <Feather name="arrow-up-right" size={20} color="#E02041"/>
    </View>          
    </TouchableOpacity>
    )
  }

  
  useEffect(() => {
    findContacts();
  },[]);
  
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Image source={icon}/>
          <Text>Total {total} de contatos.</Text>
        </View>        
        <Text style={styles.title}>Listar Contatos</Text>
        <TouchableOpacity style={styles.button}  onPress={() => findContacts()}>
          <Text style={styles.textbutton}>#Listar Contatos IPTV</Text>
          <Feather name="align-center" size={20} color="#E02041"/>
        </TouchableOpacity>
        <FlatList
        data={contacts}
        style={styles.contactlist}
        keyExtractor={ contacts => String(contacts.id)}
        showsVerticalScrollIndicator = {false}
        renderItem={renderItem}
        />
    </View>
  );
}