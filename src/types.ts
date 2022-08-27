export type Table = {
	fieldId: string;
	tablenum: number;
	table: string;
	editor: string;
};
export type Blog = {
	image: any;
	blog: any;
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	title: string;
	content: string;
	eyecatch: {
		url: string;
		height: number;
		width: number;
	};
	table: Table[];
	category: {
		id: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		revisedAt: string;
		name: string;
	};
};
export type Categories = {
	createdAt: string;
	id: string;
	name: string;
	publishedAt: string;
	revisedAt: string;
	updatedAt: string;
};
