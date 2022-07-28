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
