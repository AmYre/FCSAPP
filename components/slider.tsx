import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { decode } from "html-entities";

const BlogSlider = () => {
	const [blogPosts, setBlogPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchBlogPosts = async () => {
			try {
				const response = await fetch("https://commerces-services.unsa.org/wp-json/wp/v2/posts");
				const data = await response.json();
				setBlogPosts(data);
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
				{decode(item.title.rendered.replace(/<[^>]+>/g, ""))}
			</Text>
			<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
				{decode(item.excerpt.rendered.replace(/<[^>]+>/g, ""))}
			</Text>
		</TouchableOpacity>
	);

	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}
	return <FlatList data={blogPosts} renderItem={renderItem} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.slider} />;
};

const styles = StyleSheet.create({
	slider: {
		paddingVertical: 20,
	},
	card: {
		width: 250,
		marginHorizontal: 10,
		backgroundColor: "#fff",
		borderRadius: 10,
		overflow: "hidden",
		shadowColor: "rgba(0, 0, 0, 0.75)",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
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
});

export default BlogSlider;
