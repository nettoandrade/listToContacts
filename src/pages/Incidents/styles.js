import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#FFF'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title:{
        fontSize: 30,
        marginBottom: 10,
        marginTop:30,
        color: '#13131a'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textbutton: {
        color:'#E02041'
    },
    contactlist:{
        marginTop:32
    },
    contact:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        color:'#E02041',
        marginTop: 5
    },
    textcontact:{
        
    }
});
