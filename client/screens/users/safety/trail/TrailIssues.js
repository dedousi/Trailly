import { SafeAreaView, Text, Image } from "react-native";

import styles from '../../../../assets/StylesSheet';

export default function TrailIssues({route, navigation}) {
    return (
        <SafeAreaView style={styles.basic_container}>
            <Image
                source={require('../../../../assets/icons/menu/trail_issues_logo.png')}
                style={styles.trail_issues_logo}
                resizeMode="contain"
            />
            <Text style={{...styles.default_title, fontSize: 20, margin: 10}}>
                No tips have been added here yet regarding trail issues 
                (landslides, broken bridges, floods, wrong signage and more).
            </Text>
        </SafeAreaView>
    );
}