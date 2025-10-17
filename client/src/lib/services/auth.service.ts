import { supabase } from '$lib/supabase/client';

export const authService = {
	async register(email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});
		return { data, error };
	},

	async login(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		return { data, error };
	},

	async resetPassword(email: string) {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email);
		return { data, error };
	},

	async logout() {
		const { error } = await supabase.auth.signOut();
		return { error };
	}
};
