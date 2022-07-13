import React, { useRef } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, BackHandler } from 'react-native'
import FormButton from '../Components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { windowHeight, windowWidth } from '../utils/Dimentions';

import Onboarding from 'react-native-onboarding-swiper'

const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(64, 177, 162, 1.0)' : 'rgba(64, 177, 162, 0.3)';

    return (
        <View
            style={{
                width: 10,
                height: 10,
                marginHorizontal: 4,
                borderRadius: 4,
                backgroundColor
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 20 }}
        {...props}
    >
        <Text style={{ fontSize: 20 }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 20 }}
        {...props}
    >
        <Text style={{ fontSize: 20 }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 30 }}
        {...props}
    >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Accept</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
    const onboardingRef = useRef(null);
    return (
        <ImageBackground
            source={require('../Assets/Images/background-onboarding.png')}
            resizeMode="cover"
            style={{ flex: 1, justifyContent: "center" }}
        >
            <Onboarding
                ref={onboardingRef}
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dots}
                skipToPage={3}
                showDone={false}
                bottomBarColor={'#c3e4ee'}
                pages={[
                    {
                        backgroundColor: 'rgba(255, 255, 255, 0.0)',
                        image: <Image source={require('../Assets/Images/sitting-dr-croped2.gif')}
                            style={styles.firstPageGIF} />,
                        title: 'Learning Made Easy',
                        subtitle: "With LapBot's activity modules, you'll learn to recognize Go Zones",

                    },
                    {
                        image: <Image source={require('../Assets/Images/two-dr-onboarding.gif')}
                            style={styles.secondPageGIF} />,
                        backgroundColor: 'rgba(255, 255, 255, 0.0)',
                        title: 'Design for Intuition',
                        subtitle: 'So you always know what to do in the operarating room',
                    },
                    {
                        image: <Image source={require('../Assets/Images/trophy-onboarding.gif')}
                            style={styles.thirdPageGIF} />,
                        backgroundColor: 'rgba(255, 255, 255, 0.0)',
                        title: 'Compete With Peers',
                        subtitle: 'See how you fare compared to your peers on the leaderboard',
                    },
                    {
                        image: <Image source={require('../Assets/Images/consent.png')}
                            style={styles.forthPageGIF} />,
                        backgroundColor: 'rgba(255, 255, 255, 0.0)',
                        title: 'Study Consent',
                        subtitle: consentDetailButton(navigation, onboardingRef),
                    },
                ]}
            />
        </ImageBackground>
    );
};
const consentDetailButton = (navigation, onboardingRef) => {
    return (
        <ScrollView>
            <View style={{ alignItems: 'baseline', marginLeft: 20, marginRight: 20 }}>
                <Text style={styles.tcP}>
                    This game collects and uses data from the embedded questionnaires and game to enable
                    core gameplay (e.g. saving your progress and score) and to answer research questions
                    about the best way to display medical and surgical data. To help support our research,
                    we ask for your consent to collect this in-app data.
                </Text>
                <Text style={styles.tcP}>
                    {'\u2022'} For more information please email gamification@ap-lab.ca
                </Text>
                <Text style={styles.tcP}>
                    {'\u2022'} If you wish to have any data connected to you deleted prior to January 2023,
                    please visit the player profile page or email us.
                </Text>
                <FormButton buttonTitle="Accept"
                    onPress={() => {
                        AsyncStorage.setItem('alreadyLaunchedOnboarding', 'true');
                        navigation.navigate("Login")
                    }} />
                <TouchableOpacity style={styles.refuseButtonContainer} onPress={() => onboardingRef.current.goToPage(0, true)}>
                    <Text style={styles.refuseButtonText}>Refuse</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    firstPageGIF: {
        marginTop: '30%',
    },
    secondPageGIF: {
        marginTop: '30%',
        width: '70%',
        height: 220,
    },
    thirdPageGIF: {
        marginTop: '30%',
        width: '100%',
        height: 320,
    },
    forthPageGIF: {
        marginTop: 40,
        marginBottom: -50,
        width: 200,
        height: 200,
    },
    tcP: {
        color: '#4d4d4d',
        fontSize: 17,
        marginBottom: 10,
    },
    refuseButtonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#b82323',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    refuseButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
})
