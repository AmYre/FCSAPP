import { decode } from "html-entities";

const BASE_URL = "https://unsa-fcs.fr";

export const parseArticlesFromHtml = (html: string) => {
	const articles: any[] = [];
	const cardRegex = /<a[^>]*href="(\/articles\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
	let match;

	while ((match = cardRegex.exec(html)) !== null) {
		const slug = match[1];
		const cardHtml = match[2];

		const imgUrlParamMatch = cardHtml.match(/\/_next\/image\?url=([^&]+)/);
		const imageUrl = imgUrlParamMatch ? decodeURIComponent(imgUrlParamMatch[1].replace(/&amp;/g, '&')) : null;

		const dateMatch = cardHtml.match(/bg-blue-fcs[^>]*>([^<]+)<\/div>/);
		const date = dateMatch ? dateMatch[1].trim() : '';

		const titleMatch = cardHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
		const title = titleMatch ? decode(titleMatch[1].replace(/<[^>]+>/g, '').trim()) : 'Sans titre';

		const excerptMatch = cardHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/);
		const excerpt = excerptMatch ? decode(excerptMatch[1].replace(/<[^>]+>/g, '').trim()) : '';

		articles.push({
			id: slug,
			slug,
			link: `${BASE_URL}${slug}`,
			imageUrl,
			date,
			title,
			excerpt,
		});
	}

	return articles;
};

export const fetchArticles = async (category?: string) => {
	const url = category
		? `${BASE_URL}/actu?category=${category}`
		: `${BASE_URL}/actu`;
	const response = await fetch(url);
	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
	const html = await response.text();
	return parseArticlesFromHtml(html);
};
