import React, { useState }from 'react';
import { View, SafeAreaView, TextInput, Text, TouchableOpacity, Alert} from 'react-native';

import styles from '../../assets/StylesSheet';
import ReportService from '../../services/ReportService';

export default function Report({route, navigation}) {

    const [inputText, setText] = useState('');
    const [category, setCategory] = useState(null);
    const [weatherSelection, setWeatherSelection] = useState(false);
    const [trailIssueSelection, setTrailIssueSelection] = useState(false);

    async function handleSubmit() {
        if(category == null) {
            return Alert.alert('Chose Category!', 'You have to chose in which category your report befalls under!');
        }
        if(ReportService.addReport(category,inputText,null,route.params.userInfo.id)){
            return navigation.navigate('Home',route.params);
        }
    };

    function handleOptionSelect(option) {
        if(option == 'sos' || option == 'fire') {
            setWeatherSelection(false);
            setTrailIssueSelection(false);
            setCategory(option);
        } else if (option == 'weather') {
            setTrailIssueSelection(false);
            setWeatherSelection(true);
            setCategory(null);
        } else if (option == 'trail') {
            setWeatherSelection(false);
            setTrailIssueSelection(true);
            setCategory(null);
        }
    };

    function handleSecondOptionSelect(option) {
        setCategory(option);
    }

    return (
        <SafeAreaView style={styles.basic_container}>
            <Text style={{...styles.rescue_title}}>
                Report an event here:
            </Text>
            <Text style={{...styles.default_title, paddingHorizontal: 20, fontSize: 18}}> 
                Select the category that your report befalls under and explain briefly what happened:
            </Text>
            <View style={styles.options_container}>
                <TouchableOpacity 
                    style={[ styles.options, category === 'sos' && styles.options_selected]}
                    onPress={() => handleOptionSelect('sos')}
                >
                    <Text style={styles.options_text}>SOS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ styles.options, category === 'fire' && styles.options_selected ]}
                    onPress={() => handleOptionSelect('fire')}
                >
                    <Text style={styles.options_text}>Fire</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ styles.options, weatherSelection && styles.options_selected2 ]}
                    onPress={() => handleOptionSelect('weather')}
                >
                    <Text style={styles.options_text}>Weather Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ styles.options, trailIssueSelection && styles.options_selected2 ]}
                    onPress={() => handleOptionSelect('trail')}
                >
                    <Text style={styles.options_text}>Trail Issues</Text>
                </TouchableOpacity>
            </View>

            {weatherSelection &&
                <View style={[styles.options_container,{marginTop: -10}]}>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'storm' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('storm')}
                    >
                        <Text style={styles.options_text}>Storm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'heavy rainfall' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('heavy rainfall')}
                    >
                        <Text style={styles.options_text}>Heavy Rainfall</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'extreme heat' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('extreme heat')}
                    >
                        <Text style={styles.options_text}>Extreme Heat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'extreme cold' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('extreme cold')}
                    >
                        <Text style={styles.options_text}>Extreme Cold</Text>
                    </TouchableOpacity>
                </View>
            }
            {weatherSelection &&
                <View style={[styles.options_container,{marginTop: -10}]}>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'snowstorm' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('snowstorm')}
                    >
                        <Text style={styles.options_text}>Snowstorm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'blizzard' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('blizzard')}
                    >
                        <Text style={styles.options_text}>Blizzard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'ice storm' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('ice storm')}
                    >
                        <Text style={styles.options_text}>Ice Storm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'high winds' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('high winds')}
                    >
                        <Text style={styles.options_text}>High Winds</Text>
                    </TouchableOpacity>
                </View>
            }
            {weatherSelection && 
                <View style={[styles.options_container,{marginTop: -10}]}>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'fog' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('fog')}
                    >
                        <Text style={styles.options_text}>Fog</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'hailstorm' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('hailstorm')}
                    >
                        <Text style={styles.options_text}>Hailstorm</Text>
                    </TouchableOpacity>
                </View>
            }

            {trailIssueSelection &&
                <View style={[styles.options_container,{marginTop: -10}]}>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'broken bridge' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('broken bridge')}
                    >
                        <Text style={styles.options_text}>Broken Bridge</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'landslide' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('landslide')}
                    >
                        <Text style={styles.options_text}>Landslide</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'wrong signage' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('wrong signage')}
                    >
                        <Text style={styles.options_text}>Wrong Signage</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ styles.options2, category === 'flood' && styles.options_selected ]}
                        onPress={() => handleSecondOptionSelect('flood')}
                    >
                        <Text style={styles.options_text}>Flood</Text>
                    </TouchableOpacity>
                </View>
            }

            <View style={styles.basic_container}>
                <TextInput
                    style={styles.report_input}
                    onChangeText={(text) => setText(text)}
                    value={inputText}
                    placeholder="What happened? Explain here briefly."
                />
            </View>
            <TouchableOpacity style={styles.report_button} onPress={handleSubmit}>
                <Text style={{...styles.default_title, fontSize: 20, color: '#fff8e7'}}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}