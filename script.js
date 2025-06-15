document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('testForm');
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const responseContent = document.getElementById('responseContent');
    const testButton = document.getElementById('testButton');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const apiUrl = document.getElementById('apiUrl').value;
        
        // Show loading, hide results
        loadingDiv.classList.remove('hidden');
        resultsDiv.classList.add('hidden');
        testButton.disabled = true;
        testButton.textContent = 'Testing...';
        
        try {
            // Build the test URL
            const testUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/junior-dev?url=${encodeURIComponent(apiUrl)}&email=${encodeURIComponent(email)}`;
            
            // Make the request
            const response = await fetch(testUrl);
            const data = await response.text();
            
            // Hide loading
            loadingDiv.classList.add('hidden');
            
            // Show results
            resultsDiv.classList.remove('hidden');
            resultsDiv.classList.remove('error');
            
            try {
                // Try to parse as JSON for pretty display
                const jsonData = JSON.parse(data);
                responseContent.textContent = JSON.stringify(jsonData, null, 2);
            } catch {
                // If not JSON, show as plain text
                responseContent.textContent = data;
            }
            
        } catch (error) {
            // Hide loading
            loadingDiv.classList.add('hidden');
            
            // Show error
            resultsDiv.classList.remove('hidden');
            resultsDiv.classList.add('error');
            responseContent.textContent = `Error: ${error.message}`;
        }
        
        // Reset button
        testButton.disabled = false;
        testButton.textContent = 'Test API Endpoint';
    });
});
