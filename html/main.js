function highlightSelectionAndShowModal() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;  // No selection, so exit

    const selectedRange = selection.getRangeAt(0);  // Get the selected range

    // Get all spans with class "permalinky"
    const spans = document.querySelectorAll('span.permalinky');

    let startId = null;
    let endId = null;

    const selectedSpanIds = [];

    spans.forEach(span => {
        // Check if the current span is part of the selected range
        if (selectedRange.intersectsNode(span)) {
            selectedSpanIds.push(span.id);
        }
    });
    startId = selectedSpanIds[0];
    endId =selectedSpanIds[selectedSpanIds.length - 1]

    // If startId and endId are set, construct the URL and open the modal
    if (startId && endId) {
        const currentUrl = window.location.href.split('?')[0]; // Get current URL without query params
        const selectionUrl = `${currentUrl}?start-id=${startId}&end-id=${endId}`;
        console.log(`Start ID: ${startId}, End ID: ${endId}`);
        console.log(selectionUrl);

        // Insert the URL into the modal's content
        document.getElementById('modalText').textContent = selectionUrl;

        // Show the modal using Bootstrap's JavaScript API
        const modal = new bootstrap.Modal(document.getElementById('selectionModal'));
        modal.show();
    } else {
        console.log("No spans selected.");
    }
}

// Example: bind this function to mouseup event to trigger on text selection
document.addEventListener('mouseup', highlightSelectionAndShowModal);

function highlightBetweenIdsFromUrl() {
    // Parse the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const startId = urlParams.get('start-id');
    const endId = urlParams.get('end-id');

    // If startId or endId is missing, stop
    if (!startId || !endId) {
        console.info("start-id or end-id parameter missing in the URL.");
        return;
    }

    // Get the elements with startId and endId
    const startElement = document.getElementById(startId);
    const endElement = document.getElementById(endId);

    // If the start or end element is not found, stop
    if (!startElement || !endElement) {
        console.error("Start or End element not found in the DOM.");
        return;
    }

    // Function to highlight a node (either text or element)
    function highlightNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            // Wrap text node in a span and apply background color
            const span = document.createElement('span');
            span.style.backgroundColor = 'yellow';
            node.parentNode.insertBefore(span, node);
            span.appendChild(node);
            return span
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.style.backgroundColor = 'yellow';
            return node
        }

    }

    // Traverse from startElement to endElement and highlight everything in between
    let currentElement = startElement;

    while (currentElement) {
        // Highlight the current node
        newEl = highlightNode(currentElement);

        // Stop once we reach the end element
        if (currentElement === endElement) break;

        // Move to the next node (including text nodes, elements, etc.)
        currentElement = newEl.nextSibling;
        
        
    }
}

// Call the function to highlight elements and text on page load
window.addEventListener('DOMContentLoaded', highlightBetweenIdsFromUrl);

