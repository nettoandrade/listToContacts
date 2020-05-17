import React, { useState, useEffect } from 'react';
import {Feather} from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { Text, View, Image, TouchableOpacity, FlatList, Linking, AsyncStorage} from 'react-native';

import styles from './styles';
import icon from '../../assets/icon.png';

export default function Incidents({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [textFilter, settextFilter] = useState('');
  const msg = "Seu IPTV está proximo do vencimento, realize o pagamento para não ficar sem o serviço!"
  
  async function getByItemStorage(key){
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return settextFilter(value);
      } else {
        navigation.navigate('Config')
        return 
      }
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async function findContacts(stringFilter){
    getByItemStorage('text');
    const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        if (data.length > 0) {
          //console.log(data);
          let valores = {};
          if (stringFilter) {
            valores = data.filter((obj) => { return obj.name.includes(textFilter) && obj.phoneNumbers && obj.name.includes(stringFilter)});
          } else {
            valores = data.filter((obj) => { return obj.name.includes(textFilter) && obj.phoneNumbers && !obj.name.includes('Off')});
          }
          valores.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          setContacts(valores);
          setTotal(valores.length);
          //console.log(valores);
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
      <Feather name="send" size={20} style={styles.send} />
    </View>          
    </TouchableOpacity>
    )
  }

  //Utilizado para executar função ao realizar abertura do APP
  useEffect(() => {
    findContacts();
  },[]);
  
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.image} source={icon}/>
          <Text>Total {total} de contatos.</Text>
          <TouchableOpacity style={styles.button1}  onPress={() => navigation.navigate('Config')}>
            <Feather name="sliders" size={20} style={styles.send} />
          </TouchableOpacity>                    
        </View>        
        <Text style={styles.title}>Listar Contatos</Text>
        <TouchableOpacity style={styles.button1}  onPress={() => findContacts()}>
          <Text style={styles.textbutton}>#Listar Contatos IPTV</Text>
          <Feather name="align-center" size={20} color="#E02041"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1}  onPress={() => findContacts('Off')}>
          <Text style={styles.textbutton}>#Listar Contatos IPTV OFF</Text>
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