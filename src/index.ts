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
