/*
 * main.js
 * Contains client-side interactivity, starting with the mobile menu toggle.
*/

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        // Toggle the mobile menu visibility when the hamburger button is clicked
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Hide the mobile menu after clicking any link (better user experience)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // We use a small timeout to let the scroll animation start before hiding
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 100); 
            });
        });
    }
});