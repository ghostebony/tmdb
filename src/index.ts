import type * as Types from "./types";

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
		this.request<Types.Movie & Types.UnionToIntersection<ATR[Key]>>(
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

	private async request<responseType>(endpoint: string, params?: Types.RequestParams) {
		let headers: { Accept: string; Authorization?: string } = { Accept: "application/json" };
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
			headers["Authorization"] = `Bearer ${this.bearerToken}`;
		}

		const response = await fetch(
			this.buildEndpoint(endpoint, { ...params, append_to_response }),
			{
				method: "GET",
				headers,
			}
		);

		const responseBody = await response.json();

		let data: responseType | undefined;
		let error: Types.Error | undefined;

		if (response.ok) {
			data = responseBody as responseType;
		} else {
			error = responseBody as Types.Error;
		}

		return {
			data,
			error,
			ok: response.ok,
		};
	}

	private buildEndpoint = (endpoint: string, params: { [key: string]: any }) =>
		`${this.baseUrl}${endpoint}?${new URLSearchParams(params).toString()}`;
}
