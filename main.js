const TAG_ACTIVE_CLASS = 'tag--active';
const SEARCH_HIDDEN_CLASS = 'search--hidden';
const CLOSE_TAG_CLASS = 'close-tag';
const TAG_CLASS = 'tag';

const jobsListings = [
  {
    "id": 1,
    "company": "Photosnap",
    website:"https://photosnap.com.au/",
    "logo": "./images/photosnap.svg",
    "new": true,
    "featured": true,
    "position": "Senior Frontend Developer",
    "role": "Frontend",
    "level": "Senior",
    "postedAt": "1d ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["HTML", "CSS", "JavaScript"]
    /*let text = "Free Web Building Tutorials!";
let result = text.link("https://www.w3schools.com");*/
  },
  {
    "id": 2,
    "company": "Manage",
    "website":"https://www.manage.gov.in/",
    "logo": "./images/manage.svg",
    "new": true,
    "featured": true,
    "position": "Fullstack Developer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1d ago",
    "contract": "Part Time",
    "location": "Remote",
    "languages": ["Python"],
    "tools": ["React"]
  },
  {
    "id": 3,
    "company": "Account",
    "website":"https://www.mca.gov.in/content/mca/global/en/home.html",
    "logo": "./images/account.svg",
    "new": true,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2d ago",
    "contract": "Part Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  },
  {
    "id": 4,
    "company": "MyHome",
    "website":"https://www.myhome.ie/",
    "logo": "./images/myhome.svg",
    "new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "5d ago",
    "contract": "Contract",
    "location": "USA Only",
    "languages": ["CSS", "JavaScript"]
  },
  {
    "id": 5,
    "company": "Loop Studios",
    "website":"https://www.loopstudios.com/",
    "logo": "./images/loop-studios.svg",
    "new": false,
    "featured": false,
    "position": "Software Engineer",
    "role": "FullStack",
    "level": "Midweight",
    "postedAt": "1w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript"],
    "tools": ["Ruby", "Sass"]
  },
  {
    "id": 6,
    "company": "FaceIt",
    "website":"https://www.faceit.com/",
    "logo": "./images/faceit.svg",
    "new": false,
    "featured": false,
    "position": "Junior Backend Developer",
    "role": "Backend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "UK Only",
    "tools": ["RoR"]
  },
  {
    "id": 7,
    "company": "Shortly",
    "website":"https://www.shortlyai.com/",
    "logo": "./images/shortly.svg",
    "new": false,
    "featured": false,
    "position": "Junior Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["HTML", "JavaScript"],
    "tools": ["Sass"]
  },
  {
    "id": 8,
    "company": "Insure",
    "website":"https://www.insure.com/",
    "logo": "./images/insure.svg",
    "new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["Vue, Sass"]
  },
  {
    "id": 9,
    "company": "Eyecam Co.",
    "website":"https://marcteyssier.com/projects/eyecam/",
    "logo": "./images/eyecam-co.svg",
    "new": false,
    "featured": false,
    "position": "Full Stack Engineer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "3w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript", "Python"],
    "tools": ["Django"]
  },
  {
    "id": 10,
    "company": "The Air Filter Company",
    "website":"https://www.air-filters.org/",
    "logo": "./images/the-air-filter-company.svg",
    "new": false,
    "featured": false,
    "position": "Front-end Dev",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "1mo ago",
    "contract": "Part Time",
    "location": "Worldwide",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  }
];

function getTagHTML(tag, tagClasses) {
    return `<span class="${tagClasses}">
                ${tag}
            </span>`;
}

function getJobListingHTML(jobData, filterTags = []) {
    const JOB_TAGS_PLACEHOLDER = '###JOB_TAGS###';
    let jobListingHTML = `
        <div class="jobs__item">
            <div class="jobs__column jobs__column--left">
            <a href="${jobData.website}" target="_blank"><img src="${jobData.logo}" alt="${jobData.company}" class="jobs__img" /></a>
                
                <div class="jobs__info">
                    <span class="jobs__company"> <a class="jobs__company" href="${jobData.website}" target="_blank">${jobData.company}</a> </span>
                    <span class="jobs__title">${jobData.position}</span>
                    
                    <ul class="jobs__details">
                        <li class="jobs__details-item">${jobData.postedAt}</li>
                        <li class="jobs__details-item">${jobData.contract}</li>
                        <li class="jobs__details-item">${jobData.location}</li>
                    </ul>
                </div>
            </div>
            <div class="jobs__column jobs__column--right">
                ${JOB_TAGS_PLACEHOLDER}
            </div>
        </div>
    `;

    const tagsList = [
        jobData.role,
        jobData.level,
        ...(jobData.languages || []),
        ...(jobData.tools || [])
    ];
    const tagsListLowercase = tagsList.map(t => t && t.toLowerCase());
    const passesFilter = !filterTags.length || filterTags.every(tag => (
        tagsListLowercase.includes(tag && tag.toLowerCase())
    ));
    
    if (!passesFilter) {
        return '';
    }

    const tagsString = tagsList.reduce((acc, currentTag) => {
        const activeClass = (filterTags.includes(currentTag) && TAG_ACTIVE_CLASS) || '';

        return acc + getTagHTML(currentTag, `${TAG_CLASS} ${activeClass}`);
    }, '');

    return jobListingHTML.replace(JOB_TAGS_PLACEHOLDER, tagsString);
};

function toggleClass(el, className) {
    if (el.classList.contains(className)) {
        el.classList.remove(className);

        return;
    }
    
    el.classList.add(className);
}

function getSearchBarTags(tagValue, searchContentEl) {
    let searchBarTags = Array.from(searchContentEl.children)
        .map(node => node.innerHTML && node.innerHTML.trim())
        .filter(tag => !!tag);

    if (searchBarTags.includes(tagValue)) {
        searchBarTags = searchBarTags.filter(tag => tag !== tagValue);
    } else {
        searchBarTags = [...searchBarTags, tagValue];
    }

    return searchBarTags;
}

function setJobsListings(filterTags) {
    const jobsListingsHTML = jobsListings.reduce((acc, currentListing) => {
        return acc + getJobListingHTML(currentListing, filterTags);
    }, '');
    
    document.getElementById('jobs').innerHTML = jobsListingsHTML;
}

function displaySearchWrapper(display = false) {
    const searchWrapper = document.getElementById('search');
    
    if (display) {
        searchWrapper.classList.remove(SEARCH_HIDDEN_CLASS);

        return;
    }

    searchWrapper.classList.add(SEARCH_HIDDEN_CLASS);
}

function setSearchbarContent(searchContentEl, tags) {
    searchContentEl.innerHTML = tags.reduce((acc, currentTag) => {
        return acc + getTagHTML(currentTag, CLOSE_TAG_CLASS);
    }, '');
}

function resetState(searchContentEl) {
    searchContentEl.innerHTML = '';

    setJobsListings();
    displaySearchWrapper(false);
    toggleClass(targetEl, TAG_ACTIVE_CLASS);
}

window.addEventListener('click', (event) => {
    const targetEl = event.target;
    const targetText = targetEl.innerHTML.trim();
    const searchContentEl = document.getElementById('search-content');
    const searchBarTags = getSearchBarTags(targetText, searchContentEl);

    if (targetEl.id === 'clear' || !searchBarTags.length) {
        resetState(searchContentEl);

        return;
    }

    if (![TAG_CLASS, CLOSE_TAG_CLASS].some(c => targetEl.classList.contains(c))) {
        return;
    }

    setSearchbarContent(searchContentEl, searchBarTags);
    toggleClass(targetEl, TAG_ACTIVE_CLASS);
    displaySearchWrapper(searchBarTags.length > 0);
    setJobsListings(searchBarTags);
});

setJobsListings();