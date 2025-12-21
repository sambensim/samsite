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

function applyItalics(s) {
  // match single *...* (but not **...**) and single _..._ (but not __...__)
  s = s.replace(/\*(?!\*)([^*\n]+?)\*/g, '<em>$1</em>');
  s = s.replace(/_(?!_)([^_\n]+?)_/g, '<em>$1</em>');
  return s;
}

function renderImage(name, max) {
    const src = `/images/${name}`;
    const alt = name.replace(/"/g, '');
    const style = max ? ` style="max-width:${max}px;height:auto;"` : ` style="height:auto;"`;
    return `<img src="${src}" alt="${alt}"${style}>`;
}

function formatText(text) {

    return text
        .split('\n')
        .map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            // If the entire line is an image syntax, render it as an image element
            const imageOnly = trimmed.match(/^!\[\[([^\]\|\]]+)(?:\|(\d+))?\]\]$/);
            if (imageOnly) {
                const [, name, max] = imageOnly;
                return renderImage(name, max);
            }
            if (trimmed.match(/^#{1,6}\s/)) {
                const level = trimmed.match(/^#+/)[0].length;
                const content = trimmed.replace(/^#+\s/, '');
                return `<h${level}>${applyItalics(content)}</h${level}>`;
            }
            return `<p>${applyItalics(trimmed)}</p>`;
        })
        .join('');
}
