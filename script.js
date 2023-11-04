let page = 1;
let pageName = '';
if (document.getElementById('currentPage')) { document.getElementById('currentPage').innerHTML = page}

let images = [
    {
        url: '/imgs/van1.jpeg',
	alt: 'Gaming Van Interior'
    },
    {
        url: '/imgs/party1.jpeg',
  	alt: 'Kids Gaming Party Event'
    },
    {
  	url: '/imgs/party4.jpg',
	alt: 'Kids Gaming Party Event Exterior'
    },
    {
        url: '/imgs/van3.jpeg',
        alt: 'Gaming Van Exterior'
    },
    {
        url: '/imgs/party2.jpeg',
	alt: 'Kids Gaming Party Event'
    },
    {
        url: '/imgs/van2.jpeg',
	alt: 'Gaming Van Interior'
    },
    {
        url: '/imgs/party3.jpeg',
	alt: 'Kids Gaming Party Event'
    },
    {
	url: '/imgs/van4.jpg',
	alt: 'Gaming Van Interior Illuminated'
    }
];

let max_page = Math.ceil(images.length / 4);
if (document.getElementById('totalPages')) {document.getElementById('totalPages').innerHTML = max_page}

function expand_menu_page(currentPage) {
    pageName = currentPage;
    let body = document.body;
    let menuItems = null;
    switch (currentPage) {
        case 'About':
            menuItems = ['Homepage', 'Locations', 'Gallery', 'FAQS', 'Terms and Conditions', 'Contact'];
            break;
        case 'FAQS':
            menuItems = ['Homepage', 'About', 'Locations', 'Gallery', 'Terms and Conditions', 'Contact'];
            break;
        case 'Gallery':
            menuItems = ['Homepage', 'About', 'Locations', 'FAQS', 'Terms and Conditions', 'Contact'];
            break;
        case 'Homepage':
            menuItems = ['About', 'Gallery', 'Locations', 'FAQS', 'Terms and Conditions', 'Contact'];
            break;
        case 'Contact':
            menuItems = ['Homepage', 'About', 'Locations', 'Gallery', 'FAQS', 'Terms and Conditions'];
            break;
        case 'Terms':
            menuItems = ['Homepage', 'About', 'Locations', 'Gallery', 'FAQS', 'Contact'];
	    break;
        case 'Locations':
            menuItems = ['Homepage', 'About', 'Gallery', 'FAQS', 'Terms and Conditions', 'Contact'];
	    break;
        default:
            menuItems = ['About', 'Gallery', 'Locations', 'FAQS', 'Terms and Conditions', 'Contact'];
    }
    body.innerHTML = `
        <nav id="navBar">
            <div id="logoContainer">
                <a href="https://gameonmobilegaming.co.uk/"><img id="logo" src="/imgs/logo.png" alt="Game On Mobile Gaming Events Logo"></a>
            </div>
            <div class="headings centerAligned">
                <p id="companyHeading" class="fitContent">GAME ON</p>
                <p id="companySubHeading" class="fitContent">MOBILE GAMING</p>
            </div>
            <div id="menu-btn" class="centerAligned">
                <button id="menuButton" class="cursorPointer" onclick="close_menu()">
                    <div class="btn-line"></div>
                    <div class="btn-line"></div>
                    <div class="btn-line"></div>
                </button>
            </div>
        </nav>
        <div id="menu">
            ${menuItems.map((x) => {
                let menuName = x;
                let menuLink = `/${x}.html`;
		if (x === 'About') {
		     menuName = 'About Us';
		} else if (x === 'Terms and Conditions') {
		     menuName = 'Terms and Conditions';
		     menuLink = '/Terms.html';
		} else if (x === 'Homepage') {
		     menuLink = '';
		}
                let menuItems = `<div class="menuItem"><p><a href="https://gameonmobilegaming.co.uk${menuLink}" class="links">${menuName}</a></p></div>`
                return menuItems;
            }).join('')}
        </div>
    `
}

function close_menu () {
    let link = ''
    switch (pageName) {
        case 'About':
            link = 'https://gameonmobilegaming.co.uk/About.html';
            break;
        case 'FAQS':
            link = 'https://gameonmobilegaming.co.uk/FAQS.html';
            break;
        case 'Gallery':
            link = 'https://gameonmobilegaming.co.uk/Gallery.html';
            break;
        case 'Homepage':
            link = 'https://gameonmobilegaming.co.uk';
            break;
        case 'Contact':
            link = 'https://gameonmobilegaming.co.uk/Contact.html';
            break;
        case 'Terms':
            link = 'https://gameonmobilegaming.co.uk/Terms.html';
            break;
        case 'Locations':
            link = 'https://gameonmobilegaming.co.uk/Locations.html';
            break;
        default:
            link = 'https://gameonmobilegaming.co.uk'
    }
    window.location.href = link;
}

function next_page () {
    if (page < max_page) {
        let image_elements = document.getElementsByClassName('galleryItem');
        image_elements[0].innerHTML = ''
        image_elements[1].innerHTML = ''
        image_elements[2].innerHTML = ''
        image_elements[3].innerHTML = ''
        current_images = ''
        const chunkSize = 4;
        let chunked_arrays = [];
	console.log(images.length);
        for (let i = 0; i <= images.length; i += chunkSize) {
            chunked_arrays.push(images.slice(i, i + chunkSize));
	    console.log(i)
	    console.log(chunked_arrays);
	    console.log(images.length-1);
            if (i >= images.length-1) {
                chunked_arrays[page].map((x, index) => {
                    image_elements[index].innerHTML = `<img class="galleryImage" src=${x.url} alt=${x.alt}>`
                })
            }
        }
        page++
        document.getElementById('currentPage').innerHTML = page;
    }
}

function previous_page () {
    if (page > 1) {
        page--
        let image_elements = document.getElementsByClassName('galleryItem');
        image_elements[0].innerHTML = ''
        image_elements[1].innerHTML = ''
        image_elements[2].innerHTML = ''
        image_elements[3].innerHTML = ''
        current_images = ''
        const chunkSize = 4;
        let chunked_arrays = [];
        for (let i = 0; i <= images.length; i += chunkSize) {
            chunked_arrays.push(images.slice(i, i + chunkSize));
            if (i >= images.length-1) {
                chunked_arrays[page-1].map((x, index) => {
                    image_elements[index].innerHTML = `<img class="galleryImage" src=${x.url} alt=${x.alt}>`
                })
            }
        }
        document.getElementById('currentPage').innerHTML = page;
    }
}

window.onscroll = () => {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (scrollTop < 10 && document.getElementById('backToTopButton')) { document.getElementById('backToTopButton').style.display = 'none'; };
    if (scrollTop >= 10 && document.getElementById('backToTopButton')) { document.getElementById('backToTopButton').style.display = 'inline-block'; };
};
