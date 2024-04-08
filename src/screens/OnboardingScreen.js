import React, { useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, BackHandler, Linking } from 'react-native'
import FormButton from '../Components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import CheckBox from '@react-native-community/checkbox';

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
        style={{ marginHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
        {...props}
    >
        <Text style={{ fontFamily: 'GillSans', fontSize: 20, }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
        {...props}
    >
        <Text style={{ fontFamily: 'GillSans', fontSize: 20, }}>Next</Text>
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
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <ImageBackground
            source={require('../Assets/Images/background-splashScreen.png')}
            resizeMode="cover"
            style={{ flex: 1, justifyContent: "center" }}
        >
            <Onboarding
                ref={onboardingRef}
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dots}
                skipToPage={4}
                showDone={false}
                bottomBarColor={'#c3e4ee'}
                pages={[
                    {
                        backgroundColor: 'rgba(255, 255, 255, 0.0)',
                        image: <Image source={require('../Assets/Images/front-line-drs.gif')}
                            style={styles.welcomePageGIF} />,
                        title: 'Welcome to LapBot',
                        subtitle: "",
                        titleStyles: { fontFamily: 'GillSans-SemiBoldItalic', fontSize: 40, paddingHorizontal: 15 },
                    },
                    {
                        image: <Image source={require('../Assets/Images/two-dr-onboarding.gif')}
                            style={styles.secondPageGIF} />,
                        backgroundColor: 'rgba(255, 255, 255, 0.0)',
                        title: '',
                        subtitle: 'Play the game to test how well you perform a Laparoscopic Cholecystectomy!',
                        titleStyles: { fontFamily: 'GillSans-SemiBold' },
                        subTitleStyles: { fontFamily: 'GillSans', fontSize: 20, paddingHorizontal: 10 }
                    },
                    {
                        backgroundColor: 'rgba(255, 255, 255, 0.0)',
                        image: <Image source={require('../Assets/Images/sitting-dr-croped2.gif')}
                            style={styles.firstPageGIF} />,
                        title: 'Learning Made Easy',
                        subtitle: "Recognize Safe and Dangerous Zones of Dissection",
                        titleStyles: { fontFamily: 'GillSans-SemiBold' },
                        subTitleStyles: { fontFamily: 'GillSans', fontSize: 20, paddingHorizontal: 15 }
                    },
                    {
                        image: <Image source={require('../Assets/Images/compete-with-peers.gif')}
                            style={styles.thirdPageGIF} />,
                        backgroundColor: 'rgba(255, 255, 255, 0.0)',
                        title: '',
                        subtitle: 'Compete With Your Peers on the Leaderboard',
                        titleStyles: { marginTop: -60, fontFamily: 'GillSans-SemiBold' },
                        subTitleStyles: { fontFamily: 'GillSans', fontSize: 20, paddingHorizontal: 15 }
                    },
                    {
                        image: <Image source={require('../Assets/Images/consent.png')}
                            style={styles.forthPageGIF} />,
                        backgroundColor: 'rgba(255, 255, 255, 1.0)',
                        title: 'Terms of service',
                        subtitle: consentDetailButton2(navigation, toggleCheckBox, setToggleCheckBox),
                        titleStyles: { fontFamily: 'GillSans-SemiBold' },
                        subTitleStyles: { fontFamily: 'GillSans', fontSize: 20 }
                    },
                ]}
            />
        </ImageBackground>
    );
};

const consentDetailButton2 = (navigation, toggleCheckBox, setToggleCheckBox) => {
    return (
        <ScrollView>
            <View style={{ alignItems: 'baseline', marginLeft: 20, marginRight: 20, marginBottom: 150 }}>
                <Text style={styles.tcP}>
                    The data (including images and videos), annotations, and scoring calculation methods used in the game are based on the research paper:
                    <Text style={{ color: '#3434fe' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/33196488/')}>
                        {'  '}A. Madani et al., “Artificial intelligence for intraoperative guidance: using semantic segmentation to identify surgical anatomy during laparoscopic cholecystectomy,” Annals of surgery, 2022.
                    </Text>
                </Text>
                <Text style={styles.tcP}>
                We are looking for General Surgery residents, fellows, and surgeon volunteers to take part in a study.
                The objective of the Lapbot game is to identify where it is safe to dissect during a laparoscopic
                cholecystectomy. We are assessing the impact on learning curve through gamification and exploring
                different visualization and interaction techniques.
                If you volunteer to be in this study:
                </Text>
                <Text style={styles.tcP}>
                {'\u25CF'} The game has 5 levels of difficulty{'\n'}
                {'\u25CF'} Answer in-app questions{'\n'}
                {'\u25CF'} Answer an online survey after playing the game
                </Text>
                
                <Text style={styles.tcP}>
                If you think you may want to participate in the study, you may proceed further by clicking the &#39;Next&#39;
                button otherwise, you can simply close this page.
                </Text>
                <Text style={styles.tcP}>
                    If you wish to have any data connected to you deleted please email lapBot@ap-lab.ca
                </Text>
                <Text style={styles.tcP}>
                    Please click the &#39;Next &#39; button to continue.
                </Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', margin: 15 }} onPress={() => { setToggleCheckBox(!toggleCheckBox) }}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text style={{ marginLeft: 15, color: '#4d4d4d', fontSize: 18, fontFamily: 'GillSans', }}>
                        Accept the terms of service
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!toggleCheckBox} style={[styles.acceptButtonContainer, toggleCheckBox ? { backgroundColor: '#33B957' } : { backgroundColor: 'silver' }]} onPress={() => {
                    AsyncStorage.setItem('alreadyLaunchedOnboarding', 'true');
                    navigation.navigate("Register")
                }}>
                    <Text style={styles.acceptButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const consentDetailButton = (navigation, toggleCheckBox, setToggleCheckBox) => {
    return (
        <ScrollView>
            <View style={{ alignItems: 'baseline', marginLeft: 20, marginRight: 20, marginBottom: 150 }}>
                <Text style={styles.tcP}>
                    The data (including images and videos), annotations, and scoring calculation methods used in the game are based on the research paper:
                    <Text style={{ color: '#3434fe' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/33196488/')}>
                        {'  '}A. Madani et al., “Artificial intelligence for intraoperative guidance: using semantic segmentation to identify surgical anatomy during laparoscopic cholecystectomy,” Annals of surgery, 2022.
                    </Text>
                </Text>
                <Text style={styles.tcP}>
                    The purpose of this research is to study how AI annotations of safe and unsafe dissection zones in surgical scenes can improve surgical decision-making.
                    There are no foreseen risks or benefits of playing this game.
                </Text>
                <Text style={styles.tcP}>
                    This game collects and uses data from the embedded questionnaires and game to enable core gameplay (e.g. saving your progress and score) and to answer research questions about the best way to display medical and surgical data. To help support our research, we ask for your consent to collect this in-app data.
                </Text>
                <Text style={styles.tcP}>
                    For more information please email lapBot@ap-lab.ca
                </Text>
                <Text style={styles.tcP}>
                    If you wish to have any data connected to you deleted please email us.
                </Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', margin: 15 }} onPress={() => { setToggleCheckBox(!toggleCheckBox) }}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text style={{ marginLeft: 15, color: '#4d4d4d', fontSize: 18, fontFamily: 'GillSans', }}>
                        Accept the terms of service
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!toggleCheckBox} style={[styles.acceptButtonContainer, toggleCheckBox ? { backgroundColor: '#33B957' } : { backgroundColor: 'silver' }]} onPress={() => {
                    AsyncStorage.setItem('alreadyLaunchedOnboarding', 'true');
                    navigation.navigate("Register")
                }}>
                    <Text style={styles.acceptButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    consentScrollView: {
        height: windowHeight / 3,
        borderWidth:2,
        padding:5,
    },
    innerBoldText: {
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomePageGIF: {
        marginTop: '30%',
        width: 250,
        height: 180,
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
    titleStyleOverride: {
        marginTop: 0,
    },
    tcP: {
        color: '#4d4d4d',
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'GillSans',
    },
    refuseButtonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#fa4b2a',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    refuseButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fffdf7',
        fontFamily: 'GillSans-SemiBold',
    },
    acceptButtonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        //backgroundColor: '#33B957',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    acceptButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fffdf7',
        fontFamily: 'GillSans-SemiBold',
    }
})

