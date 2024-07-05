import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Alert, TextInput, View} from 'react-native';
import { Checkbox } from 'react-native-paper';

import styles from '../../../assets/StylesSheet';
import TrailService from '../../../services/TrailService';

export default function UploadTrail({route, navigation}) {

    const [filename, setFilename] = useState('');
    const [displayText, setDisplayText] = useState(false);
    const [file, setFile] = useState(null);
    const [filePath, setFilePath] = useState('');
    const [use, setUse] = useState('personal');
    const [details, setDetails] = useState('');
    

    async function handleUpload() {
        const trailFile = await TrailService.uploadTrailFile();
        if(trailFile != null) {
            setFile(trailFile);
            setFilePath(trailFile.assets[0].name);
            setDisplayText(true);
        }
    }

    async function handleSubmit() {
        if(filename == '') {
            Alert.alert('Trail name missing!', 'You have to give a name to the trail you uploaded.');
        }
        else if (file == null) {
            Alert.alert('File missing!','You need to upload a file. (.gpx, .tcx files are supported).')
        } else {
            if(await TrailService.addTrail(filename,file,use,route.params.userInfo.id, details, null)){
                return navigation.navigate('Trails',route.params);
            }
        }
    }

    function handleOptionChange(option) {
        setUse(option);
    };

    return (
        <SafeAreaView style={styles.home_container}>
            <TextInput
                style={{...styles.trail_input, marginBottom: 10}}
                onChangeText={(text) => setFilename(text)}
                value={filename}
                placeholder="What is this trail called?"
            /> 
            <TextInput
                style={{...styles.trail_input, marginBottom: 10, height: 200, width: 350}}
                onChangeText={(text) => setDetails(text)}
                value={details}
                placeholder="Give us extra details about this trail here. (optional)"
            />           
            <TouchableOpacity style={{...styles.trail_button, backgroundColor: '#ffbb00'}} onPress={handleUpload}>
                <Text style={{...styles.default_title, fontSize: 14}}>Upload a file (.gpx or .tcx format)</Text>
            </TouchableOpacity>
            {displayText==true && 
                <Text style={{ marginTop: 10, marginHorizontal: 40 }}>"{filePath}" was uploaded.</Text>
            }
            <View style={{...styles.checkbox_container, marginTop: 30}}>
                <Checkbox
                    status={use === 'personal' ? 'checked' : 'unchecked'}
                    onPress={() => handleOptionChange('personal')}
                />
                <Text>This trail is for personal use only.</Text>
            </View>
            <View style={styles.checkbox_container}>
                <Checkbox
                    status={use === 'public' ? 'checked' : 'unchecked'}
                    onPress={() => handleOptionChange('public')}
                />
                <Text>This trail can be used for public use.</Text>
            </View>
            <TouchableOpacity style={{...styles.trail_button, marginTop: 30, backgroundColor: '#dc343b'}} onPress={handleSubmit}>
                <Text style={{...styles.default_title, fontSize: 20, color: '#fff8e7'}}>Submit</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
}