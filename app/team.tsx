import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView, useWindowDimensions } from "react-native";
import Background from "@/components/background";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TEAM_IMG = "https://unsa-fcs.fr/team";

const bureauMembers = [
	{
		id: "1",
		name: "Fatiha HIRAKI",
		role: "Secrétaire Générale",
		image: { uri: `${TEAM_IMG}/fatiha.jpg` },
		tel: "+33649823224",
	},
	{
		id: "2",
		name: "Michel BRAQUET",
		role: "Secr. Général Adjoint en charge des Branches",
		image: { uri: `${TEAM_IMG}/michel.jpg` },
		tel: "+33614074066",
	},
	{
		id: "3",
		name: "Nadia ZENAF",
		role: "Secrétaire Générale Adjointe",
		image: { uri: `${TEAM_IMG}/nadia.jpg` },
		tel: "+33618954769",
	},
	{
		id: "4",
		name: "Toure MA DEMBO",
		role: "Secrétaire Général Adjoint",
		image: { uri: `${TEAM_IMG}/toure.jpg` },
		tel: "+33615038762",
	},
	{
		id: "5",
		name: "Jean Pierre KEMPF",
		role: "Secr. Fédéral Trésorerie & HCR",
		image: { uri: `${TEAM_IMG}/jpk.jpg` },
		tel: "+33679671681",
	},
	{
		id: "6",
		name: "Sandrine VERDIER",
		role: "Trésorier Adjoint",
		image: { uri: `${TEAM_IMG}/sandrine.jpg` },
		tel: "+33626768002",
	},
];

const comMembers = [
	{
		id: "1",
		name: "Sandrine POULAIN",
		role: "Travail Temporaire",
		image: { uri: `${TEAM_IMG}/sandrine-poulain.jpg` },
		tel: "+33787547274",
	},
	{
		id: "2",
		name: "Charles MIGAN",
		role: "Prévention Sécurité",
		image: { uri: `${TEAM_IMG}/charles.jpg` },
		tel: "+33620391004",
	},
	{
		id: "3",
		name: "Maryse FUCHS",
		role: "Habillement",
		image: { uri: `${TEAM_IMG}/fuchs.jpg` },
		tel: "+33625364010",
	},
	{
		id: "4",
		name: "Fatiha ZAILIOUI",
		role: "Intérim",
		image: { uri: `${TEAM_IMG}/Fatiha-Zailioui.jpg` },
		tel: "+33695348563",
	},
	{
		id: "5",
		name: "Sébastien FOURNIER",
		role: "Commerces Divers",
		image: { uri: `${TEAM_IMG}/seb.jpg` },
		tel: "+33786597271",
	},
	{
		id: "6",
		name: "JOSSO Barbara",
		role: "Habillement",
		image: { uri: `${TEAM_IMG}/barbara-josso.jpg` },
	},
	{
		id: "7",
		name: "Khadija CHLAIT",
		role: "Propreté",
		image: { uri: `${TEAM_IMG}/KHADIJA-CHLAIT.jpg` },
		tel: "+33609605656",
	},
	{
		id: "8",
		name: "Abderrazak DJEFFEL",
		role: "Propreté",
		image: { uri: `${TEAM_IMG}/abdelrazzak.jpg` },
		tel: "+33612225770",
	},
	{
		id: "9",
		name: "TABBOU Abdelkrim",
		role: "Logistique Gde Distr. Samada",
		image: { uri: `${TEAM_IMG}/Abdelkrim-Tabbou.jpg` },
		tel: "+33624818782",
	},
	{
		id: "10",
		name: "HAMMOUTI Abdelali",
		role: "Hôtels Cafés Restaurants",
		image: { uri: `${TEAM_IMG}/abdelali.jpg` },
		tel: "+33650607305",
	},
	{
		id: "11",
		name: "Abdelhamid CHENOUF",
		role: "Prévention Sécurité",
		image: { uri: `${TEAM_IMG}/Hamid-Chenouf.jpg` },
	},
	{
		id: "12",
		name: "Steve BULOT",
		role: "Magasins de Sports",
		image: { uri: `${TEAM_IMG}/steve.jpg` },
		tel: "+33663646186",
	},
	{
		id: "13",
		name: "Frédéric POIGNANT",
		role: "Grande Distribution",
		image: { uri: `${TEAM_IMG}/fred.jpg` },
		tel: "+33664285853",
	},
	{
		id: "14",
		name: "Franck HUET",
		role: "Restauration Collective",
		image: { uri: `${TEAM_IMG}/franck.jpg` },
		tel: "+33680449404",
	},
	{
		id: "15",
		name: "Eric ROMAGNE",
		role: "Grande Distribution",
		image: { uri: `${TEAM_IMG}/eric%20romagne.jpg` },
	},
];

const papMembers = [
	{
		id: "1",
		name: "Akram GUELLOU",
		role: "Magasin de Sport",
		image: { uri: `${TEAM_IMG}/Akram.jpg` },
	},
	{
		id: "2",
		name: "Morgane DEBRITO",
		role: "Négociatrice PAP",
		image: { uri: `${TEAM_IMG}/Morgane-Debrito.jpg` },
	},
	{
		id: "3",
		name: "Nadia SELAMI",
		role: "Prévention Sécurité",
		image: { uri: `${TEAM_IMG}/nadia%20selami.jpg` },
	},
];

const TeamMember = ({ member, size = "normal" }) => {
	const handleCall = () => {
		if (member.tel) Linking.openURL(`tel:${member.tel}`);
	};

	const isLarge = size === "large";

	return (
		<TouchableOpacity
			style={[styles.card, isLarge && styles.cardLarge]}
			onPress={handleCall}
			disabled={!member.tel}
			activeOpacity={0.8}
		>
			<Image source={member.image} style={[styles.avatar, isLarge && styles.avatarLarge]} />
			<LinearGradient
				colors={["transparent", "rgba(0,0,0,0.7)"]}
				style={styles.cardGradient}
			/>
			<View style={styles.cardInfo}>
				<Text style={[styles.cardName, isLarge && styles.cardNameLarge]} numberOfLines={1}>
					{member.name}
				</Text>
				<Text style={[styles.cardRole, isLarge && styles.cardRoleLarge]} numberOfLines={2}>
					{member.role}
				</Text>
				{member.tel && (
					<View style={styles.phoneBadge}>
						<FontAwesome name="phone" size={10} color="#fff" />
						<Text style={styles.phoneText}>Appeler</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

const SectionTitle = ({ icon, title }) => (
	<View style={styles.sectionHeader}>
		<View style={styles.sectionLine} />
		<View style={styles.sectionBadge}>
			<FontAwesome name={icon} size={14} color="#fff" style={{ marginRight: 8 }} />
			<Text style={styles.sectionTitle}>{title}</Text>
		</View>
		<View style={styles.sectionLine} />
	</View>
);

const MemberGrid = ({ members, size, numColumns = 2 }) => {
	const { width } = useWindowDimensions();
	const cols = width >= 768 ? 3 : numColumns;

	// Split into rows
	const rows = [];
	for (let i = 0; i < members.length; i += cols) {
		rows.push(members.slice(i, i + cols));
	}

	return (
		<View style={styles.grid}>
			{rows.map((row, ri) => (
				<View key={ri} style={styles.gridRow}>
					{row.map((m) => (
						<View key={m.id} style={{ flex: 1, maxWidth: `${100 / cols}%`, padding: 6 }}>
							<TeamMember member={m} size={size} />
						</View>
					))}
					{row.length < cols &&
						Array.from({ length: cols - row.length }).map((_, i) => (
							<View key={`empty-${i}`} style={{ flex: 1, maxWidth: `${100 / cols}%`, padding: 6 }} />
						))}
				</View>
			))}
		</View>
	);
};

const TeamScreen = () => {
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	return (
		<Background>
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.heroContainer}>
						<Image source={require("@/assets/images/team.jpg")} style={isIpad ? styles.heroImagePad : styles.heroImage} />
						<LinearGradient
							colors={["transparent", "rgba(0,30,60,0.85)"]}
							style={styles.heroGradient}
						/>
						<View style={styles.heroContent}>
							<Text style={styles.heroTitle}>Notre Équipe</Text>
							<Text style={styles.heroSubtitle}>Au service de la justice sociale</Text>
						</View>
					</View>

					<View style={styles.content}>
						<SectionTitle icon="star" title="Membres du Bureau" />
						<MemberGrid members={bureauMembers} size="large" numColumns={2} />

						<SectionTitle icon="users" title="Commission Administrative" />
						<MemberGrid members={comMembers} size="normal" numColumns={2} />

						<SectionTitle icon="shield" title="Référents PAP" />
						<MemberGrid members={papMembers} size="normal" numColumns={2} />
					</View>

					<View style={{ height: 40 }} />
				</ScrollView>
			</SafeAreaView>
		</Background>
	);
};

const styles = StyleSheet.create({
	heroContainer: {
		position: "relative",
		height: 220,
	},
	heroImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	heroImagePad: {
		width: "100%",
		height: 350,
		resizeMode: "cover",
	},
	heroGradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "70%",
	},
	heroContent: {
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
		alignItems: "center",
	},
	heroTitle: {
		fontSize: 28,
		fontWeight: "800",
		color: "#fff",
		letterSpacing: 1,
	},
	heroSubtitle: {
		fontSize: 14,
		color: "rgba(255,255,255,0.8)",
		marginTop: 4,
		fontStyle: "italic",
	},
	content: {
		paddingHorizontal: 10,
		paddingTop: 10,
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 20,
		paddingHorizontal: 6,
	},
	sectionLine: {
		flex: 1,
		height: 1,
		backgroundColor: "rgba(255,255,255,0.2)",
	},
	sectionBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(0,163,233,0.25)",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		marginHorizontal: 10,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "700",
		color: "#fff",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	grid: {
		width: "100%",
	},
	gridRow: {
		flexDirection: "row",
	},
	card: {
		borderRadius: 14,
		overflow: "hidden",
		backgroundColor: "#1a1a2e",
		height: 200,
		position: "relative",
	},
	cardLarge: {
		height: 240,
	},
	avatar: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	avatarLarge: {
		height: "100%",
	},
	cardGradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "60%",
	},
	cardInfo: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: 10,
	},
	cardName: {
		fontSize: 13,
		fontWeight: "700",
		color: "#fff",
	},
	cardNameLarge: {
		fontSize: 15,
	},
	cardRole: {
		fontSize: 11,
		color: "rgba(255,255,255,0.75)",
		marginTop: 2,
	},
	cardRoleLarge: {
		fontSize: 12,
	},
	phoneBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(0,163,233,0.5)",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 10,
		alignSelf: "flex-start",
		marginTop: 5,
	},
	phoneText: {
		fontSize: 10,
		color: "#fff",
		marginLeft: 4,
		fontWeight: "600",
	},
});

export default TeamScreen;
