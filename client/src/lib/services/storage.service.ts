import { supabase } from '$lib/supabase/client';

export class StorageService {
	static getPublicUrl(bucketName: string, filePath: string): string {
		const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

		return data.publicUrl;
	}
}
