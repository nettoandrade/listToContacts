import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#CCC'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    send:{
        color:'#616161',
        textShadowRadius: 10        
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'        
    },
    title:{
        fontSize: 30,
        marginBottom: 10,
        marginTop:30,
        color: '#FFF',
        textAlign:'center',
        textShadowRadius: 30
    },
    button1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:10
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:10
    },
    textbutton: {
        color:'#616161'        
    },
    contactlist:{
        marginTop:20        
    },
    contact:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        color:'#E02041',
        marginTop: 5
    },
    textContact:{
    },
    viewNumber: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
});
