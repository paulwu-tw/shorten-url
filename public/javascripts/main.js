// tooltip initialization for copy button
const tooltipElement = document.querySelector('[data-bs-toggle="tooltip"]')
const tooltip = new bootstrap.Tooltip(tooltipElement)

const panel = document.querySelector('#panel');

// add event listener on panel for copy button
panel.addEventListener('click', (event) => {
    const target = event.target;
    if (target.id === 'copy-btn') {
        // get shorten url
        const shortenUrl = document.querySelector('#shorten-link').textContent
        // copy to clipboard
        navigator.clipboard.writeText(shortenUrl)
        // change tooltip title
        tooltip.setContent({ '.tooltip-inner': 'Copied' })
        // after 1 sec hide tootip
        setTimeout(() => {
            tooltip.hide()
        }, 1000)
    }
})
