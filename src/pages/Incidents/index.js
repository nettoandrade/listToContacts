import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export default function Incidents() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text>Listar Contatos</Text>
        </View>
    </View>
  );
}