let sideNav = document.getElementById("side-nav");
const menuToggle = document.querySelector('#mobile-menu')

menuToggle.addEventListener('click', showMenu)

function showMenu() {
    sideNav.classList.toggle('active')
}

$('#content').hide().fadeIn('slow');
$('#home').hide().fadeIn('slow');
