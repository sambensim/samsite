//written by gpt

async function loadImages() {
    const gridElement = document.querySelector('.grid');
    if (!gridElement) {
        console.error('Grid element not found');
        return;
    }
    
    try {
        const response = await fetch(`/images/Gallery/`);
        if (!response.ok) {
            throw new Error('Could not fetch directory');
        }
        const html = await response.text();
        
        // Parse the directory listing HTML to extract image files
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a');
        
        // Filter for image files
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const imageFiles = Array.from(links)
            .map(link => link.getAttribute('href'))
            .filter(href => href && imageExtensions.some(ext => href.toLowerCase().endsWith(ext)));
        
        // Append each image to the grid
        imageFiles.forEach(filename => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = `${filename}`;
            img.alt = filename;
            div.appendChild(img);
            gridElement.appendChild(div);
        });
        
    } catch (error) {
        console.error('Error loading images:', error);
        gridElement.innerHTML = '<p>Error: Could not load images</p>';
    }
}