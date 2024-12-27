import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking, ScrollView } from "react-native";
import Background from "@/components/background";
import { useWindowDimensions } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const images = {
	fatiha: require("../assets/images/team/fatiha.jpeg"),
	toure: require("../assets/images/team/toure.jpg"),
	nadia: require("../assets/images/team/nadia.jpeg"),
	michel: require("../assets/images/team/michel.jpg"),
	kempf: require("../assets/images/team/kempf.jpg"),
	sandrine: require("../assets/images/team/sandrine.jpg"),
	fuchs: require("../assets/images/team/fuchs.jpg"),
	seb: require("../assets/images/team/seb.jpg"),
	poulain: require("../assets/images/team/poulain.jpg"),
	khadija: require("../assets/images/team/khadija.jpg"),
	barbara: require("../assets/images/team/barbara.png"),
	om: require("../assets/images/team/om.jpg"),
	franck: require("../assets/images/team/franck.jpg"),
	abdelali: require("../assets/images/team/abdelali.jpg"),
	tabou: require("../assets/images/team/tabou.jpg"),
	steve: require("../assets/images/team/steve.png"),
};

const bureauMembers = [
	{
		id: "1",
		name: "Fatiha Hiraki",
		role: "Secrétaire Générale",
		image: images.fatiha,
		tel: "+33649823224",
	},
	{
		id: "2",
		name: "Toure MA DEMBO",
		role: "Secr. Général Adjoint",
		image: images.toure,
		tel: "+33615038762",
	},
	{
		id: "3",
		name: "Nadia ZENAF",
		role: "Secr. Générale Adjointe",
		image: images.nadia,
		tel: "+33618954769",
	},
	{
		id: "4",
		name: "Michel BRAQUET",
		role: "Secr. Gl. Adj. en charge des Branches",
		image: images.michel,
		tel: "+33614074066",
	},
	{
		id: "5",
		name: "Jean Pierre KEMPF",
		role: "Trésorier + HCR",
		image: images.kempf,
		tel: "+33679671681",
	},
	{
		id: "6",
		name: "Sandrine VERDIER",
		role: "Trésorier Adjoint",
		image: images.sandrine,
		tel: "+33626768002",
	},
];

const comMembers = [
	{
		id: "1",
		name: "Maryse FUCHS",
		role: "Habillement",
		image: images.fuchs,
		tel: "+33625364010",
	},
	{
		id: "2",
		name: "Sébastien FOURNIER",
		role: "Commerces Divers",
		image: images.seb,
		tel: "+33786597271",
	},
	{
		id: "3",
		name: "Sandrine POULAIN",
		role: "Travail temporaire",
		image: images.poulain,
		tel: "+33787547274",
	},
	{
		id: "4",
		name: "Khadija CHLAIT",
		role: "Propreté",
		image: images.khadija,
		tel: "+33609605656",
	},
	{
		id: "5",
		name: "JOSSO Barbara",
		role: "Habillement",
		image: images.barbara,
		tel: "+33679671681",
	},
	{
		id: "6",
		name: "Abderrazak DJEFFEL",
		role: "Propreté",
		image: images.om,
		tel: "+33612225770",
	},
	{
		id: "7",
		name: "Franck HUET",
		role: "Restauration Collective",
		image: images.franck,
		tel: "+33618954769",
	},
	{
		id: "8",
		name: "HAMMOUTI Abdelali",
		role: "Hôtels Cafés Restaurants",
		image: images.abdelali,
		tel: "+33650607305",
	},
	{
		id: "9",
		name: "TABBOU ABDELKRIM",
		role: "Logistique Gde DISTR. SAMADA",
		image: images.tabou,
		tel: "+33624818782",
	},
	{
		id: "10",
		name: "Steve BULOT",
		role: "Magasins de Sports",
		image: images.steve,
		tel: "+33663646186",
	},
];

const TeamMember = ({ member }) => {
	const handleCall = (tel) => {
		const phoneNumber = tel;
		Linking.openURL(`tel:${phoneNumber}`);
	};
	return (
		<TouchableOpacity style={styles.card} onPress={() => handleCall(member.tel)}>
			<Image source={member.image} style={styles.image} />
			<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
				{member.name}
			</Text>
			<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
				{member.role}
			</Text>
		</TouchableOpacity>
	);
};

const TeamScreen = () => {
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;
	return (
		<Background>
			<SafeAreaView style={{ flex: 1 }}>
				<Image source={require("@/assets/images/team.jpg")} style={isIpad ? styles.imagePad : styles.image} />
				<View style={styles.container}>
					<Text style={styles.mainTitle}>Membres du bureau</Text>
					<FlatList
						data={bureauMembers}
						renderItem={({ item }) => <TeamMember member={item} />}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.flatListContent}
						horizontal={isIpad}
					/>
					<Text style={styles.mainTitle}>Commission administrative</Text>
					<FlatList
						data={comMembers}
						renderItem={({ item }) => <TeamMember member={item} />}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.flatListContent}
						horizontal={isIpad}
					/>
				</View>
			</SafeAreaView>
		</Background>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		alignItems: "center",
	},
	flatListContent: {
		paddingBottom: 20,
	},
	card: {
		width: 280,
		maxHeight: 250,
		backgroundColor: "#fff",
		borderRadius: 10,
		overflow: "hidden",
		shadowColor: "rgba(0, 0, 0, 0.75)",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 20,
	},
	image: {
		width: "100%",
		height: 150,
		resizeMode: "cover",
	},
	imagePad: {
		width: "100%",
		height: 400,
		resizeMode: "cover",
	},
	mainTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginVertical: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#00A3E9",
		textAlign: "center",
		paddingRight: 20,
		paddingLeft: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	description: {
		fontSize: 14,
		color: "#666",
		marginHorizontal: 10,
		marginBottom: 20,
		paddingRight: 10,
		paddingLeft: 10,
		textAlign: "center",
	},
});

export default TeamScreen;
