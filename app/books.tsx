import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Background from "@/components/background";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BooksScreen = () => {
	const [blogPosts, setBlogPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const navigation = useNavigation();

	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	useFocusEffect(
		useCallback(() => {
			const loadSavedPosts = async () => {
				try {
					const keys = await AsyncStorage.getAllKeys();
					const savedKeys = keys.filter((k) => k.startsWith("saved_"));
					const entries = await AsyncStorage.multiGet(savedKeys);
					const posts = entries
						.map(([, value]) => {
							try { return JSON.parse(value); } catch { return null; }
						})
						.filter(Boolean);
					setBlogPosts(posts);
					setFilteredPosts(posts);
				} catch (error) {
					console.error("Error loading saved posts:", error);
				} finally {
					setLoading(false);
				}
			};

			loadSavedPosts();
		}, [])
	);

	useEffect(() => {
		if (searchQuery) {
			const q = searchQuery.toLowerCase();
			const filtered = blogPosts.filter(
				(post) =>
					post.title.toLowerCase().includes(q) ||
					(post.excerpt || "").toLowerCase().includes(q)
			);
			setFilteredPosts(filtered);
		} else {
			setFilteredPosts(blogPosts);
		}
	}, [searchQuery, blogPosts]);

	const renderItem = ({ item }) => {
		if (!item) return null;

		return (
			<TouchableOpacity style={isIpad ? styles.cardPad : styles.card} onPress={() => navigation.navigate("post", { post: item })}>
				{item.imageUrl ? (
					<Image source={{ uri: item.imageUrl }} style={isIpad ? styles.imagePad : styles.image} />
				) : (
					<View style={[isIpad ? styles.imagePad : styles.image, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
						<Text style={{ color: '#999', fontSize: 12 }}>Pas d'image</Text>
					</View>
				)}
				<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
					{item.title}
				</Text>
				<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
					{item.excerpt}
				</Text>
			</TouchableOpacity>
		);
	};

	if (loading) {
		return (
			<Background>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			</Background>
		);
	}

	return (
		<Background>
			<SafeAreaView style={{ flex: 1 }}>
				<Image source={require("@/assets/images/books.jpg")} style={isIpad ? styles.mainImagePad : styles.mainImage} />
				<Text style={isIpad ? styles.mainTitlePad : styles.mainTitle}>Vos articles sauvegardés</Text>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
					<TextInput style={styles.searchInput} placeholder="Rechercher..." value={searchQuery} onChangeText={setSearchQuery} />
					<View style={styles.container}>
						{filteredPosts.length > 0 ? (
							<FlatList data={filteredPosts} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.flatListContent} />
						) : (
							<Text style={styles.noResultsText}>Aucun article trouvé</Text>
						)}
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</Background>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	mainImage: {
		width: "100%",
		height: 150,
		resizeMode: "cover",
	},
	mainImagePad: {
		width: "100%",
		height: 400,
		resizeMode: "cover",
	},
	mainTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginTop: 10,
	},
	mainTitlePad: {
		fontSize: 34,
		fontWeight: "bold",
		textAlign: "center",
		textShadowColor: "rgba(0, 0, 0, 0.55)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		marginTop: 10,
		marginBottom: 10,
		color: "#FFF",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	searchInput: {
		paddingLeft: 30,
		paddingVertical: 10,
		color: "rgba(0, 0, 0, 0.65)",
		borderRadius: 10,
		backgroundColor: "#fff",
		margin: 30,
		boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.25)",
		marginLeft: "10%",
		marginRight: "10%",
	},
	flatListContent: {
		paddingBottom: 20,
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
	cardPad: {
		width: 500,
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
		height: 300,
		resizeMode: "cover",
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
		textAlign: "justify",
	},
	noResultsText: {
		fontSize: 22,
		color: "#fff",
		textAlign: "center",
	},
});

export default BooksScreen;
