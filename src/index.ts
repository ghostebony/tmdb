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

	public account = (params: { session_id: string }) =>
		this.get<Types.Account>(`/account`, params);

	public authenticationGuestSessionNew = () =>
		this.get<Types.AuthenticationGuestSessionNew>(`/authentication/guest_session/new`);

	public authenticationTokenNew = () =>
		this.get<Types.AuthenticationTokenNew>(`/authentication/token/new`);

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
	) => this.get<Types.Find>(`/find/${external_id}`, params);

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
		this.get<Types.Movie & UnionToIntersection<ATR[Key]>>(
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
		this.get<Types.MovieAccountStates["account_states"]>(
			`/movie/${movie_id}/account_states`,
			params
		);

	public movieAlternativeTitles = (
		movie_id: number,
		params?: {
			country?: string;
		}
	) =>
		this.get<Types.MovieAlternativeTitles["alternative_titles"]>(
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
	) => this.get<Types.MovieChanges["changes"]>(`/movie/${movie_id}/changes`, params);

	public movieCredits = (
		movie_id: number,
		params?: {
			language?: Types.Language;
		}
	) => this.get<Types.MovieCredits["credits"]>(`/movie/${movie_id}/credits`, params);

	public movieExternalIds = (movie_id: number) =>
		this.get<Types.MovieExternalIds["external_ids"]>(`/movie/${movie_id}/external_ids`);

	public movieImages = (
		movie_id: number,
		params?: {
			language?: Types.Language;
			include_image_language?: Types.Language;
		}
	) => this.get<Types.MovieImages["images"]>(`/movie/${movie_id}/images`, params);

	public movieKeywords = (movie_id: number) =>
		this.get<Types.MovieKeywords["keywords"]>(`/movie/${movie_id}/keywords`);

	public movieLists = (
		movie_id: number,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) => this.get<Types.MovieLists["lists"]>(`/movie/${movie_id}/lists`, params);

	public movieRecommendations = (
		movie_id: number,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) =>
		this.get<Types.MovieRecommendations["recommendations"]>(
			`/movie/${movie_id}/recommendations`,
			params
		);

	public movieReleaseDates = (movie_id: number) =>
		this.get<Types.MovieReleaseDates["release_dates"]>(`/movie/${movie_id}/release_dates`);

	public movieReviews = (
		movie_id: number,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) => this.get<Types.MovieReviews["reviews"]>(`/movie/${movie_id}/reviews`, params);

	public movieSimilar = (
		movie_id: number,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) => this.get<Types.MovieSimilar["similar"]>(`/movie/${movie_id}/similar`, params);

	public movieTranslations = (movie_id: number) =>
		this.get<Types.MovieTranslations["translations"]>(`/movie/${movie_id}/translations`);

	public movieVideos = (
		movie_id: number,
		params?: {
			language?: Types.Language;
		}
	) => this.get<Types.MovieVideos["videos"]>(`/movie/${movie_id}/videos`, params);

	public movieWatchProviders = (movie_id: number) =>
		this.get<Types.MovieWatchProviders["watch_providers"]>(
			`/movie/${movie_id}/watch/providers`
		);

	public movieLatest = (params?: { language?: string }) =>
		this.get<Types.MovieLatest>("/movie/latest", params);

	public movieNowPlaying = (params?: {
		language?: Types.Language;
		page?: number;
		region?: Types.Region;
	}) => this.get<Types.MovieNowPlaying>("/movie/now_playing", params);

	public moviePopular = (params?: {
		language?: Types.Language;
		page?: number;
		region?: Types.Region;
	}) => this.get<Types.MoviePopular>("/movie/popular", params);

	public movieTopRated = (params?: {
		language?: Types.Language;
		page?: number;
		region?: Types.Region;
	}) => this.get<Types.MovieTopRated>("/movie/top_rated", params);

	public movieUpcoming = (params?: {
		language?: Types.Language;
		page?: number;
		region?: Types.Region;
	}) => this.get<Types.MovieUpcoming>("/movie/upcoming", params);

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
		this.get<Types.Person & UnionToIntersection<ATR[Key]>>(
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
	) => this.get<Types.PersonChanges["changes"]>(`/person/${person_id}/changes`, params);

	public personMovieCredits = (
		person_id: number,
		params?: {
			language?: Types.Language;
		}
	) =>
		this.get<Types.PersonMovieCredits["movie_credits"]>(
			`/person/${person_id}/movie_credits`,
			params
		);

	public personTvCredits = (
		person_id: number,
		params?: {
			language?: Types.Language;
		}
	) => this.get<Types.PersonTvCredits["tv_credits"]>(`/person/${person_id}/tv_credits`, params);

	public personCombinedCredits = (
		person_id: number,
		params?: {
			language?: Types.Language;
		}
	) =>
		this.get<Types.PersonCombinedCredits["combined_credits"]>(
			`/person/${person_id}/combined_credits`,
			params
		);

	public personExternalIds = (person_id: number) =>
		this.get<Types.PersonExternalIds["external_ids"]>(`/person/${person_id}/external_ids`);

	public personImages = (person_id: number) =>
		this.get<Types.PersonImages["images"]>(`/person/${person_id}/images`);

	public personTaggedImages = (
		person_id: number,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) =>
		this.get<Types.PersonTaggedImages["tagged_images"]>(
			`/person/${person_id}/tagged_images`,
			params
		);

	public personTranslations = (
		person_id: number,
		params?: {
			language?: Types.Language;
		}
	) =>
		this.get<Types.PersonTranslations["translations"]>(
			`/person/${person_id}/translations`,
			params
		);

	public personLatest = (params?: { language?: Types.Language }) =>
		this.get<Types.PersonLatest>(`/person/latest`, params);

	public personPopular = (params?: { language?: Types.Language; page?: number }) =>
		this.get<Types.PersonPopular>(`/person/popular`, params);

	public searchCompany = (
		query: string,
		params?: {
			page?: number;
		}
	) => this.get<Types.SearchCompany>("/search/company", { query, ...params });

	public searchCollection = (
		query: string,
		params?: {
			language?: Types.Language;
			page?: number;
		}
	) => this.get<Types.SearchCollection>("/search/collection", { query, ...params });

	public searchKeyword = (
		query: string,
		params?: {
			page?: number;
		}
	) => this.get<Types.SearchKeyword>("/search/keyword", { query, ...params });

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
	) => this.get<Types.SearchMovie>("/search/movie", { query, ...params });

	public searchMulti = (
		query: string,
		params?: {
			language?: Types.Language;
			page?: number;
			include_adult?: boolean;
			region?: Types.Region;
		}
	) => this.get<Types.SearchMulti>("/search/multi", { query, ...params });

	public searchPerson = (
		query: string,
		params?: {
			language?: Types.Language;
			page?: number;
			include_adult?: boolean;
			region?: Types.Region;
		}
	) => this.get<Types.SearchPerson>("/search/person", { query, ...params });

	public searchTv = (
		query: string,
		params?: {
			language?: Types.Language;
			page?: number;
			include_adult?: boolean;
			first_air_date_year?: number;
		}
	) => this.get<Types.SearchTv>("/search/tv", { query, ...params });

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
		this.get<Types.Tv & UnionToIntersection<ATR[Key]>>(
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
	) => this.get<Types.TvAccountStates["account_states"]>(`/tv/${tv_id}/account_states`, params);

	public tvAggregateCredits = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.get<Types.TvAggregateCredits["agregate_credits"]>(
			`/tv/${tv_id}/aggregate_credits`,
			params
		);

	public tvAlternativeTitles = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.get<Types.TvAlternativeTitles["alternative_titles"]>(
			`/tv/${tv_id}/alternative_titles`,
			params
		);

	public tvChanges = (
		tv_id: number,
		params?: { page?: number; start_date?: string; end_date?: string }
	) => this.get<Types.TvChanges["changes"]>(`/tv/${tv_id}/changes`, params);

	public tvContentRatings = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.get<Types.TvContentRatings["content_ratings"]>(`/tv/${tv_id}/content_ratings`, params);

	public tvCredits = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) => this.get<Types.TvCredits["credits"]>(`/tv/${tv_id}/credits`, params);

	public tvEpisodeGroups = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) => this.get<Types.TvEpisodeGroups["episode_groups"]>(`/tv/${tv_id}/episode_groups`, params);

	public tvExternalIds = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) => this.get<Types.TvExternalIds["external_ids"]>(`/tv/${tv_id}/external_ids`, params);

	public tvImages = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) => this.get<Types.TvImages["images"]>(`/tv/${tv_id}/images`, params);

	public tvKeywords = (tv_id: number) =>
		this.get<Types.TvKeywords["keywords"]>(`/tv/${tv_id}/keywords`);

	public tvRecommendations = (
		tv_id: number,
		params: {
			language?: Types.Language;
			page?: number;
		}
	) =>
		this.get<Types.TvRecommendations["recommendations"]>(
			`/tv/${tv_id}/recommendations`,
			params
		);

	public tvReviews = (
		tv_id: number,
		params: {
			language?: Types.Language;
			page?: number;
		}
	) => this.get<Types.TvReviews["reviews"]>(`/tv/${tv_id}/reviews`, params);

	public tvScreenedTheatrically = (tv_id: number) =>
		this.get<Types.TvScreenedTheatrically["screened_theatrically"]>(
			`/tv/${tv_id}/screened_theatrically`
		);

	public tvSimilar = (
		tv_id: number,
		params: {
			language?: Types.Language;
			page?: number;
		}
	) => this.get<Types.TvSimilar["similar"]>(`/tv/${tv_id}/similar`, params);

	public tvTranslations = (tv_id: number) =>
		this.get<Types.TvTranslations["translations"]>(`/tv/${tv_id}/translations`);

	public tvVideos = (
		tv_id: number,
		params: {
			language?: Types.Language;
		}
	) => this.get<Types.TvVideos["videos"]>(`/tv/${tv_id}/videos`, params);

	public tvWatchProviders = (tv_id: number) =>
		this.get<Types.TvWatchProviders["watch_providers"]>(`/tv/${tv_id}/watch/providers`);

	public tvLatest = (params: { language?: Types.Language }) =>
		this.get<Types.TvLatest>(`/tv/latest`, params);

	public tvAiringToday = (params: { language?: Types.Language; page?: number }) =>
		this.get<Types.TvAiringToday>(`/tv/airing_today`, params);

	public tvOnTheAir = (params: { language?: Types.Language; page?: number }) =>
		this.get<Types.TvOnTheAir>(`/tv/on_the_air`, params);

	public tvPopular = (params: { language?: Types.Language; page?: number }) =>
		this.get<Types.TvPopular>(`/tv/popular`, params);

	public tvTopRated = (params: { language?: Types.Language; page?: number }) =>
		this.get<Types.TvTopRated>(`/tv/top_rated`, params);

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
		this.get<Types.TvSeason & UnionToIntersection<ATR[Key]>>(
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
		this.get<Types.TvSeasonAccountStates["account_states"]>(
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
		this.get<Types.TvSeasonAggregateCredits["aggregate_credits"]>(
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
	) => this.get<Types.TvSeasonChanges["changes"]>(`/tv/season/${season_id}/changes`, params);

	public tvSeasonCredits = (
		tv_id: number,
		season_number: number,
		params: {
			language?: Types.Language;
		}
	) =>
		this.get<Types.TvSeasonCredits["credits"]>(
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
		this.get<Types.TvSeasonExternalIds["external_ids"]>(
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
		this.get<Types.TvSeasonImages["images"]>(
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
		this.get<Types.TvSeasonTranslations["translations"]>(
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
		this.get<Types.TvSeasonVideos["videos"]>(
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
		this.get<Types.TvSeasonEpisode & UnionToIntersection<ATR[Key]>>(
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
		this.get<Types.TvSeasonEpisodeAccountStates["account_states"]>(
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
		this.get<Types.TvSeasonEpisodeChanges["changes"]>(
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
		this.get<Types.TvSeasonEpisodeCredits["credits"]>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}/credits`,
			params
		);

	public tvSeasonEpisodeExternalIds = (
		tv_id: number,
		season_number: number,
		episode_number: number
	) =>
		this.get<Types.TvSeasonEpisodeExternalIds["external_ids"]>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}/external_ids`
		);

	public tvSeasonEpisodeImages = (tv_id: number, season_number: number, episode_number: number) =>
		this.get<Types.TvSeasonEpisodeImages["images"]>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}/images`
		);

	public tvSeasonEpisodeTranslations = (
		tv_id: number,
		season_number: number,
		episode_number: number
	) =>
		this.get<Types.TvSeasonEpisodeTranslations["translations"]>(
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
		this.get<Types.TvSeasonEpisodeVideos["videos"]>(
			`/tv/${tv_id}/season/${season_number}/episode/${episode_number}/videos`,
			params
		);

	private get = <Data>(endpoint: string, params?: Types.RequestParams) =>
		this.request<Data>("GET", endpoint, { params });

	private post = <Data>(endpoint: string, body: Record<string, any>) =>
		this.request<Data>("POST", endpoint, { body });

	private request<Data>(
		method: Exclude<keyof typeof http, "statusCode" | "custom" | "CUSTOM">,
		endpoint: string,
		data?: { params?: Types.RequestParams; body?: Record<string, any> }
	) {
		const params = data?.params ?? {};
		const headers: { accept: string; authorization?: string } = { accept: "application/json" };

		let append_to_response: string | undefined;

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

		return http[method]<Data, Types.Error>(this.baseUrl + endpoint, {
			headers,
			params: { ...params, append_to_response },
			body: data?.body,
		});
	}
}
