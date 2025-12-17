//This file was written by genAI with minor edits by me
let originalContent = null;

function loadWritingFromURL() {
    const filename = window.location.hash.slice(1);
    
    // Save original content on first load
    if (!originalContent) {
        originalContent = document.getElementById('writing-content').innerHTML;
    }
    
    if (filename) {
        loadAndFormatText(filename);
    } else {
        // No hash, restore original content
        document.getElementById('writing-content').innerHTML = originalContent;
    }
}

async function loadAndFormatText(filename) {
    try {
        const response = await fetch(`/writing/${filename}.txt`);
        if (!response.ok) {
            throw new Error(`File not found: ${filename}.txt`);
        }
        const text = await response.text();
        const htmlContent = formatText(text);
        document.getElementById('writing-content').innerHTML = htmlContent;
    } catch (error) {
        console.error('Error loading file:', error);
        document.getElementById('writing-content').innerHTML = 
            `<p>Error: Could not load ${filename}</p>`;
    }
}

function formatText(text) {
    return text
        .split('\n')
        .map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            if (trimmed.match(/^#{1,6}\s/)) {
                console.log(trimmed);
                const level = trimmed.match(/^#+/)[0].length;
                const content = trimmed.replace(/^#+\s/, '');
                return `<h${level}>${content}</h${level}>`;
            }
            return `<p>${trimmed}</p>`;
        })
        .join('');
}
