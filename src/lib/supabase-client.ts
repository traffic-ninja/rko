import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const getSupabaseUrl = () => {
	const url = process.env.SUPABASE_URL;

	if (!url) {
		throw new Error("SUPABASE_URL env variable is not set");
	}

	return url;
};

const getSupabaseAnonKey = () => {
	const anonKey = process.env.SUPABASE_ANON_KEY;

	if (!anonKey) {
		throw new Error("SUPABASE_ANON_KEY env variable is not set");
	}

	return anonKey;
};

export const createSupabaseServerClient = () => {
	const url = getSupabaseUrl();
	const anonKey = getSupabaseAnonKey();
	const cookieStore = cookies();

	return createServerClient(url, anonKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) => {
					try {
						cookieStore.set(name, value, options);
					} catch {
						// Ignore errors for cookies that can't be set in middleware
					}
				});
			},
		},
	});
};
