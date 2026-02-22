$(document).ready(function() {

    // --- CONFIGURATION ---
    const PAGE_WIDTH = 500;
    const PAGE_HEIGHT = 700;
    const FLIPBOOK = $('#flipbook');
    const VIEWPORT = $('#flipbook-viewport');

    // --- INITIALIZATION ---
    function initFlipbook() {
        // Initial setup for Turn.js
        FLIPBOOK.turn({
            width: PAGE_WIDTH * 2, // Default to double spread width
            height: PAGE_HEIGHT,
            autoCenter: true,
            display: 'double', // Will be adjusted by resize
            acceleration: true,
            gradients: true,
            elevation: 50,
            duration: 1000,
            when: {
                turned: function(e, page) {
                    console.log('Current view: ', $(this).turn('view'));
                }
            }
        });

        // Trigger resize to set initial scale and display mode
        resize();

        // Add keyboard navigation
        $(document).keydown(function(e){
            switch (e.keyCode) {
                case 37: // Left arrow
                    FLIPBOOK.turn('previous');
                    e.preventDefault();
                    break;
                case 39: // Right arrow
                    FLIPBOOK.turn('next');
                    e.preventDefault();
                    break;
            }
        });
    }

    // --- RESIZE & SCALE LOGIC (Master Scale) ---
    function resize() {
        const winW = $(window).width();
        const winH = $(window).height(); // Use window height directly

        // Determine mode based on width
        const isMobile = (winW < 1050); // Threshold for single vs double
        const displayMode = isMobile ? 'single' : 'double';

        // Update Turn.js display mode if changed
        if (FLIPBOOK.turn('display') !== displayMode) {
            FLIPBOOK.turn('display', displayMode);

            // Adjust size for single/double
            const newWidth = isMobile ? PAGE_WIDTH : PAGE_WIDTH * 2;
            const newHeight = PAGE_HEIGHT;
            FLIPBOOK.turn('size', newWidth, newHeight);
        }

        // Calculate Target Dimensions for Scaling
        // We want to fit the flipbook into the viewport with some margin
        const targetW = isMobile ? PAGE_WIDTH : PAGE_WIDTH * 2;
        const targetH = PAGE_HEIGHT;

        const margin = 20; // Margin in pixels
        const availableW = winW - (margin * 2);
        const availableH = winH - (margin * 2);

        // Calculate Scale Factor (Contain)
        const scaleX = availableW / targetW;
        const scaleY = availableH / targetH;
        const scale = Math.min(scaleX, scaleY); // Fit both width and height

        // Limit max scale to prevent pixelation if needed (optional)
        // const finalScale = Math.min(scale, 1.2);
        const finalScale = scale;

        // Apply Transform
        FLIPBOOK.css({
            'transform': `scale(${finalScale})`,
            'transform-origin': 'center center' // Scale from center
        });

        // Optional: Center vertically if using absolute positioning,
        // but Flexbox on viewport handles this in CSS.
    }

    // --- EVENT LISTENERS ---
    $(window).resize(function() {
        // Debounce resize for better performance
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(resize, 100);
    });

    // Handle orientation change explicitly for mobile
    $(window).on('orientationchange', function() {
        setTimeout(resize, 200);
    });

    // Start
    initFlipbook();

});
