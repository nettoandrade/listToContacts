import React from 'react';
import {Feather} from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

import styles from './styles';
import icon from '../../assets/icon.png';

export default function Incidents() {

  async function findContacts(){
    
    const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(data[0].name);
        }
      }
    
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Image source={icon}/>
        </View>        
        <Text style={styles.title}>Listar Contatos</Text>
        <TouchableOpacity style={styles.button} onPress={findContacts}>
        <Text style={styles.textbutton}>#Listar Contatos IPTV</Text>
        <Feather name="align-center" size={20} color="#E02041"/>
        </TouchableOpacity>
        <FlatList
        data={[1,2,3,4]}
        style={styles.contactlist}
        keyExtractor={ contacts => String(contacts)}
        renderItem={() => (
          <View style={styles.contact}>
            <Text style={styles.textContact}>Name</Text>
            <Text style={styles.textContact}>Contato</Text>
          </View>
        )}
        />
    </View>
  );
}