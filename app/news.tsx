import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { decode } from "html-entities";
import Background from "@/components/background";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const NewsScreen = () => {
	const [blogPosts, setBlogPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searching, setSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const navigation = useNavigation();

	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	// Chargement initial des articles
	useEffect(() => {
		const fetchBlogPosts = async () => {
			try {
				const response = await fetch("https://commerces-services.unsa.org/wp-json/wp/v2/posts?per_page=50&_embed");
				const data = await response.json();
				setBlogPosts(data);
				setFilteredPosts(data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		fetchBlogPosts();
	}, []);

	// Recherche côté serveur avec l'API WordPress
	useEffect(() => {
		const searchPosts = async () => {
			if (searchQuery.trim()) {
				setSearching(true);
				try {
					// Recherche dans TOUS les articles WordPress avec le paramètre "search"
					const response = await fetch(
						`https://commerces-services.unsa.org/wp-json/wp/v2/posts?search=${encodeURIComponent(searchQuery)}&per_page=100&_embed`
					);
					const data = await response.json();
					setFilteredPosts(data);
				} catch (error) {
					console.error("Erreur de recherche:", error);
					setFilteredPosts([]);
				} finally {
					setSearching(false);
				}
			} else {
				// Si la recherche est vide, afficher les articles initiaux
				setFilteredPosts(blogPosts);
			}
		};

		// Debounce : attendre 500ms après que l'utilisateur arrête de taper
		const timeoutId = setTimeout(() => {
			searchPosts();
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchQuery, blogPosts]);

	const renderItem = ({ item }) => {
		// Vérification de sécurité pour éviter les crashes
		const imageUrl = item?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
		const title = item?.title?.rendered ? decode(item.title.rendered.replace(/<[^>]+>/g, "")) : 'Sans titre';
		const excerpt = item?.excerpt?.rendered ? decode(item.excerpt.rendered.replace(/<[^>]+>/g, "")) : '';

		return (
			<TouchableOpacity style={isIpad ? styles.cardPad : styles.card} onPress={() => navigation.navigate("post", { post: item })}>
				{imageUrl ? (
					<Image source={{ uri: imageUrl }} style={isIpad ? styles.imagePad : styles.image} />
				) : (
					<View style={[isIpad ? styles.imagePad : styles.image, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
						<Text style={{ color: '#999', fontSize: 12 }}>Pas d'image</Text>
					</View>
				)}
				<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
					{title}
				</Text>
				<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
					{excerpt}
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
						{searching && <ActivityIndicator size="small" color="#00A3E9" style={styles.searchIndicator} />}
						<View style={styles.bookmark}>
							<FontAwesome name="heart" style={styles.icoBook} onPress={() => navigation.navigate("books")} />
						</View>
					</View>
					<View style={styles.container}>
						{filteredPosts.length > 0 ? (
							<FlatList data={filteredPosts} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.flatListContent} />
						) : (
							<View style={styles.noResultsContainer}>
								{searching ? (
									<ActivityIndicator size="large" color="#00A3E9" />
								) : (
									<Text style={styles.noResultsText}>
										{searchQuery ? `Aucun article trouvé pour "${searchQuery}"` : "Aucun article disponible"}
									</Text>
								)}
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
