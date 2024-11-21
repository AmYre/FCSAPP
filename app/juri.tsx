import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { decode } from "html-entities";
import Background from "@/components/background";

const JuriScreen = () => {
	const handleCall = () => {
		const phoneNumber = "+33148188820";
		Linking.openURL(`tel:${phoneNumber}`);
	};
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchBlogPosts = async () => {
			try {
				const response = await fetch("https://commerces-services.unsa.org/wp-json/wp/v2/posts?per_page=50&categories=94");
				const data = await response.json();
				setFilteredPosts(data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		fetchBlogPosts();
	}, []);

	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("post", { post: item })}>
			<Image source={{ uri: item.yoast_head_json.og_image[0].url }} style={styles.image} />
			<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
				{item.title.rendered}
			</Text>
			<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
				{decode(item.excerpt.rendered.replace(/<[^>]+>/g, ""))}
			</Text>
		</TouchableOpacity>
	);

	if (loading) {
		return (
			<Background>
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			</Background>
		);
	}

	return (
		<Background>
			<TouchableOpacity onPress={handleCall}>
				<Image source={require("@/assets/images/juri.png")} style={styles.mainImage} />
			</TouchableOpacity>
			<FlatList
				data={filteredPosts}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				ListHeaderComponent={
					<View style={styles.header}>
						<Text style={styles.mainTitle}>Restez informé sur Vos Droits</Text>
					</View>
				}
				contentContainerStyle={styles.scrollContainer}
			/>
		</Background>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mainImage: {
		width: "100%",
		height: 250,
		resizeMode: "cover",
	},
	scrollContainer: {
		padding: 40,
	},
	header: {
		alignItems: "center",
		marginBottom: 20,
	},
	mainTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginVertical: 20,
	},
	card: {
		width: 280,
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
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#00A3E9",
		textAlign: "center",
		padding: 10,
	},
	description: {
		fontSize: 14,
		color: "#666",
		padding: 10,
		textAlign: "justify",
	},
});

export default JuriScreen;
