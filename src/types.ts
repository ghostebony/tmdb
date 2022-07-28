/* ---------------------------------- Global --------------------------------- */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never;

export type Language = string;

export type Region = string;

export type RequestParams = {
	language?: string;
	region?: string;
	include_adult?: boolean;
	append_to_response?: string[];
	[key: string]: any;
};

export type Error = {
	status_message: string;
	status_code: number;
};

/* ---------------------------------- Find --------------------------------- */

export type Find = {
	movie_results: MediaMovie[];
	person_results: MediaPerson[];
	tv_results: MediaTv[];
	// ? done without official docs ↓
	tv_episode_results: {
		air_date: string;
		episode_number: number;
		id: number;
		name: string;
		overview: string;
		production_code: string | null;
		season_number: number;
		show_id: number;
		still_path: string | null;
		vote_average: number;
		vote_count: number;
	}[];
	// ? done without official docs ↓
	tv_season_results: {
		air_date: string;
		episode_count: number;
		id: number;
		name: string;
		overview: string;
		poster_path: string | null;
		season_number: number;
		show_id: number;
	}[];
};

/* --------------------------------- Movie --------------------------------- */

export type Movie = {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: object | null;
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string | null;
	id: number;
	imdb_id: string | null;
	original_language: string;
	original_title: string;
	overview: string | null;
	popularity: number;
	poster_path: string | null;
	production_companies: {
		name: string;
		id: number;
		logo_path: string | null;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	release_date: string;
	revenue: number;
	runtime: number | null;
	spoken_languages: {
		iso_639_1: string;
		name: string;
	}[];
	status: "Rumored" | "Planned" | "In Production" | "Post Production" | "Released" | "Canceled";
	tagline: string | null;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type MovieAccountStates = {
	account_states: { id: number; favorite: boolean; rated: object | boolean; watchlist: boolean };
};

export type MovieAlternativeTitles = {
	alternative_titles: {
		id: number;
		titles: {
			iso_3166_1: string;
			title: string;
			type: string;
		}[];
	};
};

export type MovieChanges = {
	changes: {
		changes: {
			key: string;
			items: {
				id: number;
				action: string;
				time: string;
				iso_639_1: string;
				value: string;
				original_value: string;
			}[];
		}[];
	};
};

export type MovieCredits = {
	credits: {
		id: number;
		cast: {
			adult: boolean;
			gender: number | null;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
			cast_id: number;
			character: string;
			credit_id: string;
			order: number;
		}[];
		crew: {
			adult: boolean;
			gender: number | null;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
			credit_id: string;
			department: string;
			job: string;
		}[];
	};
};

export type MovieExternalIds = {
	external_ids: {
		imdb_id: string | null;
		facebook_id: string | null;
		instagram_id: string | null;
		twitter_id: string | null;
		id: number;
	};
};

export type MovieImages = {
	images: { id: number; backdrops: Image[]; posters: Image[] };
};

export type MovieKeywords = {
	keywords: {
		id: number;
		keywords: {
			id: number;
			name: string;
		}[];
	};
};

export type MovieLists = {
	lists: Search<{
		description: string;
		favorite_count: number;
		id: number;
		item_count: number;
		iso_639_1: string;
		list_type: string;
		name: string;
		poster_path: string | null;
	}>;
};

export type MovieRecommendations = {
	recommendations: {
		id: number;
		page: number;
		results: MediaMovie[];
		total_pages: number;
		total_results: number;
	};
};

export type MovieReleaseDates = {
	release_dates: {
		id: number;
		results: {
			iso_3166_1: string;
			release_dates: {
				certification: string;
				iso_639_1: string;
				release_date: string;
				type: number;
				note: string;
			}[];
		}[];
	};
};

export type MovieReviews = {
	reviews: Search<{
		author: string;
		author_details: {
			name: string;
			username: string;
			avatar_path: string | null;
			rating: number | null;
		};
		content: string;
		created_at: string;
		id: string;
		updated_at: string;
		url: string;
	}>;
};

export type MovieSimilar = {
	similar: Search<MediaMovie>;
};

export type MovieTranslations = {
	translations: {
		id: number;
		translations: {
			iso_3166_1: string;
			iso_639_1: string;
			name: string;
			english_name: string;
			data: {
				title: string;
				overview: string;
				homepage: string;
			};
		}[];
	};
};

export type MovieVideos = {
	videos: {
		id: number;
		results: {
			iso_639_1: string;
			iso_3166_1: string;
			name: string;
			key: string;
			site: string;
			size: number;
			type: string;
			official: boolean;
			published_at: string;
			id: string;
		}[];
	};
};

export type MovieWatchProviders = {
	watch_providers: {
		id: number;
		results: {
			[key: string]: {
				link: string;
				flatrate: {
					display_priority: number;
					logo_path: string;
					provider_id: number;
					provider_name: string;
				}[];
				rent: {
					display_priority: number;
					logo_path: string;
					provider_id: number;
					provider_name: string;
				}[];
				buy: {
					display_priority: number;
					logo_path: string;
					provider_id: number;
					provider_name: string;
				}[];
			};
		};
	};
};

export type MovieLatest = {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: object | null;
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: object[];
	production_countries: object[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: object[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type MovieNowPlaying = Search<{
	poster_path: string | null;
	adult: boolean;
	overview: string;
	release_date: string;
	genre_ids: number[];
	id: number;
	original_title: string;
	original_language: string;
	title: string;
	backdrop_path: string | null;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
}> & {
	dates: {
		maximum: string;
		minimum: string;
	};
};

export type MoviePopular = Search<MediaMovie>;

export type MovieTopRated = Search<MediaMovie>;

export type MovieUpcoming = Search<MediaMovie> & {
	dates: {
		maximum: string;
		minimum: string;
	};
};

/* --------------------------------- Search -------------------------------- */

export type Search<Result> = {
	page: number;
	results: Result[];
	total_results: number;
	total_pages: number;
};
