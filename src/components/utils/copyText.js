const copyText = (textToCopy) => {
    // Create textarea element
    const textarea = document.createElement('textarea')
    // Set the value of the text
    textarea.value = textToCopy
    // Make sure we cant change the text of the textarea
    textarea.setAttribute('readonly', '');
    // Hide the textarea off the screnn
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    // Add the textarea to the page
    document.body.appendChild(textarea);
    // Copy the textarea
    textarea.select()
    try {
        document.execCommand('copy');
    } catch (err) {
    }

    textarea.remove()
} 

export default copyText;