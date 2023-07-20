import React, { useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, BackHandler, Linking } from 'react-native'
import FormButton from '../Components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import CheckBox from '@react-native-community/checkbox';

import Onboarding from 'react-native-onboarding-swiper'

const ConsentStudy = ({ navigation }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

  return (
    <View style={{backgroundColor:'white'}}>
        <Text style={{fontSize: 20,fontWeight: 'bold', alignItems: 'center', alignContent: 'center', textAlign: 'center', marginTop: 60, marginBottom: 20}}>CONSENT FORM TO PARTICIPATE IN A RESEARCH STUDY</Text>
        <ScrollView>
                <View style={{ alignItems: 'baseline', marginLeft: 20, marginRight: 20, marginBottom: 150 }}>
                    <ScrollView style={styles.consentScrollView}>
                        <Text>
                            <Text style={styles.innerBoldText}>Study Title:{'\n'}</Text>
                            LapBot: Validation of an Artificial Intelligence-Powered Mobile Game App to Teach Safe
                            Cholecystectomy
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Principal Investigator:{'\n'}</Text>
                            Dr. Amin Madani, University Health Network
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Contact:{'\n'}</Text>
                            Dr. Amin Madani amin.madani@uhn.ca
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Introduction:{'\n'}</Text>
                            You are being asked to take part in a research study. Please read the information about the study
                            presented in this form. The form includes details on the study’s risks and benefits that you should
                            know before you decide if you would like to take part. You should take as much time as you need to
                            make your decision. You should ask the study principal investigator to explain anything that you do
                            not understand and make sure that all of your questions have been answered before signing this
                            consent form. Before you make your decision, feel free to talk about this study with anyone you wish.
                            Participation in this study is voluntary.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Background/Purpose:{'\n'}</Text>
                            
                            Games have proven to be an effective educational tool across various subjects, scenarios, and
                            experience levels. Using games in surgical education is essential for promoting deliberate practice. A
                            critical element of deliberate practice is expert feedback and coaching. Modern technological
                            advancements, including the introduction of AI for coaching, have potentially made gaming even
                            more beneficial. In this way, if an algorithm can be trained to replicate the mental model of expert
                            surgeons, then it can be leveraged to provide feedback anywhere, at any time. Ultimately, this would
                            overcome one of the greatest obstacles to surgical coaching, which is the availability of faculty for
                            consistent and timely feedback.{'\n'}
                            The research team has developed a smartphone app called “LapBot” that aims to facilitate safe
                            laparoscopic cholecystectomy techniques through mobile game. This gaming platform is very novel
                            and lacks: 1) validity evidence from the game’s scores and 2) evidence from end-users that it is both
                            a practical and valuable educational tool. Furthermore, surgical AI is in its infancy, and it is unclear
                            whether AI generated feedback can be effectively used for surgical coaching and the acquisition of
                            surgical skills. Ultimately, this data is needed to support the widespread use of pervasive educational
                            tools such as LapBot and ongoing development of similar platforms and incorporation of additional
                            modules to support surgical training. We are assessing the impact on learning curve through
                            gamification and exploring different visualization and interaction techniques.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Study Design:{'\n'}</Text>
                            
                            This study aims to obtain validity evidence for this teaching tool and assess its educational value
                            amongst surgical trainees and surgeons. The objective of this game is to identify where it is safe to
                            dissect during a laparoscopic cholecystectomy. LapBot presents players with surgical scenes during
                            the dissection of the hepatocystic triangle. The player is then asked to identify their target zone of
                            dissection for the given scenario. After submitting their response, users are graded with an accuracy
                            score according to pre-annotated Go and No-Go zones and provided with immediate AI-generated
                            feedback on a video clip of that scenario. Players undergo multiple iterations for different LC
                            scenarios with the game having 5 different levels with increasing difficulty.Scores will be collected
                            through the mobile application and extracted for analysis. Scores will be grouped according to level of
                            experience, and intra- and inter-group comparisons will be made using game scores as outcomes.
                            Electronic questionnaires will also be administered to assess self-perceived operative performance
                            and educational value both immediately and 3 months after playing the game.
                            If you volunteer to participate in this study, you will be asked to:
                            {'\n'}
                            {'\u25CF'} Answer questions - at different points in the game you may also be asked to answer some
                            questions (e.g., rate how confident you are with your answer){'\n'}
                            {'\u25CF'} Compete for a chance to win a prize{'\n'}
                            {'\u25CF'} Complete an online survey to evaluate educational value 3 months after playing the game
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Study Visits and Procedure:{'\n'}</Text>
                            
                            
                            The game has 5 levels of difficulty, approximately 15-45 minutes, and you may play the game
                            whenever is convenient for you and for however long you like. You will be asked to enter email
                            address, create a nickname of your choice, and answer a few questions about yourself into the game
                            app (game data). This data will be securely stored and will be maintained by the Concordia University
                            research team. The database can only be accessed by people who are involved in research. After 3
                            months, a member of the research team will email you a link to a short survey to gather feedback
                            about the game. Responses will be collected through SurveyMonkey.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Risks:{'\n'}</Text>
                            
                            You may not receive a direct benefit from participating in this study. This study poses minimal risk. In
                            order to minimize the risk of security breaches and to help ensure your confidentiality we recommend
                            that you use standard safety measures such as signing out of your account, closing your browser and
                            locking your screen or device when you are no longer using them/when you have completed the
                            study. This study will employ the use of Surveymonkey for the administration of a short survey three
                            months after playing the game. Surveymonkey collects information about users such as their IP
                            address, cookies, and device type. The app registration page will ask for your email address for
                            contact by the research team only and no other personal information is being used in this tool. These
                            web applications carry a risk for a security breach and confidentiality cannot be guaranteed.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Benefits:{'\n'}</Text>
                            
                            You will not receive direct benefit from participating in this study. Information learned from this study
                            may help surgical education continuing professional activities in the future.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Confidentiality:{'\n'}</Text>
                            
                            The information that you will share will remain strictly confidential and will be used solely for the
                            purposes of this research. Study data will not be used for professional evaluation outside of this
                            study. The only people who will have access to the research data are the members of the study team
                            at Concordia University and the University Health Network (UHN), including the UHN Research
                            Ethics Board, will have access to study information in order to ensure the study is following proper
                            laws and guidelines. No personal information will be gathered other than your email address which is
                            required to participate in the study. To protect your privacy, data obtained will be coded and kept
                            confidential, and your personal information will be de-identified using numbers and/or letters. Only the
                            study team will know the numbers and/or letters that link them to you. The study investigator will use
                            the study information collected about you specifically to address the study questions listed above and
                            not for any other purposes. Your study information will be kept by study investigators for 5 years from
                            completion of the study.{'\n'}
                            The following organizations may also receive study data: Concordia University is the developer of the
                            app used in this research study and will receive all data you input directly into the game including
                            game play data. This data will be shared with UHN research team and will contain your email and
                            nickname you create to use as your player name. Your personal information will not be used for any
                            other purposes other than emailing you a survey link three months after playing the game and to
                            enter you in a draw for prizes.{'\n'}
                            If you withdraw your consent to participate in this research email<Text style={styles.innerBoldText}> lapbot@ap-lab.ca</Text> with your request.
                            If some of the data have been shared with other researchers or published, it may not be possible to
                            remove this part of the data.{'\n'}
                            If the results of this study are published, your identity will remain confidential. It is expected that the
                            information collected during this study will be used in analyses and will be published/presented to the
                            scientific community at meetings and in journals. Even though the likelihood that someone may
                            identify you from the leaderboard is very small, it can never be completely eliminated. Please ensure
                            that the nickname you select for yourself is one you are comfortable sharing with other game players
                            as will appear on the leaderboard.

                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Voluntary Participation:{'\n'}</Text>
                            
                            Taking part in this study is voluntary. You may decide not to be in this study, or to be in the study
                            now and change your mind later. Refusal to participate/withdrawal from the study will not have
                            implications on the employment of participants or involve any penalty.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Withdrawal from the Study:{'\n'}</Text>
                            
                            You can choose to end your participation in this research (called withdrawal) at any time without
                            having to provide a reason. If you choose to withdraw from the study, you are encouraged to contact
                            the app research team at<Text style={styles.innerBoldText}> lapbot@ap-lab.ca</Text> Information that was recorded before you withdrew will
                            be used by the researchers for the purposes of the study, but no information will be collected after
                            you withdraw your permission.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Costs and Reimbursement:{'\n'}</Text>
                            
                            You will not be compensated for taking part in this study. The study team will provide prizes for top
                            performers and a random participant draw. Winners will be contacted by a member of the research
                            team using the email you provided in the app account creation registration page.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Rights as a Participant:{'\n'}</Text>
                            
                            By agreeing to participate in this study, you do not give up any of your legal rights against the
                            investigators or involved institutions for compensation, nor does this form relieve the investigators or
                            involved institutions of their legal and professional responsibilities.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Conflict of Interest:{'\n'}</Text>

                            Researchers have an interest in completing this study. Their interests should not influence your
                            decision to participate in this study.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Commercialization:{'\n'}</Text>
                            
                            Concordia University and the University Health Network (UHN) intend to claim sole ownership of any
                            results that would come from this study. You will not receive any financial benefit that might come
                            from the results of this study.
                            {'\n'}
                            <Text style={styles.innerBoldText}>{'\n'}Questions about the Study:{'\n'}</Text>
                            
                            If you have any questions, concerns or would like to speak to the study team for any reason, please
                            email <Text style={styles.innerBoldText}>lapbot@ap-lab.ca</Text> If you have any questions about your rights as a research participant or have
                            concerns about this study, call the Chair of the University Health Network Research Ethics Board
                            (UHN REB) or the Research Ethics office number at 416-581-7849. The REB is a group of people
                            who oversee the ethical conduct of research studies. The UHN REB is not part of the study team.
                            Everything that you discuss will be kept confidential. {'\n'}Thank you for your time and consideration.{'\n'}
                            </Text>
                    </ScrollView>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', margin: 15 }} onPress={() => { setToggleCheckBox(!toggleCheckBox) }}>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text style={{ marginLeft: 15, color: '#4d4d4d', fontSize: 18, fontFamily: 'GillSans', }}>
                            Accept the consent form
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
        </View>
    )
}

const styles = StyleSheet.create({
    consentScrollView: {
        height: windowHeight / 1.7,
        borderWidth:1,
        padding:10,
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
export default ConsentStudy

/*

const consentDetailButton2 = (navigation, toggleCheckBox, setToggleCheckBox) => {
    return (
        <ScrollView>
            <View style={{ alignItems: 'baseline', marginLeft: 20, marginRight: 20, marginBottom: 150 }}>
                <ScrollView style={styles.consentScrollView}>
                    <Text>
                        <Text style={styles.innerBoldText}>Study Title:{'\n'}</Text>
                        LapBot: Validation of an Artificial Intelligence-Powered Mobile Game App to Teach Safe
                        Cholecystectomy
                        {'\n'}
                        <Text style={styles.innerBoldText}>{'\n'}Principal Investigator:{'\n'}</Text>
                        Dr. Amin Madani, University Health Network
                        {'\n'}
                        <Text style={styles.innerBoldText}>{'\n'}Contact:{'\n'}</Text>
                        Dr. Amin Madani amin.madani@uhn.ca
                        Introduction:
                        You are being asked to take part in a research study. Please read the information about the study
                        presented in this form. The form includes details on the study’s risks and benefits that you should

                        Version 1.1 Date 6-Apr-2023 Page 2 of 4
                        know before you decide if you would like to take part. You should take as much time as you need to
                        make your decision. You should ask the study principal investigator to explain anything that you do
                        not understand and make sure that all of your questions have been answered before signing this
                        consent form. Before you make your decision, feel free to talk about this study with anyone you wish.
                        Participation in this study is voluntary.
                        Background/Purpose:
                        Games have proven to be an effective educational tool across various subjects, scenarios, and
                        experience levels. Using games in surgical education is essential for promoting deliberate practice. A
                        critical element of deliberate practice is expert feedback and coaching. Modern technological
                        advancements, including the introduction of AI for coaching, have potentially made gaming even
                        more beneficial. In this way, if an algorithm can be trained to replicate the mental model of expert
                        surgeons, then it can be leveraged to provide feedback anywhere, at any time. Ultimately, this would
                        overcome one of the greatest obstacles to surgical coaching, which is the availability of faculty for
                        consistent and timely feedback.
                        The research team has developed a smartphone app called “LapBot” that aims to facilitate safe
                        laparoscopic cholecystectomy techniques through mobile game. This gaming platform is very novel
                        and lacks: 1) validity evidence from the game’s scores and 2) evidence from end-users that it is both
                        a practical and valuable educational tool. Furthermore, surgical AI is in its infancy, and it is unclear
                        whether AI generated feedback can be effectively used for surgical coaching and the acquisition of
                        surgical skills. Ultimately, this data is needed to support the widespread use of pervasive educational
                        tools such as LapBot and ongoing development of similar platforms and incorporation of additional
                        modules to support surgical training. We are assessing the impact on learning curve through
                        gamification and exploring different visualization and interaction techniques.
                        Study Design:
                        This study aims to obtain validity evidence for this teaching tool and assess its educational value
                        amongst surgical trainees and surgeons. The objective of this game is to identify where it is safe to
                        dissect during a laparoscopic cholecystectomy. LapBot presents players with surgical scenes during
                        the dissection of the hepatocystic triangle. The player is then asked to identify their target zone of
                        dissection for the given scenario. After submitting their response, users are graded with an accuracy
                        score according to pre-annotated Go and No-Go zones and provided with immediate AI-generated
                        feedback on a video clip of that scenario. Players undergo multiple iterations for different LC
                        scenarios with the game having 5 different levels with increasing difficulty.Scores will be collected
                        through the mobile application and extracted for analysis. Scores will be grouped according to level of
                        experience, and intra- and inter-group comparisons will be made using game scores as outcomes.
                        Electronic questionnaires will also be administered to assess self-perceived operative performance
                        and educational value both immediately and 3 months after playing the game.
                        If you volunteer to participate in this study, you will be asked to:
                         Answer questions - at different points in the game you may also be asked to answer some
                        questions (e.g., rate how confident you are with your answer)
                         Compete for a chance to win a prize
                         Complete an online survey to evaluate educational value 3 months after playing the game
                        Study Visits and Procedure:
                        The game has 5 levels of difficulty, approximately 15-45 minutes, and you may play the game
                        whenever is convenient for you and for however long you like. You will be asked to enter email
                        address, create a nickname of your choice, and answer a few questions about yourself into the game

                        Version 1.1 Date 6-Apr-2023 Page 3 of 4
                        app (game data). This data will be securely stored and will be maintained by the Concordia University
                        research team. The database can only be accessed by people who are involved in research. After 3
                        months, a member of the research team will email you a link to a short survey to gather feedback
                        about the game. Responses will be collected through SurveyMonkey.
                        Risks:
                        You may not receive a direct benefit from participating in this study. This study poses minimal risk. In
                        order to minimize the risk of security breaches and to help ensure your confidentiality we recommend
                        that you use standard safety measures such as signing out of your account, closing your browser and
                        locking your screen or device when you are no longer using them/when you have completed the
                        study. This study will employ the use of Surveymonkey for the administration of a short survey three
                        months after playing the game. Surveymonkey collects information about users such as their IP
                        address, cookies, and device type. The app registration page will ask for your email address for
                        contact by the research team only and no other personal information is being used in this tool. These
                        web applications carry a risk for a security breach and confidentiality cannot be guaranteed.
                        Benefits:
                        You will not receive direct benefit from participating in this study. Information learned from this study
                        may help surgical education continuing professional activities in the future.
                        Confidentiality:
                        The information that you will share will remain strictly confidential and will be used solely for the
                        purposes of this research. Study data will not be used for professional evaluation outside of this
                        study. The only people who will have access to the research data are the members of the study team
                        at Concordia University and the University Health Network (UHN), including the UHN Research
                        Ethics Board, will have access to study information in order to ensure the study is following proper
                        laws and guidelines. No personal information will be gathered other than your email address which is
                        required to participate in the study. To protect your privacy, data obtained will be coded and kept
                        confidential, and your personal information will be de-identified using numbers and/or letters. Only the
                        study team will know the numbers and/or letters that link them to you. The study investigator will use
                        the study information collected about you specifically to address the study questions listed above and
                        not for any other purposes. Your study information will be kept by study investigators for 5 years from
                        completion of the study.
                        The following organizations may also receive study data: Concordia University is the developer of the
                        app used in this research study and will receive all data you input directly into the game including
                        game play data. This data will be shared with UHN research team and will contain your email and
                        nickname you create to use as your player name. Your personal information will not be used for any
                        other purposes other than emailing you a survey link three months after playing the game and to
                        enter you in a draw for prizes.
                        If you withdraw your consent to participate in this research email lapbot@ap-lab.ca with your request.
                        If some of the data have been shared with other researchers or published, it may not be possible to
                        remove this part of the data.
                        If the results of this study are published, your identity will remain confidential. It is expected that the
                        information collected during this study will be used in analyses and will be published/presented to the
                        scientific community at meetings and in journals. Even though the likelihood that someone may
                        identify you from the leaderboard is very small, it can never be completely eliminated. Please ensure
                        that the nickname you select for yourself is one you are comfortable sharing with other game players
                        as will appear on the leaderboard.

                        Version 1.1 Date 6-Apr-2023 Page 4 of 4
                        Voluntary Participation:
                        Taking part in this study is voluntary. You may decide not to be in this study, or to be in the study
                        now and change your mind later. Refusal to participate/withdrawal from the study will not have
                        implications on the employment of participants or involve any penalty.
                        Withdrawal from the Study:
                        You can choose to end your participation in this research (called withdrawal) at any time without
                        having to provide a reason. If you choose to withdraw from the study, you are encouraged to contact
                        the app research team at lapbot@ap-lab.ca Information that was recorded before you withdrew will
                        be used by the researchers for the purposes of the study, but no information will be collected after
                        you withdraw your permission.
                        Costs and Reimbursement:
                        You will not be compensated for taking part in this study. The study team will provide prizes for top
                        performers and a random participant draw. Winners will be contacted by a member of the research
                        team using the email you provided in the app account creation registration page.
                        Rights as a Participant:
                        By agreeing to participate in this study, you do not give up any of your legal rights against the
                        investigators or involved institutions for compensation, nor does this form relieve the investigators or
                        involved institutions of their legal and professional responsibilities.
                        Conflict of Interest:
                        Researchers have an interest in completing this study. Their interests should not influence your
                        decision to participate in this study.
                        Commercialization:
                        Concordia University and the University Health Network (UHN) intend to claim sole ownership of any
                        results that would come from this study. You will not receive any financial benefit that might come
                        from the results of this study.
                        Questions about the Study:
                        If you have any questions, concerns or would like to speak to the study team for any reason, please
                        email lapbot@ap-lab.ca If you have any questions about your rights as a research participant or have
                        concerns about this study, call the Chair of the University Health Network Research Ethics Board
                        (UHN REB) or the Research Ethics office number at 416-581-7849. The REB is a group of people
                        who oversee the ethical conduct of research studies. The UHN REB is not part of the study team.
                        Everything that you discuss will be kept confidential. Thank you for your time and consideration.
                        </Text>
                </ScrollView>
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
*/