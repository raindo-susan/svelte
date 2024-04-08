//ADDED ACCORDING TO CHATGPT FROM HERE
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import * as path from 'path';
// ... (rest of your existing GET code if any)

export const POST: RequestHandler = async ({ request }) => {
  try {
    // Parse the request body
    const { title, content, metadata } = await request.json();

    // Validate the incoming data (you should implement actual validation)
    if (!title || !content || !metadata) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate a slug for the new post
    const slug = generateSlug(title);

    // Create the markdown content with frontmatter
    const frontmatter = Object.entries(metadata)
      .map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)
      .join('\n');
    const markdownContent = `---
${frontmatter}
---
${content}`;

    // Define the path for the new file
    const filePath = path.join('src', 'posts', `${slug}.md`);

    // Write the file to the file system
    await fs.writeFile(filePath, markdownContent, 'utf8');

    // Return a success response with the slug of the new post
    return json({ success: true, slug: slug });
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    return json({ error: 'Could not create the post' }, { status: 500 });
  }
};

// Helper function to generate a slug from the post title
function generateSlug(title: string) {
  // Convert the title to a URL-friendly slug
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
