import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Background from "@/components/background";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { fetchArticles } from "@/utils/parseArticles";

const NewsScreen = () => {
	const [blogPosts, setBlogPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const navigation = useNavigation();

	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	// Chargement initial des articles
	useEffect(() => {
		const fetchBlogPosts = async () => {
			try {
				const data = await fetchArticles();
				setBlogPosts(data);
				setFilteredPosts(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchBlogPosts();
	}, []);

	// Recherche locale dans les articles chargés
	useEffect(() => {
		if (searchQuery.trim()) {
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
				<Image source={require("@/assets/images/medias.jpg")} style={isIpad ? styles.mainImagePad : styles.mainImage} />
				<Text style={isIpad ? styles.mainTitlePad : styles.mainTitle}>Restez bien informé</Text>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
					<View style={styles.contain}>
						<TextInput
							style={styles.searchInput}
							placeholder="Rechercher dans tous les articles..."
							value={searchQuery}
							onChangeText={setSearchQuery}
						/>
						<View style={styles.bookmark}>
							<FontAwesome name="heart" style={styles.icoBook} onPress={() => navigation.navigate("books")} />
						</View>
					</View>
					<View style={styles.container}>
						{filteredPosts.length > 0 ? (
							<FlatList data={filteredPosts} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={styles.flatListContent} />
						) : (
							<View style={styles.noResultsContainer}>
								<Text style={styles.noResultsText}>
								{searchQuery ? `Aucun article trouvé pour "${searchQuery}"` : "Aucun article disponible"}
							</Text>
							</View>
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
	contain: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 5,
		margin: 30,
	},
	searchInput: {
		paddingLeft: 30,
		paddingVertical: 10,
		color: "rgba(0, 0, 0, 0.65)",
		borderRadius: 10,
		backgroundColor: "#fff",
		boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.25)",
		width: "100%",
	},
	bookmark: {
		position: "absolute",
		right: 0,
		padding: 5,
		backgroundColor: "#fff",
		borderRadius: 10,
		boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.25)",
	},
	icoBook: {
		fontSize: 30,
		color: "#f00",
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
	noResultsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 40,
	},
	searchIndicator: {
		position: "absolute",
		right: 60,
		top: 12,
	},
});

export default NewsScreen;
