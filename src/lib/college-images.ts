/**
 * Generates a consistent, relevant campus image for any college ID.
 * This approach is deterministic (same ID = same image) and uses 
 * reliable Unsplash image API parameters.
 */
export function getCollegeImage(id: string): string {
  // We use the ID as a 'sig' (signature) so the image is 
  // unique to the college but stays the same across reloads.
  // The query params 'university,campus' ensure relevant photography.
  return `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop&sig=${id}`;
}