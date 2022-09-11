/* ---------------------------------- Global --------------------------------- */
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

export type Image = {
	aspect_ratio: number;
	file_path: string;
	height: number;
	iso_639_1: string | null;
	vote_average: number;
	vote_count: number;
	width: number;
};

export type MediaMovie = {
	poster_path: string | null;
	adult: boolean;
	overview: string;
	release_date: string;
	original_title: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	title: string;
	backdrop_path: string | null;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
};

export type MediaPerson = {
	profile_path: string | null;
	adult: boolean;
	id: number;
	known_for: KnownForMovie | KnownForTv;
	name: string;
	popularity: number;
};

export type MediaTv = {
	poster_path: string | null;
	popularity: number;
	id: number;
	overview: string;
	backdrop_path: string | null;
	vote_average: number;
	first_air_date: string;
	origin_country: string[];
	genre_ids: number[];
	original_language: string;
	vote_count: number;
	name: string;
	original_name: string;
};

export type KnownForMovie = MediaMovie & { media_type: "movie" };

export type KnownForPerson = MediaPerson & { media_type: "person" };

export type KnownForTv = MediaTv & { media_type: "tv" };

export type WatchProvidersCountryMovie =
	| "AR"
	| "AT"
	| "AU"
	| "BE"
	| "BR"
	| "CA"
	| "CH"
	| "CL"
	| "CO"
	| "CZ"
	| "DE"
	| "DK"
	| "EC"
	| "EE"
	| "ES"
	| "FI"
	| "FR"
	| "GB"
	| "GR"
	| "HU"
	| "ID"
	| "IE"
	| "IN"
	| "IT"
	| "JP"
	| "KR"
	| "LT"
	| "LV"
	| "MX"
	| "MY"
	| "NL"
	| "NO"
	| "NZ"
	| "PE"
	| "PH"
	| "PL"
	| "PT"
	| "RO"
	| "RU"
	| "SE"
	| "SG"
	| "TH"
	| "TR"
	| "US"
	| "VE"
	| "ZA";

export type WatchProvidersCountryTv =
	| "AR"
	| "AT"
	| "AU"
	| "BE"
	| "BR"
	| "CA"
	| "CH"
	| "CL"
	| "CO"
	| "CZ"
	| "DE"
	| "DK"
	| "EC"
	| "ES"
	| "FI"
	| "FR"
	| "GB"
	| "HU"
	| "IE"
	| "IN"
	| "IT"
	| "JP"
	| "MX"
	| "NL"
	| "NO"
	| "NZ"
	| "PE"
	| "PL"
	| "PT"
	| "RO"
	| "RU"
	| "SE"
	| "TR"
	| "US"
	| "VE"
	| "ZA";

/* ---------------------------------- Find --------------------------------- */

export type Account = {
	avatar: {
		gravatar: {
			hash: string;
		};
		tmdb?: {
			avatar_path: string;
		};
	};
	id: number;
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	include_adult: boolean;
	username: string;
};

export type AuthenticationGuestSessionNew = {
	success: boolean;
	guest_session_id: string;
	expires_at: string;
};

export type AuthenticationTokenNew = {
	success: boolean;
	expires_at: string;
	request_token: string;
};

export type AuthenticationSessionNew = {
	success: boolean;
	session_id: string;
};

export type AuthenticationTokenValidateWithLogin = {
	success: boolean;
	expires_at: string;
	request_token: string;
};

export type AuthenticationSessionConvert4 = {
	success: boolean;
	session_id: string;
};

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
			[country in WatchProvidersCountryMovie]: {
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

/* --------------------------------- Person -------------------------------- */

export type Person = {
	birthday: string | null;
	known_for_department: string;
	deathday: string | null;
	id: number;
	name: string;
	also_known_as: string[];
	gender: 0 | 1 | 2 | 3;
	biography: string;
	popularity: number;
	place_of_birth: string | null;
	profile_path: string | null;
	adult: boolean;
	imdb_id: string;
	homepage: string | null;
};

export type PersonChanges = {
	changes: {
		changes: {
			key: string;
			items: {
				id: string;
				action: string;
				time: string;
				original_value: { profile: { file_path: string } };
			}[];
		}[];
	};
};

export type PersonMovieCredits = {
	movie_credits: {
		cast: {
			character: string;
			credit_id: string;
			release_date: string;
			vote_count: number;
			video: boolean;
			adult: boolean;
			vote_average: number;
			title: string;
			genre_ids: number[];
			original_language: string;
			original_title: string;
			popularity: number;
			id: number;
			backdrop_path: string | null;
			overview: string;
			poster_path: string | null;
		}[];
		crew: {
			id: number;
			department: string;
			original_language: string;
			original_title: string;
			job: string;
			overview: string;
			vote_count: number;
			video: boolean;
			poster_path: string | null;
			backdrop_path: string | null;
			title: string;
			popularity: number;
			genre_ids: number[];
			vote_average: number;
			adult: boolean;
			release_date: string;
			credit_id: string;
		}[];
		id: number;
	};
};

export type PersonTvCredits = {
	tv_credits: {
		cast: {
			credit_id: string;
			original_name: string;
			id: number;
			genre_ids: number[];
			character: string;
			name: string;
			poster_path: string | null;
			vote_count: number;
			vote_average: number;
			popularity: number;
			episode_count: number;
			original_language: string;
			first_air_date: string;
			backdrop_path: string | null;
			overview: string;
			origin_country: string[];
		}[];
		crew: {
			id: number;
			department: string;
			original_language: string;
			episode_count: number;
			job: string;
			overview: string;
			origin_country: string[];
			original_name: string;
			genre_ids: number[];
			name: string;
			first_air_date: string;
			backdrop_path: string | null;
			popularity: number;
			vote_count: number;
			vote_average: number;
			poster_path: string | null;
			credit_id: string;
		}[];
		id: number;
	};
};

export type PersonCombinedCredits = {
	combined_credits: {
		cast: {
			id: number;
			original_language: string;
			episode_count: number;
			overview: string;
			origin_country: string[];
			original_name: string;
			genre_ids: number[];
			name: string;
			media_type: string;
			poster_path: string | null;
			first_air_date: string;
			vote_average: number;
			vote_count: number;
			character: string;
			backdrop_path: string | null;
			popularity: number;
			credit_id: string;
			original_title: string;
			video: boolean;
			release_date: string;
			title: string;
			adult: boolean;
		}[];
		crew: {
			id: number;
			department: string;
			original_language: string;
			episode_count: number;
			job: string;
			overview: string;
			origin_country: string[];
			original_name: string;
			vote_count: number;
			name: string;
			media_type: string;
			popularity: number;
			credit_id: string;
			backdrop_path: string | null;
			first_air_date: string;
			vote_average: number;
			genre_ids: number[];
			poster_path: string | null;
			original_title: string;
			video: boolean;
			title: string;
			adult: boolean;
			release_date: string;
		}[];
		id: number;
	};
};

export type PersonExternalIds = {
	external_ids: {
		imdb_id: string | null;
		facebook_id: string | null;
		freebase_mid: string | null;
		freebase_id: string | null;
		tvrage_id: number | null;
		twitter_id: string | null;
		id: number;
		instagram_id: string | null;
	};
};

export type PersonImages = {
	images: {
		id: number;
		profiles: {
			aspect_ratio: number;
			file_path: string;
			height: number;
			iso_639_1: null; // FIXME
			vote_average: number;
			vote_count: number;
			width: number;
		}[];
	};
};

export type PersonTaggedImages = {
	tagged_images: Search<{
		aspect_ratio: number;
		file_path: string;
		height: number;
		id: string;
		iso_639_1: string | null;
		vote_average: number;
		vote_count: number;
		width: number;
		image_type: string;
		media: MediaMovie | MediaTv;
		media_type: string;
	}> & { id: number };
};

export type PersonTranslations = {
	translations: {
		translations: {
			iso_639_1: string;
			iso_3166_1: string;
			name: string;
			data: { biography: string };
			english_name: string;
		}[];
		id: number;
	};
};

export type PersonLatest = {
	adult: boolean;
	also_known_as: object[];
	biography: string | null;
	birthday: string | null;
	deathday: string | null;
	gender: number;
	homepage: string | null;
	id: number;
	imdb_id: string | null;
	name: string;
	place_of_birth: string | null;
	popularity: number;
	profile_path: string | null;
};

export type PersonPopular = Search<{
	profile_path: string;
	adult: boolean;
	id: number;
	known_for: KnownForMovie | KnownForTv;
	name: string;
	popularity: number;
}>;

/* --------------------------------- Search -------------------------------- */

export type Search<Result> = {
	page: number;
	results: Result[];
	total_results: number;
	total_pages: number;
};

export type SearchCompany = Search<{
	id: number;
	logo_path: string | null;
	name: string;
}>;

export type SearchCollection = Search<{
	id: number;
	backdrop_path: string | null;
	name: string;
	poster_path: string | null;
}>;

export type SearchKeyword = Search<{
	id: number;
	name: string;
}>;

export type SearchMovie = Search<MediaMovie>;

export type SearchMulti = Search<{
	profile_path: string | null;
	adult: boolean;
	id: number;
	known_for: KnownForMovie | KnownForTv | KnownForPerson;
	name: string;
	popularity: number;
}>;

export type SearchPerson = Search<{
	profile_path: string | null;
	adult: boolean;
	id: number;
	known_for: KnownForMovie | KnownForTv;
	name: string;
	popularity: number;
}>;

export type SearchTv = Search<MediaTv>;

/* ----------------------------------- Tv ---------------------------------- */

export type Tv = {
	backdrop_path: string | null;
	created_by: {
		id: number;
		credit_id: string;
		name: string;
		gender: number;
		profile_path: string | null;
	}[];
	episode_run_time: number[];
	first_air_date: string;
	genres: { id: number; name: string }[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: {
		air_date: string;
		episode_number: number;
		id: number;
		name: string;
		overview: string;
		production_code: string;
		season_number: number;
		still_path: string | null;
		vote_average: number;
		vote_count: number;
	};
	name: string;
	next_episode_to_air: object | null;
	networks: {
		name: string;
		id: number;
		logo_path: string | null;
		origin_country: string;
	}[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: {
		id: number;
		logo_path: string | null;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	seasons: {
		air_date: string;
		episode_count: number;
		id: number;
		name: string;
		overview: string;
		poster_path: string;
		season_number: number;
	}[];
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	}[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
};

export type TvAccountStates = {
	account_states: { id: number; favorite: boolean; rated: object | boolean; watchlist: boolean };
};

export type TvAggregateCredits = {
	agregate_credits: {
		cast: {
			adult: boolean;
			gender: number | null;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
			roles: {
				credit_id: string;
				character: string;
				episode_count: number;
			}[];
			total_episode_count: number;
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
			jobs: {
				credit_id: string;
				job: string;
				episode_count: number;
			}[];
			department: string;
			total_episode_count: number;
		}[];
		id: number;
	};
};

export type TvAlternativeTitles = {
	alternative_titles: {
		id: number;
		results: {
			title: string;
			iso_3166_1: string;
			type: string;
		}[];
	};
};

export type TvChanges = {
	changes: {
		changes: {
			key: string;
			items: {
				id: string;
				action: string;
				time: string;
			}[];
		}[];
	};
};

export type TvContentRatings = {
	content_ratings: {
		results: {
			iso_3166_1: string;
			rating: string;
		}[];
		id: number;
	};
};

export type TvCredits = {
	credits: {
		cast: {
			adult: boolean;
			gender: number | null;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
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
		id: number;
	};
};

export type TvEpisodeGroups = {
	episode_groups: {
		results: {
			description: string;
			episode_count: number;
			group_count: number;
			id: string;
			name: string;
			network: {
				id: number;
				logo_path: string;
				name: string;
				origin_country: string;
			}[];
			type: number;
		}[];
		id: number;
	};
};

export type TvExternalIds = {
	external_ids: {
		imdb_id: string | null;
		freebase_mid: string | null;
		freebase_id: string | null;
		tvdb_id: number | null;
		tvrage_id: number | null;
		facebook_id: string | null;
		instagram_id: string | null;
		twitter_id: string | null;
		id: number;
	};
};

export type TvImages = {
	images: {
		backdrops: {
			aspect_ratio: number;
			file_path: string;
			height: number;
			iso_639_1: string | null;
			vote_average: number;
			vote_count: number;
			width: number;
		}[];
		id: number;
		posters: {
			aspect_ratio: number;
			file_path: string;
			height: number;
			iso_639_1: string | null;
			vote_average: number;
			vote_count: number;
			width: number;
		}[];
	};
};

export type TvKeywords = {
	keywords: {
		id: number;
		results: {
			id: number;
			name: string;
		}[];
	};
};

export type TvRecommendations = {
	recommendations: Search<MediaTv>;
};

export type TvReviews = {
	reviews: Search<{
		author: string;
		author_details: {
			name: string;
			username: string;
			avatar_path: string | null;
			rating: number;
		}[];
		content: string;
		created_at: string;
		id: string;
		updated_at: string;
		url: string;
	}> & { id: number };
};

export type TvScreenedTheatrically = {
	screened_theatrically: {
		id: number;
		results: {
			id: number;
			episode_number: number;
			season_number: number;
		}[];
	};
};

export type TvSimilar = {
	similar: Search<MediaTv>;
};

export type TvTranslations = {
	translations: {
		id: number;
		translations: {
			iso_3166_1: string;
			iso_639_1: string;
			name: string;
			english_name: string;
			data: {
				name: string;
				overview: string;
				homepage: string;
			};
		}[];
	};
};

export type TvVideos = {
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

export type TvWatchProviders = {
	watch_providers: {
		id: number;
		results: {
			[country in WatchProvidersCountryTv]: {
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
		}[];
	};
};

export type TvTvSeason = {
	[season: `season/${number}`]: TvSeason;
};

export type TvLatest = {
	backdrop_path: string | null;
	created_by: object[];
	episode_run_time: number[];
	first_air_date: string;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	name: string;
	networks: {
		id: number;
		name: string;
	}[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string | null;
	popularity: number;
	poster_path: string | null;
	production_companies: object[];
	seasons: {
		air_date: string;
		episode_count: number;
		id: number;
		poster_path: string | null;
		season_number: number;
	}[];
	status: string;
	type: string;
	vote_average: number;
	vote_count: number;
};

export type TvAiringToday = Search<MediaTv>;

export type TvOnTheAir = Search<MediaTv>;

export type TvPopular = Search<MediaTv>;

export type TvTopRated = Search<MediaTv>;

/* -------------------------------- Tv Season ------------------------------- */

export type TvSeason = {
	_id: string;
	air_date: string;
	episodes: {
		air_date: string;
		episode_number: number;
		crew: {
			department: string;
			job: string;
			credit_id: string;
			adult: boolean;
			gender: number;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
		}[];
		guest_stars: {
			credit_id: string;
			order: number;
			character: string;
			adult: boolean;
			gender: number | null;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
		}[];
		id: number;
		name: string;
		overview: string;
		production_code: string;
		season_number: number;
		still_path: string;
		vote_average: number;
		vote_count: number;
	}[];
	name: string;
	overview: string;
	id: number;
	poster_path: string | null;
	season_number: number;
};

export type TvSeasonAccountStates = {
	account_states: {
		id: number;
		results: {
			id: number;
			episode_number: number;
			rated: boolean | { value: number };
		}[];
	};
};

export type TvSeasonAggregateCredits = {
	aggregate_credits: {
		cast: {
			adult: boolean;
			gender: number | null;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
			roles: {
				credit_id: string;
				character: string;
				episode_count: number;
			}[];
			total_episode_count: number;
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
			jobs: {
				credit_id: string;
				job: string;
				episode_count: number;
			}[];
			department: string;
			total_episode_count: number;
		}[];
		id: number;
	};
};

export type TvSeasonChanges = {
	changes: {
		changes: {
			key: string;
			items: {
				id: string;
				action: string;
				time: string;
				value: string | { episode_id: number; episode_number: number };
				iso_639_1: string;
				original_value: string;
			}[];
		}[];
	};
};

export type TvSeasonCredits = {
	credits: {
		cast: {
			adult: boolean;
			gender: number | null;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
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
		id: number;
	};
};

export type TvSeasonExternalIds = {
	external_ids: {
		freebase_mid: string | null;
		freebase_id: string | null;
		tvdb_id: number | null;
		tvrage_id: number | null;
		id: number;
	};
};

export type TvSeasonImages = {
	images: {
		id: number;
		posters: {
			aspect_ratio: number;
			file_path: string;
			height: number;
			iso_639_1: string;
			vote_average: number;
			vote_count: number;
			width: number;
		}[];
	};
};

export type TvSeasonTranslations = {
	translations: {
		id: number;
		translations: {
			iso_3166_1: string;
			iso_639_1: string;
			name: string;
			english_name: string;
			data: {
				name: string;
				overview: string;
			}[];
		}[];
	};
};

export type TvSeasonVideos = {
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

export type TvSeasonTvSeasonEpisode = {
	[episode: `episode/${number}`]: TvSeasonEpisode;
};

/* ---------------------------- Tv Season Episode --------------------------- */

export type TvSeasonEpisode = {
	air_date: string;
	crew: {
		id: number;
		credit_id: string;
		name: string;
		department: string;
		job: string;
		profile_path: string | null;
	}[];
	episode_number: number;
	guest_stars: {
		id: number;
		name: string;
		credit_id: string;
		character: string;
		order: number;
		profile_path: string | null;
	}[];
	name: string;
	overview: string;
	id: number;
	production_code: string | null;
	season_number: number;
	still_path: string | null;
	vote_average: number;
	vote_count: number;
};

export type TvSeasonEpisodeAccountStates = {
	account_states: {
		id: number;
		rated: object | boolean;
	};
};

export type TvSeasonEpisodeChanges = {
	changes: {
		changes: {
			key: string;
			items: {
				id: string;
				action: string;
				time: string;
				value: string;
				iso_639_1: string;
			}[];
		}[];
	};
};

export type TvSeasonEpisodeCredits = {
	credits: {
		cast: {
			adult: boolean;
			gender: number | null;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
			character: string;
			credit_id: string;
			order: number;
		}[];
		crew: {
			department: string;
			job: string;
			credit_id: string;
			adult: boolean;
			gender: number | null;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
		}[];
		guest_stars: {
			character_name: string;
			credit_id: string;
			order: number;
			adult: boolean;
			gender: number | null;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string | null;
		}[];
		id: number;
	};
};

export type TvSeasonEpisodeExternalIds = {
	external_ids: {
		imdb_id: string | null;
		freebase_mid: string | null;
		freebase_id: string | null;
		tvdb_id: number | null;
		tvrage_id: number | null;
		id: number;
	};
};

export type TvSeasonEpisodeImages = {
	images: {
		id: number;
		stills: {
			aspect_ratio: number;
			file_path: string;
			height: number;
			iso_639_1: null | string;
			vote_average: number | number;
			vote_count: number;
			width: number;
		}[];
	};
};

export type TvSeasonEpisodeTranslations = {
	translations: {
		id: number;
		translations: {
			iso_3166_1: string;
			iso_639_1: string;
			name: string;
			english_name: string;
			data: {
				name: string;
				overview: string;
			};
		}[];
	};
};

export type TvSeasonEpisodeVideos = {
	videos: {
		id: number;
		results: {
			iso_639_1: string;
			iso_3166_1: string;
			name: string;
			key: string;
			published_at: string;
			site: string;
			size: number;
			type: string;
			official: boolean;
			id: string;
		}[];
	};
};
