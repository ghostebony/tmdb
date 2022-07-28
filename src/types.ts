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
