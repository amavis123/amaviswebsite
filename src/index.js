export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// Intercept alex.html to inject Vapi configuration
		if (url.pathname === '/alex.html' || url.pathname === '/alex.html/') {
			try {
				// Fetch the original HTML from assets
				const response = await env.ASSETS.fetch(request);

				// If the file doesn't exist, return 404
				if (!response || response.status === 404) {
					return response || new Response('Not Found', { status: 404 });
				}

				const html = await response.text();

				// Inject Vapi configuration from environment variables
				if (env.VAPI_ASSISTANT_ID && env.VAPI_PUBLIC_KEY) {
					const configScript = `
      <script>
        window.VAPI_CONFIG = {
          assistantId: '${env.VAPI_ASSISTANT_ID}',
          publicKey: '${env.VAPI_PUBLIC_KEY}'
        };
      </script>`;

					// Inject the config script in the <head> section (before any scripts)
					// This ensures it's available before the widget initialization script runs
					const headEndMarker = '</head>';
					const modifiedHtml = html.replace(
						headEndMarker,
						'  <!-- Vapi configuration injected by Cloudflare Worker (keys are NOT in source code) -->' + configScript + '\n' + headEndMarker
					);

					return new Response(modifiedHtml, {
						headers: {
							'Content-Type': 'text/html;charset=UTF-8',
							...Object.fromEntries(response.headers)
						}
					});
				} else {
					// Variables not available, serve original file
					return response;
				}
			} catch (error) {
				// If there's an error, try to serve the file normally
				return env.ASSETS.fetch(request);
			}
		}

		// Serve all other static assets normally
		return env.ASSETS.fetch(request);
	},
};