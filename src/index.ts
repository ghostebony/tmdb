import { http } from "@ghostebony/utils";
import type * as Types from "./types";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
	? I
	: never;

export default class TMDb {
	private apiKey?: string;
	private bearerToken?: string;

	private baseUrl: string = "https://api.themoviedb.org/3";
	private language: Types.Language = "en-US";
	private region: Types.Region = "US";
	private includeAdult: boolean = false;

	public constructor(
		auth: { apiKey: string } | { bearerToken: string },
		options?: {
			baseUrl?: string;
			language?: Types.Language;
			region?: Types.Region;
			includeAdult?: boolean;
		}
	) {
		if ("apiKey" in auth) {
			this.apiKey = auth.apiKey;
		} else {
			this.bearerToken = auth.bearerToken;
		}

		if (options === undefined) return;

		if (options.baseUrl !== undefined) {
			this.baseUrl = options.baseUrl;
		}

		if (options.language !== undefined) {
			this.language = options.language;
		}

		if (options.region !== undefined) {
			this.region = options.region;
		}

		if (options.includeAdult !== undefined) {
			this.includeAdult = options.includeAdult;
		}
	}

	public find = (
		external_id: string,
		params: {
			language?: Types.Language;
			external_source:
				| "imdb_id"
				| "freebase_mid"
				| "freebase_id"
				| "tvdb_id"
				| "tvrage_id"
				| "facebook_id"
				| "twitter_id"
				| "instagram_id";
		}
	) => this.request<Types.Find>(`/find/${external_id}`, params);

	public movie = <
		ATR extends {
			account_states: Types.MovieAccountStates;
			alternative_titles: Types.MovieAlternativeTitles;
			changes: Types.MovieChanges;
			credits: Types.MovieCredits;
			external_ids: Types.MovieExternalIds;
			images: Types.MovieImages;
			keywords: Types.MovieKeywords;
			lists: Types.MovieLists;
			recommendations: Types.MovieRecommendations;
			release_dates: Types.MovieReleaseDates;
			reviews: Types.MovieReviews;
			similar: Types.MovieSimilar;
			translations: Types.MovieTranslations;
			videos: Types.MovieVideos;
			"watch/providers": Types.MovieWatchProviders;
		},
		Key extends keyof ATR
	>(
		movie_id: number,
		params?: {
			language?: Types.Language;
			append_to_response?: Key[];
		}
	) =>
		this.request<Types.Movie & UnionToIntersection<ATR[Key]>>(
			`/movie/${movie_id}`,
			params as Types.RequestParams
		);

	public movieAccountStates = (
		movie_id: number,
		params: {
			session_id: string;
			guest_session_id?: string;
		}
	) =>
		this.request<Types.MovieAccountStates["account_states"]>(
			`/movie/${movie_id}/account_states`,
			params
		);

	public movieAlternativeTitles = (
		movie_id: number,
		params?: {
			country?: string;
		}
	) =>
		this.request<Types.MovieAlternativeTitles["alternative_titles"]>(
			`/movie/${movie_id}/alternative_titles`,
			params
		);

	public movieChanges = (
		movie_id: number,
		params?: {
			start_date?: string;
			end_date?: string;
			page?: number;
		}
	) => this.request<Types.MovieChanges["changes"]>(`/movie/${movie_id}/changes`, params);

	public movieCredits = (
		movie_id: number,
		params?: {
			language?: Types.Language;
		}
	) => this.request<Types.MovieCredits["credits"]>(`/movie/${movie_id}/credits`, params);

	public movieExternalIds = (movie_id: number) =>
		this.request<Types.MovieExternalIds["external_ids"]>(`/movie/${movie_id}/external_ids`);

	public movieImages = (
		movie_id: number,
		params?: {
			language?: Types.Language;
			include_image_language?: Types.Language;
		}
	) => this.request<Types.MovieImages["images"]>(`/movie/${movie_id}/images`, params);

	public movieKeywords = (movie_id: number) =>
		this.request<Types.MovieKeywords["keywords"]>(`/movie/${movie_id}/keywords`);

	public movieLists = (
		movie_id: number,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) => this.request<Types.MovieLists["lists"]>(`/movie/${movie_id}/lists`, params);

	public movieRecommendations = (
		movie_id: number,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) =>
		this.request<Types.MovieRecommendations["recommendations"]>(
			`/movie/${movie_id}/recommendations`,
			params
		);

	public movieReleaseDates = (movie_id: number) =>
		this.request<Types.MovieReleaseDates["release_dates"]>(`/movie/${movie_id}/release_dates`);

	public movieReviews = (
		movie_id: number,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) => this.request<Types.MovieReviews["reviews"]>(`/movie/${movie_id}/reviews`, params);

	public movieSimilar = (
		movie_id: number,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) => this.request<Types.MovieSimilar["similar"]>(`/movie/${movie_id}/similar`, params);

	public movieTranslations = (movie_id: number) =>
		this.request<Types.MovieTranslations["translations"]>(`/movie/${movie_id}/translations`);

	public movieVideos = (
		movie_id: number,
		params?: {
			language?: Types.Language;
		}
	) => this.request<Types.MovieVideos["videos"]>(`/movie/${movie_id}/videos`, params);

	public movieWatchProviders = (movie_id: number) =>
		this.request<Types.MovieWatchProviders["watch_providers"]>(
			`/movie/${movie_id}/watch/providers`
		);

	public movieLatest = (params?: { language?: string }) =>
		this.request<Types.MovieLatest>("/movie/latest", params);

	public movieNowPlaying = (params?: {
		language?: Types.Language;
		page?: number;
		region?: Types.Region;
	}) => this.request<Types.MovieNowPlaying>("/movie/now_playing", params);

	public moviePopular = (params?: {
		language?: Types.Language;
		page?: number;
		region?: Types.Region;
	}) => this.request<Types.MoviePopular>("/movie/popular", params);

	public movieTopRated = (params?: {
		language?: Types.Language;
		page?: number;
		region?: Types.Region;
	}) => this.request<Types.MovieTopRated>("/movie/top_rated", params);

	public movieUpcoming = (params?: {
		language?: Types.Language;
		page?: number;
		region?: Types.Region;
	}) => this.request<Types.MovieUpcoming>("/movie/upcoming", params);

	public person = <
		ATR extends {
			changes: Types.PersonChanges;
			movie_credits: Types.PersonMovieCredits;
			tv_credits: Types.PersonTvCredits;
			combined_credits: Types.PersonCombinedCredits;
			external_ids: Types.PersonExternalIds;
			images: Types.PersonImages;
			tagged_images: Types.PersonTaggedImages;
			translations: Types.PersonTranslations;
		},
		Key extends keyof ATR
	>(
		person_id: number,
		params?: {
			language?: Types.Language;
			append_to_response?: Key[];
		}
	) =>
		this.request<Types.Person & UnionToIntersection<ATR[Key]>>(
			`/person/${person_id}`,
			params as Types.RequestParams
		);

	public personChanges = (
		person_id: number,
		params?: {
			page?: number;
			start_date?: string;
			end_date?: string;
		}
	) => this.request<Types.PersonChanges["changes"]>(`/person/${person_id}/changes`, params);

	public personMovieCredits = (
		person_id: number,
		params?: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.PersonMovieCredits["movie_credits"]>(
			`/person/${person_id}/movie_credits`,
			params
		);

	public personTvCredits = (
		person_id: number,
		params?: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.PersonTvCredits["tv_credits"]>(
			`/person/${person_id}/tv_credits`,
			params
		);

	public personCombinedCredits = (
		person_id: number,
		params?: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.PersonCombinedCredits["combined_credits"]>(
			`/person/${person_id}/combined_credits`,
			params
		);

	public personExternalIds = (person_id: number) =>
		this.request<Types.PersonExternalIds["external_ids"]>(`/person/${person_id}/external_ids`);

	public personImages = (person_id: number) =>
		this.request<Types.PersonImages["images"]>(`/person/${person_id}/images`);

	public personTaggedImages = (
		person_id: number,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) =>
		this.request<Types.PersonTaggedImages["tagged_images"]>(
			`/person/${person_id}/tagged_images`,
			params
		);

	public personTranslations = (
		person_id: number,
		params?: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.PersonTranslations["translations"]>(
			`/person/${person_id}/translations`,
			params
		);

	public personLatest = (params?: { language?: Types.Language }) =>
		this.request<Types.PersonLatest>(`/person/latest`, params);

	public personPopular = (params?: { language?: Types.Language; page?: number }) =>
		this.request<Types.PersonPopular>(`/person/popular`, params);

	public searchCompany = (
		query: string,
		params?: {
			page?: number;
		}
	) => this.request<Types.SearchCompany>("/search/company", { query, ...params });

	public searchCollection = (
		query: string,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) => this.request<Types.SearchCollection>("/search/collection", { query, ...params });

	public searchKeyword = (
		query: string,
		params?: {
			page?: number;
		}
	) => this.request<Types.SearchKeyword>("/search/keyword", { query, ...params });

	public searchMovie = (
		query: string,
		params?: {
			language?: Types.Language;
			page?: number;
			include_adult?: boolean;
			region?: Types.Region;
			year?: number;
			primary_release_year?: number;
		}
	) => this.request<Types.SearchMovie>("/search/movie", { query, ...params });

	public searchMulti = (
		query: string,
		params?: {
			language?: Types.Language;
			page?: number;
			include_adult?: boolean;
			region?: Types.Region;
		}
	) => this.request<Types.SearchMulti>("/search/multi", { query, ...params });

	public searchPerson = (
		query: string,
		params?: {
			language?: Types.Language;
			page?: number;
			include_adult?: boolean;
			region?: Types.Region;
		}
	) => this.request<Types.SearchPerson>("/search/person", { query, ...params });

	public searchTv = (
		query: string,
		params?: {
			language?: Types.Language;
			page?: number;
			include_adult?: boolean;
			first_air_date_year?: number;
		}
	) => this.request<Types.SearchTv>("/search/tv", { query, ...params });

	public tv = <
		ATR extends {
			account_states: Types.TvAccountStates;
			aggregate_credits: Types.TvAggregateCredits;
			alternative_titles: Types.TvAlternativeTitles;
			changes: Types.TvChanges;
			content_ratings: Types.TvContentRatings;
			credits: Types.TvCredits;
			episode_groups: Types.TvEpisodeGroups;
			external_ids: Types.TvExternalIds;
			images: Types.TvImages;
			keywords: Types.TvKeywords;
			recommendations: Types.TvRecommendations;
			reviews: Types.TvReviews;
			screened_theatrically: Types.TvScreenedTheatrically;
			similar: Types.TvSimilar;
			translations: Types.TvTranslations;
			videos: Types.TvVideos;
			"watch/providers": Types.TvWatchProviders;
			[season: `season/${number}`]: Types.TvTvSeason;
		},
		Key extends keyof ATR
	>(
		tv_id: number,
		params?: {
			language?: Types.Language;
			append_to_response?: Key[];
		}
	) =>
		this.request<Types.Tv & UnionToIntersection<ATR[Key]>>(
			`/tv/${tv_id}`,
			params as Types.RequestParams
		);

	public tvAccountStates = (
		tv_id: number,
		params: {
			language?: Types.Language;
			session_id?: string;
			guest_session_id?: string;
		}
	) =>
		this.request<Types.TvAccountStates["account_states"]>(
			`/tv/${tv_id}/account_states`,
			params
		);

	public tvAggregateCredits = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvAggregateCredits["agregate_credits"]>(
			`/tv/${tv_id}/aggregate_credits`,
			params
		);

	public tvAlternativeTitles = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvAlternativeTitles["alternative_titles"]>(
			`/tv/${tv_id}/alternative_titles`,
			params
		);

	public tvChanges = (
		tv_id: number,
		params?: { page?: number; start_date?: string; end_date?: string }
	) => this.request<Types.TvChanges["changes"]>(`/tv/${tv_id}/changes`, params);

	public tvContentRatings = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvContentRatings["content_ratings"]>(
			`/tv/${tv_id}/content_ratings`,
			params
		);

	public tvCredits = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) => this.request<Types.TvCredits["credits"]>(`/tv/${tv_id}/credits`, params);

	public tvEpisodeGroups = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvEpisodeGroups["episode_groups"]>(
			`/tv/${tv_id}/episode_groups`,
			params
		);

	public tvExternalIds = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) => this.request<Types.TvExternalIds["external_ids"]>(`/tv/${tv_id}/external_ids`, params);

	public tvImages = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) => this.request<Types.TvImages["images"]>(`/tv/${tv_id}/images`, params);

	public tvKeywords = (tv_id: number) =>
		this.request<Types.TvKeywords["keywords"]>(`/tv/${tv_id}/keywords`);

	public tvRecommendations = (
		tv_id: number,
		params: {
			language?: Types.Language;
			page?: number;
		}
	) =>
		this.request<Types.TvRecommendations["recommendations"]>(
			`/tv/${tv_id}/recommendations`,
			params
		);

	public tvReviews = (
		tv_id: number,
		params: {
			language?: Types.Language;
			page?: number;
		}
	) => this.request<Types.TvReviews["reviews"]>(`/tv/${tv_id}/reviews`, params);

	public tvScreenedTheatrically = (tv_id: number) =>
		this.request<Types.TvScreenedTheatrically["screened_theatrically"]>(
			`/tv/${tv_id}/screened_theatrically`
		);

	public tvSimilar = (
		tv_id: number,
		params: {
			language?: Types.Language;
			page?: number;
		}
	) => this.request<Types.TvSimilar["similar"]>(`/tv/${tv_id}/similar`, params);

	public tvTranslations = (tv_id: number) =>
		this.request<Types.TvTranslations["translations"]>(`/tv/${tv_id}/translations`);

	public tvVideos = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) => this.request<Types.TvVideos["videos"]>(`/tv/${tv_id}/videos`, params);

	public tvWatchProviders = (tv_id: number) =>
		this.request<Types.TvWatchProviders["watch_providers"]>(`/tv/${tv_id}/watch/providers`);

	public tvLatest = (params: { language?: Types.Language }) =>
		this.request<Types.TvLatest>(`/tv/latest`, params);

	public tvAiringToday = (params: { language?: Types.Language; page?: number }) =>
		this.request<Types.TvAiringToday>(`/tv/airing_today`, params);

	public tvOnTheAir = (params: { language?: Types.Language; page?: number }) =>
		this.request<Types.TvOnTheAir>(`/tv/on_the_air`, params);

	public tvPopular = (params: { language?: Types.Language; page?: number }) =>
		this.request<Types.TvPopular>(`/tv/popular`, params);

	public tvTopRated = (params: { language?: Types.Language; page?: number }) =>
		this.request<Types.TvTopRated>(`/tv/top_rated`, params);

	public tvSeason = <
		ATR extends {
			account_states: Types.TvSeasonAccountStates;
			aggregate_credits: Types.TvSeasonAggregateCredits;
			changes: Types.TvSeasonChanges;
			credits: Types.TvSeasonCredits;
			external_ids: Types.TvSeasonExternalIds;
			images: Types.TvSeasonImages;
			translations: Types.TvSeasonTranslations;
			videos: Types.TvSeasonVideos;
			[episode: `episode/${number}`]: Types.TvSeasonTvSeasonEpisode;
		},
		Key extends keyof ATR
	>(
		tv_id: number,
		season_number: number,
		params?: {
			language?: Types.Language;
			append_to_response?: Key[];
		}
	) =>
		this.request<Types.TvSeason & UnionToIntersection<ATR[Key]>>(
			`/tv/${tv_id}/season/${season_number}`,
			params as Types.RequestParams
		);

	public tvSeasonAccountStates = (
		tv_id: number,
		season_number: number,
		params: {
			language?: Types.Language;
			session_id?: string;
			guest_session_id?: string;
		}
	) =>
		this.request<Types.TvSeasonAccountStates["account_states"]>(
			`/tv/${tv_id}/season/${season_number}/account_states`,
			params
		);

	public tvSeasonAggregateCredits = (
		tv_id: number,
		season_number: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvSeasonAggregateCredits["aggregate_credits"]>(
			`/tv/${tv_id}/season/${season_number}/aggregate_credits`,
			params
		);

	public tvSeasonChanges = (
		season_id: number,
		params?: {
			start_date?: string;
			end_date?: string;
			page?: number;
		}
	) => this.request<Types.TvSeasonChanges["changes"]>(`/tv/season/${season_id}/changes`, params);

	public tvSeasonCredits = (
		tv_id: number,
		season_number: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvSeasonCredits["credits"]>(
			`/tv/${tv_id}/season/${season_number}/credits`,
			params
		);

	public tvSeasonExternalIds = (
		tv_id: number,
		season_number: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvSeasonExternalIds["external_ids"]>(
			`/tv/${tv_id}/season/${season_number}/external_ids`,
			params
		);

	public tvSeasonImages = (
		tv_id: number,
		season_number: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvSeasonImages["images"]>(
			`/tv/${tv_id}/season/${season_number}/images`,
			params
		);

	public tvSeasonTranslations = (
		tv_id: number,
		season_number: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvSeasonTranslations["translations"]>(
			`/tv/${tv_id}/season/${season_number}/translations`,
			params
		);

	public tvSeasonVideos = (
		tv_id: number,
		season_number: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvSeasonVideos["videos"]>(
			`/tv/${tv_id}/season/${season_number}/videos`,
			params
		);

	public tvSeasonEpisode = <
		ATR extends {
			account_states: Types.TvSeasonEpisodeAccountStates;
			changes: Types.TvSeasonEpisodeChanges;
			credits: Types.TvSeasonEpisodeCredits;
			external_ids: Types.TvSeasonEpisodeExternalIds;
			images: Types.TvSeasonEpisodeImages;
			translations: Types.TvSeasonEpisodeTranslations;
			videos: Types.TvSeasonEpisodeVideos;
		},
		Key extends keyof ATR
	>(
		tv_id: number,
		season_number: number,
		episode_number: number,
		params?: {
			language?: Types.Language;
			append_to_response?: Key[];
		}
	) =>
		this.request<Types.TvSeasonEpisode & UnionToIntersection<ATR[Key]>>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}`,
			params as Types.RequestParams
		);

	public tvSeasonEpisodeAccountStates = (
		tv_id: number,
		season_number: number,
		episode_number: number,
		params?: {
			session_id?: string;
			guest_session_id?: string;
		}
	) =>
		this.request<Types.TvSeasonEpisodeAccountStates["account_states"]>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}/account_states`,
			params
		);

	public tvSeasonEpisodeChanges = (
		episode_id: number,
		params?: {
			page?: number;
			start_date?: string;
			end_date?: string;
		}
	) =>
		this.request<Types.TvSeasonEpisodeChanges["changes"]>(
			`/tv/episode/${episode_id}/changes`,
			params
		);

	public tvSeasonEpisodeCredits = (
		tv_id: number,
		season_number: number,
		episode_number: number,
		params?: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvSeasonEpisodeCredits["credits"]>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}/credits`,
			params
		);

	public tvSeasonEpisodeExternalIds = (
		tv_id: number,
		season_number: number,
		episode_number: number
	) =>
		this.request<Types.TvSeasonEpisodeExternalIds["external_ids"]>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}/external_ids`
		);

	public tvSeasonEpisodeImages = (tv_id: number, season_number: number, episode_number: number) =>
		this.request<Types.TvSeasonEpisodeImages["images"]>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}/images`
		);

	public tvSeasonEpisodeTranslations = (
		tv_id: number,
		season_number: number,
		episode_number: number
	) =>
		this.request<Types.TvSeasonEpisodeTranslations["translations"]>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}/translations`
		);

	public tvSeasonEpisodeVideos = (
		tv_id: number,
		season_number: number,
		episode_number: number,
		params?: {
			language?: Types.Language;
		}
	) =>
		this.request<Types.TvSeasonEpisodeVideos["videos"]>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}/videos`,
			params
		);

	private request<Data>(endpoint: string, params?: Types.RequestParams) {
		let headers: { accept: string; authorization?: string } = { accept: "application/json" };
		let append_to_response: string | undefined;

		if (!params) params = {};

		if (!("language" in params)) params.language = this.language;
		if (!("region" in params)) params.region = this.region;
		if (!("include_adult" in params)) params.include_adult = this.includeAdult;
		if ("append_to_response" in params) {
			if (!!params.append_to_response) {
				append_to_response = params.append_to_response.join(",");
			}
			delete params.append_to_response;
		}

		if (this.apiKey) {
			params["api_key"] = this.apiKey;
		} else {
			headers["authorization"] = `Bearer ${this.bearerToken}`;
		}

		return http.get<Data, Types.Error>(this.baseUrl + endpoint, {
			headers,
			params: { ...params, append_to_response },
		});
	}
}
