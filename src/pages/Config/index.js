import React, {useState,useEffect} from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';

import styles from './styles';

export default function Config({ navigation }) {
  const [key, setvaluekey] = useState('');
  
  async function carregar(){
    setvaluekey(getByItemStorage('text'));
  }

  async function getByItemStorage(key){
    try {
      let value = ''; 
      value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return setvaluekey(value);
      }
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async function setByItemStorage(key,value){
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  useEffect(() => {
    carregar();
  },[]);

  return (
    <View style={styles.container}>
        <View >
            <Text style={styles.header}>Configuração</Text>
        </View>
        <Text style={styles.textLabel}>Palavra Chave! (Filtro)</Text>
        <TextInput style={styles.textInput}
        onChangeText={(text) => setvaluekey(text)}  
        value={key}
        />
        <View style={styles.button}>
            <Button
            title="Salvar"
            onPress={() => setByItemStorage('text',key)}
            />
            <Button
            title="Voltar"
            onPress={() => navigation.navigate('Incidents')}
            />
        </View>
    </View>
  );
}